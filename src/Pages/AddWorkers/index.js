import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import SwitchToggle from "../../Components/SwitchToggle";
import Button from "../../Components/Button";
import Checkbox from "../../Components/Checkbox";
import Select from "../../Components/Select";
import style from "./_style.module.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import api from "../../Components/Api";

let profilesData = {};
let unitiesData = {};
let departmentsData = null;

const Workers = () => {
  const history = useHistory();
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [profile, setProfile] = useState(null);
  const [department, setDepartment] = useState(null);

  //lists
  const [profileNames, setProfileNames] = useState(null);
  const [unitiesNames, setUnitiesNames] = useState(null);
  const [departmentsNames, setDepartmentNames] = useState(null);

  const getProfiles = async () => {
    const response = await api.get("/api/profile/getAll", {
      headers: {
        "x-auth-token": localStorage.getItem("authToken")
      }
    });

    profilesData = response.data;
    let profileNames = profilesData.map((item) => {
      return item.type;
    });

    setProfileNames(profileNames);
  };

  const getUnities = async () => {
    const response = await api.get("/api/unity/getAll", {
      headers: {
        "x-auth-token": localStorage.getItem("authToken")
      }
    });

    unitiesData = response.data;
    let unityNames = unitiesData.map((item) => {
      return item.name;
    });

    setUnitiesNames(unityNames);
  };

  const getDepartmentsByUnity = async (id) => {
    const response = await api.get("/api/department/getByUnityId/" + id, {
      headers: {
        "x-auth-token": localStorage.getItem("authToken")
      }
    });

    departmentsData = response.data;
    let departmentNames = departmentsData.map((item) => {
      return item.name;
    });
    setDepartmentNames(departmentNames);
  };

  const handleDepartmentChange = async (name) => {
    debugger;
    const unity = unitiesData.find((item) => item.name === name);
    getDepartmentsByUnity(unity.id);
  };

  const handleSubmit = async (e) => {
    debugger;

    if(departmentsData && profilesData){
      const departmentId = departmentsData.find(
        (item) => item.name === department
      );
      const profileId = profilesData.find((item) => item.type === profile);
      const form = {
        name: name,
        last_name: lastname,
        email: email,
        password: password,
        department_id: departmentId.id,
        profile_id: profileId.id,
        schedule_type_id: 1,
        vacation_type_id: 1
      };
  
      if(validateForm(form)){
        await api
        .post(`${process.env.REACT_APP_API_URL}/api/user/create`, form)
        .then(async (res) => {
          console.log(res)
          await alert('Usuário cadastrado com sucesso!');
          history.push("/workers");
        })
        .catch((err) => {
            alert(err);
        });
      }else{
        return
      }
      return
    }
    alert("Preencha o formulário corretamente")
  };

  const validateForm = (form) => {
    if(!form.name || !form.last_name || !form.email || !form.password || !form.department_id || !form.profile_id || !form.schedule_type_id || !form.vacation_type_id){
      alert("Preencha o formulário corretamente")
      return false
    }
    return true
  }

  useEffect(() => {
    getProfiles();
    getUnities();
  }, []);

  const daysObject = {
    everyday: "Todos os dias",
    weekDays: "Dias da semana",
    weekends: "Finais de semana"
  };
  return (
    <div>
      <Header />
      <div className={style.contentContainer}>
        <div className={style.nameContainer}>
          <Input
            label="Nome do funcionário"
            type="text"
            name="workerName"
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Input
            label="Sobrenome do funcionário"
            type="text"
            name="workerLastname"
            onChange={(e) => setLastname(e.target.value)}
          ></Input>
          <Input
            label="Email"
            type="email"
            name="workerEmail"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            label="Senha"
            type="password"
            name="workerPassword"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
        <div className={style.placeContainer}>
          <div className={style.selectContainer}>
            <p>Perfil</p>
            <Select
              name="profile"
              id="profile"
              onChange={(e) => setProfile(e.target.value)}
              object={profileNames ? profileNames : {}}
            />
          </div>
          <div className={style.selectContainer}>
            <p>Unidade</p>
            <Select
              name="unities"
              id="unities"
              onChange={(e) => {
                handleDepartmentChange(e.target.value);
              }}
              object={unitiesNames ? unitiesNames : {}}
            />
          </div>
          <div className={style.selectContainer}>
            <p>Departamento</p>
            <Select
              disabled={departmentsNames ? false : true}
              name="department"
              id="department"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              object={departmentsNames ? departmentsNames : {}}
            />
          </div>
        </div>
        <div className={style.timeContainer}>
          <p>Horário</p>
          <div className={style.timeInputContainer}>
            <Input label="Das" type="text" name="fromInput"></Input>
            <Input label="Até as" type="text" name="toInput"></Input>
          </div>
        </div>
        <div className={style.dataContainer}>
          <div>
            <p>Data</p>
            <div className={style.calendarContainer}>
              <Calendar />
            </div>
          </div>

          <div className={style.repetitionWrapper}>
            <p>Repetição</p>
            <SwitchToggle></SwitchToggle>
          </div>
          <div className={style.daysWrapper}>
            <p>Dias</p>
            <Checkbox object={daysObject}></Checkbox>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button onClick={(e) => handleSubmit(e)}>
            Adicionar Funcionário
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Workers;
