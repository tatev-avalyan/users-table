import store from "@/store";

export default () => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  if (store.getters.accessToken) {
    headers["Authorization"] = "Bearer " + store.getters.accessToken;
  }

  return headers;
};
