/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { wrapInTestApp } from '@backstage/test-utils';
import { NavLink } from './NavLink';
import { MemoryRouter, Route } from 'react-router';
import { act } from 'react-dom/test-utils';

describe('<NavLink />', () => {
  it('navigates using react-router', async () => {
    const testString = 'This is test string';
    const linkText = 'Navigate!';
    const { getByText } = render(
      wrapInTestApp(
        <MemoryRouter>
          <NavLink to="/test">{linkText}</NavLink>
          <Route path="/test">{testString}</Route>
        </MemoryRouter>,
      ),
    );
    expect(() => getByText(testString)).toThrow();
    await act(async () => fireEvent.click(getByText(linkText)));
    expect(getByText(testString)).toBeInTheDocument();
  });
});
