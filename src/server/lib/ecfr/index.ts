import { create, type ApisauceInstance } from "apisauce";
import { env } from "@/env";

import { AdminApi } from "./admin";

class ECFRApi {
  public admin: AdminApi;

  constructor(api: ApisauceInstance) {
    this.admin = new AdminApi(api);
  }
}

const ecfrApi = new ECFRApi(
  create({
    baseURL: `${env.ECFR_BASE_URL}/api`,
  }),
);

export default ecfrApi;
