import { qhSecuredLS } from "~/utils/secure-ls";

export default class GP_CONSTANTS {
  static ACCESS_TOKEN = "access-token";
  static REFRESH_TOKEN = "refresh-token";

  static APP_NAME = "Greep Customers";
  public static USERNAME = "";
  static SET_USER_TYPE(type: any) {
    qhSecuredLS.set("user-type", type);
  }
  public static GET_USER_TYPE = () => qhSecuredLS.get("user-type");
}
