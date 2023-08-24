import axios from "axios";
import { LoginService } from "./login";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export class ApiService {
  static async post(endpoint: string, payload: any = {}, isAuth = false) {
    const jwtToken = LoginService.getJwtToken()?.token;
    return await axios.post(`${BACKEND_URL}/${endpoint}`, payload, {
      ...(isAuth &&
        jwtToken && {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }),
    });
  }
  static async get(endpoint: string, payload: any = {}, isAuth = false) {
    const jwtToken = LoginService.getJwtToken()?.token;
    return await axios.get(`${BACKEND_URL}/${endpoint}`, {
      ...(Object.keys(payload).length && { params: payload }),
      ...(isAuth &&
        jwtToken && {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }),
    });
  }
}
