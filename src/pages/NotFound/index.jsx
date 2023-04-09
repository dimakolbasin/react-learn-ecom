import { lazy } from 'react'

const NotFoundBlock = lazy(() => import(/* webpackChunkName: "not-found-block" */ 'theme/components/NotFoundBlock'))

function NotFound() {
  return <NotFoundBlock />
}

export default NotFound
