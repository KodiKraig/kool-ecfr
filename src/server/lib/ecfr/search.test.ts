import { SearchApi } from "./search";
import { describe, it, expect, beforeEach } from "vitest";
import { type ApisauceInstance } from "apisauce";
import { mock, type MockProxy } from "vitest-mock-extended";

describe("SearchApi", () => {
  let api: MockProxy<ApisauceInstance>;
  let searchApi: SearchApi;

  beforeEach(() => {
    api = mock<ApisauceInstance>();
    searchApi = new SearchApi(api);
  });

  it("should be defined", () => {
    expect(SearchApi).toBeDefined();
  });

  describe("buildParams", () => {
    it("should return undefined for empty params", () => {
      const params = searchApi.buildParams();

      expect(params).toBeUndefined();
    });

    it("should build params", () => {
      const params = searchApi.buildParams({
        ...DEFAULT_PARAMS,
      });

      expect(params).toBeDefined();
      expectDefaultParams(params);
    });
  });

  describe("buildPaginatedParams", () => {
    it("should return defaults for empty params", () => {
      const params = searchApi.buildPaginatedParams();

      expect(params).toBeDefined();
      expect(params.get("per_page")).toBe("20");
      expect(params.get("page")).toBe("1");
      expect(params.get("order")).toBe("relevance");
      expect(params.get("paginate_by")).toBe("results");
    });

    it("should build params", () => {
      const params = searchApi.buildPaginatedParams({
        perPage: 10,
        page: 2,
        order: "newest_first",
        paginateBy: "date",
        ...DEFAULT_PARAMS,
      });

      expect(params).toBeDefined();
      expect(params.get("per_page")).toBe("10");
      expect(params.get("page")).toBe("2");
      expect(params.get("order")).toBe("newest_first");
      expect(params.get("paginate_by")).toBe("date");
      expectDefaultParams(params);
    });
  });
});

const DEFAULT_PARAMS = {
  query: "testQuery",
  agencySlugs: ["test", "test2"],
  date: new Date("2021-01-02"),
  lastModifiedAfter: new Date("2021-01-03"),
  lastModifiedBefore: new Date("2021-01-04"),
  lastModifiedOnOrAfter: new Date("2021-01-05"),
  lastModifiedOnOrBefore: new Date("2021-01-06"),
};

const expectDefaultParams = (params: URLSearchParams | undefined) => {
  expect(params?.get("query")).toBe("testQuery");
  expect(params?.get("date")).toBe("2021-01-02");
  expect(params?.get("last_modified_after")).toBe("2021-01-03");
  expect(params?.get("last_modified_before")).toBe("2021-01-04");
  expect(params?.get("last_modified_on_or_after")).toBe("2021-01-05");
  expect(params?.get("last_modified_on_or_before")).toBe("2021-01-06");
  expect(params?.getAll("agency_slugs[]")).toEqual(["test", "test2"]);
};
