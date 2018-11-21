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
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      lugar: '',
      genero: '',
      estadoCivil: '',
      rangoEdad: '',
      sueldo: '',
      cantidadPlazas: '',
      condicionManejar: '',
      condicionIngles: '',
      condicionOffice: '',
      condicionPresion: '',
      condicionAuxilios: '',
      empresas: [],
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
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
        console.log(res);

        let empresas = [];
        for (let key in res)
          empresas.push({ name: key, value: key});

          this.setState({
            empresas: empresas || [],
        });
      })
        .catch((error) => {
        console.log(error);
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
        condicionManejar: this.state.condicionManejar,
        condicionIngles: this.state.condicionIngles,
        condicionOffice: this.state.condicionOffice,
        condicionPresion: this.state.condicionPresion,
        condicionAuxilios: this.state.condicionAuxilios,
      }),
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }
  componentDidMount(){
    this.getEmpresas();

  }

  render() {
    const { classes,  } = this.props;
    const { empresas } = this.state;
    return (
      <Form onSubmit={this.submitState}>
        <FormGroup>
          <Label for="LugarEmpleo">Lugar de Empleo</Label>
          <Input
                type='select'
                onChange={e => this.setState({ lugar: e.target.value })}
              >
               {empresas.map(({value }) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
              </Input>
        </FormGroup>
        <FormGroup>
          <Label for="sueldo">Sueldo</Label>
          <Input type="number" name="sueldo" id="sueldo" value={this.state.sueldo} placeholder="23000" 
          onChange={e => this.setState({ sueldo: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="cantidadPlazas">Cantidad de Plazas</Label>
          <Input type="number" name="cantidadPlazas" id="cantidadPlazas" value={this.state.cantidadPlazas} placeholder="1" 
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
            <option value='Sin preferencia'>Sin preferencia</option>
            <option value='Masculino'>Masculino</option>
            <option value='Femenino'>Femenino</option>
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
            <option value='Sin preferencia'>Sin preferencia</option>
            <option value='Casado/a'>Casado/a</option>
            <option value='Soltero/a'>Soltero/a</option>
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
            <option value='Sin preferencia'>Sin preferencia</option>
            <option value='18-25'>18-25</option>
            <option value='25-35'>25-35</option>
            <option value='35 en'>35 en adelante</option>
          </Select>
        </FormControl>
        {/* Inicio de condiciones de empleo */}
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.condicionManejar === "" ? <InputLabel>Sabe manejar</InputLabel> : ""}
          <Select
            native
            value={this.state.condicionManejar}
            id="condicionManejar"
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={0} />
            }
          >
            <option value=''/>
            <option value='Ninguno'>Ninguno</option>
            <option value='Deseable'>Deseable</option>
            <option value='Obligatorio'>Obligatorio</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.condicionIngles === "" ? <InputLabel>Puede hablar ingles</InputLabel> : ""}
          <Select
            native
            value={this.state.condicionIngles}
            id="condicionIngles"
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={0} />
            }
          >
            <option value=''/>
            <option value='Ninguno'>Ninguno</option>
            <option value='Deseable'>Deseable</option>
            <option value='Obligatorio'>Obligatorio</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.condicionOffice === "" ? <InputLabel>Sabe usar office</InputLabel> : ""}
          <Select
            native
            value={this.state.condicionOffice}
            id="condicionOffice"
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={0} />
            }
          >
            <option value=''/>
            <option value='Ninguno'>Ninguno</option>
            <option value='Deseable'>Deseable</option>
            <option value='Obligatorio'>Obligatorio</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.condicionPresion === "" ? <InputLabel>Trabaja bajo presion</InputLabel> : ""}
          <Select
            native
            value={this.state.condicionPresion}
            id="condicionPresion"
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={0} />
            }
          >
            <option value=''/>
            <option value='Ninguno'>Ninguno</option>
            <option value='Deseable'>Deseable</option>
            <option value='Obligatorio'>Obligatorio</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.condicionAuxilios === "" ? <InputLabel>Conoce de primeros auxilios</InputLabel> : ""}
          <Select
            native
            value={this.state.condicionAuxilios}
            id="condicionAuxilios"
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={0} />
            }
          >
            <option value=''/>
            <option value='Ninguno'>Ninguno</option>
            <option value='Deseable'>Deseable</option>
            <option value='Obligatorio'>Obligatorio</option>
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