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
    this.agregarAcademicos = this.agregarAcademicos .bind(this);
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
      numeroAcademicos:1
    };
  }

  submitState(event) {
    event.preventDefault();
    fetch("/adminpersonas", {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      // informacion a enviar
      body: JSON.stringify(this.state)
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
  checkearAcademicos(event) {
    var academicos = this.state.academicos;
    academicos[event.target.id] = event.target.checked;
    this.setState({ academicos: academicos });
    console.log(this.state);
  }
  checkearProfesionales(event) {
    var profesionales = this.state.profesionales;
    profesionales[event.target.id] = event.target.checked;
    this.setState({ profesionales: profesionales });
    console.log(this.state);
  }
  checkearLaborales(event) {
    var laborales = this.state.laborales;
    laborales[event.target.id] = event.target.checked;
    this.setState({ laborales: laborales });
    console.log(this.state);
  }

  checkearFamilia(event) {
    var familiares = this.state.familiares;
    familiares[event.target.id] = event.target.checked;
    this.setState({ familiares: familiares });
    console.log(this.state);
  }
  checkearSanitarios(event) {
    var sanitarios = this.state.sanitarios;
    sanitarios[event.target.id] = event.target.checked;
    this.setState({ sanitarios: sanitarios });
    console.log(this.state);
  }
  checkearLegales(event) {
    var legales = this.state.legales;
    legales[event.target.id] = event.target.checked;
    this.setState({ legales: legales });
    console.log(this.state);
  }
  agregarAcademicos(event){
    let componentes = [];
    for(let i=0; i<this.state.numeroAcademicos; i++){
      componentes.push(
        <div>
          <div>
              <label>Institutos Academicos</label>
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
              </Input>
            </div>
            <div>
              <label>Carrera</label>
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
              </Input>
            </div>
            <div>
              <label>Grado</label>
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
              </Input>
            </div>
        </div>
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
            <CustomInput
              onChange={this.checkearFamilia}
              type="checkbox"
              id="familiar-2"
              label="Familiar 2"
            />
            <CustomInput
              onChange={this.checkearFamilia}
              type="checkbox"
              id="familiar-3"
              label="Familiar 3"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-sanitarios">Requisitos Sanitarios</Label>
          <div id="requisitos-sanitarios">
            <CustomInput
              onChange={this.checkearSanitarios}
              type="checkbox"
              id="req-sanitario-1"
              label="Requisito 1"
            />
            <CustomInput
              onChange={this.checkearSanitarios}
              type="checkbox"
              id="req-sanitario-2"
              label="Requisito 2"
            />
            <CustomInput
              onChange={this.checkearSanitarios}
              type="checkbox"
              id="req-sanitario-3"
              label="Requisito 3"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-legal">Requisitos Legales</Label>
          <div id="requisitos-legal">
            <CustomInput
              onChange={this.checkearLegales}
              type="checkbox"
              id="req-legal-1"
              label="Requisito 1"
            />
            <CustomInput
              onChange={this.checkearLegales}
              type="checkbox"
              id="req-legal-2"
              label="Requisito 2"
            />
            <CustomInput
              onChange={this.checkearLegales}
              type="checkbox"
              id="req-legal-3"
              label="Requisito 3"
            />
          </div>
        </FormGroup>

        <FormGroup>
          <h5 for="requisitos-academicos">Requisitos Academicos </h5>
          <Button size="sm" type="button" outline color="primary" onClick={this.restarStateAcademicos}>
            -
          </Button>{" "}
          <Button size="sm" type="button" outline color="primary" onClick={this.agregarStateAcademicos}>
            +
          </Button>{" "}
          {this.agregarAcademicos()}
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-profesionales">Requisitos Profesionales</Label>
          <div id="requisitos-profesionales">
            <CustomInput
              onChange={this.checkearProfesionales}
              type="checkbox"
              id="req-profesionales-1"
              label="Requisito 1"
            />
            <CustomInput
              onChange={this.checkearProfesionales}
              type="checkbox"
              id="req-profesionales-2"
              label="Requisito 2"
            />
            <CustomInput
              onChange={this.checkearProfesionales}
              type="checkbox"
              id="req-profesionales-3"
              label="Requisito 3"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos-laborales">Requisitos Laborales</Label>
          <div id="requisitos-laborales">
            <CustomInput
              onChange={this.checkearLaborales}
              type="checkbox"
              id="req-laborales-1"
              label="Requisito 1"
            />
            <CustomInput
              onChange={this.checkearLaborales}
              type="checkbox"
              id="req-laborales-2"
              label="Requisito 2"
            />
            <CustomInput
              onChange={this.checkearLaborales}
              type="checkbox"
              id="req-laborales-3"
              label="Requisito 3"
            />
          </div>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

AdminPersonas.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPersonas);
