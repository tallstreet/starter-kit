import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {post} from '../../actions/BackendActions';

function Home(props) {
  return (
      <main>
        <p>Seems like creating your own React starter kit is a right of passage. So, here's mine.</p>
        <p>For more information, see the <a href="https://github.com/tallstreet/starter-kit#tallstret-starterkit">README</a>.</p>
      </main>
  );
};

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    error: state.backend.error,
    post: state.backend.post,
    loading: state.backend.loading
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    post: (text) => dispatch(post(text))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
