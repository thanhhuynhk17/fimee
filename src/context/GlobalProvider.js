import { useState } from "react";

import { globalContext } from "./context";

function GlobalProvider({ children }) {
	const [state, setState] = useState();

	const providerValue = {
		state,
		setState
	};

	return (
		<globalContext.Provider value={providerValue}>
			{children}
		</globalContext.Provider>
	);
}

export default GlobalProvider;