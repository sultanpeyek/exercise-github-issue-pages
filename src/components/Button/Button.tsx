import React from 'react';

import style from './Button.module.css';

const Button = ({ onClick }: any) => {
  return (
    <button className={style.Button} onClick={onClick}>
      Search
    </button>
  );
};

export default Button;
