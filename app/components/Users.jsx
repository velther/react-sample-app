import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerShape } from 'react-router/lib/PropTypes';
import * as actions from '../actions';
import { branch } from '../baobab-helper';

import Loader from './Loader';
import Posts from './Posts';
import Albums from './Albums';

import s from './Users.styl';

function ProfileField({ label, value }) {
    return (
        <div className={s.ProfileField}>
            <span className={s.ProfileFieldLabel}>{label}: </span>
            <span className={s.ProfileFieldValue}>{value}</span>
        </div>
    );
}

ProfileField.prototype.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

class Users extends Component {
    static fetchData() {
        actions.loadUsers();
        actions.loadPosts();
        actions.loadAlbums();
    }

    render() {
        const { params, usersById } = this.props;
        const user = usersById[params.userId];

        return (
            <div className={s.Users}>
                {this.renderUserProfile(user)}
                {this.renderPosts(user)}
                {this.renderAlbums(user)}
            </div>
        );
    }

    renderUserProfile(user) {
        if (!user) {
            return <Loader />;
        }
        return (
            <div className={s.Profile}>
                <div className={s.ProfilePart}>
                    <ProfileField label={'name'} value={user.name} />
                    <ProfileField label={'username'} value={user.username} />
                    <ProfileField label={'email'} value={user.email} />
                    <ProfileField label={'phone'} value={user.phone} />
                    <ProfileField label={'website'} value={user.website} />
                </div>

                <div className={s.ProfilePart}>
                    <div className={s.ProfileTitle}>address</div>
                    <ProfileField label={'street'} value={user.address.street} />
                    <ProfileField label={'suite'} value={user.address.suite} />
                    <ProfileField label={'city'} value={user.address.city} />
                    <ProfileField label={'zipcode'} value={user.address.zipcode} />
                </div>

                <div className={s.ProfilePart}>
                    <div className={s.ProfileTitle}>company</div>
                    <ProfileField label={'name'} value={user.company.name} />
                    <ProfileField label={'catchPhrase'} value={user.company.catchPhrase} />
                    <ProfileField label={'bs'} value={user.company.bs} />
                </div>
            </div>
        );
    }

    renderPosts(user) {
        if (!user) {
            return null;
        }

        return (
            <div className={s.Section}>
                <div className={s.SectionTitle}>User posts</div>
                <Posts userId={user.id} returnLocation={this.context.router.location} />
            </div>
        );
    }

    renderAlbums(user) {
        if (!user) {
            return null;
        }

        return (
            <div className={s.Section}>
                <div className={s.SectionTitle}>User albums</div>
                <Albums userId={user.id} returnLocation={this.context.router.location} />
            </div>
        );
    }

    static contextTypes = {
        router: routerShape
    };

    static propTypes = {
        usersById: PropTypes.object,
        params: PropTypes.object.isRequired
    };
}

export default branch({
    usersById: ['usersById']
}, Users);
