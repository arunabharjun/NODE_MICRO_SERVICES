import express, { Request, Response } from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';

router.post(
	'/api/users/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({
				min: 4,
				max: 20
			})
			.withMessage('Password must be between 4 & 20 characters')
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// return res.status(400).json(errors.array());

			throw new RequestValidationError(errors.array());
		}

		// const { email, password } = req.body;
		console.log('Creating a user');

		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });

		/**
		 * check if email is already in use
		 */
		if (existingUser) {
			throw new BadRequestError(
				'The provided email is already associated with an existing account'
			);
		}

		/**
		 * create a new user
		 */
		const user = User.build({ email, password });
		await user.save();

		/**
		 * return the created user
		 */
		res.status(201).json(user);

		// throw new DatabaseConnectionError();
		// res.json({
		// 	info: 'Creating a user'
		// });
	}
);

export { router as signupRouter };
