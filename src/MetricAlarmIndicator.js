import React, { useState, useEffect, useCallback } from 'react';
import { getPredicateFunction, incValue, decValue } from './metricAlarmContext';
import { useGlobalContext } from './context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const alarmFunction = (state) => {
  const { value, sign, limitValue } = state;
  const predicate = getPredicateFunction(sign, limitValue);
  return predicate(value);
};

function MetricAlarmIndicator(props) {
  const { updateIndicatorState } = useGlobalContext();
  const { indicatorState, edit = false } = props;
  const { id, value, sign, limitValue, alarmMessage } = indicatorState;

  const [alarm, setAlarm] = useState(alarmFunction(indicatorState));
  const [editMode, setEditMode] = useState(edit);

  const decreaseButtonCallback = useCallback(() => {
    updateIndicatorState(id, decValue(indicatorState));
  }, [indicatorState]);

  const increaseButtonCallback = useCallback(() => {
    updateIndicatorState(id, incValue(indicatorState));
  }, [indicatorState])

  useEffect(
    () => {
      setAlarm(alarmFunction(indicatorState));
    },
    [value, sign, limitValue]
  )

  if (editMode) {
    return (
      <div className='metric_alarm_indicator edit_indicator'>
        <div className="metric">
          {value}
        </div>
      </div>
    );
  } else {
    return (
      <div className={alarm ? 'metric_alarm_indicator run_indicator_alarm' : 'metric_alarm_indicator indicator_ok'}>
        <div className="value_change_button_container">
          <button type='button' className='value_change_button' onClick={decreaseButtonCallback}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div className="metric">
          {value}
        </div>
        <div className="value_change_button_container">
          <button type='button' className='value_change_button' onClick={increaseButtonCallback} >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {
          alarm &&
          <div className="alarm_message">
            {alarmMessage}
          </div>
        }
      </div>
    );
  }
}

export default MetricAlarmIndicator;
