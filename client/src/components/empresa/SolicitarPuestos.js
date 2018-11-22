import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
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
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  root: {
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

    this.props = props;

    this.submitState = this.submitState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.cargarPuestos = this.cargarPuestos.bind(this);
    this.cargarSolicitudes = this.cargarSolicitudes.bind(this);
    this.handleChangeCondiciones = this.handleChangeCondiciones.bind(this);
    this.handleChangeDeseos = this.handleChangeDeseos.bind(this);
    this.checkearSanitarios = this.checkearSanitarios.bind(this);
    this.checkearLegales = this.checkearLegales.bind(this);
    this.checkearLaborales = this.checkearLaborales.bind(this);
    this.checkearProfesionales = this.checkearProfesionales.bind(this);
    this.agregarAcademicos = this.agregarAcademicos.bind(this);
    this.agregarStateAcademicos = this.agregarStateAcademicos.bind(this);
    this.restarStateAcademicos = this.restarStateAcademicos.bind(this);
    this.agregarAcademicos = this.agregarAcademicos.bind(this);

    this.state = {
      lugar: '',
      cargo: '',
      nombrePuesto: '',
      sueldo: '',
      cantidadPlazas: '',
      condicionesRes: {},
      deseosRes: {},
      empresas: [],
      condiciones: [],
      deseos: [],
      puestos: [],
      sanitarios: {},
      legales: {},
      laborales: {},
      profesionales: {},
      academicos: {},
      numeroAcademicos: 1,
      instituciones: [],
      carrerasEstudio: [],
      gradosAcademicos: [],
      opcLegales: [],
      opcSanitarios: [],
      opcProfesionales: [],
      opcLaborales: [],
      solicitudes: [],
    };
  }

  handleChange2(event) {
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
      deseosRes: deseosNuevo,
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

  cargarSolicitudes() {
    fetch('/seleccion/puestos', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        let solicitudes = [];
        console.log(res);
        for (let key in res)
          solicitudes.push({
            tipo: res[key].tipo,
            llave: res[key].llave,
            requisitos: res[key].requisitos,
            deseos: res[key].deseos,
            condiciones: res[key].condiciones,
          });

          console.log(solicitudes);

        this.setState({
          solicitudes: solicitudes || [],
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
    // event.preventDefault();

    fetch('/solicitudes/puestos', {
      method: 'put',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // informacion a enviar
      body: JSON.stringify({
        nombrePuesto: this.state.nombrePuesto,
        cargo: this.state.cargo,
        lugar: this.state.lugar,
        sueldo: this.state.sueldo,
        cantidadPlazas: this.state.cantidadPlazas,
        sanitarios: this.state.sanitarios,
        legales: this.state.legales,
        laborales: this.state.laborales,
        profesionales: this.state.profesionales,
        academicos: this.state.academicos,
        numAcadm: this.state.numeroAcademicos,
        deseos: this.state.deseosRes,
        condiciones: this.state.condicionesRes,
      }),
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        this.cargarSolicitudes();
      }).catch((err) => {
      });
  }

  getProfesionales() {
    fetch('/requisitos/profesionales', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let opcProfesionales = [];
        for (let key in res)
          opcProfesionales.push({ name: key, value: key});

          this.setState({
            opcProfesionales: opcProfesionales || [],
        });
      })
        .catch((error) => {
      });
  }

  getLaborales() {
    fetch('/requisitos/laborales', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let opcLaborales = [];
        for (let key in res)
          opcLaborales.push({ name: key, value: key});

          this.setState({
            opcLaborales: opcLaborales || [],
        });
      })
        .catch((error) => {
      });
  }

  getSanitarios() {
    fetch('/requisitos/sanitarios', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let opcSanitarios = [];
        for (let key in res)
          opcSanitarios.push({ name: key, value: key});

          this.setState({
            opcSanitarios: opcSanitarios || [],
        });
      })
        .catch((error) => {
      });
  }

  getInstituciones() {
    fetch('/requisitos/institucionacademica', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let instituciones = [];

        for (let key in res)
          instituciones.push({ name: key, value: key});

          this.setState({
          instituciones: instituciones || [],
        });
      })
        .catch((error) => {
      });
  }

  getCarrera() {
    fetch('/requisitos/carreraestudio', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let carrerasEstudio = [];
        for (let key in res)
          carrerasEstudio.push({ name: key, value: key});

          this.setState({
            carrerasEstudio: carrerasEstudio || [],
        });
      })
        .catch((error) => {
      });
  }

  getGrados() {
    fetch('/requisitos/gradoestudio', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let gradosAcademicos = [];
        for (let key in res)
        gradosAcademicos.push({ name: key, value: key});

          this.setState({
            gradosAcademicos: gradosAcademicos || [],
        });
      })
        .catch((error) => {
      });
  }

  getLegales() {
    fetch('/requisitos/legales', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let legales = [];
        for (let key in res)
          legales.push({ name: key, value: key});

          this.setState({
            opcLegales: legales || [],
        });
      })
        .catch((error) => {
      });
  }
  componentDidMount(){
    this.cargarSolicitudes();
    this.getEmpresas();
    this.cargarCondiciones();
    this.cargarDeseos();
    this.cargarPuestos();
    this.getInstituciones();
    this.getCarrera();
    this.getGrados();
    this.getLegales();
    this.getSanitarios();
    this.getProfesionales();
    this.getLaborales();
  }

  handleChange(event) {
    let academicosNuevo = this.state.academicos;
    academicosNuevo[event.target.id] = event.target.value;

    this.setState({
      academicos: academicosNuevo,
    });
  }

  checkearProfesionales(event) {
    var profesionales = this.state.profesionales;
    profesionales[event.target.id] = event.target.checked;
    this.setState({ profesionales: profesionales });
  }

  checkearLaborales(event) {
    var laborales = this.state.laborales;
    laborales[event.target.id] = event.target.checked;
    this.setState({ laborales: laborales });
  }

  checkearSanitarios(event) {
    var sanitarios = this.state.sanitarios;
    sanitarios[event.target.id] = event.target.checked;
    this.setState({ sanitarios: sanitarios });
  }

  checkearLegales(event) {
    var legales = this.state.legales;
    legales[event.target.id] = event.target.checked;
    this.setState({ legales: legales });
  }


  agregarAcademicos() {
    const { instituciones, carrerasEstudio, gradosAcademicos } = this.state;

    let componentes = [];
    for(let i = 0; i< this.state.numeroAcademicos; i++) {
      componentes.push(
        <FormGroup key={i}>
          <label>Instituto Academico</label>
          <Input
            type='select'
            id={`institutoacademico${i}`}
            value={this.state.academicos[`institutoacademico${i}`]}
            onChange={this.handleChange}>
            <option value='Ninguno'>Ninguno</option>
            {instituciones.map(({ value }) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Input>
          <label>Carrera</label>
          <Input
            type='select'
            id={`carrera${i}`}
            value={this.state.academicos[`carreras${i}`]}
            onChange={this.handleChange}>
            <option value='Ninguno'>Ninguno</option>
            {carrerasEstudio.map(({ value }) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Input>
          <label>Grado</label>
          <Input
          type='select'
          id={`grado${i}`}
          value={this.state.academicos[`grado${i}`]}
          onChange={this.handleChange}>
            <option value='Ninguno'>Ninguno</option>
            {gradosAcademicos.map(({ value }) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Input>
        </FormGroup>
      );
    }

    if (componentes)
      return componentes;
    else
      return <div>No hay componentes</div>;
  }

  agregarStateAcademicos() {
    this.setState({ numeroAcademicos: this.state.numeroAcademicos + 1});
    this.agregarAcademicos();
  }

  restarStateAcademicos() {
    if (this.state.numeroAcademicos > 0) {
      this.setState({ numeroAcademicos : this.state.numeroAcademicos - 1});
      this.agregarAcademicos();
    }
  }

  render() {
    const { classes } = this.props;
    const { empresas, condiciones, deseos, puestos, solicitudes } = this.state;
    const { opcLegales, opcLaborales, opcProfesionales, opcSanitarios } = this.state;

    return (
      <div>
        <Form onSubmit={this.submitState}>
          <FormGroup>
            <FormGroup>
              <Label for='nombrePuesto'>Nombre del puesto</Label>
              <Input type='text' name='nombrePuesto' id='nombrePuesto' value={this.state.nombrePuesto} placeholder='Gerente de Ventas'
              onChange={e => this.setState({ nombrePuesto: e.target.value })}/>
            </FormGroup>
            <Label for='LugarEmpleo'>Lugar de Empleo</Label>
            <Input
                  type='select'
                  onChange={e => this.setState({ lugar: e.target.value })}
                >
                  <option value='' />
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
                onChange={this.handleChange2}>
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
              onChange={this.handleChange2}>
              <option value=''/>
              <option value='Jefe'>Jefe</option>
              <option value='Gerente'>Gerente</option>
              <option value='Empleado'>Empleado</option>
            </Input>
          </FormGroup>
          <FormGroup>
              <Label for='requisitos-sanitarios'>Requisitos Sanitarios</Label>
              <div id='requisitos-sanitarios'>
                {opcSanitarios.map(({ value }) => (
                  <CustomInput
                    onChange={this.checkearSanitarios}
                    value={this.state.sanitarios[value]}
                    checked={this.state.sanitarios[value] === true}
                    type='checkbox'
                    id={value}
                    label={value}
                    key={value}
                  />
                  ))}
              </div>
            </FormGroup>
            <FormGroup>
              <Label for='requisitos-legal'>Requisitos Legales</Label>
              <div id='requisitos-legal'>
                {opcLegales.map(({value }) => (
                  <CustomInput
                    onChange={this.checkearLegales}
                    value={this.state.legales[value]}
                    checked={this.state.legales[value] === true}
                    type='checkbox'
                    id={value}
                    label={value}
                    key={value}
                  />
                  ))}
              </div>
            </FormGroup>
            <FormGroup>
              <Label for='requisitos-profesionales'>Requisitos Profesionales</Label>
              <div id='requisitos-profesionales'>
                {opcProfesionales.map(({ value }) => (
                  <CustomInput
                    onChange={this.checkearProfesionales}
                    value={this.state.profesionales[value]}
                    checked={this.state.profesionales[value] === true}
                    type='checkbox'
                    id={value}
                    label={value}
                    key={value}
                  />
                  ))}
              </div>
            </FormGroup>
            <FormGroup>
              <Label for='requisitos-laborales'>Requisitos Laborales</Label>
              <div id='requisitos-laborales'>
                {opcLaborales.map(({ value }) => (
                  <CustomInput
                    onChange={this.checkearLaborales}
                    value={this.state.laborales[value]}
                    checked={this.state.laborales[value] === true}
                    type='checkbox'
                    id={value}
                    label={value}
                    key={value}
                  />
                  ))}
              </div>
            </FormGroup>
            <FormGroup>
              <h5 htmlFor='requisitos-academicos'>Requisitos Academicos </h5>
              <Button size='sm' type='button' outline color='primary' onClick={this.restarStateAcademicos}>
                -
              </Button>{' '}
              <Button size='sm' type='button' outline color='primary' onClick={this.agregarStateAcademicos}>
                +
              </Button>{' '}
              <FormGroup>{this.agregarAcademicos()}</FormGroup>
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
                  <option value='Si ofrece'>Si ofrece</option>
                  <option value='No ofrece'>No ofrece</option>
                </Input>
              </FormGroup>
            ))}
          </FormGroup>
          <Button>Guardar</Button>
        </Form>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Id Solicitud Puesto</TableCell>
                <TableCell>Requisitos</TableCell>
                <TableCell>Deseos</TableCell>
                <TableCell>Condiciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {solicitudes.map(({ llave, requisitos, deseos, condiciones }) => (
              <TableRow key={llave}>
                <TableCell component="th" scope="row">
                  {llave}
                </TableCell>
                <TableCell component="th" scope="row">
                  {requisitos}
                </TableCell>
                <TableCell component="th" scope="row">
                  {deseos}
                </TableCell>
                <TableCell component="th" scope="row">
                  {condiciones}
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

SolicitarPuestos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SolicitarPuestos);