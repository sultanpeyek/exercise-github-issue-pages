import React from 'react';
import classNames from 'classnames';
import style from './InputField.module.css';

const InputField = ({ className, onChange, onKeyDown, value }: any) => {
  return (
    <input
      type="text"
      className={classNames(style.InputField, className)}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default InputField;
