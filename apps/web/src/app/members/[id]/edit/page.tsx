import { MemberFormWrapper } from "@/app/(home)/components/member-form-wrapper";
import { AppLayout } from "@/components";

interface EditMemberPageProps {
  params: {
    id: string;
  };
}

export default function EditMemberPage({ params }: EditMemberPageProps) {
  return (
    <AppLayout>
      <MemberFormWrapper mode="edit" memberId={params.id} />
    </AppLayout>
  );
}
