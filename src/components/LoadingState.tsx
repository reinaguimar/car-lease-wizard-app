
import { Loader } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export function LoadingState({ 
  message = "Carregando dados...", 
  size = "medium" 
}: LoadingStateProps) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12"
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <Loader className={`${sizeClasses[size]} animate-spin mb-4 text-primary`} />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
