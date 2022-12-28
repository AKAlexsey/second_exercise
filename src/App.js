import MetricAlarmIndicator from './MetricAlarmIndicator';
import React, { useState } from 'react';
import { useGlobalContext } from './context';

function App() {
  const { globalState: { indicatorsList, editIndicator } } = useGlobalContext();

  return (
    <div className='twin_components'>
      <div>
        <MetricAlarmIndicator indicatorState={editIndicator} edit={true} />
      </div>
      <hr className='form_separator' />
      <div className='indicators_container'>
        {
          indicatorsList.map((indicatorState, index) => {
            return (<MetricAlarmIndicator key={index} indicatorState={indicatorState} />)
          })
        }
      </div>
    </div>
  );
}

export default App;
