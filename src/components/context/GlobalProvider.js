import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';

import { globalContext } from "./context";
import { PREFIX, OAUTH_URL } from './../../helpers/constants';
import HttpClient from './../../helpers/http.helper';

const http = new HttpClient();

function GlobalProvider({ children }) {
	const [originPrice, setOriginPrice] = useState({});
	const [searchParams] = useSearchParams();
	const [authCode, setAuthCode] = useState();
	const [token, setToken] = useState(sessionStorage.getItem('access_token'));

	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null
	});

	const [incomeDetail, setIncomeDetail] = useState([]);


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
			console.log('No auth code');
			toast.info("Ấn nút 'Authorization' để uỷ quyền dịch vụ");
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
				toast.error("Lỗi xác thực, ấn nút 'Authorization' để uỷ quyền mới.");
				return;
			}
			if (res.code !== 0) {
				console.log('invalid respone');
				return;
			}
			toast.success("Xác thực thành công!");
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

	const providerValue = {
		authCode, setAuthCode,
		token, setToken,
		dateRange, setDateRange,
		incomeDetail, setIncomeDetail,
		originPrice, setOriginPrice
	};

	return (
		<globalContext.Provider value={providerValue}>
			{children}
		</globalContext.Provider>
	);
}

export default GlobalProvider;