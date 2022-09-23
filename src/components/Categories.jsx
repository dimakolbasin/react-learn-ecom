import React from "react";

function Categories({value, onClickCategory}) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  // const onClickCategory = (index) => {
  //   setActiveIndex(index)
  // }

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, index) =>
            <li key={category + index} onClick={() => onClickCategory(index)} className={value === index ? "active" : ""}>{category}</li>
          )
        }
      </ul>
    </div>
  )
}
export default Categories
