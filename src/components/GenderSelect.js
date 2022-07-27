import React from 'react';
import { Select } from 'formik-antd';
import * as _ from 'lodash';

import { Gender } from 'enums';

const { Option } = Select;

const genders = _.map(Gender, (value, key) => ({ key, value }));

const renderGenders = _.map(genders, ({ key, value }) => (
  <Option value={key} key={key} id={key}>
    {value}
  </Option>
));

function GenderSelect({ isMultiSelect, id, name }) {
  return (
    <Select id={id} name={name} size="default" mode={isMultiSelect ? 'multiple' : 'default'} allowClear>
      {renderGenders}
    </Select>
  );
}

export default GenderSelect;
