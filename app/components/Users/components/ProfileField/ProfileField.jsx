import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './ProfileField.styl';

class ProfileField extends PureComponent {
  render() {
    const { label, value } = this.props;
    return (
      <div className={s.ProfileField}>
        <span className={s.ProfileFieldLabel}>
          {label}
:
          {' '}
        </span>
        <span className={s.ProfileFieldValue}>{value}</span>
      </div>
    );
  }
}

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ProfileField;
