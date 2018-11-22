import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

// redis: el ID en la base de datos es el nombre de la empresa

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class AdminEmpresas extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.handleEditar = this.handleEditar.bind(this);
    this.handleEliminar = this.handleEliminar.bind(this);
    this.cargarEmpresas = this.cargarEmpresas.bind(this);
    this.submitState = this.submitState.bind(this);

    this.state = {
      modoEditar: false,
      empresas: [],
      nombre: '',
      direccion: '',
      director: '',
      rubro: '',
      cfi: ''
    };
  }

  componentDidMount() {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    fetch('/empresas', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        let empresas = [];
        for (let key in res)
          empresas.push({ nombre: key });

        this.setState({
          empresas: empresas || [],
        });
      })
        .catch((err) => {});
  }

  handleEditar(value) {
    this.setState({ modoEditar: true });
    fetch(`/empresas/${value}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        this.setState({
          nombre: value,
          direccion: res.direccion,
          director: res.director,
          rubro: res.rubro,
          cfi: res.cfi,
        });
        this.cargarEmpresas();
      })
        .catch((error) => {
      });
  }

  handleEliminar(value) {
    this.setState({ modoEditar: false });
    fetch(`/empresas/${value}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        this.cargarEmpresas();
      })
      .catch((err) => {
      });
  }

  submitState(event){
    this.setState({ modoEditar: false });
    event.preventDefault();
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
        this.setState({
          nombre:'',
          direccion:'',
          director: '',
          rubro:'',
          cfi:''
        });
        this.cargarEmpresas();
      });
  }

  render() {
    const { classes } = this.props;
    const { empresas } = this.state;

    return (
      <div>
        <Form onSubmit ={this.submitState}>
          <FormGroup>
            <Label for='director'>Nombre de Empresa</Label>
            <Input type='text' disabled={this.state.modoEditar} name='nombre' id='nombre' placeholder='ENEE' value={this.state.nombre}
            onChange={e => this.setState({ nombre: e.target.value })}/>
          </FormGroup>
          <FormGroup>
            <Label for='director'>Nombre del director</Label>
            <Input type='text' name='director' id='director' placeholder='Juan Mauricio'   value={this.state.director}
            onChange={e => this.setState({ director: e.target.value })}/>
          </FormGroup>
          <FormGroup>
            <Label for='direccion'>Direccion de la empresa</Label>
            <Input type='text' name='direccion' id='direccion' placeholder='Col. Miramomtes 3 ave'  value={this.state.direccion}
            onChange={e => this.setState({ direccion: e.target.value })}/>
          </FormGroup>
          <FormGroup>
            <Label for='rubro'>Rubro</Label>
            <Input type='text' name='rubro' id='rubro' placeholder='Telecomunicaciones'  value={this.state.rubro}
            onChange={e => this.setState({ rubro: e.target.value })}/>
          </FormGroup>
          <FormGroup>
            <Label for='cfi'>CFI</Label>
            <Input type='text' name='cfi' id='cfi' placeholder='CFI'  value={this.state.cfi}
            onChange={e => this.setState({ cfi: e.target.value })}/>
          </FormGroup>
          <Button>Guardar</Button>
        </Form>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Empresa</TableCell>
                {/* <TableCell>Rubro</TableCell>
                <TableCell>Direccion</TableCell> */}
                <TableCell numeric>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empresas.map(({ nombre }) => (
                <TableRow key={nombre}>
                  <TableCell component='th' scope='row'>
                    {nombre}
                  </TableCell>
                  {/* <TableCell component='th' scope='row'>
                    {rubro}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {direccion}
                  </TableCell> */}
                  <TableCell numeric>
                    <IconButton aria-label='Edit' value={nombre}
                      onClick={() => {this.handleEditar(nombre);}}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label='Delete' value={nombre}
                      onClick={() => {this.handleEliminar(nombre);}}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

AdminEmpresas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminEmpresas);