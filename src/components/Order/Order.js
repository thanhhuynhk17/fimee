import { useState, useEffect } from "react";
import Card from "../Card/Card";
import HttpClient from "../../helpers/http.helper";
import { API_URL, PREFIX } from "../../helpers/constants";
import { calSign } from "../../helpers/signAlgorithm";

const http = new HttpClient();

function Order({ token }) {

	useEffect(() => {
		if (token === null) {
			return;
		}
		// get order details
		const getOrderDetails = async () => {
			const ENDPOINT = `${PREFIX}/${API_URL}/api/orders/detail/query`;
			const data = {
				order_id_list: ["577031439355185316"]
			};
			let params = {
				app_key: process.env.REACT_APP_KEY,
				timestamp: Math.round(Date.now() / 1000),
			};
			const sign = calSign('/api/orders/detail/query', params);
			params = {
				...params,
				sign: sign,
				access_token: token
			};
			const header = {
				'Content-Type': 'application/x-www-form-urlencoded',
			};
			const res = await http.postWithParams(ENDPOINT, params, data);
			console.log(res);

		};
		// call async function
		getOrderDetails();

	}, [token]);

	return token && (
		<div className="h-full ">
			{
				<Card
					className={`md:rounded-sm h-max`}
				>
					<p className="text-ellipsis hover:text-clip overflow-hidden">{token}</p>
				</Card>
			}
		</div>
	);
}

export default Order;