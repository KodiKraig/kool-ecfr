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

export class SearchApi {
  private api: ApisauceInstance;

  constructor(api: ApisauceInstance) {
    this.api = api;
  }

  async countsHierarchy(
    params?: SearchParams,
  ): Promise<CountsHierarchyResponse> {
    return this.get("/search/v1/counts/hierarchy", params);
  }

  async countsDaily(params?: SearchParams): Promise<CountsDailyResponse> {
    return this.get("/search/v1/counts/daily", params);
  }

  private async get<T>(path: string, params?: SearchParams): Promise<T> {
    const _params = this.buildParams(params);

    const _path = _params ? `${path}?${this.buildParams(params)}` : path;

    const response = await this.api.get(_path);

    if (!response.ok) {
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
}
