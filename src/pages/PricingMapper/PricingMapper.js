import { makeStyles, Paper, Typography, Box } from '@material-ui/core';
import ColumnMapper from 'components/ColumnMapper';
import { WizardPage } from 'components/ColumnMapper/components/MapperWizard';

const basicCols = [
  { key: 'productId', label: 'Product Id', required: true },
  { key: 'name', label: 'Name', required: true },
  { key: 'description', label: 'Description', required: true },
  { key: 'rating', label: 'Rating' },
];

const pricesCols = [
  { key: 'price', label: 'Price', required: true },
  { key: 'salePrice', label: 'Sale Price', required: true },
];

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

const PricingMapper = () => {
  const classes = useStyles();
  return (
    <Box>
      <Typography component="h1" variant="h4" align="center">
        Pricing Mapper Example
      </Typography>
      <Paper className={classes.paper}>
        <ColumnMapper>
          <WizardPage columns={basicCols} label="Map Product Data" />

          <WizardPage columns={pricesCols} label="Pricing Data" />
        </ColumnMapper>
      </Paper>
    </Box>
  );
};

export default PricingMapper;
