import { useState,useEffect } from "react"
import {Link} from 'react-router-dom'

import CatalogCamera from '../Catalogs/CatalogCamera';
import CatalogLinse from '../Catalogs/CatalogLinse';
import Cart from '../Cart';
import Footer from '../Footer';

import axios from "axios";



function News(){
const [fetchedData, setFetchedData] = useState([])


async function getInfo () {
    try{
        const response = await axios("https://shop-apps.onrender.com/cameras")
        console.log(response.data)
        const receivedData = response.data.slice(0,2)
        setFetchedData(receivedData)
        
    }catch(e){
        console.log(e.response)
    }
}
    
useEffect(()=>{  
    getInfo()
    
},[])


return(
    <>
        <div className="catalog-content-container">
            <main>
                <h1 className="registration catalog-h1"><span>НОВИНИ</span> КОМПАНІЇ</h1>

                <div className="news-container">
                    <div className="left-bar">
                        <div className="news-card">
                            <img src="/imagesHTML/photo4.png" />
                            <span>6 червня 2022</span>
                            <h5>ВИБИРАЄМО SD-КАРТИ ДЛЯ ЗЙОМКИ</h5>
                            <p>Раз в рік серед користувачів сайту проводять запит, який дозволяє скласти портрет середньостатистичного сайту користувача, у багатьох співпадаючих з ним чином.</p>
                        </div>
                        <div className="news-card">
                            <img src="/imagesHTML/photo5.png" />
                            <span>6 червня 2022</span>
                            <h5>ПОДКАСТ: ОБМАН, ФІЛЬМ І ТД,</h5>
                            <p>Раз в рік серед користувачів сайту проводять запит, який дозволяє скласти портрет середньостатистичного сайту користувача, у багатьох співпадаючих з ним чином.</p>
                        </div>
                    </div>
                    <div className="side">
                        <ul>
                            <li><Link to='/cameras'>ФОТОКАМЕРИ</Link></li>
                            <li><Link to='/linses'>ЛІНЗИ</Link></li>
                        </ul>
                        <h3>Популярні товари</h3>
                        <div className="news">
                            {fetchedData.map(good=>{
                                return <Cart itemData={good}></Cart>
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
            <Footer></Footer>
    </>
)
}

export default News