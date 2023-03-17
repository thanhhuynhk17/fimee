import { useState, useEffect } from "react";
import Card from "../Card/Card";
import HttpClient from "../../helpers/http.helper";

const http = new HttpClient();


function Order({token}) {

	useEffect(()=>{
		if (token === null) {
			return;
		}
		// get order details
		
	},[token])

	return (
		<div className="h-full ">
		{
			token && (
				<Card 
				className={`md:rounded-sm h-max`}
				>
					<p className="text-ellipsis hover:text-clip overflow-hidden">{token}</p>
				</Card>
			)
		}

		</div>
	)
}

export default Order