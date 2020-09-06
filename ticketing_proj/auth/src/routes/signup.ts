import express, { Request, Response } from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';

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
	(req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const { email, password } = req.body;
		console.log('Creating a user');
		res.json({
			info: 'Creating a user'
		});
	}
);

export { router as signupRouter };
