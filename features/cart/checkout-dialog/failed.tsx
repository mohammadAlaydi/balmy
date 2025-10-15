import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { resetStatus } from "@/store/slices/cart-slice";

interface ActionConfig {
  label: string;
  onClick: () => void;
}

interface RequestFailedProps {
  title?: string;
  message?: string;
  primaryAction?: ActionConfig;
  secondaryAction?: ActionConfig;
  showHomeButton?: boolean;
}

export default function Failed({
  title,
  message,
  primaryAction,
  secondaryAction,
  showHomeButton = true,
}: RequestFailedProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("order");
  const handleTryAgain = () => {
    // Reset the status to allow retry
    dispatch(resetStatus());
    // If primary action is provided, use it; otherwise, just reset status
    // This allows the user to retry the payment form
    if (primaryAction?.onClick) {
      primaryAction.onClick();
    }
    // Don't navigate away - let user retry the payment
  };

  const handleSecondaryAction = () => {
    secondaryAction?.onClick();
  };

  const handleGoHome = () => {
    dispatch(resetStatus());
    router.push("/home");
  };

  const handleCloseDialog = () => {
    dispatch(resetStatus());
  };

  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleXIcon className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {title || t("request-failed")}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground">{message || t("request-failed-message")}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={handleTryAgain}>
            {primaryAction?.label || t("try-again")}
          </Button>
          {secondaryAction && (
            <Button variant="outline" onClick={handleSecondaryAction}>
              {secondaryAction.label}
            </Button>
          )}
          {showHomeButton && (
            <Button variant="ghost" onClick={handleGoHome}>
              {t("go-home")}
            </Button>
          )}
          <Button variant="outline" onClick={handleCloseDialog}>
            {t("close-dialog")}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * CircleXIcon component for displaying error state
 * Consider replacing with a proper icon library like lucide-react
 */
function CircleXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
