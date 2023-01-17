import { AppBar, Toolbar, Typography, makeStyles, Button, Box, Link } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  heading: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  container: {
    '& > *:not(:first-child)': {
      marginLeft: theme.spacing(1),
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const handleReset = () => {
    localStorage.removeItem('columnMapper');
    history.push('/');
  };

  return (
    <>
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Box flexGrow={1}>
            <Typography
              className={classes.heading}
              variant="h6"
              color="inherit"
              noWrap
              component={RouterLink}
              to="/"
            >
              Column Mapping Example
            </Typography>
          </Box>

          <Button color="inherit" component={RouterLink} to="/demo">
            Basic Demo
          </Button>

          <Button color="inherit" component={RouterLink} to="/pricing">
            MultiPage Demo
          </Button>

          <Button color="inherit" component={Link} href="/templates/bulkProducts.xlsx">
            Download Template
          </Button>

          <Button color="secondary" variant="outlined" disableElevation onClick={handleReset}>
            Reset Demo's
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </>
  );
}
