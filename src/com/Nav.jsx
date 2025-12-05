import './styles/NavBar.css'
import {Link} from "react-router-dom";
function NavBar() {
    const ar = [{name:'login' , href:'/login' } ,{name:'register' , href:'/register' } ,{name:'about' , href:'/about' } ,{name:'home' , href:'/' } ]
    return (
        <>
            <div className={'nav'}>
                <p className={'JSV'}>JSV</p>
                <ul className={'list'}>
                    {ar.map((item, index) => {
                        return <li key={index} ><Link to={item.href} className={'router_name'} >{item.name}</Link></li>
                    })}

                </ul>
            </div>
        </>
    )
}

export default NavBar
