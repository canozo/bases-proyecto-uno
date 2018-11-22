import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

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

class AdminPuestos extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.submitState = this.submitState.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectDropdown = this.selectDropdown.bind(this);
    this.cargarPuestos = this.cargarPuestos.bind(this);
    this.handleEditar = this.handleEditar.bind(this);
    this.handleEliminar = this.handleEliminar.bind(this);

    this.state = {
      puestos: [],
      modoEditar: false,
      tipoPuesto: '',
      dropdownOpen: false,
      selectedName: 'Ninguno',
      selectedValue: 'Ninguno',
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

        // TODO ver como cargar padres
        let puestos = [];
        for (let key in res)
          puestos.push({ name: key, value: key });

        this.setState({
          puestos: puestos || [],
        });
      })
        .catch((error) => {
      });
  }

  componentDidMount() {
    this.cargarPuestos();
  }

  handleEditar(value) {
    this.setState({ modoEditar: true });
    fetch(`/puestos/${value}`, {
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
          tipoPuesto: value,
          selectedName: res.padre,
          selectedValue: res.padre,
        });
      })
        .catch((error) => {
      });
  }

  handleEliminar(value) {
    this.setState({ modoEditar: false });
    fetch(`/puestos/${value}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta
        this.cargarPuestos();
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
    this.setState({ modoEditar: false });
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
        this.cargarPuestos();
        this.setState({
          tipoPuesto: '',
          selectedValue: '0',
        });
      });
  }

  render() {
    const { puestos } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Form onSubmit={this.submitState}>
          <FormGroup>
            <Label for="tipoPuesto">Tipo de Puesto</Label>
            <Input type="text" disabled={this.state.modoEditar} name="tipoPuesto" id="tipoPuesto" value={this.state.tipoPuesto} placeholder="Programador WEB"
            onChange={e => this.setState({ tipoPuesto: e.target.value })}/>
          </FormGroup>
          <FormGroup>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>
                {this.state.selectedName}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem key='Ninguno' value='Ninguno' onClick={this.selectDropdown}>Ninguno</DropdownItem>

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

        {/* Listado de puestos */}
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Puesto</TableCell>
              <TableCell numeric>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {puestos.map(({ name, value }) => (
              <TableRow key={value}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell numeric>
                  <IconButton aria-label="Edit" value={value}
                    onClick={() => {this.handleEditar(value);}}>
                      <EditIcon />
                  </IconButton>
                  <IconButton aria-label="Delete" value={value}
                    onClick={() => {this.handleEliminar(value);}}>
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

AdminPuestos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPuestos);