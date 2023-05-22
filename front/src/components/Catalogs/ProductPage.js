import {useState, useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux"
import {orderActions,compareActions, likeActions} from '../../store/store'
import axios from "axios";
import Cart from '../Cart';
import Footer from '../Footer';

function ProductPage(){
    const [input,setInput]=useState({
        typeGoods:null,
        brand:null,
        model:null,
        imgdepth:null,
        type:null,
        matrix:null,
        mpx:null,
        video:null,
        exposition:null,
        width:null,
        height:null,
        depth:null,
        weight:null,
        work_price:null,
        weekend_price:null,
        week_price:null,
        month_price:null,
        min_focus_length:null,
        diametr:null,
        linseType:null,
        linceLength:null,
        availability:'false',
        description:null
})
    const [imgArray,setImgArray] = useState([])
    const [img,setImg] = useState([])
    const [activeInputs,setActiveInputs] = useState({
        descr:true,
        details:false
    })
    const [fetchedData, setFetchedData] = useState([])
    const [fetchedDataFiltered, setFetchedDataFiltered] = useState([])
    const [added,setAdded] = useState("В кошик")
    const [compared,setCompared] = useState('/imagesHTML/icons/compare.png')
    const [liked,setLiked] = useState('/imagesHTML/icons/star.png')
    const params = useParams()
    const dispatch = useDispatch()
    const stateBasket = useSelector(state=>state.basketOrders.goods)
    const stateCompare = useSelector(state=>state.comparison.items)
    const stateLike = useSelector(state=>state.like.items)



async function getInfo () {
    try{
        const response = await axios("https://shop-apps.onrender.com/products")
        
        setFetchedData(response.data)
        let filtered = response.data.filter(item=>{
            return item._id != params.id
        })
        setFetchedDataFiltered(filtered)
    }catch(e){
        console.log(e.response)
    }
    }
    
useEffect(()=>{  
    getInfo()
    
},[])




    async function getCartData(){
        console.log(params.id)
        try{
            const response = await axios(`https://shop-apps.onrender.com/products/${params.id}`)
           
           
            setInput(response.data)
            setImgArray(response.data.img1)
            setImg(response.data.img1[0].filename)
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=> {
        getCartData()
        console.log('logged')
        window.scrollTo(0, 0)
    }, [params.id])



    function activeHandler(e){
        e.preventDefault()
        if(e.target.value=='Опис'){
            setActiveInputs({
                descr:true,
                details:false})
        } else {
            setActiveInputs({
                descr:false,
                details:true})
        }

    }


function replacePhoto(e) {
    console.log(img)
    console.log(e.currentTarget.name)
    setImg(e.currentTarget.name)
}


let camera = (<>
    <div className='details-block'>
        <span>Глибина</span><span>{input.imgdepth}</span>
    </div>
    <div className='details-block'>
        <span>Тип</span><span>{input.type}</span>
    </div>
    <div className='details-block'>
        <span>Матриця</span><span>{input.matrix}</span>
    </div>
    <div className='details-block'>
        <span>Мпкс</span><span>{input.mpx}</span>
    </div>
    <div className='details-block'>
        <span>Відео</span><span>{input.video}</span>
    </div>
    <div className='details-block'>
        <span>Експокорекція</span><span>{input.exposition}</span>
    </div>
    <div className='details-block'>
        <span>Ширина, мм</span><span>{input.width}</span>
    </div>
    <div className='details-block'>
        <span>Висота, мм</span><span>{input.height}</span>
    </div>
    <div className='details-block'>
        <span>Вага, г</span><span>{input.weight}</span>
    </div>
</>
)

let linsa=(<>
    <div className='details-block'>
        <span>Найменша фокусна відстань, мм</span><span>{input.min_focus_length}</span>
    </div>
    <div className='details-block'>
        <span>Діаметр, мм</span><span>{input.diametr}</span>
    </div>
    <div className='details-block'>
        <span>Тип</span><span>{input.linceLength}</span>
    </div>
    <div className='details-block'>
        <span>Довжина, мм</span><span>{input.linceLength}</span>
    </div>
</>
)



useEffect(()=>{
    const elementInBasket = stateBasket.find(el=> el._id== input._id)
    console.log(stateBasket)
    console.log(elementInBasket)
    if (elementInBasket){
        setAdded('Додано!')
    } 
},[input])



function addToBasket(){
   
    if(added=='В кошик'){
        console.log('В кошик')
        dispatch(orderActions.addGood(input))
        setAdded('Додано!')
    } else {
        console.log('Додано!')
        dispatch(orderActions.removeGood(input))
        setAdded('В кошик')
    }
}


useEffect(()=>{
    const elementInCompare= stateCompare.find(el=> el._id== input._id)
    console.log(stateCompare)
    console.log(elementInCompare)
    if (elementInCompare){
        setCompared('/imagesHTML/icons/done.png')
    } else {
        setCompared('/imagesHTML/icons/compare.png')
    }

},[input])


useEffect(()=>{
    const elementInLike= stateLike.find(el=> el._id== input._id)
    console.log(stateLike)
    console.log(elementInLike)
    if (elementInLike){
        setLiked('/imagesHTML/icons/starHovered.png')
    } else {
        setLiked('/imagesHTML/icons/star.png')
    }

    console.log(liked)

},[input])



function addToCompare(e){
  
    // console.log(e.currentTarget.src)
    // if(e.currentTarget.src == '/imagesHTML/icons/done.png'){
    //     dispatch(compareActions.removeFromCompare(input))
    //     e.currentTarget.src = '/imagesHTML/icons/compare.png'
    //     console.log('first', e.currentTarget.src)
    // } else if(e.currentTarget.src !== '/imagesHTML/icons/done.png'){
    //     dispatch(compareActions.addToCompare(input))
    //     e.currentTarget.src = '/imagesHTML/icons/done.png'
    //     console.log('second', e.currentTarget.src)
    // } 

    console.log(e.currentTarget.src)
    const url=e.currentTarget.src
    const index = url.indexOf('/imagesHTML')
    const trimmedStart= e.currentTarget.src.slice(0,index)
    const trimmedEnd = e.currentTarget.src.slice(index)
    console.log(trimmedStart)
    console.log(trimmedEnd)
    if(trimmedEnd == '/imagesHTML/icons/done.png'){
        dispatch(compareActions.removeFromCompare(input))
        e.currentTarget.src = '/imagesHTML/icons/compare.png'
        console.log('first', e.currentTarget.src)
    } else if(trimmedEnd == '/imagesHTML/icons/compare.png'){
        dispatch(compareActions.addToCompare(input))
        e.currentTarget.src = '/imagesHTML/icons/done.png'
        console.log('second', e.currentTarget.src)
    }  
}




function addToLiked(e){
    console.log(e.currentTarget.src)
    console.log(e.currentTarget.src)
    const url=e.currentTarget.src
    const index = url.indexOf('/imagesHTML')
    const trimmedStart= e.currentTarget.src.slice(0,index)
    const trimmedEnd = e.currentTarget.src.slice(index)
    console.log(trimmedStart)
    console.log(trimmedEnd)
    if(trimmedEnd == '/imagesHTML/icons/starHovered.png'){
        dispatch(likeActions.removeFromLiked(input))
        e.currentTarget.src = '/imagesHTML/icons/star.png'
        console.log('first', e.currentTarget.src)
    } else if(trimmedEnd == '/imagesHTML/icons/star.png'){
        dispatch(likeActions.addToLiked(input))
        e.currentTarget.src = '/imagesHTML/icons/starHovered.png'
        console.log('second', e.currentTarget.src)
    }  
}


    return (
        <>
        <main>
            <div className="content-container">
                {input.typeGoods=="Фотокамера"? <h1 className='catalog-h1'>ФОТОКАМЕРИ</h1> : input.typeGoods=="Лінза"? <h1 className='catalog-h1'>ЛІНЗИ </h1>:'' }
                <div className="single">
                    <div className='cart-block'>
                        <div className='card-frame-single'>
                            <div className='small-comt-wrapper'>
                                {imgArray.map(img=>{
                                    return <div className='small-cont'><img className='small' onClick={replacePhoto} src={`https://shop-apps.onrender.com/uploadedIMG/${img.filename}`} name={img.filename} /></div> 
                                    })
                                }
                            </div>
                            <div className='product-info'>
                                <div className='product-img-wrapper-single'>
                            
                                <img className='product-img' src={`https://shop-apps.onrender.com/uploadedIMG/${img}`} />
                                
                            
                                </div>
                                <div className='block-nav'>
                                    <img src={compared} onClick={addToCompare} alt='compare'  />
                                    <img src={liked} alt='star' onClick={addToLiked} />
                                </div>
                            </div>
                        </div>
                        <button className='add-to-basket big' onClick={addToBasket}><img src= '/imagesHTML/icons/basket.png' alt='basket'/> {added} </button>
                    </div>
                    <div className='product-description'>
                        <div className='product-header'>
                            <h2>{input.brand}</h2>
                            <p>{input.model}</p>
                        </div>
                        <div className='availability'>{input.availability=='true'? <span className='greenStyle'>В навності</span> : <span className='gray'>Немає в навності</span>}</div>
                        <div className='content-wrapp'>
                        <div className='options'>
                            <button onClick={activeHandler} className={activeInputs.descr==true ? 'active' : 'passive'} value='Опис'>Опис</button>
                            <button onClick={activeHandler} className={activeInputs.details==true ? 'active' : 'passive'} value='Характеристики'>Характеристики</button>
                        </div>
                        <div className='content'>
                            <div>
                            
                            { activeInputs.descr==true && input.typeGoods=='Лінза'?
                                <p>{input.description} Опис відсутній</p>
                                : activeInputs.details==true && input.typeGoods=='Лінза' ? linsa  :''      
                            }
                            { activeInputs.descr==true && input.typeGoods=='Фотокамера'?
                                <p>{input.description}</p>
                                : activeInputs.details==true && input.typeGoods=='Фотокамера' ? camera  :''      
                            }
                            
                            </div>
                        </div>
                    </div>
                
                    </div>
                </div>

                <div className='recommended'>
                    <div>
                        <h3 className='second-page-header'><span>ПОПУЛЯРНІ </span>ТОВАРИ</h3>
                       
                        <div className='slider-visible-wrapper'>
                            <ul className='slider-string'>
                                {fetchedDataFiltered.map( item=>{
                                    return  <Cart key= {Math.random()} itemData={item}></Cart>
                                    })
                                }
                            </ul>
            
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </main>
        </>
    )
}

export default ProductPage