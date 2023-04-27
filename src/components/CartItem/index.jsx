import cn from 'classnames'
import styles from './cartItem.module.scss'
import { useDispatch } from 'react-redux'
import { removeItem, incItem, decItem } from 'theme/redux/slices/cartSlice'


const CartItem = ({id, title, price, count, imageUrl, type, size}) => {
  const dispatch = useDispatch()

  const onClickDec = () => {
    dispatch(decItem(id))
  }

  const onClickInc = () => {
    dispatch(incItem(id))
  }

  const onClickRemove = () => {
    dispatch(removeItem(id))
  }
  
  return (
    <div className={styles.cart__item}>
      <div className={styles.cart__main_info}>
        <div className={styles.cart__item_img}>
          <img
            className={styles.cart__image}
            src={imageUrl}
            alt={name}
          />
        </div>
        <div className={styles.cart__item_info}>
          <h3>{title}</h3>
          <p>{type}, {size} см.</p>
        </div>
      </div>
      <div className={styles.cart__counter}>
        <div className={styles.cart__item_count}>
          <div
            className={cn(styles.cart__button, styles.cart__button__outline, styles.cart__button_circle, styles.cart__button_minus)}
            onClick={onClickDec}
          >
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
            >
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              />
            </svg>

          </div>
          <b>{count}</b>
          <div
            className={cn(styles.cart__button, styles.cart__button__outline, styles.cart__button_circle)}
            onClick={onClickInc}
          >
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
            >
              <path
                d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                fill='#EB5A1E'
              />
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              />
            </svg>

          </div>
        </div>
        <div className={styles.cart__item_price}>
          <b className={styles.cart__item_price_item}>{price * count} ₽</b>
        </div>
      </div>
      <div
        className={styles.cart__item_remove}
        onClick={onClickRemove}
      >
        <div className={cn(styles.cart__button, styles.cart__button__outline, styles.cart__button_circle)}>
          <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
          >
            <path
              d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
              fill='#EB5A1E'
            />
            <path
              d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
              fill='#EB5A1E'
            />
          </svg>

        </div>
      </div>
    </div>
  )
}

export default CartItem
