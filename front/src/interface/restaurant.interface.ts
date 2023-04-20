
export interface IRestaurant {
  restaurantName  : string;
  location        : string;
  phoneNumber     : string;
  restaurantImage : string;
  link            : string;
  mapLink         : string | undefined;  
}

export interface RestaurantDTO {
  name         : string;
  direction    : string;
  phoneNumber  : string;
  img          : string; 
  url          : string;
  urlDirection : string | undefined;  
}