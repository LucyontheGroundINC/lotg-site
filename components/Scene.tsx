"use client";

export default function Scene({
  children,
  className = "",
  bgColor = "bg-transparent",
}: {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}) {
  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 ${bgColor} ${className}`}>
      <div className="max-w-2xl mx-auto">{children}</div>
    </section>
  );
}
