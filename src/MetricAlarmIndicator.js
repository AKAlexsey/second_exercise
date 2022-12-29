import React, { useState, useEffect, useCallback } from 'react';
import { getPredicateFunction } from './metricAlarmContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faClose, faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { IndicatorSignSelector } from './IndicatorSignSelector'

const alarmFunction = (state) => {
  const { value, sign, limitValue } = state;
  const predicate = getPredicateFunction(sign, limitValue);
  return predicate(value);
};

function MetricAlarmIndicator(props) {
  const {
    indicatorState,
    increaseValueFunction,
    decreaseValueFunction,
    deleteIndicatorFunction,
    edit = false
  } = props;
  const { id, value, sign, limitValue, alarmMessage } = indicatorState;

  const [alarm, setAlarm] = useState(alarmFunction(indicatorState));
  const [editMode, setEditMode] = useState(edit);

  const switchEditModeCallback = () => {
    setEditMode(true);
  }

  const saveEditCallback = () => {
    setEditMode(false);
  }

  const declineEditCallback = () => {
    setEditMode(false);
  }

  const deleteIndicatorCallback = () => {
    deleteIndicatorFunction(id);
  }

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
        <IndicatorSignSelector sign={sign} />
        <div className="metric_limig_value">
          {limitValue}
        </div>
        <div className="indicator_actions_buttons">
          <button className='indicator_action'>
            <FontAwesomeIcon icon={faSave} onClick={saveEditCallback} />
          </button>
          <button className='indicator_action' onClick={declineEditCallback}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={alarm ? 'metric_alarm_indicator run_indicator_alarm' : 'metric_alarm_indicator indicator_ok'}>
        <div className="value_change_button_container">
          <button type='button' className='value_change_button' onClick={() => decreaseValueFunction(id)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div className="metric">
          {value}
        </div>
        <div className="value_change_button_container">
          <button type='button' className='value_change_button' onClick={() => increaseValueFunction(id)} >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {
          alarm &&
          <div className="alarm_message">
            {alarmMessage}
          </div>
        }

        <div className="indicator_actions_buttons">
          <button className='indicator_action' onClick={switchEditModeCallback}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className='indicator_action' onClick={deleteIndicatorCallback}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  }
}

export default MetricAlarmIndicator;
