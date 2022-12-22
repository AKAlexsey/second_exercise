import { makeMetricAlarmIndicatorState } from "./metricAlarmContext";

const makeTwinComponentsState = () => {
    const indicatorsList = [
        makeMetricAlarmIndicatorState({ id: 1, value: 5, sign: '>', limitValue: 2 }),
        makeMetricAlarmIndicatorState({ id: 2, value: 5, sign: '<', limitValue: 5 })
    ];
    const currentMaxId = 2;

    return { indicatorsList, currentMaxId };
}

const addIndicator = (state, newIndicator) => {
    const { id } = newIndicator;
    const { indicatorsList } = state ;

    return { ...state, currentMaxId: id, indicatorsList: indicatorsList.concat(newIndicator) };
}

const newIndicatorId = (state) => {
    const { currentMaxId } = state ;

    return currentMaxId + 1;
}


export { addIndicator, makeTwinComponentsState, newIndicatorId }