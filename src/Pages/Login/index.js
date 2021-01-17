import React, {Component} from 'react';
import {FiCalendar} from 'react-icons/fi';

import './style.scss';

class Login extends Component{
    
    render(){
        return(
            <div className="login-container">
                <div className="square-container">
                    <div className="title-container">
                        <FiCalendar size={30} color="#0f499d"/>
                        <h2>Scheduler</h2>
                    </div>
                    <div className="form-container">
                        <div>
                            <span>Email</span>
                            <input type="text"></input>
                        </div>
                        <div>
                            <span>Senha</span>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <button>Esqueci minha senha</button>
                        <button>Entrar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;