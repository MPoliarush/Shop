import { useState,useEffect } from 'react'
import Cart from '../Cart'
import Footer from '../Footer';
import axios from "axios";


function CatalogCamera(){
    const [rangeVal, setRangeValue]=useState('300')
    const [fetchedData, setFetchedData] = useState([])
    const [initalData, setinitaiData]=useState([])
    const [selectionMode, setSelectionMode] = useState('');
    const [filterList,setFilterList] = useState({
        brand:[],
        type:[],
        imgdepth:[],
        video:[],
        maxPrice:['300'],
        availability:[]
    })

   

async function getInfo () {
    try{
        const response = await axios("https://shop-apps.onrender.com/cameras")
        console.log(response.data)
        const sortedUp = response.data.sort((a,b)=>{
            return a.work_price-b.work_price
        })
        setFetchedData(sortedUp)
        setinitaiData(sortedUp)
    }catch(e){
        console.log(e.response)
    }
}
    

let uniqueChars  
let uniqueBrands 
let uniqueType
uniqueChars = initalData.map(item=>{
    return item.imgdepth
})
uniqueBrands = initalData.map(item=>{
    return item.brand
})
uniqueType = initalData.map(item=>{
    return item.type
})
const single = [...new Set(uniqueChars)]
const singleBrand = [...new Set(uniqueBrands)]
const singleType = [...new Set(uniqueType)]


useEffect(()=>{  
    getInfo()
},[])



function rangeValue(event){
    console.log(event.target.value)
    setRangeValue(event.target.value)
}


function selctions(event){
    setSelectionMode(event.target.value)
}

useEffect(()=>{

    if (selectionMode == "up"){
        const sortedUp = [...fetchedData].sort((a,b)=>{
            return a.work_price-b.work_price
        })
        console.log(selectionMode)
        setFetchedData(sortedUp)
        
    } else if (selectionMode == "down"){
        const sortedUp = [...fetchedData].sort((a,b)=>{
            return b.work_price-a.work_price
        })
        console.log(selectionMode)
        setFetchedData(sortedUp)  
    }

   
},[selectionMode])

useEffect(()=>{
    window.scrollTo(0, 0)
},[])


function inputHandler(e){
   
    if(e.target.name =='brand'){
       
        let brandList=[...filterList.brand]
        
        if (e.target.checked){
            
            brandList = [...filterList.brand, e.target.value]
           
        } else{
          
            brandList.splice(filterList.brand.indexOf(e.target.value),1)
            
        }
        setFilterList({...filterList,
            brand:brandList
        })
    }


    if (e.target.name =='type'){
        let typeList=[...filterList.type]
        
        if (e.target.checked){
           
            typeList = [...filterList.type, e.target.value]
           
        } else{
           
            typeList.splice(filterList.type.indexOf(e.target.value),1)
        }
        setFilterList({...filterList,
            type:typeList
        })
    
    }


    if (e.target.name =='imgdepth'){
        let imgdepthList=[...filterList.imgdepth]
        
        if (e.target.checked){
            
            imgdepthList = [...filterList.imgdepth, e.target.value]
           
        } else{
            
            imgdepthList.splice(filterList.imgdepth.indexOf(e.target.value),1)
        }
        setFilterList({...filterList,
            imgdepth:imgdepthList
        })
    }

    if (e.target.name =='video'){
        let videoList=[...filterList.video]
        
        if (e.target.checked){
           
            videoList = [...filterList.video, e.target.value]
           
        } else{
           
            videoList.splice(filterList.video.indexOf(e.target.value),1)
        }
        setFilterList({...filterList,
            video:videoList
        })
    }

    if (e.target.name =='maxPrice'){
        setFilterList({...filterList,
            maxPrice:[e.target.value.toString()]
        })
    }

    if (e.target.name =='availability'){
        let availabilityList=[...filterList.availability]
        
        if (e.target.checked){
            
            availabilityList = [...filterList.availability, e.target.value]
           
        } else{
            
            availabilityList.splice(filterList.availability.indexOf(e.target.value),1)
        }
        setFilterList({...filterList,
            availability:availabilityList
        })
    }
    console.log(filterList)
}



async function filterHandler(e){
    e.preventDefault()
    console.log(filterList)

    let inputData = filterList
    fetch('https://shop-apps.onrender.com/cameras-filters',{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
            
        },
        body:JSON.stringify(inputData)
        }
    ).then(res=>res.json()).then(data=>{
        console.log(data)
        let sortedData = data.sort((a,b)=>{
        return a.work_price-b.work_price
        })
        setFetchedData(sortedData)
    })

}

