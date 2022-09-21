import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const onClickCategory = (index) => {
    setActiveIndex(index)
  }

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
          categories.map((value, index) =>
            <li key={value + index} onClick={() => onClickCategory(index)} className={activeIndex === index ? "active" : ""}>{value}</li>
          )
        }
      </ul>
    </div>
  )
}
export default Categories
