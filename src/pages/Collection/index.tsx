import {
  ArrowRight,
  Bot,
  Clock3,
  Image,
  Library,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import "./collection.css";

const overview = [
  { label: "活跃项目", value: "12", meta: "其中 4 个项目正在采集" },
  { label: "今日入池笔记", value: "286", meta: "新增高相关 41 篇" },
  { label: "待补素材", value: "07", meta: "优先处理横版封面" },
];

const metrics = [
  { label: "参考笔记池", value: "63", meta: "本周新增 12 篇", accent: "rose" },
  { label: "待生成任务", value: "18", meta: "4 篇封面同步", accent: "amber" },
  { label: "素材可用率", value: "82%", meta: "2 个项目缺横图", accent: "green" },
  { label: "自动生成频率", value: "4h", meta: "下一轮 13:00", accent: "blue" },
];

const groups = [
  { name: "空腹喝法", total: 24, selected: "整组引用", detail: "高收藏问题型笔记" },
  { name: "成分科普", total: 18, selected: "已选 6 篇", detail: "适合做知识拆解" },
  { name: "生活方式", total: 15, selected: "已选 4 篇", detail: "更偏日常记录体" },
];

const notes = [
  {
    title: "空腹喝胶原蛋白，会不会白喝？",
    status: "最新生成",
    meta: "09:11 · 图文笔记",
    summary: "对比 6 篇参考内容后输出，开头用问题切入，正文采用实验记录体。",
  },
  {
    title: "一周状态记录型笔记",
    status: "待补素材",
    meta: "09:16 · 素材中断",
    summary: "正文已生成，但封面横图缺失，系统已挂起等待补图后续跑。",
  },
];

export default function CollectionPage() {
  return (
    <div className="collection-page">
      <section className="collection-overview">
        <div className="collection-overview__main">
          <div className="collection-kicker">
            <Sparkles size={14} />
            顶部通览
          </div>
          <h1>先看全局，再进入采集明细</h1>
          <p>
            这个顶部框专门做总览：把当前项目数量、采集入池情况、待补素材和生成状态先抬出来，进入页面第一眼就能知道今天的盘子。
          </p>
        </div>

        <div className="collection-overview__stats">
          {overview.map((item) => (
            <article key={item.label} className="collection-overview__stat">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.meta}</p>
            </article>
          ))}
        </div>

        <div className="collection-overview__actions">
          <button className="collection-button collection-button--ghost">查看采集池</button>
          <button className="collection-button collection-button--primary">
            新建采集任务
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="collection-hero">
        <div>
          <div className="collection-kicker">
            <Sparkles size={14} />
            笔记采集
          </div>
          <h1>把采集池、素材包和生成队列放进同一块面板里管理</h1>
          <p>
            这里不再只是空状态占位。工作台现在直接展示项目概览、采集分组、生成状态和素材缺口，更接近原型里那种真实业务页面。
          </p>
        </div>
        <div className="collection-hero__actions">
          <button className="collection-button collection-button--ghost">查看采集池</button>
          <button className="collection-button collection-button--primary">
            新建项目
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="collection-metrics">
        {metrics.map((item) => (
          <article key={item.label} className={`collection-metric collection-metric--${item.accent}`}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.meta}</p>
          </article>
        ))}
      </section>

      <section className="collection-grid">
        <article className="collection-card">
          <div className="collection-card__head">
            <div>
              <span className="collection-card__eyebrow">项目概览</span>
              <h2>胶原蛋白饮主项目</h2>
            </div>
            <span className="collection-pill collection-pill--live">自动生成已开启</span>
          </div>

          <div className="collection-banner">
            <strong>本轮参考范围</strong>
            <span>6 篇高相关对标笔记 · 12 张产品图 · 2 份品牌 logo · 8 个关键词</span>
          </div>

          <div className="collection-subgrid">
            <div className="collection-field">
              <div className="collection-field__head">
                <Library size={17} />
                <span>采集分组</span>
              </div>
              <div className="collection-list">
                {groups.map((group) => (
                  <div key={group.name} className="collection-list__item">
                    <div>
                      <strong>{group.name}</strong>
                      <p>{group.detail}</p>
                    </div>
                    <div className="collection-list__meta">
                      <span>{group.total} 篇</span>
                      <em>{group.selected}</em>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="collection-field">
              <div className="collection-field__head">
                <Image size={17} />
                <span>素材策略</span>
              </div>
              <div className="collection-strategy">
                <div>
                  <span>产品图</span>
                  <strong>12 张可用，2 张待替换</strong>
                </div>
                <div>
                  <span>封面逻辑</span>
                  <strong>自动生成，优先问题型标题</strong>
                </div>
                <div>
                  <span>输出去向</span>
                  <strong>生成后直接进入内容池</strong>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="collection-card collection-card--aside">
          <div className="collection-card__head">
            <div>
              <span className="collection-card__eyebrow">生成摘要</span>
              <h2>当前队列</h2>
            </div>
            <Bot size={18} className="collection-card__icon" />
          </div>

          <div className="collection-log">
            <div className="collection-log__item">
              <Clock3 size={16} />
              <p>已完成 2 / 4 篇，预计 2 分钟后跑完本轮。</p>
            </div>
            <div className="collection-log__item">
              <TrendingUp size={16} />
              <p>高互动关键词集中在“空腹喝法”“坚持一周变化”。</p>
            </div>
            <div className="collection-log__item">
              <ShieldAlert size={16} />
              <p>有 1 篇因缺横版素材被挂起，补图后自动继续。</p>
            </div>
          </div>
        </article>
      </section>

      <section className="collection-note-grid">
        {notes.map((note) => (
          <article key={note.title} className="collection-note">
            <div className="collection-note__head">
              <div>
                <span className="collection-card__eyebrow">{note.status}</span>
                <h3>{note.title}</h3>
              </div>
              <span className={`collection-pill ${note.status === "待补素材" ? "collection-pill--warning" : ""}`}>
                {note.meta}
              </span>
            </div>
            <p>{note.summary}</p>
            <button className="collection-button collection-button--ghost">查看详情</button>
          </article>
        ))}
      </section>
    </div>
  );
}
