import {Router} from 'express';
const router = Router();

import {
    // create_user,
    update_user,
    // login_user,
    delete_user,
    get_user
} from '../controllers/userController'

// router.post('/register', create_user);
// router.post('/login', login_user);
router.patch('/:id', update_user);
router.delete('/:id', delete_user);
router.get('/:id', get_user)

export default router
