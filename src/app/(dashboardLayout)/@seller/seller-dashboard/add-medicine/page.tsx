import React from "react";
import { AddMedicineForm } from "@/components/modules/seller/add-medicine-form";
import { adminService } from "@/services/admin.service";

const AddMedicinePage = async () => {
  // We can reuse adminService to get categories as it's a public-ish list
  // or we can move it to a common service later.
  const { data: categories } = await adminService.getAllCategories();

  return (
    <div className="py-8">
      <AddMedicineForm categories={categories || []} />
    </div>
  );
};

export default AddMedicinePage;
