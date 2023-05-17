


function Footer(){
    return <>
   <footer>
        <div className="footer">

        <div className="footer-wrap">
            <div className="content-container">
                <div className='subscribe'>
                <p>Підпишіться на новини та акції</p>
                    <div className="subscr-input">
                        <input type='text' placeholder="Введіть пошту"/>
                        <label >ПІДПИСАТИСЬ</label>
                    </div>
                </div>
            </div>
        </div>
        <div className="content-container">
            <ul className='ul-main-container'>
                <li className='li-main'>
                    <img src={'/imagesHTML/icons/logo.png'} alt='logo'/>
                    <p className='text-li'>Найзручніший в Києві сервіс оренди фотообладнання.</p>
                    <p>2015-2023</p>
                </li>

                <li>
                    <ul>
                        <li className='li-main'>
                            Компанія
                        </li>
                        <li className='text-li'>
                            Новини
                        </li>
                        <li className='text-li'>
                            Політика конфіденційності
                        </li>
                    </ul>
                </li>

                <li>
                    <ul>
                        <li className='li-main'>
                            Клієнтам
                        </li>
                        <li className='text-li'>
                            Доставка
                        </li>
                        <li className='text-li'>
                            Оплата
                        </li>
                    </ul>
                </li>

                <li>
                    <p className='li-main'>Контакти</p>
                    <p className='text-li'>м.Київ, вул. Олени Теліги, 23</p>
                </li>
            </ul>
        </div>
        </div>
    </footer> 
    </>
}

export default Footer