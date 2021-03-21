import { useState } from 'react'
import {
	Box,
	Button,
	Typography,
	Divider,
	makeStyles,
	IconButton,
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
	input: {
		display: 'none',
	},
	button: {
		marginRight: theme.spacing(2),
	},
}))

export default function Upload() {
	const classes = useStyles()
	const [selectedFiles, setSelectedFiles] = useState(null)

	const onUploadFile = (event) => {
		setSelectedFiles(event.target.files)
	}

	const onRemoveImage = () => {
		setSelectedFiles(null)
	}

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Import data from a CSV file
			</Typography>
			<Typography gutterBottom>
				This tool allows you to import (or merge) product data to your store
				from a CSV file.
			</Typography>
			<Divider />
			<Box py={2}>
				<input
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					className={classes.input}
					id="contained-button-file"
					multiple
					type="file"
					onChange={onUploadFile}
				/>
				<label htmlFor="contained-button-file">
					<Button
						className={classes.button}
						component="span"
						color="primary"
						variant="outlined"
						startIcon={<CloudUploadIcon />}
						disableElevation>
						Upload
					</Button>
				</label>

				{selectedFiles && selectedFiles.length > 0 ? (
					<Typography component="span">
						{selectedFiles[0].name}{' '}
						<IconButton
							aria-label="delete"
							size="small"
							color="secondary"
							onClick={onRemoveImage}>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					</Typography>
				) : null}
			</Box>
		</Box>
	)
}
