import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import styles from "./_style.module.scss";

const Header = () => {
  const history = useHistory();
  const [user, setUser] = useState(null)
  const [profileName, setProfileName] = useState('')

  const setUserInfo = ()=>{
    const UserLogged =JSON.parse(localStorage.getItem('UserLogged'))
    setUser(UserLogged)

    if(UserLogged.profile_id == 1){
      setProfileName('Administrador')
    }
    if(UserLogged.profile_id == 2){
      setProfileName('Supervisor')
    }
    if(UserLogged.profile_id == 3){
      setProfileName('Plantonista')
    }
  }

  useEffect(()=>{
    setUserInfo()
  },[])

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <div className={styles.headerWrapper}>
      <div
        className={styles.schedulerOption}
        onClick={() => history.push("/scheduler")}
      >
        Scheduler
      </div>
      <div
        className={styles.dashboardOption}
        onClick={() => history.push("/dashboard")}
      >
        Dashboard
      </div>
      <div
        className={styles.workerOption}
        onClick={() => history.push("/workers")}
      >
        Funcionários
      </div>
      <div className={styles.space} />
      <div className={styles.profileContainer}>
        <div className={styles.profileInfo}>
          <p>{user ? `${user.name} ${user.last_name}` : null}</p>
          <p>{profileName? profileName: 'Plantonista - Unimed Centro'}</p>
        </div>
        <div className={styles.dropdown}>
          <img
            src="https://thispersondoesnotexist.com/image"
            alt="Profile"
            className={styles.profilePic}
          />
          <div className={styles.dropdownContent}>
            <a href="/profile:id">Profile</a>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
