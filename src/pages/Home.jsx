import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Index from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock";

export const Home = () => {
  const [items, setItems] = React.useState([]);

  const defaultStateSort = {name: "популярности", sort: "rating"}
  const [selectedCategory, setSelectedCategory] = React.useState(0)
  const [selectedSort, setSelectedSort] = React.useState(defaultStateSort)
  const [isLoadingData, setIsLoadingData] = React.useState(false)


  React.useEffect(() => {
    setIsLoadingData(true)
    fetch(`http://localhost:4200/data?${selectedCategory > 0 ? `category=${selectedCategory}` : ''}&_sort=${selectedSort.sort}&_order=asc`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        setItems(json)
        setIsLoadingData(false)
      })
  }, [selectedCategory, selectedSort])

  const onClickCategory = (index) => {

  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={selectedCategory} onClickCategory={(i) => setSelectedCategory(i)} />
        <Sort value={selectedSort} onClickSort={(sortTypeSelected) => setSelectedSort(sortTypeSelected)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoadingData || !items.length ? [...new Array(8)].map((_, index) => <Index key={index} />) : items.map((value, index) => (
            <PizzaBlock key={value + index}
                        name={value.title}
                        price={value.price}
                        imageUrl={value.imageUrl}
                        sizes={value.sizes}
                        types={value.types}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Home
