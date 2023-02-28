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
      const response = await fetch("http://localhost:3000/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
          oldAuthToken: authToken,
        }),
      });
      const data = await response.json();
      console.log(data);

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
