import React, { useState, useContext, useEffect, useCallback } from 'react';
import { makeMetricAlarmIndicatorState, incValue, decValue } from './metricAlarmContext';
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
    const { indicatorsList } = globalState;

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(globalState))
    }, [globalState]);

    const addIndicatorWithParams = (params) => {
        const id = newIndicatorId(globalState);
        const newIndicator = makeMetricAlarmIndicatorState({ ...params, id });

        setGlobalState(addIndicator(globalState, newIndicator));
    }

    const updateIndicatorWithFunction = useCallback((id, updateFunction) => {
        const { indicatorsList } = globalState;

        const updatedIndicatorsList = indicatorsList.map((indicator) => {
            if (indicator.id === id) {
                return updateFunction(indicator);
            } else {
                return indicator;
            }
        });

        setGlobalState({ ...globalState, indicatorsList: updatedIndicatorsList });
    }, [indicatorsList])

    const decIndicatorValue = (id) => {
        updateIndicatorWithFunction(id, decValue);
    }

    const incIndicatorValue = (id) => {
        updateIndicatorWithFunction(id, incValue);
    }

    return (
        <AppContext.Provider value={{
            globalState,
            addIndicatorWithParams,
            updateIndicatorWithFunction,
            incIndicatorValue,
            decIndicatorValue
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext }
