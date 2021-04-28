import { useEffect, useState } from 'react'
import {
	makeStyles,
	Paper,
	Typography,
	Box,
	Collapse,
	Divider,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	MenuItem,
	CircularProgress,
} from '@material-ui/core'
import { Select } from 'mui-rff'
import ColumnMapper from 'components/ColumnMapper'
import { useRapidService } from '../../services/RapidService'
import { useQuery } from 'react-query'
import { useFormData } from 'components/ColumnMapper/FormDataContext'

const useStyles = makeStyles((theme) => ({
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
	requiredColumn: {
		width: '40%',
	},
	selectColumn: {
		width: '60%',
	},
}))

const RapidMapper = () => {
	const classes = useStyles()
	const RapidService = useRapidService()
	const [tabs, setTabs] = useState([])
	const [retailer, setRetailer] = useState(null)

	const { isLoading, data } = useQuery(
		`tabs-${retailer}`,
		() => {
			return RapidService.getTabs(retailer).then((res) => {
				const keys = Object.keys(res)
				const filtered = keys.filter(function (key) {
					return res[key]
				})
				return filtered
			})
		},
		{ enabled: Boolean(retailer) }
	)

	useEffect(() => {
		if (data) {
			setTabs(data)
		}
	}, [data])

	const handleSetTabs = (x) => {
		setTabs(x)
	}

	const handleChange = (event) => {
		setRetailer(event.target.value)
	}

	return (
		<Box>
			<Typography component="h1" variant="h4" align="center">
				Rapid Column Mapping Example
			</Typography>
			<Paper className={classes.paper}>
				<FormControl
					component="fieldset"
					// disabled={Boolean(data)}
				>
					<FormLabel component="legend">Select Retailer</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="retailer"
						value={retailer}
						onChange={handleChange}>
						<FormControlLabel
							value="Foodstuffs"
							control={<Radio />}
							label="Foodstuffs"
						/>
						<FormControlLabel
							value="Woolworths"
							control={<Radio />}
							label="Countdown"
						/>
					</RadioGroup>
				</FormControl>
				{isLoading && (
					<Box display="flex" justifyContent="center" alignContent="center">
						<CircularProgress />
					</Box>
				)}

				<Collapse in={tabs.length > 0}>
					{tabs.length > 0 && (
						<ColumnMapper initialValues={{ retailer }}>
							{tabs.map((tab) => (
								<RapidPage key={tab} label={tab} />
							))}
						</ColumnMapper>
					)}
				</Collapse>
			</Paper>
		</Box>
	)
}

export default RapidMapper

const RapidPage = (props) => {
	const { children, values, form, label } = props
	const { getState } = form
	const RapidService = useRapidService()
	const { formData } = useFormData()
	const classes = useStyles()
	const [columnsReady, setColumnsReady] = useState(false)

	const { isLoading, data: tabData } = useQuery(
		`tab-${getState().values.retailer}-${label}`,
		() => {
			return RapidService.getTabColumns(getState().values.retailer, label).then(
				(res) => {
					return res
				}
			)
		}
	)

	useEffect(() => {
		if (formData.length && tabData) {
			const obj = {}
			const headingRow = formData[values.headingRow - 1].map(function (value) {
				return value.toLowerCase()
			})
			console.log('heading row')
			console.log(headingRow)

			Object.keys(tabData).map((columnName) => {
				const col = tabData[columnName]
				console.log(col)
				const key = col.Name
				const label = col.DisplayName || key
				const found = headingRow.indexOf(label.toLowerCase())
				if (found !== -1 && values.map[key] === undefined) {
					obj[key] = {
						sheetHeading: label.toLowerCase(),
						sheetIndex: found,
					}
				}
			})
			form.mutators.setValue('map', {
				...obj,
				...values.map,
			})
			setColumnsReady(true)
		}
		// eslint-disable-next-line
	}, [tabData])

	const handleChangeSelect = (name, value) => {
		form.mutators.setValue(name, value)
	}

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				{label}
			</Typography>
			<Box py={2}>
				<Divider />
			</Box>
			{!columnsReady && (
				<Box display="flex" justifyContent="center" alignContent="center">
					<CircularProgress />
				</Box>
			)}

			<Collapse in={columnsReady}>
				{columnsReady && (
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.requiredColumn}>
									Required Column
								</TableCell>
								<TableCell className={classes.selectColumn}>
									Select Column
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.keys(tabData).map((columnName, columnValue) => {
								const x = tabData[columnName].Name
								const example =
									formData[values.dataRow - 1][values?.map[x]?.sheetIndex]
								return (
									<RapidRow
										key={columnName}
										rowInfo={tabData[columnName]}
										columns={formData[values.headingRow - 1]}
										changeSelect={handleChangeSelect}
										exampleData={example}
									/>
								)
							})}
						</TableBody>
					</Table>
				)}
			</Collapse>
		</Box>
	)
}

const required = (value) => (value ? undefined : 'Required')

const RapidRow = (props) => {
	const { rowInfo, columns, changeSelect, exampleData } = props
	return (
		<TableRow>
			<TableCell>{rowInfo.DisplayName || rowInfo.Name}</TableCell>
			<TableCell>
				<Select
					variant="outlined"
					name={`map.${rowInfo.Name}.sheetHeading`}
					label="Select Column to map"
					formControlProps={{ margin: 'none' }}
					onChange={(e) => {
						const { value } = e.target
						const lowerCaseCols = columns.map(function (value) {
							return value.toLowerCase()
						})
						const indexVal = lowerCaseCols.indexOf(value.toLowerCase())
						changeSelect(`map.${rowInfo.Name}`, {
							sheetHeading: value,
							sheetIndex: indexVal,
						})
					}}>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{columns.map((col, i) => {
						return (
							<MenuItem
								value={col.toLowerCase()}
								key={`${rowInfo.Name}-${col}-${i}`}>
								{col}
							</MenuItem>
						)
					})}
				</Select>
				{exampleData !== undefined && (
					<Typography variant="caption" color="textSecondary">
						Example data: {exampleData.toString()}
					</Typography>
				)}
			</TableCell>
		</TableRow>
	)
}
