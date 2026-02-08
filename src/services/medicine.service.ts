import { env } from "@/env";

const API_URL = env.API_URL;

export const medicineService = {
  getAllMedicines: async function (query?: string) {
    try {
      const url = query
        ? `${API_URL}/api/medicines?${query}`
        : `${API_URL}/api/medicines`;
      const res = await fetch(url, {
        cache: "no-store",
      });
      const result = await res.json();
      return { data: result.data, err: null };
    } catch (err) {
      console.error(err);
      return { data: null, err: { message: "Something went wrong" } };
    }
  },
  getMedicineDetails: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/medicines/${id}`, {
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
