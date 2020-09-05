import express, { Request, Response } from 'express';
const router = express.Router();
import { body } from 'express-validator';

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
		res.json({
			User: 'Arunabh Arjun'
		});
	}
);

export { router as signupRouter };
