import React from "react";

interface SectionHeaderProps {
  label?: string;        // small text (Browse Pharmacy)
  title: string;         // main title
  highlight?: string;    // highlighted word
  rightContent?: React.ReactNode; // optional right side element (button/link)
  align?: "left" | "center";
}

const SectionHeader = ({
  label,
  title,
  highlight,
  rightContent,
  align = "left",
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-14">
      <div
        className={`space-y-3 max-w-2xl ${
          align === "center" ? "text-center mx-auto" : "text-left"
        }`}
      >
        {label && (
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            {label}
          </h2>
        )}

        <h3 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {title}{" "}
          {highlight && (
            <span className="text-primary">{highlight}</span>
          )}
        </h3>
      </div>

      {rightContent && rightContent}
    </div>
  );
};

export default SectionHeader;