import React, { PureComponent } from 'react';
import { DetailWrapper, Header, Content } from './style';
import { connect } from 'react-redux';
import { getData } from './store/actionCreators';

class Detail extends PureComponent {
    componentDidMount() {
        this.props.getDetail(this.props.match.params.id);
    }
    render() {
        const { title, content } = this.props;
        return (
            <DetailWrapper>
                <Header>
                    {title}
                </Header>
                <Content
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </DetailWrapper>
        )
    }
}

const mapState = (state) => ({
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content'])
});

const mapDispatch = (dispatch) => {
    return {
        getDetail(id) {
            dispatch(getData(id));
        }
    }
};

export default connect(mapState, mapDispatch)(Detail);