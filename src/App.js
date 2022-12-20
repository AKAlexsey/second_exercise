import MetricAlarmIndicator from './MetricAlarmIndicator'

function App() {
  return (
    <div className="twin_components">
      <MetricAlarmIndicator metric={5} />
      <MetricAlarmIndicator metric={57} />
    </div>
  );
}

export default App;
