import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import {orderActions,compareActions} from '../../store/store'
import Footer from '../Footer';
import ComparedItem from "./ComparedItem";




function Comparison(props){

    const stateComparison = useSelector(state=> state.comparison.items)
    // console.log(stateComparison)
    const dispatch =useDispatch()

    const [goodsSet,setGoodsSet] = useState([])
    const [goodsQuantity,setGoodsQuantity] = useState({})

    const[active,setActive] = useState('')

    useEffect(()=>{

        let goodsSet=[]
        goodsSet = stateComparison.map(item=>{
            return item.typeGoods
        })
        const types = [...new Set(goodsSet)]
        // console.log(types)
        setGoodsSet(types)

        let typesNumber = {}

        for (const item of types){
            typesNumber[item] = []
            for (const good of stateComparison){
                if(good.typeGoods==item){
                    typesNumber[item].push(good)
                }
            }
        }

        setGoodsQuantity(typesNumber)
        // console.log(typesNumber)

       if (stateComparison.length==0){
        return
       }


   
        

    },[active,stateComparison])



    let photoLabels= []
    let linseLabels= []

    function activeHandler(e){
       
        // console.log(e)
        if(e.target.outerText=='Фотокамера'){
            setActive(e.target.innerText)
            console.log(Object.keys(goodsQuantity.Фотокамера[0]))
            
        } else {
            setActive(e.target.innerText)
            console.log(Object.keys(goodsQuantity.Лінза[0]))
           
        }
        
        console.log(photoLabels)
    }

    console.log(goodsQuantity)
    console.log(active)
    console.log(goodsSet)

   



    return <>
         <main>
            <div className="catalog-content-container">
            <h1 className="registration catalog-h1"><span>ПОРІВНЯННЯ</span> ТОВАРІВ</h1>
            <p className="basic-text">Не впевнені який товар підходить найкраще саме Вам?
            Для порівняння необхідно вибрати групу товарів і зробіть свій вибір.</p>
                <div className="compare-goods">
                
                {goodsSet.length==0 ? <p>Немає товарів для порівняння</p>  : ''}
                    {
                        goodsSet.map(good=>{
                            {/* console.log(active, good) */}
                            return <> <span className= {active === good ? "compare-goods-span active" : "compare-goods-span"} onClick={activeHandler}>{good}</span> <span className="num">( {goodsQuantity[good].length} )</span> </>
                        })
                    }
                </div>

           

            { 
                active == 'Фотокамера' && stateComparison.length>0 ?
                    <div className="comp-wrapp">
                        <div className="labels lables">
                            <div className="sticky">
                                <p className="photoBlock comparedFeature">Фото</p>
                                <p className='comparedFeature'>Бренд</p>
                                <p className='comparedFeature'>Модель</p>
                            </div>
                            <p className='comparedFeature'>Глибина зображення</p>
                            <p className='comparedFeature'>Тип</p>
                            <p className='comparedFeature'>Матриця</p>
                            <p className='comparedFeature'>Роздільна здатність</p>
                            <p className='comparedFeature'>Відео</p>
                            <p className='comparedFeature'>Експокорекція</p>
                            <p className='comparedFeature'>Ширина, мм</p>
                            <p className='comparedFeature'>Висота, мм</p>
                            <p className='comparedFeature'>Глибина, мм</p>
                            <p className='comparedFeature'>Вага, г</p>
                            <p className='comparedFeature'>Вартість будній, грн</p>
                            <p className='comparedFeature'>Вартість вихідний, грн</p>
                            <p className='comparedFeature'>Вартість тиждень, грн</p>
                            <p className='comparedFeature'>Вартість місяць, грн</p>
                            <p></p>
                        </div>

                        <div className="data">
                            { goodsQuantity.Фотокамера.map( item=>{
                                    return <ComparedItem data={item}></ComparedItem>
                                })
                            }
                        </div>

                    </div>
                : active == 'Лінза' && stateComparison.length>0 ?
                    <div className="comp-wrapp">
                        <div className="labels lables">
                            <div className="sticky">
                                <p className="photoBlock comparedFeature">Фото</p>
                                <p className='comparedFeature'>Бренд</p>
                                <p className='comparedFeature'>Модель</p>
                            </div>
                            <p className='comparedFeature'>Найменша фокусна відстань, мм</p>
                            <p className='comparedFeature'>Діаметр, мм</p>
                            <p className='comparedFeature'>Довжина, мм</p>
                            <p className='comparedFeature'>Тип об'єктива</p>
                            <p className='comparedFeature'>Вартість будній, грн</p>
                            <p className='comparedFeature'>Вартість вихідний, грн</p>
                            <p className='comparedFeature'>Вартість тиждень, грн</p>
                            <p className='comparedFeature'>Вартість місяць, грн</p>

                        </div>

                        <div className="data">
                            { goodsQuantity.Лінза.map( item=>{
                                    return <ComparedItem data={item}></ComparedItem>
                                })
                            }
                        </div>
                        
                    </div>
                : ''
            }


            </div>

        </main>
        <Footer></Footer>
    </>
}

export default Comparison