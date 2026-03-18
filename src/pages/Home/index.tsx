import {
  ArrowRight,
  Bot,
  ChartNoAxesCombined,
  DatabaseZap,
  Layers3,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "~/contexts/useAuth";
import "./home.css";

const stats = [
  { value: "12K+", label: "日均采集笔记池" },
  { value: "4 步", label: "从采集到生成闭环" },
  { value: "82%", label: "素材命中率追踪" },
];

const features = [
  {
    icon: DatabaseZap,
    title: "自动采集对标笔记",
    description:
      "按关键词、场景词和竞品词批量抓取小红书内容，沉淀成可筛选的项目级采集池。",
  },
  {
    icon: ChartNoAxesCombined,
    title: "内容结构拆解",
    description:
      "从标题模式、开头钩子、情绪曲线到评论高频点，先提炼有效结构，再进入生成。",
  },
  {
    icon: Bot,
    title: "生成策略可编排",
    description:
      "按项目配置参考笔记、素材包、关键词和更新频率，让每轮生成遵循统一策略。",
  },
  {
    icon: ShieldCheck,
    title: "交付前质量兜底",
    description:
      "识别缺图、缺封面、素材风格不匹配等问题，把失败任务挂起，而不是悄悄产出废稿。",
  },
];

const workflow = [
  {
    index: "01",
    title: "采集",
    description: "把竞品、博主、关键词和评论反馈汇成项目采集池。",
  },
  {
    index: "02",
    title: "筛选",
    description: "在分组里挑出高价值参考笔记，控制本轮生成参考范围。",
  },
  {
    index: "03",
    title: "生成",
    description: "把素材、模板、风格约束和频率策略组合成自动化生产线。",
  },
  {
    index: "04",
    title: "交付",
    description: "结果进入内容池，异常任务回流到待补素材列表继续处理。",
  },
];

const boardItems = [
  { label: "采集分组", value: "6 组", meta: "品牌词 / 场景词 / 评论需求" },
  { label: "参考笔记", value: "63 篇", meta: "当前锁定 12 篇高相关内容" },
  { label: "生成队列", value: "18 篇", meta: "其中 4 篇封面同步生成" },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="xhs-home">
      <div className="xhs-home__orb xhs-home__orb--left" />
      <div className="xhs-home__orb xhs-home__orb--right" />

      <header className="xhs-home__nav">
        <Link to="/" className="xhs-home__brand">
          <span className="xhs-home__brand-mark">C</span>
          <span>
            <strong>24CITY Content Engine</strong>
            <small>小红书采集与笔记生成系统</small>
          </span>
        </Link>

        <div className="xhs-home__nav-actions">
          <Link to={isAuthenticated ? "/workspace" : "/login"} className="xhs-home__ghost-link">
            {isAuthenticated ? "进入工作台" : "登录"}
          </Link>
          <Link to={isAuthenticated ? "/workspace" : "/login"} className="xhs-home__primary-link">
            {isAuthenticated ? "打开内容引擎" : "立即体验"}
          </Link>
        </div>
      </header>

      <main className="xhs-home__main">
        <section className="xhs-home__hero">
          <div className="xhs-home__hero-copy">
            <div className="xhs-home__eyebrow">
              <Sparkles size={14} />
              采集驱动的内容生产
            </div>

            <h1>
              不是单纯写笔记。
              <br />
              是先把小红书内容池建起来，再稳定生成。
            </h1>

            <p className="xhs-home__hero-text">
              xhs-content 的核心不是一次性 AI 写作，而是围绕项目制运营，把对标笔记采集、素材管理、策略配置和批量生成串成一条可持续复用的生产线。
            </p>

            <div className="xhs-home__hero-actions">
              <Link to={isAuthenticated ? "/workspace" : "/login"} className="xhs-home__cta xhs-home__cta--primary">
                {isAuthenticated ? "进入工作台" : "登录并开始"}
                <ArrowRight size={16} />
              </Link>
              <a href="#workflow" className="xhs-home__cta xhs-home__cta--ghost">
                查看业务流程
              </a>
            </div>

            <div className="xhs-home__stats">
              {stats.map((item) => (
                <div key={item.label} className="xhs-home__stat">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="xhs-home__hero-board">
            <div className="xhs-home__board-top">
              <div>
                <span className="xhs-home__board-kicker">项目快照</span>
                <h2>胶原蛋白饮主项目</h2>
              </div>
              <span className="xhs-home__live-pill">AI 自动生成中</span>
            </div>

            <div className="xhs-home__board-grid">
              {boardItems.map((item) => (
                <div key={item.label} className="xhs-home__board-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.meta}</p>
                </div>
              ))}
            </div>

            <div className="xhs-home__board-flow">
              <div className="xhs-home__board-flow-head">
                <Workflow size={18} />
                <span>本轮生成链路</span>
              </div>
              <div className="xhs-home__flow-line">
                <span>关键词采集</span>
                <i />
                <span>筛掉低质量笔记</span>
                <i />
                <span>匹配素材</span>
                <i />
                <span>输出到内容池</span>
              </div>
            </div>

            <div className="xhs-home__note-preview">
              <div className="xhs-home__note-preview-head">
                <span>最新生成笔记</span>
                <span>09:11</span>
              </div>
              <h3>“空腹喝胶原蛋白到底有没有用？”真实体验型图文笔记</h3>
              <p>
                从 24 篇候选里筛出 6 篇高相关参考，当前版本已补齐封面标题和产品卖点节奏，等待人工过稿。
              </p>
            </div>
          </div>
        </section>

        <section className="xhs-home__section">
          <div className="xhs-home__section-head">
            <span>能力结构</span>
            <h2>参考 jike-geo 的产品表达，但更聚焦内容团队的实际生产动作</h2>
          </div>
          <div className="xhs-home__feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="xhs-home__feature-card">
                <div className="xhs-home__feature-icon">
                  <feature.icon size={22} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="xhs-home__section xhs-home__section--workflow">
          <div className="xhs-home__section-head">
            <span>业务闭环</span>
            <h2>首页不再只是登录弹框，而是把这套业务为什么成立说清楚</h2>
          </div>
          <div className="xhs-home__workflow-grid">
            {workflow.map((item) => (
              <article key={item.index} className="xhs-home__workflow-card">
                <span className="xhs-home__workflow-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="xhs-home__section xhs-home__section--split">
          <div className="xhs-home__story-card">
            <div className="xhs-home__story-head">
              <Layers3 size={18} />
              项目制管理
            </div>
            <h2>每个项目都维护自己的参考库、素材包和生成策略</h2>
            <p>
              不把所有笔记混在一个大池子里，而是围绕单个品牌或单个 campaign
              去组织采集结果，这样后续生成风格、素材和发布节奏才能稳定。
            </p>
          </div>

          <div className="xhs-home__story-card xhs-home__story-card--dark">
            <div className="xhs-home__story-head">
              <Bot size={18} />
              结果不是终点
            </div>
            <h2>真正重要的是失败任务可追踪，素材缺口可回补</h2>
            <p>
              生成失败、缺图、品牌素材不匹配，都要回流到任务面板里继续处理，这也是原型里那种工作台感的关键。
            </p>
          </div>
        </section>

        <section className="xhs-home__closing">
          <div>
            <span className="xhs-home__closing-kicker">准备开始</span>
            <h2>把首页、登录页和工作台统一成一套完整产品语言</h2>
            <p>现在可以从业务介绍页进入登录，再进入新的内容采集与生成工作台。</p>
          </div>
          <Link to={isAuthenticated ? "/workspace" : "/login"} className="xhs-home__cta xhs-home__cta--primary">
            {isAuthenticated ? "继续使用" : "登录体验"}
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    </div>
  );
}
