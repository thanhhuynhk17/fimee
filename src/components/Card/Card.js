function Card({ style, className, children }) {
    return (
        <div
			style = {style}
            className={`relative flex flex-col p-6 rounded-lg 
            shadow-lg touch:shadow-xl
            bg-slate-200 touch:bg-slate-300
           text-white
			${className}`}
        >
            {children}
        </div>
    );
}

export default Card;
