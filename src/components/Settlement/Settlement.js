import { useState, useContext, useEffect } from 'react';
import { globalContext } from '../context/context';

import Datepicker from "react-tailwindcss-datepicker";

import { PREFIX, API_URL } from './../../helpers/constants';
import { SignCalculator } from '../../helpers/signAlgorithm';
import HttpClient from '../../helpers/http.helper';
import Card from '../Card/Card';
import { calcIncome } from './../../helpers/incomeHelper';

const http = new HttpClient();
const signCalculator = new SignCalculator();

function Settlement() {
	const {
		dateRange, setDateRange,
		token,
		settls, setSettls,
		setAlert,
		orders, setOrders
	} = useContext(globalContext);

	const handleValueChange = (newValue) => {
		console.log('newValue', newValue);
		setDateRange(newValue);
	};

	useEffect(() => {
		if (dateRange.startDate === null || dateRange.endDate === null) {
			console.log('No date');
			return;
		}
		// get settlements 
		const getSettlements = async () => {
			const endpoint = 'api/finance/settlements/search';
			const url = `${PREFIX}/${API_URL}/${endpoint}`;
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
			const data = {
				request_time_from: new Date(dateRange.startDate).getTime() / 1000,
				request_time_to: new Date(dateRange.endDate).getTime() / 1000,
				page_size: 50
			};
			console.log(data);
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
				msg: "Get settlements successful.",
				type: "success",
				visible: true
			});

			const res_list = res.data.settlement_list.map(item => {
				return {
					order_id: item.order_id,
					settlement_amount: parseInt(item.settlement_info.settlement_amount),
					settlement_time: new Date(parseInt(item.settlement_info.settlement_time + '000')).toLocaleDateString('en-GB')
				};
			});
			setSettls(res_list);
		};
		getSettlements();
	}, [dateRange]);

	// get order detail -> calculate income
	useEffect(() => {
		if (token === null || token === undefined) {
			return;
		}
		if (settls.length === 0) {
			return;
		}
		// get order details
		const getOrderDetails = async () => {
			const endpoint = 'api/orders/detail/query';
			const url = `${PREFIX}/${API_URL}/${endpoint}`;
			const data = {
				order_id_list: settls.map(item => item.order_id)
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
			let order_origin_price = {};
			res.data.order_list.map(detail => {
				order_origin_price[detail.order_id] = calcIncome(detail.item_list);
			});
			setOrders(order_origin_price);
		};
		// call async function
		getOrderDetails();

	}, [settls]);

	return (
		<div className='h-max'>
			<h1 className="mb-4 text-3xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">AutoIncome</h1>
			<Datepicker
				inputClassName={`font-medium`}
				value={dateRange}
				onChange={handleValueChange}
				showShortcuts={true}
				useRange={false}
				separator={"to"}
				displayFormat={"DD/MM/YYYY"}
			/>
			{settls.length !== 0 && Object.keys(orders).length !== 0 && (
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
					<table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Order ID
								</th>
								<th scope="col" className="px-6 py-3">
									Date
								</th>
								<th scope="col" className="px-6 py-3">
									Original Price (VND)
								</th>
								<th scope="col" className="px-6 py-3">
									Settlement Amount (VND)
								</th>
								<th scope="col" className="px-6 py-3">
									Income (VND)
								</th>
								{/* <th scope="col" className="px-6 py-3">
								<span className="sr-only">Edit</span>
							</th> */}
							</tr>
						</thead>
						<tbody>
							{settls.map((item) => (
								<tr key={item.order_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										{item.order_id}
									</th>
									<td className="px-6 py-4">
										{item.settlement_time}
									</td>
									<td className="px-6 py-4">
										{orders[item.order_id]}
									</td>
									<td className="px-6 py-4">
										{item.settlement_amount}
									</td>
									<td className="px-6 py-4">
										{item.settlement_amount - orders[item.order_id]}
									</td>
									{/* <td className="px-6 py-4 text-right">
								<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
							</td> */}
								</tr>
							))}


						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default Settlement;