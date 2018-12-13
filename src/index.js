import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";

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
    <ul className="Toc">
      <li onClick={() => pickBrick("simple-tabs")}>
        <span>Simple Tabs</span>
      </li>
      <li onClick={() => pickBrick("flip-toolbars")}>
        <span>Flip Toolbars</span>
      </li>
      <li onClick={() => pickBrick("simple-table")}>
        <span>Simple Table</span>
      </li>
    </ul>
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
        <div>
          Hi there! <br />
          <p>What brick do you want to pickup?</p>
        </div>
      )
    };
    pickBrick = pickBrick.bind(this);
  }

  render() {
    return (
      <div className="App">
        <h1>Material-UI Bricks</h1>
        <Toc />
        <Container brick={this.state.brick} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
