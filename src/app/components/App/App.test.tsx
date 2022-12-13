import React from 'react';
import {render} from '@testing-library/react';

import App from 'app/components/App/App';

test('renders App', async () => {
  const {container} = render(<App/>);

  expect(container).toBeDefined();
});
