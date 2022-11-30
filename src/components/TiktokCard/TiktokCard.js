import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import TiktokUser from '../../helpers/TiktokUser';
import { fetchInfo } from '../../helpers/fetchUser';
import UserInfoTemplate from '../UserInfoTemplate/UserInfoTemplate';

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
                value: id,
            };
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
                data.tiktok_id,
                data.name_id,
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
                <UserInfoTemplate
                    name={user.name_id}
                    avatar={user.avatar_url}
                    insights={[
                        {
                            key: 'Following',
                            value: user.following,
                        },
                        {
                            key: 'Followers',
                            value: user.followers,
                        },
                        {
                            key: 'Likes',
                            value: user.likes,
                        },
                    ]}
                />
            )}
        </Card>
    );
}

export default TiktokCard;
