import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

class AdminEmpresas extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="director">Nombre del director</Label>
          <Input type="text" name="director" id="director" placeholder="Juan Mauricio" />
        </FormGroup>
        <FormGroup>
          <Label for="direccion">Direccion de la empresa</Label>
          <Input type="text" name="direccion" id="direccion" placeholder="Col. Miramomtes 3 ave" />
        </FormGroup>
        <FormGroup>
          <Label for="rubro">Rubro</Label>
          <Input type="text" name="rubro" id="rubro" placeholder="Telecomunicaciones" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

AdminEmpresas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminEmpresas);