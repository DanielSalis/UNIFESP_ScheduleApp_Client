import React from "react";
import styles from "./_style.module.scss";
import loadingAnimation from "../../Assets/Rolling-1s-200px.svg";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img alt="loading rotation svg" src={loadingAnimation}></img>
    </div>
  );
};

export default Loading;
