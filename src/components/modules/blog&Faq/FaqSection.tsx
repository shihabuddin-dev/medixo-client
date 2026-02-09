"use client";

import SectionHeader from "@/components/shared/SectionHeader";
import React, { useState } from "react";

const faqs = [
  {
    category: "General",
    question: "How do I get started with your platform?",
    answer:
      "Getting started is simple! Sign up for a free account, explore the dashboard, and follow the onboarding guide. You can launch your first project in minutes.",
  },
  {
    category: "Pricing",
    question: "What are your pricing plans and features?",
    answer:
      "We offer flexible pricing plans including Starter, Pro, and Enterprise. All plans include collaboration tools and support.",
  },
  {
    category: "Support",
    question: "How can I contact customer support?",
    answer:
      "Our support team is available via live chat, email, and help center. Premium customers also receive priority support.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 lg:py-16 pt-14 pb-24">
      <SectionHeader
        label="Faqs"
        title="Frequently Asked"
        highlight="Questions"
        align="center"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="md:mb-16 grid md:grid-cols-12 mb-16 gap-6 items-end">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex text-[13px] font-medium gap-2 items-center">
              <span className="tabular-nums text-[20px] text-blue-300/80">
                03
              </span>
              <span className="text-blue-300/40">/</span>
              <span className="uppercase text-[11px] tracking-widest text-blue-200/90">
                FAQ
              </span>
            </div>

            <h2 className="sm:text-5xl lg:text-6xl text-4xl font-light text-white tracking-tight">
              Answers to your most common questions
            </h2>

            <p className="sm:text-base text-sm text-zinc-400 max-w-2xl">
              Everything you need to know to get started, manage your account,
              and get support quickly.
            </p>
          </div>

          <div className="md:col-span-4 flex md:justify-end">
            <div className="hidden sm:flex items-center gap-3">
              <button className="h-11 px-5 rounded-md bg-white text-neutral-900 font-medium hover:bg-white/90">
                help
              </button>
              <button className="h-11 px-5 rounded-md border border-white/20 text-white hover:bg-white/5">
                Support
              </button>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-12 gap-6 items-start">
          {/* FAQ List */}
          <div className="md:col-span-7 divide-y divide-white/10">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <div key={index} className="py-6">
                  <div className="text-[11px] uppercase font-medium text-neutral-500/80 tracking-wide">
                    {faq.category}
                  </div>

                  <button
                    onClick={() => toggleFAQ(index)}
                    className="group mt-2 flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-white text-2xl sm:text-3xl font-light tracking-tight">
                      {faq.question}
                    </h3>

                    <span className="ml-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 transition">
                      <svg
                        className={`w-5 h-5 text-white transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-white/70 text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Image */}
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                alt="FAQ preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <button className="w-full h-11 rounded-full bg-white/5 border border-white/10 text-blue-300 hover:bg-white/10">
            View all FAQs
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
