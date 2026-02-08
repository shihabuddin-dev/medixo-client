import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const orderService = {
  createOrder: async function (orderData: {
    medicineId: string;
    quantity: number;
    shippingAddress: string;
  }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });
      const result = await res.json();
      return {
        data: result.data,
        err: result.success ? null : { message: result.message },
      };
    } catch (err) {
      console.error(err);
      return { data: null, err: { message: "Something went wrong" } };
    }
  },

  getMyOrders: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders/my-orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const result = await res.json();
      return { data: result.data, err: null };
    } catch (err) {
      console.error(err);
      return { data: null, err: { message: "Something went wrong" } };
    }
  },
  getOrderDetails: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders/${id}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const result = await res.json();
      return { data: result.data, err: null };
    } catch (err) {
      console.error(err);
      return { data: null, err: { message: "Something went wrong" } };
    }
  },
};
