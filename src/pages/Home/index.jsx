import {
  useState,
  useContext,
  useEffect,
  useRef,
  lazy
} from 'react'
import {
  setCategoryId,
  setCurrentPage,
  setFilters
} from 'theme/redux/slices/filterSlice'
import qs from 'qs'
import { sortTypes } from 'theme/components/Sort'
import { useNavigate } from "react-router-dom";
import { SearchContext } from 'theme/App'
import { useSelector, useDispatch } from 'react-redux'
import { getPizzas } from 'theme/redux/slices/pizzaSlice'

const Categories = lazy(() => import(/* webpackChunkName: "categories" */ 'theme/components/Categories'))
const Sort = lazy(() => import(/* webpackChunkName: "sort" */ 'theme/components/Sort'))
const PizzaSkeleton = lazy(() => import(/* webpackChunkName: "pizza-skeleton" */ 'theme/components/PizzaBlock/PizzaSkeleton'))
const PizzaBlock = lazy(() => import(/* webpackChunkName: "pizza-block" */ 'theme/components/PizzaBlock'))
const Pagination = lazy(() => import(/* webpackChunkName: "pagination" */ 'theme/components/Pagination'))

export function Home() {
  const navigate = useNavigate()

  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const dispatch = useDispatch()
  const setSelectedCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const [isLoadingData, setIsLoadingData] = useState(false)
  const { searchValue } = useContext(SearchContext)
  const selectedCategory = useSelector((state) => state.filter.categoryId)
  const selectedSort = useSelector((state) => state.filter.sort)
  const currentPage = useSelector((state) => state.filter.page)
  const { items, contentType } = useSelector((state) => state.pizza)

  const fetchData = async () => {
    setIsLoadingData(true)
    try {
      await dispatch(getPizzas({
        searchValue,
        selectedSort,
        selectedCategory,
        currentPage
      }))
    } catch (error) {
      navigate('/not-found')
    } finally {
      setIsLoadingData(false)
    }
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    if (!window?.location.search) return

    const params = qs.parse(window.location.search.substring(1))
    const sort = sortTypes.find(item => item.sort === params.sort)
    dispatch(setFilters({
      ...params,
      sort
    }))

    isSearch.current = true
  }, [])

  useEffect(() => {
    if (!isSearch.current) {
      fetchData()
      return
    }

    isSearch.current = false

  }, [selectedCategory, selectedSort, searchValue, currentPage])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: selectedSort.sort,
        selectedCategory,
        currentPage
      })
      navigate(`?${queryString}`)
      return
    }

    isMounted.current = true
  }, [selectedCategory, selectedSort, searchValue, currentPage])

  const pizzas = items.map((value, index) => (
    <PizzaBlock
      key={value + index}
      {...value}
    />
  ))
  const pizzasSkeleton = [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)

  return (
    <div className=''>
      <div className='content__top'>
        <Categories
          value={selectedCategory}
          onClickCategory={setSelectedCategory}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        { isLoadingData || !items.length ? pizzasSkeleton : pizzas }
      </div>
      <Pagination
        onChangePage={onChangePage}
        contentType={contentType}
        currentPage={currentPage}
        setCurrentPage={onChangePage}
      />
    </div>
  )
}

export default Home
