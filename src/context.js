import React, { useState, useContext, useEffect } from 'react';
import { makeMetricAlarmIndicatorState } from './metricAlarmContext';
import { addIndicator, makeTwinComponentsState, newIndicatorId } from './twinComponentsContext';

const AppContext = React.createContext();

const LOCAL_STORAGE_NAME = 'indicatorsExercise';

const makeDefaultState = () => {
    const editIndicator = makeMetricAlarmIndicatorState({ id: 'editDummy' });

    const twinComponents = makeTwinComponentsState();

    return { ...twinComponents, editIndicator };
}

const geStateFromLocalStorage = () => {
    const indicatorsListState = localStorage.getItem(LOCAL_STORAGE_NAME);
    if (indicatorsListState) {
        return JSON.parse(indicatorsListState);
    } else {
        return makeDefaultState();
    }
};

const AppProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState(geStateFromLocalStorage());

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(globalState))
    }, [globalState]);

    const addIndicatorWithParams = (params) => {
        const id = newIndicatorId(globalState);
        const newIndicator = makeMetricAlarmIndicatorState({ ...params, id });

        setGlobalState(addIndicator(globalState, newIndicator));
    }

    const updateIndicatorState = (id, indicatorParams) => {
        const { indicatorsList } = globalState;
        const updatedIndicatorsList = indicatorsList.map((indicator) => {
            if (indicator.id === id) {
                return { ...indicator, ...indicatorParams };
            } else {
                return indicator;
            }
        });
        setGlobalState({ ...globalState, indicatorsList: updatedIndicatorsList });
    }

    return (
        <AppContext.Provider value={{
            globalState,
            addIndicatorWithParams,
            updateIndicatorState
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext }