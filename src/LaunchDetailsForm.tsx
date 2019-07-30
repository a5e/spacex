import React, { useState } from 'react';
import ILaunch from './data/ILaunch';

interface IError {
  fieldName: string,
  message: string
}

interface IRule {
  condition: (value:string) => boolean,
  message: (field_name:string) => string
}

interface IAppliedRule {
  rule: IRule,
  fields: string[]
}

export default function LaunchDetailsForm(props: {launch: ILaunch, handleCancel: () => void, onSubmit: (launch: ILaunch) => void}) {
  const [values, setValues] = useState(props.launch);
  const [errors, setErrors] = useState<IError[]>([]);

  // TODO find the proper event type
  const handleCancelClick = (event:any):void => {
    props.handleCancel()
  }

  const isRequiredRule = {
    condition: (value:string) => value === '',
    message: (field_name:string) => `${field_name} is required`
  }

  const isIntegerRule = {
    condition: (value:string) => !Number.isInteger(Number(value)),
    message: (field_name:string) => `Please enter an integer for ${field_name}`
  }

  const validate = (launch:any, appliedRules:IAppliedRule[]) => {
    let errors: IError[]= [];

    appliedRules.forEach((aRule:IAppliedRule) => {
      aRule.fields.forEach((field) => {
        if(aRule.rule.condition(launch[field])){
          errors.push({
            fieldName: field,
            message: aRule.rule.message(field)
          })
        }
      })
    })

    return errors;
  }

  const appliedRules = [
    {
      rule: isRequiredRule,
      fields: ["flight_number", "mission_name", "date", "year"]
    },
    {
      rule: isIntegerRule,
      fields: ["flight_number"]
    }
  ]

  // TODO find the proper event type
  const handleChange = (event:any):void => {
    const newValues = {
      ...values,
      [event.target.name]:event.target.value
    };
    setValues(newValues)
    setErrors(
      validate(newValues,appliedRules) 
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
      .map((e, index)=> {
        return <span className="error" key={fieldName+index}>{e.message}</span>
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
        {getErrors('year')}
        <label>Date</label>
        <input
          name="date"
          type="text"
          defaultValue={values.launch_date_utc}
          onChange={handleChange}
        />
        {getErrors('date')}
        <label>Flight number</label>
        <input
          name="flight_number"
          type="number"
          defaultValue={values.flight_number.toString()}
          onChange={handleChange}
        />
        {getErrors('flight_number')}
        <label>Patch url</label>
        <input
          name="mission_patch_small"
          type="text"
          defaultValue={values.mission_patch_small}
          onChange={handleChange}
        />
        {getErrors('mission_patch_small')}
        <button onClick={handleCancelClick}>Cancel</button>
        <button type="submit" disabled={!!errors.length}>Submit</button>
      </form>
    </section>
  );
}
