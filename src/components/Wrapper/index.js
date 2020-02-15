import React from 'react';
import jwt_decode from 'jwt-decode';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Header from '../Header';
import { Component } from 'react';
import Drawer from './Drawer';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';

// import HomePage from '../HomePage'
import DownloadDraft from '../DownloadDraft';
import ViewSources from '../ViewSources';
import UserDashboard from '../Users/UserDashboard';
import ListProjects from '../Administration/ListProjects';
import ListOrganisations from '../Administration/ListOrganisations';
import HomePage from '../Translations/HomePage';
import ListUsers from '../Administration/ListUsers';
import { connect } from 'react-redux';
import { validateAccessToken } from '../../store/actions/authActions';
import AssignUser from '../Assignments/AssignUser';
import MyProjects from '../Translations/MyProjects';
// import ProjectStatistics from '../Reports/ProjectStatistics'

export const PrivateRoute = ({ component: Component, location, ...rest }) => (
    <Route
        // {...rest}
        render={props => localStorage.getItem('accessToken')
            ? (
                <Component {...props} {...rest} />
            )
            : (<Redirect to={{
                pathname: "/",
                state: { from: props.location }
            }}
            />
            )
        }
    />
)

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        // backgroundColor: '#ededf4',
        backgroundColor: '#f2f2f2ab'
    },
    exp: {
        backgroundColor: '#100f0ffa',
        '&:hover': {
            background: "#f00",
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#262f3d'
    },
    content: {
        flexGrow: 1,
        minHeight: '100vh'
        // padding: theme.spacing(1),
    },
    toolbar: theme.mixins.toolbar,
});

class Wrapper extends Component {
    state = {}
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(validateAccessToken());
    }

    render() {
        const { classes } = this.props;
        console.log('Wrapper', this.props);
        return (
            <BrowserRouter>
            <div className={classes.root}>
                {/* <CssBaseline /> */}
                <AppBar position="fixed" className={classes.appBar}>
                    <Header />
                </AppBar>
                <Drawer classes={classes}  />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    
                        <Switch>
                            {/* <Route path="/signin" component={() => <LoginPage />} /> */}
                            {/* <Route path="/signup" component={() => <SignUp />} /> */}
                            {/* <Route exact path="/app" component={() => <HomePage />} /> */}
                            <PrivateRoute exact path="/user/dashboard" component={() => <UserDashboard />} />
                            {/* <PrivateRoute path="/dashboard" component={() => <AdminPage />} /> */}
                            <PrivateRoute path="/download" component={() => <DownloadDraft />} />
                            <PrivateRoute path="/app/viewsources" component={() => <ViewSources />} />
                            <PrivateRoute exact path="/app/projects" component={() => <ListProjects />} />
                            <PrivateRoute path="/app/users" component={() => <ListUsers />} />
                            <PrivateRoute path="/app/organisations" component={() => <ListOrganisations />} />
                            <PrivateRoute path="/app/projects/:id" location={this.props.location} component={() => <AssignUser />} />
                            <PrivateRoute path="/app/translations/projects/:id" component={() => <HomePage />} />
                            <PrivateRoute exact path="/app/translations/projects" component={() => <MyProjects />} />
                            <PrivateRoute exact path="/app/translations/download" component={() => <DownloadDraft />} />
                        </Switch>
                    {/* </BrowserRouter> */}
                </main>
            </div>
            </BrowserRouter>
        );
    }
}

// Wrapper.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
    current_user: state.auth.current_user
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Wrapper))