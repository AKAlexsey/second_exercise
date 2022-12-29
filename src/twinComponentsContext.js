import { makeMetricAlarmIndicatorState } from "./metricAlarmContext";

const makeTwinComponentsState = () => {
    const indicatorsList = [
        makeMetricAlarmIndicatorState({ id: 1, value: 0, sign: '>', limitValue: 2 }),
        makeMetricAlarmIndicatorState({ id: 2, value: 0, sign: '<', limitValue: 5 }),
        makeMetricAlarmIndicatorState({ id: 3, value: 0, sign: '>', limitValue: 3 })
    ];
    const currentMaxId = 3;

    return { indicatorsList, currentMaxId };
}

const addIndicator = (state, newIndicatorParams) => {
    const { indicatorsList } = state;
    const newIndicatorId = newIndicatorId(state);
    const newIndicator = { ...newIndicatorParams, id: newIndicatorId }

    return { ...state, currentMaxId: newIndicatorId, indicatorsList: indicatorsList.concat(newIndicator) };
}

const delIndicator = (state, deleteId) => {
    const { indicatorsList } = state;

    return { ...state, indicatorsList: indicatorsList.filter(({ id }) => deleteId === id ) };
}

const newIndicatorId = (state) => {
    const { currentMaxId } = state;

    return currentMaxId + 1;
}


export { addIndicator, makeTwinComponentsState, newIndicatorId }