// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { AccountCard } from 'light-ui';
import { inject, observer } from 'mobx-react';

@inject('createAccountStore')
@observer
class CreateAccountHeader extends Component {
  render () {
    const {
      children,
      createAccountStore: { address, name }
    } = this.props;

    return (
      <AccountCard
        address={address}
        name={name}
        drawers={[<div key='createAccount'>{children}</div>]}
      />
    );
  }
}

export default CreateAccountHeader;