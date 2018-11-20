import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, CustomInput } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};


class SolicitarEmpleo extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectDropdown = this.selectDropdown.bind(this);

    this.state = {
      dropdownOpen: false,
      selectedName: 'Escoger Persona',
      selectedValue: '',
    };
  }

  cargarSolicitud() {
    // limpar el state:
    this.setState({ empleos: [] });

    // Uno
    fetch('/empleos/uno', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let empleos = [];
        for (let key in res)
          empleos.push({ name: key, value: key, tipo: 'Uno', url: 'uno' });

        this.setState({
          empleos: [...this.state.empleos, ...empleos],
        });
      }).catch((err) => {
        console.log(err);
      });

    // Dos
    fetch('/empleos/dos', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let empleos = [];
        for (let key in res)
        empleos.push({ name: key, value: key, tipo: 'Dos', url: 'dos' });

        this.setState({
          empleos: [...this.state.empleos, ...empleos],
        });
      }).catch((err) => {
        console.log(err);
      });

    // Tres
    fetch('/empleos/tres', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let empleos = [];
        for (let key in res)
          empleos.push({ name: key, value: key, tipo: 'Tres', url: 'tres' });

        this.setState({
          empleos: [...this.state.empleos, ...empleos],
        });
      }).catch((err) => {
        console.log(err);
      });

    // Cuatro
    fetch('/empleos/cuatro', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let empleos = [];
        for (let key in res)
          empleos.push({ name: key, value: key, tipo: 'Cuatro', url: 'cuatro' });

        this.setState({
          empleos: [...this.state.empleos, ...empleos],
        });
      }).catch((err) => {
        console.log(err);
      });

    // Cinco
    fetch('/empleos/cinco', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        let empleos = [];
        for (let key in res)
          empleos.push({ name: key, value: key, tipo: 'Cinco', url: 'cinco' });

        this.setState({
          empleos: [...this.state.empleos, ...empleos],
        });
      }).catch((err) => {
        console.log(err);
      });
  }

  cargarEmpleos() {
    // obtener todos los empleos del servidor
    fetch('/empleos', {
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

        // TODO ver como cargar padres
        let empleos = [];
        for (let key in res)
        empleos.push({ name: key, value: key });

        this.setState({
          empleos: empleos || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.cargarEmpleos();
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
        this.cargarEmpleos();
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
        console.log('entra aqui');
        this.cargarEmpleos();
        this.setState({
          tipoEmpleo: '',
          selectedValue: '0',
        });
        console.log(res);
      });
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret>
              {this.state.selectedName}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem value='1' onClick={this.selectDropdown}>Opcion 1</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value='2' onClick={this.selectDropdown}>Opcion 2</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <FormGroup>
          <Label for="puestos">Puestos</Label>
          <div id="puestos">
            <CustomInput type="checkbox" id="Uno" label="Uno" />
            <CustomInput type="checkbox" id="Dos" label="Dos" />
            <CustomInput type="checkbox" id="Tres" label="Tres" />
            <CustomInput type="checkbox" id="Cuatro" label="Cuatro" />
            <CustomInput type="checkbox" id="Cinco" label="Cinco" />
          </div>
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

