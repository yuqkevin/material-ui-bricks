/**
 * SimpleTable
 *  HeaderToolbar (optional)
 *  Table
 *    EnhancedTableHeader (optional)
 *    TableBody
 *    PaginatedTableFooter (optional)
 *
 * Input:
 *  header:
 *    title:  table title
 *    toolbar:  header right toolbar
 *    highligth: false, contole
 *    message:  ''
 *  table:
 *    header: column definitions
 *    data: data rows
 *    footer:
 *      message:
 *      pagesize: default page size
 **/

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

import FlipToolBars from "./flip-toolbars";
import BrickBase from "./brick";

function toggleHighlight() {
  this.setState({ highlight: !this.state.highlight });
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const rows = this.props.columns;
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      hasCheckBox
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {hasCheckBox && (
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            )}
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "right",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class Brick extends BrickBase {
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: state.data.map(n => n.id),
        message: `${state.data.length} selected`,
        highlight: true
      }));
      return;
    }
    this.setState({ selected: [], message: "", highlight: false });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    let message =
      newSelected.length > 0 ? `${newSelected.length} selected` : "";
    this.setState({
      selected: newSelected,
      highlight: newSelected.length > 0 ? true : false,
      message: message
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ pageSize: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentWillMount() {
    this.RightTopToolbar = () => {
      if (this.bricks["RightTopToolbar"]) {
        let RightTopToolbar = this.bricks["RightTopToolbar"].component;
        let data = this.bricks["RightTopToolbar"].data;
        if (data.handlers && data.handlers.parent) {
          let parentHandlers = [];
          data.handlers.parent.map(fname =>
            parentHandlers.push(this.handlers[fname])
          );
          data.handlers.parent = parentHandlers;
        }
        return <RightTopToolbar {...data} />;
      } else {
        return <div />;
      }
    };
  }
  render() {
    const { classes, title } = this.props;
    const { columns, rows } = this.props.table;
    const {
      data,
      order,
      orderBy,
      selected,
      pageSize,
      page,
      hasCheckBox
    } = this.state;
    const RightTopToolbar = this.RightTopToolbar || NaN;
    const emptyRows =
      pageSize - Math.min(pageSize, data.length - page * pageSize);
    return (
      <Paper className={classes.root}>
        <Toolbar className={classes.default}>
          <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
              {title}
            </Typography>
          </div>
          {RightTopToolbar()}
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              columns={columns}
              hasCheckBox={hasCheckBox}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * pageSize, page * pageSize + pageSize)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        {hasCheckBox && <Checkbox checked={isSelected} />}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.calories}</TableCell>
                      <TableCell numeric>{n.fat}</TableCell>
                      <TableCell numeric>{n.carbs}</TableCell>
                      <TableCell numeric>{n.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {pageSize > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={pageSize}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        )}
      </Paper>
    );
  }
}

Brick.defaultProps = {
  handlers: { local: [], parent: [] }
};
Brick.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  table: PropTypes.object.isRequired,
  bricks: PropTypes.array,
  handlers: PropTypes.object, // {local: [], parent: []}
  withClasses: PropTypes.object, //for customization
  initState: PropTypes.object //init state
};

export default withStyles(styles)(Brick);
