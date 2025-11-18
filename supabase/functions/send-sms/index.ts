import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    console.log('SMS sending initiated');
    
    const { phoneNumber, message } = await req.json();
    
    if (!phoneNumber || !message) {
      throw new Error('Missing required fields: phoneNumber, message');
    }

    // Get Africa's Talking credentials
    const apiKey = Deno.env.get('AFRICAS_TALKING_API_KEY');
    const username = Deno.env.get('AFRICAS_TALKING_USERNAME');

    if (!apiKey || !username) {
      throw new Error('Africa\'s Talking credentials not configured');
    }

    // Format phone number for Africa's Talking (must start with +)
    let formattedPhone = phoneNumber.replace(/\s/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '+254' + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('+')) {
      if (formattedPhone.startsWith('254')) {
        formattedPhone = '+' + formattedPhone;
      } else {
        formattedPhone = '+254' + formattedPhone;
      }
    }

    console.log('Sending SMS to:', formattedPhone);

    // Send SMS via Africa's Talking
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('to', formattedPhone);
    formData.append('message', message);

    const response = await fetch(
      'https://api.sandbox.africastalking.com/version1/messaging',
      {
        method: 'POST',
        headers: {
          'apiKey': apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formData,
      }
    );

    const responseData = await response.json();
    console.log('Africa\'s Talking response:', JSON.stringify(responseData));

    if (!response.ok) {
      throw new Error(`SMS API error: ${JSON.stringify(responseData)}`);
    }

    // Check if SMS was sent successfully
    const smsData = responseData.SMSMessageData;
    if (smsData && smsData.Recipients && smsData.Recipients.length > 0) {
      const recipient = smsData.Recipients[0];
      if (recipient.statusCode === 101) {
        console.log('SMS sent successfully');
        return new Response(
          JSON.stringify({
            success: true,
            message: 'SMS sent successfully',
            messageId: recipient.messageId,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } else {
        throw new Error(`SMS failed with status: ${recipient.status}`);
      }
    } else {
      throw new Error('No recipients in SMS response');
    }
  } catch (error) {
    console.error('Error in send-sms function:', error);
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
