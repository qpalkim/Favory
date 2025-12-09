export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[150px] items-center justify-center">
      <div
        className="border-black-100/40 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
