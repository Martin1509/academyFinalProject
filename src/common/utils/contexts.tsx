import React, {ReactNode} from 'react';

type Props = {
    children: ReactNode;
};

export const combineContextProviders = (...contextProviders) => ({children}: Props) =>
  contextProviders.reduce((tree, Provider) => (
    <Provider>
      {tree}
    </Provider>
  ), children);
