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

// TODO En el proceso de seleccion se puede seleccionar ninguna, una o varias personas

class Seleccion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h1>Seleccion</h1>
      </div>
    );
  }
}

Seleccion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Seleccion);