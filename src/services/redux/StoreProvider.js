'use client'

// import React from 'react';
import { Provider } from "react-redux";
import { store } from "./store/store";

function Providers({children}) {
    return <Provider store={store}>{children}</Provider>;
}

export default Providers;

// https://www.youtube.com/watch?v=_f9AC6jr99c
// https://github.com/umairjameel321/reduxtoolkit-nextjs13/blob/main/src/redux/store.ts