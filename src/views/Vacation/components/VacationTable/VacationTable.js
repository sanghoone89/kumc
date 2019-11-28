import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import CustomTooltip from "components/custom/CustomTooltip";
class VacationTable extends React.Component {
    getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MuiTypography: {
                    root: {
                        fontFamily: '"Noto Sans KR", "Meiryo", serif',
                    },
                    subtitle1: {
                        fontFamily: '"Noto Sans KR", "Meiryo", serif',
                    }
                },
                MUIDataTable: {
                    responsiveScrollMaxHeight: {
                        maxHeight: `${(window.innerHeight - 400) > 400 ? (window.innerHeight - 400) : 400}px`,
                    }
                },
                MUIDataTableHeadCell: {
                    root: {
                        fontFamily: '"Noto Sans KR", "Meiryo", serif',
                        fontSize: "0.8rem",
                        padding: "14px 20px 14px 20px"
                    },
                    sortAction: {
                        justifyContent: "center"
                    },
                    toolButton: {
                        justifyContent: "center"
                    }
                },
                MuiTableRow: {
                    root: {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        '&$hover:hover': {
                            backgroundColor: '#e2eaf9'
                        }
                        //borderLeft: "1px solid rgba(224, 224, 224, 1)"
                    }
                },
                MUIDataTableToolbar: {
                    root: {
                        fontSize: "1rem"
                    }
                },
                MuiPaper: {
                    elevation4: {
                        boxShadow: "none",
                        border: "1px solid rgba(224, 224, 224, 1)",
                        borderBottom: "none",
                        borderTop: "none",
                        borderRadius: "0px"
                    }
                },
                MUIDataTableBodyCell: {
                    root: {
                        fontFamily: '"Noto Sans KR", "Meiryo", serif',
                        textAlign: "center",
                        padding: "14px 20px 14px 20px",
                    }
                },
                MuiFormControl: {
                    root: {
                        width: "100%"
                    }
                },
            }
        });

    rowClick = (rowData, rowMeta) => {
        this.props.handleRowClickOpen(rowData);
    };

    render() {
        const { handleClickOpen, handleMemberList, pagination } = this.props;

        const columns = [
            { name: "username", label: "이름", options: { filter: false, sort: false } },
            { name: "nickname", label: "닉네임", options: { filter: false, sort: false } },
            { name: "startdate", label: "휴가 시작일", options: { filter: false, sort: false } },
            { name: "enddate", label: "휴가 종료일", options: { filter: false, sort: false } },
            { name: "vacationtype", label: "휴가 유형", options: { filter: false, sort: false } },
            { name: "officialholiday", label: "공가", options: { filter: false, sort: false } },
            { name: "calc", label: "휴가 일수", options: { filter: false, sort: false } },
        ]
        const options = {
            filterType: 'dropdown',
            responsive: 'scrollMaxHeight',
            print: false,
            download: false,
            display: false,
            viewColumns: false,
            search: false,
            filter: false,
            selectableRows: "none",
            selectableRowsOnClick: false,
            rowsPerPage: 50,
            rowsPerPageOptions: [50],
            onRowClick: this.rowClick,
            customFooter: pagination,
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
                    rowsPerPage: "",
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
VacationTable.propTypes = {
    className: PropTypes.string,
    users: PropTypes.array.isRequired
};

export default VacationTable;
