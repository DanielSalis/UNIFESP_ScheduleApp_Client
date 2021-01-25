import React from 'react'
import styles from './_style.module.scss'

const SwitchToggle = () => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.toggle}>
        <input type="checkbox" />
        <div className={styles.toggleControl}></div>
      </label>
    </div>
  )
}

export default SwitchToggle
