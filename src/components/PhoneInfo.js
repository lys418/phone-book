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

    state = {
        editing: false,
        name: '',
        phone: ''
    }

    handleRemove = () => {
        // 삭제버튼이 클릭되면 onRemove 에 id넣어서 호출
        const { info, onRemove } = this.props;
        onRemove(info.id); 
    }

    // editing 값을 반전시킴 (true => false, fasle => true) / text => input text로 바뀌도록 설정값
    handleToggleEdit = () => {
        console.log("toggleEdit!!")
        const { editing } = this.state;
        this.setState({ editing: !editing });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    // 업데이트 후 호출되는 함수
    componentDidUpdate(prevProps, prevState) {
        const { info, onUpdate} = this.props;
        if(!prevState.editing && this.state.editing){
            console.log("1")
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }

        if(prevState.editing && !this.state.editing) {
            console.log("2")
            console.log(this.state)
            onUpdate(info.id, {
                id: info.id,
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(!this.state.editing
            && !nextState.editing
            && nextProps.info === this.props.info
            ){
                return false;
            }
        return true;
    }

    render() {
        console.log('render PhoneInfo' + this.props.info.id);

        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        const { editing } = this.state;

        //수정모드
        if(editing) {
            return (
                <div style={style}>
                    <div>
                        <input 
                            value={this.state.name}
                            name="name"
                            placeholder="이름"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input 
                            value={this.state.phone}
                            name="phone"
                            placeholder="전화번호"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        }
        
        //일반모드
        const {
            name, phone
        } = this.props.info;

        return(
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;