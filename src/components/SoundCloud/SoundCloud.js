import {
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';

const soundUrl =
    'https://soundcloud.com/nop2e4/shinratensei';
const options = {
    // default values displayed
    auto_play: false,
    hide_related: true,
    show_comments: false,
    show_artwork: true,
    show_user: false,
    show_reposts: false,
    show_teaser: false,
    visual: true,
};

function SoundCloud({ className }) {
    // const iframeRef = useRef(null); // ref => { current: null }
    // const [widgetSC, setWidgetSC] = useState(null);

    // useEffect(() => {
    //     if (widgetSC === null) {
    //         const widgetID = iframeRef.current.id;
    //         const widget = window.SC.Widget(widgetID);
    //         setWidgetSC(widget);
    //     }
    // }, []);

    // useEffect(() => {
    //     if (widgetSC === null) {
    //         return;
    //     }
    //     const handleWidgetLoaded = () => {
    //         console.log('loaded', widgetSC);
	// 		widgetSC.play();
    //     };
    //     widgetSC.bind(
    //         window.SC.Widget.Events.READY,
    //         handleWidgetLoaded
    //     );

    //     return () => {
    //         widgetSC.unbind(window.SC.Widget.Events.READY);
    //         console.log('unbind');
    //     };
    // }, [widgetSC]);

    return (
        <iframe
            // id="sc-widget"
            title="iframe soundcloud ne"
            className={`
				flex rounded-lg drop-shadow-lg
				${className}
				`}
            allow="autoplay"
            width="100%"
            scrolling="no"
            frameBorder="no"
            src={`https://w.soundcloud.com/player/?url=${soundUrl}&auto_play=1&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true&show_playcount=true&mute=1`}
        ></iframe>
    );
}

export default SoundCloud;
