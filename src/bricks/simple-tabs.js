/**
 * Simple Tab Layout
 * Input: Tabs  array of tab
 *  Fields in tab:
 *    label   mandatory
 *    body    optional, static content of tab body
 *    render  optional, render of dynamic body of tab
 **/

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  tabBodyRender = tabBody => {
    if (typeof tabBody === "function") {
      return tabBody();
    } else {
      return tabBody;
    }
  };
  render() {
    const { tabs, classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            {tabs.map((tab, index) => (
              <Tab label={tab.label} key={"tab-header" + index} />
            ))}
          </Tabs>
        </AppBar>
        {tabs.map(
          (tab, index) =>
            value === index && (
              <TabContainer key={"tab-body-" + index}>
                {this.tabBodyRender(tab.body)}
              </TabContainer>
            )
        )}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  tabs: PropTypes.array.isRequired
};

export default withStyles(styles)(SimpleTabs);
