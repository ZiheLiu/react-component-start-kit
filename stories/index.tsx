import * as React from 'react';

import { storiesOf } from '@storybook/react';

import Test from '../lib';

import '../dist/react-component-start-kit.min.css';

storiesOf('Welcome', module).add('First', () => <Test />);
