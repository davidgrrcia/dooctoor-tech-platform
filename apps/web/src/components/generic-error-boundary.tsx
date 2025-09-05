"use client";

import React from "react";
import { NotFound } from "./not-found";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface GenericErrorBoundaryProps {
  children: React.ReactNode;
  entityId?: string;
  entityName?: string;
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export class GenericErrorBoundary extends React.Component<
  GenericErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: GenericErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Check if it's a Convex validation error or other known errors
    if (
      error.message.includes("ArgumentValidationError") ||
      error.message.includes("Value does not match validator") ||
      error.message.includes("CONVEX Q(") ||
      error.message.includes("Server Error")
    ) {
      return { hasError: true, error };
    }

    // For other errors, let them bubble up
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Generic Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const {
        entityId,
        entityName = "elemento",
        title,
        description,
        primaryAction = {
          label: "Ir al Inicio",
          href: "/",
        },
        secondaryAction,
      } = this.props;

      return (
        <NotFound
          title={title || `${entityName} No Encontrado`}
          description={
            description ||
            `El ${entityName} que buscas no existe o ha sido eliminado.`
          }
          entityId={entityId}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
        />
      );
    }

    return this.props.children;
  }
}
