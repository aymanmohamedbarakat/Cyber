import axios from "axios";
import { domain } from "../../store";
import { toast } from "react-toastify";

export const storeUser = async (values) => {
  let final;

  await axios
    .post(domain + "/api/auth/local/register", {
      username: values.username,
      email: values.email,
      password: values.password,
    })
    .then(async (info) => {
      await axios
        .put(domain + `/api/users/${info.data.user.id}`, {
          phone: values.phone,
        })
        .then(() => {
          final =  info.data;
        })
        .catch(() => {
          toast.error("Error:phone or Username are already taken ", {
            autoClose: 2000,
          });
        });
      toast.success("User Created Successfully", {
        autoClose: 2000,
      });
    })
    .catch(() => {
      toast.error("Error: Email or Username are already taken ", {
        autoClose: 2000,
      });
    });

  return final;
};
