import Footer from '../Footer'

function Contacts(){
    return (
        <>
             <div className="catalog-content-container">
                <main>
                    <h1 className="registration catalog-h1"><span>КОНТАКТИ</span> МАГАЗИНУ</h1>

                    <p className="basic-text">Отримати детальну консультацію можна завітавши до нашого магазину або по телефону. Ми завжди на зв'язку та готові допомогти у виборі фотокамер та лінз!</p>
                    <div className='cont-wrapp'>
                        <div className="phone-block">
                            <span>Телефони:</span>
                            <p>096 321 56 54</p>
                            <p>096 321 56 53</p>
                        </div>
                        <div className="phone-block">
                            <span>Адреса:</span>
                            <p>м.Київ, вул.Оени Теліги, б. 13</p>
                            
                        </div>
                    </div>

                    <img className="kyivMap" src='imagesHTML/icons/map.jpeg' />
                </main>
                
            </div>
            <Footer></Footer>
        </>
    )
}

export default Contacts     