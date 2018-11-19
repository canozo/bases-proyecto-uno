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

    this.state = {
      tipoPuesto: '',
      puestoPadre: '',
      dropdownOpen: false,
      selectedName: 'Escoger puesto padre',
      selectedValue: '0',
    };
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
    alert(JSON.stringify(this.state, null, ''));
    event.preventDefault();
    fetch('/adminpuestos', {
      method: 'put',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // informacion a enviar
      body: JSON.stringify(this.state),
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

  render() {
    return (
      <Form onSubmit={this.submitState}>
        <FormGroup>
          <Label for="tipoPuesto">Tipo de Puesto</Label>
          <Input type="text" name="tipoPuesto" id="tipoPuesto" placeholder="Programador WEB"
          onChange={e => this.setState({ tipoPuesto: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret>
              {this.state.selectedName}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem value='0' onClick={this.selectDropdown}>Escoger puesto padre</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value='1' onClick={this.selectDropdown}>Programador</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value='2' onClick={this.selectDropdown}>Administrador</DropdownItem>
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