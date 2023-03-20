import * as CryptoJS from 'crypto-js';

export class SignCalculator {
	#secret;

	constructor() {
		this.#secret = process.env.REACT_APP_SECRET;
	}
	objKeySort(obj) {
		let newKey = Object.keys(obj).sort();
		let newObj = {};
		for (let i = 0; i < newKey.length; i++) {
			newObj[newKey[i]] = obj[newKey[i]];
		}
		return newObj;
	}

	calcSignature(endpoint, params) {
		let sortedObj = this.objKeySort(params);
		let signstring = `${this.#secret}/${endpoint}`;
		for (let key in sortedObj) {
			signstring = signstring + key + sortedObj[key];
		}
		signstring = signstring + this.#secret;
		const sign = CryptoJS.HmacSHA256(signstring, this.#secret).toString();
		return sign;
	}
}