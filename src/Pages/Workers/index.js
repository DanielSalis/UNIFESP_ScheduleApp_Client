import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Headers from "../../Components/Header";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import api from "../../Components/Api";
import Button from "../../Components/Button";
import style from "./_style.module.scss";

const Workers = () => {
  const history = useHistory();

  const [users, setUsers] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [searchedName, setSearchedName] = useState('');

  const getAllWorkers = async (name) => {
    const response = await api.get("/api/user/getAll");
    const currentUser = JSON.parse(localStorage.getItem('UserLogged'))

    if(name){
      const usersData = response.data.filter(item => {
        return (item.id != currentUser.id) && (item.name.includes(name))
      });
      setUsers(usersData);
    }else{
      const usersData = response.data.filter(item => {
        return item.id != currentUser.id
      });
      setUsers(usersData);
    }
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

      let currentProfile = profiles ? profiles.filter(profile=>{
        return profile.id === item.profile_id
      }): null

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
    getProfiles();
  }, []);

  const handleAddWorkers = () => {
    history.push("/addWorkers");
  };

  const handleSearchClick = () =>{
    console.log(searchedName === '')
    getAllWorkers(searchedName)
  }

  return (
    <div>
      <Headers />
      <div className={style.contentContainer}>
        <div className={style.toolsContainer}>
          <div className={style.inputContainer}>
            <input type="text" onChange={(e)=>setSearchedName(e.target.value)} ></input>
            <FiSearch onClick={()=>handleSearchClick()} size={25}/>
          </div>
          <Button style={{height:'40px', width:"150px"}} id={style.addWorkerButton} onClick={handleAddWorkers}>
            Adicionar
          </Button>
        </div>
        {users && profiles && generateUsersGrid()}
      </div>
    </div>
  );
};

export default Workers;
