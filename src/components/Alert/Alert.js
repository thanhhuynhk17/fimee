import React from 'react';
import { useState, useEffect } from 'react';
const alertDict = {
	info: {
		UI: "text-blue-800 bg-blue-50",
		label: "Info",
		labelUI: "bg-blue-200",
	},
	error: {
		UI: "text-red-800 bg-red-50",
		label: "Error",
		labelUI: "bg-red-200",
	},
	success: {
		UI: "text-green-800 bg-green-50",
		label: "Success",
		labelUI: "bg-green-200",
	},
};

function Alert({ msg, type, visible }) {
	const [localVisible, setLocalVisible] = useState(true);

	return localVisible && visible && (
		<div
			className={`
			fixed bottom-4 right-4
			md:bottom-10 md:right-10
			p-4 mb-4 text-sm rounded-lg shadow-sm
			flex items-center justify-start 
			hover:opacity-90 hover:cursor-pointer
			${alertDict[type].UI} 
			`}
			onClick={() => setLocalVisible(false)}
			role="alert"
		>
			<span
				className={`
				font-medium px-2 py-1 mr-2 rounded-full
				flex items-center 
				${alertDict[type].labelUI}
				`}
			>
				{alertDict[type].label}
			</span>
			<p>{msg}</p>
		</div>
	);
}

export default Alert;