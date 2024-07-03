import classNames from "classnames";
import { LegacyRef, forwardRef } from "react";
import { Button as PrimeButton, ButtonProps as PrimeButtonProps } from 'primereact/button';

export type ButtonVariant = "solid" | "outline" | "ghost"

export type ButtonProps = {
  variant?: ButtonVariant
} & PrimeButtonProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  variant = "solid",
  ...rest
}, ref) => {
  function ButtonVariant(): ButtonProps["className"] {
    switch (variant) {
      case "ghost":
        return "bg-transparent text-black border-transparent"
      case "outline":
        return "text-orange-500 bg-transparent border-orange-500"
      case "solid":
      default:
        return "text-white bg-orange-500 border-transparent"
    }
  }

  return (
    <PrimeButton
      ref={ref as LegacyRef<ButtonProps>}
      className={
        classNames(
          "inline-flex items-center justify-center min-w-[120px] h-12 p-3 rounded-xl border-[1px] border-solid font-medium outline outline-transparent focus:outline-blue-600",
          ButtonVariant(),
          className
        )
      }
      {...rest}>
      {children}
    </PrimeButton>
  )
});

export default Button
