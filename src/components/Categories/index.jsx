import React from "react";

import styles from "./Categories.module.scss"

const Categories = ({value, onClickCategory}) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]

  return (
    <div className={styles.root}>
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
