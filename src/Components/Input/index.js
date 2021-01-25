import React from 'react'
import styles from './_style.module.scss'

const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className="label">
        {label}{' '}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></input>
    </div>
  )
}

export default Input
