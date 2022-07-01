
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer">
        <p>&#169; 2022 Kay Rubio</p>
        <p>
          <Link className="footerlink center" to="/privacy">Privacy Policy</Link>
          <span aria-hidden='true'>&#8226;</span>
          <Link className="footerlink center" to="/terms">Terms of Service</Link>
          <span aria-hidden='true'>&#8226;</span>
          <a className="center" href="mailto:ksweeneyrubio@gmail.com">Contact</a>
        </p>
    </footer>
  );
}
 
export default Footer;