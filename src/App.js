import { useState, useEffect } from 'react';
import Card from './components/Card/Card';
import ReactPlayer from 'react-player/soundcloud';

const SC_options = {
    // default values displayed
    auto_play: true,
    hide_related: true,
    show_comments: true,
    show_artwork: true,
    show_user: true,
    show_reposts: true,
    show_teaser: false,
    visual: true,
};

function App() {
    const [bgUrl, setBgUrl] = useState('/img/bgne.jpg');

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
                        opacity-20
                        bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
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
                        bg-no-repeat bg-center bg-cover p-0
                        `}
                >
                    {/* top overlay */}
                    {/* <div
                        className={`
                        absolute h-1/6 w-full top-0 left-0 p-4 rounded-t-[1.5rem]
                        bg-gradient-to-b from-purple-900 opacity-80
                    `}
                    ></div> */}

                    {/* bottom-top overlay */}
                    <div
                        className={`
                        absolute h-1/2 w-full bottom-0 left-0 p-4 rounded-b-md
                        bg-gradient-to-t from-slate-900
                        flex items-end
                    `}
                    >
                        <h2
                            className={`font-bold text-3xl text-transparent
                        bg-clip-text 
                        bg-gradient-to-r from-slate-200 to-slate-300
                        drop-shadow-lg
                        `}
                        >
                            Huỳnh Tấn Thành
                        </h2>
                    </div>
                </Card>


                <Card
                    className={`
                h-[8rem] my-20
                `}
                />
                
                {/* <Card
                    className={`
                h-[8rem] my-20
                `}
                />
                <Card
                    className={`
                h-[8rem] mt-8
                `}
                /> */}

                <Card
                    className={`
                w-full aspect-square
                my-20 px-0 py-0 
                `}
                >
                    <ReactPlayer
                        style={{
                            borderRadius: '0.5rem',
                        }}
                        width={'100%'}
                        height={'100%'}
                        light={true}
                        playing={true}
                        url="https://soundcloud.com/hoanglongnger/khong-ten-1"
                        config={{
                            soundcloud: {
                                options: SC_options,
                            },
                        }}
                        className={'rounded-lg '}
                    />
                </Card>
            </div>
        </>
    );
}

export default App;
