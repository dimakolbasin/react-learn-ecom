import { lazy } from 'react'

const Home = lazy(() => import(/* webpackChunkName: "home" */ /* webpackPreload: true */ 'theme/pages/Home'))
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ /* webpackPreload: true */ 'theme/pages/NotFound'))
const Cart = lazy(() => import(/* webpackChunkName: "cart" */ /* webpackPreload: true */ 'theme/pages/Cart'))

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
