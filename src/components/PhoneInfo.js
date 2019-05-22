import React, { Component } from 'react';

class PhoneInfo extends Component {
    // info라는 객체를 받아와서 렌더링해줄건데, 
    // info값이 전달되지 않을 경우 컴포넌트가 크래쉬 된다. 
    // 그래서 defaultProps를 통해 info의 기본 값을 설정해준다. 
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }

    handleRemove = () => {
        // 삭제버튼이 클릭되면 onRemove 에 id넣어서 호출
        const { info, onRemove } = this.props;
        onRemove(info.id); 
    }

    render() {
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        const {
            name, phone, id
        } = this.props.info;

        return(
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;