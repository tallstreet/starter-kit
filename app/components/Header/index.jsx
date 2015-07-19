import React from 'react';
import Radium from 'radium';

const styles = {
  headerComponent: {
    display: 'flex',
    paddingBottom: '1em',
    borderBottom: '1px solid #eee',
    marginBottom: '1em',
  },

  headerComponentLogo: {
    marginRight: '20px',
  },

  headerComponentWrap: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
  },

  headerComponentTitle: {
    marginBottom: '0.5em',
    fontWeight: 'bold',
    fontSize: '2em',
  },
};

/*
  Reference an image and get back a URL automatically via webpack.
  webpack takes care of versioning, bundling for production, etc.
*/
const logoURL = require('./images/react-logo.svg');

@Radium
export default class Header extends React.Component {
  render() {
    return (
      <header style={styles.headerComponent}>
        <img style={styles.headerComponentLogo} src={logoURL} height="125" />

        <div style={styles.headerComponentWrap}>
          <h1 style={styles.headerComponentTitle}>Tallstreet Starter Kit</h1>
          <h2 style={styles.headerComponentTagLine}>The simple things tied together</h2>
        </div>
      </header>
    );
  }
}
