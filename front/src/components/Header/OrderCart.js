import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux"
import {orderActions,totalDaysActions} from '../../store/store'
import Footer from '../Footer';




function OrderCart(){

    const [days,setDays]= useState({
        since:'',
        till:'',
        work:0,
        weekend:0,
        week:0,
        month:0,
    })
    const [total,setTotal] = useState(0)
    const [isMobile,setIsMobile] = useState(false)

const stateBasket = useSelector(state=>state.basketOrders.goods)
// console.log(stateBasket)
const stateTotalPrice = useSelector(state=>state.rentalDays.totalPrice)
const stateTotal = useSelector(state=>state.rentalDays)

const dispatch = useDispatch()

console.log(stateTotal)
console.log(days)

function startDaysHandler(e){
    
    setDays({...days,
        since: e.target.value})
    dispatch(totalDaysActions.since(e.target.value))
    console.log('changed')
}

function endDaysHandler(e){
 
    setDays({...days,
        till: e.target.value})
    dispatch(totalDaysActions.till(e.target.value))
    console.log('changed')
}



useEffect(()=>{
  
    setDays({
        since: stateTotal.since,
        till: stateTotal.till,
        work: stateTotal.work,
        weekend: stateTotal.weekend,
        week: stateTotal.week,
        month:stateTotal.month
    })
    
},[stateTotal])




function deleteFromBasket(e){
    console.log(JSON.parse(e.currentTarget.name))
    
    if(stateBasket.length==1){

        dispatch(totalDaysActions.since(''))
         dispatch(totalDaysActions.till(''))
         dispatch(totalDaysActions.totalDays({ 
            work:0,
            weekend:0,
            week:0,
            month:0,}))
        dispatch(orderActions.removeGood(JSON.parse(e.currentTarget.name)))

    } else if(stateBasket.length>1){
        
        dispatch(orderActions.removeGood(JSON.parse(e.currentTarget.name)))
    }
}


useEffect(()=>{
   
    let price=0
    for (const item of stateBasket){
        
        if(days.work>0){
            price = price + days.work*item.work_price
            // console.log(price)
        }
         if(days.weekend>0){
            price = price + days.weekend*item.weekend_price
            // console.log(price)
        }
         if(days.week>0){
            price = price + days.week*item.week_price
            // console.log(price)
        }
        if(days.month>0){
            price = price + days.month*item.month_price
            // console.log(price)
        }
    }

    
    dispatch(totalDaysActions.totalPrice(price))

},[stateBasket,days])


function dateHandler(){

    let startDate = new Date(days.since);
    let endDate = new Date(days.till);
    
    endDate.setDate(endDate.getDate() + 1);
    
    let alldays=[]
    let i=0;
    while (startDate < endDate) {
        alldays.push(startDate.getDay());
        startDate.setDate(startDate.getDate() + 1);
        i++;
    }
    
    
    let daysDescr={
        since:days.since,
        till:days.till,
        work:0,
        weekend:0,
        week:0,
        month:0
    }

    if(alldays.length >= 30){
        // daysDescr.work = 0
        // daysDescr.weekend = 0
        // daysDescr.week = 0
        daysDescr.month = alldays.length/30
        setDays({...days,
            work:0,
            weekend:0,
            week:0,
            month:daysDescr.month
        })
        dispatch(totalDaysActions.totalDays(daysDescr))
        return
    }
    
    if (alldays.length%7 == 0){
       console.log(alldays.length/7)
        daysDescr.week = alldays.length/7
    } 

    if(alldays.length<7){
        for(let i=0;i<alldays.length;i++){  
            if (alldays[i] == 6 || alldays[i] == 0){
                console.log('logged ')
                daysDescr.weekend = daysDescr.weekend+ 1
            } else {
                console.log('logged here')
                daysDescr.work = daysDescr.work+ 1
            }
        }
    }
    
    if (alldays.length%7 > 0 && alldays.length > 7){
        console.log(alldays,   alldays.length,  alldays.length%7, alldays.length/7 )
        console.log(alldays.length/7 - (alldays.length/7 - Math.floor(alldays.length/7)) )
        daysDescr.week = alldays.length/7 - (alldays.length/7 - Math.floor(alldays.length/7))
        alldays = alldays.slice(-(alldays.length - 7*daysDescr.week))

        console.log(alldays)

        for(let i=0;i<alldays.length;i++){  
            if (alldays[i] == 6 || alldays[i] == 0){
                console.log('logged here')
                daysDescr.weekend = daysDescr.weekend+ 1
            } else {
                console.log('logged here')
                daysDescr.work = daysDescr.work+ 1
            }
        }
    }   
        
        setDays({...days,
            work:daysDescr.work,
            weekend:daysDescr.weekend,
            week:daysDescr.week,
            month:daysDescr.month
        })
    
        dispatch(totalDaysActions.totalDays(daysDescr))
    
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
        <div className = 'content-container orders'>
            <h1 className='catalog-h1'>КОШИК ТОВАРІВ</h1>
            <div className='period'>
                <div className='from'>
                    <span>З якого числа:</span>
                    <input type='date'  className="calendar-input" onChange={startDaysHandler} value={stateTotal.since}/>
                </div>
                <div className='to'>
                    <span>По яке число:</span>
                    <input type='date'  className="calendar-input" onChange={endDaysHandler} value={stateTotal.till}/>
                </div>
                <button className="confirm-btn date" onClick={dateHandler}>Вибрати </button>
            </div>

           
                <div className="goods-wrapper">
                    <div className={isMobile ? 'mobile' : 'heading'}>
                        <span  className="fixedWidth">Фото</span>
                        <span  className="fixedWidth name">Назва</span>
                        <span  className="fixedWidth">Робочих днів</span>
                        <span className="fixedWidth">Вихідних днів</span>
                        <span className="fixedWidth">Тижнів</span>
                        <span className="fixedWidth">Місяців</span>
                        <span className="fixedWidth">Всього вартість</span>
                        <span className="fixedWidth"></span>
                        
                    </div>

                    {stateBasket.map(item=>{
                        
                        return (
                            <div className='item'>
                                <p className="fixedWidth"><img className="goodIMG" src = {`https://shop-apps.onrender.com/uploadedIMG/${item.img1[0].filename}`}/></p>
                                <div className="fixedWidth name">
                                    <p> {item.brand}</p>
                                    <p className="heavy">{item.model}</p>
                                </div>

                                <p className="fixedWidth"><span className={!isMobile && 'hidden' }>Будній, грн</span><span className="day">{days.work || 0}</span> <span className='pricesmall'>{item.work_price} UAH</span></p>
                                <p className="fixedWidth"><span className={!isMobile && 'hidden' }>Вихідний, грн</span><span className="day">{days.weekend ||0}</span><span className='pricesmall'>{item.weekend_price} UAH</span></p>
                                <p className="fixedWidth"><span className={!isMobile && 'hidden' }>Тиждень, грн</span><span className="day">{days.week || 0}</span><span className='pricesmall'>{item.week_price} UAH</span></p>
                                <p className="fixedWidth"><span className={!isMobile && 'hidden' }>Місяць, грн</span><span className="day">{days.month || 0}</span> <span className='pricesmall'>{item.month_price} UAH</span></p>
                                <p className="fixedWidth"><span className={!isMobile && 'hidden' }>Всього, грн</span> <span className='day' >{days.month*item.month_price + days.week*item.week_price + days.weekend*item.weekend_price +days.work*item.work_price || days.month*item.month_price} UAH</span></p>
                                <p className="fixedWidth"><img className="basketIMG" onClick={deleteFromBasket} name={JSON.stringify(item)} src="/imagesHTML/icons/delete.png"/></p>
                            </div>
                        )
                    }
                    )}  
                
             
                </div>
                <button className="confirm-btn total">Всього: {stateTotalPrice} UAH </button>
                <Link to='/ordersConfirmation'><button className="confirm-btn">ОФОРМИТИ ЗАМОВЛЕННЯ</button></Link>
            
        </div>
    </main>
    <Footer></Footer>
    </>
)
}

export default OrderCart