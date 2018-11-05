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

class SolicitarPuesto extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.state = {
      dropdownOpen: false,
      dropdownSelectedName: 'Escoger Persona',
      dropdownSelectedValue: ''
    };
  }

  toggleDropdown(name, value, event) {
    if (name && value) {
      this.setState({
        dropdownSelectedName: name,
        dropdownSelectedValue: value,
        dropdownOpen: !this.state.dropdownOpen
      });
    } else {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret>
              {this.state.dropdownSelectedName}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.toggleDropdown.bind(this, 'Nombre 1', '1')}>Opcion 1</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.toggleDropdown.bind(this, 'Nombre 2', '2')}>Opcion 2</DropdownItem>
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
        <Button>Submit</Button>
      </Form>
    );
  }
}

SolicitarPuesto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SolicitarPuesto);

