import { MemberForm } from "@/app/(home)/components/member-form";
import { AppLayout } from "@/components";

export default function CreateMemberPage() {
  return (
    <AppLayout>
      <MemberForm mode="create" />
    </AppLayout>
  );
}
