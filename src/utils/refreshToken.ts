import { createRefresh, useAuthHeader } from "react-auth-kit";
import { config } from "./config";

export const refreshApi = createRefresh({
  interval: 30,
  refreshApiCallback: async ({ authToken }) => {
    try {
      const response = await fetch(`${config.apiUrl}/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        //change: token send, is a temporaty solution, refresh token must be refresh token - change on backend to
        body: JSON.stringify({
          refreshToken: authToken,
          oldAuthToken: authToken,
        }),
      });
      const data = await response.json();

      console.log("Refresh APi:", data);

      return {
        isSuccess: true,
        newAuthToken: data.newAuthToken || "",
        newAuthTokenExpireIn: data.newAuthTokenExpireIn,
        refreshToken: data.refreshToken,
        refreshTokenExpiresAt: new Date(data.refreshTokenExpiresAt),
        authUserState: data.authUserState,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: "",
      };
    }
  },
});
