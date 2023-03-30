import { useEffect, useContext } from 'react';
import { globalContext } from './components/context/context';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse';

import Layout from './components/Layout/Layout';
import Settlement from './components/Settlement/Settlement';


function App() {
	const { setOriginPrice } = useContext(globalContext);

	useEffect(() => {
		// const reqUrl = `https://docs.google.com/spreadsheets/d/1mPhVlwlSfomfrOnC8EtGdsAmydrZAPc98Op5pePlNTE/gviz/tq?tqx=out:csv&tq=Select * where J='${userId}'`;
		// get origin price
		const reqUrl = `https://docs.google.com/spreadsheets/d/137-YXgfnhzX2__EHxHQ5EvQQVZHnG_ChACkmr0Y6Z1I/gviz/tq?tqx=out:csv`;
		Papa.parse(reqUrl, {
			download: true,
			header: true,
			complete: (results) => {
				toast.success('Cập nhật dữ liệu giá gốc thành công.');
				console.log(results.data.length);
				let priceObj = {};
				results.data.map(item => priceObj[item.ID] = parseInt(item['Giá gốc'].replace(/[^0-9,-]+/g, "")));
				console.log('Gia goc', priceObj);
				setOriginPrice(priceObj);
			},
			error: (error) => {
				toast.error('Lỗi khi lấy dữ liệu giá gốc. Kiểm tra lại file Google Sheet!');
			}
		});
	}, []);

	return (
		<Layout>
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme="light"
			/>
			{/* Navbar */}
			{/* <div
				className={`
				h-16 w-full shadow-md
				bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800
				`}
			/> */}

			{/* Contents */}
			<div
				className={`
				flex-1 text-white
				px-4 md:px-40 lg:px-60 py-10
				`}
			>
				{/* Authorization */}
				<div className="flex items-center justify-center md:justify-start mb-5">
					<a href={`https://services.tiktokshop.com/open/authorize?service_id=${process.env.REACT_APP_SERVICE_ID}`}
						className="text-white 
						bg-indigo-500 
						hover:bg-indigo-400 
						font-medium rounded-lg text-sm px-5 py-2.5 text-center
						transition ease-in-out duration-300"
					>
						Authorization
					</a>
				</div>
				<Routes className="">
					{/* <Route path="/" element={<Order />} /> */}
					<Route path="/" element={<Settlement />} />
				</Routes>
			</div>
		</Layout>
	);
}

export default App;
