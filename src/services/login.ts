import { ApiService } from './apiService';
import { ProfileService } from './profile';
import jwtDecode from 'jwt-decode';

export enum ELoginStatus{
    sucess = 1,
    failed = 2
}
interface ILoginCreds{
    email: string;
    password: string;
}
interface ICurrentUserData{
    email: string;
    token: string;
}

export class LoginService{

    static currentUserData: ICurrentUserData = null;
    static expiryHandler: NodeJS.Timeout = null
    static init(){
        const tokenData = LoginService.getJwtToken();

        tokenData && (LoginService.currentUserData =tokenData);
    }

    static setCurrentUserData = (currentUserData:ICurrentUserData )=>{
        LoginService.currentUserData = currentUserData;
        const decodedToken: {expiry: number, email: string} = jwtDecode(currentUserData.token);
        LoginService.expiryHandler && clearTimeout(LoginService.expiryHandler);
        const expiryTime = decodedToken.expiry - Math.floor(Date.now() / 1000) ;
        if(expiryTime > 0)
        LoginService.expiryHandler = setTimeout(()=> LoginService.logout(),expiryTime*1000)
        else
        LoginService.expiryHandler = null
    }

    static async login(creds: ILoginCreds){
        
        let loginStatus: ELoginStatus = ELoginStatus.failed;
        try {
            const response = await ApiService.post('auth/login', {
                email: creds.email,
                password: creds.password
            })
            if (response.status === 200) {
                localStorage.setItem('jwtToken', response.data.token);
                LoginService.setCurrentUserData({email: creds.email, token: response.data.token});
                ProfileService.fetchUserData();
                
                loginStatus = ELoginStatus.sucess;
                
            }
        
    
          } catch (error: any) {
            console.error('Error in login:', error);
            loginStatus = ELoginStatus.failed;
            throw new Error(error?.response?.data?.message ?? 'Login failed');
          }
        return loginStatus;
    }
    static async logout(){
        if(LoginService.currentUserData){
            LoginService.currentUserData = null;
            window.location.reload();
        }
        localStorage.removeItem('jwtToken');
    }
    static getJwtToken(){
        try {
        const jwtToken = localStorage.getItem('jwtToken');
        const decodedToken: {expiry: number, email: string} = jwtDecode(jwtToken);
        const isExpired = Math.floor(Date.now() / 1000) > decodedToken?.expiry;
        if(!LoginService.currentUserData && decodedToken)
        {
            LoginService.setCurrentUserData({token: jwtToken,email: decodedToken.email });
        }
        const currentTokenCheck = (LoginService.currentUserData && LoginService.currentUserData?.token === jwtToken);
        if(!isExpired && currentTokenCheck)
            LoginService.currentUserData =  {token:jwtToken , email: decodedToken?.email}
        else
            {
                localStorage.removeItem('jwtToken');
                LoginService.currentUserData = null;
            }
        return  LoginService.currentUserData;
    }catch (error) {
        console.error(error);
    }

    }
}
