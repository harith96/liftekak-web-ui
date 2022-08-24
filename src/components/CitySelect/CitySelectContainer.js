import { Col, Input, Row } from 'antd';
import { CloseCircleFilled, RightOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import 'components/styles/index.scss';
import AutoComplete from 'react-google-autocomplete';
import getFirstComponentOfSelectedTown from 'util/getFirstComponentOfSelectedTown';
import _ from 'lodash';

function CitySelectContainer({ showNextCityIcon, setFieldValue, name, value, clearFieldOnSelect, disabled, ...rest }) {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (value) setSearchValue(value);
  }, [value, setSearchValue]);

  const activeInput = (
    <div className="ant-form-item-control-input">
      <div className="ant-form-item-control-input-content">
        <span className="ant-input-affix-wrapper ant-input-affix-wrapper-input-with-clear-btn ant-input-affix-wrapper-has-feedback">
          <AutoComplete
            name={name}
            className="ant-input"
            {...rest}
            value={searchValue}
            onChange={(e) => {
              e.preventDefault();
              setSearchValue(e.target.value);
            }}
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            options={{
              types: ['administrative_area_level_3', 'administrative_area_level_4'],
              componentRestrictions: { country: 'lk' },
            }}
            onPlaceSelected={(selectedValue) => {
              const selectedTown = getFirstComponentOfSelectedTown(selectedValue.formatted_address);
              setFieldValue(name, selectedTown);
              setSearchValue(clearFieldOnSelect ? '' : selectedTown);
            }}
          />
          {(!_.isEmpty(value) || !_.isEmpty(searchValue)) && (
            <span className="ant-input-suffix">
              <span
                className="ant-input-clear-icon ant-input-clear-icon-has-suffix"
                role="button"
                tabIndex="-1"
                onClick={() => {
                  setSearchValue('');
                  setFieldValue(name, '');
                }}
                onKeyDown={() => {}}
              >
                <span role="img" aria-label="close-circle" className="anticon anticon-close-circle">
                  <CloseCircleFilled />
                </span>
              </span>
            </span>
          )}
        </span>
      </div>
    </div>
  );

  const preDefinedInput = <Input value={value} disabled />;

  return (
    <Row align="middle" wrap={false}>
      <Col flex="auto">{disabled ? preDefinedInput : activeInput}</Col>
      <Col flex="10px">{showNextCityIcon && <RightOutlined />}</Col>
    </Row>
  );
}

export default CitySelectContainer;
