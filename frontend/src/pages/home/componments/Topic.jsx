import React, { PureComponent } from "react";
import { TopicWrapper, TopicItem } from '../style';
import { connect } from 'react-redux';

class Topic extends PureComponent {
    render() {
        const { topicList } = this.props;
        return (
            <TopicWrapper>
                {
                    topicList.map((item) => (
                        <TopicItem
                            key={item.get('id')}
                        >
                            <img
                                className='topic-img'
                                src={item.get('imgUrl')}
                                alt={'topic' + item.get('id')}
                            />
                            {item.get('title')}
                        </TopicItem>
                    ))
                }
            </TopicWrapper >
        )
    }
}

const mapState = (state) => {
    return {
        topicList: state.getIn(['home', 'topicList'])
    }
}

export default connect(mapState, null)(Topic);