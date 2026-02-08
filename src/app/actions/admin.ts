"use server";

import { adminService } from "@/services/admin.service";
import { revalidatePath } from "next/cache";

export async function updateUserStatusAction(
  id: string,
  status: "ACTIVE" | "BLOCKED" | "DELETED",
) {
  const result = await adminService.updateUserStatus(id, status);

  if (!result.err) {
    revalidatePath("/admin-dashboard/users");
  }

  return result;
}
