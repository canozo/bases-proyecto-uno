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

class AdminPuestos extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="LugarEmpleo">Lugar de Empleo</Label>
          <Input type="text" name="LugarEmpleo" id="LugarEmpleo" placeholder="BAC Credomatic" />
        </FormGroup>
        <FormGroup>
          <Label for="sueldo">Sueldo</Label>
          <Input type="number" name="sueldo" id="sueldo" placeholder="23000" />
        </FormGroup>
        <FormGroup>
          <Label for="cantidadPlazas">Cantidad de Plazas</Label>
          <Input type="number" name="cantidadPlazas" id="cantidadPlazas" placeholder="1" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

AdminPuestos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPuestos);