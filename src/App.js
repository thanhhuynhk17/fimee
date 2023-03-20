import { Routes, Route } from 'react-router-dom';

import Order from './components/Order/Order';
import Layout from './components/Layout/Layout';

function App() {

	return (
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
				<Routes>
					<Route path="/" element={<Order />} />
					{/* <Route path="/card" element={<Card />} /> */}
				</Routes>
			</div>
		</Layout>
	);
}

export default App;
