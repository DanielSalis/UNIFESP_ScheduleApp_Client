import React, {useEffect, useState} from 'react'
import style from './_style.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as ReactbootStrap from 'react-bootstrap'
import api from "../../Components/Api";

const SchedulerComponent = (props) => {

  const [funcionarios,setFuncionarios] = useState(null)
  const [days, setDays] = useState([])

  useEffect(async () => {
    getWorkersByProfileId()
    setDays(props.days)
    console.log('teste')
  },[props]);


  const getWorkersByProfileId = async () => {
    const id = 3;
    const response = await api.get("/api/user/getAllByProfileId/"+id);
    setFuncionarios(response.data)
  }

  const defautlHeaders = [
    {name: "Id"},
    {name: "Nome"}
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

  const renderAllTableHeaders = () => {
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
    {props.days && <ReactbootStrap.Table>
      <thead>
        <tr>
          {days ? renderAllTableHeaders(): null}
        </tr>
      </thead>
      <tbody>
        {funcionarios ? funcionarios.map(renderFuncionarios): null}
      </tbody>
    </ReactbootStrap.Table>}
  </div>
}

export default SchedulerComponent
