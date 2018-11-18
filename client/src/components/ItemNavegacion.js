import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
  ItemNavegacionBar: {
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

class ItemNavegacion extends React.Component {
  constructor(props) {
    super(props);

    this.getIcon = this.getIcon.bind(this);

    this.state = {
      text: props.text,
      icon_name: props.icon_name
    };
  }

  getIcon() {
    if (this.state.icon_name === 'mail') {
      return <MailIcon />;
    } else {
      return <InboxIcon />;
    }
  }

  render() {
    return (
      <ListItem button key={this.state.text}>
        <ListItemIcon>{this.getIcon()}</ListItemIcon>
        <ListItemText primary={this.state.text} />
      </ListItem>
    );
  }
}

ItemNavegacion.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ItemNavegacion);