"use server";

import { sellerService } from "@/services/seller.service";
import { revalidatePath } from "next/cache";

export async function addMedicineAction(formData: any) {
  const result = await sellerService.addMedicine(formData);

  if (!result.err) {
    revalidatePath("/seller-dashboard/medicines");
    revalidatePath("/shop");
    revalidatePath("/");
  }

  return result;
}

export async function updateMedicineAction(id: string, formData: any) {
  const result = await sellerService.updateMedicine(id, formData);

  if (!result.err) {
    revalidatePath("/seller-dashboard/medicines");
    revalidatePath("/shop");
    revalidatePath("/");
  }

  return result;
}

export async function deleteMedicineAction(id: string) {
  const result = await sellerService.deleteMedicine(id);

  if (!result.err) {
    revalidatePath("/seller-dashboard/medicines");
    revalidatePath("/shop");
    revalidatePath("/");
  }

  return result;
}

export async function updateOrderStatusAction(id: string, status: string) {
  const result = await sellerService.updateOrderStatus(id, status);

  if (!result.err) {
    revalidatePath("/seller-dashboard/orders");
  }

  return result;
}
