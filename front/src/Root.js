import {Outlet} from 'react-router-dom'


import Header from './components/Header/Header'


function Root (){


return (
<>

  
        <div className="App">
            <div className='content-container'>
                <Header></Header>
            </div>
        </div>
           <Outlet></Outlet>
       
 
        

</> 
)
}

export default Root