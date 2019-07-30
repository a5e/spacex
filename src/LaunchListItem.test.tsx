import React from 'react';
import ReactDOM from 'react-dom';
import LaunchListItem from './LaunchListItem';
import renderer from 'react-test-renderer';

const launch = {
  "flight_number": 82,
  "mission_name": "CRS-18",
  "launch_year": "2019",
  "launch_date_utc": "2019-07-25T22:01:00.000Z",
  "mission_patch_small": "https://i.imgur.com/X2shYek.png"
}

test('LaunchListItem displays a patch and title', () => {
  const component = renderer.create(
    <LaunchListItem 
      launch = {launch}
      isSelected = {false}
      handleClick = {
        () => {}
      }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('LaunchListItem should have selected class if selected', () => {
  const component = renderer.create(
    <LaunchListItem 
      launch = {launch}
      isSelected = {true}
      handleClick = {
        () => {}
      }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
