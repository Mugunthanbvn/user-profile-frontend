import { IUserData } from "../types/userData.types";
import { ApiService } from "./apiService";

export class ProfileService {
  static userData: IUserData;

  static async fetchUserData() {
    try {
      const response = await ApiService.get("user/profile", {}, true);

      if (response.status === 200) {
        ProfileService.userData = response.data;
      }
      return ProfileService.userData;
    } catch (error) {
      console.error("Error in fetching profile:", error);
    }
  }
}