function filterClearHandler(e){
    setFilterList({
        brand:[],
        type:[],
        imgdepth:[],
        video:[],
        maxPrice:['300'],
        availability:[]
    })
}

   

return (
        <>
       
        <main>
        <div className="catalog-content-container">
            <h1 className="catalog-h1">ВСІ ФОТОКАМЕРИ</h1>
            <div>
                <h3>Знайдено {fetchedData.length} товарів </h3>
                <p className="basic-text">В нашому магазині представлений широкий вибір фотокамер для оренди як для професіонального, так і сімейного вискористання. Зафіксуйте найцінніші моменти свого життя у повних барвах.</p>
                <select id='price-selection' onChange={selctions} sortValue={selctions}> 
                    <option value='up'> За зростанням ціни</option>
                    <option value='down'> За спаданням ціни</option>
                </select>
                <div className='big-goods-container'>
                    <div className='goods-container'>
                        <ul className='goods-container-ul'>
                           
                            {fetchedData.map(item=>{
                                return (
                                    <Cart key={Math.random()} itemData={item} ></Cart>
                                )
                            })
                            }

                        </ul>
                        
                    </div>
                    <div className='side-bar'>
                        <form className='select'>
                        <div className='select-block' onChange={inputHandler}>
                                <p>Бренд</p>
                                <ul>
                                    {singleBrand.map(item=>{
                                        return (
                                            <div><input type='checkbox' id={item} name='brand' value={item}/><label htmlFor={item}>{item}</label></div>
                                            )
                                        })
                                    }
                                </ul>
                                
                                
                            </div>
                            <div className='select-block' onChange={inputHandler}>
                                <p>Тип</p>
                                <ul>
                                    {singleType.map(item=>{
                                        return (
                                            <div><input type='checkbox' id={item} name='type' value={item}/><label htmlFor={item}>{item}</label></div>
                                            )
                                        })
                                    }
                                </ul>
                               
                            </div>
                            <div className='select-block' onChange={inputHandler}>
                                <p>Глибина зображення</p>
                                <ul>
                                    {single.map(item=>{
                                        
                                        return (
                                            <div><input type='checkbox' id={item} name='imgdepth' value={item}/><label htmlFor={item}>{item}</label></div>
                                            )
                                        })
                                    }
                                </ul>
                                
                                
                            </div>
                            <div className='select-block' onChange={inputHandler}>
                                <p>Відео</p>
                                <div><input type='checkbox' id='FullHD' name='video' value='FullHD'/><label htmlFor='FullHD'>FullHD</label></div>
                                <div><input type='checkbox' id='3K' name='video' value='3K'/><label htmlFor='3К'>3K</label></div>
                                <div><input type='checkbox' id='4K' name='video' value='4K'/><label htmlFor='4К'>4K</label></div>
                                
                            </div>
                            <div className='select-block' onChange={inputHandler}>
                                <p>Ціна за день, грн</p>
                                <div className='range'><input type="range" name='maxPrice' min="1" max="300" id="myRange" value={rangeVal} onChange={rangeValue}/><label htmlFor='FullHD'>{rangeVal}</label></div>
                                
                                
                            </div>
                            <div className='select-block' onChange={inputHandler}>
                                <p>Наявність товару</p>
                                <div><input type='checkbox' id='availab' name='availability' value='true'/><label htmlFor='availab'>В наявності</label></div>
                                <div><input type='checkbox' id='availab2' name='availability' value='false'/><label htmlFor='availab2'>Не в наявності</label></div>
                            </div>
                            <button className='apply-btn' onClick={filterHandler}>Застосувати</button>
                            <button className='apply-btn' onClick={filterClearHandler}>Очистити</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
        </main>
        <Footer></Footer>
        </>
    )
}

export default CatalogCamera