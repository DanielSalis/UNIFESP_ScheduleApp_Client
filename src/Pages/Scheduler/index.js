import React from "react";
import styles from "./_style.module.scss";
import Header from "../../Components/Header";
import RadioButton from "../../Components/RadioButton";
import Select from "../../Components/Select";
import Checkbox from "../../Components/Checkbox";
import Button from "../../Components/Button";
import SchedulerComponent from "../../Components/SchedulerComponent";

const Scheduler = () => {
  const situationRadioButtonObject = {
    working: "Trabalhando",
    onDuty: "Plantão"
  };

  // const state = {
  //   filterWorkerSituation: "COD"
  // };

  // const radioChangeHandler = (event) => {
  //   this.setState({
  //     filterWorkerSituation: event.target.value
  //   });
  // };

  const unitySelectObject = {
    option1: "Unimed Centro",
    option2: "Unimed Vale Sul"
  };

  const departmentSelectObject = {
    option1: "Pediatria",
    option2: "Cardiologia"
  };

  const onDutyTypeObject = {
    option1: "4 horas",
    option2: "6 horas",
    option3: "8 horas",
    option4: "12 horas"
  };

  return (
    <div>
      <Header />
      <div className={styles.contentWrapper}>
        <div className={styles.leftContainer}>
          <div className={styles.situationContainer}>
            <h3>Situação</h3>
            <RadioButton
              // changed={radioChangeHandler}
              id="1"
              // isSelected={state.filterWorkerSituation === "Trabalhando"}
              label="Trabalhando"
              value="Trabalhando"
            />

            <RadioButton
              // changed={radioChangeHandler}
              id="2"
              // isSelected={state.filterWorkerSituation === "Plantão"}
              label="Plantão"
              value="Plantão"
            />
          </div>
          <div className={styles.unitContainer}>
            <h3>Unidade</h3>
            <Select object={unitySelectObject}></Select>
          </div>
          <div className={styles.departmentContainer}>
            <h3>Departamento</h3>
            <Select object={departmentSelectObject}></Select>
          </div>
          <div className={styles.onDutyTypeContainer}>
            <h3>Tipo de plantonista</h3>
            <Checkbox object={onDutyTypeObject} />
          </div>
        </div>
        <div className={styles.schedulerContainer}>
          <div className={styles.headerSchedulerContainer}>
            <h1>Fevereiro</h1>
            <div className={styles.buttonsContainer}>
              <div className={styles.changeMonth}>
              </div>
              <Button>Exportar</Button>
            </div>
          </div>
          <SchedulerComponent></SchedulerComponent>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
