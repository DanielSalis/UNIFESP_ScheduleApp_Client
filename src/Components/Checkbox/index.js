import React from 'react'
import styles from './_style.module.scss'

const Checkbox = ({ object, ...props }) => {
  return (
    <div className={styles.checkboxContainer}>
      {Object.entries(object).map(([key, value]) => (
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            {...props}
            className={styles.input}
            key={key}
          ></input>
          <label {...props.forName}>{value}</label>
        </div>
      ))}
    </div>
  )
}

export default Checkbox
