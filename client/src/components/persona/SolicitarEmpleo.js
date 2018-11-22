import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Form, FormGroup, Label, CustomInput } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  title: {
    paddingTop: "20px",
    paddingBottom: "10px",
    paddingLeft: "10px"
  },
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    display: "flex",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    display: "flex",
    margin: theme.spacing.unit,
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  root_table: {
    display: "flex",
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    display: "flex",
    minWidth: 700
  }
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
    this.handleChange = this.handleChange.bind(this);
    this.submitState = this.submitState.bind(this);

    this.state = {
      dropdownOpen: false,
      selectedName: "Escoger Persona",
      selectedValue: "",
      personas: [],
      puestos: [],
      checkPuestos: {},
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
      labelWidth: 0
    };
  }

  checkearPuestos(event) {
    var checkPuestos = this.state.checkPuestos;
    checkPuestos[event.target.id] = event.target.checked;
    this.setState({ checkPuestos: checkPuestos });
  }
  cargarCondiciones(){
    
  }

  cargarPersonas() {
    fetch("/personas", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let personas = [];
        for (let key in res) personas.push({ id: key, nombre: res[key] });

        this.setState({
          personas: personas || []
        });
      })
      .catch(error => {});
  }

  cargarPuestos() {
    fetch("/puestos", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let puestos = [];
        for (let key in res) puestos.push({ id: key, value: key });

        this.setState({
          puestos: puestos || []
        });
      })
      .catch(error => {});
  }

  componentDidMount() {
    this.cargarPersonas();
    this.cargarPuestos();
    // this.setState({
    //   labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    // });
  }

  handleEditar(value) {
    fetch(`/empleos/${value}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        this.setState({
          tipoEmpleo: value,
          selectedName: res.empleoPadre,
          selectedValue: res.empleoPadre
        });
      })
      .catch(error => {});
  }

  handleEliminar(value) {
    fetch(`/empleo/${value}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
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

  submitState(event) {
    event.preventDefault();
    event.preventDefault();
    fetch("/puestos", {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      // informacion a enviar
      body: JSON.stringify({
        "empresa,": this.state.selectedName,
        sanitarios: this.state.sanitarios,
        legales: this.state.legales,
        laborales: this.state.laborales,
        profesionales: this.state.profesionales,
        academicos: this.state.academicos,
        numAcadm: this.state.numeroAcademicos
      })
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        this.cargarPersonas();

        this.setState({
          selectedValue: "",
          puestos: [],
          checkPuestos: {},
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
          labelWidth: 0
        });
      })
      .catch(err => {});
  }
  agregarStateAcademicos() {
    this.setState({ numeroAcademicos: this.state.numeroAcademicos + 1 });
    this.agregarAcademicos();
  }

  restarStateAcademicos() {
    if (this.state.numeroAcademicos > 0) {
      this.setState({ numeroAcademicos: this.state.numeroAcademicos - 1 });
      this.agregarAcademicos();
    }
  }

  render() {
    const { classes } = this.props;
    const { personas, puestos } = this.state;
    return (
      <Form onSubmit={this.submitState}>
        <FormGroup>
          <Dropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropdown}
          >
            <DropdownToggle caret>{this.state.selectedName}</DropdownToggle>
            <DropdownMenu>
              {personas.map(({ id, nombre }) => (
                <DropdownItem value="1" onClick={this.selectDropdown} id={id}>
                  {nombre}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <FormGroup>
          <Label for="puestos">Puestos</Label>
          <div id="puestos">
            {puestos.map(({ id, value }) => (
              <CustomInput type="checkbox" id={id} label={value} />
            ))}
          </div>
        </FormGroup>
        <FormControl variant="outlined" className={classes.formControl}>
          {this.state.condicionManejar === "" ? (
            <InputLabel>Sabe manejar</InputLabel>
          ) : (
            ""
          )}
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
            <option value="" />
            <option value="Si">Si</option>
            <option value="No">No</option>
          </Select>
        </FormControl>
        <Button>Guardar</Button>
      </Form>
    );
  }
}
SolicitarEmpleo.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SolicitarEmpleo);
