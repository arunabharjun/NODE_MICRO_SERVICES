// index.ts

import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
	res.json({
		user: 'Arunabh Arjun'
	});
});

app.listen(3000, () => {
	console.log('[Auth] Listening on PORT 3000');
});
