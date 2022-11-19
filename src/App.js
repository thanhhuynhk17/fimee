import { useState } from 'react';
import Card from './components/Card/Card';

function App() {
    const [bgUrl, setBgUrl] = useState('/img/bgne3.jpg');
    return (
        <>
            <div
                style={{ backgroundImage: `url(${bgUrl})` }}
                className={`font-opensans h-screen w-screen
                overflow-y-auto overflow-x-hidden scroll-smooth
                bg-cover bg-center
                px-5
                `}
            >
                <div
                    className={`
                        absolute h-screen w-full top-0 left-0
                        opacity-30
                        bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800
                        `}
                ></div>
                <div className="absolute left-0 w-screen h-full flex flex-col justify-center items-center backdrop-blur-sm"></div>
                <Card
                    style={{
                        backgroundImage: `url(${bgUrl})`,
                    }}
                    className={`h-2/3 mt-5
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
                <iframe
                    className={`
                        relative w-full mt-5
                        flex rounded-xl drop-shadow-lg
                        `}
                    scrolling="no"
                    frameborder="no"
                    height='20'
                    src={
                        'https://w.soundcloud.com/player/?url=https://soundcloud.com/nop2e4/shinratensei&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true'
                    }
                ></iframe>
            </div>
        </>
    );
}

export default App;
