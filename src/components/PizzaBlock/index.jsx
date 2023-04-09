import { useState } from 'react'
import cn from 'classnames'
import styles from './pizza-block.module.scss'

function PizzaBlock(props) {
  const [pizzaCount, setPizzaCount] = useState(0)

  const onClickAddButton = () => {
    setPizzaCount(pizzaCount + 1)
  }

  const [activeSize, setActiveSize] = useState(0)

  const [activeType, setActiveType] = useState(0)

  const typeName = ['Тонкое', 'Традиционное']

  return (
    <div className={styles.pizza__wrapper}>
      <div>
        <div className={styles['pizza__container-img']}>
          <img
            className={styles.pizza__image}
            src={props.imageUrl}
            alt='Pizza'
          />
        </div>
        <h4 className={styles.pizza__title}>
          {props.name}
        </h4>
        <div className={styles.pizza__selector}>
          <ul>
            {
              props.types.map((value, index) => (
                <li
                  key={`${value + index}1`}
                  onClick={() => setActiveType(index)}
                  className={cn({ [styles.active]: activeType === index })}
                >
                  {typeName[value]}
                </li>
              ))
            }
          </ul>
          <ul>
            {
              props.sizes.map((value, index) => (
                <li
                  key={`${value + index}2`}
                  onClick={() => setActiveSize(index)}
                  className={cn({ [styles.active]: activeSize === index })}
                >
                  {value}
                  {' '}
                  см.
                </li>
              ))
            }
          </ul>
        </div>
        <div className={styles.pizza__bottom}>
          <div className={styles.pizza__price}>
            от
            {props.price}
            {' '}
            ₽
          </div>
          <button
            className={cn(styles.pizza__button, styles.pizza__button__outline, styles.pizza__button__add)}
            onClick={onClickAddButton}
          >
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            <i>{pizzaCount}</i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
