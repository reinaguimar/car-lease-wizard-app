
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Carregando dados..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
