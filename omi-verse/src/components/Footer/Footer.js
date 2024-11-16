import Container from '@components/Container';

import styles from './Footer.module.scss';

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <Container className={`${styles.footerContainer} ${styles.footerLegal}`}>
        <p>
          &copy; <a href="http://localhost:3000"> 2024 OMIverse.</a> All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
