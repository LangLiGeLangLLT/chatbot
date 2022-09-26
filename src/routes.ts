import { IRouterConfig, lazy } from 'ice';
import Layout from '@/layouts/BasicLayout';

const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/home',
        redirect: '/',
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
