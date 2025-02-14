import { PageContainer } from "@/app/_components/container";
import { PageTitle } from "@/app/_components/title";
import { QueryContent } from "@/app/(.content)/query/_components/query-content";

export default function QueryPage() {
  return (
    <PageContainer>
      <PageTitle
        title="Query Federal Regulations"
        subtitle="Search word counts by keywords and agencies"
      />
      <QueryContent />
    </PageContainer>
  );
}
