import React, { useState } from 'react';
import classNames from 'classnames';
import style from './DropdownMenu.module.css';

const DropdownMenu = ({ onClick, children, title, headerClassName }: any) => {
  const [openDropDown, setOpenDropDown] = useState(false);

  const handleClick = () => {
    setOpenDropDown(!openDropDown);
  };
  return (
    <div className={classNames(style.DropdownMenuWrapper, headerClassName)}>
      <button className={style.DropdownMenuTitle} onClick={handleClick}>
        {title}
      </button>
      {openDropDown && <div className={style.DropdownMenu}>{children}</div>}
    </div>
  );
};

export default DropdownMenu;
