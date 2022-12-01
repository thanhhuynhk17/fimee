import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/soundcloud';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';

import FimeeUser from '../../helpers/FimeeUser';
import Card from './../Card/Card';
import TiktokCard from '../TiktokCard/TiktokCard';
import IgCard from '../IgCard/IgCard';

// sswjPCpuDKgz9cXAvtpTag==

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

function UserProfile() {
    let { id } = useParams();
    const [userId, setUserId] = useState(id);
    const [fimeeUser, setFimeeUser] = useState(undefined);

    useEffect(() => {
        if (userId === undefined) {
            console.log('undefined');
            return;
        }
        console.log('user id: ', userId);
        console.log('fetching user info...');
        const reqUrl = `https://docs.google.com/spreadsheets/d/1mPhVlwlSfomfrOnC8EtGdsAmydrZAPc98Op5pePlNTE/gviz/tq?tqx=out:csv&tq=Select * where J='${userId}'`;
        Papa.parse(reqUrl, {
            download: true,
            header: true,
            complete: (results) => {
                if (results.data.length === 0) {
                    console.log('id invalid');
                } else {
                    console.log('id valid');
                    const resData = results.data[0];
                    const user = new FimeeUser(
                        resData.id,
                        resData['Họ và tên'],
                        resData['Ảnh nền'],
                        resData['Tài khoản instagram'],
                        resData['Tài khoản tiktok (bỏ dấu @)'],
                        resData['Link facebook'],
                        resData[
                            'Link một bài hát từ soundcloud'
                        ]
                    );
                    setFimeeUser(user);
                }
                console.log('fetch success');
            },
        });
    }, []);

    useEffect(() => {
        if (fimeeUser === undefined) {
            console.log('fimeeUser undefined');
            return;
        }
    }, [fimeeUser]);

    return (
        <>
            {fimeeUser !== undefined && (
                <>
                    <div
                        style={{
                            backgroundImage: `url(${fimeeUser.bgUrl})`,
                        }}
                        className={`fixed h-screen w-screen
                            bg-cover bg-center
                        `}
                    />
                    <div
                        className={`
                        fixed h-screen w-screen top-0 left-0 right-0
                        opacity-70
                        bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900
					`}
                    />
                    <div
                        className={`fixed left-0 w-screen h-screen
                            flex flex-col justify-center items-center
                            backdrop-blur-sm
                        `}
                    />

                    {/* CONTENT */}
                    <div
                        className={`font-opensans h-max w-full
                            touch-pan-y overflow-x-hidden overflow-y-auto scroll-smooth
                            py-20 px-10
                        `}
                    >
                        <Card
                            style={{
                                backgroundImage: `url(${fimeeUser.bgUrl})`,
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
                                    className={`font-bold text-2xl text-transparent
					bg-clip-text 
					bg-gradient-to-r from-slate-200 to-slate-300
					drop-shadow-lg
					`}
                                >
                                    {fimeeUser.name}
                                </h2>
                            </div>
                        </Card>

                        {/* instagram */}
                        <IgCard
                            igId={
                                fimeeUser.igId !== ''
                                    ? fimeeUser.igId
                                    : ''
                            }
                            className={`
                                h-[8rem] my-20
                            `}
                        />

                        {/* tiktok */}
                        <TiktokCard
                            tiktokId={
                                fimeeUser.tiktokId !== ''
                                    ? fimeeUser.tiktokId
                                    : ''
                            }
                            className={`
                                h-[8rem] my-20
                            `}
                        />

                        {/* facebook */}
                        {/* <Card
                            className={`
                            h-[8rem] mt-8
                        `}
                        /> */}

                        {/* soundcloud */}
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
                                // light={true}
                                playing={true}
                                url={
                                    fimeeUser.soundcloudUrl
                                }
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
            )}
        </>
    );
}

export default UserProfile;
