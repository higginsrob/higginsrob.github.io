import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

let scope = this;

class App extends Component {

    constructor(props) {
        super(props);
        scope = this;
    }

    render() {
        const props = scope.props;
        return <div>{props.ready && props.children}</div>;
    }

}

function mapStateToProps(state) {
    return {
        ready: state.app.ready
    };
}

export default withRouter(connect(mapStateToProps)(App));

