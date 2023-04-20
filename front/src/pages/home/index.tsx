import { CoffeeOutlined } from '@ant-design/icons'
import { Header } from "../../components";
import RestaurantSearch from "../../components/RestaurantSearch";

const HomePage = () => {


  return (
    <>
    <Header />
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 100 }}>
        <h1 style={{marginBottom: 35}}>Encontremos el mejor restaurante <CoffeeOutlined style={{color: '#33b6dd'}} /> </h1>
        <h3 style={{marginBottom: 35}}>Busca el nombre de una ciudad </h3>
        <RestaurantSearch />
    </div>
    </>
  )
}

export default HomePage