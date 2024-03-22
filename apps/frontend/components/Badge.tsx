import clsx from "clsx";
import * as React from "react";

const variants = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  lightsecondary: "bg-lightsecondary",
  inverse: "bg-black text-white",
  info: "bg-gray-600 text-white",
  white: "bg-white text-black",
  black: "bg-black text-white",
  danger: "bg-red-600 text-white",
};

interface BadgeProps {
  variant?: keyof typeof variants;
  children: React.ReactNode;
}

export function Badge({ children, variant = "lightsecondary" }: BadgeProps) {
  return (
    <span
      className={clsx(
        variants[variant],
        "border-black border-2 inline-flex items-center gap-x-1.5 rounded-full px-4 py-2 text-sm font-medium text-black"
      )}
    >
      <svg
        className="h-1.5 w-1.5 fill-yellow-500"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      {children}
    </span>
  );
}
