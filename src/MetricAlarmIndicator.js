import React, { useState, useEffect } from 'react';
import { getPredicateFunction, MINIMUM_LIMIT_VALUE, MAXIMUM_LIMIT_VALUE, DEFAULT_VALUE, PERMITTED_SIGN_VALUES } from './metricAlarmContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faGreaterThan, faLessThan, faEquals, faNotEqual, faCirclePlus, faClose, faEdit, faTrash, faSave, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import IndicatorActionButton from './IndicatorActionButton';
import DropDownButton from './DropDownButton';

import { useGlobalContext } from './context';

const alarmFunction = (state) => {
  const { value, sign, limitValue } = state;
  const predicate = getPredicateFunction(sign, limitValue);
  return predicate(value);
};

const defaultFunction = (value) => value;

function MetricAlarmIndicator(props) {
  const { resetEditIndicator, validateValue, updateEditIndicatorLimitValue, updateEditIndicatorSign } = useGlobalContext();

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
  const [editLimitValue, setEditLimitValue] = useState(limitValue);
  const [editSign, setEditSign] = useState(sign);

  const startEditCallback = () => {
    startEditingIndicatorFunction(indicatorState);
  }

  const saveEditCallback = () => {
    setEditLimitValue(DEFAULT_VALUE);
    updateIndicatorFunction();
  }

  const addCallback = () => {
    setEditLimitValue(DEFAULT_VALUE);
    addIndicatorFunction();
  }

  const declineEditCallback = () => {
    resetEditIndicator();
  }

  const deleteIndicatorCallback = () => {
    deleteIndicatorFunction(id);
  }

  const updateEditLimitValueCallback = (e) => {
    setEditLimitValue(validateValue(e.target.value));
  }

  useEffect(() => {
    updateEditIndicatorLimitValue(editLimitValue);
  }, [editLimitValue])

  useEffect(() => {
    setEditSign(sign);
  }, [sign])

  useEffect(() => {
    setEditLimitValue(limitValue);
  }, [id])

  if (editMode) {
    return (
      <div className='metric_alarm_indicator edit_indicator'>
        <div className="metric">
          { value }
        </div>
        <DropDownButton value={editSign} selectedCallback={(v) => console.log(`Value selected ${v}`)} permittedValuesList={PERMITTED_SIGN_VALUES} />
        <div className="metric_limit_value edit_mode">
          <input
            type="number"
            className="indicator_edit_value_input"
            value={editLimitValue}
            name="value"
            min={MINIMUM_LIMIT_VALUE}
            max={MAXIMUM_LIMIT_VALUE}
            onChange={updateEditLimitValueCallback}
          />
          <div className="limit_borders">
            <div>{MINIMUM_LIMIT_VALUE}</div>
            <div className='borders_sign'><FontAwesomeIcon icon={faLessThanEqual} /> </div>
            <div>V</div>
            <div className='borders_sign'><FontAwesomeIcon icon={faLessThanEqual} /> </div>
            <div>{MAXIMUM_LIMIT_VALUE}</div>
          </div>
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
            <IndicatorActionButton icon={faCirclePlus} clickCallback={addCallback} tooltipText={'Add new'} />
          }
        </div>
      </div>
    );
  } else {
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
