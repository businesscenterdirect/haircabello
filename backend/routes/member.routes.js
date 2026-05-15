import express from 'express';
const router = express.Router();
import memberController from '../controllers/member.controller.js';

router.get('/', memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);
router.patch('/:id', memberController.updateMember);
router.post('/:id/cancel', memberController.cancelSubscription);
router.post('/:id/note', memberController.addMemberNote);

export default router;
