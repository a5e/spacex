import React from 'react';
import ReactDOM from 'react-dom';
import LaunchList from './LaunchList';
import renderer from 'react-test-renderer';


const launches = [
    {
        "flight_number": 1,
        "mission_name": "FalconSat",
        "launch_year": "2006",
        "launch_date_utc": "2006-03-24T22:30:00.000Z",
        "mission_patch_small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png"
    }, {
        "flight_number": 2,
        "mission_name": "DemoSat",
        "launch_year": "2007",
        "launch_date_utc": "2007-03-21T01:10:00.000Z",
        "mission_patch_small": "https://images2.imgbox.com/4f/e3/I0lkuJ2e_o.png"
    }, {
        "flight_number": 3,
        "mission_name": "Trailblazer",
        "launch_year": "2008",
        "launch_date_utc": "2008-08-02T03:34:00.000Z",
        "mission_patch_small": "https://images2.imgbox.com/3d/86/cnu0pan8_o.png"
    }
]

test('LaunchList should have 3 items', () => {
  const component = renderer.create(
    <LaunchList 
      launches = {launches}
      handleSelect = {
        () => {}
      }
      selectedLaunchNumber={2}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Launch number 3 should be selected', () => {
    const component = renderer.create(
        <LaunchList 
          launches = {launches}
          handleSelect = {
            () => {}
          }
          selectedLaunchNumber={3}
        />
      );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});