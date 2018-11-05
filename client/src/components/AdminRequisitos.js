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
          <FormGroup tag="fieldset">
            <legend>Paso la prueba?</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" onChange={this.radioChangeSanitario} name="prueba-req" id='si' />Si
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" onChange={this.radioChangeSanitario} name="prueba-req" id='no'/>No
              </Label>
            </FormGroup>
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
          <FormGroup tag="fieldset">
            <legend>Cumple el requisito legal?</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" onChange={this.radioChangeLegal} name="prueba-req-legal" id='si' />Si
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" onChange={this.radioChangeLegal} name="prueba-req-legal" id='no'/>No
              </Label>
            </FormGroup>
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
          <FormGroup>
            <Label for="calificacion-academica">Calificación Media Academicá</Label>
            <Input type="number" onChange={this.verficiarCalificacion} name="calificacion-academica" id="calificacion-academica" placeholder="0-100" />
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
          <FormGroup>
            <Label for="cert-profe">Certificados Profesionales</Label>
            <Input type="text" name="cert-profe" id="cert-profe" placeholder="Certificado IEEE 1227" />
          </FormGroup>
          <FormGroup>
            <Label for="fecha-profe">Fecha de Obtencion del Certificado</Label>
            <Input type="date" name="fecha-profe" id="fecha-profe"/>
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
          <FormGroup>
            <Label for="experiencia-laboral">Años de Experiencia Laboral</Label>
            <Input type="number" name="experiencia-laboral" id="experiencia-laboral" placeholder="Ingrese una cantidad" />
          </FormGroup>
        </div>
      );
    }
  }

  render() {
    return (
      <Form >
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