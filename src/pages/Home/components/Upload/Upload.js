import { useState, useRef, useEffect } from 'react'
import {
	Box,
	Button,
	Typography,
	Divider,
	makeStyles,
	IconButton,
	TextField,
	Grid,
	Collapse,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
	input: {
		display: 'none',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
}))

export default function Upload(props) {
	const classes = useStyles()
	const { onUpload, file, startMappingOptions, setMappingOptions } = props
	const [selectedFiles, setSelectedFiles] = useState(null)
	// const [startingColumn, setStartingColumn] = useState(1)
	const inputEl = useRef(null)
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

	useEffect(() => {
		setSelectedFiles(file)
	}, [file])

	const onUploadFile = (event) => {
		const { files } = event.target
		const file = files[0]
		setSelectedFiles(file)
	}

	const onRemoveImage = () => {
		inputEl.current.value = ''
		setSelectedFiles(null)
	}

	const handleOnChange = (e) => {
		const { name, value } = e.target
		const parsedInt = Math.abs(value)
		if (parsedInt) {
			setMappingOptions(name, parsedInt)
		}

		return null
	}

	const handleUpload = () => {
		if (onUpload) {
			onUpload(selectedFiles)
			// onUpload({
			// 	file: selectedFiles,
			// 	// startingColumn: startingColumn,
			// })
		}
	}

	const disabled = Boolean(!selectedFiles)

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Import data from a CSV file
			</Typography>
			<Typography gutterBottom>
				This tool allows you to import (or merge) product data to your store
				from a CSV file.
			</Typography>

			<Box py={2}>
				<Divider />
			</Box>

			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box display="flex" justifyContent="space-between">
						<Box>
							<input
								accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
								className={classes.input}
								id="contained-button-file"
								multiple
								type="file"
								onChange={onUploadFile}
								ref={inputEl}
							/>
							<label htmlFor="contained-button-file">
								<Button
									className={classes.button}
									component="span"
									color="primary"
									variant="outlined"
									startIcon={<CloudUploadIcon />}
									disableElevation>
									Select File
								</Button>
							</label>

							{selectedFiles ? (
								<Typography component="span">
									{selectedFiles.name}{' '}
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
						<Button
							variant="contained"
							color="primary"
							disableElevation
							disabled={disabled}
							onClick={handleUpload}>
							Upload File
						</Button>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body2" color="textSecondary">
						We assume that you are using a standard spreadsheet where your
						headings start on row 1 and your data on row 2. If this is not the
						case, set your mapping options bellow.
					</Typography>
					<FormControlLabel
						checked={showAdvancedOptions}
						onChange={() => {
							setShowAdvancedOptions(!showAdvancedOptions)
						}}
						control={<Checkbox name="checkedA" />}
						label="Show Advanced Mapping options"
					/>
					<Collapse in={showAdvancedOptions}>
						<Box pt={1}>
							<TextField
								variant="outlined"
								size="small"
								id="headingRow"
								name="headingRow"
								label="Heading Row"
								fullWidth
								// value={startingColumn}
								value={startMappingOptions.headingRow}
								onChange={handleOnChange}
								type="number"
								InputProps={{ inputProps: { min: 1 } }}
							/>
							<Typography variant="body2" gutterBottom color="textSecondary">
								Which row has your column headings
							</Typography>
						</Box>
						<Box pt={1}>
							<TextField
								variant="outlined"
								size="small"
								id="dataRow"
								name="dataRow"
								label="Starting Data Row"
								fullWidth
								// value={startingColumn}
								value={startMappingOptions.dataRow}
								onChange={handleOnChange}
								type="number"
								InputProps={{ inputProps: { min: 1 } }}
							/>
							<Typography variant="body2" gutterBottom color="textSecondary">
								Which row does your data start on
							</Typography>
						</Box>
						<Box pt={1}>
							<TextField
								variant="outlined"
								size="small"
								id="startColumn"
								name="startColumn"
								label="Starting Column"
								fullWidth
								// value={startingColumn}
								value={startMappingOptions.startColumn}
								onChange={handleOnChange}
								type="number"
								InputProps={{ inputProps: { min: 1 } }}
							/>
							<Typography variant="body2" gutterBottom color="textSecondary">
								Which Column does your data start on (number not the letter)
							</Typography>
						</Box>
					</Collapse>
				</Grid>
			</Grid>

			{/* <div className={classes.buttonContainer}>

			</div> */}
		</Box>
	)
}
