import { FC } from "react";
import { Avatar, Skeleton, Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import { IRestaurant } from "../../interface";
import emptyLogo from '../../assets/restaurant.png'

import 'animate.css';
import useMounted from "../../hooks/useMonted";

interface IProps {
  searchPrompt: string,
  restaurants: IRestaurant[],
  isLoading: boolean
}

const columns: ColumnsType<IRestaurant> = [
  {
    title: 'Logo',
    dataIndex: 'restaurantImage',
    key: 'restaurantImage',
    align: 'center',
    ellipsis: true,
    render: (url) => <Avatar size={60} src={<img src={url ?? emptyLogo} alt="avatar" />} />
  },
  {
    title: 'Nombre del restaurante',
    dataIndex: 'restaurantName',
    key: 'name',
    sorter: (a, b) => a?.restaurantName.localeCompare && a.restaurantName.localeCompare(b.restaurantName),
    ellipsis: true,
    render: (name, { link }) => {

      return (<a href={link} target="_blank">{name}</a>)
    }
  },
  {
    title: 'Dirección',
    dataIndex: 'location',
    key: 'directions',
    sorter: (a, b) => a?.location.localeCompare && a.location.localeCompare(b.location),
    render: (direction, { mapLink }) => mapLink ? <a href={mapLink} target="_blank">{direction}</a> : <p>{direction}</p>
  },
  {
    title: 'Numero telélefonico',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    align: 'center',
    sorter: (a, b) => a?.phoneNumber.localeCompare && a.phoneNumber.localeCompare(b.phoneNumber),
    ellipsis: true,
  }
];


const RestaurantTable: FC<IProps> = ({ searchPrompt, restaurants, isLoading }) => {

  const isFirstMount = useMounted()


  if (isFirstMount.current) return null

  return (
    <>

      <h1 style={{ marginBottom: 35, textAlign: 'center' }}>{isLoading ? 'Estamos tratando de obtener los mejores resultados' : `Mejores Restaurantes en: ${searchPrompt}`}</h1>
      {
        !isFirstMount.current && isLoading 
          ?
            (<Skeleton paragraph={{rows: 10, width: 350}} active={true} />)
          :
            restaurants.length === 0 
            ?
            (<p>Sin coincidencias</p>)
            :
            (<Table className="animate__animated animate__fadeIn" rowClassName={(_, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} columns={columns} dataSource={restaurants} />)
      }
    </>
  )
}

export default RestaurantTable