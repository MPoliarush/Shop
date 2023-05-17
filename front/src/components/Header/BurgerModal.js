import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'



function BurgerModal(props){



function burgerClickHandler(){
    console.log('clicked burger')
     props.closing()
}



return (
    <div className='nav-list-burger'>
        <ul>
            <li>КАТАЛОГ
                <ul className='nested-list-burger'>
                    <li> <Link to={'/cameras'} onClick={burgerClickHandler}>Фотокамери</Link></li>
                    <li><Link to={'/linses'} onClick={burgerClickHandler}>Об'єктиви</Link> </li>
                </ul>
            </li>
            <li className='nav-li-burger'><Link to='/about' onClick={burgerClickHandler}>ПРО КОМПАНІЮ </Link></li>
            <li className='nav-li-burger'><Link to='/news' onClick={burgerClickHandler}> НОВИНИ </Link></li>
            <li className='nav-li-burger'><a href='#' onClick={burgerClickHandler}>КОНТАКТИ</a></li>
            
        </ul>
        <img className='burger-close' src='imagesHTML/icons/burgerback.png' onClick={burgerClickHandler}/>
    </div>
)
}

export default BurgerModal