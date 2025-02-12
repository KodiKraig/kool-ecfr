import { type ApisauceInstance } from "apisauce";

export type CFRReference = {
  title?: number;
  chapter?: string;
  subchapter?: string;
};

export type Agency = {
  name: string;
  short_name: string;
  display_name: string;
  sortable_name: string;
  slug: string;
  children: Agency[];
  cfr_references: CFRReference[];
};

export type AgenciesResponse = {
  agencies: Agency[];
};

export class AdminApi {
  private api: ApisauceInstance;

  constructor(api: ApisauceInstance) {
    this.api = api;
  }

  async getAgencies(): Promise<AgenciesResponse> {
    const response = await this.api.get("/admin/v1/agencies.json");

    if (!response.ok) {
      throw new Error("Failed to fetch agencies");
    }

    return response.data as AgenciesResponse;
  }
}
