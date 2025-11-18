import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('M-Pesa callback received');
    
    const callbackData = await req.json();
    console.log('Callback data:', JSON.stringify(callbackData, null, 2));

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Extract payment details
    const { Body } = callbackData;
    const { stkCallback } = Body;
    
    const checkoutRequestId = stkCallback.CheckoutRequestID;
    const resultCode = stkCallback.ResultCode;
    const resultDesc = stkCallback.ResultDesc;

    console.log('Processing callback for CheckoutRequestID:', checkoutRequestId);
    console.log('Result Code:', resultCode);
    console.log('Result Description:', resultDesc);

    // Get order by checkout request ID
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('mpesa_checkout_request_id', checkoutRequestId)
      .single();

    if (orderError || !order) {
      console.error('Order not found for CheckoutRequestID:', checkoutRequestId);
      throw new Error('Order not found');
    }

    console.log('Order found:', order.id);

    // Check if payment was successful
    if (resultCode === 0) {
      // Payment successful
      const callbackMetadata = stkCallback.CallbackMetadata?.Item || [];
      const mpesaReceiptNumber = callbackMetadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
      
      console.log('Payment successful. M-Pesa Receipt Number:', mpesaReceiptNumber);

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          mpesa_transaction_id: mpesaReceiptNumber,
        })
        .eq('id', order.id);

      if (updateError) {
        console.error('Error updating order:', updateError);
        throw updateError;
      }

      console.log('Order status updated to paid');

      // Send SMS confirmation
      try {
        console.log('Sending SMS confirmation to:', order.customer_phone);
        const smsResponse = await fetch(
          'https://adpixtdvasuoxxsbmlec.supabase.co/functions/v1/send-sms',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            },
            body: JSON.stringify({
              phoneNumber: order.customer_phone,
              message: `Payment confirmed! Your order #${order.id.slice(0, 8)} for Ksh ${order.total_amount} has been received. Thank you for choosing Creamy Corner Cafe! Call us at 0712347926 for any queries.`,
            }),
          }
        );

        if (smsResponse.ok) {
          console.log('SMS sent successfully');
        } else {
          const smsError = await smsResponse.text();
          console.error('SMS sending failed:', smsError);
        }
      } catch (smsError) {
        console.error('Error sending SMS:', smsError);
        // Don't throw - payment was successful even if SMS failed
      }
    } else {
      // Payment failed
      console.log('Payment failed. Reason:', resultDesc);
      
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
        })
        .eq('id', order.id);

      if (updateError) {
        console.error('Error updating order:', updateError);
        throw updateError;
      }

      console.log('Order status updated to failed');
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in mpesa-callback function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
