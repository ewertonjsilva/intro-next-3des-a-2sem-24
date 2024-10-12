'use client'

import { Provider } from 'react-redux'
import store from '../services/redux/store';

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

// https://www.youtube.com/watch?v=_f9AC6jr99c