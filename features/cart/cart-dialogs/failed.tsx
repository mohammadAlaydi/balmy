import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ActionConfig {
  label: string;
  onClick: () => void;
}

interface RequestFailedProps {
  /** The title displayed in the error dialog */
  title?: string;
  /** The error message displayed below the title */
  message?: string;
  /** Primary action button configuration */
  primaryAction?: ActionConfig;
  /** Secondary action button configuration */
  secondaryAction?: ActionConfig;
  /** Whether to show the "Go Home" button */
  showHomeButton?: boolean;
}

/**
 * RequestFailed component displays an error state with customizable actions
 * Used for showing failed requests, errors, or unsuccessful operations
 */
export default function RequestFailed({
  title = "Request Failed",
  message = "We're sorry, but your request was unsuccessful. Please try again.",
  primaryAction,
  secondaryAction,
  showHomeButton = true,
}: RequestFailedProps) {
  const router = useRouter();

  const handleTryAgain = () => {
    primaryAction?.onClick() ?? router.back();
  };

  const handleSecondaryAction = () => {
    secondaryAction?.onClick();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleXIcon className="mx-auto h-12 w-12 text-red-500" />

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>

        <p className="mt-4 text-muted-foreground">{message}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={handleTryAgain}>
            {primaryAction?.label || "Try Again"}
          </Button>

          {secondaryAction && (
            <Button variant="outline" onClick={handleSecondaryAction}>
              {secondaryAction.label}
            </Button>
          )}

          {showHomeButton && (
            <Button variant="ghost" onClick={handleGoHome}>
              Go Home
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
