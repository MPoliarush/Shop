import  { useState,useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux"

import axios from "axios";

import BurgerModal from './BurgerModal';




function Header(props){

const stateBasket = useSelector(state=>state.basketOrders.goods)
const stateCompare = useSelector(state=>state.comparison.items)
const stateLiked = useSelector(state=>state.like.items)
const stateLogin = useSelector(state=>state.client.clientData)
let navigate = useNavigate();

const [mouseOvered, setMouseOvered]=useState(false)
const [activeBurger, setActiveBurger] =useState(false)
const [clientName,setClientName] = useState('')
// console.log(clientName)


function catalogHover(event){
  setMouseOvered(true)
}

function catalogUnhover(event){
  setMouseOvered(false)
}

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
      console.log(response.data)
      setClientName(response.data)
  } catch(e){
      console.log(e)
      setClientName('')
  }
   
}


useEffect(()=>{
   getClientData()
   
},[stateLogin])


function loginIconClickHandler(){
let path
  if(stateLogin){
     path='/login/authorized'
  } else {
     path='/login'
  }
  navigate(path)
}


function burgerClickHandler(e){
console.log('clicked burger')
setActiveBurger(!activeBurger)
}


console.log(activeBurger)


    return (
        <header>
          <Link to='/' className='logo'> <img src={process.env.PUBLIC_URL + '/imagesHTML/icons/logo.png'} alt='logo'/> </Link>
            <div className='navAndlogin'>
                <nav>
                {!activeBurger ?
                  <ul className='nav-list'>
                    <li className='nav-li' onMouseOver={catalogHover} onMouseOut={catalogUnhover}>
                      <a href='#'>КАТАЛОГ</a>
                      <ul className={!mouseOvered ? 'nested-list': 'nested-list visible'} >
                        <li> <Link to={'/cameras'}>Фотокамери</Link></li>
                        <li><Link to={'/linses'}>Об'єктиви</Link> </li>
                      </ul>
                    </li>
                    <li className='nav-li'><Link to='/about'>ПРО КОМПАНІЮ </Link></li>
                    <li className='nav-li'><Link to='/news'> НОВИНИ </Link></li>
                    <li className='nav-li'><Link to='/contacts'>КОНТАКТИ</Link></li>
                    <img className='burger' src='imagesHTML/icons/burger.png' onClick={burgerClickHandler}/>
                  </ul>
                  : <BurgerModal closing={burgerClickHandler}></BurgerModal>
                }
                  

                </nav>
                <ul className='options-list'>
                  <Link to='/liked'> <li><img src='/imagesHTML/icons/star.png' alt='star' onMouseOver={e => (e.currentTarget.src = '/imagesHTML/icons/starHovered.png')} onMouseOut={e => (e.currentTarget.src =  '/imagesHTML/icons/star.png')} /> <span className={stateLiked.length !=0 ? 'iconNumber' : ''}>{stateLiked.length==0 ? '' : stateLiked.length}</span>  </li> </Link>
                  <Link to='/comparison'> <li><img src='/imagesHTML/icons/compare.png' alt='compare' onMouseOver={e => (e.currentTarget.src = process.env.PUBLIC_URL + '/imagesHTML/icons/compareHovered.png')} onMouseOut={e => (e.currentTarget.src = process.env.PUBLIC_URL + '/imagesHTML/icons/compare.png')} /> <span className={stateCompare.length !=0 ? 'iconNumber' : ''}>{stateCompare.length==0 ? '' : stateCompare.length}</span>  </li> </Link>
                  <Link to='/orders'> <li><img src='/imagesHTML/icons/basket1.png' alt='basket' onMouseOver={e => (e.currentTarget.src = process.env.PUBLIC_URL + '/imagesHTML/icons/basket1Hovered.png')} onMouseOut={e => (e.currentTarget.src = process.env.PUBLIC_URL + '/imagesHTML/icons/basket1.png')}/> <span className={stateBasket.length !=0 ? 'iconNumber' : ''}> {stateBasket.length==0 ? '' : stateBasket.length}</span> </li> </Link>
                  <li className='loginImgLi' onClick={loginIconClickHandler}><img className='loginImg' src='/imagesHTML/icons/user.png' alt='user' onMouseOver={e => (e.currentTarget.src = process.env.PUBLIC_URL + '/imagesHTML/icons/userHovered.png')} onMouseOut={e => (e.currentTarget.src = process.env.PUBLIC_URL + '/imagesHTML/icons/user.png')}  /><span className={clientName.length !=0 ? 'iconNumber clientName' : ''}> {clientName.name==0 ? '' : clientName.name} </span>  </li>

                </ul>
            </div>
        </header>
    )
}

export default Header