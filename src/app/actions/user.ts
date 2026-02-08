"use server";

import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export async function updateProfile(userData: any) {
  const result = await userService.updateMyProfile(userData);

  if (!result.err) {
    revalidatePath("/dashboard/profile");
    revalidatePath("/seller-dashboard/profile");
    revalidatePath("/admin-dashboard/profile");
  }

  return result;
}
