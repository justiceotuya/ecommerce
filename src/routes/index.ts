import {Router,Request,  Response,Express} from 'express';
import {
  create_user,
  login_user,
} from '../controllers/userController'
const router = Router();

/* GET home page. */
router.get('/', function (req:Request, res:Response) {
  res.render('index', { title: 'Express' });
});

router.post('/register', create_user);
router.post('/login', login_user);

export default router
