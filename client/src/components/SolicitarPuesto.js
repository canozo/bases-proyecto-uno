import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
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
    this.state = {
    };
  }

  render() {
    return (
      <Form>
        <FormGroup>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Personas
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
        </FormGroup>
        <FormGroup>
          <Label for="Puestos">Puestos</Label>
          <div>
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

