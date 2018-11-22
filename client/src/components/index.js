import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { Route, Link, Switch } from 'react-router-dom';
import ItemNavegacion from './ItemNavegacion';
import Home from './agencia/Home';
import Familiares from './persona/Familiares';
import Seleccion from './agencia/Seleccion';
import SolicitarEmpleo from './persona/SolicitarEmpleo';
import SolicitarPuestos from './empresa/SolicitarPuestos';
import AdminPuestos from './agencia/AdminPuestos';
import AdminPersonas from './persona/AdminPersonas';
import AdminEmpresas from './empresa/AdminEmpresas';
import AdminRequisitos from './agencia/AdminRequisitos';
import 'bootstrap/dist/css/bootstrap.min.css';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        {/* <Divider /> */}
        <List>
          {/* Navegacion para acciones de agencia */}
          <Divider />
          <ItemNavegacion
            text='Agencias'
            icon_name='none'
            button_mode='false'
          />
          <Link to='/'>
            <ItemNavegacion
              text='Home'
              icon_name='announcement'
            />
          </Link>
          <Link to='/seleccion'>
            <ItemNavegacion
              text='Seleccion'
              icon_name='check'
            />
          </Link>
          <Link to='/adminpuestos'>
            <ItemNavegacion
              text='Administrar puestos'
              icon_name='assign'
            />
          </Link>
          <Link to='/adminrequisitos'>
            <ItemNavegacion
              text='Administrar requisitos'
              icon_name='assign'
            />
          </Link>
        </List>
        <List>
          {/* Navegacion para acciones de empresas solicitantes */}
          <Divider />
          <ItemNavegacion
            text='Empresas'
            icon_name='none'
            button_mode='false'
          />
          <Link to='/adminempresas'>
            <ItemNavegacion
              text='Administrar empresas'
              icon_name='assign'
            />
          </Link>
          <Link to='/solicitarpuestos'>
            <ItemNavegacion
              text='Solicitar Puestos'
              icon_name='work'
            />
          </Link>
        </List>
        <List>
          {/* Navegacion para acciones de personas solicitantes */}
          <Divider />
          <ItemNavegacion
            text='Personas'
            icon_name='none'
            button_mode='false'
          />
          <Link to='/adminpersonas'>
            <ItemNavegacion
              text='Administrar personas'
              icon_name='assign person'
            />
          </Link>
          <Link to='/familiares'>
            <ItemNavegacion
              text='Ver familiares'
              icon_name='assign person'
            />
          </Link>
          <Link to='/solicitarempleo'>
            <ItemNavegacion
              text='Solicitar empleo'
              icon_name='work'
            />
          </Link>
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Proyecto I: TBDII
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {/* Switch de Direcciones */}
            <Route path="/" exact component={Home} />
            <Route path="/seleccion" exact component={Seleccion} />
            <Route path="/solicitarempleo" exact component={SolicitarEmpleo} />
            <Route path="/solicitarpuestos" exact component={SolicitarPuestos} />
            <Route path="/familiares" exact component={Familiares} />
            <Route path="/adminpuestos" exact component={AdminPuestos} />
            <Route path="/adminpersonas" exact component={AdminPersonas} />
            <Route path="/adminempresas" exact component={AdminEmpresas} />
            <Route path="/adminrequisitos" exact component={AdminRequisitos} />
            <Route render={() => <h3>Pagina no existe!</h3>} />
          </Switch>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
