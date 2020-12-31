import { paginatedResult } from './../controllers/utility';
import {Router} from 'express';
const router = Router();

import {
    // create_user,
    update_user,
    get_all_users,
    delete_user,
    get_user
} from '../controllers/userController'
import User from '../models/userModel';

// router.post('/register', create_user);
// router.post('/login', login_user);
router.patch('/:id', update_user);
router.delete('/:id', delete_user);
router.get('/:id', get_user)
router.get('/', paginatedResult(User), get_all_users)

export default router
