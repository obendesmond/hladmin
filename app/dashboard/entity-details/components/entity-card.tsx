import { cn } from "@/lib/utils";

interface Props {
  name: string;
  className?: string;
  onClick?: () => void;
}
export default function EntityCard({ name, className, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex justify-center items-center w-40 h-40 bg-white shadow-md hover:shadow-lg rounded-sm border overflow-hidden cursor-pointer",
        className
      )}
    >
      <h1>{name}</h1>
      <div className="w-32 h-32 bg-primary-light rounded-full absolute -top-20 -right-20" />
    </div>
  );
}
