import { createRefresh } from "react-auth-kit";
import { useAuthHeader, useSignIn } from "react-auth-kit";

export const refreshApi = createRefresh({
  interval: 5,
  refreshApiCallback: async ({
    authToken,
    authTokenExpireAt,
    refreshToken,
    refreshTokenExpiresAt,
    authUserState,
  }) => {
    try {
      const response = await fetch("http://localhost:3001/refresh", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        //change: token sent, is a temporaty solution, refresh token must be refresh token - change on backend to
        body: JSON.stringify({
          refreshToken: authToken,
          oldAuthToken: authToken,
        }),
      });
      const data = await response.json();
      console.log("refresh data", data);

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
