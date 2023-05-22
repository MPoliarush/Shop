import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import {compareActions,orderActions} from '../../store/store'


function ComparedItem(props){
const [added,setAdded] = useState("В кошик")
const stateBasket = useSelector(state=>state.basketOrders.goods)
const dispatch = useDispatch()
console.log(props.data)



useEffect(()=>{
    const elementInBasket = stateBasket.find(el=> el._id== props.data._id)
    if (elementInBasket){
        setAdded('Додано!')
    } 
    
},[])

function deleteFromBasket(e){
    dispatch(compareActions.removeFromCompare(props.data))
}

function addToBasket(){
    if(added=='В кошик'){
        dispatch(orderActions.addGood(props.data))
        setAdded('Додано!')
    } else {
        dispatch(orderActions.removeGood(props.data))
        setAdded('В кошик')
    }
  
}


    return(
        <>
        {props.data.typeGoods=='Фотокамера' ?
            <div className='labels column'>
                <div className="comparedFeature photoBlock">
                    <img className="compareImg" src={`https://shop-apps.onrender.com/uploadedIMG/${props.data.img1[0].filename}`} />
                    <img className="delete-compar-btn" src="/imagesHTML/icons/delete.png" onClick={deleteFromBasket} />
                </div>
                
                <p className='comparedFeature'>{props.data.brand}</p>
                <p className='comparedFeature'>{props.data.model}</p>
                <p className='comparedFeature'>{props.data.imgdepth}</p>
                <p className='comparedFeature'>{props.data.type}</p>
                <p className='comparedFeature'>{props.data.matrix}</p>
                <p className='comparedFeature'>{props.data.mpx}</p>
                <p className='comparedFeature'>{props.data.video}</p>
                <p className='comparedFeature'>{props.data.exposition}</p>
                <p className='comparedFeature'>{props.data.width}</p>
                <p className='comparedFeature'>{props.data.height}</p>
                <p className='comparedFeature'>{props.data.depth}</p>
                <p className='comparedFeature'>{props.data.weight}</p>
                <p className='comparedFeature'>{props.data.work_price}</p>
                <p className='comparedFeature'>{props.data.weekend_price}</p>
                <p className='comparedFeature'>{props.data.week_price}</p>
                <p className='comparedFeature'>{props.data.month_price}</p>
                <button className='add-to-basket' onClick={addToBasket}>{added}</button>
            </div>
        : <div className='labels column'>
                <div className="comparedFeature photoBlock">
                    <img className="compareImg" src={`https://shop-apps.onrender.com/uploadedIMG/${props.data.img1[0].filename}`} />
                    <img className="delete-compar-btn" src="/imagesHTML/icons/delete.png" onClick={deleteFromBasket} />
                </div>
                
                
                <p className='comparedFeature'>{props.data.brand}</p>
                <p className='comparedFeature'>{props.data.model}</p>
                <p className='comparedFeature'>{props.data.min_focus_length}</p>
                <p className='comparedFeature'>{props.data.diametr}</p>
                <p className='comparedFeature'>{props.data.linceLength}</p>
                <p className='comparedFeature'>{props.data.linseType}</p>
                <p className='comparedFeature'>{props.data.work_price}</p>
                <p className='comparedFeature'>{props.data.weekend_price}</p>
                <p className='comparedFeature'>{props.data.week_price}</p>
                <p className='comparedFeature'>{props.data.month_price}</p>
                <button className='add-to-basket' onClick={addToBasket}>{added}</button>
            </div>


        }
        </>
    )
}

export default ComparedItem