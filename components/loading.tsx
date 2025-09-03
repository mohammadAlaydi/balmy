import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse";
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  variant = "spinner",
  text,
  className = "",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const renderSpinner = () => (
    <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      <div
        className={`${sizeClasses[size]} bg-primary rounded-full animate-bounce`}
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className={`${sizeClasses[size]} bg-primary rounded-full animate-bounce`}
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className={`${sizeClasses[size]} bg-primary rounded-full animate-bounce`}
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );

  const renderPulse = () => (
    <div
      className={`${sizeClasses[size]} bg-primary rounded-full animate-pulse`}
    ></div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      {renderLoader()}
      {text && (
        <p className={`text-gray-600 ${textSizeClasses[size]} text-center`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
