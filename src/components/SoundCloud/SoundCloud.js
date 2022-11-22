// import { data } from 'autoprefixer';
// import {
//     useState,
//     useEffect,
//     useRef,
//     useCallback,
// } from 'react';

// const options = {
//     // default values displayed
//     auto_play: false,
//     hide_related: true,
//     show_comments: false,
//     show_artwork: true,
//     show_user: false,
//     show_reposts: false,
//     show_teaser: false,
//     visual: true,
// };

// function SoundCloud({ className, trackUrl }) {
//     const [iframeSC, setIframeSC] = useState({
//         __html: '',
//     });

//     useEffect(() => {
//         trackUrl = trackUrl.split('?')[0];
//         const endpoint = `http://soundcloud.com/oembed?format=json&maxheight=166&url=${trackUrl}&iframe=true&auto_play=true&callback=?`;
//         fetch(endpoint)
//             .then((data) => data.json())
//             .then((data) => {
//                 setIframeSC({__html: data.html});
//             })
//             .catch((err) => {
//                 console.log('[Fetch widget err]:', err);
//             });
//     }, []);

//     return (
//         <div
//             className={` ${className}`}
//             dangerouslySetInnerHTML={iframeSC}
//         ></div>
//     );
// }

// export default SoundCloud;
