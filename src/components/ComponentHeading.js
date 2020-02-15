import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#294c60',
        // backgroundColor: '#ededf4',
        color: 'white',
        padding: '6px 0px',
        fontSize: '18px'
      },
});

class ComponentHeading extends Component {
    render() {
        const { classes  } =  this.props
        var { color, styleColor, text } = this.props.data
        if(!color){
            color  = "white"
        }
        if(!styleColor){
            styleColor = null
        }
        return (
            <Typography  align="center" className={classes.root}>
                {text}
            </Typography>
        )
    }
}


export default withStyles(styles)(ComponentHeading);