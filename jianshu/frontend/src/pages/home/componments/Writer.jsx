import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { WriterWrapper } from '../style';

class Writer extends PureComponent {
    render() {
        return (
            <WriterWrapper />
        )
    }
}

const mapState = (state) => {
    return {
        list: state.getIn(['home', 'writerList'])
    }
}

export default connect(mapState, null)(Writer);