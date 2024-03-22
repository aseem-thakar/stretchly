import * as React from "react";
import { clsx } from "clsx";
import { Spinner } from "./Spinner";
import Link from "next/link";

const variants = {
  primary: "bg-primary uppercase font-extrabold",
  secondary: "bg-secondary uppercase font-extrabold",
  inverse: "bg-black text-white",
  info: "bg-gray-600 text-white",
  white: "bg-white text-black",
  black: "bg-black text-white uppercase font-extrabold",
  danger: "bg-red-600 text-white",
};

const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

const thicknesses = {
  sm: "border-2",
  md: "border-4",
  lg: "border-8",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  thickness?: keyof typeof thicknesses;
  isLoading?: boolean;
  href?: string;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      thickness = "md",
      isLoading = false,
      startIcon,
      endIcon,
      href,
      ...props
    },
    ref
  ) => {
    const button = (
      <button
        className={clsx(
          "flex justify-center items-center border-black disabled:opacity-70 disabled:cursor-not-allowed rounded-full shadow-sm focus:outline-none hover:opacity-80",
          thicknesses[thickness],
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        type={type}
        {...props}
      >
        {isLoading ? <Spinner className="text-current" size="sm" /> : null}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    );

    if (href) {
      return <Link href={href}>{button}</Link>;
    }

    return button;
  }
);

Button.displayName = "Button";
