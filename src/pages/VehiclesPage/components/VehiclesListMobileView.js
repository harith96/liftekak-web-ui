import { CarOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import React, { useContext } from 'react';
import VehiclesPageContext from '../VehiclesPageContext';

const getVehicleDescription = (vehicle) =>
  `Type - ${vehicle.type} | Model - ${vehicle.brand} ${vehicle.model} | Fuel type - ${
    vehicle.fuelType || ''
  } | Color - ${vehicle.color}`;

function VehiclesListMobileView() {
  const { vehicles, isVehiclesFetching, onDelete, onMakeDefault } = useContext(VehiclesPageContext);
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={null}
      dataSource={vehicles}
      loading={isVehiclesFetching}
      className="vehicles-list-container"
      renderItem={(vehicle) => (
        <List.Item
          actions={[
            <button
              id="batch-merchandiser-approve"
              type="button"
              className="ant-btn btn red-action-btn"
              onClick={() => onDelete(vehicle)}
              disabled={vehicle.isDefaultVehicle}
            >
              <i className="fi flaticon-delete" />
              <span>Delete</span>
            </button>,
            <button
              id="batch-merchandiser-approve"
              type="button"
              className="ant-btn btn yellow-action-btn"
              onClick={() => onMakeDefault(vehicle)}
              disabled={vehicle.isDefaultVehicle}
            >
              <i className="fi flaticon-star" />
              <span>Make efault</span>
            </button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              vehicle.isDefaultVehicle ? (
                <Avatar icon={<StarOutlined />} style={{ backgroundColor: '#f1c40f' }} />
              ) : (
                <Avatar icon={<CarOutlined />} />
              )
            }
            title={vehicle.registrationNo || ''}
            description={getVehicleDescription(vehicle)}
          />
        </List.Item>
      )}
    />
  );
}

export default VehiclesListMobileView;
