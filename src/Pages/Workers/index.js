import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import Headers from '../../Components/Header'

import api from '../../Components/Api';
import style from './_style.module.scss'


const Workers = () => {
    const history = useHistory()

    const [users, setUsers] = useState(null)

    const getAllWorkers = async () => {
        const response =  await api.get('/api/user/getAll')
        const usersData = response.data
        setUsers(usersData)
    }

    const generateUsersGrid = () => {
        const elements = users.map(item=>{
            return(
                <div className={style.row} key={item.id} id={`user-${item.id}`}>
                    <div className={style.rowName}>
                        <h3>{item.name}</h3>
                    </div>
                    <div className={style.rowEmail}>
                        <h3>{item.email}</h3>
                    </div>
                    <div className={style.rowButtons}>
                        <button>Editar</button>
                        <button onClick={()=>handleDeleteUser(item.id)}>Remover</button>       
                    </div>          
                </div>
            )
        })

        return elements
    }

    const handleDeleteUser = async (id)=>{
        debugger
        console.log(id)
        const payload = {
            id:id
        }
         await api.post('/api/user/deleteById',payload)
            .then(res=>{
                console.log(res)
            })

        history.go(0)
    }

    useEffect(()=>{
        getAllWorkers()
    }, [])
    
    return(
        <div>
            <Headers />
            <div className={style.contentContainer}>
            <button style={{margin:'30px'}} onClick={()=>history.push('/addWorkers')}>Adicionar</button>
                { users && generateUsersGrid()}
            </div>
        </div>
    )
}

export default Workers