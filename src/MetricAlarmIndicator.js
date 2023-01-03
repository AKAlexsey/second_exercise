import React, { useState, useEffect } from 'react';
import { getPredicateFunction } from './metricAlarmContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faGreaterThan, faLessThan, faEquals, faNotEqual, faCirclePlus, faClose, faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import IndicatorActionButton from './IndicatorActionButton';

import { useGlobalContext } from './context';

const alarmFunction = (state) => {
  const { value, sign, limitValue } = state;
  const predicate = getPredicateFunction(sign, limitValue);
  return predicate(value);
};

const defaultFunction = (value) => value;

function MetricAlarmIndicator(props) {
  const { resetEditIndicator } = useGlobalContext();

  const {
    indicatorState,
    increaseValueFunction = defaultFunction,
    decreaseValueFunction = defaultFunction,
    deleteIndicatorFunction = defaultFunction,
    addIndicatorFunction = defaultFunction,
    updateIndicatorFunction = defaultFunction,
    startEditingIndicatorFunction = defaultFunction,
    editMode = false
  } = props;
  const { id, value, sign, limitValue, alarmMessage, editing } = indicatorState;

  const [alarm, setAlarm] = useState(alarmFunction(indicatorState));

  const startEditCallback = () => {
    startEditingIndicatorFunction(indicatorState)
  }

  const saveEditCallback = () => {
    updateIndicatorFunction()
  }

  const declineEditCallback = () => {
    resetEditIndicator()
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

  const getIndicatorClasses = (alarm, editing) => {
    if (editing) {
      return 'metric_alarm_indicator indicator_editing';
    } else if (alarm) {
      return 'metric_alarm_indicator run_indicator_alarm';
    } else {
      return 'metric_alarm_indicator indicator_ok';
    }
  }

  if (editMode) {
    return (
      <div className='metric_alarm_indicator edit_indicator'>
        <div className="metric">
          {value}
        </div>
        <div className="metric_sign_edit">
          {sign}
        </div>
        <div className="metric_limig_value">
          {limitValue}
        </div>
        <div className="indicator_actions_buttons">
          {
            id && <>
              <IndicatorActionButton icon={faSave} clickCallback={saveEditCallback} tooltipText={'Save changes'} />
              <IndicatorActionButton icon={faClose} clickCallback={declineEditCallback} tooltipText={'Decline changes'} />
            </>
          }
          {
            (id === null) &&
            <IndicatorActionButton icon={faCirclePlus} clickCallback={saveEditCallback} tooltipText={'Add new'} />
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className={getIndicatorClasses(alarm, editing)}>
        <div className="value_change_button_container">
          <button type='button' className='value_change_button' onClick={() => decreaseValueFunction(id)} disabled={editing}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div className="metric">
          {value}
        </div>
        <div className="value_change_button_container">
          <button type='button' className='value_change_button' onClick={() => increaseValueFunction(id)} disabled={editing}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {
          (alarm && !editing) &&
          <div className="alarm_message">
            {alarmMessage}
          </div>
        }

        <div className="indicator_actions_buttons">
          {editing &&
            <IndicatorActionButton icon={faClose} clickCallback={declineEditCallback} tooltipText={'Decline edit'} />
          }
          {!editing &&
            <>
              <IndicatorActionButton icon={faEdit} clickCallback={startEditCallback} tooltipText={'Edit'} />
              <IndicatorActionButton icon={faTrash} clickCallback={deleteIndicatorCallback} tooltipText={'Delete'} />
            </>
          }
        </div>
      </div>
    );
  }
}

export default MetricAlarmIndicator;
