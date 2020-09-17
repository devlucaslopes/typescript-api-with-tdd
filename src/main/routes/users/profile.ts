import { Router } from 'express';

const profileRouter = Router();

profileRouter.get('/', (req, res) => res.json({ body: 'profile user' }));

export default profileRouter;
