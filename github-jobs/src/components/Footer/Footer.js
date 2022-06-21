import 'components/Footer/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <small className="copyright">
        {`created by `}
        <b>
          <a href="https://github.com/gitraya" target="_blank" rel="noreferrer">
            gitraya
          </a>
        </b>
        {`- devChallenges.io`}
      </small>
    </footer>
  );
};

export default Footer;
