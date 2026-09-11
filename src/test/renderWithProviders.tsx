import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render, type RenderOptions } from '@testing-library/react-native';

import type { AppStore } from '@app/store';
import { createTestStore } from '@app/test/createTestStore';

/**
 * Standard render helper for connected components. Tests can supply a prepared
 * store for a specific state, while ordinary tests get an isolated test store.
 */
export const renderWithProviders = (
  ui: ReactElement,
  options: Omit<RenderOptions, 'wrapper'> & { store?: AppStore } = {},
) => {
  const { store = createTestStore().store, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...renderOptions,
  });
};
