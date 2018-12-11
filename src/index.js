import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";

import "./styles.css";

function pickBrick(brickName) {
  this.setState({ brick: <div>{brickName}</div> });
  /** 
  this.setState({
    brick: Loadable({
      loader: () => import("./my-component"),
      loading: () => <div>Loadding ...</div>
    })
  });
  ***/
}
function Toc() {
  return (
    <ul className="Toc">
      <li onClick={() => pickBrick("simple-tabs")}>
        <span>Simple Tabs</span>
      </li>
      <li onClick={() => pickBrick("simple-table")}>
        <span>Simple Table</span>
      </li>
    </ul>
  );
}
function Container(props) {
  return <div>{props.brick}</div>;
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brick: (
        <div>
          Hi there! <br />
          <p>What brick do you want?</p>
        </div>
      )
    };
    pickBrick = pickBrick.bind(this);
  }
  brickPicker(moduleName) {
    this.setState({ brick: <div>{moduleName}</div> });
    /**
    return Loadable({
      loader: () => import('./my-component'),
      loading: () => <div>Loadding ...</div>,
    });
    **/
  }
  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <Toc />
        <Container brick={this.state.brick} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
