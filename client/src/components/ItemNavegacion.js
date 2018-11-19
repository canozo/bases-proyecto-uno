import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import WorkIcon from '@material-ui/icons/Work';

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
      icon_name: props.icon_name,
      buttom_mode: props.buttom_mode === 'true',
    };
  }

  getIcon() {
    if (this.state.icon_name === 'mail') {
      return <MailIcon />;
    }

    if (this.state.icon_name === 'announcement') {
      return <AnnouncementIcon />;
    }

    if (this.state.icon_name === 'check') {
      return <CheckCircleIcon />;
    }

    if (this.state.icon_name === 'assign') {
      return <AssignmentIcon />;
    }

    if (this.state.icon_name === 'work') {
      return <WorkIcon />;
    }

    if (this.state.icon_name === 'none') {
      return <div />;
    }

    return <InboxIcon />;
  }

  render() {
    const { button_mode } = this.state;

    if (button_mode) {
      return (
        <ListItem button key={this.state.text}>
          <ListItemIcon>{this.getIcon()}</ListItemIcon>
          <ListItemText primary={this.state.text} />
        </ListItem>
      );
    } else {
      return (
        <ListItem key={this.state.text}>
          <ListItemIcon>{this.getIcon()}</ListItemIcon>
          <ListItemText primary={this.state.text} />
        </ListItem>
      );
    }
  }
}

ItemNavegacion.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ItemNavegacion);