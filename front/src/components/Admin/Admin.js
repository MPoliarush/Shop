import {useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux"
import {adminActions} from '../../store/store'
import AdminCart from './AdminCart'
import axios from "axios";
import { Link } from 'react-router-dom';


function Admin(){
    const [fetchedData, setFetchedData] = useState([])
    const [selectionMode, setSelectionMode] = useState('all');

    const adminLoginState = useSelector(state=>state.admin.adminData)
    let navigate = useNavigate();
    const dispatch = useDispatch()

    console.log(adminLoginState)

    async function getInfo () {
        console.log(selectionMode)
        try{
            if(selectionMode=='all'){
                const response = await axios("https://shop-apps.onrender.com/products")
                console.log(response.data)
                setFetchedData(response.data)
            } else if (selectionMode=='Фотокамера'){
                const response = await axios("https://shop-apps.onrender.com/cameras")
                console.log(response.data)
                setFetchedData(response.data.filter(product=>{
                    return product.typeGoods=='Фотокамера'
                }))
            }else if (selectionMode=='Лінза'){
                const response = await axios("https://shop-apps.onrender.com/linses")
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


function backToAdminLogin(){

    dispatch(adminActions.logAdminOut())
    let path = `/adminLogin`; 
    navigate(path);
}



    return(
        <div className='content-container-admin'>

                {adminLoginState ? 
                <div>
                    <div className='adminNav'>
                        <h1 className='h1'>ПАНЕЛЬ АДМІНІСТРАТОРА</h1> 
                        <p className='confirm-btn' onClick={backToAdminLogin}>ВИХІД</p>
                    </div>
                    
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

                : <h1 className='h1'>Немає прав для адміністрування сайту</h1>
                }
        </div>
    )
}

export default Admin