import { qhSecuredLS } from "~/utils/secure-ls";

export default class PH_CONSTANTS {
  static AUTH_TOKEN = "auth-token";
  static APP_NAME = "Pharmease";
  public static USERNAME = "";
  static SET_USER_TYPE(type: any) {
    qhSecuredLS.set("user-type", type);
  }
  public static GET_USER_TYPE = () => qhSecuredLS.get("user-type");
}
