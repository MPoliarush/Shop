import Cart from '../Cart';
import Footer from '../Footer';
import { useSelector } from "react-redux"



function Liked(){

    const stateLike = useSelector(state=>state.like.items)


    return(
        <>
        <main>
            <div className="content-container">
            <h1 className="registration catalog-h1"><span>ВИБРАНІ</span> ТОВАРИ</h1>

                <div className='liked-wrapp'>
                    {stateLike.map(item=>{
                        return <div className='like-item'><Cart key={Math.random()} itemData={item}></Cart> </div>
                    })}

                </div>
            </div>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Liked