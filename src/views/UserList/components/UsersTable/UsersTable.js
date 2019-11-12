import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import CustomTooltip from "components/custom/CustomTooltip";
class UsersTable extends React.Component {
  getMuiTheme = () => theme;

  rowClick = (rowData, rowMeta) => {
    this.props.handleRowClickOpen(rowData);
  };

  render() {
    const { handleClickOpen, handleMemberList } = this.props;

    const columns = [
      { name: "memberid", label: "번호" }, //options: { filter: false, sort: false, display: false } },
      { name: "username", label: "이름" },
      { name: "nickname", label: "닉네임" },
      { name: "phonenumber", label: "휴대폰 번호" },
      { name: "position", label: "직책" }
    ]
    const options = {
      filterType: 'dropdown',
      responsive: 'scrollMaxHeight',
      selectableRows: 'none',
      fiexdHeader: true,
      print: false,
      download: false,
      elevation: 1,
      rowsPerPage: 30,
      rowsPerPageOptions: [30, 60, 120],
      onRowClick: this.rowClick,
      customToolbar: () => {
        return (
          <CustomTooltip handleClickOpen={handleClickOpen} />
        );
      },
      textLabels: {
        toolbar: {
          search: "검색",
          viewColumns: "선택 검색",
          filterTable: "필터 검색"
        },
        body: {
          noMatch: "일치하는 데이터가 없습니다",
          toolTip: "Sort",
        },
        pagination: {
          next: "Next Page",
          previous: "Previous Page",
          rowsPerPage: "Rows per page:",
          displayRows: "of",
        },
        filter: {
          all: "All",
          title: "FILTERS",
          reset: "RESET",
        },
        viewColumns: {
          title: "Show Columns",
          titleAria: "Show/Hide Table Columns",
        },
        selectedRows: {
          text: "row(s) selected",
          delete: "Delete",
          deleteAria: "Delete Selected Rows",
        },
      }
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
