import MetricAlarmIndicator from './MetricAlarmIndicator';
import React from 'react';
import { useGlobalContext } from './context';

function App() {
  const {
    globalState: { indicatorsList, editIndicator },
    incIndicatorValue,
    decIndicatorValue,
    deleteIndicator,
    setEditIndicator,
    addNewIndicator,
    updateIndicator
  } = useGlobalContext();

  return (
    <div className='twin_components'>
      <div>
        <MetricAlarmIndicator
          indicatorState={editIndicator}
          editMode={true}
          addIndicatorFunction={addNewIndicator}
          updateIndicatorFunction={updateIndicator}
        />
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
                startEditingIndicatorFunction={setEditIndicator}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
