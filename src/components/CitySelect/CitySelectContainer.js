import { loadCities } from 'actions';
import { Col, Row } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CitySelectContextProvider } from './CitySelectContext';
import CitySelect from './components/CitySelect';
import 'components/styles/index.scss';

function CitySelectContainer({ showNextCityIcon, setFieldValue, ...rest }) {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.data);
  const citiesFetching = useSelector((state) => state.cities.fetching);
  const getCitiesList = useCallback((engNameQuery) => dispatch(loadCities({ engNameQuery })), [dispatch]);

  return (
    <CitySelectContextProvider value={{ cities, citiesFetching, getCitiesList }}>
      <Row align="middle" wrap={false}>
        <Col flex="auto">
          <CitySelect {...rest} setFieldValue={setFieldValue} />
        </Col>
        <Col flex="10px">{showNextCityIcon && <RightOutlined />}</Col>
      </Row>
    </CitySelectContextProvider>
  );
}

export default CitySelectContainer;
