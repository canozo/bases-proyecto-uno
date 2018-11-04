import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link, Switch } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import Pagina from './Pagina';
import Test from './Test';
import Home from './Home';
import Seleccion from './Seleccion';
import SolicitarPuesto from './SolicitarPuesto';
import SolicitarEmpleo from './SolicitarEmpleo';
import AdminPuestos from './AdminPuestos';
import AdminEmpleos from './AdminEmpleos';
import AdminPersonas from './AdminPersonas';
import AdminEmpresas from './AdminEmpresas';
import AdminRequisitos from './AdminRequisitos';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Toolbar, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
  }

  // import AdminRequisitos from './AdminRequisitos';

  render() {
    const topbarButtons = (
      <div>
        <Link to="/" color="inherit">
          <Button style={{ color: '#fff' }} >Home</Button>
        </Link>
        <Link to="/pagina">
          <Button style={{ color: '#fff' }} >Pagina</Button>
        </Link>
        <Link to="/test">
          <Button style={{ color: '#fff' }} >Test</Button>
        </Link>
        <Link to="/seleccion">
          <Button style={{ color: '#fff' }} >Seleccion</Button>
        </Link>
        <Link to="/solicitarpuesto">
          <Button style={{ color: '#fff' }} >Solicitar Puesto</Button>
        </Link>
        <Link to="/solicitarempleo">
          <Button style={{ color: '#fff' }} >Solicitar Empleo</Button>
        </Link>
        <Link to="/adminpuestos">
          <Button style={{ color: '#fff' }} >Administrar Puestos</Button>
        </Link>
        <Link to="/adminempleos">
          <Button style={{ color: '#fff' }} >Administrar Empleos</Button>
        </Link>
        <Link to="/adminpersonas">
          <Button style={{ color: '#fff' }} >Administrar Personas</Button>
        </Link>
        <Link to="/adminempresas">
          <Button style={{ color: '#fff' }} >Administrar Empresas</Button>
        </Link>
        <Link to="/adminrequisitos">
          <Button style={{ color: '#fff' }} >Administrar Requisitos</Button>
        </Link>
      </div>
    );

    return (
      <div className={this.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={this.classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={this.classes.flex}>
              Proyecto
            </Typography>
            {topbarButtons}
          </Toolbar>
        </AppBar>

        <br/>
        <br/>
        <div className="container-fluid justify-content-center d-flex mt-12">
          <div >
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/pagina" exact component={Pagina} />
              <Route path="/test" exact component={Test} />
              <Route path="/seleccion" exact component={Seleccion} />
              <Route path="/solicitarpuesto" exact component={SolicitarPuesto} />
              <Route path="/solicitarempleo" exact component={SolicitarEmpleo} />
              <Route path="/adminpuestos" exact component={AdminPuestos} />
              <Route path="/adminempleos" exact component={AdminEmpleos} />
              <Route path="/adminpersonas" exact component={AdminPersonas} />
              <Route path="/adminempresas" exact component={AdminEmpresas} />
              <Route path="/adminrequisitos" exact component={AdminRequisitos} />
              <Route render={() => <h3>Pagina no existe!</h3>} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);