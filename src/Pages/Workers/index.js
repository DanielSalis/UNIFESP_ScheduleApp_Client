import React from 'react'
import Header from '../../Components/Header'
import Input from '../../Components/Input'
import SwitchToggle from '../../Components/SwitchToggle'
import Button from '../../Components/Button'
import Checkbox from '../../Components/Checkbox'
import Textarea from '../../Components/Textarea'
import style from './_style.module.scss'

const Workers = () => {
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
          ></Input>
        </div>
        <div className={style.placeContainer}>
          <Input label="Unidade" type="text" name="unityName"></Input>
          <Input label="Departamento" type="text" name="departmentName"></Input>
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
        <Button className={style.buttonAdd}>Adicionar Funcionário</Button>
      </div>
    </div>
  )
}

export default Workers
