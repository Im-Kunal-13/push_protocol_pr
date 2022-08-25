import React from 'react';

const Checkbox = (props: { id: string, label: string, value?: boolean, onChange: () => void }) => {
    return (
      <div>
        <input 
          id={props.id}
          type="checkbox" 
          checked={props.value} 
          onChange={props.onChange} 
        />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
    );
  };

  export default Checkbox;