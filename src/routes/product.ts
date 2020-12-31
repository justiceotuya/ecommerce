import { paginatedResult } from './../controllers/utility';
import {Router} from 'express'
const router = Router();

import {
  get_all_products,
  get_one_product,
  create_product,
  delete_product,
  update_product,
  create_multiple_products
}  from '../controllers/productController'
import Product from  '../models/productModel'


/* GET users listing. */
router.get('/', paginatedResult(Product), get_all_products);
router.get('/:id', get_one_product);
router.post('/', create_product);
router.post('/multiple', create_multiple_products);
router.delete('/:id', delete_product);
// router.delete('/multiple', delete_multiple_products);
router.patch('/:id', update_product);

export default router;
