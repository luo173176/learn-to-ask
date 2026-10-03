import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-xs leading-relaxed text-slate-500 dark:border-slate-700 dark:text-slate-400">
        <p>learn-to-ask · 学会提问 · 批判性思维训练营</p>
        <p className="mt-1">本项目与《学会提问》作者及出版社无官方关联 · 代码 MIT · 教学内容 CC BY-NC-SA 4.0</p>
      </footer>
    </div>
  );
}
