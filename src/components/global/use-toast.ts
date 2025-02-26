import { toast as sonnerToast, type ToastT } from "sonner";

type ToastProps = {
  title: string;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

export function toast({ title, description }: ToastProps) {
  sonnerToast(title, {
    description,
  } as ToastT);
}
