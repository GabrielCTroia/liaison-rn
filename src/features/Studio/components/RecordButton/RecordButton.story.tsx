import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { RecordButton } from './RecordButton';
import { CenterView } from '../../../../components/CenterView';

export default storiesOf('RecordButton', module)
  .addDecorator((getStory: () => any) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <RecordButton />
  ))