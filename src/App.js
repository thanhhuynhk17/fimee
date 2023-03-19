import { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import GlobalProvider from './context/GlobalProvider';

import Order from './components/Order/Order';
import Layout from './components/Layout/Layout';
import Card from './components/Card/Card';
import { PREFIX, API_URL, OAUTH_URL } from './helpers/constants';
import HttpClient from './helpers/http.helper';
import Alert from './components/Alert/Alert';

const http = new HttpClient();

function App() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [authCode, setAuthCode] = useState();
	const [token, setToken] = useState(sessionStorage.getItem('access_token'));

	const handleShopAuth = async () => {
		if (!authCode) {
			console.log('auth code null');
			return;
		}
		const ENDPOINT = `${PREFIX}/${OAUTH_URL}/api/v2/token/get`;
		const params = {
			app_key: process.env.REACT_APP_KEY,
			app_secret: process.env.REACT_APP_SECRET,
			auth_code: authCode,
			grant_type: 'authorized_code',
		};
		const res = await http.getWithParams(ENDPOINT, params);
		if (!res) {
			console.log('no respone');
			return;
		}
		if (res.code !== 0) {
			console.log('invalid respone');
			return;
		}
		console.log(res);
		setToken(res.data.access_token);
	};

	useEffect(() => {
		if (searchParams.get('code')) {
			setAuthCode(searchParams.get('code'));
		}
	}, []);

	useEffect(() => {
		if (token === null) {
			console.log('no token');
			return;
		}
		// save token
		sessionStorage.setItem('access_token', token);
	}, [token]);

	return (
		<GlobalProvider>
			<Layout>
				{/* Navbar */}
				<div
					className={`
				h-16 w-full shadow-md
				bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800
				`}
				/>

				{/* Contents */}
				<div
					className={`
				flex-1 overflow-hidden
				px-4 md:px-40 lg:px-80 text-white bg-blend-normal
				py-10
				`}
				>
					{/* Authorization */}
					{
						token === null && (
							<div className="flex items-center justify-center pb-2">
								<button
									className={`bg-white hover:bg-gray-100 
								font-semibold py-2 px-4
								border border-gray-200 rounded shadow-sm
								w-full md:w-60 text-gray-600
								`}
									onClick={handleShopAuth}
								>
									Get Authorization
								</button>
							</div>
						)
					}
					<Alert />
					<Routes>
						<Route path="/" element={<Order token={token} />} />
						<Route path="/card" element={<Card />} />
					</Routes>
				</div>
			</Layout>
		</GlobalProvider>
	);
}

export default App;
