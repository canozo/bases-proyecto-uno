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
            <CustomInput type="checkbox" id="Sanitarios" label="Check this custom checkbox" />
            <CustomInput type="checkbox" id="Legales" label="Or this one" />
            <CustomInput type="checkbox" id="Académicos" label="But not this disabled one" disabled />
            <CustomInput type="checkbox" id="Profesionales" label="Or this one" />
            <CustomInput type="checkbox" id="Laborales" label="Or this one" />
          </div>
        </FormGroup>
        <FormGroup><FormGroup>
          <Label for="exampleEmail">Nombre Sanitarios</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
          <Label for="exampleEmail">Sanitarios Status</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Nombre Legales</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Nombre Legales</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Status Legales</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Nombre Institucion Academicá</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Calificación Media Academicá</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>90-100</option>
            <option>80-90</option>
            <option>70-80</option>
            <option>60-70</option>
            <option>60 y menos</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Nombre Institucion Profesionales</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Certificados Profesionales</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleDatetime">Fecha de Profesioanles</Label>
          <Input type="datetime" name="datetime" id="exampleDatetime" placeholder="datetime placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Nombre Institucion Laboral</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleNumber">Año de Experiencia Laboral</Label>
          <Input type="number" name="number" id="exampleNumber" placeholder="number placeholder" />
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