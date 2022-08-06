import { Icon, Tooltip } from 'antd';
import React from 'react';

import * as i18n from '_i18n';
import GenderSelect from './GenderSelect';

function PassengerPreferenceFormikInput({ touched, error }) {
  return (
    <>
      <label id="user-passenger-preference-label" className="user-input">
        {i18n.t(`Passenger Preference`)}
        <Tooltip title={i18n.t('Gender preference for your fellow passengers.')}>
          <Icon type="info-circle" />
        </Tooltip>
      </label>
      <GenderSelect
        id="passenger-preference-input"
        name="passengerPreference"
        touched={touched}
        error={error}
        isMultiSelect
      />
    </>
  );
}

export default PassengerPreferenceFormikInput;
