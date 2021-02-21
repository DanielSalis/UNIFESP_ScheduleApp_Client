import React, { useEffect, useState } from 'react';
import styles from './_style.module.scss';
import Header from '../../Components/Header';
import RadioButton from '../../Components/RadioButton';
import Select from '../../Components/Select';
import Checkbox from '../../Components/Checkbox';
import Button from '../../Components/Button';
import SchedulerComponent from '../../Components/SchedulerComponent';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from "../../Components/Api";


const Scheduler = () => {
  const [hideSidebar, setSidebar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState('')
  const [days, setDays] = useState([])
  
  const handleClick = () => {
    setSidebar(!hideSidebar);
  };  
  
  const getDaysByCalendarPeriod = async () => {
    try {
      let response = await api.get('/api/calendar/getAll', {
        headers: {
          'x-auth-token': localStorage.getItem('authToken')
        }
      });
      // debugger;
      const id = response.data[0].id;
      const month = response.data[0].name;
      setCalendarMonth(month);

      const responseII = await api.get(
        '/api/calendarDays/getByCalendarId/' + id,
        {
          headers: {
            'x-auth-token': localStorage.getItem('authToken')
          }
        }
      );
      setDays(responseII.data);
    } catch (e) {
      setCalendarMonth('');
      setDays(null);
      return;
    }
  };

  const getMesEmPortugues = function () {
    const date = new Date()
    let value;
    if (date.getMonth() == 0){value = "Janeiro"};
    if (date.getMonth() == 1){value = "Fevereiro"};
    if (date.getMonth() == 2){value = "Março"};
    if (date.getMonth() == 3){value = "Abril"};
    if (date.getMonth() == 4){value = "Maio"};
    if (date.getMonth() == 5){value = "Junho"};
    if (date.getMonth() == 6){value = "Julho"};
    if (date.getMonth() == 7){value = "Agosto"};
    if (date.getMonth() == 8){value = "Setembro"};
    if (date.getMonth() == 9){value = "Outubro"};
    if (date.getMonth() == 10){value = "Novembro"};
    if (date.getMonth() == 11){value = "Dezembro"};
    return value;
  };

  const createCalendar = async () => {
    var data = new Date();
    const monthString = getMesEmPortugues();
    const monthNumber = data.getMonth() + 1;
    const year = data.getFullYear();

    // debugger;

    const payload = {
      name: monthString,
      period:
        monthNumber > 9 ? `${monthNumber}-${year}` : `0${monthNumber}-${year}`
    };

    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('authToken')
      }
    };
    await api
      .post(`/api/calendar/create`, payload, config)
      .then(async (res) => {
        console.log('criou calendario');
        getDaysByCalendarPeriod();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDaysByCalendarPeriod();
  }, []);

  const situationRadioButtonObject = {
    working: 'Trabalhando',
    onDuty: 'Plantão'
  };
  
  const unitySelectObject = {
    option1: 'Unimed Centro',
    option2: 'Unimed Vale Sul'
  };

  const departmentSelectObject = {
    option1: 'Pediatria',
    option2: 'Cardiologia'
  };

  const onDutyTypeObject = {
    option1: '4 horas',
    option2: '6 horas',
    option3: '8 horas',
    option4: '12 horas'
  };

  return (
    <div>
      <Header />
      <div className={styles.contentWrapper}>
        <div className={styles.sidebarWrapper}>
          <div
            className={`${
              hideSidebar ? styles.hideSidebar : styles.sidebarContainer
            }`}
          >
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
          <div className={styles.menu}>
            {hideSidebar ? (
              <FiChevronRight
                size={40}
                color="#0f499d"
                className={styles.accordionIcon}
                onClick={() => {
                  handleClick();
                }}
              />
            ) : (
              <FiChevronLeft
                size={40}
                color="#0f499d"
                className={styles.accordionIcon}
                onClick={() => {
                  handleClick();
                }}
              />
            )}
          </div>
        </div>
        <div className={styles.schedulerContainer}>
          <div className={styles.headerSchedulerContainer}>
            {days ? (
              <h1>{calendarMonth}</h1>
            ) : (
              <button onClick={() => createCalendar()}>Gerar Calendário</button>
            )}
            <div className={styles.buttonsContainer}>
              <div className={styles.changeMonth}></div>
              <Button>Exportar</Button>
            </div>
          </div>
          {days ? (
            <SchedulerComponent days={days}></SchedulerComponent>
          ) : (
            <SchedulerComponent days={[]}></SchedulerComponent>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
