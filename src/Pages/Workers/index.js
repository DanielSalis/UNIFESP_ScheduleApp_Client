import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Headers from "../../Components/Header";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import api from "../../Components/Api";
import Button from "../../Components/Button";
import style from "./_style.module.scss";

const Workers = () => {
  const history = useHistory();

  const [users, setUsers] = useState(null);
  const [profiles, setProfiles] = useState(null);

  const getAllWorkers = async () => {
    const response = await api.get("/api/user/getAll");
    const currentUser = JSON.parse(localStorage.getItem('UserLogged'))
    const usersData = response.data.filter(item => {
      return item.id != currentUser.id
    });
    setUsers(usersData);
    getProfiles()
  };

  const getProfiles = async () => {
    const response = await api.get("/api/profile/getAll", {
      headers: {
        "x-auth-token": localStorage.getItem("authToken")
      }
    });

    await setProfiles(response.data)
  };

  const generateUsersGrid = () => {
    const elements = users.map((item) => {

      let currentProfile = profiles.filter(profile=>{
        return profile.id === item.profile_id
      })

      return (
        <div className={style.row} key={item.id} id={`user-${item.id}`}>
          <div className={style.rowProfile}>
            <h3>{currentProfile[0].type}</h3>
          </div>
          <div className={style.rowName}>
            <h3>{item.name}</h3>
          </div>
          <div className={style.rowEmail}>
            <h3>{item.email}</h3>
          </div>
          <div className={style.rowButtons}>
            <div className={style.buttonClass}>
              <FiEdit size={30} color="#000000" />
            </div>
            <div className={style.buttonClass}>
              <FiTrash2
                size={30}
                onClick={() => handleDeleteUser(item.id)}
                color="#000000"
              />
            </div>
          </div>
        </div>
      );
    });

    return elements;
  };

  const handleDeleteUser = async (id) => {
    debugger;
    console.log(id);
    const payload = {
      id: id
    };
    await api.post("/api/user/deleteById", payload).then((res) => {
      console.log(res);
    });

    history.go(0);
  };

  useEffect(() => {
    getAllWorkers();
  }, []);

  const handleAddWorkers = () => {
    history.push("/addWorkers");
  };

  return (
    <div>
      <Headers />
      <div className={style.contentContainer}>
        <Button id={style.addWorkerButton} onClick={handleAddWorkers}>
          Adicionar
        </Button>
        {users && generateUsersGrid()}
      </div>
    </div>
  );
};

export default Workers;
