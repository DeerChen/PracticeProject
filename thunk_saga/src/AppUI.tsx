import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import './AppUI.less';

interface Props {
    inputVal: string;
    data: string[];
    inputChange: Function;
    sub: Function;
    delItem: Function;
}

function AppUI(props: Props) {
    return (
        <Fragment>
            <Input
                id='antdInput'
                placeholder='输入内容'
                value={props.inputVal}
                onChange={(e) => props.inputChange(e.target.value)}
            />
            <Button
                id='antdButton'
                type='primary'
                onClick={() => props.sub(props.inputVal)}
            >提交</Button>
            <List
                id='antdList'
                bordered
                dataSource={props.data}
                renderItem={(item, index) => (
                    <List.Item
                        id='antdItem'
                        onClick={() => props.delItem(index)}
                    >
                        {item}
                    </List.Item>
                )} />
        </Fragment>
    )
}

export default AppUI;