import React from 'react';

function Alert() {
	return (
		<div
			className={`
			p-4 mb-4 text-sm rounded-lg shadow-sm
			flex items-center justify-start
			text-blue-800 bg-blue-50
			`}
			role="alert"
		>
			<span
				className={`
				font-medium px-4 py-2 mr-2 rounded-full
				flex items-center
				bg-blue-300
				`}
			>
				Info
			</span>
			<p>Change a few things up and try submitting again.</p>
		</div>
	);
}

export default Alert;