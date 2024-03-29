import { lazy, useEffect } from 'react'
import styles from './pagination.module.scss'

const ReactPaginate = lazy(() => import(/* webpackChunkName: "react-paginate" */ 'react-paginate'))

const Pagination = ({
  onChangePage, contentType, currentPage, setCurrentPage,
}) => {
  useEffect(() => {
    if (contentType === 10) return

    setCurrentPage(0)
    onChangePage(1)
  }, [contentType])

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      forcePage={currentPage - 1}
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(contentType / 4)}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
