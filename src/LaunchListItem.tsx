import React from 'react';
import ILaunch from './data/ILaunch';

interface LaunchListItemProps {
    launch: ILaunch
    handleClick: (flightNumber:number) => void
    isSelected: boolean
}

export default function LaunchListItem(props:LaunchListItemProps) {
    let classes = ['mission_list_item']
    if (props.isSelected) {
        classes.push('selected')
    }
    return (
        <li className={classes.join(' ')}
            onClick={()=> {props.handleClick(props.launch.flight_number);}}
            data-flight-number={props.launch.flight_number}>
            <img src={props.launch.mission_patch_small} alt={props.launch.mission_name + " mission's patch" }/> {props.launch.mission_name}
        </li>
    );
}
