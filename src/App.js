import MetricAlarmIndicator from './MetricAlarmIndicator';
import { MORE_SIGN, LESS_SIGN } from './metricAlarmContext';
import React from 'react';

function App() {
  return (
    <div className="twin_components">
      <MetricAlarmIndicator id={1} value={5} sign={MORE_SIGN} limitValue={2} />
      <MetricAlarmIndicator id={1} value={7} sign={LESS_SIGN} limitValue={5} />
    </div>
  );
}

export default App;
