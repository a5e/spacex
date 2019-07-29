import React from 'react';
import LaunchListItem from './LaunchListItem';
import ILaunch from './data/ILaunch';

interface LaunchListProps {
    launches: ILaunch[]
    handleSelect: (flightNumber: number) => void
    selectedLaunchNumber: number
}

export default function LaunchList(props:LaunchListProps){
    return (
        <section className="mission_list">
            <ul>
            {props.launches.map((launch:ILaunch) => {
                    return <LaunchListItem 
                        launch={launch}
                        key={launch.flight_number + launch.mission_name}
                        handleClick={props.handleSelect}
                        isSelected={launch.flight_number === props.selectedLaunchNumber}/>
                })
            }
            </ul>
        </section>
    );
}