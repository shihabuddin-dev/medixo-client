import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const adminService = {
  getAllUsers: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/users`, {
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

  updateUserStatus: async function (
    id: string,
    status: "ACTIVE" | "BLOCKED" | "DELETED",
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
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

  getAllOrders: async function (params?: {
    sellerId?: string;
    customerId?: string;
  }) {
    try {
      const cookieStore = await cookies();
      const query = new URLSearchParams();
      if (params?.sellerId) query.append("sellerId", params.sellerId);
      if (params?.customerId) query.append("customerId", params.customerId);

      const res = await fetch(`${API_URL}/api/orders?${query.toString()}`, {
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

  getAllMedicines: async function (params?: {
    searchTerm?: string;
    categoriesId?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    try {
      const query = new URLSearchParams();
      if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
      if (params?.categoriesId)
        query.append("categoriesId", params.categoriesId);
      if (params?.sortBy) query.append("sortBy", params.sortBy);
      if (params?.sortOrder) query.append("sortOrder", params.sortOrder);

      const res = await fetch(`${API_URL}/api/medicines?${query.toString()}`, {
        cache: "no-store",
      });
      const result = await res.json();
      return { data: result.data, err: null };
    } catch (err) {
      console.error(err);
      return { data: null, err: { message: "Something went wrong" } };
    }
  },

  getAllCategories: async function () {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        cache: "no-store",
      });
      const result = await res.json();
      return { data: result.data, err: null };
    } catch (err) {
      console.error(err);
      return { data: null, err: { message: "Something went wrong" } };
    }
  },

  getSingleMedicine: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/medicines/${id}`, {
        cache: "no-store",
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
