import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../Card/Card";
import HttpClient from "../../helpers/http.helper";
import { API_URL, PREFIX, OAUTH_URL } from "../../helpers/constants";
import Alert from './../Alert/Alert';
import { motion } from "framer-motion";

import { globalContext } from './../../context/context';
import { calcIncome } from '../../helpers/incomeHelper';
import {SignAlgorithm} from '../../helpers/SignAlgorithm';

const http = new HttpClient();
const signCalculator = new SignAlgorithm();

function Order() {
	const { alert, setAlert } = useContext(globalContext);

	const [orders, setOrders] = useState([]);
	const [searchParams] = useSearchParams();
	const [authCode, setAuthCode] = useState();
	const [token, setToken] = useState(sessionStorage.getItem('access_token'));

	useEffect(() => {
		if (searchParams.get('code')) {
			setAuthCode(searchParams.get('code'));
		}
	}, []);

	// get token
	useEffect(() => {
		if (token) {
			console.log('Token already exists.'); // from session storage
			return;
		}
		if (authCode === null || authCode === undefined) {
			setAlert({
				msg: "Click 'Authorization' button.",
				type: "info",
				visible: true
			});
			return;
		}
		const handleShopAuth = async () => {
			const ENDPOINT = `${PREFIX}/${OAUTH_URL}/api/v2/token/get`;
			const params = {
				app_key: process.env.REACT_APP_KEY,
				app_secret: process.env.REACT_APP_SECRET,
				auth_code: authCode,
				grant_type: 'authorized_code',
			};
			const res = await http.getWithParams(ENDPOINT, params);
			console.log(res);
			if (!res) {
				console.log('no respone');
				return;
			}
			if (res.code === 36004004) {
				console.log('invalid auth code');
				setAlert({
					msg: "Invalid auth code! Click `Authorization` button again.",
					type: "error",
					visible: true
				});
				return;
			}
			if (res.code !== 0) {
				console.log('invalid respone');
				return;
			}
			setAlert({
				msg: "Authorization successful",
				type: "success",
				visible: true
			});
			setToken(res.data.access_token);
		};
		handleShopAuth();
	}, [authCode]);

	// store token
	useEffect(() => {
		if (token === null || token === undefined) {
			console.log('no token');
			return;
		}
		sessionStorage.setItem('access_token', token);
	}, [token]);

	// get order detail -> calculate income
	useEffect(() => {
		if (token === null) {
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

	}, [token]);

	return (
		<div className="h-full">
			<Alert msg={alert.msg} type={alert.type} visible={alert.visible} />
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