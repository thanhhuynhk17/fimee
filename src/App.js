import { useState, useEffect } from 'react';
import Card from './components/Card/Card';
import SoundCloud from './components/SoundCloud/SoundCloud';

function App() {
    const [bgUrl, setBgUrl] = useState('/img/bgne3.jpg');

    return (
        <>
            <div
                style={{ backgroundImage: `url(${bgUrl})` }}
                className={`fixed h-screen w-screen
                bg-cover bg-center
                `}
            ></div>
            <div
                className={`
                        fixed h-screen w-screen top-0 left-0 right-0
                        opacity-30
                        bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800
                        `}
            ></div>
            <div
                className={`fixed left-0 w-screen h-screen
                flex flex-col justify-center items-center backdrop-blur-sm`}
            ></div>
            <div
                className={`font-opensans h-max w-full
                touch-pan-y overflow-x-hidden overflow-y-auto scroll-smooth
                py-20 px-5
                `}
            >
                <Card
                    style={{
                        backgroundImage: `url(${bgUrl})`,
                    }}
                    className={`h-[30rem] rounded-t-[1.5rem]
                        bg-no-repeat bg-center bg-cover
                        `}
                >
                    {/* top overlay */}
                    <div
                        className={`
                        absolute h-1/6 w-full top-0 left-0 p-4 rounded-t-[1.5rem]
                        bg-gradient-to-b from-violet-900 opacity-80
                    `}
                    ></div>
                    <div
                        className={`
                        absolute h-1/3 w-full bottom-0 left-0 p-4 rounded-b-md
                        bg-gradient-to-t from-violet-900
                        flex items-end
                    `}
                    >
                        <h2
                            className={`font-bold text-3xl text-transparent
                        bg-clip-text
                        bg-gradient-to-r from-indigo-400 to-purple-400
                        drop-shadow-[2rem] shadow-white
                        `}
                        >
                            Huỳnh Tấn Thành
                        </h2>
                    </div>
                </Card>
                <SoundCloud
                    className={`
                h-[8rem] my-20
                `}
                />
                <Card
                    className={`
                h-[8rem] my-20
                `}
                />
                <Card
                    className={`
                h-[8rem] my-20
                `}
                />
                <Card
                    className={`
                h-[8rem] mt-8
                `}
                />
            </div>
        </>
    );
}

export default App;
