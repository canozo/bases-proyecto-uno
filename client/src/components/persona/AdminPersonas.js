import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Form, FormGroup, Label, Input, CustomInput } from "reactstrap";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  }
};

class AdminPersonas extends Component {
  constructor(props) {
    super(props);

    this.submitState = this.submitState.bind(this);
    this.checkearFamilia = this.checkearFamilia.bind(this);
    this.checkearSanitarios = this.checkearSanitarios.bind(this);
    this.checkearLegales = this.checkearLegales.bind(this);
    this.checkearAcademicos = this.checkearAcademicos.bind(this);
    this.checkearLaborales = this.checkearLaborales.bind(this);
    this.checkearProfesionales = this.checkearProfesionales.bind(this);
    this.agregarAcademicos = this.agregarAcademicos.bind(this);
    this.agregarStateAcademicos = this.agregarStateAcademicos.bind(this);
    this.restarStateAcademicos = this.restarStateAcademicos.bind(this);
    this.agregarAcademicos = this.agregarAcademicos.bind(this);
 
    this.state = {
      nombre: "",
      numID: "",
      telefono: "",
      email: "",
      direccion: "",
      genero: "",
      fecha_nacimiento: "",
      estado_civil: "",
      familiares: {},
      sanitarios: {},
      legales: {},
      laborales: {},
      profesionales: {},
      academicos: {},
      numeroAcademicos: 1,
      instituciones: [],
      carrerasEstudio:[],
      gradosAcademicos:[], 
      opcLegales:[], 
      opcSanitarios:[],
      opcFamiliares:[],
      opcProfesionales:[],
      opcLaborales:[]
    };
  }
  getProfesionales(){
    fetch('/requisitos/profesionales', {
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

        let opcProfesionales = [];
        for (let key in res)
          opcProfesionales.push({ name: key, value: key});

          this.setState({
            opcProfesionales: opcProfesionales || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }
  getFamiliares(){
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

        let opcFamiliares = [];
        for (let key in res)
          opcFamiliares.push({ name: key, value: key});

          this.setState({
            opcFamiliares: opcFamiliares || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }
  getLaborales(){
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
        console.log(res);

        let opcLaborales = [];
        for (let key in res)
          opcLaborales.push({ name: key, value: key});

          this.setState({
            opcLaborales: opcLaborales || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }
  getSanitarios(){
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
        console.log(res);

        let opcSanitarios = [];
        for (let key in res)
          opcSanitarios.push({ name: key, value: key});

          this.setState({
            opcSanitarios: opcSanitarios || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }
  getInstituciones(){
    fetch('/requisitos/institucionAcademica', {
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

        let instituciones = [];
        for (let key in res)
          instituciones.push({ name: key, value: key});

          this.setState({
          instituciones: instituciones || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }
  getCarrera(){
    fetch('/requisitos/carreraEstudio', {
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

        let carrerasEstudio = [];
        for (let key in res)
        carrerasEstudio.push({ name: key, value: key});

          this.setState({
            carrerasEstudio: carrerasEstudio || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }
  getGrados(){
    fetch('/requisitos/gradoEstudio', {
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

        let gradosAcademicos = [];
        for (let key in res)
        gradosAcademicos.push({ name: key, value: key});

          this.setState({
            gradosAcademicos: gradosAcademicos || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }
  getLegales(){
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
        console.log(res);

        let legales = [];
        for (let key in res)
        legales.push({ name: key, value: key});

          this.setState({
            opcLegales: legales || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }

  submitState(event) {
    event.preventDefault();
    console.log(this.state);
    // fetch("/adminpersonas", {
    //   method: "put",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   // informacion a enviar
    //   body: JSON.stringify(this.state)
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     // logica de respuesta
    //     this.setState({
    //       status: res.status,
    //       response: res.response
    //     });
    //   });
  }

  checkearAcademicos(event) {
    var academicos = this.state.academicos;
    academicos[event.target.id] = event.target.checked;
    this.setState({ academicos: academicos });
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
  }


  agregarAcademicos(event) {
    const { instituciones, carrerasEstudio, gradosAcademicos } = this.state;
    let componentes = [];
    for(let i = 0; i < this.state.numeroAcademicos; i++){
      componentes.push(
        <FormGroup key={i}>
          <div>
              <label>Instituto Academico</label>
              <Input
                type="select"
                onChange={e =>
                  this.setState({
                   componentes: [i, e.target.value]
                  })
                }
              >
               {instituciones.map(({value }) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
              </Input>
            </div>
            <div>
              <label>Carrera</label>
              <Input
                type="select"
                onChange={e =>
                  this.setState({
                    componentes: [i, e.target.value]
                  })
                }
              >
                {carrerasEstudio.map(({value }) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
              </Input>
            </div>
            <div>
              <label>Grado</label>
              <Input
                type="select"
                onChange={e =>
                  this.setState({
                    componentes: [i, e.target.value]
                  })
                }
              >
                {gradosAcademicos.map(({value }) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
              </Input>
            </div>
        </FormGroup>
      );
    }
    if (componentes)
      return componentes;
    else 
      return <div>No hay componentes</div>
  }

  agregarStateAcademicos(event){
    this.setState({numeroAcademicos : this.state.numeroAcademicos +1});
    this.agregarAcademicos()
  }

  restarStateAcademicos(event){
    if(this.state.numeroAcademicos>0){
      this.setState({numeroAcademicos : this.state.numeroAcademicos -1});
      this.agregarAcademicos()
    }else{

    }

  }

  render() {
    const { opcLegales, opcFamiliares, opcLaborales, opcProfesionales, opcSanitarios } = this.state;
    return (
      
      <Form onSubmit={this.submitState}>
        <FormGroup>
          <Label for="nombre-completo">Nombre Completo</Label>
          <Input
            type="text"
            name="nombre-completo"
            id="nombre-completo"
            placeholder="Juan Mauricio"
            onChange={e => this.setState({ nombre: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="num-identidad">Numero de Identidad</Label>
          <Input
            type="text"
            name="num-identidad"
            id="num-identidad"
            placeholder="0801-1990-00000"
            onChange={e => this.setState({ numID: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="telefono">Telefono</Label>
          <Input
            type="text"
            name="telefono"
            id="telefono"
            placeholder="50422000000"
            onChange={e => this.setState({ telefono: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Correo electronico</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="ejemplo@gmail.com"
            onChange={e => this.setState({ email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label>Genero</Label>
          <Input
            type="select"
            onChange={e => this.setState({ genero: e.target.value })}
          >
            <option name="Masculino" id="Masculino">
              Masculino
            </option>
            <option name="Femenino" id="Femenino">
              Femenino
            </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Estado Civil</Label>
          <Input
            type="select"
            onChange={e =>
              this.setState({
                estado_civil: e.target.value
              })
            }
          >
            <option value="Soltero" id="Soltero">
              Soltero
            </option>
            <option value="Casado" id="Casado">
              Casado
            </option>
            <option value="Viudo" id="Viudo">
              Viudo
            </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleDate">Fecha de Nacimiento</Label>
          <Input
            type="date"
            name="date"
            id="fecha_nacimiento"
            placeholder="MM-DD-YYYY"
            onChange={e => this.setState({ fecha_nacimiento: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="direccion">Direccion</Label>
          <Input
            type="text"
            name="direccion"
            id="direccion"
            placeholder="Col. Miramomtes 3ra ave"
            onChange={e => this.setState({ direccion: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="familiares">Familiares del empleado</Label>
          <div id="familiares">
            <CustomInput
              onChange={this.checkearFamilia}
              type="checkbox"
              id="familiar-1"
              label="Familiar 1"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-sanitarios">Requisitos Sanitarios</Label>
          <div id="requisitos-sanitarios">
          {opcSanitarios.map(({value }) => (
                <CustomInput
                  onChange={this.checkearSanitarios}
                  type="checkbox"
                  id={value}
                  label={value}
                  key = {value}
                />
                ))}
            
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-legal">Requisitos Legales</Label>
          <div id="requisitos-legal">
          {opcLegales.map(({value }) => (
                <CustomInput
                  onChange={this.checkearLegales}
                  type="checkbox"
                  id={value}
                  label={value}
                  key = {value}
                />
                ))}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-profesionales">Requisitos Profesionales</Label>
          <div id="requisitos-profesionales">
          {opcProfesionales.map(({value }) => (
                <CustomInput
                  onChange={this.checkearProfesionales}
                  type="checkbox"
                  id={value}
                  label={value}
                  key = {value}
                />
                ))}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-laborales">Requisitos Laborales</Label>
          <div id="requisitos-laborales">
          {opcLaborales.map(({value }) => (
                <CustomInput
                  onChange={this.checkearLaborales}
                  type="checkbox"
                  id={value}
                  label={value}
                  key = {value}
                />
                ))}
          </div>
        </FormGroup>
        <FormGroup>
          <h5 htmlFor="requisitos-academicos">Requisitos Academicos </h5>
          <Button size="sm" type="button" outline color="primary" onClick={this.restarStateAcademicos}>
            -
          </Button>{" "}
          <Button size="sm" type="button" outline color="primary" onClick={this.agregarStateAcademicos}>
            +
          </Button>{" "}
          <FormGroup>{this.agregarAcademicos()}</FormGroup>
        </FormGroup>
        <Button>Guardar</Button>
      </Form>
    );
  }
}

AdminPersonas.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPersonas);
