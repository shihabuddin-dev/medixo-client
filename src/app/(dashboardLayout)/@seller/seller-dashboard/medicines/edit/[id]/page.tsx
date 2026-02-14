import React from "react";
import { MedicineForm } from "@/components/modules/seller/MedicineForm";
import { adminService } from "@/services/admin.service";
import { notFound } from "next/navigation";

const EditMedicinePage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const { data: medicine } = await adminService.getSingleMedicine(id);
    const { data: categories } = await adminService.getAllCategories();

    if (!medicine) {
        notFound();
    }

    return (
        <div className="py-8">
            <MedicineForm categories={categories || []} initialData={medicine} />
        </div>
    );
};

export default EditMedicinePage;
