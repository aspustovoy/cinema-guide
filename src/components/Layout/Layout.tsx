import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './index.css';

const Layout: FC = () => {
  return (
    <div className="appPage">
      <Header />
      <main className="main">
        <div className="container main__container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
