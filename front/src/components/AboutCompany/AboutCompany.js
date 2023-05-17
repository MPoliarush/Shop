import { useState,useEffect } from "react"
import {Link} from 'react-router-dom'

// import CatalogCamera from '../Catalogs/CatalogCamera';
// import CatalogLinse from '../Catalogs/CatalogLinse';
// import Cart from '../Cart';
import Footer from '../Footer';

import axios from "axios";



function AboutCompany(){

    return(
        <>
            <div className="catalog-content-container">
                <main>
                    <h1 className="registration catalog-h1"><span>ПРО</span> КОМПАНІЮ</h1>
                    <div className="about-cont">
                        <div className="left-blok-about">
                            <p className="basic-text about">
                            Сьогодні  'fotoprocat24' - це зручний сервіс, який дозволяє взяти в оренду фотоапарати, об'єктиви, відеокамери, світлові прилади, звукове обладнання, мікрофони, екранні камери GoPro та багато іншого.

                            Найпопулярніша фототехніка від відомих брендів: Canon, Sony, Nikon. Зеркальні та беззеркальні фотоапарати початкового та професійного рівня в прокат.

                            </p>

                        <p className="basic-text about">
                            Об'єктиви напрокат для різних завдань: широкоугольні, універсальні, фікси, стандартні, портретні, макро, телеоб'єктиви, фішай

                            Великий вибір техніки для відеозйомки від початкового до професійного рівня. Кінокамери Blackmagic, Sony, RED, ARRI. Оптика Carl Zeiss CP.2. Системи стабілізації зображення, звукове обладнання: петлички, мікрофони, рекордери. Освітлювальні прилади: KinoFlo, Filmgear, Dedolight, LED світильники.

                            Також ми здаємо в оренду фотовспышки, штативи, карти пам'яті, додаткові акумулятори та інші різні аксесуари. Техніку Ви можете взяти на прокат дуже легко та зручно для вас. Для цього Вам необхідно зв'язатися з нами і повідомити дату прокату, тип фототехніки та Ваше ім'я. Ми просимо для Вас вартість прокату фототехніки і ставимо бронь.

                            Дуже зручні умови прокату, система лояльності для постійних клієнтів</p>
                        </div>

                        <div className="map">
                            <img src="/imagesHTML/photo6.png" />
                        </div>
                    </div>
                </main>
               
            </div>
            <Footer></Footer>
        </>
    )
}

export default AboutCompany