import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Button, Form, FormGroup, Input, Label, CustomInput } from 'reactstrap';
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
    paddingLeft: '10px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    display: 'flex',
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
    display: 'flex',
    margin: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  root_table: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    display: 'flex',
    minWidth: 700,
  },
});

// TODO una persona empleada puede solicitar empleo
// TODO generar form condiciones automaticamente
// TODO generar form deseos automaticamente

class SolicitarEmpleo extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectDropdown = this.selectDropdown.bind(this);
    this.cargarPersonas = this.cargarPersonas.bind(this);
    this.cargarPuestos = this.cargarPuestos.bind(this);
    this.checkearPuestos = this.checkearPuestos.bind(this);
    this.handleChange =  this.handleChange.bind(this);
    this.submitState =  this.submitState.bind(this);
    this.handleChangeCondiciones = this.handleChangeCondiciones.bind(this);
    this.handleChangeDeseos = this.handleChangeDeseos.bind(this);


    this.state = {
      dropdownOpen: false,
      selectedName: 'Escoger Persona',
      selectedValue: '',
      condicionManejar: '',
      condicionIngles: '',
      condicionOffice: '',
      condicionPresion: '',
      condicionAuxilios: '',
      condicionesRes: {},
      deseosRes: {},
      personas:[],
      puestos:[],
      condiciones: [],
      deseos: [],
      checkPuestos: {},
      labelWidth : 0,
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

        let personas = [];
        for (let key in res)
          personas.push({ id: key, nombre: res[key] });

          this.setState({
            personas: personas || [],
        });
      })
        .catch((error) => {
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

        let puestos = [];
        for (let key in res)
          puestos.push({ id: key, value:key });

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

  componentDidMount() {
    this.cargarPersonas();
    this.cargarPuestos();
    this.cargarCondiciones();
    this.cargarDeseos();
    // this.setState({
    //   labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    // });
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

  handleChangeDeseos(event) {
    let deseosNuevo = this.state.deseosRes;
    deseosNuevo[event.target.id] = event.target.value;

    this.setState({
      academicos: deseosNuevo,
    });
  }


  handleEditar(value) {
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

        this.setState({
          tipoEmpleo: value,
          selectedName: res.empleoPadre,
          selectedValue: res.empleoPadre,
        });
      })
        .catch((error) => {
      });
  }

  handleEliminar(value) {
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
    // fetch('/empleos', {
    //   method: 'put',
    //   headers : {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   // informacion a enviar
    //   body: JSON.stringify({
    //     empleo: this.state.tipoEmpleo,
    //     empleoPadre: this.state.selectedName,
    //   }),
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     // logica de respuesta
    //     this.setState({
    //       tipoEmpleo: '',
    //       selectedValue: '0',
    //     });
    //   });
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const {personas, puestos, condiciones, deseos} = this.state;
    return (
      <Form onSubmit={this.submitState}>
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
              <OutlinedInput
                name="age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
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
          {this.state.condicionPresion === "" ? <InputLabel htmlFor="age-simple">Trabaja bajo presion</InputLabel> : ""}
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
                <option value='Si'>Si</option>
                <option value='No'>No</option>
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
                <option value='Si'>Si</option>
                <option value='No'>No</option>
              </Input>
            </FormGroup>
          ))}
        </FormGroup>
        <Button>Guardar</Button>
      </Form>
    );
  }
}
SolicitarEmpleo.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SolicitarEmpleo);

