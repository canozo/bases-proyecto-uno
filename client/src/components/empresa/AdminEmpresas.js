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

class AdminEmpresas extends Component {
  constructor(props) {
    super(props);

    this.submitState = this.submitState.bind(this);

    this.state = {
      nombre:'',
      direccion:'',
      director: '',
      rubro:'',
      cfi:''
    };
  }

  submitState(event){
    alert(JSON.stringify(this.state, null, '  '));
    event.preventDefault();
    fetch('/adminempresas', {
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
      <Form onSubmit ={this.submitState}>
        <FormGroup>
          <Label for="director">Nombre de Empresa</Label>
          <Input type="text" name="nombre" id="nombre" placeholder="ENEE" 
          onChange={e => this.setState({ nombre: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="director">Nombre del director</Label>
          <Input type="text" name="director" id="director" placeholder="Juan Mauricio" 
          onChange={e => this.setState({ director: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="direccion">Direccion de la empresa</Label>
          <Input type="text" name="direccion" id="direccion" placeholder="Col. Miramomtes 3 ave" 
          onChange={e => this.setState({ direccion: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="rubro">Rubro</Label>
          <Input type="text" name="rubro" id="rubro" placeholder="Telecomunicaciones" 
          onChange={e => this.setState({ rubro: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="cfi">CFI</Label>
          <Input type="text" name="cfi" id="cfi" placeholder="CFI" 
          onChange={e => this.setState({ cfi: e.target.value })}/>
        </FormGroup>
        <Button>Guardar</Button>
      </Form>
    );
  }
}

AdminEmpresas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminEmpresas);