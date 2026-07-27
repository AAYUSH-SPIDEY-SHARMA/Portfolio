import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '../App';

// Lazy load all pages for code splitting
const Home = lazy(() => import('../pages/Home'));
const Blog = lazy(() => import('../pages/Blog'));
const Wall = lazy(() => import('../pages/Wall'));
const Contact = lazy(() => import('../pages/Contact'));
const Admin = lazy(() => import('../pages/Admin'));
const NotFound = lazy(() => import('../pages/NotFound'));
const HiddenHome = lazy(() => import('../pages/HiddenHome'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <Blog /> },
      // A single post opens as an overlay on the feed, so it shares the route
      // component — a direct link still lands on the right post.
      { path: 'blog/:slug', element: <Blog /> },
      { path: 'wall', element: <Wall /> },
      { path: 'contact', element: <Contact /> },
      { path: 'admin', element: <Admin /> },
      { path: 'hidden', element: <HiddenHome /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
