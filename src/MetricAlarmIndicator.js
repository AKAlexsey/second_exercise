function MetricAlarmIndicator( props ) {
    const { metric } = props;
    const alarmCondition  = (value) => { return value < 10; };
    const errorMessage = 'Value is less than 10';
    const alarm = alarmCondition(metric);


    return (
      <div className={alarm?'metric_alarm_indicator run_indicator_alarm':'metric_alarm_indicator'}>
        {
          alarm &&
            <div className="alarm_message">
              { errorMessage }
            </div>
        }
        <div className="metric">
          { metric }
        </div>
      </div>
    );
  }
  
  export default MetricAlarmIndicator;