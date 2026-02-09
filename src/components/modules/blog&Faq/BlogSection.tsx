import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";

const BlogSection = () => {
  return (
    <div className="sm:py-16 pt-12 pb-12 container mx-auto px-4">

      <SectionHeader
        label="Latest Blog"
        title="Featured"
        highlight="Articles"
        align="center"
      />

      {/* Featured Article */}
      <article className="mb-12 rounded-3xl overflow-hidden border hover:shadow-xl transition-all duration-300 bg-black border-white/5">
        <div className="grid lg:grid-cols-2 gap-0">

          <div className="relative">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/34fa9afc-3d27-4ab4-b6b5-cd6e89cab95b_1600w.jpg"
              alt="Photography Guide"
              className="lg:h-[400px] w-full h-[300px] object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-emerald-500/10 text-xs border border-emerald-500/20 text-emerald-300">
              Featured Article
            </div>
          </div>

          <div className="lg:p-12 p-8 flex flex-col justify-center">
            <h3 className="lg:text-3xl text-2xl mb-4 text-white font-medium">
              Mastering Mirrorless Cameras in 2026
            </h3>
            <p className="text-lg mb-6 text-white/60">
              A complete guide to modern mirrorless cameras, autofocus
              technologies, and video workflows. Learn how professionals
              capture cinematic footage and high-resolution photography
              with today’s equipment.
            </p>
          </div>
        </div>
      </article>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        <BlogCard
          title="Choosing the Right Camera for Beginners"
          image="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b201fbab-0845-4780-9fa7-7018d249dbca_800w.jpg"
          desc="A practical guide to selecting your first camera based on budget, purpose, and features."
        />

        <BlogCard
          title="Understanding Camera Lenses Explained"
          image="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/edab2a0c-3815-44d9-94fb-d7ebea501c33_800w.jpg"
          desc="Learn how focal length, aperture, and lens types impact your photography results."
        />

        <BlogCard
          title="How Stabilizers Improve Video Quality"
          image="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e69626e7-2c40-4d3f-ab56-e183cf1702c4_800w.jpg"
          desc="Discover how gimbals and stabilizers help creators shoot smooth cinematic footage."
        />

        <BlogCard
          title="The Future of Mirrorless Cameras"
          image="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/914ae17e-aaac-4e03-ac64-84d8ad05b543_3840w.jpg"
          desc="AI autofocus, computational photography, and new sensor technologies explained."
        />

        <BlogCard
          title="Building a Home Studio Setup"
          image="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1026f224-d350-4875-89d8-87e0ff21bbab_3840w.webp"
          desc="Lighting, background, and camera tips to create a professional studio at home."
        />

        <BlogCard
          title="Best Microphones for Content Creators"
          image="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a7a8e9be-e8a9-484c-971c-63a83ac31ae0_3840w.jpg"
          desc="A breakdown of wireless, shotgun, and USB microphones for different workflows."
        />

      </div>

      <div className="mt-12 text-center">
        <button className="h-12 px-6 rounded-xl border border-white/10 bg-black text-white/70 hover:bg-white/5">
          Load more blogs
        </button>
      </div>

    </div>
  );
};

export default BlogSection;



/* Reusable Blog Card */
const BlogCard = ({
  title,
  image,
  desc,
}: {
  title: string;
  image: string;
  desc: string;
}) => (
  <article className="rounded-3xl overflow-hidden border hover:shadow-xl transition-all duration-300 bg-black border-white/5">
    <img src={image} alt={title} className="w-full h-64 object-cover" />

    <div className="p-6">
      <h3 className="text-2xl mb-3 text-white font-medium">{title}</h3>
      <p className="text-base text-white/60">{desc}</p>
    </div>
  </article>
);