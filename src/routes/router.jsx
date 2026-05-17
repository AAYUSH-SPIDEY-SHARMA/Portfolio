import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '../App';

// Lazy load all pages for code splitting
const Home = lazy(() => import('../pages/Home'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPostPage = lazy(() => import('../pages/BlogPostPage'));
const Wall = lazy(() => import('../pages/Wall'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:date/:slug', element: <BlogPostPage /> },
      { path: 'wall', element: <Wall /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
