import { useMutation } from "@tanstack/react-query";
import { sendPhoneCode, phoneLogin } from "~/api/auth";
import { toast } from "sonner";

export function useSendCode() {
  return useMutation({
    mutationFn: (phone: string) => sendPhoneCode(phone),
    onSuccess: () => {
      toast.success("验证码已发送");
    },
    onError: (error: Error) => {
      toast.error(error.message || "发送验证码失败");
    },
  });
}

export function usePhoneLogin() {
  return useMutation({
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      phoneLogin(phone, code),
    onError: (error: Error) => {
      toast.error(error.message || "登录失败，请重试");
    },
  });
}
