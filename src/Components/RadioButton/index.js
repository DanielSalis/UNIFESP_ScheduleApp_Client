import React from "react";
import styles from "./_style.module.scss";

const RadioButton = ({ children, object, ...props }) => {
  return (
    <div className={styles.radioButtonContainer}>
      <div className={styles.radioButtonWrapper}>
        <input
          type="radio"
          className={styles.input}
          id={props.id}
          onChange={props.changed}
          value={props.value}
          checked={props.isSelected}
        ></input>
        <label htmlFor={props.id}>{props.label}</label>
      </div>
    </div>
  );
};

export default RadioButton;
