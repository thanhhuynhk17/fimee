import { Routes, Route } from 'react-router-dom';
import Order from './components/Order/Order';
import Layout from './components/Layout/Layout';
import Card from './components/Card/Card';
import { API_URL, OAUTH_URL } from './helpers/constants';
import HttpClient from './helpers/http.helper';

const http = new HttpClient();

function App() {

    const handleOAuth = async ()=>{
        console.log(process.env.REACT_APP_SERVICE_ID);
        const params= {
            service_id: process.env.REACT_APP_SERVICE_ID,
            state: `${Date.now()}state`
        };
        const header = {

        };
        const res = await http.getWithParams(OAUTH_URL,params,header);
        console.log(res);
    }

    return (
        <Layout
            className={`
            bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900
            container md:px-40 h-screen text-white bg-blend-normal
            `}
        >
            {/* Navbar */}
            <div className='pb-20'></div>

            {/* Authorization */}
            <Card>
                <button 
                    className={`bg-white hover:bg-gray-100 
                    text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow`}
                    onClick={handleOAuth}
                    >
                    Get Authorization
                </button>
            </Card>

            {/* Contents */}
            <div className='mt-2'>
                <Routes>
                    <Route path="/" element={<Order />} />
                    <Route path="/card" element={<Card />} />
                </Routes>
            </div>

        </Layout>
    );
}

export default App;