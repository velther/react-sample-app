import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { USER_SHAPE } from 'constants/shapes';

import Loader from 'common/Loader';
import ProfileField from '../ProfileField';

import s from './UserProfile.styl';

class UserProfile extends PureComponent {
  render() {
    const { user, className } = this.props;
    if (!user) {
      return <Loader />;
    }

    const { address, company } = user;

    return (
      <div className={cn(s.Profile, className)}>
        <div className={s.Part}>
          <ProfileField label="name" value={user.name} />
          <ProfileField label="username" value={user.username} />
          <ProfileField label="email" value={user.email} />
          <ProfileField label="phone" value={user.phone} />
          <ProfileField label="website" value={user.website} />
        </div>

        <div className={s.Part}>
          <div className={s.Title}>address</div>
          <ProfileField label="street" value={address.street} />
          <ProfileField label="suite" value={address.suite} />
          <ProfileField label="city" value={address.city} />
          <ProfileField label="zipcode" value={address.zipcode} />
        </div>

        <div className={s.Part}>
          <div className={s.Title}>company</div>
          <ProfileField label="name" value={company.name} />
          <ProfileField label="catchPhrase" value={company.catchPhrase} />
          <ProfileField label="bs" value={company.bs} />
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: USER_SHAPE,
  className: PropTypes.string,
};

export default UserProfile;
