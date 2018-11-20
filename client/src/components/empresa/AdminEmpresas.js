import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// redis: el ID en la base de datos es el nombre de la empresa

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
    event.preventDefault();
    console.log('insertando', this.state);
    fetch('/empresas', {
      method: 'put',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // informacion a enviar
      body: JSON.stringify({
        nombre: this.state.nombre,
        direccion:this.state.direccion,
        director: this.state.director,
        rubro: this.state.rubro,
        cfi:this.state.cfi,
      }),
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        console.log('entra aqui');
        this.setState({
          nombre:'',
          direccion:'',
          director: '',
          rubro:'',
          cfi:''
        });
        console.log(res);
      });
  }

  render() {
    return (
      <Form onSubmit ={this.submitState}>
        <FormGroup>
          <Label for="director">Nombre de Empresa</Label>
          <Input type="text" name="nombre" id="nombre" placeholder="ENEE" value={this.state.nombre}
          onChange={e => this.setState({ nombre: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="director">Nombre del director</Label>
          <Input type="text" name="director" id="director" placeholder="Juan Mauricio"   value={this.state.director}
          onChange={e => this.setState({ director: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="direccion">Direccion de la empresa</Label>
          <Input type="text" name="direccion" id="direccion" placeholder="Col. Miramomtes 3 ave"  value={this.state.direccion}
          onChange={e => this.setState({ direccion: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="rubro">Rubro</Label>
          <Input type="text" name="rubro" id="rubro" placeholder="Telecomunicaciones"  value={this.state.rubro}
          onChange={e => this.setState({ rubro: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label for="cfi">CFI</Label>
          <Input type="text" name="cfi" id="cfi" placeholder="CFI"  value={this.state.cfi}
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