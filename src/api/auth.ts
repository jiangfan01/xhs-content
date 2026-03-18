import apiClient, { type ApiResponse } from "./client";
import { persistToken } from "~/utils/auth";

export interface UserInfo {
  id: number;
  nickName: string;
  avatar: string;
  phone: string;
  uuid: string;
}

interface LoginResponseDTO {
  token: string;
  expires_at: number;
}

interface UserInfoDTO {
  ID: number;
  nick_name?: string;
  nickname?: string;
  header_img?: string;
  avatar?: string;
  phone: string;
  uuid: string;
}

export async function sendPhoneCode(phone: string): Promise<void> {
  const res = await apiClient.post<ApiResponse>("/org-jike/login/sendPhoneCode", { phone });
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "发送验证码失败");
  }
}

export async function phoneLogin(phone: string, code: string): Promise<void> {
  const res = await apiClient.post<ApiResponse<LoginResponseDTO>>("/org-jike/login/phoneLogin", {
    phone,
    code,
  });
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "登录失败");
  }
  const { token, expires_at } = res.data.data;
  persistToken(token, expires_at);
}

export async function getUserInfo(): Promise<UserInfo> {
  const res = await apiClient.get<ApiResponse<{ user_info?: UserInfoDTO; userInfo?: UserInfoDTO }>>(
    "/user/getUserInfo"
  );
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "获取用户信息失败");
  }
  const dto = res.data.data.user_info || res.data.data.userInfo;
  if (!dto) throw new Error("用户信息为空");

  return {
    id: dto.ID,
    nickName: dto.nick_name || dto.nickname || "",
    avatar: dto.header_img || dto.avatar || "",
    phone: dto.phone,
    uuid: dto.uuid,
  };
}

export async function logout(): Promise<void> {
  try {
    await apiClient.post("/user/logout");
  } catch {
    // 退出登录即使失败也不阻塞
  }
}
