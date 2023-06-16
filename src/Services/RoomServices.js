import { base_URL } from "./ConfigURL";

export let localSearch = () => {
  return base_URL.get("/api/vi-tri");
};
