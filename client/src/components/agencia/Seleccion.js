import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

// TODO En el proceso de seleccion se puede seleccionar ninguna, una o varias personas

class Seleccion extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      solicitudesPuestos: [],
    };
  }

  render() {
    const { solicitudesPuestos } = this.state;
    const { classes } = this.props;

    // mostrar todas las solicitudes de puestos de las empresas
    // para cada solicitud con plazas disponibles mostrar
    // el nombre de la empresa
    // el nombre del puesto
    // el puesto que se va a ocupar

    // luego mostrar cada uno de los empleados que aplico para esa solicitud de puesto mostrar
    // el nombre del empleado
    // grado academico de la persona
    // que cumple con todas las condiciones y requisitos
    // los deseos que se le pueden y no pueden otorar
    // boton de mandar su CV a la empresa

    // cuando se manda su CV a la empresa, se baja en uno las plazas

    // suponiendo que en una solicitud se guarda absolutamente toda la informacion necesaria
    return (
      <div>
        {/* {solicitudesPuestos.map(({ nombreEmpresa, nombrePuesto }) => (
          <Paper className={classes.root}>
            <Typography variant="h6" color="inherit" noWrap>
              Solicitud de {nombreEmpresa}, {nombrePuesto}
            </Typography>
          </Paper>
        ))} */}
      </div>
    );
  }
}

Seleccion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Seleccion);