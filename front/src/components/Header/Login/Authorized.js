import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux"
import {clientActions} from '../../../store/store'
import Footer from '../../Footer';

function Authorized(){
    const [activeInputs,setActiveInputs] = useState({
        personalData:false,
        ordersHistory:true,
    })

    const [predefinedData, setPredefinedData] = useState({
        name:'',
        surname:'',
        second:'',
        mobile:'',
        email:'',
        password:''
    })
    const [valid,setValid]=useState({
        name:'',
        surname:'',
        second:'',
        mobile:'',
        email:'',
        password:''
    })
    const [oldOrders, setOldOrders]= useState()
    const [success,setSuccess] = useState(null)
    const [isMobile,setIsMobile] = useState(false)

    const stateLogin = useSelector(state=>state.client.clientData)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    // console.log(stateLogin)
   


    async function getClientData(){
        // console.log(clientState, '  logged')

        const config = {
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        }
        
        try{
            const response = await axios.post('https://shop-apps.onrender.com/getClient', stateLogin, config )
            // console.log(response.data)
            setPredefinedData(response.data)
        } catch(e){
            console.log(e)
        }
        
        
    }

    useEffect(()=>{
        getClientData()
    },[])


    function activeHandler(e){
        e.preventDefault()
        if(e.target.value=='Дані'){
            setActiveInputs({
                personalData:true,
                ordersHistory:false})
        } else {
            setActiveInputs({
                personalData:false,
                ordersHistory:true})
        }

    }


function clientInputHandler(e){
    
    if(e.target.name == 'name'){
        setPredefinedData({...predefinedData,
            name: e.target.value
        })
        setValid({...valid,
            name:null
        })
        
    }
    if(e.target.name == 'surname'){
        setPredefinedData({...predefinedData,
            surname: e.target.value
        })
        setValid({...valid,
            surname:null
        })
    }
    if(e.target.name == 'second'){
        setPredefinedData({...predefinedData,
            second: e.target.value
        })
        setValid({...valid,
            second:null
        })
    }

    if(e.target.name == 'mobile' ){
        setPredefinedData({...predefinedData,
            mobile: e.target.value
        })
        setValid({...valid,
            mobile:null
        })
       
    }
    if(e.target.name == 'email' ){
        setPredefinedData({...predefinedData,
            email: e.target.value
        })
        setValid({...valid,
            email:null
        })
    }
    if(e.target.name == 'password'){
        setPredefinedData({...predefinedData,
            password: e.target.value
        })
        setValid({...valid,
            password:null
        })
    }
    
}


async function updateData(){
  
    if(predefinedData.name.length==0){
        console.log('error')
        setValid({...valid,
            name:"Будь-ласка, введіть ім'я"
        })
        return
    }

    if(!predefinedData.surname.length){
        console.log('error')
        setValid({...valid,
            surname:"Будь-ласка, введіть прізвище"
        })
        return
    }
    if(!predefinedData.second.length){
        console.log('error')
        setValid({...valid,
            second:"Будь-ласка, введіть по батькові"
        })
        return
    }
    if(!predefinedData.mobile.length){
        console.log('error')
        setValid({...valid,
            mobile:"Будь-ласка, введіть номер"
        })
        return
    }
    if(!predefinedData.email.length  || !predefinedData.email.trim().includes('@')){
        console.log('error')
        setValid({...valid,
            email:"Будь-ласка, введіть валідний email"
        })
        return
    }
    if(!predefinedData.password.length|| predefinedData.password.length<8){
        console.log('error')
        setValid({...valid,
            password:"Будь-ласка, введіть мінімум 8 символів"
        })
        return
    }

    console.log('sent')
    
    setSuccess(true)
    const updateded = setTimeout(()=>{
        setSuccess('')
    },2000)

    const config = {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    }

    const updading = await axios.post('https://shop-apps.onrender.com/clientUpdate', predefinedData ,config)
   

}


async function gerOrderHistory(){
    const orders = await axios.post('https://shop-apps.onrender.com/getOrderHistory', stateLogin)
    setOldOrders(orders.data.orders)
}

useEffect(()=>{
    gerOrderHistory()
},[])

console.log(oldOrders)

function logOutHandler(){
    dispatch(clientActions.logOut())
    
    let path='/login'
    navigate(path)
}



useEffect(()=>{

    if( window.innerWidth <= 550){
     console.log('mobile')
     setIsMobile(true)
    } else if (window.innerWidth >550){
     setIsMobile(false)
    }
 
 },[])



console.log(isMobile)



return(
    <>
    <main>
        <div className = 'content-container personalPage'>
            <h1 className="catalog-h1"><span>ОСОБОВИЙ</span> КАБІНЕТ</h1>
            <div className="greetings">
                <p >Вітаємо, {predefinedData.name}!</p>
                <button className="greet-btn" onClick={logOutHandler} >Вийти з кабінету</button>
            </div>
            <div className='options personal-nav'>
                <button onClick={activeHandler} className={activeInputs.ordersHistory==true ? 'active' : 'passive'} value='Історія'>Історія замовлень</button>
                <button onClick={activeHandler} className={activeInputs.personalData==true ? 'active' : 'passive'} value='Дані'>Мої дані</button>
            </div>
            <div className="personalInfo">

            { activeInputs.personalData===true ?
                <div className='clientCreds'>
                    <div className="form-wrapper">
                        <div className="field-wrap">
                            <div>
                                <p>Ім'я*</p>
                                <span>{valid.name}</span>
                            </div>
                            <input type="text" id= 'name' onChange={clientInputHandler} name='name' value={predefinedData.name}/>
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>Прізвище*</p>
                                <span>{valid.surname}</span>
                                <input type="text" id= 'surname' onChange={clientInputHandler} name='surname' value={predefinedData.surname}/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>По батькові*</p>
                                <span>{valid.second}</span>
                                <input type="text" id= 'second'onChange={clientInputHandler} name='second' value={predefinedData.second}/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>Телефон</p>
                                <span>{valid.mobile}</span>
                                <input type="text" id= 'mobile'onChange={clientInputHandler} name='mobile' value={predefinedData.mobile} />
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>E-mail*</p>
                                <span>{valid.email}</span>
                                <input type="text" id= 'email' onChange={clientInputHandler} name='email' value={predefinedData.email}/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div>
                                <p>Пароль*</p>
                                <span>{valid.password}</span>
                                <input type="text" id= 'password' onChange={clientInputHandler} name='password' defaultValue={predefinedData.password}/>
                            </div>
                        </div>
                    </div>
                    <button className="auth-btn-reg" onClick={updateData}>{success ? "Дані збережено" : 'ЗБЕРЕГТИ ДАНІ'}</button>
                </div>
                :
                <div className="clientsOrdersHistory">
                    <div className="goods-wrapper">
                        <div className={isMobile ? 'mobile' : 'heading old'}>
                            <span  className="fixedWidth">Фото</span>
                            <span  className="fixedWidth name">Назва</span>
                            <span  className="fixedWidth">Дата замовлення</span>
                            <span  className="fixedWidth">Період</span>
                            <span className="fixedWidth">Всього вартість, UAH</span>
                        </div>

                        {oldOrders ? oldOrders.map(order=>{
                            return (
                                <div className="heading old">
                                    <span  className="fixedWidth oldOrder">
                                    
                                        {order.goodsID.map(good=> {
                                        return <img className="oldImgs" src = {`https://shop-apps.onrender.com/uploadedIMG/${good.img1[0].filename}`} />}
                                        )}
                                       
                                    </span>
                                    <span  className="fixedWidth name oldOrder">
                                    <span className={!isMobile ? 'oldOrder hidden' : 'mobileSpan'}>Товар</span>
                                        {order.goodsID.map(good=>{
                                            return (
                                                <div>
                                                    <p>{good.brand}</p>
                                                     <p>{good.model}</p>
                                                </div>
                                                )
                                        })}
                                    </span>
                                    <span  className="fixedWidth oldOrder"><span className={!isMobile ? 'oldOrder hidden' : 'mobileSpan' }>Дата замовлення</span>{order.dayOfOrder}</span>
                                    <span  className="fixedWidth oldOrder"><span className={!isMobile ? 'oldOrder hidden' : 'mobileSpan' }>Період</span> <span className='period-span'>{order.daysAndPrice.since}</span> <span className='period-span'>{order.daysAndPrice.till}</span></span>
                                    <span className="fixedWidth oldOrder"><span className={!isMobile ? 'oldOrder hidden' : 'mobileSpan' }>Вартість, грн</span>{order.daysAndPrice.totalPrice}</span>
                                    
                                </div>
                            )
                          }) 
                          :''
                        }
                       

                    </div>
                </div>
            }
            </div>
        </div>
    </main>
    <Footer></Footer>
    </>
)
}

export default Authorized