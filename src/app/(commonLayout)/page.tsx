import { adminService } from "@/services/admin.service";
import { Hero } from "@/components/modules/home/Hero";
import { Categories } from "@/components/modules/home/Categories";
import { FeaturedMedicines } from "@/components/modules/home/FeaturedMedicines";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const { data: categories } = await adminService.getAllCategories();

  return (
    <div>
      <Hero />
      <Categories data={categories || []} />
      <FeaturedMedicines />

      {/* Why Choose Us Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
              Service Excellence
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
              Why Choose{" "}
              <span className="text-primary italic">Medixo Pharmacy?</span>
            </h3>
            <p className="text-muted-foreground font-medium">
              We bridge the gap between healthcare and convenience, providing
              you with the most reliable way to get your essentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Licensed Network",
                desc: "We only partner with certified pharmacies ensuring every medicine is 100% genuine.",
                color: "bg-blue-500",
              },
              {
                title: "Express Logistics",
                desc: "Our prioritized delivery network ensures your critical medicines reach you in record time.",
                color: "bg-emerald-500",
              },
              {
                title: "Professional Support",
                desc: "Our team of health enthusiasts and experts are available 24/7 to assist your needs.",
                color: "bg-orange-500",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="relative group p-8 rounded-[40px] bg-white shadow-xl shadow-gray-100/50 border border-transparent hover:border-primary/20 transition-all text-center"
              >
                <div
                  className={`h-16 w-16 mx-auto rounded-md ${feature.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-${feature.color.split("-")[1]}-500/20 group-hover:scale-110 transition-transform`}
                >
                  <span className="text-2xl font-bold">{idx + 1}</span>
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-4">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[64px] bg-primary overflow-hidden p-12 md:p-24 text-center space-y-8">
            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight relative">
              Ready to restock your{" "}
              <span className="italic opacity-80 decoration-white underline underline-offset-8">
                medicine cabinet?
              </span>
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl font-medium max-w-2xl mx-auto relative">
              Join thousands of customers who trust Medixo for their daily
              health needs. Register now and get free delivery on your first
              order.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 relative">
              <Button
                size="lg"
                className="h-16 px-12 rounded-md bg-white text-primary hover:bg-white/90 text-lg font-black shadow-2xl shadow-black/20"
              >
                Get Started Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-16 px-12 rounded-md border-white/40 text-white hover:bg-white/10 text-lg font-black backdrop-blur-sm"
              >
                Contact Pharmacist
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
