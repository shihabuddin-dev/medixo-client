import { adminService } from "@/services/admin.service";
import { Hero } from "@/components/modules/home/Hero";
import { Categories } from "@/components/modules/home/Categories";
import { FeaturedMedicines } from "@/components/modules/home/FeaturedMedicines";
import { WhyChooseUs } from "@/components/modules/home/WhyChooseUs";

export default async function HomePage() {
  const { data: categories } = await adminService.getAllCategories();

  return (
    <>
      <Hero />
      <Categories data={categories || []} />
      <FeaturedMedicines />
      <WhyChooseUs />
    </>
  );
}
