
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div id="footer">
        <p>&#169; 2022 Kay Rubio</p>
        <p>
          <Link className="footerlink center" to="/privacy">Privacy Policy</Link>
          &#8226;
          <Link className="footerlink center" to="/terms">Terms of Service</Link>
          &#8226;
          <a className="center" href="mailto:ksweeneyrubio@gmail.com">Contact</a>
        </p>
    </div>
  );
}
 
export default Footer;