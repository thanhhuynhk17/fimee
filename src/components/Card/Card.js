function Card({ style, className, children }) {
    return (
        <div
			style = {style}
            className={`relative flex flex-col p-6 rounded-[1.5rem] rounded-b-md 
            shadow-lg hover:shadow-xl 
			bg-gray-800 hover:bg-gray-700 text-white
			${className}`}
        >
            {children}
        </div>
    );
}

export default Card;
