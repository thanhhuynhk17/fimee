function Card({ style, className, children }) {
    return (
        <div
			style = {style}
            className={`
                relative h-full w-full
                flex flex-col p-4
                shadow-sm rounded-lg
                bg-white touch:bg-slate-300
                text-gray-600 my-2
                ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Card;
