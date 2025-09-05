import { GenericErrorBoundary, NotFound } from "@/components";
import { isValidConvexId } from "../utils";
import { MemberForm } from "./member-form";

interface MemberFormWrapperProps {
  memberId?: string;
  mode: "create" | "edit";
}

export function MemberFormWrapper({ memberId, mode }: MemberFormWrapperProps) {
  // For create mode, no validation needed
  if (mode === "create") {
    return <MemberForm mode="create" />;
  }

  // For edit mode, validate the member ID first
  if (!memberId) {
    return (
      <NotFound
        title="Miembro No Encontrado"
        description="El miembro que buscas no existe o ha sido eliminado."
        primaryAction={{
          label: "Ver Todos los Miembros",
          href: "/",
        }}
        secondaryAction={{
          label: "Crear Nuevo Miembro",
          href: "/members/create",
        }}
      />
    );
  }

  // Check if the ID format is valid
  if (!isValidConvexId(memberId)) {
    return (
      <NotFound
        title="Miembro No Encontrado"
        description="El miembro que buscas no existe o ha sido eliminado."
        entityId={memberId}
        primaryAction={{
          label: "Ver Todos los Miembros",
          href: "/",
        }}
        secondaryAction={{
          label: "Crear Nuevo Miembro",
          href: "/members/create",
        }}
      />
    );
  }

  // If ID is valid, render the form with proper typing and error boundary
  return (
    <GenericErrorBoundary
      entityId={memberId}
      entityName="miembro"
      title="Miembro No Encontrado"
      description="El miembro que buscas no existe o ha sido eliminado."
      primaryAction={{
        label: "Ver Todos los Miembros",
        href: "/",
      }}
      secondaryAction={{
        label: "Crear Nuevo Miembro",
        href: "/members/create",
      }}
    >
      <MemberForm mode="edit" memberId={memberId} />
    </GenericErrorBoundary>
  );
}
