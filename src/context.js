import React, { useState, useContext, useEffect } from 'react';
import { makeMetricAlarmIndicatorState, incValue, decValue } from './metricAlarmContext';
import { addIndicator, makeTwinComponentsState, newIndicatorId } from './twinComponentsContext';

const AppContext = React.createContext();

const LOCAL_STORAGE_NAME = 'indicatorsExercise';

const makeDefaultIndicator = () => {
    return makeMetricAlarmIndicatorState();
}

const makeDefaultEditIndicator = (currentState) => {
    const editIndicator = makeDefaultIndicator();

    return { ...currentState, editIndicator };
}

const makeDefaultState = () => {
    const twinComponents = makeTwinComponentsState();

    return makeDefaultEditIndicator(twinComponents);
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

    const updateIndicatorById = (indicatorsList, id, updateFunction) => {
        return indicatorsList.map((indicator) => {
            if (indicator.id === id) {
                return updateFunction(indicator);
            } else {
                return indicator;
            }
        });
    }

    const updateIndicatorsList = (currentState, updatedIndicatorsList) => {
        return { ...currentState, indicatorsList: updatedIndicatorsList }
    }

    const decIndicatorValue = (id) => {
        const { indicatorsList } = globalState;

        const updatedIndicatorsList = updateIndicatorById(indicatorsList, id, decValue);

        setGlobalState(updateIndicatorsList(globalState, updatedIndicatorsList));
    }

    const incIndicatorValue = (id) => {
        const { indicatorsList } = globalState;

        const updatedIndicatorsList = updateIndicatorById(indicatorsList, id, incValue);

        setGlobalState(updateIndicatorsList(globalState, updatedIndicatorsList));
    }

    const updateIndicator = (id, updateIndicatorState) => {
        const { indicatorsList } = globalState;

        const updatedIndicatorsList = updateIndicatorById(indicatorsList, id, (indicatorState) => {
            return { ...indicatorState, ...updateIndicatorState, editing: false };
        })

        setGlobalState({ ...globalState, indicatorsList: updatedIndicatorsList });
    }

    const deleteIndicator = (deleteId) => {
        const updatedIndicatorsList = indicatorsList.filter(({ id }) => deleteId !== id);
        setGlobalState({ ...globalState, indicatorsList: updatedIndicatorsList });
    }

    const setEditIndicator = (indicatorState) => {
        const { id, value, sign, limitValue, alarmMessage, editing } = indicatorState;

        const editIndicator = { id, value, sign, limitValue, alarmMessage, editing };

        const { indicatorsList } = globalState;

        const updatedIndicatorsList = updateIndicatorById(indicatorsList, id, (indicatorState) => {
            return { ...indicatorState, editing: true };
        })

        setGlobalState(updateIndicatorsList({ ...globalState, editIndicator }, updatedIndicatorsList));
    }

    const resetEditIndicator = () => {
        const { indicatorsList } = globalState;

        const updatedIndicatorsList = indicatorsList.map((indicatorState) => {
            return { ...indicatorState, editing: false };
        });

        setGlobalState(makeDefaultEditIndicator(updateIndicatorsList(globalState, updatedIndicatorsList)));
    }

    return (
        <AppContext.Provider value={{
            globalState,
            addIndicatorWithParams,
            incIndicatorValue,
            decIndicatorValue,
            deleteIndicator,
            setEditIndicator,
            resetEditIndicator,
            updateIndicator
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext }
