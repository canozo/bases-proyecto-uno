import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormGroup, Input, Label } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  title: {
    paddingTop: '20px',
    paddingBottom: '10px',
    paddingLeft: '20px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  root_table: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
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

class SolicitarEmpleo extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.cargarPersonas = this.cargarPersonas.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      idPersona: '',
      personas: [],
      familiares: [],
    };
  }

  cargarPersonas() {
    fetch('/personas', {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let personas = [];
        for (let key in res)
          personas.push({ id: key, nombre: res[key] });

          this.setState({
            personas: personas || [],
        });
      })
        .catch((error) => {
      });
  }

  cargarFamiliares(idPersona) {
    fetch(`/personas/familiares/info/${idPersona}`, {
    // fetch(`/personas/familiares/${idPersona}`, {
      method: 'get',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        // logica de respuesta

        let familiares = [];
        console.log(res);
        for (let key in res)
          familiares.push({ id: res[key] });

          this.setState({
            familiares: familiares || [],
        });
      })
        .catch((error) => {
      });
  }

  componentDidMount() {
    this.cargarPersonas();
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });

    if (event.target.id === 'idPersona') {
      this.cargarFamiliares(event.target.value);
    }
  }

  render() {
    const { classes } = this.props;
    const { personas, familiares } = this.state;

    return (
      <div>
        <FormGroup>
          <Label>Persona:</Label>
            <Input
              type='select'
              id='idPersona'
              value={this.state.idPersona}
              onChange={this.handleChange}>
              <option value=''/>
              {personas.map(({ id, nombre }) => (
                <option key={id} value={id}>{nombre}</option>
              ))}
            </Input>
        </FormGroup>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Id Familiar</TableCell>
                {/* <TableCell>Nombre</TableCell>
                <TableCell>A</TableCell>
                <TableCell>B</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
            {familiares.map(({ id }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                  {solicitante}
                </TableCell>
                <TableCell component="th" scope="row">
                  {deseos}
                </TableCell>
                <TableCell component="th" scope="row">
                  {condiciones}
                </TableCell> */}
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

SolicitarEmpleo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SolicitarEmpleo);
