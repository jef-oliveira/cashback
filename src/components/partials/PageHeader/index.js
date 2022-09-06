import NavBar from './NavBar';
import Banner from './Banner';

function PageHeader({ className, ...props }) {
  return (
    <>
      <NavBar />
      <Banner />
    </>
  );
}

export default PageHeader;
