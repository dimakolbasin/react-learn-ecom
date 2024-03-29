import cn from 'classnames'
import styles from './categories.module.scss'

function Categories({ value, onClickCategory }) {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className={styles.wrapper}>
      <ul>
        {
          categories.map((category, index) => (
            <li
              key={category + index}
              onClick={() => onClickCategory(index)}
              className={cn({ [styles.active]: value === index })}
            >
              {category}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default Categories
