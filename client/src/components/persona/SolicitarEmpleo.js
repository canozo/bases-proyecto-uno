import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Input, Label, CustomInput } from 'reactstrap';

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

class SolicitarEmpleo extends Component {
  constructor(props) {
    super(props);

    this.cargarPersonas = this.cargarPersonas.bind(this);
    this.cargarPuestos = this.cargarPuestos.bind(this);
    this.checkearPuestos = this.checkearPuestos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitState = this.submitState.bind(this);
    this.handleChangeCondiciones = this.handleChangeCondiciones.bind(this);
    this.handleChangeDeseos = this.handleChangeDeseos.bind(this);

    this.state = {
      idSolicitante: '',
      condicionesRes: {},
      deseosRes: {},
      personas:[],
      puestos:[],
      condiciones: [],
      deseos: [],
      checkPuestos: {},
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

  submitState(event){
    // event.preventDefault();

    fetch('/solicitudes/empleos', {
      method: 'put',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // informacion a enviar
      body: JSON.stringify({
        puestosAplica: this.state.checkPuestos,
        condicionesRes: this.state.condicionesRes,
        deseosRes: this.state.deseosRes,
        idSolicitante: this.state.idSolicitante
      }),
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        this.setState({
          checkPuestos: {},
          condicionesRes: {},
          deseosRes: {},
        });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    const { personas, puestos, condiciones, deseos } = this.state;

    return (
      <Form onSubmit={this.submitState}>
        <FormGroup>
          <Label>Solicitante:</Label>
            <Input
              type='select'
              id='idSolicitante'
              value={this.state.idSolicitante}
              onChange={this.handleChange}>
              <option value=''/>
              {personas.map(({ id, nombre }) => (
                <option key={id} value={id}>{nombre}</option>
              ))}
            </Input>
        </FormGroup>

        <FormGroup>
          <Label for="puestos">Puestos</Label>
          <div id="puestos">
          {puestos.map(({id, value}) =>(
              <CustomInput key={id} type="checkbox" id={id} label={value} onChange={this.checkearPuestos} />
              ))}
          </div>
        </FormGroup>
        <FormGroup>
          <Label>Condiciones que cumple:</Label>
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
          <Label>Deseos de trabajo:</Label>
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
