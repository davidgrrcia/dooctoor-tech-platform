import { MemberForm } from "@/app/(home)/components/member-form";
import { AppLayout } from "@/components";
import { Id } from "@repo/backend/convex/_generated/dataModel";

interface EditMemberPageProps {
  params: {
    id: string;
  };
}

export default function EditMemberPage({ params }: EditMemberPageProps) {
  return (
    <AppLayout>
      <MemberForm mode="edit" memberId={params.id as Id<"members">} />
    </AppLayout>
  );
}
