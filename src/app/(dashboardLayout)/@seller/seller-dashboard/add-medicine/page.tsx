import { MedicineForm } from "@/components/modules/seller/MedicineForm";
import { adminService } from "@/services/admin.service";

const AddMedicinePage = async () => {
  // We can reuse adminService to get categories as it's a public-ish list
  // or we can move it to a common service later.
  const { data: categories } = await adminService.getAllCategories();

  return (
    <div className="py-8">
      <MedicineForm categories={categories || []} />
    </div>
  );
};

export default AddMedicinePage;
