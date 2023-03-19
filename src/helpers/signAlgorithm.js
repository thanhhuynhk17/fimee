import * as CryptoJS from 'crypto-js';

// Replace secret with your own
let secret = process.env.REACT_APP_SECRET;

function objKeySort(obj) {
	let newKey = Object.keys(obj).sort();
	let newObj = {};
	for (let i = 0; i < newKey.length; i++) {
		newObj[newKey[i]] = obj[newKey[i]];
	}
	return newObj;
}

export const calSign = function (endpoint, params) {

	let sortedObj = objKeySort(params);
	let signstring = `${secret}/${endpoint}`;
	for (let key in sortedObj) {
		signstring = signstring + key + sortedObj[key];
	}
	signstring = signstring + secret;
	console.log(signstring);
	const sign = CryptoJS.HmacSHA256(signstring, secret).toString();
	return sign;
};