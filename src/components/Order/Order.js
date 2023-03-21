import { useState, useEffect, useContext } from "react";

import Card from "../Card/Card";
import HttpClient from "../../helpers/http.helper";
import { API_URL, PREFIX, OAUTH_URL } from "../../helpers/constants";
import { motion } from "framer-motion";

import { globalContext } from "../context/context";
import { calcIncome } from '../../helpers/incomeHelper';
import { SignCalculator } from '../../helpers/signAlgorithm';

const http = new HttpClient();
const signCalculator = new SignCalculator();

function Order() {
	const {
		setAlert,
		token,
		settls,
		orders, setOrders
	} = useContext(globalContext);

	// get order detail -> calculate income
	useEffect(() => {
		if (token === null || token === undefined) {
			return;
		}
		// get order details
		const getOrderDetails = async () => {
			const endpoint = 'api/orders/detail/query';
			const url = `${PREFIX}/${API_URL}/${endpoint}`;
			const data = {
				order_id_list: ["577034722900675198"]
			};
			let params = {
				app_key: process.env.REACT_APP_KEY,
				timestamp: Math.round(Date.now() / 1000),
			};
			const sign = signCalculator.calcSignature(endpoint, params);
			params = {
				...params,
				sign: sign,
				access_token: token
			};

			const res = await http.postWithParams(url, params, data);
			console.log(res);
			if (res.code !== 0) {
				setAlert({
					msg: res.message,
					type: "error",
					visible: true
				});
				return;
			}
			setAlert({
				msg: "Get order details successful.",
				type: "success",
				visible: true
			});
			const details = res.data.order_list.map(detail => {
				return {
					order_id: detail.order_id,
					origin_price: calcIncome(detail.item_list)
				};
			});
			setOrders(details);
		};
		// call async function
		getOrderDetails();

	}, [settls]);

	return (
		<div className="h-full">
			{
				orders.length === 0 ? ( // skeleton loading
					<Card
						className={`h-20 animate-pulse justify-between`}
					>
						<div className="flex justify-between space-x-4">
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
						</div>
						<div className="flex justify-between space-x-4">
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
						</div>
						<div className="flex justify-between space-x-4">
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
							<div className="h-2 w-40 bg-slate-400 rounded"></div>
						</div>
					</Card>
				) : (
					<Card
						className={`h-max`}
					>
						<p className="text-ellipsis hover:text-clip overflow-hidden">{JSON.stringify(orders)}</p>
						{/* List order */}

					</Card>
				)
			}
		</div>
	);
}

export default Order;