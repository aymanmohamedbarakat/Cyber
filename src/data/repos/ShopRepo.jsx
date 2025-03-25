import { indexCategories } from "../apis/index_categories";
import { indexProduct } from "../apis/index_products";

export const ShopRepo = {
  categories_index: async () => {
    return await indexCategories();
  },

  products_index: async (pageNo, pgeSize, filtersId) => {
    return await indexProduct(pageNo, pgeSize, filtersId);
  },
};
