import {
  ReactNode,
  Ref,
  useId,
  TextareaHTMLAttributes,
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
        "text-md lg:text-2lg text-black-500 mb-2 flex items-center gap-1 font-medium md:mb-[10px] md:text-lg",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-md lg:text-2lg text-error-100 md:text-lg">*</span>
      )}
    </label>
  );
}

export function Error({ children }: { children: ReactNode }) {
  return (
    <span className="text-error-100 lg:text-md ml-3 block text-xs">
      {children}
    </span>
  );
}

const textareaVariants = cva(
  "w-full min-h-[100px] md:min-h-[132px] text-black-500 placeholder:text-black-200 rounded-md bg-white border hover:bg-black-10 focus:outline-none transition-colors duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default: "text-sm md:text-md px-3 pt-2",
        form: "text-sm md:text-md lg:text-lg px-3 pt-3",
      },
      state: {
        default:
          "border-black-200 focus:border-green-600 focus:bg-green-500/7 focus:shadow-[0_0_0_3px_rgba(7,102,83,0.4)]",
        error:
          "border-error-100 focus:border-error-100 focus:bg-error-100/7 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.4)]",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "default",
    },
  },
);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
}

export default function Textarea({
  label,
  required,
  error,
  ref,
  state,
  className,
  variant,
  ...props
}: TextareaProps) {
  const id = useId();

  return (
    <>
      {label && (
        <Label required={required} htmlFor={id}>
          {label}
        </Label>
      )}
      <textarea
        id={id}
        ref={ref}
        required={required}
        aria-invalid={!!error}
        className={cn(
          textareaVariants({
            variant: variant,
            state: error ? "error" : state,
          }),
          className,
        )}
        {...props}
      />
      {error && <Error>{error}</Error>}
    </>
  );
}
