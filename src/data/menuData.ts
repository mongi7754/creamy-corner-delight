export interface MenuItem {
  name: string;
  price: string | { small: string; large: string };
  flavors?: string[];
  description?: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    title: "Ice Cream",
    items: [
      {
        name: "Ice Pop",
        price: "10",
        flavors: ["Strawberry", "Pineapple", "Ukwaju", "Mixed Fruit", "Grape", "Orange", "Mango"],
      },
      {
        name: "Simba Stick",
        price: "45",
        flavors: ["Strawberry", "White Chocolate", "Choco Nuts", "Caramel"],
      },
      {
        name: "Ice Cream Cone",
        price: "50",
      },
      {
        name: "Tin Roof",
        price: "70",
      },
      {
        name: "Turtle",
        price: "100",
      },
      {
        name: "Pint / To Go",
        price: "220",
      },
      {
        name: "Heavenly Glory",
        price: "300",
        description: "Our signature ice cream creation",
      },
      {
        name: "Special Menu",
        price: "400",
        description: "Premium ice cream experience",
      },
    ],
  },
  {
    title: "Ice Cream Flavors",
    items: [
      { name: "Strawberry", price: "" },
      { name: "Strawberry Vanilla", price: "" },
      { name: "Vanilla", price: "" },
      { name: "Blueberry Vanilla", price: "" },
      { name: "Chocolate Vanilla", price: "" },
      { name: "Pistachio", price: "" },
      { name: "Pure Chocolate", price: "" },
    ],
  },
  {
    title: "Fresh Yogurt",
    items: [
      {
        name: "Yogurt",
        price: { small: "50", large: "100" },
        flavors: ["Strawberry", "Blueberry", "Vanilla", "Passion"],
        description: "Small (250ml) / Large (1L)",
      },
      {
        name: "Yogurt Wholesale (5L)",
        price: "180",
      },
    ],
  },
  {
    title: "Juices & Cocktails",
    items: [
      {
        name: "Individual Juice",
        price: "50-100",
        description: "Fresh fruit juices made to order",
      },
      {
        name: "Juice Wholesale (5L)",
        price: "1100",
      },
    ],
  },
  {
    title: "Coffee & Tea",
    items: [
      {
        name: "Black Coffee",
        price: { small: "120", large: "150" },
      },
      {
        name: "White Coffee",
        price: { small: "100", large: "150" },
      },
      {
        name: "Cappuccino",
        price: { small: "100", large: "150" },
      },
      {
        name: "Cardamom Tea",
        price: { small: "80", large: "150" },
      },
      {
        name: "Moccacino",
        price: { small: "100", large: "150" },
      },
    ],
  },
];
