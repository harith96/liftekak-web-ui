import { Icon, Tooltip } from 'antd';
import { Form } from 'formik-antd';
import React from 'react';

import * as i18n from '_i18n';
import GenderSelect from './GenderSelect';

function PassengerPreferenceFormikInput() {
  return (
    <>
      <label id="user-passenger-preference-label" className="user-input">
        {i18n.t(`Passenger Preference`)}
        <Tooltip title={i18n.t('Gender preference for your fellow passengers.')}>
          <Icon type="info-circle" />
        </Tooltip>
      </label>
      <Form.Item name="passengerPreference">
        <GenderSelect id="passenger-preference-input" name="passengerPreference" isMultiSelect />
      </Form.Item>
    </>
  );
}

export default PassengerPreferenceFormikInput;
