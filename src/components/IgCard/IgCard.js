import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import IgUser from './../../helpers/IgUser';
import { fetchInfo } from '../../helpers/fetchUser';
import UserInfoTemplate from './../UserInfoTemplate/UserInfoTemplate';

function IgCard({ className, igId }) {
    const [id, setId] = useState(igId);
    const [user, setUser] = useState(undefined);

    // useEffect(() => {
    //     if (id === '') {
    //         console.log('Ig id undefined');
    //         return;
    //     }
    //     console.log('fetching tiktok...');
    //     // fetch tiktok info
    //     const igUser = new IgUser();

    //     // define async function to fetch data
    //     async function SetIdAsync() {
    //         const endpoint = `https://scrapsocialmedia.azurewebsites.net/api/scrapsocialmedia`;
    //         const param = {
    //             key: 'ig_name',
    //             value: id,
    //         };
    //         let data = await fetchInfo(endpoint, param);
    //         // // set Data
    //         // if (data.success !== true) {
    //         //     return;
    //         // }

    //         if (Object.keys(data).length === 0) {
    //             // didn't found user
    //             return;
    //         }
    //         data = data['ig_profile'];
    //         console.log(data);
    //         // set ig info
    //         igUser.setInfo(
	// 			data.ig_id,
    //             data.name,
    //             data.avatar_url,
    //             data.following,
    //             data.followers,
    //             data.posts
    //         );

	// 		// this.id = '';
	// 		// this.name = '';
	// 		// this.avatarUrl = '';
	// 		// this.following = -1;
	// 		// this.followers = -1;
	// 		// this.post = -1;
    //         setUser(igUser);
    //     }
    //     // call async function
    //     SetIdAsync();
    // }, [id]);

    return (
        <Card
            className={`
		h-[8rem] my-20 p-[4px]
		bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]
		from-[#fcb045] via-[#fd1d1d] to-[#833ab4] 
	`}
        >
            <Card className={'h-full w-full rounded-md'}>
                {
					user !== undefined && (
						<UserInfoTemplate name={user.name} avatar={user.avatar_url}
							insights={[
								{
									key:'posts',
									value:user.posts
								},
								{
									key:'followers',
									value:user.followers
								},
								{
									key:'following',
									value:user.following
								},
							]}/>
					)
				}
            </Card>
        </Card>
    );
}

export default IgCard;
