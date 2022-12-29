import MetricAlarmIndicator from './MetricAlarmIndicator';
import React from 'react';
import { useGlobalContext } from './context';

function App() {
  const { globalState: { indicatorsList, editIndicator } } = useGlobalContext();
  const { incIndicatorValue, decIndicatorValue } = useGlobalContext();

  return (
    <div className='twin_components'>
      <div>
        <MetricAlarmIndicator indicatorState={editIndicator} edit={true} />
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
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
