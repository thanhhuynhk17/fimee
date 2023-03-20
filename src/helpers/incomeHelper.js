import { PRODUCTS_PRICE } from "./constants";

export const calcIncome = (products) => {
	const total_origin_price = products.reduce((total, product) => {
		const origin_price = PRODUCTS_PRICE[product.product_id] * product.quantity;
		return total + origin_price;
	}, 0);

	return total_origin_price;
};