import { type FC } from 'react';
import { NavLink } from 'react-router-dom';
import $ from './HeaderLink.module.css';

export const HeaderLink: FC<HeaderLinkProps> = (props) => {
  const { title, icon, path } = props;

  return (
    <NavLink to={path} className={({ isActive }) => `${$.link} ${isActive ? $.active : ''}`}>
      <img src={icon} />
      {title}
    </NavLink>
  );
};

export interface HeaderLinkProps {
  title: string;
  icon: string;
  path: string;
}
