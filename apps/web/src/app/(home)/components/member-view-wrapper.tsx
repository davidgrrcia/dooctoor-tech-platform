import { GenericErrorBoundary, NotFound } from "@/components";
import { Id } from "@repo/backend/convex/_generated/dataModel";
import { isValidConvexId } from "../utils";
import { MemberView } from "./member-view";

interface MemberViewWrapperProps {
  memberId: string;
}

export function MemberViewWrapper({ memberId }: MemberViewWrapperProps) {
  // Validate the member ID first
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

  // If ID is valid, render the view with error boundary
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
      <MemberView memberId={memberId as Id<"members">} />
    </GenericErrorBoundary>
  );
}
