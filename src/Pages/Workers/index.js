import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import Input from '../../Components/Input'
import SwitchToggle from '../../Components/SwitchToggle'
import Button from '../../Components/Button'
import Checkbox from '../../Components/Checkbox'
import Select from '../../Components/Select'
import style from './_style.module.scss'

import api from '../../Components/Api'

let profilesData = {}
let unitiesData = {}
let departmentsData = null


const Workers = () => {

  const [name, setName] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [profile, setProfile] = useState(null)
  const [department, setDepartment] = useState(null)

  //lists
  const [profileNames, setProfileNames] = useState(null)
  const [unitiesNames, setUnitiesNames] = useState(null)
  const [departmentsNames, setDepartmentNames] = useState(null)

  const getProfiles = async () => {
    const response = await api.get('/api/profile/getAll', {
      headers: {
        'x-auth-token': localStorage.getItem('authToken')
      }
    })

    profilesData = response.data
    let profileNames = profilesData.map(item=>{
      return item.type
    })

    setProfileNames(profileNames)
  }

  const getUnities = async () => {
    const response = await api.get('/api/unity/getAll',{
      headers: {
        'x-auth-token': localStorage.getItem('authToken')
      }
    })

    unitiesData = response.data
    let unityNames = unitiesData.map((item)=>{
      return item.name
    })

    setUnitiesNames(unityNames)
  }

  const getDepartmentsByUnity = async (id) => {
    const response = await api.get('/api/department/getByUnityId/'+ id,{
      headers:{
        'x-auth-token': localStorage.getItem('authToken')
      }
    })

    departmentsData = response.data
    let departmentNames = departmentsData.map((item)=>{
      return item.name
    })
    setDepartmentNames(departmentNames)
  }

  const handleDepartmentChange = async (name) => {
    debugger
    const unity = unitiesData.find((item)=> item.name == name)
    getDepartmentsByUnity(unity.id)
  }

  const handleSubmit = async (e) => {
    debugger
    
    const departmentId = departmentsData.find(item=>item.name == department)
    const profileId = profilesData.find(item=>item.type == profile)

    const form = {
      "name":name,
      "last_name":lastname,
      "email":email,
      "password":password,
      "department_id":departmentId.id,
      "profile_id":profileId.id,
      "schedule_type_id": 1,
      "vacation_type_id": 1
    }

    await api.post('/api/user/create', form)
      .then(async res=>{
          alert(res.data)
          console.log(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
  }
  
  useEffect(()=>{
      getProfiles();
      getUnities();
  }, [])

  const daysObject = {
    everyday: 'Todos os dias',
    weekDays: 'Dias da semana',
    weekends: 'Finais de semana',
  }
  return (
    <div>
      <Header />
      <div className={style.contentContainer}>
        <div className={style.nameContainer}>
          <Input
            label="Nome do funcionário"
            type="text"
            name="workerName"
            onChange={(e)=>setName(e.target.value)}
          ></Input>
          <Input
            label="Sobrenome do funcionário"
            type="text"
            name="workerLastname"
            onChange={(e)=>setLastname(e.target.value)}
          ></Input>
          <Input
            label="Email"
            type="email"
            name="workerEmail"
            onChange={(e)=>setEmail(e.target.value)}
          ></Input>
          <Input
            label="Senha"
            type="password"
            name="workerPassword"
            onChange={(e)=>setPassword(e.target.value)}
          ></Input>
        </div>
        <div className={style.placeContainer}>
          {/* <Input label="Unidade" type="text" name="unityName" value={unity}></Input> */}
          <p>Perfil</p>
          <Select name="profile" id="profile" onChange={(e)=> setProfile(e.target.value)} object={profileNames?profileNames:{}} />
          <p>Unidade</p>
          <Select name="unities" id="unities" onChange={(e)=>{handleDepartmentChange(e.target.value)}} object={unitiesNames? unitiesNames: {}} />
          <p>Departamento</p>
          <Select disabled={departmentsNames? false: true} name="department" id="department" onChange={(e)=>{setDepartment(e.target.value)}} object={departmentsNames? departmentsNames:{}} />
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
            <div className={style.calendarContainer}></div>
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
        <Button className={style.buttonAdd} onClick={(e)=>handleSubmit(e)} >Adicionar Funcionário</Button>
      </div>
    </div>
  )
}

export default Workers
