import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { to: '/', label: '首页' },
  { to: '/chapters', label: '章节地图' },
  { to: '/questions', label: '关键问题' },
  { to: '/analyzer', label: '论证分析器' },
  { to: '/fallacies', label: '谬误图鉴' },
  { to: '/evidence', label: '证据评估' },
  { to: '/practice', label: '练习模式' },
  { to: '/prompts', label: 'AI 提示词' },
  { to: '/search', label: '搜索' },
  { to: '/about', label: '关于' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded-md px-2 py-1 text-sm transition ${
      isActive
        ? 'bg-primary-600 text-white'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3">
        <Link to="/" className="mr-2 flex items-center gap-2 font-bold text-primary-700 dark:text-primary-300">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-white">?</span>
          <span className="hidden sm:inline">学会提问</span>
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <ThemeToggle />
          <button
            type="button"
            aria-label="打开菜单"
            className="rounded-md px-2 py-1 lg:hidden"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* 移动端导航 */}
      {open && (
        <nav className="grid grid-cols-2 gap-1 border-t border-slate-200 px-4 py-2 sm:grid-cols-3 lg:hidden dark:border-slate-700">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
