import React, { useState, useEffect, useCallback } from 'react';
import { getPredicateFunction, makeMetricAlarmIndicatorState, incValue, decValue } from './metricAlarmContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const alarmFunction = (state) => {
  const { value, sign, limitValue } = state;
  const predicate = getPredicateFunction(sign, limitValue);
  return predicate(value);
};

function MetricAlarmIndicator( props ) {
    const { id, value, sign, limitValue, alarmMessage, edit = false, updateIndicatorState } = props;

    const [indicatorState, setIndicatorState] = useState(makeMetricAlarmIndicatorState({ id, value, sign, limitValue, alarmMessage }));
    const [alarm, setAlarm] = useState(alarmFunction(indicatorState));
    const [editMode, setEditMode] = useState(edit);

    const decreaseButtonCallback = useCallback(() => {
      console.log(`'dec'  ${indicatorState.value}`)
      setIndicatorState(decValue(indicatorState));
    }, [indicatorState]);

    const increaseButtonCallback = useCallback(() => {
      console.log(`'inc' ${indicatorState.value}`)
      setIndicatorState(incValue(indicatorState));
    }, [indicatorState])

    useEffect(
      () => {
        setAlarm(alarmFunction(indicatorState));
      },
      [indicatorState.value, indicatorState.sign, indicatorState.limitValue]
    )

    // useEffect(
    //   () => {
    //     debugger;
    //     updateIndicatorState(indicatorState.id, indicatorState);
    //   },
    //   [indicatorState]
    // )
    
    if (editMode) {
      return (
        <div className='metric_alarm_indicator edit_indicator'>
          <div className="metric">
            { indicatorState.value }
          </div>
        </div>
      );
    } else {
    return (
      <div className={alarm?'metric_alarm_indicator run_indicator_alarm':'metric_alarm_indicator indicator_ok'}>
        <div className="value_change_button_container">
          <button type='button' className='value_change_button' onClick={decreaseButtonCallback}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div className="metric">
          { indicatorState.value }
        </div>
        <div className="value_change_button_container">
          <button type='button' className='value_change_button' onClick={increaseButtonCallback} >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {
          alarm &&
            <div className="alarm_message">
              { indicatorState.alarmMessage }
            </div>
        }
      </div>
    );
    }
  }
  
  export default MetricAlarmIndicator;