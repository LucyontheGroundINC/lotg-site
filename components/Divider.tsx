export default function Divider({ className = "" }: { className?: string }) {
  return <div className={`h-[2px] bg-[#CA4C4C] w-20 my-6 ${className}`} />;
}
