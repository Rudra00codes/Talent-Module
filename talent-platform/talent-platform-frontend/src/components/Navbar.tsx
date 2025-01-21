import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/talent/register">Register as Talent</Link>
      <Link to="/client/register">Register as Client</Link>
    </nav>
  );
};

export default Navbar; 