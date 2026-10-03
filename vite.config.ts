/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 构建时默认使用仓库子路径（GitHub Pages）；自定义域名可用环境变量 VITE_BASE_PATH=/ 覆盖
export default defineConfig(({ command }) => ({
  base: command === 'build' ? process.env.VITE_BASE_PATH || '/learn-to-ask/' : '/',
  plugins: [react()],
  test: {
    // 测试只覆盖数据与工具函数，跑在 node 环境即可
    environment: 'node',
  },
}));
