import { LoadingOutlined } from '@ant-design/icons';
import { RestaurantTable } from '..';
import { Input } from 'antd';
import useRestaurantSearch from '../../hooks/useSearch';


const {Search} = Input;

const RestaurantSearch = () => {

  const {onSearch, search, isLoading, restaurants} = useRestaurantSearch(<LoadingOutlined />)
  console.log({isLoading});
  return (
    <> 
      <Search type='text' placeholder="Ciudad de méxico" onSearch={onSearch} style={{ width: '100%', marginBottom: 35 }} size="large" />
      
      <RestaurantTable isLoading={isLoading} searchPrompt={search} restaurants={restaurants}/>
    </>
  )
}

export default RestaurantSearch