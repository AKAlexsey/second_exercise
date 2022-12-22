import React, { useState, useEffect } from 'react';
import { getPredicateFunction, makeMetricAlarmIndicatorState } from './metricAlarmContext';

const alarmFunction = (state) => {
  const { value, sign, limitValue } = state;
  const predicate = getPredicateFunction(sign, limitValue);
  return predicate(value);
};

function MetricAlarmIndicator( props ) {
    const { value, sign, limitValue, alarmMessage, edit = false } = props;

    const [componentState, updateComponentState] = useState(makeMetricAlarmIndicatorState({ value, sign, limitValue, alarmMessage }));
    const [alarm, setAlarm] = useState(alarmFunction(componentState));
    const [editMode, setEditMode] = useState(edit);

    useEffect(
      () => {
        setAlarm(alarmFunction(componentState));
      },
      [componentState.value, componentState.sign, componentState.limitValue ]
    )

    
    if (editMode) {
      return (
        <div className='metric_alarm_indicator'>
          <div className="metric">
            { componentState.value }
          </div>
        </div>
      );
    } else {
    return (
      <div className={alarm?'metric_alarm_indicator run_indicator_alarm':'metric_alarm_indicator indicator_ok'}>
        <div className="metric">
          { componentState.value }
        </div>
        {
          alarm &&
            <div className="alarm_message">
              { componentState.alarmMessage }
            </div>
        }
      </div>
    );
    }
  }
  
  export default MetricAlarmIndicator;