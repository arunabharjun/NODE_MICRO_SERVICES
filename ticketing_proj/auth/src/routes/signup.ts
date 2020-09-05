import express from 'express';
const router = express.Router();

router.post('/api/users/signup', (req, res) => {
	res.json({
		User: 'Arunabh Arjun'
	});
});

export { router as signupRouter };
