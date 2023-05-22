import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import {orderActions,clientActions,totalDaysActions} from '../../store/store'
import Footer from '../Footer';
import axios from "axios";

function Confirmation(){

    const [postPoints, setPostPoints]= useState([])
    const [city,setCity] = useState('none')
    const [active,setActive] =useState({
        self:true,
        post:false,
        postalDetails:{
            city:'',
            number:''
        }
    })

    const [isLoading, setIsLoading] = useState('')
    const [orderSaved,setOrderSaved] = useState(false)

    const stateBasket = useSelector(state=>state.basketOrders.goods)
    const stateTotal = useSelector(state=>state.rentalDays)
    const stateTotalPrice = useSelector(state=>state.rentalDays.totalPrice)
    const stateLogin = useSelector(state=>state.client.clientData)
    const dispatch = useDispatch() 


    async function getWarehouses(){
    
        try{
            
            const params = {
                "apiKey": "6954dc5c4df388e9361fa0812f491bcd",
                "modelName": "Address",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                "CityName" : `${city}`,
                "Page" : "1",
                "Limit" : "400",
                "Language" : "UA",
                "TypeOfWarehouse": "841339c7-591a-42e2-8233-7a0a00f0ed6f"
                }
             }
            const response = await axios.post(`https://api.novaposhta.ua/v2.0/json/`, params)
            console.log(response.data)
            setIsLoading('')
            setPostPoints(response.data.data)
           
        }catch(e){
            console.log(e)
        }
    }
    
    
    
    useEffect(()=>{
        
        getWarehouses()
        setIsLoading('')
       
    },[city])
    


const intervalSetting = function (){
    setTimeout(()=>{
        setIsLoading('Завантаження...')
    },1000)
}


function cityHandler(e){
    setCity(e.target.value)
    setActive({...active,
        city:e.target.value
    })

    intervalSetting()
    
}

console.log(isLoading)

function postalNumberHandler(e){
    setActive({...active,
        postalDetails: e.target.value
    })
}



function deliveryTypeHandler(e){
    console.log(e.target.name)
    if(e.target.name=='Нова'){
        setActive({...active,
            self:false,
            post:true
        })
    }
    if(e.target.name=='Самовивіз'){
        setActive({...active,
            self:true,
            post:false,
           postalDetails:{}
        })
       
    }
}

console.log(stateLogin)




async function confirmOrder(){
   
    const completedOrder={
        delivery:active,
        daysAndPrice:stateTotal,
        person:stateLogin,
        goodsID:stateBasket,
        dayOfOrder: new Date().toJSON().slice(0, 10),
    }
    console.log(completedOrder)

    if(completedOrder.person == null){
        console.log('Not authorized')
        return
    }

    for(const good of stateBasket){
        dispatch(orderActions.removeGood(good))
    }

    dispatch(totalDaysActions.totalDays({
        work:0,
        weekend:0,
        week:0,
        month:0
        })
    )

    dispatch(totalDaysActions.totalPrice(0))
    dispatch(totalDaysActions.since(''))
    dispatch(totalDaysActions.till(''))

    setOrderSaved(true)
  
    try{
        const response = await axios.post('https://shop-apps.onrender.com/orderCompleted', completedOrder )
        console.log(response.data)
        
    } catch(e){
        console.log(e)
    }

}


useEffect(()=>{
    window.scrollTo(0, 0)
},[])


const authError= <span className="authErr">Будь ласка, авторизуйтесь.</span>


const sucsessMessage= <div className="successMessage">
<h2>Замовлення збережено!</h2>
<p>Ми зв'яжемось з вами протягом дня.</p>
</div>



return(
        <>
            <main>
                <div className = 'content-container confirm'>
                    <h1 className="registration"><span>ОФОРМЛЕННЯ</span> ЗАМОВЛЕННЯ</h1>
                    <p className="basic-text">Для успішного оформлення замовлення необхідно авторизуватись.</p>

                    {!orderSaved ? 
                        <div className="goods-wrapper ">
                            <h4>Товари:</h4>
                            <div className="heading-confirm">
                                <span  className="fixedWidth">Фото</span>
                                <span  className="fixedWidth">Назва</span>
                                <span  className="fixedWidth">Днів</span>
                                <span  className="fixedWidth">Період</span>
                                
                            </div>

                            {stateBasket.map(item=>{
                                    return (
                                        <div className='item-confirm'>
                                            <p className='fixedWidth'><img className="goodIMG" src = {`https://shop-apps.onrender.com/uploadedIMG/${item.img1[0].filename}`}/></p>
                                            <div className="fixedWidth">
                                                <p>{item.brand}</p>
                                                <p className="heavy">{item.model}</p>
                                            </div>

                                            <p className="fixedWidth"> <span>{stateTotal.work+ stateTotal.weekend + stateTotal.week*7 + stateTotal.month*30} </span></p>
                                            <p className="fixedWidth"> <span className='period-span'>{stateTotal.since}</span> <span className='period-span'>{stateTotal.till}</span></p>
                                        
                                        </div>
                                    )
                                }
                            )}

                            <button className="confirm-btn confirmation">Всього: {stateTotalPrice} UAH </button>
                                <hr></hr>


                            <div className="delivery">
                                <h3>Доставка товару</h3>

                                <div >
                                    <div className='deleveryType' onChange={deliveryTypeHandler} >
                                        <p>Спосіб доставки:</p>
                                        <div className='input-div'><input type='radio'  name='Самовивіз' value='Самовивіз' checked={active.self==true ? true :false}/><label >Самовивіз</label></div>
                                        <div className='input-div'><input type='radio'  name='Нова' value='Нова' checked={active.post==true ? true :false} /><label >Нова Пошта</label></div>
                                    </div>

                                    {active.post==true ? 
                                    <div className="deliv-wrapp">
                                        <div className="chooseCity">
                                            <label>Місто:</label>
                                            <input type="text" onChange={cityHandler}/>
                                        </div>

                                        <div class='post-point'>
                                            <label>Вибір відділення Нової Пошти</label>
                                        
                                            <select className="postSelect" onChange={postalNumberHandler}> 
                                                {isLoading=='Завантаження...' ? <option>Завантаження...</option>: null }
                                                { postPoints.map(point=>{
                                                        return <option className="option" value={point.Description}>{point.Description} </option>
                                                }) }
                                            </select>  
                                                
                                        </div>
                                    </div>
                                    : ""
                                    }
                                </div>
                            </div>


                            <hr></hr>
                            
                            <button className="auth-btn-reg" onClick={confirmOrder}>ПІДТВЕРДИТИ ЗАМОВЛЕННЯ</button>
                        
                            {!stateLogin ? authError : ''}
                            

                        </div>
                    :sucsessMessage
                    }
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}

export default Confirmation

// 6954dc5c4df388e9361fa0812f491bcd