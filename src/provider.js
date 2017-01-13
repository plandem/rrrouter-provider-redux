import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Provider } from 'rrrouter';
import { go, back, forward, navigate } from './actions';

const providerMapper = (state, props) => ({ route: state[props.stateKey] });
const ReduxProvider = connect(providerMapper, { go, back, forward, navigate })(Provider);

ReduxProvider.propTypes = {
	stateKey: PropTypes.string.isRequired,
};

export default ReduxProvider;