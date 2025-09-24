import { ReactNode, Ref, useId } from "react";
import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  PropsWithChildren,
} from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export function Label({
  required,
  children,
  className,
  ...props
}: PropsWithChildren<
  LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>) {
  return (
    <label
      className={cn(
        "text-md flex items-center gap-1 font-medium text-black lg:text-lg",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-error-100 text-lg font-medium">*</span>
      )}
    </label>
  );
}

export function Error({ children }: { children: ReactNode }) {
  return (
    <span className="text-error-100 lg:text-md mt-2 block text-sm">
      {children}
    </span>
  );
}

const inputVariants = cva(
  "mt-2 h-[32px] w-full rounded-md border bg-white p-3 text-sm text-black placeholder:text-black-200 focus:outline-none transition-colors duration-150 md:h-[38px] lg:h-[40px] lg:text-md disabled:opacity-50 disabled:bg-black-200/7 disabled:cursor-not-allowed",
  {
    variants: {
      state: {
        default:
          "border-black-200 hover:bg-black-200/7 focus:border-green-500 focus:bg-green-500/7 focus:shadow-[0_0_0_3px_rgba(7,102,83,0.4)]",
        error:
          "border-error-100 hover:bg-black-200/7 focus:border-error-500 focus:bg-error-100/7 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.4)]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  inputRef?: Ref<HTMLInputElement>;
}

export default function Input({
  label,
  error,
  className,
  inputRef,
  required,
  disabled,
  state,
  ...props
}: InputProps) {
  const id = useId();

  return (
    <div>
      {label && (
        <Label required={required} htmlFor={id}>
          {label}
        </Label>
      )}
      <input
        id={id}
        ref={inputRef}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        className={cn(
          inputVariants({ state: error ? "error" : state, className }),
        )}
        {...props}
      />
      {error && <Error>{error}</Error>}
    </div>
  );
}
