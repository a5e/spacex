import React, { useState } from 'react';
import ILaunch from './data/ILaunch';

interface IError {
  fieldName: string,
  message: string
}

export default function LaunchDetailsForm(props: {launch: ILaunch, handleCancel: () => void, onSubmit: (launch: ILaunch) => void}) {
  const [values, setValues] = useState(props.launch);
  const [errors, setErrors] = useState<IError[]>([]);

  // TODO find the proper event type
  const handleCancelClick = (event:any):void => {
    props.handleCancel()
  }

  const validate = (launch:ILaunch) => {
    let errors = [];
    
    if (!Number.isInteger(Number(launch.flight_number))){
      errors.push({
        fieldName: "flight_number",
        message: "Please enter an integer"
      });
    }
    if (launch.mission_name === '') {
      errors.push({
        fieldName: "mission_name",
        message: "Please enter a mission_name"
      });
    }

    return errors;
  }

  // TODO find the proper event type
  const handleChange = (event:any):void => {
    const newValues = {
      ...values,
      [event.target.name]:event.target.value
    };
    setValues(newValues)
    setErrors(
      validate(newValues) 
    );
  }
  // TODO find the proper event type
  const handleSubmit= (event:any):void => {
    event.preventDefault();
    props.onSubmit(values);
  }

  const getErrors = (fieldName:string) => {
    return errors
      .filter(e => e.fieldName === fieldName)
      .map((e)=> {
        return <span>{e.message}</span>
      })
  }

  return (
    <section className="mission_details_form">
      <h1>Edit Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Mission</label>
        <input 
          name="mission_name"
          type="text"
          defaultValue={values.mission_name}
          onChange={handleChange}
        />
        {getErrors('mission_name')}
        <label>Year</label>
        <input
          name="year"
          type="text"
          defaultValue={values.launch_year}
          onChange={handleChange}
        />
        <label>Date</label>
        <input
          name="date"
          type="text"
          defaultValue={values.launch_date_utc}
        />
        <label>Flight number</label>
        <input
          name="flight_number"
          type="number"
          defaultValue={values.flight_number.toString()}
        />
        <label>Patch url</label>
        <input
          name="mission_patch_small"
          type="text"
          defaultValue={values.mission_patch_small}
        />
        <button onClick={handleCancelClick}>Cancel</button>
        <button type="submit" disabled={!!errors.length}>Submit</button>
      </form>
    </section>
  );
}
