import { makeStyles, Paper, Typography, Button, Grid, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Box>
      <Typography component="h1" variant="h4" align="center">
        Column Mapping Example
      </Typography>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/demo"
            >
              Demo Mapper
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/pricing"
            >
              Multi Page Mapper
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
