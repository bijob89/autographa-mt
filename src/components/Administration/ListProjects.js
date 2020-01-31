import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, CardContent, Paper } from '@material-ui/core';
import apiUrl from '../GlobalUrl';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { displaySnackBar, selectProject } from '../../store/actions/sourceActions'
import { fetchProjects } from '../../store/actions/projectActions';
import { connect } from 'react-redux'
import PopUpMessages from '../PopUpMessages';
import MUIDataTable from "mui-datatables";


const accessToken = localStorage.getItem('accessToken')

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        // backgroundColor: '#ededf4',
        // minHeight: '100%'
    },
    cursorPointer: {
      cursor: 'pointer',
      backgroundColor: '#fff',
      '&:hover': {
          background: '#ededf4',
      },
    },
    cardHover: {
        backgroundColor: '#100f0ffa',
        '&:hover': {
            background: "#f00",
        },
    },
});

class ListProjects extends Component {
    state = {
        projectLists:[],
        columns: [
            {
                name: 'id',
                options: {    
                    display: false,
                    filter: false
                }
            },
            {
                name: 'Project Name',
                options: {
                    filter: true
                }
            },
            {
                name: 'Project Code',
                options: {
                    filter: true
                }
            },
            {
                name: 'Organisation',
                options: {
                    filter: true
                }
            },
            {
                name: 'Source',
                options: {
                    filter: true
                }
            }
        ]
    }

    async getProjectsList(){
        try{
            const { updateState } = this.props
            const data = await fetch(apiUrl + '/v1/autographamt/projects', {
                method:'GET',
                headers: {
                    "Authorization": 'bearer ' + accessToken
                }
            })
            const projectLists = await data.json()
            console.log('projects list', projectLists)
            this.setState({projectLists})
            // updateState({projectLists: projectLists})
        }
        catch(ex){
            this.props.displaySnackBar({
            snackBarMessage: "Server error",
            snackBarOpen: true,
            snackBarVariant: "error"
            })
        }
    }

    componentDidMount(){
        // this.getProjectsList()
        const { dispatch } = this.props;
        dispatch(fetchProjects());
    }

    handleProjects = (projectId) => {
        const { updateState, projectLists, selectProject } = this.props
        const project = projectLists.find(item => item.projectId === projectId)

        updateState({
            listUsersPane: false,
            listOrganisationsPane:false,
            createProjectsPane:false,
            listProjectsPane: false,
            assignmentsPane: true,
        })
        selectProject({
            project
        })
    }

    displayProjectCards(){
        const { classes } = this.props
        const { projectLists } = this.state
        if(projectLists){
            return projectLists.map(project => {
                return (
                    <Grid item xs={12} sm={6} md={3} key={project.projectId} style={{gridRowGap:'3px'}}>
                        <Card onClick={() => this.handleProjects(project.projectId)} className={classes.cursorPointer}>
                            <CardHeader
                                title={`Organisation: ${project.organisationName}`}
                                subheader={`Organisation: ${project.organisationName}`} />
                            <CardContent>
                                <Typography varian="h5" gutterBottom>
                                    {project.projectName.split(" ")[0]}
                                </Typography>
                                <Typography varian="h5" gutterBottom>
                                    {project.projectName.split(" ")[1]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })
        }
    }

    render() {
        const { classes, projects } = this.props;
        console.log('List projects', this.props);
        const { columns } = this.state;
        // const columns = ["Name", "Company", "City", "State"];
        const data = projects.map(project => {
            return [
                project.projectId, 
                project.projectName.split('|')[0], 
                project.projectName.split('|')[1], 
                project.organisationName, 
                project.version.name
            ]
        });
// const data = [
//  ["Joe James", "Test Corp", "Yonkers", ],
//  ["John Walsh", "Test Corp", "Hartford", ],
//  ["Bob Herm", "Test Corp", "Tampa", ],
//  ["James Houston", "Test Corp", "Dallas", ],
// ];



const options = {
  selectableRows: false,
};
        return (
        <div className={classes.root}>
            <PopUpMessages />
            <MUIDataTable 
                title={"Projects List"} 
                data={data} 
                columns={columns} 
                options={options} 
            />
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    projects: state.project.projects
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListProjects));
