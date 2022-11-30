import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import TiktokUser from '../../helpers/TiktokUser';
import { fetchInfo } from '../../helpers/fetchUser';

function TiktokCard({ className, tiktokId }) {
    const [id, setId] = useState(tiktokId);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (id === '') {
            console.log('Tiktok id undefined');
            return;
        }
        console.log('fetching tiktok...');
        // fetch tiktok info
        const tiktokUser = new TiktokUser();

        // define async function to fetch data
        async function SetIdAsync() {
            const endpoint = `https://scrapsocialmedia.azurewebsites.net/api/scrapsocialmedia`;
            const param = {
                key: 'tiktok_name',
                value: id
            }
            let data = await fetchInfo(endpoint, param);
            // // set Data
            // if (data.success !== true) {
            //     return;
            // }

            if (Object.keys(data).length === 0) {
                // didn't found user
                return;
            }
            data = data['tiktok_profile'];
            // set tiktok info
            tiktokUser.setInfo(
                data.name_id,
                data.username,
                data.avatar_url,
                data.following,
                data.followers,
                data.likes
            );
            setUser(tiktokUser);
        }
        // call async function
        SetIdAsync();
    }, [id]);

    return (
        <Card
            className={`
				bg-black
				drop-shadow-[-4px_-0px_1px_#28ffff]
				shadow-[4px_1px_1px_#fe2d52]
				text-slate-200
				${className}
			`}
        >
            {user !== undefined && (
                <div
                    className={`
			h-full w-full
			flex flex-col items-start
		`}
                >
                    {/* user name */}
                    <span className="text-[0.75rem] mb-1">
                        @{user.id}
                    </span>
                    {/* user info */}
                    <div
                        className={`
					w-full
					grow flex flex-row items-center
				`}
                    >
                        {/* avatar */}
                        <img
                            className={`
					w-1/4 aspect-square max-h-[5rem] object-cover
					rounded-full ring-4 ring-slate-900
				`}
                            src={`${user.avatarUrl}`}
                            alt="avatar"
                        />
                        {/* info */}
                        <div
                            className={`
					h-full
					grow flex items-center justify-evenly
				`}
                        >
                            <div
                                className={`text-center text-sm leading-[1rem]`}
                            >
                                <p className="font-bold">
                                    {user.following}
                                </p>
                                <p className="font-light text-[0.75rem]">
                                    Following
                                </p>
                            </div>
                            <div
                                className={`text-center text-sm leading-[1rem]`}
                            >
                                <p className="font-bold">
                                    {user.follower}
                                </p>
                                <p className="font-light text-[0.75rem]">
                                    Followers
                                </p>
                            </div>
                            <div
                                className={`text-center text-sm leading-[1rem]`}
                            >
                                <p className="font-bold">
                                    {user.like}
                                </p>
                                <p className="font-light text-[0.75rem]">
                                    Likes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}

export default TiktokCard;
