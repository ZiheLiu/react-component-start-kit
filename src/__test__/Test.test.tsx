import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Test from '../Test';

test('Text of Test should be correct', () => {
  const component = renderer.create(<Test />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
