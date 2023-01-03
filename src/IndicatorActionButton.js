import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function IndicatorActionButton(props) {
    const {
        icon,
        clickCallback,
        tooltipText = null
    } = props;

    return (
        <button className={tooltipText ? 'indicator_action tooltip' : 'indicator_action'}>
            <FontAwesomeIcon icon={icon} onClick={clickCallback} />
            {
                tooltipText &&
                <span className='tooltiptext'>{tooltipText}</span>
            }
        </button>
    );
}

export default IndicatorActionButton;
