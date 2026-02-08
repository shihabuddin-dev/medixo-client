export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  tags?: string[];
  views?: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    comments: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  image?: string;
  address?: string;
  phone?: string;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoriesId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  medicineId: string;
  quantity: number;
  totalPrice: number;
  shippingAddress: string;
  status: "Pending" | "Paid" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
  medicines?: Medicine;
  user?: Partial<User>;
}
