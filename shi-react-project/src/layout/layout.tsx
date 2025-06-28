import { type FC } from 'react';
import $ from './layout.module.css';
import LogoIcon from '../assets/icons/logo.png';
import DownloadIcon from '../assets/icons/downloadIcon.svg';
import HistoryIcon from '../assets/icons/historyIcon.svg';
import AddIcon from '../assets/icons/addIcon.svg';
import { HeaderLink } from '../components/HeaderLink/HeaderLink';

type HeaderLinksType = {
  title: string;
  icon: string;
  path: string;
};

const headerLinks: HeaderLinksType[] = [
  { title: 'CSV Аналитик', icon: DownloadIcon, path: '/' },
  { title: 'CSV Генератор', icon: AddIcon, path: '/generator' },
  { title: 'История', icon: HistoryIcon, path: '/history' },
];

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <header>
      <div className={$.container}>
        <a href="#" className={$.logo}>
          <img src={LogoIcon} />
        </a>
        <span className={$.titleContent}>
          <h1 className={$.title}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</h1>
        </span>
        <div className={$.navLinkContainer}>
          {headerLinks.map((item, index) => (
            <HeaderLink key={index} icon={item.icon} title={item.title} path={item.path} />
          ))}
        </div>
      </div>
      {children}
    </header>
  );
};

export interface LayoutProps {
  children: React.ReactNode;
}
