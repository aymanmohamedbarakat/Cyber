import axios from "axios";
import { domain } from "../../store";

export const indexProduct = async (pageNo, pgeSize, filtersId = []) => {
  let final = { total: 0, data: [] };

  await axios
    .get(domain + "/api/products", {
      params: {
        populate: "*",
        pagination: {
          page: pageNo,
          pageSize: pgeSize,
        },
        filters: {
          category: {
            documentId: {
              $in: filtersId,
            },
          },
        },

        sort: ['name' ,'price' ],
      },
    })
    .then((res) => {
      final = {
        total: res.data.meta.pagination.total,
        data: res.data.data, // ممكن عددها يقل لو عملت pagination
      };
      console.log(final);
    });

  return final;
};
