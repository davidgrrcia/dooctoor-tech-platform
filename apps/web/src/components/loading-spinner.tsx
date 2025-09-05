interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  message?: string;
  className?: string;
  inline?: boolean;
}

export function LoadingSpinner({
  size = "md",
  message,
  className = "",
  inline = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerClasses = {
    xs: "h-16",
    sm: "h-32",
    md: "h-64",
    lg: "h-96",
  };

  // Inline spinner for buttons and small areas
  if (inline) {
    return (
      <div
        className={`border-brand ${sizeClasses[size]} animate-spin rounded-full border-2 border-t-transparent ${className}`}
      />
    );
  }

  // Full loading state with optional message
  return (
    <div
      className={`flex ${containerClasses[size]} items-center justify-center ${className}`}
    >
      <div className="text-center">
        <div
          className={`border-brand mx-auto mb-4 ${sizeClasses[size]} animate-spin rounded-full border-4 border-t-transparent`}
        />
        {message && <p className="text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
