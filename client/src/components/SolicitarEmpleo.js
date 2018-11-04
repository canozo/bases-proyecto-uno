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

class SolicitarEmpleo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h1>SolicitarEmpleo</h1>
      </div>
    );
  }
}

SolicitarEmpleo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SolicitarEmpleo);