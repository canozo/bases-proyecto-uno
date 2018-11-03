import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link, Switch } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import Pagina from './Pagina';
import Test from './Test';
import Home from './Home';
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
              Proyecto 1
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