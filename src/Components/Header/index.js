import React, { Component } from 'react'
import styles from './_style.module.scss'

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.schedulerOption}>Scheduler</div>
      <div className={styles.dashboardOption}>Dashboard</div>
      <div className={styles.workerOption}>Funcionários</div>
      <div className={styles.space} />
      <div className={styles.profileContainer}>
        <div className={styles.profileInfo}>
          <p>John Doe</p>
          <p>Plantonista - Unimed Centro</p>
        </div>
        <img
          src="https://thispersondoesnotexist.com/image"
          alt="Profile picture"
          className={styles.profilePic}
        />
      </div>
    </div>
  )
}

export default Header
