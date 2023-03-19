import React from 'react';

function Layout({ className, children }) {
	return (
		<div
			className={`
			h-screen w-screen overflow-hidden overflow-y-auto
			scroll-smooth hover:scroll-auto
			bg-gray-200/50
			`}
		>
			{children}
		</div>
	);
}

export default Layout;