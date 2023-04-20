import { IRestaurant, RestaurantDTO } from "../interface";


export const restaurantAdapter = (restaurant: RestaurantDTO): IRestaurant => ({
  restaurantName  : restaurant.name,
  location        : restaurant.direction,
  phoneNumber     : restaurant.phoneNumber,
  restaurantImage : restaurant.img,
  link            : restaurant.url,
  mapLink         : restaurant.urlDirection 
});