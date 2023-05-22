import { useState,useEffect } from "react"
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";



function AdminCart(props){
    const params = useParams();

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

    const [uploadedIMG, setUploadedIMG] = useState('')
    // const [newImgArr, setNewImagArr] = useState([])
    const [imgArray,setImgArray] = useState([])
    const [edited,setEdited] = useState(false)
    const [cartDeleted,setCartdeleted] =useState(false)
   
    

    async function getCartData(){
        console.log(params.id)
        try{
            const response = await axios(`https://shop-apps.onrender.com/products/${params.id}`)
            console.log(response.data)
            setInput(response.data)
            setImgArray(response.data.img1)
        }catch(e){
            console.log(e)
        }
    }

 

    useEffect(()=> {
        getCartData()
        console.log('logged')
    }, [])




    function inputHandler(event){
        // console.log(event.target.name)
        // console.log(event.target.value)
        // console.log(props.itemData._id)
        if (event.target.name==='typeGoods'){
            setInput({...input,
                typeGoods:event.target.value
            })
    
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

    function handleChange(e){
        console.log(e.target.files)
        setUploadedIMG(e.target.files)
    }

    function imgDeleteHandler(e){
        const adress = e.currentTarget.name
        // console.log(adress)
        const imgArr = imgArray.filter( img=>{
            // console.log(img.filename)
            return img.filename!==adress
        })
        
        setImgArray(imgArr)
        setInput({...input, 
            img1:imgArr
        })
    }
   

   async function deleteHandler(e){
        e.preventDefault()
        console.log(params.id)
        setCartdeleted(true)
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        const response = await axios.post(`https://shop-apps.onrender.com/admin/delete/${params.id}`, input ,config )
        
    }
  



   async function editHandler(e){
        e.preventDefault()

        setEdited(true)

        setTimeout(()=>{
            setEdited(false)
        }, 1000)

        let formData = new FormData()

        if(imgArray==[] || imgArray.length==0){
            console.log('logged 1')
            
            
                formData.append('imgS', null)
                formData.append('input', JSON.stringify(input))
           
                const config = {
                    headers:{
                        "Content-Type": "multipart/form-data"
                    }
                }
                const response = await axios.post(`https://shop-apps.onrender.com/admin/update/${params.id}`, formData, config )
                console.log(response)
           
        } else if(uploadedIMG){
            
            for (let i=0; i<uploadedIMG.length;i++){
                console.log('logged 2')
                formData.append('imgS', uploadedIMG[i])
            }

            console.log(imgArray)
            formData.append('input', JSON.stringify(input))
            const config = {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            }
                const response = await axios.post(`https://shop-apps.onrender.com/admin/update/${params.id}`, formData, config )
        }
        
        const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
        const response = await axios.post(`https://shop-apps.onrender.com/admin/update/${params.id}`, input, config )
        console.log(response)
        
       
   } 



    return (
        <div className="content-container-admin">
        {cartDeleted ? <div className="message"><p >Товар видалено</p><Link to='/admin'>Назад до товарів</Link></div> 
        :
        <form className="form-block " onSubmit={(e)=>e.preventDefault()}>
            <div className='form-container' onChange={inputHandler}>
                <p>Вид товару</p>
                <div className='input-div'><input type='radio' id='3К' name='typeGoods' value='Фотокамера' checked={input.typeGoods=='Фотокамера' ? true : false}/><label htmlFor='3К'>Фотокамера</label></div>
                <div className='input-div'><input type='radio' id='4К' name='typeGoods' value='Лінза' checked={input.typeGoods=='Лінза' ? true : false}/><label htmlFor='4К'>Лінза</label></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Марка</p>
                <div className='input-div'><input type='text' size='20' name='brand' defaultValue={input.brand}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Модель</p>
                <div className='input-div'><input type='text'  name='model' defaultValue={input.model}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Глибина зображення</p>
                <div className='input-div'><input type='text'  name='imgdepth' defaultValue={input.imgdepth}/></div>
            </div>
            <div className='form-container'onChange={inputHandler}>
                <p>Тип зображення</p>
                <div className='input-div'><input type='radio' id='type1' name='type' defaultValue='Дзеркальна' checked={input.type=='Дзеркальна' ? true : false} /><label htmlFor='type1'>Дзеркальна</label></div>
                <div className='input-div'><input type='radio' id='type2' name='type' defaultValue='Компактна' checked={input.type=='Компактна' ? true : false} /><label htmlFor='type2'>Компактна</label></div>
            </div>
            <div className='form-container'onChange={inputHandler}>
                <p>Матриця</p>
                <div className='input-div'><input type='text'  name='matrix' defaultValue={input.matrix}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Роздільна здатність, Mpx</p>
                <div className='input-div'><input type='text'  name='mpx' defaultValue={input.mpx}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Якість відео</p>
                <div className='input-div'><input type='text'  name='video' defaultValue={input.video}/></div>
            </div>
            <div className='form-container'c onChange={inputHandler}>
                <p>Експокорекція</p>
                <div className='input-div'><input type='text'  name='exposition' defaultValue={input.exposition}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Ширина, мм</p>
                <div className='input-div'><input type='number'  min='1' name='width' defaultValue={input.width}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Висота, мм</p>
                <div className='input-div'><input type='number' min='1' name='height' defaultValue={input.height}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Глибина, мм</p>
                <div className='input-div'><input type='number' min='1' name='depth' defaultValue={input.depth}/></div>
            </div>
            <div className='form-container'onChange={inputHandler}>
                <p>Вага, г</p>
                <div className='input-div'> <input type='number'  min='1' name='weight' defaultValue={input.weight}/></div>
            </div>
            <div className='form-container'onChange={inputHandler}>
                <p>Ціна будній день, грн</p>
                <div className='input-div'><input type='number'  min='1' name='work_price' defaultValue={input.work_price}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Ціна вихідний день, грн</p>
                <div className='input-div'><input type='number'  min='1' name='weekend_price' defaultValue={input.weekend_price}/></div>
            </div>
            <div className='form-container'onChange={inputHandler}>
                <p>Ціна за тиждень день, грн</p>
                <div className='input-div'><input type='number' i min='1' name='week_price' defaultValue={input.week_price}/></div>
            </div>
            <div  className='form-container'onChange={inputHandler}>
                <p>Ціна за місяць день, грн</p>
                <div className='input-div'><input type='number'  min='1' name='month_price' defaultValue={input.month_price}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Найменша фокусна відстань, мм</p>
                <div className='input-div'><input type='number'  min='1' name='min_focus_length' defaultValue={input.min_focus_length}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Діаметр, мм</p>
                <div className='input-div'><input type='number'  min='1' name='diametr' defaultValue={input.diametr}/></div>
            </div>
            <div className='form-container' onChange={inputHandler}>
                <p>Довжина,мм</p>
                <div className='input-div'><input type='number'  min='1' name='linceLength' defaultValue={input.linceLength}/></div>
            </div>
            <div className='form-container'onChange={inputHandler}>
                <p>Тип об'єктива</p>
                <div className='input-div'><input type='text'  min='1' name='linseType' defaultValue={input.linseType}/></div>
            </div>
            <div className='form-container' onChange={inputHandler} >
                        <p>Опис товару</p>
                        <div className='input-div'><textarea  min='1' row='10' defaultValue={input.description}  name='description'/></div>
                    </div>

            <div className='form-container'onChange={inputHandler}>
                <p>Наявність</p>
                <div className='input-div'> <input type='radio' id='available1' name='availability' value='true' checked={input.availability==='true' ? true : false} /><label htmlFor='available1'>Так</label></div>
                <div className='input-div'><input type='radio' id='available2' name='availability' value='false' checked={input.availability==='false' ? true : false}/><label htmlFor='available2'>Ні</label></div>
            </div>
            <div className='form-container'>
                <p>Фото</p>
                <div className=''>
                    {imgArray.map(img=>{
                        return (
                            <div className="img-box">
                                <img className="adminGoodsIMG" src={`https://shop-apps.onrender.com/uploadedIMG/${img.filename}`} />
                                <img className="img-delete" src='/imagesHTML/icons/delete.png' onClick={imgDeleteHandler} name={img.filename}/>
                            </div>
                        )
                    })}
                    <div className='input-div'><input type='file' name='imgS' multiple onChange={handleChange} /></div>
                    
                </div>
            </div>
            <div className="btns">
                <button className="delete-btn" onClick={deleteHandler} type="button" >Видалити товар</button>
                <button className="edit-btn" onClick={editHandler} type="button"> {edited==false? 'Внести зміни' : 'Збережено!'}</button>
                
            </div>
                    
        </form>

        }
    </div>
    )
}

export default AdminCart