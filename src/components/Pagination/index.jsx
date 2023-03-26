import styles from "./pagination.module.scss"
import ReactPaginate from "react-paginate";
import React from "react";

const Pagination = ({ onChangePage, contentType }) => {

  React.useEffect(() => {
    if (contentType === 10) return
    // todo
    onChangePage(1)
  }, [contentType])

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(contentType / 4)}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
