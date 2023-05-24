import '../../css/Gallery/Input.css';
import React, { Component } from 'react'
import axios from 'axios';

class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: null,
    }
  }

  handleFileInput=(e)=>{
    this.setState({
      file : e.target.files[0],
    })
  }
  handlePost=async()=>{
    const formData = new FormData();
    formData.append('gallery', this.state.file);
    console.log(formData);

    await axios.post("/gallery/upload", formData).then(res => {
      alert('성공')
    }).catch(err => {
      alert('실패')
    })
  }

  render() {
    return (
      <div>
        <input type="file" name="gallery" onChange={e => this.handleFileInput(e)}/>
        <button type="submit" onClick={this.handlePost}>업로드</button>
      </div>
    )
  }
}

export default Input;