import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

class AdminRequisitos extends Component {
  constructor(props) {
    super(props);

    this.radioChange = this.radioChange.bind(this);
    this.radioChangeSanitario = this.radioChangeSanitario.bind(this);
    this.obtenerFormularios = this.obtenerFormularios.bind(this);
    this.verficiarCalificacion = this.verficiarCalificacion.bind(this);
    this.submitState = this.submitState.bind(this);

    this.state = {
      tipoRequisito: 'Sanitarios',
      nombreSanitario:'',
      nombreLegales:'',
      nombreInstitucionAcademica:'',
      nombreProfesionales:'',
      nombreLaborales:'',
      nombreGradoEstudio:'',
      nombreCarreraEstudio:'',
    };
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
        <div>
          <FormGroup>
            <Label for="nombre-sanitario">Nombre de Requisito sanitario</Label>
            <Input type="text" name="nombre-sanitario" id="nombre-sanitario" placeholder="Prueba de VIH"
            value = {this.state.nombreSanitario} 
            onChange={e => this.setState({ nombreSanitario: e.target.value })}/>
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Legales') {
      return (
        <div>
          <FormGroup>
            <Label for="nombre-legales">Nombre Legales</Label>
            <Input type="text" name="nombre-legales" id="nombre-legales" placeholder="Servicio Militar" 
            value = {this.state.nombreLegales}
            onChange={e => this.setState({ nombreLegales: e.target.value })}/>
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Institucion Academica') {
      return (
        <div>
          <FormGroup>
            <Label for="nomInstAcade">Nombre Institucion Academicá</Label>
            <Input type="text" name="nomInstAcade" id="nomInstAcade" placeholder="UNITEC" 
            value = {this.state.nombreInstitucionAcademica}
            onChange={e => this.setState({ nombreInstitucionAcademica: e.target.value })}/>
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Profesionales') {
      return (
        <div>
          <FormGroup>
            {/* Si saco algun certificado */}
            <Label for="nombre-profe">Nombre Institucion Profesionales</Label>
            <Input type="text" name="nombre-profe" id="nombre-profe" placeholder="Certificados"
            value = {this.state.nombreProfesionales}
            onChange={e => this.setState({ nombreProfesionales: e.target.value })}/>
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Laborales') {
      return (
        <div>
          <FormGroup>
            {/* Cuantos anios trabajo y donde */}
            <Label for="nombre-laboral">Nombre Institucion Laboral</Label>
            <Input type="text" name="nombre-laboral" id="nombre-laboral" placeholder="Experiencia laboral"
            value = {this.state.nombreLaborales}
            onChange={e => this.setState({ nombreLaborales: e.target.value })}/>
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Grado de Estudio') {
      return (
        <div>
          <FormGroup>
            {/* Que titulo universitario obtuvo */}
            <Label for="grado-estudio">Tipo de grado de estudio</Label>
            <Input type="text" name="grado-estudio" id="grado-estudio" placeholder="Ingeniería/Licenciatura/Técnico"
            value = {this.state.nombreGradoEstudio}
            onChange={e => this.setState({ nombreGradoEstudio: e.target.value })}/>
          </FormGroup>
        </div>
      );

    } else if (this.state.tipoRequisito === 'Carrera de Estudio') {
      return (
        <div>
          <FormGroup>
            {/* nombre de la carrera cursada */}
            <Label for="carrera-estudio">Tipo de carrera de estudio</Label>
            <Input type="text" name="carrera-estudio" id="carrera-estudio" placeholder="Medicina"
            value = {this.state.nombreCarreraEstudio}
            onChange={e => this.setState({ nombreCarreraEstudio: e.target.value })}/>
          </FormGroup>
        </div>
      );
    }
  }

  submitState(event){
    event.preventDefault();
    console.log('insertando', this.state);
    if(this.state.tipoRequisito==="Sanitarios"){
      fetch('/requisitos/sanitarios', {
        method: 'put',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // informacion a enviar
        body: JSON.stringify({nombre:this.state.nombreSanitario}),
      })
        .then(res => res.json())
        .then(res => {
          this.setState = ({
            tipoRequisito: 'Sanitarios',
            nombreSanitario:'',
            nombreLegales:'',
            nombreInstitucionAcademica:'',
            nombreProfesionales:'',
            nombreLaborales:'',
            nombreGradoEstudio:'',
            nombreCarreraEstudio:'',
          });
        }).catch((err) => {
          console.log("<error");
        });
    }else if(this.state.tipoRequisito==="Legales"){
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
          console.log(res);
          this.setState = ({
            tipoRequisito: 'Sanitarios',
            nombreSanitario:'',
            nombreLegales:'',
            nombreInstitucionAcademica:'',
            nombreProfesionales:'',
            nombreLaborales:'',
            nombreGradoEstudio:'',
            nombreCarreraEstudio:'',
          });
        }).catch((err) => {
          console.log("<error");
        });
    }else if(this.state.tipoRequisito==="Institucion Academica"){
      fetch('/requisitos/institucionAcademica', {
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
          this.setState = ({
            tipoRequisito: 'Sanitarios',
            nombreSanitario:'',
            nombreLegales:'',
            nombreInstitucionAcademica:'',
            nombreProfesionales:'',
            nombreLaborales:'',
            nombreGradoEstudio:'',
            nombreCarreraEstudio:'',
          });
          console.log(res);
        }).catch((err) => {
          console.log("<error");
        });
    }else if(this.state.tipoRequisito==="Profesionales"){
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
          this.setState = ({
            tipoRequisito: 'Sanitarios',
            nombreSanitario:'',
            nombreLegales:'',
            nombreInstitucionAcademica:'',
            nombreProfesionales:'',
            nombreLaborales:'',
            nombreGradoEstudio:'',
            nombreCarreraEstudio:'',
          });
          console.log(res);
        }).catch((err) => {
          console.log("<error");
        });
    }else if(this.state.tipoRequisito==="Laborales"){
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
          this.setState = ({
            tipoRequisito: 'Sanitarios',
            nombreSanitario:'',
            nombreLegales:'',
            nombreInstitucionAcademica:'',
            nombreProfesionales:'',
            nombreLaborales:'',
            nombreGradoEstudio:'',
            nombreCarreraEstudio:'',
          });  
          console.log(res);
        }).catch((err) => {
          console.log("<error");
        });
    }else if(this.state.tipoRequisito==="Grado de Estudio"){
      fetch('/requisitos/gradoEstudio', {
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
          this.setState = ({
            tipoRequisito: 'Sanitarios',
            nombreSanitario:'',
            nombreLegales:'',
            nombreInstitucionAcademica:'',
            nombreProfesionales:'',
            nombreLaborales:'',
            nombreGradoEstudio:'',
            nombreCarreraEstudio:'',
          });
          console.log(res);
        }).catch((err) => {
          console.log("<error");
        });
    }else if(this.state.tipoRequisito==="Carrera de Estudio"){
      fetch('/requisitos/carreraEstudio', {
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
          this.setState = ({
            tipoRequisito: 'Sanitarios',
            nombreSanitario:'',
            nombreLegales:'',
            nombreInstitucionAcademica:'',
            nombreProfesionales:'',
            nombreLaborales:'',
            nombreGradoEstudio:'',
            nombreCarreraEstudio:'',
          });
          console.log(res);
        }).catch((err) => {
          console.log("<error");
        });
    }
    
  }

  render() {
    return (
      <Form onSubmit={this.submitState}>
        <FormGroup tag="fieldset">
          <legend>Tipo Requisito</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Sanitarios' />Sanitarios
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Legales'/>Legales
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Institucion Academica'/>Institucion Academica
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Profesionales'/>Profesionales
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id= 'Laborales'/>Laborales
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Grado de Estudio'/>Grado de Estudio
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={this.radioChange} name="tipoR" id='Carrera de Estudio'/>Carrera de Estudio
            </Label>
          </FormGroup>
        </FormGroup>

        {this.obtenerFormularios()}

        <Button>Guardar</Button>
      </Form>
    );
  }
}

AdminRequisitos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminRequisitos);