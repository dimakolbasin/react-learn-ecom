import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock";

export const Home = () => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:4200/data")
      .then(res => {
        return res.json();
      })
      .then(json => {
        setItems(json)
      })
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          !items.length ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />) : items.map((value, index) => (
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
