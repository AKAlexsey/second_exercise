const makeTwinComponentsState = () => {
    const indicatorsList = [];
    const currentMaxId = 0;

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