export default function UserInfoTemplate({
    name,
    avatar,
    insights,
}) {
    return (
        <div
            className={`
			h-full w-full
			flex flex-col items-start
		`}
        >
            {/* user name */}
            <span className="text-[0.75rem] mb-1">
                {`@${name}`}
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
