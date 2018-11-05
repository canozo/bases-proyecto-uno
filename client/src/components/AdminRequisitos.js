import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

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
    this.state = {
    };
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleCheckbox">Tipos de Datos</Label>
          <div>
            <CustomInput type="checkbox" id="Sanitarios" label="Sanitarios" />
            <CustomInput type="checkbox" id="Legales" label="Legales" />
            <CustomInput type="checkbox" id="Académicos" label="Académicos" />
            <CustomInput type="checkbox" id="Profesionales" label="Profesionales" />
            <CustomInput type="checkbox" id="Laborales" label="Laborales" />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="nombre-sanitario">Nombre Sanitarios</Label>
          <Input type="text" name="nombre-sanitario" id="nombre-sanitario" placeholder="Prueba de VIH" />
        </FormGroup>
        <FormGroup>
            <Label for="status-sanitario">Sanitarios Status</Label>
            <Input type="text" name="status-sanitario" id="status-sanitario" placeholder="Positivo" />
        </FormGroup>
        <FormGroup>
          <Label for="nombre-legales">Nombre Legales</Label>
          <Input type="text" name="nombre-legales" id="nombre-legales" placeholder="Expendientes" />
        </FormGroup>
        <FormGroup>
          <Label for="status-legales">Status Legales</Label>
          <Input type="text" name="status-legales" id="status-legales" placeholder="Verdadero" />
        </FormGroup>
        <FormGroup>
          <Label for="nomInstAcade">Nombre Institucion Academicá</Label>
          <Input type="text" name="nomInstAcade" id="nomInstAcade" placeholder="UNITEC" />
        </FormGroup>
        <FormGroup>
          <Label for="caliAcade">Calificación Media Academicá</Label>
          <Input type="select" name="select" id="caliAcade">
            <option>90-100</option>
            <option>80-90</option>
            <option>70-80</option>
            <option>60-70</option>
            <option>60 y menos</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="NomInstProfe">Nombre Institucion Profesionales</Label>
          <Input type="text" name="NomInstProfe" id="NomInstProfe" placeholder="ICONIC" />
        </FormGroup>
        <FormGroup>
          <Label for="certiProfe">Certificados Profesionales</Label>
          <Input type="text" name="certiProfe" id="certiProfe" placeholder="Master en ....." />
        </FormGroup>
        <FormGroup>
          <Label for="fechaProfesional">Fecha de Profesioanles</Label>
          <Input type="date" name="fechaProfesional" id="fechaProfesional" placeholder="Ingrese una fecha" />
        </FormGroup>
        <FormGroup>
          <Label for="NombreInstLabo">Nombre Institucion Laboral</Label>
          <Input type="text" name="NombreInstLabo" id="NombreInstLabo" placeholder="Agile Solutions" />
        </FormGroup>
        <FormGroup>
          <Label for="añoslaborales">Año de Experiencia Laboral</Label>
          <Input type="number" name="añoslaborales" id="añoslaborales" placeholder="Ingrese una cantidad" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

AdminRequisitos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminRequisitos);