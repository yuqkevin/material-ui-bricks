import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import "./styles.css";

function pickBrick(brickName) {
  //this.setState({ brick: <div>{brickName}</div> });
  let brick = null;
  let bricks = this.state.bricks;
  if (bricks[brickName]) {
    brick = bricks[brickName];
    this.setState({ brick });
  } else {
    console.log("loading ", brickName);
    brick = Loadable({
      loader: () => import(`./bricks/${brickName}`),
      loading: () => <div>Loadding {brickName} ...</div>
    });
    bricks[brickName] = brick;
    this.setState({ bricks, brick });
  }
}
function Toc() {
  return (
    <div>
      <Button size="small" onClick={() => pickBrick("simple-tabs")}>
        Simple Tabs
      </Button>
      <Button size="small" onClick={() => pickBrick("flip-toolbars")}>
        Flip Toolbars
      </Button>
      <Button size="small" onClick={() => pickBrick("simple-table")}>
        Simple Table
      </Button>
    </div>
  );
}
function Container(props) {
  const MyBrick = props.brick;
  return <MyBrick />;
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bricks: [],
      brick: () => (
        <Typography>
          <img
            alt="brick-logo"
            height={300}
            src={
              "https://uploads.codesandbox.io/uploads/user/eb5600f7-ac63-46e4-98a2-3c1eea7b23a8/tePI-Screen%20Shot%202018-12-13%20at%201.11.19%20PM.png"
            }
          />
        </Typography>
      )
    };
    pickBrick = pickBrick.bind(this);
  }

  render() {
    return (
      <div className="App">
        <h1>Material-UI Bricks</h1>
        <Toc />
        <div style={{ flex: "1 1 100%", height: "1em" }} />
        <Paper>
          <Container brick={this.state.brick} />
        </Paper>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
