import { formatDate } from "@/server/lib/ecfr/utils";
import { type ApisauceInstance } from "apisauce";

type SearchParams = {
  query?: string;
  agencySlugs?: string[];
  date?: Date;
  lastModifiedAfter?: Date;
  lastModifiedOnOrAfter?: Date;
  lastModifiedBefore?: Date;
  lastModifiedOnOrBefore?: Date;
};

type Order =
  | "citations"
  | "relevance"
  | "hierarchy"
  | "newest_first"
  | "oldest_first"
  | "suggestions";

type PaginateBy = "results" | "date";

type PaginatedParams = {
  perPage?: number;
  page?: number;
  order?: Order;
  paginateBy?: PaginateBy;
};

type SearchResultsParams = SearchParams & PaginatedParams;

type CountsHierarchyResponse = {
  count: {
    value: number;
    relation: string;
  };
  max_score: number;
  children: CountsHierarchy[];
};

type CountsHierarchy = {
  level: string;
  hierarchy: string | null;
  hierarchy_heading: string | null;
  heading: string | null;
  count: number;
  max_score: number;
  structure_index: string;
  children: CountsHierarchy[];
};

type CountsDailyResponse = {
  dates: Record<string, number>;
};

type SearchResultHeadings = {
  title: string | null;
  subtitle: string | null;
  chapter: string | null;
  subchapter: string | null;
  part: string | null;
  subpart: string | null;
  subject_group: string | null;
  section: string | null;
  appendix: string | null;
};

type SearchResult = {
  starts_on: string;
  ends_on: string | null;
  type: string;
  hierarchy_headings: SearchResultHeadings;
  headings: SearchResultHeadings;
  full_text_excerpt: string | null;
  structure_index: string;
};

type SearchResultsResponse = {
  results: SearchResult[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
    max_score: number | null;
    description: string;
  };
};

export class SearchApi {
  private api: ApisauceInstance;

  constructor(api: ApisauceInstance) {
    this.api = api;
  }

  async results(params?: SearchResultsParams): Promise<SearchResultsResponse> {
    return this.get("/search/v1/results", this.buildPaginatedParams(params));
  }

  async countsHierarchy(
    params?: SearchParams,
  ): Promise<CountsHierarchyResponse> {
    return this.get("/search/v1/counts/hierarchy", this.buildParams(params));
  }

  async countsDaily(params?: SearchParams): Promise<CountsDailyResponse> {
    return this.get("/search/v1/counts/daily", this.buildParams(params));
  }

  private async get<T>(path: string, params?: URLSearchParams): Promise<T> {
    const _path = params ? `${path}?${params}` : path;

    const response = await this.api.get(_path);

    if (!response.ok) {
      console.error(response.originalError);
      throw new Error(response.problem);
    }

    return response.data as T;
  }

  buildParams(params?: SearchParams): URLSearchParams | undefined {
    const queryParams = new URLSearchParams();

    if (params?.query) {
      queryParams.set("query", params.query);
    }

    if (params?.agencySlugs) {
      params.agencySlugs.forEach((slug) => {
        queryParams.append("agency_slugs[]", slug);
      });
    }

    if (params?.date) {
      queryParams.set("date", formatDate(params.date));
    }

    if (params?.lastModifiedAfter) {
      queryParams.set(
        "last_modified_after",
        formatDate(params.lastModifiedAfter),
      );
    }

    if (params?.lastModifiedBefore) {
      queryParams.set(
        "last_modified_before",
        formatDate(params.lastModifiedBefore),
      );
    }

    if (params?.lastModifiedOnOrAfter) {
      queryParams.set(
        "last_modified_on_or_after",
        formatDate(params.lastModifiedOnOrAfter),
      );
    }

    if (params?.lastModifiedOnOrBefore) {
      queryParams.set(
        "last_modified_on_or_before",
        formatDate(params.lastModifiedOnOrBefore),
      );
    }

    return queryParams.size > 0 ? queryParams : undefined;
  }

  buildPaginatedParams(params?: SearchResultsParams): URLSearchParams {
    const queryParams = this.buildParams(params) ?? new URLSearchParams();

    queryParams.set("per_page", params?.perPage?.toString() ?? "20");

    queryParams.set("page", params?.page?.toString() ?? "1");

    queryParams.set("order", params?.order ?? "relevance");

    queryParams.set("paginate_by", params?.paginateBy ?? "results");

    return queryParams;
  }
}
