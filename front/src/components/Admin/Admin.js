import {useState,useEffect} from 'react'
import AdminCart from './AdminCart'
import axios from "axios";
import { Link } from 'react-router-dom';


function Admin(){
    const [fetchedData, setFetchedData] = useState([])
    const [selectionMode, setSelectionMode] = useState('all');

    async function getInfo () {
        console.log(selectionMode)
        try{
            if(selectionMode=='all'){
                const response = await axios("http://localhost:5000/products")
                console.log(response.data)
                setFetchedData(response.data)
            } else if (selectionMode=='Фотокамера'){
                const response = await axios("http://localhost:5000/cameras")
                console.log(response.data)
                setFetchedData(response.data.filter(product=>{
                    return product.typeGoods=='Фотокамера'
                }))
            }else if (selectionMode=='Лінза'){
                const response = await axios("http://localhost:5000/linses")
                console.log(response.data)
                setFetchedData(response.data.filter(product=>{
                    return product.typeGoods=='Лінза'
                }))
            }
           
        }catch(e){
            console.log(e)
        }
    }
        
    useEffect(()=>{  
        getInfo()
        console.log(fetchedData)
    
    },[selectionMode])

    function selectionHandler(e){
        setSelectionMode(e.target.value)
    }

    // async function removeCart(id,item){
    //     console.log(item)
    //     const reducedArray= fetchedData.filter(item=>{
    //         return item._id!=id
    //     })
    //     console.log(reducedArray)
    //     setFetchedData(reducedArray)

    //     const config = {
    //         headers:{
    //             "Content-Type": "application/json"
    //         }
    //     }
    //     const response = await axios.post(`http://localhost:5000/admin/delete/${id}`, item, config )
    // }


    return(
        <div className='content-container-admin'>
            <h1 className='h1'>ПАНЕЛЬ АДМІНІСТРАТОРА</h1>
            <div className='admin'>
                
                <p className='addItem'><Link to='/admin/add'><img src='/imagesHTML/icons/add.png'/>Додати товар </Link></p>
                
                <ol className='goods'>
                <select className='price-selection-admin' onChange={selectionHandler} value={selectionMode}> 
                    <option value='all'>Всі товари</option>
                    <option value='Фотокамера'> Фотокамери </option>
                    <option value='Лінза'>Лінзи</option>
                </select>
                    {fetchedData ? fetchedData.map( item=>{
                        return  <Link to={`/admin/view/${item._id}`}>
                                    <li className='item-list'>
                                        <p>{item.typeGoods}</p>
                                        <p>{item.brand}</p>
                                        <p>{item.model}</p>
                                        <p>{item.type}</p>
                                        <p>{item.work_price}</p>
                                    </li>
                                </Link>
                    })
                    : <p className='empty'>Товари для редагування відсутні</p>
                    
                    }


                </ol>
            </div>
            
        </div>
    )
}

export default Admin