export default async function apiCall(
  callVerb: string,
  URLparams: string,
  bodyObject = null
) {
  const url = import.meta.env.VITE_API_URL + URLparams;
  //const token = localStorage.getItem("currentToken");
  const resp = await fetch(url, {
    method: callVerb,
    // prettier-ignore
    headers: {
        //"Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
    body: bodyObject,
  });
  const responseData = await resp.json();
  return responseData;
}
