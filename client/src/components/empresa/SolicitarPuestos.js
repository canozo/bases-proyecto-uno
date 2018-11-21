import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  title: {
    paddingTop: '20px',
    paddingBottom: '10px',
    paddingLeft: '20px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  root_table: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SolicitarPuestos extends Component {
  constructor(props) {
    super(props);

    this.submitState = this.submitState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cargarPuestos = this.cargarPuestos.bind(this);
    this.handleChangeCondiciones = this.handleChangeCondiciones.bind(this);
    this.handleChangeDeseos = this.handleChangeDeseos.bind(this);

    this.state = {
      lugar: '',
      cargo: '',
      nombrePuesto: '',
      genero: '',
      estadoCivil: '',
      rangoEdad: '',
      sueldo: '',
      cantidadPlazas: '',
      condicionesRes: {},
      deseosRes: {},
      empresas: [],
      condiciones: [],
      deseos: [],
      puestos: [],
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleChangeCondiciones(event) {
    let condicionesNuevo = this.state.condicionesRes;
    condicionesNuevo[event.target.id] = event.target.value;

    this.setState({
      condicionesRes: condicionesNuevo,
    });
  }

  handleChangeDeseos(event) {
    let deseosNuevo = this.state.deseosRes;
    deseosNuevo[event.target.id] = event.target.value;

    this.setState({
      academicos: deseosNuevo,
    });
  }

  cargarPuestos() {
    // obtener todos los puestos del servidor
    fetch('/puestos', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let puestos = [];
        for (let key in res)
          puestos.push({ name: key, value: key });

        this.setState({
          puestos: puestos || [],
        });
      })
        .catch((error) => {
      });
  }

  cargarCondiciones() {
    fetch('/requisitos/condiciones', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        let condiciones = [];
        for (let key in res)
          condiciones.push({ value: key });

        this.setState({
          condiciones: condiciones || [],
        });
      })
        .catch((error) => {
      });
  }

  cargarDeseos() {
    fetch('requisitos/deseos', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        let deseos = [];
        for (let key in res)
          deseos.push({ value: key });

        this.setState({
          deseos: deseos || [],
        });
      })
        .catch((error) => {
      });
  }

  getEmpresas(){
    fetch('/empresas', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let empresas = [];
        for (let key in res)
          empresas.push({ name: key, value: key});

          this.setState({
            empresas: empresas || [],
        });
      })
        .catch((error) => {
      });
  }

  submitState(event){
    event.preventDefault();
    console.log(this.state);
    fetch('/solicitudes/puestos', {
      method: 'put',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // informacion a enviar
      body: JSON.stringify({
        lugar: this.state.lugar,
        genero: this.state.genero,
        estadoCivil: this.state.estadoCivil,
        rangoEdad: this.state.rangoEdad,
        sueldo: this.state.sueldo,
        cantidadPlazas: this.state.cantidadPlazas,
      }),
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
      }).catch((err) => {
      });
  }
  componentDidMount(){
    this.getEmpresas();
    this.cargarCondiciones();
    this.cargarDeseos();
    this.cargarPuestos();
  }

  render() {
    const { empresas, condiciones, deseos, puestos } = this.state;

    return (
      <Form onSubmit={this.submitState}>
        <FormGroup>
          <FormGroup>
            <Label for='nombrePuesto'>Nombre del puesto</Label>
            <Input type='text' name='nombrePuesto' id='nombrePuedo' value={this.state.nombrePuesto} placeholder='Gerente de Ventas'
            onChange={e => this.setState({ nombrePuesto: e.target.value })}/>
          </FormGroup>
          <Label for='LugarEmpleo'>Lugar de Empleo</Label>
          <Input
                type='select'
                onChange={e => this.setState({ lugar: e.target.value })}
              >
               {empresas.map(({ value }) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
              </Input>
        </FormGroup>
        <FormGroup>
          <Label for='sueldo'>Sueldo</Label>
          <Input type='number' name='sueldo' id='sueldo' value={this.state.sueldo} placeholder='23000'
          onChange={e => this.setState({ sueldo: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for='cantidadPlazas'>Cantidad de Plazas</Label>
          <Input type='number' name='cantidadPlazas' id='cantidadPlazas' value={this.state.cantidadPlazas} placeholder='1'
          onChange={e => this.setState({ cantidadPlazas: e.target.value })}/>
        </FormGroup>

        <FormGroup>
          <Label>Puesto:</Label>
            <Input
              type='select'
              id='nombrePuesto'
              value={this.state.nombrePuesto}
              onChange={this.handleChange}>
              <option value=''/>
              {puestos.map(({ value }) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Input>
        </FormGroup>

        <FormGroup>
          <Label>Cargo del puesto:</Label>
          <Input
            type='select'
            id='cargo'
            value={this.state.cargo}
            onChange={this.handleChange}>
            <option value=''/>
            <option value='Jefe'>Jefe</option>
            <option value='Gerente'>Gerente</option>
            <option value='Empleado'>Empleado</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Condiciones:</Label>
          {condiciones.map(({ value }) => (
            <FormGroup key={value}>
              <Label>{value}</Label>
              <Input
                type='select'
                id={value}
                value={this.state.condicionesRes[value]}
                onChange={this.handleChangeCondiciones}>
                <option value=''/>
                <option value='Ninguno'>Ninguno</option>
                <option value='Obligatorio'>Obligatorio</option>
              </Input>
            </FormGroup>
          ))}
        </FormGroup>

        <FormGroup>
          <Label>Deseos que puede cumplir:</Label>
          {deseos.map(({ value }) => (
            <FormGroup key={value}>
              <Label>{value}</Label>
              <Input
                type='select'
                id={value}
                value={this.state.deseosRes[value]}
                onChange={this.handleChangeDeseos}>
                <option value=''/>
                <option value='Si ofrece'>No ofrece</option>
                <option value='No ofrece'>Si ofrece</option>
              </Input>
            </FormGroup>
          ))}
        </FormGroup>
        <Button>Guardar</Button>
      </Form>
    );
  }
}

SolicitarPuestos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SolicitarPuestos);