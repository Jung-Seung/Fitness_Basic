import React, { Component } from "react";
import "../../css/Teach/Person.css";
import axios from "axios";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charge: props.charge,
      word: props.word,
      edit: false,
    };
  }

  deletePersonInfo = async () => {
    const { id } = this.props;
    try {
      await axios.delete(`/person/${id}`);
      this.props.fetchPersonList();
    } catch (error) {
      console.error("Error deleting person info:", error);
    }
  };

  updatePersonInfo = async () => {
    const { id } = this.props;
    const { charge, word } = this.state;
    try {
      await axios.put(`/person/${id}`, { charge, word });
      this.setState({ edit: false });
      this.props.fetchPersonList();
    } catch (error) {
      console.error("Error updating person info:", error);
    }
  };

  toggleEdit = () => {
    this.setState((prevState) => ({
      edit: !prevState.edit,
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, profile, charge, word, id } = this.props;
    const { edit } = this.state;
    const img = `/uploads/person/${profile}`;

    if (edit) {
      return (
        <div id="person">
          <div id="person-profile">
            <img src={img} alt="profile" />
          </div>
          <div id="person-desc">
            <div>{name}</div>
            <div>
              {" "}
              <input
                type="text"
                name="charge"
                value={this.state.charge}
                onChange={this.handleChange}
              />
            </div>
            <div>
                {" "}
              <input
                type="text"
                name="word"
                value={this.state.word}
                onChange={this.handleChange}
              />
            </div>
            <button onClick={() => this.updatePersonInfo(id)}>확인</button>
            <button onClick={this.toggleEdit}>취소</button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="person">
          <div id="person-profile">
            <img src={img} alt="profile" />
          </div>
          <div id="person-desc">
            <div>{name}</div>
            <div>{charge}</div>
            <div>{word}</div>
            <button onClick={this.toggleEdit}>수정</button>
            <button onClick={() => this.deletePersonInfo(id)}>삭제</button>
          </div>
        </div>
      );
    }
  }
}

export default Person;
