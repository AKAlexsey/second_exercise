const DEFAULT_VALUE = 0;
const DEFAULT_ID = null;
const MORE_SIGN = '>';
const LESS_SIGN = '<';
const EQUAL_SIGN = '=';
const NOT_EQUAL_SIGN = '!=';
const DEFAULT_SIGN = MORE_SIGN;

const MINIMUM_LIMIT_VALUE = 0;
const MAXIMUM_LIMIT_VALUE = 99;

const PERMITTED_SIGN_VALUES = [MORE_SIGN, LESS_SIGN, EQUAL_SIGN, NOT_EQUAL_SIGN];

export { 
    MORE_SIGN, LESS_SIGN, EQUAL_SIGN, NOT_EQUAL_SIGN,
    DEFAULT_SIGN, DEFAULT_VALUE, MINIMUM_LIMIT_VALUE,
    MAXIMUM_LIMIT_VALUE, PERMITTED_SIGN_VALUES }

const validateValue = (value) => {
    const newEditValue = parseInt(value);

    if (newEditValue > MAXIMUM_LIMIT_VALUE) {
        return MAXIMUM_LIMIT_VALUE;
    } else if (newEditValue < MINIMUM_LIMIT_VALUE) {
        return MINIMUM_LIMIT_VALUE;
    } else if (Number.isInteger(newEditValue)) {
        return newEditValue;
    } else {
        return MINIMUM_LIMIT_VALUE;
    }
}

const makeMetricAlarmIndicatorState = (defaultParams = {}) => {
    const { id = DEFAULT_ID, value = DEFAULT_VALUE, sign = MORE_SIGN, limitValue = DEFAULT_VALUE } = defaultParams;
    const indicatorParams = { id, value, sign, limitValue, editing: false };
    const alarmMessage = makeAlarmMessage(indicatorParams);

    return { ...indicatorParams, alarmMessage };
}


const updateEndicatorParams = (indicatorState, editIndicator) => {
    const alarmMessage = makeAlarmMessage(editIndicator);

    return { ...indicatorState, ...editIndicator, editing: false, alarmMessage };
}

const updateMetricAlarmIndicatorState = (indicatorState, updateParams) => {
    const { id, value, sign, limitValue, alarmMessage } = updateParams;

    return {
        ...indicatorState,
        ...id && { id },
        ...value && { value },
        ...sign && { sign },
        ...limitValue && { limitValue },
        ...alarmMessage && { alarmMessage }
    };
}

const incValue = (indicatorState) => {
    const { value } = indicatorState;



    return { ...indicatorState, value: validateValue(value + 1) };
}

const decValue = (indicatorState) => {
    const { value } = indicatorState;

    return { ...indicatorState, value: validateValue(value - 1) };
}

const makeAlarmMessage = (indicatorParams) => {
    const { sign, limitValue } = indicatorParams;

    switch (sign) {
        case MORE_SIGN:
            return `Value is more than ${limitValue}`;
        case LESS_SIGN:
            return `Value is less than ${limitValue}`;
        case EQUAL_SIGN:
            return `Value is equal to ${limitValue}`;
        case NOT_EQUAL_SIGN:
            return `Value is not equal to ${limitValue}`;
        default:
            return `Message for given sign ${sign}`;
    }
}

const getPredicateFunction = (sign, limitValue) => {
    switch (sign) {
        case MORE_SIGN:
            return (value) => value > limitValue;
        case LESS_SIGN:
            return (value) => value < limitValue;
        case EQUAL_SIGN:
            return (value) => value === limitValue;
        case NOT_EQUAL_SIGN:
            return (value) => value !== limitValue;
        default:
            return (_value) => false
    }
}

export {
    makeMetricAlarmIndicatorState,
    getPredicateFunction,
    updateMetricAlarmIndicatorState,
    makeAlarmMessage,
    incValue,
    decValue,
    validateValue,
    updateEndicatorParams
}