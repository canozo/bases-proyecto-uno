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


// TODO en administrar puestos manejar el tipo de puesto y el puesto padre
// TODO mover esto a solicitar puestos (para empresas)
// TODO en solicitar puestos agregar un campo de SI/NO donde pregunta si la especializacion es obligatoria o versatil
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
    alert(JSON.stringify(this.state, null, ''));
    event.preventDefault();
    fetch('/adminpuestos', {
      method: 'put',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // informacion a enviar
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        this.setState({
          status: res.status,
          response: res.response
        });
        console.log(res);
      });
  }

  render() {
    return (
      <Form onSubmit={this.submitState}>
      {/* TODO Requisitos personales: La edad, casado/soltero, sexo */}
      {/* TODO Puede ser que por lo siguiente no se pueda hacer automatico: */}
      {/* TODO Agregar tipo de puesto (jefe, gerente, etc) */}
      {/* TODO Checkbox en duro -> Condiciones de empleo, agregar un nivel de prioridad (Ninguno, deseable, obligatorio) para cada una de las siguientes:
          Saber manejar,
          Hablar Ingles,
          Saber usar office,
          Hacer marketing (llamadas),
          Reparar autos,
          Trabaje bajo presion,
          Conocer de primeros auxilios,
      */}
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