import request from "@/utils/request";
import { CaptchaResult, LoginData, LoginResult } from "./model";
import cryptUtil from "@/utils/cryptUtil";

class AuthAPI {
  /**
   * 登录API
   *
   * @param data {LoginData}
   * @returns
   */
  static login(data: LoginData) {
    const formData = new FormData();
    formData.append("userName", data.username);
    const encryptPassword = cryptUtil.encrypt(data.password);
    formData.append("password", encryptPassword);
    formData.append("captchaKey", data.captchaKey || "");
    formData.append("captchaCode", data.captchaCode || "");
    return request<any, LoginResult>({
      url: "/auth/login",
      method: "post",
      data: formData,
    });
  }

  /**
   * 注销API
   */
  static logout() {
    return request({
      url: "/auth/logout",
      method: "get",
    });
  }

  /**
   * 获取验证码
   */
  static getCaptcha() {
    return request<any, CaptchaResult>({
      url: "/auth/getCaptcha",
      method: "get",
    });
  }
}

export default AuthAPI;
