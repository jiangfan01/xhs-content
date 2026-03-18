import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-9 h-9" />

  const isDark = resolvedTheme === 'dark'

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light')
    else if (theme === 'light') setTheme('dark')
    else setTheme('system')
  }

  return (
    <button
      onClick={cycleTheme}
      className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] cursor-pointer
        bg-[var(--interactive-default)] hover:bg-[var(--interactive-hover)]
        text-[var(--icon-default)] transition-colors border border-[var(--border-light)]"
      title={`当前: ${theme} — 点击切换`}
    >
      {theme === 'system' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
        </svg>
      ) : isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
        </svg>
      )}
    </button>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-default)] transition-colors duration-200">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-light)]">
        <h1 className="text-[var(--font-xl)] font-semibold text-[var(--text-heading)] m-0">
          100 CITY
        </h1>
        <ThemeToggle />
      </header>

      {/* Demo Content */}
      <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Brand Card */}
        <div className="bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow">
          <h2 className="text-[var(--font-2xl)] font-semibold text-[var(--text-heading)] mb-2">主题预览</h2>
          <p className="text-[var(--text-secondary)] text-[var(--font-sm)]">
            点击右上角按钮切换 亮色 / 暗色 / 跟随系统 三种模式
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-[var(--radius-full)] text-[var(--font-xs)] bg-[var(--brand-primary-light)] text-[var(--brand-primary-solid)]">
              品牌色
            </span>
            <span className="px-3 py-1 rounded-[var(--radius-full)] text-[var(--font-xs)] bg-[var(--color-success-light)] text-[var(--color-success)]">
              成功
            </span>
            <span className="px-3 py-1 rounded-[var(--radius-full)] text-[var(--font-xs)] bg-[var(--color-warning-light)] text-[var(--color-warning)]">
              警告
            </span>
            <span className="px-3 py-1 rounded-[var(--radius-full)] text-[var(--font-xs)] bg-[var(--color-danger-light)] text-[var(--color-danger)]">
              错误
            </span>
          </div>
        </div>

        {/* Color Palette */}
        <div className="bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-[var(--font-lg)] font-semibold text-[var(--text-heading)] mb-4">色彩系统</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: '品牌主色', color: 'var(--brand-primary-solid)' },
              { label: '品牌强调', color: 'var(--brand-accent-solid)' },
              { label: '成功', color: 'var(--color-success)' },
              { label: '警告', color: 'var(--color-warning)' },
              { label: '错误', color: 'var(--color-danger)' },
              { label: '价格', color: 'var(--color-price)' },
              { label: '文字主色', color: 'var(--text-primary)' },
              { label: '文字辅助', color: 'var(--text-muted)' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-[var(--radius-md)] shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[var(--font-xs)] text-[var(--text-secondary)]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tag Demo */}
        <div className="bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-[var(--font-lg)] font-semibold text-[var(--text-heading)] mb-4">工作流标签</h2>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: '博主', bg: 'var(--tag-blogger-bg)', text: 'var(--tag-blogger-text)' },
              { label: '模板', bg: 'var(--tag-template-bg)', text: 'var(--tag-template-text)' },
              { label: '音色', bg: 'var(--tag-audio-bg)', text: 'var(--tag-audio-text)' },
              { label: '数字人', bg: 'var(--tag-video-bg)', text: 'var(--tag-video-text)' },
              { label: '@提及', bg: 'var(--tag-mention-bg)', text: 'var(--tag-mention-text)' },
            ].map((tag) => (
              <span
                key={tag.label}
                className="px-2.5 py-1 rounded-[var(--radius-sm)] text-[var(--font-xs)] font-medium"
                style={{ backgroundColor: tag.bg, color: tag.text }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
