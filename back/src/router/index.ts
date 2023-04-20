import { Router } from 'express';
import { RestaurantController } from '../controller';


const router = Router();

router.get('/best-in-town', RestaurantController.SearchRestaurantController);


export default router;