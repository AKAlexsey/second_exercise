const DEFAULT_VALUE = 0;
const MORE_SIGN = '>';
const LESS_SIGN = '<';
const EQUAL_SIGN = '=';
const NOT_EQUAL_SIGN = '!=';

export { MORE_SIGN, LESS_SIGN, EQUAL_SIGN, NOT_EQUAL_SIGN }

const makeMetricAlarmIndicatorState = (defaultParams = {}) => {
    const { id, value = DEFAULT_VALUE, sign = MORE_SIGN, limitValue = DEFAULT_VALUE } = defaultParams;
    const alarmMessage = defaultParams.alarmMessage?defaultParams.alarmMessage:makeAlarmMessage(sign, limitValue);

    return { id, value, sign, limitValue, alarmMessage };
}

const makeAlarmMessage = (sign, limitValue) => {
    switch(sign) {
        case MORE_SIGN:
            return `Value is more than ${limitValue}`;
            break;
        case LESS_SIGN:
            return `Value is less than ${limitValue}`;
            break;
        case EQUAL_SIGN:
            return `Value is equal to ${limitValue}`;
            break;
        case NOT_EQUAL_SIGN:
            return `Value is not equal to ${limitValue}`;
            break;
        default:
            return `Message for given sign ${sign}`;
    }
}

const getPredicateFunction = (sign, limitValue) => {
    switch(sign) {
        case MORE_SIGN:
            return (value) => value > limitValue;
            break;
        case LESS_SIGN:
            return (value) => value < limitValue;
            break;
        case EQUAL_SIGN:
            return (value) => value === limitValue;
            break;
        case NOT_EQUAL_SIGN:
            return (value) => value !== limitValue;
            break;
        default:
            return (_value) => false
    }
}

export { makeMetricAlarmIndicatorState, getPredicateFunction }