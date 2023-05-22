import { useState, useEffect,useRef } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";


import Cart from './Cart'
import Footer from './Footer';




function FirstPage(props){

const [fetchedData, setFetchedData] = useState([])
const [loading, setLoading] = useState(false);


useEffect(() => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
}, []);


async function getInfo () {
  setLoading(true);
  setInterval(()=>{

    setLoading(false);
   
  },2000)

 
    try{
        const response = await axios("https://shop-apps.onrender.com/products")
        setFetchedData(response.data)
        
    }catch(e){
        console.log(e.response)
    }
  
}
    
useEffect(()=>{  
    getInfo()  
  
},[])




console.log(loading)



    return (
      <>
      {loading ? 
        <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
       :   (  
          <>
           <main>
            <div className='first-page'>
              <img src={process.env.PUBLIC_URL + '/imagesHTML/girl.jpg'}  className='first-page-img' alt='girl' />
              <div className='content-container'>
                <div className='first-page-text-container'>
                  <img src={process.env.PUBLIC_URL + '/imagesHTML/icons/bg.png'} alt='user'/>
                  <p><span className='first-page-text-green'>ОРЕНДА</span> ФОТО </p>
                  <span>І ВІДЕО</span>
                  <span>ОБЛАДНАННЯ</span>
                </div>
              </div>
            </div>
            <div className='first-page-row'>
              <div className='content-container row'>
                  <div className='first-page-row-block'>
                    <img src={process.env.PUBLIC_URL + '/imagesHTML/icons/list.png'} alt='list'/>
                    <p>Найбільший вибір техніки</p>
                  </div>
                  <div className='first-page-row-block'>
                    <img src={process.env.PUBLIC_URL + '/imagesHTML/icons/time.png'} alt='time'/>
                    <p>Швидке оформлення замовлення</p>
                  </div>
                  <div className='first-page-row-block'>
                    <img src={process.env.PUBLIC_URL + '/imagesHTML/icons/placeholder.png'} alt='placeholder'/>
                    <p>Можливість забрати замовлення в пункті видачі</p>
                  </div>
                  <div className='first-page-row-block'>
                    <img src={process.env.PUBLIC_URL + '/imagesHTML/icons/product.png'} alt='product'/>
                    <p>Доставка в будь-яку точку міста</p>
                  </div>
                  <div className='first-page-row-block'>
                    <img src={process.env.PUBLIC_URL + '/imagesHTML/icons/shopping.png'} alt='shopping'/>
                    <p>Оплата картою або готівкою</p>
                  </div>
                </div>
            </div>

            <div className='second-page'>
              <div className='content-container-second-page'>
                  <h3 className='second-page-header'><span>ПОПУЛЯРНІ </span>ТОВАРИ</h3>
                  {/* <img className='arrow-right' src={process.env.PUBLIC_URL + '/imagesHTML/icons/left.png'} alt='user'/>
                  <img className='arrow-left' src={process.env.PUBLIC_URL + '/imagesHTML/icons/right.png'} alt='user'/> */}
                  <div className='slider-visible-wrapper'>
                      <ul className='slider-string'>

                      {fetchedData.map( item=>{
                        return  <Cart key= {Math.random()} itemData={item}></Cart>
                        })
                      }
                      </ul>
                    
                  </div>
              </div>
            </div>

            <div className='third-page content-container'>
              <div className='third-page-box'>
                <h3>ВИ <span>ШУКАЄТЕ</span> ЩОСЬ КОНКРЕТНЕ?</h3>
                <p>Проект Fotoprokat24 є агрегатором пропозицій всіх фотопрокатів міста та служить для Вашої зручності. Виберіть потрібну категорію, або почніть пошук за назвою. Оформивши замовлення, Ви зможете забрати його з Пункту Видачі або замовити доставку в будь-яку точку міста.</p>
                <div className='third-page-btns'>
                  <Link to='/cameras'><button className='thirt-page-button'>ПЕРЕЙТИ В КАТАЛОГ ФОТОКАМЕР</button></Link>
                  <Link to='/linses'><button className='thirt-page-button'>ПЕРЕЙТИ В КАТАЛОГ ЛІНЗ</button></Link>
                </div>
              </div>
            </div>

            <div className='images-page content-container'>
              <div className='image-box'>
                <img src={process.env.PUBLIC_URL + '/imagesHTML/1.jpg'} alt='user'/>
                <p>Фотокамери Canon від 200 UAH</p>
              </div>
              <div className='image-box'>
                <img src={process.env.PUBLIC_URL + '/imagesHTML/2.jpg'} alt='user'/>
                <p>Об'єктиви від 200 UAH</p>
              </div>
              <div className='image-box'>
                <img src={process.env.PUBLIC_URL + '/imagesHTML/3.jpg'} alt='user'/>
                <p>Товар тижня від 200 UAH</p>
              </div>
              <div className='image-box'>
                <img src={process.env.PUBLIC_URL + '/imagesHTML/4.jpg'} alt='user'/>
                <p>Товар тижня від 200 UAH</p>
              </div>
              <div className='image-box'>
                <img src={process.env.PUBLIC_URL + '/imagesHTML/5.jpg'} alt='user'/>
                <p>Фотокамери тижня від 200 UAH</p>
              </div>
            </div>

            <div className='last-page'>
              <img src={process.env.PUBLIC_URL + '/imagesHTML/map.png'}/>
              <div className='content-container'>
                <div className='last-page-content'>
                  <div className='stote-data'>
                    <p>Фотопрокат Зум</p>
                    <span>вул.О.Теліги,6</span>
                    <a href=''>www.google.com</a>
                  </div>
                  <div className='stote-data'>
                    <p>Фотопрокат Зум</p>
                    <span>вул.О.Теліги,6</span>
                    <a href=''>www.google.com</a>
                  </div>
                  <div className='stote-data'>
                    <p>Фотопрокат Зум</p>
                    <span>вул.О.Теліги,6</span>
                    <a href=''>www.google.com</a>
                  </div>
                </div>
              </div>
            </div>


          </main>

           <Footer></Footer>
          </>
          )
      }
      </>
    )
}

export default FirstPage