
export const calcIncome = (originPrice ,products) => {
	const total_origin_price = products.reduce((total, product) => {
		const origin_price = originPrice[product.product_id] * product.quantity;
		return total + origin_price;
	}, 0);

	return total_origin_price;
};