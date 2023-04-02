import React from "react";
import Categories from "../../components/Categories";
import Sort from "../../components/Sort";
import PizzaSkeleton from "../../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../../components/PizzaBlock";
import Pagination from "../../components/Pagination";

export const Home = ({searchValue}) => {
  const [items, setItems] = React.useState([]);

  const defaultStateSort =
    {
      name: "популярности",
      sort: "rating"
    }
  const [selectedCategory, setSelectedCategory] = React.useState(0)
  const [selectedSort, setSelectedSort] = React.useState(defaultStateSort)
  const [isLoadingData, setIsLoadingData] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(0)
  const [contentType, setContentType] = React.useState(0)

  React.useEffect(() => {
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
    <PizzaBlock key={value + index}
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
        <Categories value={selectedCategory}
                    onClickCategory={(i) => setSelectedCategory(i)}
        />
        <Sort
          value={selectedSort}
          onClickSort={(sortTypeSelected) => setSelectedSort(sortTypeSelected)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoadingData || !items.length ? pizzasSkeleton : pizzas
        }
      </div>
      <Pagination
        onChangePage={number => setCurrentPage(number)}
        contentType={contentType}
      />
    </div>
  )
}

export default Home
