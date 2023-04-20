import { ReactNode, useCallback, useRef, useState } from "react";
import { notification } from "antd";
import { searchRestaurantService } from "../services/restaurant.service";
import { IRestaurant } from "../interface";
import { restaurantAdapter } from "../adapters";


interface IState {
  search: string;
  restaurants: IRestaurant[];
}

const initialState: IState = { restaurants: [], search: '' }


const useRestaurantSearch = (LoadingIcon: ReactNode) => {
  const [{restaurants, search }, setRestaurantSearch] = useState<IState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const prevSearchRef = useRef<string>('');

  const onSearch = useCallback(async (location: string) => {
    const locationTrim = location.trim()
    try {
      if (prevSearchRef.current === location || !locationTrim) return;

      prevSearchRef.current = location;

      setRestaurantSearch((state) => ({ ...state, search: locationTrim }));

      setIsLoading(true);

      notification.info({ message: `Buscando los mejores restaurantes en ${locationTrim}`, duration: 0, icon: LoadingIcon });
      
      const {data} = await searchRestaurantService(locationTrim);
     
      notification.destroy();

      const restaurants = data.map(restaurant => restaurantAdapter(restaurant));

      setRestaurantSearch((state) => ({ ...state, restaurants }));

      notification.success({message: `Excelente, hemos encontramos los siguientes restaurantes ubicados en '${locationTrim}'`})
      
    } catch (e: any) {
      notification.destroy();
      notification.error({ message: e.response?.data.error ?? `No se pudo obtener los resultados con ${locationTrim}` });
      setRestaurantSearch((state) => ({ ...state, restaurants: [] }));
  
    } finally {
      setIsLoading(false)
    }
  }, [prevSearchRef, LoadingIcon]);




  return {
    onSearch,
    search,
    restaurants,
    isLoading,
  }
}

export default useRestaurantSearch