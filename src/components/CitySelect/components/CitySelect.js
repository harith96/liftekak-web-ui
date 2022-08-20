import React, { useCallback, useContext, useState } from 'react';
import { Select } from 'antd';
import { Select as FormikSelect } from 'formik-antd';

import CitySelectContext from '../CitySelectContext';

const { Option } = Select;

function CitySelect({ setFieldValue, name, ...rest }) {
  const [focused, setFocused] = useState(false);
  const { cities, citiesFetching, getCitiesList } = useContext(CitySelectContext);

  const onChange = useCallback((value) => setFieldValue(name, value), [setFieldValue, name]);

  const citiesOptions = cities.map((city) => <Option key={city.name_en}>{city.name_en}</Option>);

  return setFieldValue ? (
    <Select
      showSearch
      filterOption={false}
      loading={focused && citiesFetching}
      onSearch={getCitiesList}
      id="user-first-name-input"
      name={name}
      {...rest}
      defaultActiveFirstOption={false}
      showArrow={false}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      allowClear
      value={null}
      onChange={onChange}
    >
      {citiesOptions}
    </Select>
  ) : (
    <FormikSelect
      showSearch
      filterOption={false}
      loading={focused && citiesFetching}
      onSearch={getCitiesList}
      id="user-first-name-input"
      name={name}
      {...rest}
      defaultActiveFirstOption={false}
      showArrow={false}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      allowClear
    >
      {citiesOptions}
    </FormikSelect>
  );
}

export default CitySelect;
