import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("order");

  const handleTryAgain = () => {
    primaryAction?.onClick() ?? router.back();
  };

  const handleSecondaryAction = () => {
    secondaryAction?.onClick();
  };

  const handleGoHome = () => {
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleXIcon className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title || t("request-failed")}
        </h1>
        <p className="mt-4 text-muted-foreground">{message || t("request-failed-message")}</p>
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
