import {
  useState,
  useContext,
  useEffect,
  lazy
} from 'react'
import { setCategoryId, setCurrentPage } from 'theme/redux/slices/filterSlice'
import axios from 'axios'
import { SearchContext } from 'theme/App'
import { useSelector, useDispatch } from 'react-redux'

const Categories = lazy(() => import(/* webpackChunkName: "categories" */ 'theme/components/Categories'))
const Sort = lazy(() => import(/* webpackChunkName: "sort" */ 'theme/components/Sort'))
const PizzaSkeleton = lazy(() => import(/* webpackChunkName: "pizza-skeleton" */ 'theme/components/PizzaBlock/PizzaSkeleton'))
const PizzaBlock = lazy(() => import(/* webpackChunkName: "pizza-block" */ 'theme/components/PizzaBlock'))
const Pagination = lazy(() => import(/* webpackChunkName: "pagination" */ 'theme/components/Pagination'))

export function Home() {
  const [items, setItems] = useState([])

  const selectedCategory = useSelector((state) => state.filter.categoryId)
  const dispatch = useDispatch()
  const setSelectedCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [contentType, setContentType] = useState(0)
  const { searchValue } = useContext(SearchContext)
  const selectedSort = useSelector((state) => state.filter.sort)
  const currentPage = useSelector((state) => state.filter.page)

  const fetchData = async () => {
    setIsLoadingData(true)
    try {
      const {
        data,
        headers
      } = await axios.get(`http://localhost:4200/data?${selectedCategory > 0 ? `category=${selectedCategory}` : ''}&_limit=4 &_page=${currentPage} &_sort=${selectedSort.sort}&_order=asc&q=${searchValue}`)
      setContentType(+headers['x-total-count'])
      setItems(data)
      setIsLoadingData(false)
    } catch (error) {
      // Обработка ошибок
    }
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    fetchData()
  }, [selectedCategory, selectedSort, searchValue, currentPage])

  const pizzas = items.map((value, index) => (
    <PizzaBlock
      key={value + index}
      name={value.title}
      price={value.price}
      imageUrl={value.imageUrl}
      sizes={value.sizes}
      types={value.types}
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
