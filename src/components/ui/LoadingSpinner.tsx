type LoadingSpinnerProps = {
  size?: "sm" | "md";
};

export default function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  const sizeClass = size === "sm" ? "h-5 w-5 border-2" : "h-12 w-12 border-4";

  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-black-100/40 animate-spin rounded-full border-t-transparent ${sizeClass}`}
        role="status"
      />
    </div>
  );
}
