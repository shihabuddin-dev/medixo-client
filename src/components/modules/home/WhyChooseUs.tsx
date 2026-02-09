"use client";

import SectionHeader from "@/components/shared/SectionHeader";

export function WhyChooseUs() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start  gap-12">
        <SectionHeader
          label="Best Quality"
          title=" Why"
          highlight="Choose Us"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative h-56 md:h-96 rounded-md bg-[#0A0A0A] overflow-hidden border border-white/5 transition-colors duration-500 hover:bg-[#111] hover:border-white/10">
          <div className="absolute inset-0 flex items-center justify-center opacity-80 perspective-[1000px]">
            <div className="relative w-32 h-32 transform transition-transform duration-700 ease-out group-hover:scale-105 group-hover:translate-y-[-10px]">
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent border border-white/10 rounded-2xl transform -translate-x-4 -translate-y-2 -rotate-[15deg] backdrop-blur-[2px] transition-transform duration-500 ease-out group-hover:-translate-x-8 group-hover:-rotate-[20deg]"></div>

              <div className="absolute inset-0 bg-linear-to-br from-white/15 to-transparent border border-white/15 rounded-2xl transform translate-x-0 translate-y-0 -rotate-[5deg] backdrop-blur-[4px] transition-transform duration-500 delay-75 ease-out group-hover:rotate-0"></div>

              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent border border-white/20 rounded-2xl transform translate-x-4 translate-y-2 rotate-[5deg] backdrop-blur-[6px] shadow-2xl transition-transform duration-500 delay-150 ease-out group-hover:translate-x-8 group-hover:rotate-[15deg] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 blur-xl"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
            <div className="flex flex-col gap-2 max-w-[70%]">
              <h3 className="text-xl font-medium text-white tracking-tight leading-none group-hover:text-indigo-200 transition-colors">
                Authentic
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                Positioning, identity systems, and voice definition.
              </p>
            </div>
            <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-plus"
              >
                <path d="M5 12h14" className=""></path>
                <path d="M12 5v14" className=""></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="group relative h-56 md:h-96 rounded-md bg-[#0A0A0A] overflow-hidden border border-white/5 transition-colors duration-500 hover:bg-[#111] hover:border-white/10">
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-500">
              <div className="absolute top-1/4 left-[-20%] w-[140%] h-px bg-linear-to-r from-transparent via-white/40 to-transparent transform -rotate-12 translate-x-[-10%] group-hover:translate-x-[10%] transition-transform duration-[2s] ease-in-out"></div>
              <div className="absolute top-1/3 left-[-20%] w-[140%] h-px bg-linear-to-r from-transparent via-white/20 to-transparent transform -rotate-12 translate-x-[-20%] group-hover:translate-x-[5%] transition-transform duration-[2.5s] ease-in-out delay-75"></div>
              <div className="absolute top-1/2 left-[-20%] w-[140%] h-px bg-linear-to-r from-transparent via-white/50 to-transparent transform -rotate-12 translate-x-[-15%] group-hover:translate-x-[15%] transition-transform duration-[1.8s] ease-in-out delay-100"></div>
              <div className="absolute top-2/3 left-[-20%] w-[140%] h-px bg-linear-to-r from-transparent via-white/30 to-transparent transform -rotate-12 translate-x-[-5%] group-hover:translate-x-[20%] transition-transform duration-[2.2s] ease-in-out delay-150"></div>

              <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-emerald-500/10 rounded-full blur-[60px] transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
              <div className="absolute top-[40%] right-[20%] text-[10px] font-mono text-emerald-500/60 opacity-0 group-hover:opacity-00">
                120fps
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
            <div className="flex flex-col gap-2 max-w-[70%]">
              <h3 className="text-xl font-medium text-white tracking-tight leading-none group-hover:text-emerald-200 transition-colors">
                Top Quality
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                The highest quality Medicine.
              </p>
            </div>
            <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-plus"
              >
                <path d="M5 12h14" className=""></path>
                <path d="M12 5v14" className=""></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="group relative h-56 md:h-96 rounded-md bg-[#0A0A0A] overflow-hidden border border-white/5 transition-colors duration-500 hover:bg-[#111] hover:border-white/10">
          <div className="absolute inset-0 flex items-center justify-center perspective-[800px] overflow-hidden">
            <div className="relative transform rotate-x-[60deg] rotate-z-[45deg] scale-75 group-hover:scale-90 transition-transform duration-700 ease-out">
              <div className="w-48 h-48 border border-white/10 bg-white/5 grid grid-cols-4 grid-rows-4 rounded-lg shadow-2xl">
                <div className="border-r border-b border-white/5"></div>
                <div className="border-r border-b border-white/5"></div>
                <div className="border-r border-b border-white/5"></div>
                <div className="border-b border-white/5"></div>
                <div className="border-r border-b border-white/5"></div>
                <div className="border-r border-b border-white/5 bg-rose-500/10 transition-colors duration-300 group-hover:bg-rose-500/20"></div>
                <div className="border-r border-b border-white/5"></div>
                <div className="border-b border-white/5"></div>
                <div className="border-r border-b border-white/5"></div>
                <div className="border-r border-b border-white/5"></div>
                <div className="border-r border-b border-white/5"></div>
                <div className="border-b border-white/5"></div>
                <div className="border-r border-white/5"></div>
                <div className="border-r border-white/5"></div>
                <div className="border-r border-white/5"></div>
                <div></div>
              </div>

              <div className="absolute -top-10 left-10 w-16 h-16 bg-[#1A1A1A] border border-white/20 rounded-xl shadow-2xl transform translate-z-20 group-hover:translate-z-40 transition-transform duration-500 ease-out flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="text-rose-400"
                >
                  <polyline points="16 18 22 12 16 6" className=""></polyline>
                  <polyline points="8 6 2 12 8 18" className=""></polyline>
                </svg>
              </div>

              <div className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-linear-to-b from-rose-500/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 group-hover:h-32 transition-all duration-700 ease-out origin-top"></div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
            <div className="flex flex-col gap-2 max-w-[70%]">
              <h3 className="text-xl font-medium text-white tracking-tight leading-none group-hover:text-rose-200 transition-colors">
                Secure
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                Secure Human Interface Protocols.
              </p>
            </div>
            <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-plus"
              >
                <path d="M5 12h14" className=""></path>
                <path d="M12 5v14" className=""></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="group relative h-56 md:h-96 rounded-md bg-[#0A0A0A] overflow-hidden border border-white/5 transition-colors duration-500 hover:bg-[#111] hover:border-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/5 scale-100 group-hover:scale-125 transition-transform duration-700 ease-out"></div>
              <div className="absolute inset-4 rounded-full border border-white/5 scale-100 group-hover:scale-110 transition-transform duration-700 delay-75 ease-out"></div>
              <div className="absolute inset-8 rounded-full border border-white/10 scale-100 group-hover:scale-105 transition-transform duration-700 delay-150 ease-out border-dashed opacity-50"></div>

              <div className="absolute inset-0 animate-[spin_12s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] opacity-30">
                <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-white -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-white -translate-x-1/2"></div>
                <div className="absolute left-0 top-1/2 w-2 h-0.5 bg-white -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-2 h-0.5 bg-white -translate-y-1/2"></div>
              </div>

              <div className="w-16 h-16 rounded-full bg-blue-500/10 blur-xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10"></div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
            <div className="flex flex-col gap-2 max-w-[70%]">
              <h3 className="text-xl font-medium text-white tracking-tight leading-none group-hover:text-blue-200 transition-colors">
                Creative
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                Creative Human Interface Protocols.
              </p>
            </div>
            <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-plus"
              >
                <path d="M5 12h14" className=""></path>
                <path d="M12 5v14" className=""></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
