import cn from "../utils/cn";
export default function Button({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      {...props}
      className={cn(
        "bg-highlight mask-t-to-b text-white font-bold tracking-body rounded-lg shadow-md shadow-black/20 px-6 py-4",
        className
      )}
    >
      {children}
    </button>
  );
}
