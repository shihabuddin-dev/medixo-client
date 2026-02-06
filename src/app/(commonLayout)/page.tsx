import ImageReveal from "@/components/pages/landing/ImageReveal";
import config from "@/config";

export default function HomePage() {
  console.log(config.API_KEY);
  return (
   <div>
    <ImageReveal />

    Home page


   </div>
  );
}
