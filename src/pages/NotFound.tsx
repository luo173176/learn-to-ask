import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-5xl">🤔</p>
      <h1 className="mt-4 text-xl font-bold">页面不存在</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        这个问题本身就需要批判性地追问：你是怎么走到这里的？
      </p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        返回首页
      </Link>
    </div>
  );
}
