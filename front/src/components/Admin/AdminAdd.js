import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import AdminCart from './AdminCart'
import axios from "axios";

function AdminAdd(){
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

    const [fetchedData, setFetchedData] = useState([])
    const [isSubmitted, setSubmitted] = useState(false)
    const [uploadedIMG, setUploadedIMG] = useState(null)
    const [typeGoods,setTypeGoods] = useState('none')
    const [productSaved,setProductSaved] = useState(false)


    async function getInfo () {
        try{
            const response = await axios("https://shop-apps.onrender.com/products")
            console.log(response.data)
            setFetchedData(response.data)
        }catch(e){
            console.log(e.response)
        }
        }
        
    useEffect(()=>{  
        getInfo()
        console.log(fetchedData)
    
    },[])
 
function inputHandler(event){
    // console.log(event.target.name)
    // console.log(event.target.value)
    if (event.target.name==='typeGoods'){
        setInput({...input,
            typeGoods:event.target.value
        })
        if (event.target.value=='Лінза'){
            setTypeGoods('Лінза')
        } else {
            setTypeGoods('Фотокамера')
        }

    } 

    if (event.target.name==='brand'){
        setInput({...input,
            brand:event.target.value
        })
    } 

    if (event.target.name==='model'){
        setInput({...input,
            model:event.target.value
        })
    } 

    if (event.target.name==='imgdepth'){
        setInput({...input,
            imgdepth:event.target.value
        })
    } 

    if (event.target.name==='type'){
        setInput({...input,
            type:event.target.value
        })
    } 

    if (event.target.name==='matrix'){
        setInput({...input,
            matrix:event.target.value
        })
    } 

    if (event.target.name==='mpx'){
        setInput({...input,
            mpx:event.target.value
        })
    } 

    if (event.target.name==='video'){
        setInput({...input,
            video:event.target.value
        })
    }

    if (event.target.name==='exposition'){
        setInput({...input,
            exposition:event.target.value
        })
    }

    if (event.target.name==='width'){
        setInput({...input,
            width:event.target.value
        })
    }

    if (event.target.name==='height'){
        setInput({...input,
            height:event.target.value
        })
    }

    if (event.target.name==='depth'){
        setInput({...input,
            depth:event.target.value
        })
    }

    if (event.target.name==='weight'){
        setInput({...input,
            weight:event.target.value
        })
    }

    if (event.target.name==='work_price'){
        setInput({...input,
            work_price:event.target.value
        })
    }

    if (event.target.name==='weekend_price'){
        setInput({...input,
            weekend_price:event.target.value
        })
    }

    if (event.target.name==='week_price'){
        setInput({...input,
            week_price:event.target.value
        })
    }

    if (event.target.name==='month_price'){
        setInput({...input,
            month_price:event.target.value
        })
    }

    if (event.target.name==='min_focus_length'){
        setInput({...input,
            min_focus_length:event.target.value
        })
    }

    if (event.target.name==='diametr'){
        setInput({...input,
            diametr:event.target.value
        })
    }

    if (event.target.name==='linseType'){
        setInput({...input,
            linseType:event.target.value
        })
    }

    if (event.target.name==='linceLength'){
        setInput({...input,
            linceLength:event.target.value
        })
    }


    if (event.target.name==='availability'){
        setInput({...input,
            availability:event.target.value.toString()
        })
    } 

    if (event.target.name==='description'){
        setInput({...input,
            description:event.target.value.toString()
        })
    } 
   
}

// console.log(input)



async function submitHandler(event){
    event.preventDefault()
    console.log('submitted')
    setSubmitted(true)
    setProductSaved(true)
    
    let formData = new FormData()
    
    for (let i=0; i<uploadedIMG.length;i++){
        formData.append('imgS', uploadedIMG[i])
    }
    
    formData.append('input', JSON.stringify(input))
    const config = {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    }
    const response = await axios.post('https://shop-apps.onrender.com/admin', formData, config )
    console.log(response)

   

    const clearedData={
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
    }

    setInput(clearedData)

}
    
function handleChange(e){
    setUploadedIMG(e.target.files)
}


    return (
        <div className='content-container-admin'>
        <h1>ПАНЕЛЬ АДМІНІСТРАТОРА</h1>
            <div className='addform'>

                <p><Link to='/admin'>Назад до товарів</Link></p>

                {productSaved==false ?<>
                <h3>Форма додавання товару на сайт</h3>
                <form className='admin-block' onSubmit={(e)=>e.preventDefault()}>
                    <div className='admin-block-option' onChange={inputHandler}>
                        <p>Вид товару</p>
                        <div className='input-div'><input type='radio' id='Фотокамера' name='typeGoods' value='Фотокамера' /><label htmlFor='Фотокамера'>Фотокамера</label></div>
                        <div className='input-div'><input type='radio' id='Лінза' name='typeGoods' value='Лінза'/><label htmlFor='Лінза'>Лінза</label></div>
                    </div>
                    <div className='admin-block-option' onChange={inputHandler}>
                        <p>Марка</p>
                        <div className='input-div'><input type='text' size='20' name='brand' /></div>
                    </div>
                    <div className='admin-block-option' onChange={inputHandler}>
                        <p>Модель</p>
                        <div className='input-div'><input type='text'  name='model'/></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Глибина зображення</p>
                        <div className='input-div'><input type='text'  name='imgdepth'/></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Тип зображення</p>
                        <div className='input-div'><input type='radio' id='type1' name='type' value='Дзеркальна'/><label htmlFor='type1'>Дзеркальна</label></div>
                        <div className='input-div'><input type='radio' id='type2' name='type' value='Компактна'/><label htmlFor='type2'>Компактна</label></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Матриця</p>
                        <div className='input-div'><input type='text'  name='matrix'/></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Роздільна здатність, Mpx</p>
                        <div className='input-div'><input type='text'  name='mpx'/></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Якість відео</p>
                        <div className='input-div'><input type='text'  name='video'/></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Експокорекція</p>
                        <div className='input-div'><input type='text'  name='exposition'/></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Ширина, мм</p>
                        <div className='input-div'><input type='number'  min='1' name='width'/></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Висота, мм</p>
                        <div className='input-div'><input type='number' min='1' name='height'/></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Глибина, мм</p>
                        <div className='input-div'><input type='number' min='1' name='depth'/></div>
                    </div>
                    <div className={typeGoods=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Вага, г</p>
                        <div className='input-div'> <input type='number'  min='1' name='weight'/></div>
                    </div>
                    <div className='admin-block-option' onChange={inputHandler}>
                        <p>Ціна будній день, грн</p>
                        <div className='input-div'><input type='number'  min='1' name='work_price'/></div>
                    </div>
                    <div className='admin-block-option' onChange={inputHandler}>
                        <p>Ціна вихідний день, грн</p>
                        <div className='input-div'><input type='number'  min='1' name='weekend_price'/></div>
                    </div>
                    <div className='admin-block-option' onChange={inputHandler}>
                        <p>Ціна за тиждень день, грн</p>
                        <div className='input-div'><input type='number' i min='1' name='week_price'/></div>
                    </div>
                    <div className='admin-block-option' onChange={inputHandler}>
                        <p>Ціна за місяць день, грн</p>
                        <div className='input-div'><input type='number'  min='1' name='month_price'/></div>
                    </div>
                    <div className={typeGoods!=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Найменша фокусна відстань, мм</p>
                        <div className='input-div'><input type='number'  min='1' name='min_focus_length'/></div>
                    </div>
                    <div className={typeGoods!=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Діаметр, мм</p>
                        <div className='input-div'><input type='number'  min='1' name='diametr'/></div>
                    </div>
                    <div className={typeGoods!=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Довжина,мм</p>
                        <div className='input-div'><input type='number'  min='1' name='linceLength'/></div>
                    </div>
                    <div className={typeGoods!=='Фотокамера' || typeGoods=='none' ? 'admin-block-option' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Тип об'єктива</p>
                        <div className='input-div'><input type='text'  min='1' name='linseType'/></div>
                    </div>

                    <div className={typeGoods!=='Фотокамера' || typeGoods=='none' ? 'admin-block-option text' : 'admin-block-option hiddenFields'} onChange={inputHandler}>
                        <p>Опис товару</p>
                        <div className='input-div'><textarea min='1'  name='description'/></div>
                    </div>



                    <div className='admin-block-option'onChange={inputHandler}>
                        <p>Наявність</p>
                        <div className='input-div'> <input type='radio' id='available1' name='availability' value='true'/><label htmlFor='available1'>Так</label></div>
                        <div className='input-div'><input type='radio' id='available2' name='availability' value='false'/><label htmlFor='available2'>Ні</label></div>
                    </div>
                    <div className='admin-block-option'>
                        <p>Фото</p>
                        <div className='photo-cont'>
                            <div className='input-div'><input type='file' name='imgS' onChange={handleChange} multiple/></div>
                        </div>
                    </div>
                    <button className='button-admin' onClick={submitHandler}>Додати</button>
                </form>
               
                </> :<p className='saved'>Товар успішно збережено!</p>
                }
        

            </div>
        </div> 
    )
}

export default AdminAdd