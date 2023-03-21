import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { globalContext } from "./context";
import { PREFIX, OAUTH_URL } from './../../helpers/constants';
import HttpClient from './../../helpers/http.helper';

const http = new HttpClient();

function GlobalProvider({ children }) {
	const [alert, setAlert] = useState({
		msg: "",
		type: "",
		visible: false
	}); // info, warn, success
	const [searchParams] = useSearchParams();
	const [authCode, setAuthCode] = useState();
	const [token, setToken] = useState(sessionStorage.getItem('access_token'));

	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null
	});
	const [settls, setSettls] = useState([]);
	const [orders, setOrders] = useState({});

	useEffect(() => {
		if (!alert.visible) {
			return;
		}
		if (alert.visible) {
			setTimeout(() => {
				setAlert({
					...alert,
					visible: false
				});
			}, 3000);
		}
	}, [alert]);


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
			setAlert({
				msg: "Click 'Authorization' button first.",
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
			setAlert({
				msg: "Click 'Authorization' button first.",
				type: "error",
				visible: true
			});
			console.log('no token');
			return;
		}
		sessionStorage.setItem('access_token', token);
	}, [token]);

	const providerValue = {
		alert, setAlert,
		authCode, setAuthCode,
		token, setToken,
		dateRange, setDateRange,
		settls, setSettls,
		orders, setOrders
	};

	return (
		<globalContext.Provider value={providerValue}>
			{children}
		</globalContext.Provider>
	);
}

export default GlobalProvider;