import { CreateDriverReq } from "../../../be_app_DA/types/driver";
import { CreateLoadReq } from "../../../be_app_DA/types/load";

export enum fetchMethod {
  "POST",
  "GET",
  "PUT",
  "PATCH",
  "DELETE",
}

export interface FetchFunctionArg {
  url: string;
  fetchMethod: string;
  authToken: string;
  body?: CreateDriverReq | CreateLoadReq;
}

export const fetchData = async (
  url: string,
  fetchMethod: string,
  authToken: string,
  body?: CreateDriverReq | CreateLoadReq
) => {
  const data = await fetch(url, {
    method: `${fetchMethod}`,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authToken}`,
    },
    body: JSON.stringify(body),
  });
  return await data.json();
};
