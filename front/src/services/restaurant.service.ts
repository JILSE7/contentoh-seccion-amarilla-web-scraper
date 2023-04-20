import axios from "axios";
import { IApiResponse, RestaurantDTO } from "../interface";

const LOCAL_URL='http://localhost:5002'

export const searchRestaurantService = async(queryLocation: string): Promise<IApiResponse<RestaurantDTO[]>> => {
  const response = await axios.get<IApiResponse<RestaurantDTO[]>>(`${LOCAL_URL}/api/restaurant/best-in-town/`, {
      headers: {
        'Content-Type': 'application/json', 
      },
      params: {queryLocation}
  });

  return response.data
}