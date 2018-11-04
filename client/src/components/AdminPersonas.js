import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

class AdminPersonas extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="nombre-completo">Nombre Completo</Label>
          <Input type="text" name="nombre-completo" id="nombre-completo" placeholder="Juan Mauricio" />
        </FormGroup>
        <FormGroup>
          <Label for="num-identidad">Numero de Identidad</Label>
          <Input type="text" name="num-identidad" id="num-identidad" placeholder="0801-1990-00000" />
        </FormGroup>
        <FormGroup>
          <Label for="telefono">Telefono</Label>
          <Input type="text" name="telefono" id="telefono" placeholder="50422000000" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Correo electronico</Label>
          <Input type="text" name="email" id="email" placeholder="ejemplo@gmail.com" />
        </FormGroup>
        <FormGroup>
          <Label for="direccion">Direccion</Label>
          <Input type="text" name="direccion" id="direccion" placeholder="Col. Miramomtes 3ra ave" />
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-sanitarios">Requisitos Sanitarios</Label>
          <div id="requisitos-sanitarios">
            <CustomInput type="checkbox" id="req-sanitario-1" label="Requisito 1" />
            <CustomInput type="checkbox" id="req-sanitario-2" label="Requisito 2" />
            <CustomInput type="checkbox" id="req-sanitario-3" label="Requisito 3" />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-legal">Requisitos Legales</Label>
          <div id="requisitos-legal">
            <CustomInput type="checkbox" id="req-legal-1" label="Requisito 1" />
            <CustomInput type="checkbox" id="req-legal-2" label="Requisito 2" />
            <CustomInput type="checkbox" id="req-legal-3" label="Requisito 3" />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-academicos">Requisitos Academicos</Label>
          <div id="requisitos-academicos">
            <CustomInput type="checkbox" id="req-academicos-1" label="Requisito 1" />
            <CustomInput type="checkbox" id="req-academicos-2" label="Requisito 2" />
            <CustomInput type="checkbox" id="req-academicos-3" label="Requisito 3" />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-profesionales">Requisitos Profesionales</Label>
          <div id="requisitos-profesionales">
            <CustomInput type="checkbox" id="req-profesionales-1" label="Requisito 1" />
            <CustomInput type="checkbox" id="req-profesionales-2" label="Requisito 2" />
            <CustomInput type="checkbox" id="req-profesionales-3" label="Requisito 3" />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-laborales">Requisitos Laborales</Label>
          <div id="requisitos-laborales">
            <CustomInput type="checkbox" id="req-laborales-1" label="Requisito 1" />
            <CustomInput type="checkbox" id="req-laborales-2" label="Requisito 2" />
            <CustomInput type="checkbox" id="req-laborales-3" label="Requisito 3" />
          </div>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

AdminPersonas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPersonas);