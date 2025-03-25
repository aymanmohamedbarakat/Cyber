import axios from "axios";
import { domain } from "../../store";

export const indexCategories = async () => {
  let final = [];
  await axios.get(domain + "/api/category").then((res) => {
    final = res.data.data;
    console.log(final)
  });
  return final;
};
