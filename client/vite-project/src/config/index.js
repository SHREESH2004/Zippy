export const registerFormControls = [
  {
    name: 'User name',
    label: 'USER NAME',
    placeholder: 'Enter your user name',
    componentype: 'input',
    type: 'text',
  },
  {
    name: 'email',
    label: 'EMAIL',
    placeholder: 'Enter your email',
    componentype: 'input',
    type: 'text',
  },
  {
    name: 'password',
    label: 'PASSWORD',
    placeholder: 'Enter your password',
    componentype: 'input',
    type: 'text',
  }
]

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
  }
]


export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingviewMenuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/shopping/home'
  },
  {
    id: 'men',
    label: 'Men',
    path: '/shopping/listing'
  },
  {
    id: 'women',
    label: 'Women',
    path: '/shopping/listing'
  },
  {
    id: 'kids',
    label: 'Kids',
    path: '/shopping/listing'
  },
  {
    id: 'accessories',
    label: 'Accessories',
    path: '/shopping/listing'
  },
  {
    id: 'footwear',
    label: 'Footwear',
    path: '/shopping/listing'
  }
];
