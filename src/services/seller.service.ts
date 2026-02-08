import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const sellerService = {
  getSellerMedicines: async function (sellerId?: string) {
    try {
      const cookieStore = await cookies();
      const url = sellerId
        ? `${API_URL}/api/medicines?sellerId=${sellerId}`
        : `${API_URL}/api/medicines`;

      const res = await fetch(url, {
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

  addMedicine: async function (formData: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(formData),
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

  updateMedicine: async function (id: string, formData: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/medicines/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(formData),
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

  deleteMedicine: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/medicines/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
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

  getSellerOrders: async function (sellerId?: string) {
    try {
      const cookieStore = await cookies();
      const url = sellerId
        ? `${API_URL}/api/orders?sellerId=${sellerId}`
        : `${API_URL}/api/orders`;

      const res = await fetch(url, {
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

  updateOrderStatus: async function (id: string, status: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
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
};
