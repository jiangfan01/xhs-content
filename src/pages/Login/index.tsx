import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Bot, DatabaseZap, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { usePhoneLogin, useSendCode } from "~/hooks/useLogin";
import { useAuth } from "~/contexts/useAuth";
import "./login.css";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const { isAuthenticated, onLoginSuccess } = useAuth();
  const sendCodeMutation = useSendCode();
  const loginMutation = usePhoneLogin();

  useEffect(() => {
    if (isAuthenticated) navigate("/workspace", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const isPhoneValid = /^1\d{10}$/.test(phone);

  const handleSendCode = useCallback(() => {
    if (countdown > 0 || !isPhoneValid) return;
    sendCodeMutation.mutate(phone, {
      onSuccess: () => setCountdown(60),
    });
  }, [countdown, isPhoneValid, phone, sendCodeMutation]);

  const handleLogin = useCallback(() => {
    if (!isPhoneValid || !code.trim()) {
      toast.error("请输入正确的手机号和验证码");
      return;
    }

    loginMutation.mutate(
      { phone, code },
      {
        onSuccess: async () => {
          await onLoginSuccess();
          toast.success("登录成功");
          navigate("/workspace", { replace: true });
        },
      }
    );
  }, [code, isPhoneValid, loginMutation, navigate, onLoginSuccess, phone]);

  return (
    <main className="xhs-login">
      <div className="xhs-login__orb xhs-login__orb--left" />
      <div className="xhs-login__orb xhs-login__orb--right" />

      <div className="xhs-login__shell">
        <section className="xhs-login__brand-panel">
          <Link to="/" className="xhs-login__brand-back">
            返回首页
          </Link>
          <div className="xhs-login__brand-mark">C</div>
          <span className="xhs-login__kicker">
            <Sparkles size={14} />
            Content Engine
          </span>
          <h1>小红书采集与笔记生成工作台</h1>
          <p>
            先建立项目采集池，再用素材和策略驱动 AI 生成，让内容生产从“临时写一篇”升级成“可持续跑起来”。
          </p>

          <div className="xhs-login__feature-list">
            <div className="xhs-login__feature-item">
              <DatabaseZap size={16} />
              <span>按项目沉淀参考笔记与评论信号</span>
            </div>
            <div className="xhs-login__feature-item">
              <Bot size={16} />
              <span>批量生成笔记并追踪失败任务</span>
            </div>
          </div>
        </section>

        <section className="xhs-login__form-panel">
          <div>
            <h2>欢迎登录</h2>
            <p className="xhs-login__subtitle">新手机号将自动注册账号</p>
          </div>

          <div className="xhs-login__fields">
            <label className="xhs-login__label">
              手机号
              <div className="xhs-login__input-wrap">
                <Phone size={18} />
                <input
                  type="tel"
                  maxLength={11}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="请输入手机号"
                />
              </div>
            </label>

            <label className="xhs-login__label">
              验证码
              <div className="xhs-login__input-wrap xhs-login__input-wrap--code">
                <ShieldCheck size={18} />
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="请输入验证码"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!isPhoneValid || countdown > 0 || sendCodeMutation.isPending}
                  className="xhs-login__code-button"
                >
                  {countdown > 0 ? `${countdown}s` : sendCodeMutation.isPending ? "发送中..." : "获取验证码"}
                </button>
              </div>
            </label>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={!isPhoneValid || !code.trim() || loginMutation.isPending}
            className="xhs-login__submit"
          >
            {loginMutation.isPending ? (
              "登录中..."
            ) : (
              <>
                登录并进入工作台
                <ArrowRight size={17} />
              </>
            )}
          </button>

          <div className="xhs-login__footer">
            <span>首次登录自动创建账号</span>
            <span>验证码登录更适合内部团队快速使用</span>
          </div>
        </section>
      </div>
    </main>
  );
}
