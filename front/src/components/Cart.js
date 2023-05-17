import { useState,useEffect } from "react"
import {Link, useParams} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux"
import {orderActions, compareActions} from '../store/store'


function Cart(props){
// const params = useParams()
// console.log(params.id)
// console.log(props.itemData)
const[cartPathNew, setCartPathNew] = useState('')
const [added,setAdded] = useState("В кошик")
const [compared,setCompared] = useState('http://localhost:3000/imagesHTML/icons/compare.png')
const stateBasket = useSelector(state=>state.basketOrders.goods)
const stateCompare = useSelector(state=>state.comparison.items)

const dispatch = useDispatch()


useEffect(()=>{
    const elementInBasket = stateBasket.find(el=> el._id== props.itemData._id)
    if (elementInBasket){
        setAdded('Додано!')
    } 
    
},[])

useEffect(()=>{
    const elementInCompare = stateCompare.find(el=> el._id== props.itemData._id)
    if (elementInCompare){
        setCompared('http://localhost:3000/imagesHTML/icons/done.png')
    } 
    
},[])


let cartPath=''
    if (props.itemData.typeGoods=='Фотокамера'){
        cartPath = `/cameras/view/${props.itemData._id}`
    } else if (props.itemData.typeGoods=='Лінза'){
        cartPath = `/linses/view/${props.itemData._id}`
    }

function addToBasket(){
    if(added=='В кошик'){
        dispatch(orderActions.addGood(props.itemData))
        setAdded('Додано!')
    } else {
        dispatch(orderActions.removeGood(props.itemData))
        setAdded('В кошик')
    }
   
}

function addToCompare(e){
    console.log(e.currentTarget.src)
    if(e.currentTarget.src == 'http://localhost:3000/imagesHTML/icons/done.png'){
        dispatch(compareActions.removeFromCompare(props.itemData))
        e.currentTarget.src = 'http://localhost:3000/imagesHTML/icons/compare.png'
        console.log('first', e.currentTarget.src)
    } else if(e.currentTarget.src == 'http://localhost:3000/imagesHTML/icons/compare.png'){
        dispatch(compareActions.addToCompare(props.itemData))
        e.currentTarget.src = 'http://localhost:3000/imagesHTML/icons/done.png'
        console.log('second', e.currentTarget.src)
    }  
}


    return (
        
    <li className='card-frame news-goods'>
        <div className='product-info'>
          <div className='product-img-wrapper'><img src={`http://localhost:5000/uploadedIMG/${props.itemData.img1[0].filename}`} className='product-img' alt='user'/></div>
          <p className='model'>{props.itemData.model}</p>
          <p className='brand'>{props.itemData.brand}</p>
          <div className='card-block-nav'>
              <img src={compared} onClick={addToCompare} alt='compare' />
              <img src='/imagesHTML/icons/star.png' alt='star' onMouseEnter={e => (e.currentTarget.src = process.env.PUBLIC_URL + '/imagesHTML/icons/starHovered.png')} onMouseLeave={e => (e.currentTarget.src = process.env.PUBLIC_URL + '/imagesHTML/icons/star.png')}  />
          </div>
        </div>
        <div className='product-pricing'>
          <div className='product-pricing-box'>
              <span className='product-pricing-box-price'>{props.itemData.work_price} UAH</span>
              <span>Будній</span>
          </div>
          <div className='product-pricing-box weekend'>
              <span className='product-pricing-box-price'>{props.itemData.weekend_price} UAH</span>
              <span>Вихідний</span>
          </div>
          <div className='product-pricing-box week'>
              <span className='product-pricing-box-price'>{props.itemData.week_price} UAH</span>
              <span>Тиждень</span>
          </div>
          <div className='product-pricing-box month'>
              <span className='product-pricing-box-price'>{props.itemData.month_price} UAH</span>
              <span>Місяць</span>
          </div>
        </div>
        <div className='product-options'>
            <Link to={cartPath}> <button className='view-details'>Деталі товару</button></Link>
            <button className='add-to-basket' onClick={addToBasket}><img src= '/imagesHTML/icons/basket.png' alt='basket'/> {added}</button>
        </div>
    </li>
    )
}

export default Cart