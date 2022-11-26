function Card({ style, className, children }) {
    return (
        <div
			style = {style}
            className={`
                relative rounded-lg 
                flex flex-col p-4
                shadow-lg touch:shadow-xl
                bg-slate-200 touch:bg-slate-300
                text-slate-900
                ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Card;
