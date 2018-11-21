import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
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

class AdminRequisitos extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.radioChange = this.radioChange.bind(this);
    this.radioChangeSanitario = this.radioChangeSanitario.bind(this);
    this.obtenerFormularios = this.obtenerFormularios.bind(this);
    this.verficiarCalificacion = this.verficiarCalificacion.bind(this);
    this.submitState = this.submitState.bind(this);
    this.cargarRequisitos = this.cargarRequisitos.bind(this);
    this.handleEliminar = this.handleEliminar.bind(this);

    this.state = {
      requisitos: [],
      tipoRequisito: 'Sanitarios',
      nombreSanitario: '',
      nombreLegales: '',
      nombreInstitucionAcademica: '',
      nombreProfesionales: '',
      nombreCondiciones: '',
      nombreDeseos: '',
      nombreLaborales: '',
      nombreGradoEstudio: '',
      nombreCarreraEstudio: '',
    };
  }

  cargarRequisitos() {
    // limpar el state:
    this.setState({ requisitos: [] });

    // sanitarios
    fetch('/requisitos/sanitarios', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let requisitos = [];
        for (let key in res)
          requisitos.push({ name: key, value: key, tipo: 'Sanitario', url: 'sanitarios' });

        this.setState({
          requisitos: [...this.state.requisitos, ...requisitos],
        });
      }).catch((err) => {
      });

    // legales
    fetch('/requisitos/legales', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let requisitos = [];
        for (let key in res)
          requisitos.push({ name: key, value: key, tipo: 'Legales', url: 'legales' });

        this.setState({
          requisitos: [...this.state.requisitos, ...requisitos],
        });
      }).catch((err) => {
      });

    // profesionales
    fetch('/requisitos/profesionales', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let requisitos = [];
        for (let key in res)
          requisitos.push({ name: key, value: key, tipo: 'Profesionales', url: 'profesionales' });

        this.setState({
          requisitos: [...this.state.requisitos, ...requisitos],
        });
      }).catch((err) => {
      });

    // laborales
    fetch('/requisitos/laborales', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let requisitos = [];
        for (let key in res)
          requisitos.push({ name: key, value: key, tipo: 'Laborales', url: 'laborales' });

        this.setState({
          requisitos: [...this.state.requisitos, ...requisitos],
        });
      }).catch((err) => {
      });

    // instituciones academicas
    fetch('/requisitos/institucionacademica', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let requisitos = [];
        for (let key in res)
          requisitos.push({ name: key, value: key, tipo: 'Instituciones Academicas', url: 'institucionacademica' });

        this.setState({
          requisitos: [...this.state.requisitos, ...requisitos],
        });
      }).catch((err) => {
      });

    // grado de estudio
    fetch('/requisitos/gradoestudio', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let requisitos = [];
        for (let key in res)
          requisitos.push({ name: key, value: key, tipo: 'Grado de estudio', url: 'gradoestudio' });

        this.setState({
          requisitos: [...this.state.requisitos, ...requisitos],
        });
      }).catch((err) => {
      });

    // carreras de estudio
    fetch('/requisitos/carreraestudio', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let requisitos = [];
        for (let key in res)
          requisitos.push({ name: key, value: key, tipo: 'Carrera de estudio', url: 'carreraestudio' });

        this.setState({
          requisitos: [...this.state.requisitos, ...requisitos],
        });
      }).catch((err) => {
      });

    // condiciones
    fetch('/requisitos/condiciones', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let requisitos = [];
        for (let key in res)
          requisitos.push({ name: key, value: key, tipo: 'Condiciones', url: 'condiciones' });
        this.setState({
          requisitos: [...this.state.requisitos, ...requisitos],
        });
      }).catch((err) => {
      });

    // deseos
    fetch('/requisitos/deseos', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let requisitos = [];
        for (let key in res)
          requisitos.push({ name: key, value: key, tipo: 'Deseos', url: 'deseos' });
        this.setState({
          requisitos: [...this.state.requisitos, ...requisitos],
        });
      }).catch((err) => {
      });
  }

  componentDidMount() {
    // cargar todos los requisitos
    this.cargarRequisitos();
  }

  handleEliminar(tipo, value) {
    fetch(`/requisitos/${tipo}/${value}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        this.cargarRequisitos();
      });
  }

  radioChange (event) {
    this.setState({ tipoRequisito: event.target.id });
  }

  radioChangeSanitario (event) {
    this.setState({ pruebaSanitario: event.target.id === 'si' });
  }

  verficiarCalificacion(event) {
    // verificar que la calificacion este entre 0 y 100
    let calificacion = event.target.value;
    if (calificacion) {
      let num = Number(calificacion);
      if (num < 0) {
        // se sale del rango, setear a 0
        event.target.value = 0;
      } else if (num > 100) {
        event.target.value = 100;
      }
    } else {
      // esta vacio, setear a 0
      event.target.value = 0;
    }
  }
  
  obtenerFormularios() {
    // devuelve los formularios dependiendo de que radio button esta seleccionado
    if (this.state.tipoRequisito === 'Sanitarios') {
      return (
        <FormGroup>
          <Label for='nombre-sanitario'>Nombre de Requisito sanitario</Label>
          <Input type='text' name='nombre-sanitario' id='nombre-sanitario' placeholder='Prueba de VIH'
          value={this.state.nombreSanitario} 
          onChange={e => this.setState({ nombreSanitario: e.target.value })}/>
        </FormGroup>
      );

    } else if (this.state.tipoRequisito === 'Legales') {
      return (
        <FormGroup>
          <Label for='nombre-legales'>Nombre Legales</Label>
          <Input type='text' name='nombre-legales' id='nombre-legales' placeholder='Servicio Militar' 
          value={this.state.nombreLegales}
          onChange={e => this.setState({ nombreLegales: e.target.value })}/>
        </FormGroup>
      );

    } else if (this.state.tipoRequisito === 'Institucion Academica') {
      return (
        <FormGroup>
          <Label for='nomInstAcade'>Nombre Institucion Academicá</Label>
          <Input type='text' name='nomInstAcade' id='nomInstAcade' placeholder='UNITEC' 
          value={this.state.nombreInstitucionAcademica}
          onChange={e => this.setState({ nombreInstitucionAcademica: e.target.value })}/>
        </FormGroup>
      );

    } else if (this.state.tipoRequisito === 'Profesionales') {
      return (
        <FormGroup>
          {/* Si saco algun certificado */}
          <Label for='nombre-profe'>Nombre Institucion Profesionales</Label>
          <Input type='text' name='nombre-profe' id='nombre-profe' placeholder='Certificados'
          value={this.state.nombreProfesionales}
          onChange={e => this.setState({ nombreProfesionales: e.target.value })}/>
        </FormGroup>
      );

    } else if (this.state.tipoRequisito === 'Laborales') {
      return (
        <FormGroup>
          {/* Cuantos anios trabajo y donde */}
          <Label for='nombre-laboral'>Nombre Institucion Laboral</Label>
          <Input type='text' name='nombre-laboral' id='nombre-laboral' placeholder='Experiencia laboral'
          value={this.state.nombreLaborales}
          onChange={e => this.setState({ nombreLaborales: e.target.value })}/>
        </FormGroup>
      );

    } else if (this.state.tipoRequisito === 'Grado de Estudio') {
      return (
        <FormGroup>
          {/* Que titulo universitario obtuvo */}
          <Label for='grado-estudio'>Tipo de grado de estudio</Label>
          <Input type='text' name='grado-estudio' id='grado-estudio' placeholder='Ingeniería/Licenciatura/Técnico'
          value={this.state.nombreGradoEstudio}
          onChange={e => this.setState({ nombreGradoEstudio: e.target.value })}/>
        </FormGroup>
      );

    } else if (this.state.tipoRequisito === 'Carrera de Estudio') {
      return (
        <FormGroup>
          {/* nombre de la carrera cursada */}
          <Label for='carrera-estudio'>Tipo de carrera de estudio</Label>
          <Input type='text' name='carrera-estudio' id='carrera-estudio' placeholder='Medicina'
          value={this.state.nombreCarreraEstudio}
          onChange={e => this.setState({ nombreCarreraEstudio: e.target.value })}/>
        </FormGroup>
      );

    } else if (this.state.tipoRequisito === 'Condiciones') {
      return (
        <FormGroup>
          {/* tipo de limitaciones */}
          <Label for='condiciones'>Tipo de condiciones</Label>
          <Input type='text' name='condiciones' id='condiciones' placeholder='Saber manejar'
          value={this.state.nombreCondiciones}
          onChange={e => this.setState({ nombreCondiciones: e.target.value })}/>
        </FormGroup>
      );

    } else if (this.state.tipoRequisito === 'Deseos') {
      return (
        <FormGroup>
          {/* tipo de deseos */}
          <Label for='deseos'>Tipo de deseos</Label>
          <Input type='text' name='deseos' id='deseos' placeholder='Almuerzo de 1 hora'
          value={this.state.nombreDeseos}
          onChange={e => this.setState({ nombreDeseos: e.target.value })}/>
        </FormGroup>
      );
    }
  }

  submitState(event) {
    event.preventDefault();
    if (this.state.tipoRequisito === 'Sanitarios') {
      fetch('/requisitos/sanitarios', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({ nombre: this.state.nombreSanitario }),
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            nombreSanitario: '',
            nombreLegales: '',
            nombreInstitucionAcademica: '',
            nombreProfesionales: '',
            nombreCondiciones: '',
            nombreDeseos: '',
            nombreLaborales: '',
            nombreGradoEstudio: '',
            nombreCarreraEstudio: '',
          });
          this.cargarRequisitos();
        }).catch((err) => {
        });

    } else if (this.state.tipoRequisito === 'Legales') {
      fetch('/requisitos/legales', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({nombre:this.state.nombreLegales}),
      })
        .then(res => res.json())
        .then(res => {
          // logica de respuesta
          this.setState({
            nombreSanitario: '',
            nombreLegales: '',
            nombreInstitucionAcademica: '',
            nombreCondiciones: '',
            nombreDeseos: '',
            nombreProfesionales: '',
            nombreLaborales: '',
            nombreGradoEstudio: '',
            nombreCarreraEstudio: '',
          });
          this.cargarRequisitos();
        }).catch((err) => {
        });

    } else if (this.state.tipoRequisito === 'Institucion Academica') {
      fetch('/requisitos/institucionacademica', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({nombre:this.state.nombreInstitucionAcademica}),
      })
        .then(res => res.json())
        .then(res => {
          // logica de respuesta
          this.setState({
            nombreSanitario: '',
            nombreLegales: '',
            nombreInstitucionAcademica: '',
            nombreCondiciones: '',
            nombreDeseos: '',
            nombreProfesionales: '',
            nombreLaborales: '',
            nombreGradoEstudio: '',
            nombreCarreraEstudio: '',
          });
          this.cargarRequisitos();
        }).catch((err) => {
        });

    } else if (this.state.tipoRequisito === 'Profesionales') {
      fetch('/requisitos/profesionales', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({nombre:this.state.nombreProfesionales}),
      })
        .then(res => res.json())
        .then(res => {
          // logica de respuesta
          this.setState({
            nombreSanitario: '',
            nombreLegales: '',
            nombreInstitucionAcademica: '',
            nombreCondiciones: '',
            nombreDeseos: '',
            nombreProfesionales: '',
            nombreLaborales: '',
            nombreGradoEstudio: '',
            nombreCarreraEstudio: '',
          });
          this.cargarRequisitos();
        }).catch((err) => {
        });

    } else if (this.state.tipoRequisito === 'Laborales') {
      fetch('/requisitos/laborales', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({nombre:this.state.nombreLaborales}),
      })
        .then(res => res.json())
        .then(res => {
          // logica de respuesta
          this.setState({
            nombreSanitario: '',
            nombreLegales: '',
            nombreInstitucionAcademica: '',
            nombreCondiciones: '',
            nombreDeseos: '',
            nombreProfesionales: '',
            nombreLaborales: '',
            nombreGradoEstudio: '',
            nombreCarreraEstudio: '',
          });
          this.cargarRequisitos();
        }).catch((err) => {
        });

    } else if (this.state.tipoRequisito === 'Grado de Estudio') {
      fetch('/requisitos/gradoestudio', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({nombre:this.state.nombreGradoEstudio}),
      })
        .then(res => res.json())
        .then(res => {
          // logica de respuesta
          this.setState({
            nombreSanitario: '',
            nombreLegales: '',
            nombreInstitucionAcademica: '',
            nombreCondiciones: '',
            nombreDeseos: '',
            nombreProfesionales: '',
            nombreLaborales: '',
            nombreGradoEstudio: '',
            nombreCarreraEstudio: '',
          });
          this.cargarRequisitos();
        }).catch((err) => {
        });

    } else if (this.state.tipoRequisito === 'Carrera de Estudio') {
      fetch('/requisitos/carreraestudio', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({nombre:this.state.nombreCarreraEstudio}),
      })
        .then(res => res.json())
        .then(res => {
          // logica de respuesta
          this.setState({
            nombreSanitario: '',
            nombreLegales: '',
            nombreInstitucionAcademica: '',
            nombreCondiciones: '',
            nombreDeseos: '',
            nombreProfesionales: '',
            nombreLaborales: '',
            nombreGradoEstudio: '',
            nombreCarreraEstudio: '',
          });
          this.cargarRequisitos();
        }).catch((err) => {
        });

    } else if (this.state.tipoRequisito === 'Condiciones') {
      fetch('/requisitos/condiciones', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({nombre:this.state.nombreCondiciones}),
      })
        .then(res => res.json())
        .then(res => {
          // logica de respuesta
          this.setState({
            nombreSanitario: '',
            nombreLegales: '',
            nombreInstitucionAcademica: '',
            nombreCondiciones: '',
            nombreDeseos: '',
            nombreProfesionales: '',
            nombreLaborales: '',
            nombreGradoEstudio: '',
            nombreCarreraEstudio: '',
          });
          this.cargarRequisitos();
        }).catch((err) => {
        });

    } else if (this.state.tipoRequisito === 'Deseos') {
      fetch('/requisitos/deseos', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({ nombre: this.state.nombreDeseos }),
      })
        .then(res => res.json())
        .then(res => {
          // logica de respuesta
          this.setState({
            nombreSanitario: '',
            nombreLegales: '',
            nombreInstitucionAcademica: '',
            nombreCondiciones: '',
            nombreDeseos: '',
            nombreProfesionales: '',
            nombreLaborales: '',
            nombreGradoEstudio: '',
            nombreCarreraEstudio: '',
          });
          this.cargarRequisitos();
        }).catch((err) => {
        });
    }
  }

  render() {
    const { requisitos } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Form onSubmit={this.submitState}>
          <FormGroup tag='fieldset'>
            <legend>Tipo Requisito</legend>
            <FormGroup check>
              <Label check>
                <Input type='radio' onChange={this.radioChange} name='tipoR' id='Sanitarios' />Sanitarios
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='radio' onChange={this.radioChange} name='tipoR' id='Legales'/>Legales
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='radio' onChange={this.radioChange} name='tipoR' id='Institucion Academica'/>Institucion Academica
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='radio' onChange={this.radioChange} name='tipoR' id='Profesionales'/>Profesionales
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='radio' onChange={this.radioChange} name='tipoR' id= 'Laborales'/>Laborales
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='radio' onChange={this.radioChange} name='tipoR' id='Grado de Estudio'/>Grado de Estudio
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='radio' onChange={this.radioChange} name='tipoR' id='Carrera de Estudio'/>Carrera de Estudio
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='radio' onChange={this.radioChange} name='tipoR' id='Condiciones'/>Tipos de condiciones
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='radio' onChange={this.radioChange} name='tipoR' id='Deseos'/>Tipos de deseos
              </Label>
            </FormGroup>
          </FormGroup>

        {this.obtenerFormularios()}

        <Button>Guardar</Button>
        </Form>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Tipo de requisito</TableCell>
                <TableCell>Nombre del requisito</TableCell>
                <TableCell numeric>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requisitos.map(({ name, value, tipo, url }) => (
                <TableRow key={value}>
                  <TableCell component='th' scope='row'>
                    {tipo}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {name}
                  </TableCell>
                  <TableCell numeric>
                    <IconButton aria-label='Delete' value={value}
                      onClick={() => {this.handleEliminar(url, value);}}>
                      <DeleteIcon />
                    </IconButton>
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

AdminRequisitos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminRequisitos);