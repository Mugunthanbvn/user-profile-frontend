import logo from '../../assets/logo.svg';
import { LoginService } from '../../services/login';
import '../../styles/NavBar.css';

interface INavBarProps{
    userData?: {
        userName: string;
        userRole: string;
    }
}
const NavBar = (props: INavBarProps)=>{
    const {userName = 'User', userRole = 'Admin'} = props.userData ?? {};
    return <div className='nav-bar-container'>
        <div className='nav-bar-body'>
            <img className='navbar-logo' src={logo} alt=''></img>
            <div className='navbar-user-data'>
                <div className='navbar-user-name'>{userName}</div>
                {/* <div  className='navbar-user-role'>{userRole}</div> */}
                <button className='navbar-user-logout' onClick={()=> LoginService.logout()}>Logout</button>
            </div>
        </div>
    </div>
}

export default NavBar;