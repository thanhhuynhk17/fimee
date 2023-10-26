import { useState, useContext, useEffect } from 'react';
import { globalContext } from '../context/context';
import { toast } from 'react-toastify';

import Datepicker from "react-tailwindcss-datepicker";

import { PREFIX, API_URL } from './../../helpers/constants';
import { SignCalculator } from '../../helpers/signAlgorithm';
import HttpClient from '../../helpers/http.helper';
import Card from '../Card/Card';
import { calcIncome } from './../../helpers/incomeHelper';

const http = new HttpClient();
const signCalculator = new SignCalculator();

const currencyFormatVND = (price) => {
	const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 12 };
	const formated = new Intl.NumberFormat('vi-VN', config).format(price);
	return formated;
};

function Settlement() {
	const {
		originPrice,
		dateRange, setDateRange,
		token,
		incomeDetail, setIncomeDetail
	} = useContext(globalContext);

	const [isLoading, setIsLoading] = useState(false);

	const handleValueChange = (newValue) => {
		setIncomeDetail([]);
		console.log('newValue', newValue);
		setDateRange(newValue);
	};

	useEffect(() => {
		if (dateRange.startDate === null || dateRange.endDate === null) {
			setIncomeDetail([]);
			console.log('No date');
			return;
		}
		const startTs = new Date(dateRange.startDate).getTime() / 1000;
		let endTs = null;
		if (dateRange.startDate === dateRange.endDate) {
			endTs = startTs + 86399;
		} else {
			endTs = new Date(dateRange.endDate).getTime() / 1000;
		}
		// get settlements 
		const getSettls = async (getMore, cursor) => {
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
				request_time_from: startTs,
				request_time_to: endTs,
				page_size: 50
			};
			if (getMore && cursor !== undefined) {
				data.cursor = cursor;
			}
			console.log(startTs, endTs);

			const res = await http.postWithParams(url, params, data);
			if (res === undefined || res.code !== 0) {
				toast.error(res.message);
				return [false, undefined, undefined];
			}
			if (res.data.settlement_list === undefined) {
				toast.success('Không có dữ liệu.');
				return [false, undefined, undefined];
			}

			const resListFilter = res.data.settlement_list.filter(item => {
				const refund = parseInt(item.settlement_info.refund);
				const userPay = parseInt(item.settlement_info.user_pay);
				// console.log(item.order_id, 'userPay, refund', userPay, refund);
				if (isNaN(userPay)) {
					return false;
				}
				if (userPay !== refund) {
					return item;
				}
			});
			const resList = resListFilter.map(item => {
				return {
					order_id: item.order_id,
					settlement_amount: parseInt(item.settlement_info.settlement_amount),
					settlement_time: new Date(parseInt(item.settlement_info.settlement_time + '000')).toLocaleDateString('en-GB')
				};
			});

			return [res.data.more, res.data.next_cursor, resList];
		};
		// get order details
		const getOrderDetails = async (settls) => {
			let order_origin_price = undefined;

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
			if (res === undefined || res.code !== 0) {
				toast.error(res.message);
				return undefined;
			}
			if (res.data.order_list === undefined) {
				toast.success('Không tìm thấy chi tiết của order.');
			}
			// success
			order_origin_price = {};
			res.data.order_list.map(detail => {
				order_origin_price[detail.order_id] = calcIncome(originPrice,detail.item_list);
			});

			return order_origin_price;
		};

		const getIncomeDetail = async () => {
			setIsLoading(true);

			let [getMore, cursor] = [true, undefined];
			while (getMore) {
				let settls = undefined;
				console.log('while...');
				[getMore, cursor, settls] = await getSettls(getMore, cursor);
				if (settls === undefined) {

					break;
				}
				let orders = await getOrderDetails(settls);
				if (orders === undefined) {

					break;
				}
				toast.success('Lấy dữ liệu thành công.');
				const incomePart = settls.map(item => {
					return {
						...item,
						origin_price: orders[item.order_id]
					};
				});
				setIncomeDetail(prev => {
					if (prev.length === 0) {
						return incomePart;
					}
					return [...prev, ...incomePart];
				});
			}
			toast.info('Kết thúc.');
			console.log('end while...');
			setIsLoading(false);
		};
		getIncomeDetail();

	}, [dateRange]);


	return (
		<div className='h-max'>
			<h1 className="mb-4 text-3xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">AutoIncome</h1>
			<Datepicker
				disabled={isLoading}
				inputClassName={`font-medium`}
				value={dateRange}
				onChange={handleValueChange}
				showShortcuts={true}
				useRange={false}
				separator={"to"}
				displayFormat={"DD/MM/YYYY"}
			/>
			{incomeDetail.length === 0 ?
				isLoading && (
					<div role="status" className='flex items-center justify-center mt-5'>
						<svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
						</svg>
						<span className="sr-only">Loading...</span>
					</div>
				)
				: (
					<div className="relative overflow-x-auto sm:rounded-lg mt-4">
						<div className='flex items-center justify-between py-2'>
							<h3 className="text-lg font-bold text-gray-700">Số lượng đơn: {incomeDetail.length}</h3>
							<h3 className="text-lg font-bold text-gray-700">
								Tổng doanh thu: {currencyFormatVND(
									incomeDetail.reduce((total, item) => {
										if (isNaN(item.origin_price)) {
											return total;
										}
										return total + (item.settlement_amount - item.origin_price);
									}, 0)
								)}
							</h3>
						</div>
						<table className="w-full shadow-md text-sm text-right text-gray-500 dark:text-gray-400 p-10">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="py-3 pl-4 text-left">
										Order ID
									</th>
									<th scope="col" className="py-3">
										Thời gian
									</th>
									<th scope="col" className="py-3">
										Giá gốc
									</th>
									<th scope="col" className="py-3">
										Giá bán
									</th>
									<th scope="col" className="py-3">
										VAT 1.5%
									</th>
									<th scope="col" className="py-3 pr-4">
										Doanh thu
									</th>
									{/* <th scope="col" className="px-6 py-3">
								<span className="sr-only">Edit</span>
							</th> */}
								</tr>
							</thead>
							<tbody>
								{incomeDetail.map((item) => (
									<tr key={item.order_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td scope="row" className="py-4 pl-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{item.order_id}
										</td>
										<td className="py-4">
											{item.settlement_time}
										</td>
										<td className="py-4">
											{isNaN(item.origin_price) ? 'NaN' :
												currencyFormatVND(item.origin_price)}
										</td>
										<td className="py-4">
											{isNaN(item.settlement_amount) ? 'NaN' :
												currencyFormatVND(item.settlement_amount)}
										</td>
										<td className="py-4">
											{isNaN(item.settlement_amount) ? 'NaN' :
												0.015*currencyFormatVND(item.settlement_amount)}
										</td>
										<td className="py-4 pr-4">
											{isNaN(item.origin_price) ? 'NaN' :
												currencyFormatVND(item.settlement_amount - item.origin_price)}
										</td>
										{/* <td className="px-6 py-4 text-right">
								<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
							</td> */}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)
			}
		</div>
	);
}

export default Settlement;
