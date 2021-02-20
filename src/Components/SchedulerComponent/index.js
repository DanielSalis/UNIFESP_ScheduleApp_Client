import React, {useEffect, useState} from 'react'
import style from './_style.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as ReactbootStrap from 'react-bootstrap'
import api from "../../Components/Api";

const SchedulerComponent = () => {

  const [funcionarios,setFuncionarios] = useState(null)

  useEffect(() => {
    getWorkersByProfileId()
  }, []);


  const getWorkersByProfileId = async () => {
    const id = 3;
    const response = await api.get("/api/user/getAllByProfileId/"+id);
    setFuncionarios(response.data)
  }

  const defautlHeaders = [
    {name: "Id"},
    {name: "Nome"}
  ]

  const days = [
    {id:1, weekendDay: "Segunda", shortDate:'20/02'},
    {id:2, weekendDay: "Terça", shortDate:'21/02'},
    {id:3, weekendDay: "Quarta", shortDate:'22/02'},
    {id:4, weekendDay: "Quinta", shortDate:'23/02'},
    {id:5, weekendDay: "Sexta", shortDate:'24/02'},
    {id:6, weekendDay: "Sábado", shortDate:'25/02'},
    {id:7, weekendDay: "Domingo", shortDate:'26/02'},
    {id:8, weekendDay: "Segunda", shortDate:'27/02'},
    {id:9, weekendDay: "Terça", shortDate:'28/02'},
  ]

  const renderFuncionarios = (func, index) => {
    return (
      <tr key={index}>
        <td>{func.id}</td>
        <td>{func.name}</td>
        {renderPresenceDays(func)}
      </tr>
    )
  }

  const renderPresenceDays = (func) => {
    const data = days.map((day, index)=>{
      return (
        <td key={index+2} onClick={()=>handlePresenceClick(func, day)}></td>
      )
    })

    return data
  }

  const renderAllTableHeaders = (func, index) => {
    const renderedDefaultHeaders = defautlHeaders.map(renderDefaultHeaders)
    const renderedDays = days.map(renderDays)

    let tds = []
    tds.push(renderedDefaultHeaders)
    tds.push(renderedDays)

    return tds
  }

  const renderDefaultHeaders = (header, index)=>{
    return (
        <td key={index}>{header.name}</td>
    )
  }

  const renderDays = (day, index)=>{
    return (
        <td key={index}>{day.shortDate}</td>
    )
  }


  const handlePresenceClick = (func, day)=>{
    alert(`Clicou no funcionário de id:${func.id}, no dia ${day.shortDate}`)
  }


  return <div className={style.schedulerContainer}>
    <ReactbootStrap.Table>
      <thead>
        <tr>
          {renderAllTableHeaders()}
        </tr>
      </thead>
      <tbody>
        {funcionarios ? funcionarios.map(renderFuncionarios): null}
      </tbody>
    </ReactbootStrap.Table>
  </div>
}

export default SchedulerComponent
