import React, { useEffect, useState } from 'react';
import { useHistory} from "react-router-dom";
import style from './_style.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactbootStrap from 'react-bootstrap';
import api from '../../Components/Api';
import Select from '../../Components/Select';

const SchedulerComponent = (props) => {
  const [funcionarios, setFuncionarios] = useState(null);
  const [days, setDays] = useState([]);
  const [presenceTypeObj, setPresenceTypeObj] = useState(null);
  const [presence, setPresence] = useState('');
  const [showModalPopup, setShowModalPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [date, setDate] = useState(null);
  const [activities, setActivities] = useState(null);
  const history = useHistory();
  
 
  useEffect(async () => {
    getWorkersByProfileId()
    getAllActivityRecords()
    presenceType()
    setDays(props.days);
  }, [props]);

  const getAllActivityRecords = async () => {
    const response = await api.get('/api/activityRecord/plantonista/getAll', {
      headers: {
        'x-auth-token': localStorage.getItem('authToken')
      }
    });
    console.log(response.data)
    setActivities(response.data)

  }

  const getWorkersByProfileId = async () => {
    const id = 3;
    const response = await api.get('/api/user/getAllByProfileId/' + id);
    setFuncionarios(response.data);
  };

  const defautlHeaders = [{ name: 'Id' }, { name: 'Nome' }];

  const renderFuncionarios = (func, index) => {
    return (
      <tr key={index}>
        <td>{func.id}</td>
        <td>{func.name}</td>
        {renderPresenceDays(func)}
      </tr>
    );
  };

  const renderPresenceDays = (func) => {
    const data = days.map((day, index) => {
      debugger;
      let currentPresence = activities.find((item)=>{
        return item.start == day.shortDate && item.user_id == func.id
      })

      let text = ''

      if(currentPresence){
        if(currentPresence.presence_type_id == 1){
          text = 'N'
        }
        if(currentPresence.presence_type_id == 2){
          text = 'SFO'
        }
        if(currentPresence.presence_type_id == 3){
          text = 'SFA'
        }
      }
      

      return (
        <td key={index + 2} onClick={() => handlePresenceClick(func, day)}>{text}</td>
      );
    });

    return data;
  };

  const renderAllTableHeaders = () => {
    const renderedDefaultHeaders = defautlHeaders.map(renderDefaultHeaders);
    const renderedDays = days.map(renderDays);

    let tds = [];
    tds.push(renderedDefaultHeaders);
    tds.push(renderedDays);

    return tds;
  };

  const renderDefaultHeaders = (header, index) => {
    return <td key={index}>{header.name}</td>;
  };

  const renderDays = (day, index) => {
    return <td key={index}>{day.shortDate}</td>;
  };

  const presenceType = async () => {
    const response = await api.get('/api/presenceTypes/getAll', {
      headers: {
        'x-auth-token': localStorage.getItem('authToken')
      }
    });

    let presenceTypeData = response.data;
    let presenceTypeObj = presenceTypeData.map((item) => {
      return item.type;
    });

    await setPresence(presenceTypeObj[0])
    setPresenceTypeObj(presenceTypeObj);
  };

  const handlePresenceClick = async (func, day) => {
    await setShowModalPopup(!showModalPopup);
    if(!showModalPopup){
      setUserId(func.id)
      setDate(day.shortDate)
    }
  };

  const hangleConfirm = async () => {

    const response = await api.get('/api/presenceTypes/getAll', {
      headers: {
        'x-auth-token': localStorage.getItem('authToken')
      }
    });
    debugger;
    const currentPresence = response.data.find((item)=>{
      return presence == item.type
    })

    const payload = {
      "presence_type_id":currentPresence.id,
      "user_id": userId,
      "start":date,
      "end":date
    }

    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('authToken')
      }
    };

    debugger;

    await api
      .post(`/api/activityRecord/create`, payload, config)
      .then(async (res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });

      await setShowModalPopup(!showModalPopup);
      history.push("/scheduler");
  }

  return (
    <div className={style.schedulerContainer}>
      {props.days.length > 0 && (
        <ReactbootStrap.Table>
          <thead>
            <tr>{days ? renderAllTableHeaders() : null}</tr>
          </thead>
          <tbody>
            {funcionarios ? funcionarios.map(renderFuncionarios) : null}
          </tbody>
        </ReactbootStrap.Table>
      )}
      {showModalPopup && (
        <div className={style.modalPopup}>
          <div className={style.whiteCardPopup}>
            <label>Tipo de presença:</label>
            <Select
              name="presenceType"
              id="presenceType"
              object={presenceTypeObj}
              value={presence}
              onChange={(e)=>setPresence(e.target.value)}
            />
            <div className={style.buttonWrapper}>
              <button
                onClick={() => {
                  handlePresenceClick();
                }}
              >
                Cancelar
              </button>
              <button onClick={()=>hangleConfirm()}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulerComponent;
