import MetricAlarmIndicator from './MetricAlarmIndicator';
import React, { useState } from 'react';
import { useGlobalContext } from './context';
import { makeMetricAlarmIndicatorState } from "./metricAlarmContext";

function App() {
  const { globalState: { indicatorsList }, updateIndicatorState } = useGlobalContext();
  const [editIndicator, setEditIndicator] = useState(makeMetricAlarmIndicatorState({ id: 'editDummy' }));

  return (
    <div className='twin_components'>
      <div>
        <MetricAlarmIndicator { ...editIndicator } edit={true} />
      </div>
      <hr className='form_separator' />
      <div className='indicators_container'>
        {
          indicatorsList.map((indicatorParams, index) => {
            return (<MetricAlarmIndicator key={indicatorParams.id} { ...indicatorParams } updateIndicatorState />)
          })
        }
      </div>
    </div>
  );
}

export default App;
