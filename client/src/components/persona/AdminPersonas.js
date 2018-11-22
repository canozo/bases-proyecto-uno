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
// import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
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

class AdminPersonas extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.submitState = this.submitState.bind(this);
    this.checkearFamilia = this.checkearFamilia.bind(this);
    this.checkearSanitarios = this.checkearSanitarios.bind(this);
    this.checkearLegales = this.checkearLegales.bind(this);
    this.checkearLaborales = this.checkearLaborales.bind(this);
    this.checkearProfesionales = this.checkearProfesionales.bind(this);
    this.agregarAcademicos = this.agregarAcademicos.bind(this);
    this.agregarStateAcademicos = this.agregarStateAcademicos.bind(this);
    this.restarStateAcademicos = this.restarStateAcademicos.bind(this);
    this.agregarAcademicos = this.agregarAcademicos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditar = this.handleEditar.bind(this);
    // this.handleEliminar = this.handleEliminar.bind(this);

    this.state = {
      modoEditar: false,
      nombre: '',
      numID: '',
      telefono: '',
      email: '',
      direccion: '',
      genero: '',
      fecha_nacimiento: '',
      estado_civil: '',
      familiares: {},
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
      personas: [],
    };
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

  // handleEliminar(id) {
  //   this.setState({ modoEditar: false });
  //   fetch(`/personas/${id}`, {
  //     method: 'delete',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       // logica de respuesta
  //       this.cargarPersonas();
  //     });
  // }

  handleEditar(id) {
    this.setState({ modoEditar: true });
    fetch(`/personas/${id}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let familiaresArr = res.familiares.split(',');
        let sanitariosArr = res.sanitarios.split(',');
        let legalesArr = res.legales.split(',');
        let laboralesArr = res.laborales.split(',');
        let profesionalesArr = res.profesionales.split(',');

        let familiaresMap = {};
        let sanitariosMap = {};
        let legalesMap = {};
        let laboralesMap = {};
        let profesionalesMap = {};

        for (let i = 0; i < familiaresArr.length; i++) {
          familiaresMap[familiaresArr[i]] = true;
        }

        for (let i = 0; i < sanitariosArr.length; i++) {
          sanitariosMap[sanitariosArr[i]] = true;
        }

        for (let i = 0; i < legalesArr.length; i++) {
          legalesMap[legalesArr[i]] = true;
        }

        for (let i = 0; i < laboralesArr.length; i++) {
          laboralesMap[laboralesArr[i]] = true;
        }

        for (let i = 0; i < profesionalesArr.length; i++) {
          profesionalesMap[profesionalesArr[i]] = true;
        }

        this.setState({
          numID: id,
          nombre: res.nombre,
          telefono: res.telefono,
          email: res.email,
          direccion: res.direccion,
          genero: res.genero,
          fecha_nacimiento: res.fecha_nacimiento,
          estado_civil: res.estado_civil,
          familiares: familiaresMap,
          sanitarios: sanitariosMap,
          legales: legalesMap,
          laborales: laboralesMap,
          profesionales: profesionalesMap,
          academicos: res.academicos || {},
          numAcadm: Number(res.numAcadm),
        });

      })
        .catch((error) => {
      });
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

  submitState(event) {
    event.preventDefault();
    fetch('/personas', {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      // informacion a enviar
      body: JSON.stringify({
        numID: this.state.numID,
        nombre: this.state.nombre,
        telefono: this.state.telefono,
        email: this.state.email,
        direccion: this.state.direccion,
        genero: this.state.genero,
        fecha_nacimiento: this.state.fecha_nacimiento,
        estado_civil: this.state.estado_civil,
        familiares: this.state.familiares,
        sanitarios: this.state.sanitarios,
        legales: this.state.legales,
        laborales: this.state.laborales,
        profesionales: this.state.profesionales,
        academicos: this.state.academicos,
        numAcadm: this.state.numeroAcademicos,
      })
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        this.cargarPersonas();

        this.setState({
          numID: '',
          nombre: '',
          telefono: '',
          email: '',
          direccion: '',
          genero: '',
          fecha_nacimiento: '',
          estado_civil: '',
          familiares: {},
          sanitarios: {},
          legales: {},
          laborales: {},
          profesionales: {},
          academicos: {},
          numAcadm: 1,
        });
      })
        .catch((err) => {
        });
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

  checkearFamilia(event) {
    var familiares = this.state.familiares;
    familiares[event.target.id] = event.target.checked;
    this.setState({ familiares: familiares });
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

  componentDidMount() {
    this.getInstituciones();
    this.getCarrera();
    this.getGrados();
    this.getLegales();
    this.getSanitarios();
    this.getProfesionales();
    this.getLaborales();
    this.cargarPersonas();
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
    const { opcLegales, personas, opcLaborales, opcProfesionales, opcSanitarios } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Form onSubmit={this.submitState}>
          <FormGroup>
            <Label for='nombre-completo'>Nombre Completo</Label>
            <Input
              type='text'
              name='nombre-completo'
              id='nombre-completo'
              value={this.state.nombre}
              placeholder='Juan Mauricio'
              onChange={e => this.setState({ nombre: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for='num-identidad'>Numero de Identidad</Label>
            <Input
              type='text'
              name='num-identidad'
              id='num-identidad'
              disabled={this.state.modoEditar}
              value={this.state.numID}
              placeholder='0000-0000-00000'
              onChange={e => this.setState({ numID: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for='telefono'>Telefono</Label>
            <Input
              type='text'
              name='telefono'
              id='telefono'
              value={this.state.telefono}
              placeholder='22000000'
              onChange={e => this.setState({ telefono: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Correo electronico</Label>
            <Input
              type='email'
              name='email'
              id='email'
              value={this.state.email}
              placeholder='ejemplo@gmail.com'
              onChange={e => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Genero</Label>
            <Input
              type='select'
              value={this.state.genero}
              onChange={e => this.setState({ genero: e.target.value })}
            >
              <option value='' />
              <option name='Masculino' id='Masculino'>
                Masculino
              </option>
              <option name='Femenino' id='Femenino'>
                Femenino
              </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Estado Civil</Label>
            <Input
              type='select'
              value={this.state.estado_civil}
              onChange={e =>
                this.setState({
                  estado_civil: e.target.value
                })
              }
            >
              <option value='' />
              <option value='Soltero' id='Soltero'>
                Soltero
              </option>
              <option value='Casado' id='Casado'>
                Casado
              </option>
              <option value='Viudo' id='Viudo'>
                Viudo
              </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='exampleDate'>Fecha de Nacimiento</Label>
            <Input
              type='date'
              name='date'
              id='fecha_nacimiento'
              value={this.state.fecha_nacimiento}
              placeholder='MM-DD-YYYY'
              onChange={e => this.setState({ fecha_nacimiento: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for='direccion'>Direccion</Label>
            <Input
              type='text'
              name='direccion'
              id='direccion'
              value={this.state.direccion}
              placeholder='Col. Miramomtes 3ra ave'
              onChange={e => this.setState({ direccion: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for='familiares'>Familiares del empleado</Label>
            <div id='familiares'>
              {personas.map(({ id, nombre }) => (
                <CustomInput
                  onChange={this.checkearFamilia}
                  value={this.state.familiares[id]}
                  checked={this.state.familiares[id] === true}
                  type='checkbox'
                  id={id}
                  label={nombre}
                  key={id}
                />
                ))}
            </div>
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
          <Button>Guardar</Button>
        </Form>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Persona</TableCell>
                <TableCell>Identidad</TableCell>
                <TableCell numeric>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {personas.map(({ id, nombre }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {nombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell numeric>
                  <IconButton aria-label="Edit" value={id}
                    onClick={() => {this.handleEditar(id);}}>
                      <EditIcon />
                  </IconButton>
                  {/* <IconButton aria-label="Delete" value={id}
                    onClick={() => {this.handleEliminar(id);}}>
                    <DeleteIcon />
                  </IconButton> */}
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

AdminPersonas.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPersonas);
