import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading...",
      response: ""
    };
  }

  componentDidMount() {
    fetch('/test', {
      method: 'put',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ test: 'its a test', key: 'javier', value: 'cano'}),
      // body: JSON.stringify({ test: 'its a test', key: 2, value: "prueba"}),
      // body: JSON.stringify({ test: 'its a test', key: 3, value: { prueba: "super" }}),
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          status: res.status,
          response: res.response
        });
        console.log(this.state.response);
      });
  }

  render() {
    return (
      <div>
        <h1>Test Status</h1>
        {this.state.status}
        <br/>
        {this.state.response}
      </div>
    );
  }
}

Test.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Test);