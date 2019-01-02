// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

import React from 'react';

export const Feedback = ({ accountsListLength }) => (
  <a
    className='feedback'
    href='https://github.com/paritytech/fether/issues/new'
    target='_blank'
    style={{ marginBottom: accountsListLength > 1 ? '0px' : '-10px' }}
  >
    Feedback
  </a>
);
