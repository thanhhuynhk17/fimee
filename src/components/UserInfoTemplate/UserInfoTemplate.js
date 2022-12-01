import { SocialIcon } from "react-social-icons";


export default function UserInfoTemplate({
    name,
    avatar,
    insights,
    profile_url
}) {
    return (
        <div
            className={`
			h-full w-full
			flex flex-col items-start
		`}
        >
            {/* user link */}
            <div className={`
                mb-1 w-full h-1/4
                flex justify-between items-center
            `}>
                <span className="text-[0.75rem] underline decoration-indigo-500">
                    {`@${name}`}
                </span>
                {/* social media icon */}
                <SocialIcon url={profile_url} 
                style={{width:'undefined', height:'100%', aspectRatio:1}}
                className={` aspect-square
                rounded-full ring-2 ring-slate-200
                shadow-lg
                bg-white
                animate-pulse
                `}
                />
                
            </div>
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
					rounded-full
				`}
                    src={`${avatar}`}
                    alt={`avatar-${name}`}
                />
                {/* info */}
                <div
                    className={`
					h-full
					grow flex items-center justify-evenly
				`}
                >
                    {insights.map((item) => (
                        <div
							key={item.key}
                            className={`text-center text-sm leading-[1rem]`}
                        >
                            <p className="font-bold">
                                {item.value}
                            </p>
                            <p className="font-light text-[0.75rem]">
                                {item.key}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
