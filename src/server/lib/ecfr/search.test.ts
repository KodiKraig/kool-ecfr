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
        query: "testQuery",
        agencySlugs: ["test", "test2"],
        date: new Date("2021-01-02"),
        lastModifiedAfter: new Date("2021-01-03"),
        lastModifiedBefore: new Date("2021-01-04"),
        lastModifiedOnOrAfter: new Date("2021-01-05"),
        lastModifiedOnOrBefore: new Date("2021-01-06"),
      });

      expect(params).toBeDefined();
      expect(params?.get("query")).toBe("testQuery");
      expect(params?.get("date")).toBe("2021-01-02");
      expect(params?.get("last_modified_after")).toBe("2021-01-03");
      expect(params?.get("last_modified_before")).toBe("2021-01-04");
      expect(params?.get("last_modified_on_or_after")).toBe("2021-01-05");
      expect(params?.get("last_modified_on_or_before")).toBe("2021-01-06");
      expect(params?.getAll("agency_slugs[]")).toEqual(["test", "test2"]);
    });
  });
});
