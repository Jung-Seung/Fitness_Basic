import React, { Component } from "react";
import "../css/Teach.css";
import Person from "./Teach/Person.js";
import InputComp from "./Teach/InputComp.js";
import axios from "axios";

class Teach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
    };
  }

  componentDidMount() {
    this.fetchPersonList();
  }

  fetchPersonList = async () => {
    try {
      const response = await axios.get("/person");
      this.setState({ personList: response.data });
    } catch (error) {
      console.error("Error fetching person list:", error);
    }
  };

  addPersonInfo = async (name, charge, word, file) => {
    try {
      const formData = new FormData();
      formData.append("profile", file);
  
      const uploadResponse = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const { fileName } = uploadResponse.data;
  
      const response = await axios.post("/person", {
        name,
        charge,
        word,
        profile: fileName,
      });
  
      console.log(response.data);
      this.fetchPersonList();
    } catch (error) {
      console.error("Error adding person info:", error);
    }
  };
  

  deletePersonInfo = async (id) => {
    try {
      const response = await axios.delete(`/person/${id}`);
      console.log(response.data);
      this.fetchPersonList();
    } catch (error) {
      console.error("Error deleting person info:", error);
    }
  };

  updatePersonInfo = async (id, charge, word) => {
    try {
      const response = await axios.put(`/person/${id}`, { charge, word });
      console.log(response.data);
      this.fetchPersonList();
    } catch (error) {
      console.error("Error updating person info:", error);
    }
  };

  render() {
    const { personList } = this.state;
    const result = personList.map((data) => (
      <Person
        key={data.id}
        id={data.id}
        name={data.name}
        charge={data.charge}
        word={data.word}
        profile={data.profile}
        deletePersonInfo={this.deletePersonInfo}
        updatePersonInfo={this.updatePersonInfo}
        fetchPersonList={this.fetchPersonList}
      />
    ));

    return (
      <div id="teach">
        <InputComp
          addPersonInfo={this.addPersonInfo}
          fetchPersonList={this.fetchPersonList}
        />
        {result}
      </div>
    );
  }
}

export default Teach;
