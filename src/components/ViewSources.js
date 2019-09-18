import React, { Component } from 'react'
import jwt_decode from 'jwt-decode';
import {
    Grid,
    Paper,
    Button,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Divider,
    Link,
    Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Header from './Header';
import UploadTexts from './UploadTexts';
import apiUrl from './GlobalUrl';
import { withStyles } from '@material-ui/core/styles';
import ComponentHeading from './ComponentHeading';
import { uploadDialog } from '../store/actions/dialogActions';
import { connect } from 'react-redux'
import CreateSources from './CreateSources';
import { displaySnackBar } from '../store/actions/sourceActions';
import PopUpMessages from './PopUpMessages';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflowY: 'hidden'
    },
    versionDisplay: {
        maxHeight: '80vh',
        overflow: 'auto',
        // backgroundColor:'red',
        // marginLeft: '1%',
        // marginTop: '1%'
    },
    cursorPointer: {
        margin: 10,
        cursor: 'pointer',
    },
    bookCard: {
        width: '400px'
    }
});

class ViewSources extends Component {
    state = {
        biblesDetails: [],
        dialogOpen: false,
        sourceId: '',
        decoded: {},
        accessToken: '',
        availableBooksData: [],
        listBooks: false,
    }

    closeDialog = () => {
        this.setState({ dialogOpen: false })
    }

    async getBiblesData() {
        const data = await fetch(apiUrl + 'v1/bibles', {
            method: 'GET'
        })
        const biblesDetails = await data.json()
        this.setState({ biblesDetails })
    }

    componentDidMount() {
        this.getBiblesData()
        var { accessToken } = this.props
        if (accessToken) {
            this.setState({ decoded: jwt_decode(accessToken), accessToken })
        }
    }

    async getBooks() {
        try {
            const { sourceId } = this.state
            // console.log(sourceId)
            const data = await fetch(apiUrl + 'v1/sources/books/' + sourceId, {
                method: 'GET',
                headers: {
                    Authorization: 'bearer ' + this.props.accessToken
                }
            })
            const response = await data.json()
            console.log(response)
            if ("success" in response) {

                this.props.displaySnackBar({
                    snackBarMessage: response.message,
                    snackBarOpen: true,
                    snackBarVariant: "error"
                })
            } else {

                this.setState({
                    listBooks: true,
                    availableBooksData: response,
                })
                this.props.displaySnackBar({
                    snackBarMessage: "Books Fetched",
                    snackBarOpen: true,
                    snackBarVariant: "success"
                })
            }
        }
        catch (ex) {
            this.props.displaySnackBar({
                snackBarMessage: "Get books Server Error",
                snackBarOpen: true,
                snackBarVariant: "error"
            })

        }
    }

    displayBooks = () => {
        const { availableBooksData } = this.state
        return availableBooksData.map(book => {
            return (
                <Grid item xs={2} key={book} >
                    <Typography>{book}</Typography>
                </Grid>
            )
        })
    }


    closeBookListing = () => {
        this.setState({ userId: '', projectId: '', listBooks: false })
    }

    handleSelect = (sourceId) => (e) => {
        this.setState({ dialogOpen: true, sourceId })
    }

    handleBookSelect = (sourceId) => (e) => {
        this.setState({ listBooks: true, sourceId }, () => this.getBooks())
    }
    render() {
        const { classes } = this.props
        return (
            <Grid item xs={12} md={12} container justify="center" className={classes.root}>
                <Header />
                <Grid item>
                    {
                        (this.state.decoded && this.state.decoded.role !== 'm') ? (
                            <Grid container justify="flex-end">
                                <Link className={classes.cursorPointer} variant="body2" onClick={() => this.props.uploadDialog({ uploadPane: true })}>
                                    {"Can't find source from the listed? Create new."}
                                </Link>
                            </Grid>
                        ) : null
                    }
                    <CreateSources />

                </Grid>
                {/* <Link onClick={this.createSourceDialog}>Can't find source from the listed? Create new.</Link> */}
                <Grid item xs={11}  >
                    <PopUpMessages />
                    <Paper className={classes.versionDisplay}>
                        <ComponentHeading data={{ text: "View Sources", styleColor: '#2a2a2fbd' }} />
                        <Divider />
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Version Name</TableCell>
                                    <TableCell align="left">Version Code</TableCell>
                                    <TableCell align="left">Version Long Name</TableCell>
                                    <TableCell align="left">Updated Date</TableCell>
                                    <TableCell align="left">Script</TableCell>
                                    <TableCell align="left">Language Name</TableCell>
                                    <TableCell align="left">Language Code</TableCell>
                                    {
                                        (this.state.decoded && this.state.decoded.role !== 'm') ? (
                                            <TableCell align="left">Books</TableCell>
                                        ) : null
                                    }
                                    {
                                        (this.state.decoded && this.state.decoded.role !== 'm') ? (
                                            <TableCell align="left">Action</TableCell>
                                        ) : null
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.biblesDetails.map(items => (
                                    items["languageVersions"].map(row => (
                                        <TableRow key={row.sourceId}>
                                            <TableCell align="left">{row.version.name}</TableCell>
                                            <TableCell align="left">{row.version.code}</TableCell>
                                            <TableCell align="left">{row.version.longName}</TableCell>
                                            <TableCell align="left">{row.updatedDate}</TableCell>
                                            <TableCell align="left">{row.script}</TableCell>
                                            <TableCell align="left">{row.language.name}</TableCell>
                                            <TableCell align="left">{row.language.code}</TableCell>
                                            {
                                                (this.state.decoded && this.state.decoded.role !== 'm') ? (

                                                    <TableCell align="left">
                                                        <Button size="small" variant="contained" color="primary" onClick={this.handleBookSelect(row.sourceId)}>Books</Button>
                                                    </TableCell>
                                                ) : null
                                            }
                                            {
                                                (this.state.decoded && this.state.decoded.role !== 'm') ? (
                                                    <TableCell align="left">
                                                        <Button size="small" variant="contained" color="primary" onClick={this.handleSelect(row.sourceId)}>Upload</Button>
                                                    </TableCell>
                                                ) : null
                                            }
                                        </TableRow>

                                    ))
                                ))}
                            </TableBody>
                        </Table>
                        <Dialog
                            open={this.state.listBooks}
                        >
                            <DialogContent>
                                <Grid container item className={this.props.classes.bookCard}>
                                    {this.displayBooks()}
                                </Grid>


                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.closeBookListing} variant="contained" color="secondary">Close</Button>
                            </DialogActions>
                        </Dialog>
                        <UploadTexts sourceId={this.state.sourceId} dialogOpen={this.state.dialogOpen} close={this.closeDialog} />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadDialog: (status) => dispatch(uploadDialog(status)),
        displaySnackBar: (popUp) => dispatch(displaySnackBar(popUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ViewSources));