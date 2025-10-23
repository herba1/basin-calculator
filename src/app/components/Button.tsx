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
        "bg-highlight ease-out-quart group tracking-body relative h-fit cursor-pointer rounded-lg px-6 py-4 font-bold text-white shadow-md shadow-black/20 transition-transform duration-300 will-change-transform hover:scale-105 active:scale-98",
        className,
      )}
    >
      {children}
      <span className="ease-out-quint pointer-events-none absolute top-0 left-0 inline-block h-full w-full rounded-md bg-gradient-to-b from-white/25 to-white/0 to-50% opacity-0 transition-opacity duration-1000 group-hover:opacity-100"></span>
    </button>
  );
}
