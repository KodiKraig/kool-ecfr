import { create, type ApisauceInstance } from "apisauce";
import { env } from "@/env";

import { AdminApi } from "./admin";
import { SearchApi } from "./search";

class ECFRApi {
  public admin: AdminApi;
  public search: SearchApi;

  constructor(api: ApisauceInstance) {
    this.admin = new AdminApi(api);
    this.search = new SearchApi(api);
  }
}

const instance = create({
  baseURL: `${env.ECFR_BASE_URL}/api`,
});

const ecfrApi = new ECFRApi(instance);

export default ecfrApi;
