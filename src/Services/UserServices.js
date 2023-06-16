import { base_URL } from "./ConfigURL";

export let postLogin = (data) => {
  return base_URL.post("/api/auth/signin", data);
};
export let postRegister = (data) => {
  return base_URL.post("/api/auth/signup", data);
};
