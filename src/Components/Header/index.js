import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './_style.module.scss'

const Header = () => {
  const history = useHistory()

  const logout = () => {
    localStorage.clear()
    history.push('/');
  }
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
        <div class={styles.dropdown}>
          <img
            src="https://thispersondoesnotexist.com/image"
            alt="Profile picture"
            className={styles.profilePic}
          />
          <div class={styles.dropdownContent}>
            <a onClick={logout}>Logout</a>
            <a >Profile</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
