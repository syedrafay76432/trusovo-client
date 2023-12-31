import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='completed'>Completed</option>
          <option value='in_progress'>In Progress</option>
          <option value='canceled'>Canceled</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;