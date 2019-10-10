import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
class UsersTable extends React.Component {
  getMuiTheme = () => theme;
  render() {
    console.log('getMuiTheme :', this.getMuiTheme());
    const columns = ['Name', 'Alias', 'NickName', 'Remain'];
    const options = {
      filterType: 'dropdown',
      responsive: 'scrollMaxHeight',
      selectableRows: 'none',
      fiexdHeader: true,
      print: false,
      download: false,
      elevation: 1
    };
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          data={this.props.users}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}
UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
