import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";

import "./styles.css";

function pickBrick(brickName) {
  //this.setState({ brick: <div>{brickName}</div> });

  this.setState({
    brick: Loadable({
      loader: () => import(`./bricks/${brickName}`),
      loading: () => <div>Loadding {brickName} ...</div>
    })
  });
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
  const MyBrick = props.brick;
  return <MyBrick />;
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
