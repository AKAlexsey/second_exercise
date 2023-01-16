import React, { useState, useContext, useEffect } from 'react';
import { makeMetricAlarmIndicatorState, incValue, decValue, validateValue, updateEndicatorParams } from './metricAlarmContext';
import { addIndicator, makeTwinComponentsState, newIndicatorId } from './twinComponentsContext';

const AppContext = React.createContext();

const LOCAL_STORAGE_NAME = 'indicatorsExercise';

const makeDefaultIndicator = () => {
    return makeMetricAlarmIndicatorState();
}

const makeDefaultEditIndicator = (currentState) => {
    const defaultIndicator = makeDefaultIndicator();

    const { sign, limitValue } = defaultIndicator;

    let editIndicator = setEditLimitValue(defaultIndicator, limitValue);
    editIndicator = setEditSign(editIndicator, sign);

    return { ...currentState, editIndicator };
}

const setEditLimitValue = (editIndicator, limitValue) => {
    return { ...editIndicator, editLimitValue: limitValue }
}

const setEditSign = (editIndicator, sign) => {
    return { ...editIndicator, editSign: sign }
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

    const addNewIndicator = () => {
        const id = newIndicatorId(globalState);
        const { editIndicator } = globalState;

        const newIndicator = makeMetricAlarmIndicatorState({ ...editIndicator, id });

        setGlobalState(makeDefaultEditIndicator(addIndicator(globalState, newIndicator)));
    }

    const iterateIndicatorsList = (indicatorsList, iterateElementFunction) => {
        return indicatorsList.map(iterateElementFunction);
    }

    const updateIndicatorById = (indicatorsList, id, updateFunction) => {
        return iterateIndicatorsList(indicatorsList, (indicator) => {
            if (indicator.id === id) {
                return updateFunction(indicator);
            } else {
                return indicator;
            }
        })
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

    const updateIndicator = () => {
        const { indicatorsList, editIndicator } = globalState;
        const { id } = editIndicator;

        const updatedIndicatorsList = updateIndicatorById(indicatorsList, id, (indicatorState) => {
            return updateEndicatorParams(indicatorState, editIndicator);
        })

        setGlobalState(makeDefaultEditIndicator({ ...globalState, indicatorsList: updatedIndicatorsList }));
    }

    const deleteIndicator = (deleteId) => {
        const updatedIndicatorsList = indicatorsList.filter(({ id }) => deleteId !== id);
        setGlobalState({ ...globalState, indicatorsList: updatedIndicatorsList });
    }

    const setEditIndicator = (indicatorState) => {
        const { id, value, sign, limitValue, alarmMessage, editing } = indicatorState;

        const newEditIndicator = { id, value, sign, limitValue, alarmMessage, editing };

        const { indicatorsList, editIndicator } = globalState;

        let intermediateIndicatorsList = indicatorsList;

        if (editIndicator.id) {
            intermediateIndicatorsList = updateIndicatorById(intermediateIndicatorsList, editIndicator.id, (indicatorState) => {
                return { ...indicatorState, editing: false };
            })
        }

        const updatedIndicatorsList = updateIndicatorById(intermediateIndicatorsList, id, (indicatorState) => {
            return { ...indicatorState, editing: true };
        })

        setGlobalState(updateIndicatorsList({ ...globalState, editIndicator: newEditIndicator }, updatedIndicatorsList));
    }

    const resetEditIndicator = () => {
        const { indicatorsList } = globalState;

        const updatedIndicatorsList = indicatorsList.map((indicatorState) => {
            return { ...indicatorState, editing: false };
        });

        setGlobalState(makeDefaultEditIndicator(updateIndicatorsList(globalState, updatedIndicatorsList)));
    }

    const updateEditIndicator = (updateParams) => {
        const { editIndicator } = globalState;

        setGlobalState({ ...globalState, editIndicator: { ...editIndicator, ...updateParams } });
    }

    // TODO not sure if it's necessary
    const updateEditIndicatorLimitValue = (limitValue) => {
        updateEditIndicator({ limitValue });
    }

    const updateEditIndicatorSign = (editSign) => {
        updateEditIndicator({ editSign });
    }

    return (
        <AppContext.Provider value={{
            globalState,
            addNewIndicator,
            incIndicatorValue,
            decIndicatorValue,
            deleteIndicator,
            setEditIndicator,
            resetEditIndicator,
            updateIndicator,
            updateEditIndicatorLimitValue,
            updateEditIndicatorSign,
            validateValue
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext }
