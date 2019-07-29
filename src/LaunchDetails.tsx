import React from 'react';
import ILaunch from './data/ILaunch';

export default function LaunchDetails(props: {launch: ILaunch, setDisplayEdit:(value: boolean) => void}) {
  const formatted_date = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(new Date(props.launch.launch_date_utc));
  if (!props.launch) {
    return null;
  }
  function handleEditClick () {
    props.setDisplayEdit(true);
  }
  return (
    <section className="mission_details">
      <img src={props.launch.mission_patch_small} alt={props.launch.mission_name + " mission's patch" }/>
      <table>
        <tbody>
        <tr>
          <td>Mission</td>
          <td>{props.launch.mission_name}</td>
        </tr>
        <tr>
          <td>Year</td>
          <td>{props.launch.launch_year}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>{formatted_date}</td>
        </tr>
        <tr>
          <td>Flight number</td>
          <td>{props.launch.flight_number}</td>
        </tr>
        </tbody>
      </table>
      {
        
      }
      <button onClick={handleEditClick}>Edit</button>
    </section>
    
  );
}
