import { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Order from './components/Order/Order';
import Layout from './components/Layout/Layout';
import Card from './components/Card/Card';
import { PREFIX, API_URL, OAUTH_URL } from './helpers/constants';
import HttpClient from './helpers/http.helper';

const http = new HttpClient();

function App() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [authCode, setAuthCode] = useState();
    const [token, setToken] = useState();

    const handleShopAuth = async ()=>{
        if (!authCode) {
            console.log('auth code null');
            return;
        }
        const ENDPOINT = `${PREFIX}/${OAUTH_URL}/api/v2/token/get`;
        console.log(process.env.REACT_APP_SERVICE_ID);
        const params= {
            app_key: process.env.REACT_APP_KEY,
            app_secret: process.env.REACT_APP_SECRET,
            auth_code: authCode,
            grant_type: 'authorized_code',
        };
        const header = {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
        };
        const res = await http.getWithParams(ENDPOINT, params);
        if (!res) {
            console.log('no respone');
            return;
        }
        if (res.code!==0) {
            console.log('invalid respone');
            return;
        }
        console.log(res);
        setToken(res.data.access_token);
    }

    useEffect(()=>{
        if (searchParams.get('code')) {
            setAuthCode(searchParams.get('code'));
            return;
        }
    },[])

    useEffect(()=>{
        if (!token) {
            console.log('no token');
            return;
        }
        console.log(token);
        // save token
        localStorage.setItem('access_token', token);
    },[token])

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
            {
                !token && (
                    <Card>
                        <button 
                            className={`bg-white hover:bg-gray-100 
                            text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow`}
                            onClick={handleShopAuth}
                            >
                            Get Authorization
                        </button>
                    </Card>
                )
            }


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