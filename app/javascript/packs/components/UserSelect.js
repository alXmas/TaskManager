import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import { getLoad } from "../utils/FetchHelper";

class UserSelect extends Component {
  state = {
    inputValue: ""
  };
  getOptionLabel = option => {
    return option.first_name + " " + option.last_name;
  };
  getOptionValue = option => {
    return option.id;
  };
  loadOptions = inputValue => {
    getLoad(inputValue).then(({ data }) => {
      return data.items;
    });
  };
  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };
  componentDidMount() {
    this.loadOptions();
  }
  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={this.props.isDisabled}
          defaultValue={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default UserSelect;
