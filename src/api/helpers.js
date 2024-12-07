import { getAccessToken } from "./auth";

export class TokenHelper {
  async tryRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    console.log(refreshToken);
  
    if (!refreshToken) {
      return Promise.reject('No refresh token provided');
    }

    const accessToken = await getAccessToken(refreshToken).catch((err) => {
      console.error(err);
      this.clearLocalTokens();
    });
  
    if (!accessToken) {
      this.clearLocalTokens();
      return Promise.reject('No access token recieved');
    }
  
    localStorage.setItem('accessToken', accessToken);
  }

  clearLocalTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export const tokenHelper = new TokenHelper();
