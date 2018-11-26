// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

import React, { Component } from 'react';
import { AccountCard, Form as FetherForm } from 'fether-ui';
import { inject, observer } from 'mobx-react';

@inject('createAccountStore')
@observer
class AccountPassword extends Component {
  state = {
    confirm: '',
    isLoading: false,
    password: '',
    error: ''
  };

  handleConfirmChange = ({ target: { value } }) => {
    this.setState({ confirm: value });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handlePasswordChange = ({ target: { value } }) => {
    this.setState({ password: value });
  };

  handleSubmit = event => {
    const { createAccountStore, history } = this.props;
    const { password } = this.state;

    event.preventDefault();
    this.setState({ isLoading: true });

    // Save to parity
    createAccountStore
      .saveAccountToParity(password)
      .then(res => {
        createAccountStore.clear();
        history.push('/accounts');
      })
      .catch(err => {
        console.error(err);

        this.setState({
          isLoading: false,
          error: err.text
        });
      });
  };

  goBack = () => {
    const { createAccountStore, history } = this.props;

    createAccountStore.clear();
    history.goBack();
  };

  render () {
    const {
      createAccountStore: { address, name, isJSON },
      location: { pathname }
    } = this.props;
    const { confirm, error, isLoading, password } = this.state;
    const currentStep = pathname.slice(-1);

    return (
      <AccountCard
        address={address}
        name={name}
        drawers={[
          <form key='createAccount' onSubmit={this.handleSubmit}>
            <div className='text'>
              <p>
                {' '}
                {isJSON
                  ? 'Unlock your account: '
                  : 'Secure your account with a password:'}
              </p>
            </div>

            <FetherForm.Field
              label='Password'
              onChange={this.handlePasswordChange}
              required
              type='password'
              value={password}
            />

            {!isJSON ? (
              <FetherForm.Field
                label='Confirm'
                onChange={this.handleConfirmChange}
                onKeyPress={this.handleKeyPress}
                required
                type='password'
                value={confirm}
              />
            ) : null}

            <p>
              {error
                ? error + ' Please check your password and try again.'
                : null}{' '}
            </p>

            <nav className='form-nav -space-around'>
              {currentStep > 1 && (
                <button className='button -cancel' onClick={this.goBack}>
                  Back
                </button>
              )}
              <button
                className='button'
                disabled={
                  !password || (!isJSON && confirm !== password) || isLoading
                }
              >
                Confirm account creation
              </button>
            </nav>
          </form>
        ]}
      />
    );
  }
}

export default AccountPassword;
