import React from "react";
import {Grid, Paper} from "@mui/material";

const LoginContainer: React.FunctionComponent = ({children}) => {
    return (
        <Grid container
              alignContent="center"
              justifyContent="center"
              direction="column"
              display={"flex"}
              sx={{height: "100%"}}>
            <Grid item container
                  direction={"row"}
                  alignContent="center"
                  justifyContent="center"
                  xs={8}>
                <Paper component={Grid}
                       justifyContent={"center"}
                       direction={"column"}
                       container
                       item
                       elevation={5}
                       xs={3}
                       sx={{padding: 2}}>
                    {children}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginContainer;