import { MemberFormWrapper } from "@/app/(home)/components/member-form-wrapper";
import { AppLayout } from "@/components";

export default function CreateMemberPage() {
  return (
    <AppLayout>
      <MemberFormWrapper mode="create" />
    </AppLayout>
  );
}
