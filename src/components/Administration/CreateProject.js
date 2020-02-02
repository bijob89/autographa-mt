import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { fetchBibleLanguages, fetchAllLanguages } from '../../store/actions/sourceActions';

const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

class CreateProject extends Component {
    state = {
        form: {}
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchBibleLanguages());
        dispatch(fetchAllLanguages());
    }

    displayLanguage = () => {
        const { bibleLanguages } = this.props
        return bibleLanguages.map(lang => {
            const langObj = lang.languageVersions[0]
            return (
                <MenuItem key={langObj.language.id} value={langObj.language.id}>{langObj.language.name}</MenuItem>
            )
        })
        // const { }
    }
    render() {
        const { form } = this.state;
        const { classes, open, close } = this.props;
        console.log('Create Project', this.props)
        return (
            <Dialog onClose={close} aria-labelledby="customized-dialog-title" open={open}
            fullWidth={true}
            maxWidth={'sm'}>
                <DialogTitle id="customized-dialog-title" onClose={close}>
                <Typography variant="h6">Create project</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={close}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-language">Language</InputLabel>
                                <Select className={classes.selectMenu}
                                    inputProps={{
                                        id: 'select-language'
                                    }}
                                    value={form.language}
                                    // onChange={(e) => this.setState({
                                    //     language: e.target.value,
                                    //     version: '',
                                    //     targetLanguage: ''
                                    // })
                                    // }
                                    >
                                    {this.displayLanguage()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={close} color="secondary" size={"small"} variant={'contained'}>
                        Close
                    </Button>
                    <Button autoFocus onClick={close} color="primary" size={"small"} variant={'contained'}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    projects: state.project.projects,
    isFetching: state.project.isFetching,
    bibleLanguages: state.sources.bibleLanguages,
    allLanguages: state.sources.allLanguages
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateProject));
