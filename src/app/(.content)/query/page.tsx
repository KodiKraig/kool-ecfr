import { PageContainer } from "@/app/_components/container";
import { PageTitle } from "@/app/_components/title";
import { SearchResults } from "@/app/_components/search-results";

export default function QueryPage() {
  return (
    <PageContainer>
      <PageTitle
        title="Query Regulations"
        subtitle="Search word counts by keywords and agencies"
      />
      <SearchResults />
    </PageContainer>
  );
}
