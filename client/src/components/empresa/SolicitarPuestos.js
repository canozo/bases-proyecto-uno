import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectDropdown = this.selectDropdown.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      lugar: '',
      genero: '',
      estadoCivil: '',
      rangoEdad: '',
      puesto: '',
      tipoEmpleo: '',
      sueldo: '',
      cantidadPlazas: '',
      selectedName: 'Requisito de especializacion',
      selectedValue: '0',
    };
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  selectDropdown(event) {
    this.setState({
      selectedName: event.target.innerText,
      selectedValue: event.target.value
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  submitState(event){
    event.preventDefault();
    fetch('/SolicitarPuestos', {
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
    const { classes } = this.props;
    return (
      <Form onSubmit={this.submitState}>
      {/* TODO Checkbox en duro -> Condiciones de empleo, agregar un nivel de prioridad (Ninguno, deseable, obligatorio) para cada una de las siguientes:
          Saber manejar,
          Hablar Ingles,
          Saber usar office,
          Hacer marketing (llamadas),
          Reparar autos,
          Trabaje bajo presion,
          Conocer de primeros auxilios, */}
        <FormGroup>
          <Label for="LugarEmpleo">Lugar de Empleo</Label>
          <Input type="text" name="LugarEmpleo" id="LugarEmpleo" placeholder="BAC Credomatic" 
          onChange={e => this.setState({ lugar: e.target.value })}/>
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
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.genero === "" ? <InputLabel>Genero</InputLabel> : ""}
          <Select
            native
            value={this.state.genero}
            id="genero"
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={0} />
            }
          >
            <option value=''/>
            <option value='0'>Sin preferencia</option>
            <option value='1'>Masculino</option>
            <option value='2'>Femenino</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.estadoCivil === "" ? <InputLabel>Estado Civil</InputLabel> : ""}
          <Select
            native
            value={this.state.estadoCivil}
            id="estadoCivil"
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={0} />
            }
          >
            <option value=''/>
            <option value='0'>Sin preferencia</option>
            <option value='1'>Casado/a</option>
            <option value='2'>Soltero/a</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.rangoEdad === "" ? <InputLabel>Rango de Edad</InputLabel> : ""}
          <Select
            native
            value={this.state.rangoEdad}
            id="rangoEdad"
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={0} />
            }
          >
            <option value=''/>
            <option value='0'>Sin preferencia</option>
            <option value='1'>18-25</option>
            <option value='2'>25-35</option>
            <option value='3'>35 en adelante</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.puesto === "" ? <InputLabel>Puesto que se busca</InputLabel> : ""}
          <Select
            native
            value={this.state.puesto}
            id="puesto"
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={0} />
            }
          >
            <option value=''/>
            <option value='0'>Sin Preferencia</option>
            <option value='1'>Gerente</option>
            <option value='2'>Administrador</option>
            <option value='3'>Jefe de Mercadeo</option>
            <option value='4'>Junior</option>
          </Select>
        </FormControl>
        <Button>Guardar</Button>
      </Form>
    );
  }
}

SolicitarPuestos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SolicitarPuestos);