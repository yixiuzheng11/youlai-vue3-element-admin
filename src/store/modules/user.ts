import AuthAPI from "@/api/auth";
import UserAPI from "@/api/user";
import { resetRouter } from "@/router";
import { store } from "@/store";

import { LoginData } from "@/api/auth/model";
import { UserInfo } from "@/api/user/model";
import { TOKEN_KEY } from "@/enums/CacheEnum";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserInfo>({
    roles: [],
    perms: [],
  });

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  async function login(loginData: LoginData) {
    const data = await AuthAPI.login(loginData);
    console.log("用户信息", data);
    localStorage.setItem(TOKEN_KEY, <string>data.accessToken);
    Object.assign(user.value, { ...data });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  async function getUserInfo() {
    const data = await UserAPI.getInfo();
    Object.assign(user.value, { ...data });
  }

  // user logout
  function logout() {
    localStorage.setItem(TOKEN_KEY, "");
    // 清空路由
    location.reload();
  }

  // remove token
  function resetToken() {
    console.log("resetToken");
    return new Promise<void>((resolve) => {
      localStorage.setItem(TOKEN_KEY, "");
      resetRouter();
      resolve();
    });
  }

  return {
    user,
    login,
    getUserInfo,
    logout,
    resetToken,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
