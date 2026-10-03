import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useProgressStore } from './store/useProgressStore';
import Home from './pages/Home';
import Chapters from './pages/Chapters';
import ChapterDetail from './pages/ChapterDetail';
import Questions from './pages/Questions';
import Analyzer from './pages/Analyzer';
import Fallacies from './pages/Fallacies';
import Evidence from './pages/Evidence';
import Practice from './pages/Practice';
import AIPrompts from './pages/AIPrompts';
import Search from './pages/Search';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  const theme = useProgressStore((s) => s.theme);

  // 主题持久化：切换时同步到 <html> 的 dark class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/chapters/:id" element={<ChapterDetail />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/fallacies" element={<Fallacies />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/prompts" element={<AIPrompts />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
