import React, { useContext, useState } from 'react';
import { Select } from 'formik-antd';

import CitySelectContext from '../CitySelectContext';

const { Option } = Select;

function CitySelect({ name, disabled, placeholder }) {
  const [focused, setFocused] = useState(false);
  const { cities, citiesFetching, getCitiesList } = useContext(CitySelectContext);
  return (
    <Select
      showSearch
      filterOption={false}
      loading={focused && citiesFetching}
      onSearch={getCitiesList}
      id="user-first-name-input"
      name={name}
      size="default"
      disabled={disabled}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      showArrow={false}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      allowClear
    >
      {cities.map((city) => (
        <Option key={city.name_en}>{city.name_en}</Option>
      ))}
    </Select>
  );
}

export default CitySelect;
