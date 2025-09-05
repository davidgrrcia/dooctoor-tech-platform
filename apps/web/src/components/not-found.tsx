import Link from "next/link";

interface NotFoundProps {
  title?: string;
  description?: string;
  entityId?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export function NotFound({
  title = "No Encontrado",
  description = "El elemento que buscas no existe o ha sido eliminado.",
  entityId,
  primaryAction = {
    label: "Ir al Inicio",
    href: "/",
  },
  secondaryAction,
}: NotFoundProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="mx-auto max-w-md">
        {/* Title */}
        <h1 className="mb-3 text-2xl font-bold text-gray-900">{title}</h1>

        {/* Description */}
        <p className="mb-6 text-gray-600">
          {description}
          {entityId && (
            <span className="mt-2 block font-mono text-sm text-gray-500">
              ID: {entityId}
            </span>
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={primaryAction.href}
            className="bg-brand hover:bg-brand-hover text-brand-foreground focus:ring-brand inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {primaryAction.label}
          </Link>
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="focus:ring-brand inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
