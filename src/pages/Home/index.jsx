import { useState, useContext, useEffect, lazy } from "react"
const Categories = lazy(() => import(/* webpackChunkName: "categories" */ 'theme/components/Categories'))
const Sort = lazy(() => import(/* webpackChunkName: "sort" */ 'theme/components/Sort'))
const PizzaSkeleton = lazy(() => import(/* webpackChunkName: "pizza-skeleton" */ 'theme/components/PizzaBlock/PizzaSkeleton'))
const PizzaBlock = lazy(() => import(/* webpackChunkName: "pizza-block" */ 'theme/components/PizzaBlock'))
const Pagination = lazy(() => import(/* webpackChunkName: "pagination" */ 'theme/components/Pagination'))
import { setCategoryId } from "theme/redux/slices/filterSlice"
import { SearchContext } from "theme/App"
import { useSelector, useDispatch } from "react-redux"

export const Home = () => {
  const [items, setItems] = useState([]);

  const defaultStateSort =
    {
      name: "популярности",
      sort: "rating"
    }

  const selectedCategory = useSelector(state => state.filter.categoryId)
  const dispatch = useDispatch()
  const setSelectedCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [contentType, setContentType] = useState(0)
  const {searchValue} = useContext(SearchContext)
  const selectedSort = useSelector(state => state.filter.sort)

  useEffect(() => {
    setIsLoadingData(true)
    fetch(`http://localhost:4200/data?${selectedCategory > 0 ? `category=${selectedCategory}` : ''}&_limit=4 &_page=${currentPage} &_sort=${selectedSort.sort}&_order=asc&q=${searchValue}`)
      .then(res => {
        setContentType(+res.headers.get('X-Total-Count'))
        return res.json();
      })
      .then(json => {
        setItems(json)
        setIsLoadingData(false)
      })
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
    <div className="">
      <div className="content__top">
        <Categories
          value={selectedCategory}
          onClickCategory={setSelectedCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { isLoadingData || !items.length ? pizzasSkeleton : pizzas }
      </div>
      <Pagination
        onChangePage={number => setCurrentPage(number)}
        contentType={contentType}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Home
