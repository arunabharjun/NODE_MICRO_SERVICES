import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
	res.json({
		User: 'Arunabh Arjun'
	});
});

export { router as currentUserRouter };
