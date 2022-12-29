import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faLessThan, faEquals, faNotEqual } from '@fortawesome/free-solid-svg-icons'
import { ALL_SIGNS } from './metricAlarmContext'

function IndicatorSignSelector(props) {
    const { sign = '>' } = props;
    const { MORE_SIGN, LESS_SIGN, EQUAL_SIGN, NOT_EQUAL_SIGN } = ALL_SIGNS;
    const allSignsList = [MORE_SIGN, LESS_SIGN, EQUAL_SIGN, NOT_EQUAL_SIGN];
    const [signSelectorState, setSignSelectorState] = useState({ dropDownIsOpened: false, sign });
    const { dropDownIsOpened } = signSelectorState;

    const toggleDropDown = () => {
        const { dropDownIsOpened } = signSelectorState;
        setSignSelectorState({ ...signSelectorState, dropDownIsOpened: !dropDownIsOpened });
    }

    const selectSign = (sign) => {
        setSignSelectorState({ ...signSelectorState, sign, dropDownIsOpened: false });
    }

    const getIndicatorSignIcon = (sign) => {
        switch(sign) {
            case MORE_SIGN:
                return <FontAwesomeIcon icon={faGreaterThan} />;
            case LESS_SIGN:
                return <FontAwesomeIcon icon={faLessThan} />;
            case EQUAL_SIGN:
                return <FontAwesomeIcon icon={faEquals} />;
            case NOT_EQUAL_SIGN:
                return <FontAwesomeIcon icon={faNotEqual} />;
            default:
                return <div>!!!</div>
        }
    }

    return (
        <div className="metric_sign_edit">
            <div className='alarm_indicator_sign' onClick={toggleDropDown}>
                {sign}
            </div>
            <div className={dropDownIsOpened?'alarm_indicator_sign_dropdown opened':'alarm_indicator_sign_dropdown'}>
                {
                    allSignsList.map((sign) => {
                        return (
                            <div class='indicator_sign' onClick={() => selectSign(sign)}>
                                {getIndicatorSignIcon(sign)}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export { IndicatorSignSelector };
