import { IUserData } from "../types/userData.types";
import { ApiService } from "./apiService";

export enum ESignupStatus {
  sucess = 1,
  failed = 2,
}

export class SignUpService {
  static async signup(payload: IUserData) {
    let signupStatus = ESignupStatus.failed;
    try {
      const response = await ApiService.post("auth/signup", payload);
      if (response.status === 200) {
        signupStatus = ESignupStatus.sucess;
      }
    } catch (error: any) {
      console.error("Error in signup:", error);
      throw new Error(error?.response?.data?.message ?? "Signup failed");
    }

    return signupStatus;
  }
}
