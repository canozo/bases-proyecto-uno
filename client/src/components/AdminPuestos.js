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
      lugar:'',
      tipoEmpleo:'',
      sueldo:'',
      cantidadPlazas:''
    };
    this.submitState = this.submitState.bind(this);
  }
  submitState(event){
    alert(JSON.stringify(this.state, null, '  '));
    event.preventDefault();
      
  }

  render() {
    return (
      <Form onSubmit={this.submitState}>
        <FormGroup>
          <Label for="LugarEmpleo">Lugar de Empleo</Label>
          <Input type="text" name="LugarEmpleo" id="LugarEmpleo" placeholder="BAC Credomatic" 
          onChange={e => this.setState({ lugar: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="tipo-empleo">Tipo Empleo</Label>
          <Input type="text" name="tipoEmpleo" id="tipoEmpleo" placeholder="Programador" 
          onChange={e => this.setState({ tipoEmpleo: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="sueldo">Sueldo</Label>
          <Input type="number" name="sueldo" id="sueldo" placeholder="23000" 
          onChange={e => this.setState({ sueldo: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="cantidadPlazas">Cantidad de Plazas</Label>
          <Input type="number" name="cantidadPlazas" id="cantidadPlazas" placeholder="1" 
          onChange={e => this.setState({ cantidadPlazas: e.target.value })}/>
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