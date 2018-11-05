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

class AdminRequisitos extends Component {
  constructor(props) {
    super(props);

    this.radioChange = this.radioChange.bind(this);
    this.radioChangeSanitario = this.radioChangeSanitario.bind(this);
    this.obtenerFormularios = this.obtenerFormularios.bind(this);
    this.verficiarCalificacion = this.verficiarCalificacion.bind(this);
    this.submitState = this.submitState.bind(this);

    this.state = {
      tipoRequisito: 'Sanitarios',
      pruebaSanitario: false,
    };
  }

  radioChange (event) {
    this.setState({ tipoRequisito: event.target.id });
  }

  radioChangeSanitario (event) {
    this.setState({ pruebaSanitario: event.target.id === 'si' });
  }

  verficiarCalificacion(event) {
    // verificar que la calificacion este entre 0 y 100
    let calificacion = event.target.value;
    if (calificacion) {
      let num = Number(calificacion);
      if (num < 0) {
        // se sale del rango, setear a 0
        event.target.value = 0;
      } else if (num > 100) {
        event.target.value = 100;
      }
    } else {
      // esta vacio, setear a 0
      event.target.value = 0;
    }
  }
  
  obtenerFormularios() {
    // devuelve los formularios dependiendo de que radio button esta seleccionado
    if (this.state.tipoRequisito === 'Sanitarios') {
      return (
        <div>
          <FormGroup>
            <Label for="nombre-sanitario">Nombre de Requisito sanitario</Label>
            <Input type="text" name="nombre-sanitario" id="nombre-sanitario" placeholder="Prueba de VIH" />
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Legales') {
      return (
        <div>
          <FormGroup>
            <Label for="nombre-legales">Nombre Legales</Label>
            <Input type="text" name="nombre-legales" id="nombre-legales" placeholder="Servicio Militar" />
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Academicos') {
      return (
        <div>
          <FormGroup>
            <Label for="nomInstAcade">Nombre Institucion Academicá</Label>
            <Input type="text" name="nomInstAcade" id="nomInstAcade" placeholder="UNITEC" />
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Profesionales') {
      return (
        <div>
          <FormGroup>
            <Label for="nombre-profe">Nombre Institucion Profesionales</Label>
            <Input type="text" name="nombre-profe" id="nombre-profe" placeholder="ICONIC" />
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Laborales') {
      return (
        <div>
          <FormGroup>
            <Label for="nombre-laboral">Nombre Institucion Laboral</Label>
            <Input type="text" name="nombre-laboral" id="nombre-laboral" placeholder="Agile Solutions" />
          </FormGroup>
        </div>
      );
    }
  }

  submitState(event){
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.submitState}>
        <FormGroup tag="fieldset">
          <legend>Tipo Requisito</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Sanitarios' />Sanitarios
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Legales'/>Legales
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Academicos'/>Academicos
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Profesionales'/>Profesionales
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id= 'Laborales'/>Laborales
            </Label>
          </FormGroup>
        </FormGroup>

        {this.obtenerFormularios()}

        <Button>Submit</Button>
      </Form>
    );
  }
}

AdminRequisitos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminRequisitos);