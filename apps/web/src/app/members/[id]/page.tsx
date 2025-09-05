import { MemberViewWrapper } from "@/app/(home)/components/member-view-wrapper";
import { AppLayout } from "@/components";

interface ViewMemberPageProps {
  params: {
    id: string;
  };
}

export default function ViewMemberPage({ params }: ViewMemberPageProps) {
  return (
    <AppLayout>
      <MemberViewWrapper memberId={params.id} />
    </AppLayout>
  );
}
