import {
  ReactNode,
  Ref,
  useId,
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
        "text-md text-black-500 mb-2 flex items-center gap-1 font-medium md:mb-[10px] md:text-lg",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="text-md text-error-100 md:text-lg">*</span>}
    </label>
  );
}

export function Error({ children }: { children: ReactNode }) {
  return (
    <span className="text-error-100 mt-2 ml-3 block text-xs">{children}</span>
  );
}

const inputVariants = cva(
  "w-full h-[36px] md:h-[38px] px-3 text-sm md:text-md text-black-500 placeholder:text-black-200 rounded-md bg-white border hover:bg-black-10 focus:outline-none transition-colors duration-200 ease-in-out",
  {
    variants: {
      state: {
        default:
          "border-black-200 focus:border-green-600 focus:bg-green-10 focus:shadow-[0_0_0_3px_rgba(7,102,83,0.4)]",
        error:
          "border-error-100 focus:border-error-100 focus:bg-error-100/7 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.4)]",
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
  ref?: Ref<HTMLInputElement>;
}

export default function Input({
  label,
  required,
  error,
  ref,
  state,
  className,
  ...props
}: InputProps) {
  const id = useId();

  return (
    <>
      {label && (
        <Label required={required} htmlFor={id}>
          {label}
        </Label>
      )}
      <input
        id={id}
        ref={ref}
        required={required}
        aria-invalid={!!error}
        className={cn(
          inputVariants({ state: error ? "error" : state }),
          className,
        )}
        {...props}
      />
      {error && <Error>{error}</Error>}
    </>
  );
}
