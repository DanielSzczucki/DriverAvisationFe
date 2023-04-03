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
}

export const fetchData = async (
  url: string,
  fetchMethod: string,
  authToken: string
) => {
  const data = await fetch(url, {
    method: `${fetchMethod}`,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authToken}`,
    },
  });
  return await data.json();
};
