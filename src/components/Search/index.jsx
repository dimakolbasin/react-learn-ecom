import { useContext, useCallback, useRef, useState } from "react";
import { SearchContext } from 'theme/App'
import styles from './search.module.scss'
import debounce from 'lodash-es/debounce'

function Search() {
  const [value, setValue] = useState()
  const { setSearchValue } = useContext(SearchContext)
  const inputRef = useRef()

  const onClickClear = () => {
    setValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(debounce((value) => {
    setSearchValue(value)
  }, 250), [])

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(value)
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        fill='#000000'
        height='24px'
        width='24px'
        version='1.1'
        id='Capa_1'
        viewBox='0 0 488.4 488.4'
      >
        <g>
          <path d='M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
              s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
              S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
              S381.9,104.65,381.9,203.25z'
          />
        </g>
      </svg>
      {value && (
        <div
          className={styles['icon-close']}
          onClick={onClickClear}
        >
          X
        </div>
      )}
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type='text'
        placeholder='Поиск пиццы...'
      />
    </div>
  )
}

export default Search
