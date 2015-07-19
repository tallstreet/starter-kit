import React from 'react';
import Header from '../Header';

const bgURL = require('./images/bg.jpg');
const styles = {
  applicationComponent: {
    backgroundImage: 'url(' + bgURL + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    fontFamily: 'Helvetica Neue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  applicationComponentWrap: {
    width: '500px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '1em',
    borderRadius: '.3em',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
  },
};

export default class Application extends React.Component {
  render() {
    return (
      <div style={styles.applicationComponent}>
        <div style={styles.applicationComponentWrap}>
          <Header />

          <main>
            <p>Seems like creating your own React starter kit is a right of passage. So, here's mine.</p>
            <p>For more information, see the <a href="https://github.com/tallstreet/starter-kit#tallstret-starterkit">README</a>.</p>
          </main>
        </div>
      </div>
    );
  }
}
