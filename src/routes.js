import { lazy } from 'react'

const Home = lazy(() => import(/* webpackChunkName: "home" */ /* webpackPrefetch: true */ './pages/Home'))
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ /* webpackPrefetch: true */ './pages/NotFound'))
const Cart = lazy(() => import(/* webpackChunkName: "cart" */ /* webpackPrefetch: true */ './pages/Cart'))

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '*',
    component: NotFound,
  },
]

export default routes
