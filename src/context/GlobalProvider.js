import { useState, useEffect } from "react";

import { globalContext } from "./context";

function GlobalProvider({ children }) {
	const [alert, setAlert] = useState({
		msg: "",
		type: "",
		visible: false
	}); // info, warn, success

	useEffect(() => {
		if (!alert.visible) {
			return;
		}
		if (alert.visible) {
			setTimeout(() => {
				setAlert({
					...alert,
					visible: false
				});
			}, 3000);
		}
	}, [alert]);

	const providerValue = {
		alert,
		setAlert
	};

	return (
		<globalContext.Provider value={providerValue}>
			{children}
		</globalContext.Provider>
	);
}

export default GlobalProvider;