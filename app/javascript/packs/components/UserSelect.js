import React, { Component } from 'react';
import AsyncPaginate from 'react-select-async-paginate';
import { fetch } from '../utils/Fetch';

export default class UserSelect extends Component {
  state = {
    inputValue: '',
  }

  getOptionLabel = (option) => {
    const { first_name, last_name } = option;
    return `${first_name} ${last_name}`;
  }

  getOptionValue = option => option.id

  loadOptions = (search, loadedOptions, { page, per_page }) => {
    const usersUrl = Routes.api_v1_users_path({
      q: {
        first_name_or_last_name_cont: search,
      },
      page,
      per_page,
      format: 'json',
    });

    return fetch('GET', usersUrl)
      .then(({ data }) => {
        const { current_page, total_pages } = data.meta;
        const hasMore = current_page < total_pages;
        return {
          options: data.items,
          hasMore,
          additional: {
            page: hasMore ? page + 1 : page,
            per_page,
          },
        };
      });
  }

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  }

  render() {
    const { value, isDisabled, onChange } = this.props;

    return (
      <div>
        <AsyncPaginate
          cacheOptions
          value={value}
          loadOptions={this.loadOptions}
          debounceTimeout={500}
          defaultOptions
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={isDisabled}
          onChange={onChange}
          additional={{
            page: 1,
            per_page: 10,
          }}
        />
      </div>
    );
  }
}