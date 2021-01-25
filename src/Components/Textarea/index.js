import React from 'react'
import styles from './_style.module.scss'

const TextArea = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className="label">
        {label}{' '}
      </label>
      <textarea
        id={name}
        name={name}
        className={styles.textArea}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></textarea>
    </div>
  )
}

export default TextArea
