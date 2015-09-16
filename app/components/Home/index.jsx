import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BackendActions from '../../actions/BackendActions';

class Home extends React.Component {
  render() {
    return (
        <main>
          <p>Seems like creating your own React starter kit is a right of passage. So, here's mine.</p>
          <p>For more information, see the <a href="https://github.com/tallstreet/starter-kit#tallstret-starterkit">README</a>.</p>
        </main>
    );
  }
}


@connect(state => ({
  error: state.backend.error,
  post: state.backend.post,
  loading: state.backend.loading
}))
export default class HomeContainer extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { error, loading, dispatch } = this.props;
    return <Home error={error}
                    loading={loading} {...bindActionCreators(BackendActions, dispatch)} >{this.props.children}</Home>;
  }
}
