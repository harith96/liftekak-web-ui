import { Icon, Table, Tooltip } from 'antd';
import React, { useCallback, useContext, useState } from 'react';
import ReactResizeDetector from 'react-resize-detector';

import { DEFAULT_PAGE_SIZE } from 'util/constants';
import VehiclesPageContext from '../VehiclesPageContext';

const getColumns = (onDelete, onMakeDefault) => [
  {
    title: 'Registration Number',
    dataIndex: 'registrationNo',
    key: 'registrationNo',
    render: (text, record) =>
      record.isDefaultVehicle ? (
        <div id={`rides-table-ride-${text}`} className="link-div" aria-hidden="true">
          <Tooltip title="Default vehicle for your rides.">
            <Icon type="star" theme="filled" />
            {text}
          </Tooltip>
        </div>
      ) : (
        text
      ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: 'Fuel Type',
    dataIndex: 'fuelType',
    key: 'fuelType',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
  },
  {
    title: 'Passenger Seat Count',
    dataIndex: 'passengerSeatCount',
    key: 'passengerSeatCount',
  },
  {
    title: '',
    width: '300px',
    render: (_0, record) => (
      <div className="hover-actions-panel">
        <div className=" grid-hover-panel">
          <Tooltip title={record.isDefaultVehicle ? 'Cannot edit default vehicle' : null}>
            <div className="horizontal-container">
              <button
                id="batch-merchandiser-approve"
                type="button"
                className="ant-btn btn red-action-btn"
                onClick={() => onDelete(record)}
                disabled={record.isDefaultVehicle}
              >
                <i className="fi flaticon-delete" />
                <span>Delete</span>
              </button>

              <button
                id="batch-merchandiser-approve"
                type="button"
                className="ant-btn btn yellow-action-btn"
                onClick={() => onMakeDefault(record)}
                disabled={record.isDefaultVehicle}
              >
                <i className="fi flaticon-star" />
                <span>Make efault</span>
              </button>
            </div>
          </Tooltip>
        </div>
      </div>
    ),
    className: 'hover-actions',
  },
];

function VehiclesList() {
  const [gridScrollHeight, setGridScrollHeight] = useState('70vh');
  const { vehicles, isVehiclesFetching, onDelete, onMakeDefault } = useContext(VehiclesPageContext);

  const onResize = useCallback(
    (_0, height) => {
      setGridScrollHeight(height - 150);
    },
    [setGridScrollHeight]
  );

  return (
    <ReactResizeDetector handleHeight onResize={onResize}>
      <div id="rewards-batches-table-panel" className="grid-panel">
        <Table
          id="rides-list-table"
          className="costing-batches-table"
          loading={isVehiclesFetching}
          dataSource={vehicles}
          columns={getColumns(onDelete, onMakeDefault)}
          pagination={{ pageSize: DEFAULT_PAGE_SIZE, hideOnSinglePage: true }}
          scroll={{ x: '100%', y: gridScrollHeight }}
        />
      </div>
    </ReactResizeDetector>
  );
}

export default VehiclesList;
