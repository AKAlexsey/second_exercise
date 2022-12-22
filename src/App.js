import MetricAlarmIndicator from './MetricAlarmIndicator';
import { MORE_SIGN, LESS_SIGN } from './metricAlarmContext';
import React from 'react';

function App() {
  return (
    <div className='twin_components'>
      <h2>
        form
      </h2>
      <hr className='form_separator' />
      <div className='indicators_container'>
        <MetricAlarmIndicator id={1} value={5} sign={MORE_SIGN} limitValue={2} />
        <MetricAlarmIndicator id={1} value={7} sign={LESS_SIGN} limitValue={5} />
      </div>
    </div>
  );
}

export default App;
