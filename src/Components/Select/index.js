import React from 'react'
import styles from './_style.module.scss'

const Select = ({ label, name, onChange, object, disabled }) => {
  return (
    <div className={styles.selectWrapper}>
      <label htmlFor={name} className="label">
        {label}{' '}
      </label>
      <select disabled={disabled} id={name} onChange={onChange}>
        {Object.entries(object).map(([key, value]) => (
          <option className={styles.selectOption} key={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
