import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === "null") {
        return { data: null, err: { message: "Session is missing" } };
      }

      return { data: session, err: null };
    } catch (err) {
      console.error(err);
      return { data: null, err: { message: "Something went wrong" } };
    }
  },

  updateMyProfile: async function (userData: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(userData),
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
