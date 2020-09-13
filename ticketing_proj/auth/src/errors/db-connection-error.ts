import { ValidationError } from 'express-validator';

export class DBConnectionError extends Error {
	reason = 'Error connecting to DB';
	constructor() {
		super();
		// Only because we are extending a built in class
		Object.setPrototypeOf(this, DBConnectionError.prototype);
	}
}
