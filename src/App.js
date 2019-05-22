import React, { Component } from 'react';
import './App.css';
import PhoneForm from  './components/PhoneForm'
import PhoneInfoList from './components/PhoneInfoList'

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '김민준',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-0000-0001'
      }
    ]
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({id: this.id++, ...data}) // ...은 자바스크립트의 전개연산자. 기존 객체안의 내용을 해당위치에 풀어준다...
    })
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  render(){
    // const { information } = this.state;
    return(
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        <PhoneInfoList data={this.state.information} />
        {/* {JSON.stringify(information)} */}
      </div>
    );
  }
}

export default App;
