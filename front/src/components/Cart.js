import { useState,useEffect } from "react"
import {Link, useParams} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux"
import {orderActions, compareActions, likeActions} from '../store/store'


function Cart(props){
// const params = useParams()
// console.log(params.id)
// console.log(props.itemData)
const[cartPathNew, setCartPathNew] = useState('')
const [added,setAdded] = useState("В кошик")
const [compared,setCompared] = useState('/imagesHTML/icons/compare.png')
const [liked,setLiked] = useState('/imagesHTML/icons/star.png')
const stateBasket = useSelector(state=>state.basketOrders.goods)
const stateCompare = useSelector(state=>state.comparison.items)
const stateLike = useSelector(state=>state.like.items)

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
        setCompared('/imagesHTML/icons/done.png')
    } 
    
},[])


useEffect(()=>{
    const elementInlike = stateLike.find(el=> el._id== props.itemData._id)
    if (elementInlike){
        setLiked('/imagesHTML/icons/starHovered.png')
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
    const url=e.currentTarget.src
    const index = url.indexOf('/imagesHTML')
    const trimmedStart= e.currentTarget.src.slice(0,index)
    const trimmedEnd = e.currentTarget.src.slice(index)
    console.log(trimmedStart)
    console.log(trimmedEnd)
    if(trimmedEnd == '/imagesHTML/icons/done.png'){
        dispatch(compareActions.removeFromCompare(props.itemData))
        e.currentTarget.src = '/imagesHTML/icons/compare.png'
        console.log('first', e.currentTarget.src)
    } else if(trimmedEnd == '/imagesHTML/icons/compare.png'){
        dispatch(compareActions.addToCompare(props.itemData))
        e.currentTarget.src = '/imagesHTML/icons/done.png'
        console.log('second', e.currentTarget.src)
    }  
}

function addToLiked(e){
    console.log(e.currentTarget.src)
    const url=e.currentTarget.src
    const index = url.indexOf('/imagesHTML')
    const trimmedStart= e.currentTarget.src.slice(0,index)
    const trimmedEnd = e.currentTarget.src.slice(index)
    console.log(trimmedStart)
    console.log(trimmedEnd)
    if(trimmedEnd == '/imagesHTML/icons/starHovered.png'){
        dispatch(likeActions.removeFromLiked(props.itemData))
        e.currentTarget.src = '/imagesHTML/icons/star.png'
        console.log('first', e.currentTarget.src)
    } else if(trimmedEnd == '/imagesHTML/icons/star.png'){
        dispatch(likeActions.addToLiked(props.itemData))
        e.currentTarget.src = '/imagesHTML/icons/starHovered.png'
        console.log('second', e.currentTarget.src)
    }  

}


    return (
        
    <li className='card-frame news-goods'>
        <div className='product-info'>
          <div className='product-img-wrapper'><img src={`https://shop-apps.onrender.com/uploadedIMG/${props.itemData.img1[0].filename}`} className='product-img' alt='user'/></div>
          <p className='model'>{props.itemData.model}</p>
          <p className='brand'>{props.itemData.brand}</p>
          <div className='card-block-nav'>
              <img src={compared} onClick={addToCompare} alt='compare' />
              <img src={liked} alt='star' onClick={addToLiked} />
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