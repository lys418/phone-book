import React, { Component } from 'react';
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
    ],
    keywordName: '',
    keywordPhone: '',
    keywordGubun: ''
  }

  handleChange = (e) => {
    this.setState({
      keywordName: e.target.value,
      keywordGubun: 'N'
    })
  }

  handleChangePhone = (e) => {
    this.setState({
      keywordPhone: e.target.value,
      keywordGubun: 'P'
    })
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

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
        information: information.map(
            info => id === info.id 
            ? {...info, ...data}
            : info
        )
    })
  }

  render(){
    const { information, keywordName, keywordPhone, keywordGubun } = this.state;
    console.log(keywordGubun);
    console.log('');
    const filteredList = information.filter(
      keywordGubun === 'N' ? 
      info => info.name.indexOf(keywordName) !== -1
      :
      info => info.phone.indexOf(keywordPhone) !== -1
    );
    
    return(
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        <p>
          <input 
            placeholder="검색 할 이름을 입력하세요..."
            onChange={this.handleChange}
            value={keywordName}
          />
        </p>
        <p>
          <input 
            placeholder="검색할 전화번호를 입력하세요..."
            onChange={this.handleChangePhone}
            value={keywordPhone}
          />
          <input type="hidden" value={keywordGubun} />
        </p>
        <PhoneInfoList 
          data={filteredList} 
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
        {/* {JSON.stringify(information)} */}
      </div>
    );
  }
}

export default App;
