import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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

class AdminPuestos extends Component {
  constructor(props) {
    super(props);

    this.submitState = this.submitState.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectDropdown = this.selectDropdown.bind(this);
    this.cargarPuestos = this.cargarPuestos.bind(this);

    this.state = {
      puestos: [],
      tipoPuesto: '',
      dropdownOpen: false,
      selectedName: 'Ninguno',
      selectedValue: '0',
    };
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
        console.log(res);

        let puestos = [];
        for (let key in res)
          puestos.push({ name: key, value: key});

          this.setState({
          puestos: puestos || [],
        });
      })
        .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.cargarPuestos();
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
    fetch('/puestos', {
      method: 'put',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // informacion a enviar
      body: JSON.stringify({
        puesto: this.state.tipoPuesto,
        puestoPadre: this.state.selectedName,
      }),
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        console.log('entra aqui');
        this.cargarPuestos();
        this.setState({
          tipoPuesto: '',
          selectedValue: '0',
        });
        console.log(res);
      });
  }

  render() {
    const { puestos } = this.state;

    return (
      <Form onSubmit={this.submitState}>
        <FormGroup>
          <Label for="tipoPuesto">Tipo de Puesto</Label>
          <Input type="text" name="tipoPuesto" id="tipoPuesto" value={this.state.tipoPuesto} placeholder="Programador WEB"
          onChange={e => this.setState({ tipoPuesto: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret>
              {this.state.selectedName}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem key='0' value='0' onClick={this.selectDropdown}>Ninguno</DropdownItem>

              {/* Generar los items con los puestos obtenidos de la base de datos */}
              {puestos.map(({ name, value }) => (
                <DropdownItem key={value} value={value} onClick={this.selectDropdown}>
                  {name}
                </DropdownItem>
              ))}

            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <Button>Guardar</Button>
      </Form>
    );
  }
}

AdminPuestos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPuestos);