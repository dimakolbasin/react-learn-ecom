import styles from './NotFoundBlock.module.scss'

function NotFoundBlock() {
  return (
    <h1 className={styles.root}>
      <span>:(</span>
      <br />
      Not Found!
    </h1>
  )
}

export default NotFoundBlock
