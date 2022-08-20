import React from 'react';
import { getCountryListMap } from 'country-flags-dial-code';
import { Select } from 'formik-antd';
import _ from 'lodash';
import { Col, Row, Typography } from 'antd';
import InlineSVG from './InlineSVG';

const { Option } = Select;
const { Text } = Typography;

const countryList = _.chain(getCountryListMap())
  .values()
  .filter((country) => country.dialCode)
  .orderBy((country) => country.country)
  .value();

function CountryDialCodeDropdown(props) {
  return (
    <Select {...props} optionLabelProp="label">
      {_.map(countryList, (country) => (
        <Option key={`${country.dialCode} ${country.country}`} label={country.dialCode} value={country.dialCode}>
          <Row gutter={8}>
            <Col span={2}>
              <InlineSVG image={country.flag} alt={country.country} />
            </Col>
            <Col span={4}>{country.dialCode}</Col>
            <Col span={18}>
              <Text ellipsis={{ tooltip: country.country }}>{country.country}</Text>
            </Col>
          </Row>
        </Option>
      ))}
    </Select>
  );
}

export default CountryDialCodeDropdown;
