import { useState, useRef, useEffect } from 'react'
import {
	Box,
	Button,
	Typography,
	Divider,
	makeStyles,
	IconButton,
	Grid,
	Collapse,
	MenuItem,
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloseIcon from '@material-ui/icons/Close'
import { Checkboxes, Select, TextField } from 'mui-rff'
import { useFormData } from '../../FormDataContext'

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

const FileSetUpPage = (props) => {
	const classes = useStyles()
	const { values, form } = props
	const localStorageSavedMaps = JSON.parse(localStorage.getItem('columnMapper'))
	const [selectedFiles, setSelectedFiles] = useState(null)
	const inputEl = useRef(null)
	const { setForm } = useFormData()

	useEffect(() => {
		if (values.useSavedMap && localStorageSavedMaps) {
			if (localStorageSavedMaps.length === 1) {
				form.mutators.setValue('savedMap', localStorageSavedMaps[0].name)
			}
		}
		if (values.useSavedMap === false) {
			form.mutators.setValue('savedMap', undefined)
		}
		// eslint-disable-next-line
	}, [values.useSavedMap])

	const onUploadFile = (event) => {
		const { files } = event.target
		const file = files[0]
		form.mutators.setValue('file', file)
		setForm(file)
		setSelectedFiles(file)
	}

	const onRemoveImage = () => {
		inputEl.current.value = ''
		form.mutators.setValue('file', undefined)
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
			<Box py={2}>
				<Divider />
			</Box>

			<Grid container spacing={2}>
				<Grid item xs={12}>
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
				</Grid>

				{localStorage.getItem('columnMapper') && (
					<Grid item xs={12}>
						<Checkboxes
							name="useSavedMap"
							formControlProps={{ margin: 'none' }}
							data={{ label: 'Use existing map?', value: true }}
						/>
						<Collapse in={Boolean(values.useSavedMap)}>
							<Box mt={2}>
								<Select
									name="savedMap"
									label="Select Saved Map"
									disabled={localStorageSavedMaps.length === 1}
									formControlProps={{ variant: 'outlined' }}>
									{localStorageSavedMaps.map((map) => {
										return (
											<MenuItem value={map.name} key={map.name}>
												{map.name}
											</MenuItem>
										)
									})}
								</Select>
							</Box>
						</Collapse>
					</Grid>
				)}

				<Grid item xs={12}>
					<Typography variant="body2" color="textSecondary">
						We assume that you are using a standard spreadsheet where your
						headings start on row 1 and your data on row 2. If this is not the
						case, set your mapping options bellow.
					</Typography>
					<Checkboxes
						name="showAdvancedOptions"
						formControlProps={{ margin: 'none' }}
						data={{ label: 'Show advanced mapping options', value: true }}
					/>

					{/* <Collapse in={true}> */}
					<Collapse in={Boolean(values.showAdvancedOptions)}>
						<Box pt={1}>
							<TextField
								label="Heading Row"
								name="headingRow"
								variant="outlined"
								required={true}
								size="small"
								type="number"
								InputProps={{ inputProps: { min: 1 } }}
							/>
							<Typography variant="body2" gutterBottom color="textSecondary">
								Which row has your column headings
							</Typography>
						</Box>
						<Box pt={1}>
							<TextField
								label="Starting Data Row"
								name="dataRow"
								variant="outlined"
								required={true}
								size="small"
								type="number"
								InputProps={{ inputProps: { min: 1 } }}
							/>
							<Typography variant="body2" gutterBottom color="textSecondary">
								Which row does your data start on
							</Typography>
						</Box>
					</Collapse>
				</Grid>
			</Grid>
		</Box>
	)
}

export default FileSetUpPage
