"use server";

import { orderService } from "@/services/order.service";
import { revalidatePath } from "next/cache";

export async function createBulkOrders(cart: any[], shippingAddress: string) {
  // Since backend only supports single medicine per order, we loop
  const results = [];
  for (const item of cart) {
    const result = await orderService.createOrder({
      medicineId: item.id,
      quantity: item.quantity,
      shippingAddress,
    });
    results.push(result);
  }

  // Check if any failed
  const error = results.find((r) => r.err);
  if (error) return error;

  revalidatePath("/dashboard/orders");
  revalidatePath("/seller-dashboard/orders");
  revalidatePath("/admin-dashboard/orders");

  return { data: results.map((r) => r.data), err: null };
}
