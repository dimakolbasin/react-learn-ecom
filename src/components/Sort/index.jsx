import {useState, useEffect, useRef} from "react";

import styles from "./sort.module.scss"

import { useSelector, useDispatch } from "react-redux";

import { setSortType } from "../../redux/slices/filterSlice";

import cn from "classnames"

const Sort = () => {

  const dispatch = useDispatch()
  const sort = useSelector(state => state.filter.sort)

  const sortTypes = [
    {name: "популярности", sort: "rating"},
    {name: "цене", sort: "price"},
    {name: "алфавиту", sort: "title"}
  ]

  const [isVisibleModal, setIsVisibleModal] = useState(false)

  const showHideModal = () => {
    setIsVisibleModal(!isVisibleModal)
  }

  const selectSortItem = (sortType) => {
    dispatch(setSortType(sortType))
    setIsVisibleModal(false)
  }

  const hideModal = (event) => {
    if (!event.composedPath().includes(sortRef.current)) setIsVisibleModal(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', hideModal)

    return () => {
      document.body.removeEventListener('click', hideModal)
    }
  }, [])

  const sortRef = useRef()

  return (
    <div
      ref={sortRef}
      className={styles.wrapper}
    >
      <div className={styles.wrapper__label}
           onClick={showHideModal}
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={cn( {[styles.rotate180]: isVisibleModal})}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b className={styles.wrapper__select}>Сортировка по:</b>
        <span>{sort.name}</span>
      </div>
      {
        isVisibleModal && (
          <div className={styles.wrapper__popup}>
            <ul>
              {
                sortTypes.map((sortType, index) =>
                  <li
                    key={sortType.name + index}
                    onClick={() => selectSortItem(sortType)}
                    className={cn( {[styles.active]: sort.name === sortType.name})}
                  >
                    {sortType.name}
                  </li>
                )
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default Sort
