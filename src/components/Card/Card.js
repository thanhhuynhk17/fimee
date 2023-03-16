function Card({ style, className, children }) {
    return (
        <div
			style = {style}
            className={`
                relative
                flex flex-col p-4
                shadow-md
                bg-white touch:bg-slate-300
                text-slate-900
                ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Card;
