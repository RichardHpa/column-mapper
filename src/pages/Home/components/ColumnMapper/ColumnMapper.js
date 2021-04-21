import React, { useEffect, useState } from 'react'
import {
	Box,
	Typography,
	Divider,
	makeStyles,
	Button,
	Collapse,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableFooter,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	FormControlLabel,
	TextField,
	TableHead,
} from '@material-ui/core'
import XLSX from 'xlsx'

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))

function allTrue(obj) {
	// for (var o in obj) if (!obj[o]) return false
	for (var o in obj) {
		if (obj[o].index < 0) return false
	}

	return true
}

export default function ColumnMapper(props) {
	const { data, goBack, startingColumn, requiredColumns, currentMap } = props
	const [headingColumns, setHeadingColumns] = useState([])
	const classes = useStyles()
	const [saveMapping, setSaveMapping] = useState(false)
	const [mapping, setMapping] = useState()

	useEffect(() => {
		if (data && currentMap) {
			const reader = new FileReader()
			const rABS = !!reader.readAsBinaryString
			reader.onload = ({ target: { result } }) => {
				const wb = XLSX.read(result, { type: rABS ? 'binary' : 'array' })
				const wsname = wb.SheetNames[0]
				const ws = wb.Sheets[wsname]
				const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 })
				setHeadingColumns(jsonData[currentMap.headingRow - 1])
			}
			if (rABS) reader.readAsBinaryString(data)
			else reader.readAsArrayBuffer(data)
		}
	}, [data, currentMap])

	useEffect(() => {
		if (requiredColumns && headingColumns.length > 0) {
			const obj = {}
			for (const key of requiredColumns) {
				const col = key.toLowerCase()
				const lowerCaseCols = headingColumns.map(function (value) {
					return value.toLowerCase()
				})
				const found = lowerCaseCols.indexOf(col.toLowerCase())
				obj[key] = {
					header: found > 0 ? col : undefined,
					index: found,
				}
			}
			setMapping(obj)
		}
	}, [requiredColumns, headingColumns])

	const handleSaveMapping = () => {
		setSaveMapping(!saveMapping)
	}

	const handleChangeMapping = (dbCol, shCol) => {
		const lowerCaseCols = headingColumns.map(function (value) {
			return value.toLowerCase()
		})

		const newMapping = {
			...mapping,
			[dbCol]: {
				header: shCol,
				index: lowerCaseCols.indexOf(shCol.toLowerCase()),
			},
		}

		setMapping(newMapping)
	}

	console.log(mapping)

	const readyForPreview = allTrue(mapping)

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Map your Columns
			</Typography>
			<Box py={2}>
				<Divider />
			</Box>
			<Collapse in={Boolean(mapping)}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Required Column</TableCell>
							<TableCell>Select Column</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{requiredColumns.map((column) => {
							return (
								<Row
									key={column}
									rowLabel={column}
									columns={headingColumns}
									changeMapping={handleChangeMapping}
								/>
							)
						})}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={!saveMapping ? 2 : 1}>
								<FormControlLabel
									checked={saveMapping}
									onChange={handleSaveMapping}
									control={<Checkbox name="checkedA" />}
									label="Save Mapping"
								/>
							</TableCell>
							{saveMapping && (
								<TableCell>
									<TextField
										label="Mapping Name"
										variant="outlined"
										fullWidth
										size="small"
									/>
								</TableCell>
							)}
						</TableRow>
					</TableFooter>
				</Table>
			</Collapse>
			<Box
				pt={2}
				display="flex"
				justifyContent="space-between"
				className={classes.buttonContainer}>
				<Button variant="contained" disableElevation onClick={goBack}>
					Back
				</Button>
				<Button
					variant="contained"
					disableElevation
					color="primary"
					disabled={!readyForPreview}>
					Show Preview
				</Button>
			</Box>
		</Box>
	)
}

const Row = (props) => {
	const { rowLabel, columns, changeMapping } = props
	const [matchedColumn, setMatchedColumn] = useState('')

	useEffect(() => {
		if (rowLabel && columns) {
			const lowerCaseCols = columns.map(function (value) {
				return value.toLowerCase()
			})
			if (lowerCaseCols.includes(rowLabel.toLowerCase())) {
				setMatchedColumn(rowLabel.toLowerCase())
			}
		}
	}, [rowLabel, columns])

	const handleChange = (event) => {
		setMatchedColumn(event.target.value)
		if (changeMapping) {
			changeMapping(rowLabel, event.target.value)
		}
	}

	return (
		<TableRow>
			<TableCell>{rowLabel}</TableCell>
			<TableCell>
				<FormControl variant="outlined" fullWidth>
					<InputLabel id="select-column-label">Select Column</InputLabel>
					<Select
						labelId="select-column-label"
						value={matchedColumn}
						onChange={handleChange}
						label="Select Column">
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{columns.map((col) => {
							return (
								<MenuItem value={col.toLowerCase()} key={`${rowLabel}-${col}`}>
									{col}
								</MenuItem>
							)
						})}
					</Select>
				</FormControl>
			</TableCell>
		</TableRow>
	)
}
