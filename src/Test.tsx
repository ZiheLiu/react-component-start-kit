import * as React from 'react';

class Test extends React.Component<{}, {}> {
  handleButtonClick = () => {
    throw new Error('test error');
  };
  render() {
    return (
      <div className="container">
        <div className="danger">hello</div>
        <button onClick={this.handleButtonClick}>throw error</button>
      </div>
    );
  }
}

export default Test;
