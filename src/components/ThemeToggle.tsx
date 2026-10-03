import { useProgressStore } from '../store/useProgressStore';

export default function ThemeToggle() {
  const theme = useProgressStore((s) => s.theme);
  const toggleTheme = useProgressStore((s) => s.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="切换主题"
      title={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
      className="rounded-md px-2 py-1 text-base transition hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
