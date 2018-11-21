import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, CustomInput } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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

// TODO agregar text area de deseos de la persona

class SolicitarEmpleo extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectDropdown = this.selectDropdown.bind(this);
    this.cargarPersonas = this.cargarPersonas.bind(this);
    this.cargarPuestos = this.cargarPuestos.bind(this);
    this.checkearPuestos = this.checkearPuestos.bind(this);

    this.state = {
      dropdownOpen: false,
      selectedName: 'Escoger Persona',
      selectedValue: '',
      condicionManejar: '',
      condicionIngles: '',
      condicionOffice: '',
      condicionPresion: '',
      condicionAuxilios: '',
      personas:[],
      puestos:[],
      checkPuestos: {}
    };
  }

  checkearPuestos(event) {
    var checkPuestos = this.state.checkPuestos;
    checkPuestos[event.target.id] = event.target.checked;
    this.setState({ checkPuestos: checkPuestos });
  }

  cargarPersonas() {
    fetch('/personas', {
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

        let personas = [];
        for (let key in res)
          personas.push({ id: key, nombre: res[key] });

          this.setState({
            personas: personas || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }

  cargarPuestos() {
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
        console.log(res);

        let puestos = [];
        for (let key in res)
          puestos.push({ id: key, value:key });

          this.setState({
            puestos: puestos || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.cargarPersonas();
    this.cargarPuestos();
  }

  handleEditar(value) {
    console.log(value);
    fetch(`/empleos/${value}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        console.log(res);

        this.setState({
          tipoEmpleo: value,
          selectedName: res.empleoPadre,
          selectedValue: res.empleoPadre,
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }

  handleEliminar(value) {
    console.log(value);
    fetch(`/empleo/${value}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        console.log(res);
      });
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

  submitState(event){
    event.preventDefault();
    console.log('insertando', this.state);
    fetch('/empleos', {
      method: 'put',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // informacion a enviar
      body: JSON.stringify({
        empleo: this.state.tipoEmpleo,
        empleoPadre: this.state.selectedName,
      }),
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        this.setState({
          tipoEmpleo: '',
          selectedValue: '0',
        });
        console.log(res);
      });
  }

  render() {
    const { classes } = this.props;
    const {personas, puestos} = this.state;
    return (
      <Form>
        <FormGroup>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret>
              {this.state.selectedName}
            </DropdownToggle>
            <DropdownMenu>
            {personas.map(({id, nombre}) =>(
                <DropdownItem value='1'  onClick={this.selectDropdown} id={id}>{nombre}</DropdownItem>

              ))}
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <FormGroup>
          <Label for="puestos">Puestos</Label>
          <div id="puestos">
          {puestos.map(({id, value}) =>(
              <CustomInput type="checkbox" id={id} label={value} />
              ))}
          </div>
        </FormGroup>
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
            <option value='Si'>Si</option>
            <option value='No'>No</option>
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
            <option value='Si'>Si</option>
            <option value='No'>No</option>
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
            <option value='Si'>Si</option>
            <option value='No'>No</option>
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
            <option value='Si'>Si</option>
            <option value='No'>No</option>
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
            <option value='Si'>Si</option>
            <option value='No'>No</option>
          </Select>
        </FormControl>
        <Button>Guardar</Button>
      </Form>
    );
  }
}
SolicitarEmpleo.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SolicitarEmpleo);

