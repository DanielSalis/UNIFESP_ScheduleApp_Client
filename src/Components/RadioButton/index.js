import React from 'react'
import styles from './_style.module.scss'

const RadioButton = ({ children, object, ...props }) => {
  return (
    <div className={styles.radioButtonContainer}>
      {Object.entries(object).map(([key, value]) => (
        <div className={styles.radioButtonWrapper}>
          <input
            type="radio"
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

export default RadioButton
