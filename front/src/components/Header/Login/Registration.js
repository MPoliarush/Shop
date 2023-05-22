import { useEffect, useState } from "react"
import {Link,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux"
import {orderActions} from '../../../store/store'
import Footer from '../../Footer';

import axios from "axios";

function Registration(){

    const [client,setClient] = useState({
        name:'',
        surname:'',
        second:'',
        mobile:'',
        email:'',
        password:'',
        orders:[]
    })

    const [valid,setValid]=useState({
        name:'',
        surname:'',
        second:'',
        mobile:'',
        email:'',
        password:''
    })

    const [success,setSuccess] = useState(null)

    let navigate = useNavigate();



    function clientInputHandler(e){
        if(e.target.name == 'name' && e.target.name.length>0){
            setClient({...client,
                name: e.target.value
            })
            setValid({...valid,
                name:null
            })
        }
        if(e.target.name == 'surname'){
            setClient({...client,
                surname: e.target.value
            })
            setValid({...valid,
                surname:null
            })
        }
        if(e.target.name == 'second'){
            setClient({...client,
                second: e.target.value
            })
            setValid({...valid,
                second:null
            })
        }
        if(e.target.name == 'mobile' ){
            setClient({...client,
                mobile: e.target.value
            })
            setValid({...valid,
                mobile:null
            })
        }
        if(e.target.name == 'email' ){
            setClient({...client,
                email: e.target.value
            })
            setValid({...valid,
                email:null
            })
        }
        if(e.target.name == 'password'){
            setClient({...client,
                password: e.target.value
            })
            setValid({...valid,
                password:null
            })
        }

        
    }
    console.log(client)



    async function submitClient(e){
        console.log('logged')
        if(client.name.length==0){
            console.log('error')
            setValid({...valid,
                name:"Будь-ласка, введіть ім'я"
            })
            return
        }
        if(!client.surname.length){
            console.log('error')
            setValid({...valid,
                surname:"Будь-ласка, введіть прізвище"
            })
            return
        }
        if(!client.second.length){
            console.log('error')
            setValid({...valid,
                second:"Будь-ласка, введіть по батькові"
            })
            return
        }
        if(!client.mobile.length){
            console.log('error')
            setValid({...valid,
                mobile:"Будь-ласка, введіть номер"
            })
            return
        }
        if(!client.email.length  || !client.email.trim().includes('@')){
            console.log('error')
            setValid({...valid,
                email:"Будь-ласка, введіть валідний email"
            })
            return
        }
        if(!client.password.length|| client.password.length<8){
            console.log('error')
            setValid({...valid,
                password:"Будь-ласка, введіть мінімум 8 символів"
            })
            return
        }

        console.log('sent')

        setSuccess(true)

        // setTimeout(()=>{
        //     let path = `/login`; 
        //     navigate(path);
        // },4000)
        
        // fetch('http://localhost:5000/new-client',{
        //         method:'POST',
        //         headers:{
        //             "Content-Type": "application/json"
        //         },
        //         body:JSON.stringify(client)
        //         }
        //     ).then(res=>res.json())
        //     .then(data=>{
        //         console.log(data)
        //     })

    
        const config = {
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        }
        console.log(client)
        try{
            const response = await axios.post('https://shop-apps.onrender.com/newClient', client, config )
        } catch(e){
            console.log(e)
        }
        
        
    }

const sucsessMessage= <div className="successMessage">
<h2>Дані збережено</h2>
<p>Увійдіть в кабінет</p>
</div>


    return (
        <>
            <main>
                <div className = 'content-container registration'>
                    <h1>РЕЄСТРАЦІЯ КОРИСТУВАЧА</h1>

                    {success ? sucsessMessage : 
                    (<div>
                        <div className="form-wrapper">
                        <div className="field-wrap">
                            <div>
                                <p>Ім'я*</p>
                                <span>{valid.name}</span>
                            </div>
                            <input type="text" id= 'name' onChange={clientInputHandler} name='name' />
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>Прізвище*</p>
                                <span>{valid.surname}</span>
                                <input type="text" id= 'surname' onChange={clientInputHandler} name='surname'/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>По батькові*</p>
                                <span>{valid.second}</span>
                                <input type="text" id= 'second'onChange={clientInputHandler} name='second'/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>Телефон</p>
                                <span>{valid.mobile}</span>
                                <input type="text" id= 'mobile'onChange={clientInputHandler} name='mobile'/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>E-mail*</p>
                                <span>{valid.email}</span>
                                <input type="text" id= 'email' onChange={clientInputHandler} name='email'/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>Пароль*</p>
                                <span>{valid.password}</span>
                                <input type="text" id= 'password' onChange={clientInputHandler} name='password'/>
                            </div>
                        </div>
                    </div>
                        <button className="auth-btn-reg" onClick={submitClient}>ЗАВЕРШИТИ РЕЄСТРАЦІЮ</button>
                    </div>
                    )
                    }
                </div>
            </main>
            <Footer></Footer>
        </>
       
    )
}

export default Registration