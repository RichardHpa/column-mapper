import { Grid, Box } from '@material-ui/core'
import { TextField, Checkboxes, Select } from 'mui-rff'

const FileSetUpPage = () => {
	return (
		<Box>
			<TextField
				label="First Name"
				name="firstName"
				margin="none"
				variant="outlined"
				required={true}
			/>
		</Box>
	)
}

export default FileSetUpPage
