
function Layout({ className, children }) {
	return (
		<div
			className={`
			flex flex-col
			h-screen w-screen overflow-hidden overflow-y-auto
			scroll-smooth hover:scroll-auto
			bg-gray-200
			`}
		>
			{children}
		</div>
	);
}

export default Layout;