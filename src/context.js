import React, { useState, useContext } from 'react';
import { makeMetricAlarmIndicatorState } from './metricAlarmContext';
import { addIndicator, makeTwinComponentsState, newIndicatorId } from './twinComponentsContext';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState(makeTwinComponentsState());

    const addIndicatorWithParams = (params) => {
        const id = newIndicatorId(globalState);
        const newIndicator = makeMetricAlarmIndicatorState({ ...params, id });

        setGlobalState(addIndicator(globalState, newIndicator));
    }

    const updateIndicatorState = (id, indicatorParams) => {
        const { indicatorsList }  = globalState;
        const updatedIndicatorsList = indicatorsList.map((indicator) => {
            if (indicator.id === id) {
                return { ...indicator, ...indicatorParams };
            } else {
                return indicator;
            }
        });
        debugger;
        setGlobalState({ ...globalState, indicatorsList: updatedIndicatorsList });
    }

    return (
        <AppContext.Provider value={{
            globalState,
            addIndicatorWithParams,
            updateIndicatorState
        }}>
            { children }
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext }