import * as React from 'react';
import { render } from 'enzyme';

import Test from '../Test';

describe('Test', () => {
  it('render correctly', () => {
    const component = render(<Test />);
    expect(component).toMatchSnapshot();
  });
});