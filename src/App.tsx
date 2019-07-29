import React, { useState } from 'react';
import './App.css';
import LaunchList from './LaunchList';
import LaunchDetails from './LaunchDetails';
import LaunchDetailsForm from './LaunchDetailsForm';
import launches from './data/launches.json';
import ILaunch from './data/ILaunch';

const App: React.FC = () => {
  const [displayEdit, setDisplayEdit] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState(launches[launches.length-1]);

  const handleSelect = (flightNumber: number) :void => {
    if (flightNumber === selectedLaunch.flight_number) {
      return
    }
    setSelectedLaunch(launches[flightNumber-1]);
    setDisplayEdit(false);
  }

  const handleCancel = () :void => {
    setDisplayEdit(false);
  }

  const onSubmit = (launch: ILaunch) :void => {
    console.dir(launch);
    setSelectedLaunch(launch);
    setDisplayEdit(false);
  }

  return (
    <div className="App">
      <LaunchList
        launches={[...launches].reverse() as ILaunch[]}
        handleSelect={handleSelect}
        selectedLaunchNumber={selectedLaunch.flight_number}
      />
      <div className="column">
        <LaunchDetails
          launch={selectedLaunch}
          setDisplayEdit={setDisplayEdit}
        />
        {displayEdit &&
          <LaunchDetailsForm 
            launch={selectedLaunch}
            handleCancel={handleCancel}
            onSubmit={onSubmit}
          />
        }
      </div>
    </div>
  );
}

export default App;
