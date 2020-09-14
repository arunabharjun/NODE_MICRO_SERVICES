import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/req-validation-error';
import { DBConnectionError } from '../errors/db-connection-error';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof RequestValidationError) {
		const formattedErrors = err.errors.map((error) => {
			return {
				message: error.msg,
				field: error.param
			};
		});
		res.status(400).send({ errors: formattedErrors });
	}

	if (err instanceof DBConnectionError) {
		return res.status(500).send({
			errors:
				[
					{ message: err.reason }
				]
		});
		// console.log('Handling this error as a DBConnectionError error');
	}

	res.status(400).json({
		message: err.message
	});
};
