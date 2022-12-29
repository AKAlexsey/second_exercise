import MetricAlarmIndicator from './MetricAlarmIndicator';
import React from 'react';
import { useGlobalContext } from './context';

function App() {
  const {
    globalState: { indicatorsList, editIndicator },
    incIndicatorValue,
    decIndicatorValue,
    deleteIndicator
  } = useGlobalContext();

  return (
    <div className='twin_components'>
      <div>
        <MetricAlarmIndicator indicatorState={editIndicator} edit={true} deleteIndicatorFunction={deleteIndicator} />
      </div>
      <hr className='form_separator' />
      <div className='indicators_container'>
        {
          indicatorsList.map((indicatorState, index) => {
            return (
              <MetricAlarmIndicator
                key={index}
                indicatorState={indicatorState}
                increaseValueFunction={incIndicatorValue}
                decreaseValueFunction={decIndicatorValue}
                deleteIndicatorFunction={deleteIndicator}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
