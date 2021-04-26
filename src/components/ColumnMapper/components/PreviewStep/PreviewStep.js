import { useState, useEffect } from 'react'
import {
	Box,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Grid,
} from '@material-ui/core'
import { Checkboxes, TextField } from 'mui-rff'
import { useFormData } from '../../FormDataContext'

const PreviewStep = (props) => {
	const { form, values } = props
	const { map, dataRow } = values
	const [previewRows, setPreviewRows] = useState([])
	const { formData } = useFormData()

	useEffect(() => {
		if (formData) {
			const rows = formData.splice(dataRow - 1, 10)
			setPreviewRows(rows)
		}
		// eslint-disable-next-line
	}, [formData])

	useEffect(() => {
		if (values.saveMapping === false) {
			form.mutators.setValue('mappingName', undefined)
		}
		// eslint-disable-next-line
	}, [values.saveMapping])

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Preview your Data
			</Typography>
			<Typography gutterBottom>
				Based on your mapping, here is an snippet of your spreadsheet
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{Object.entries(map).map(([key, value]) => {
								return <TableCell key={key}>{value.sheetHeading}</TableCell>
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{previewRows.map((row, i) => {
							return (
								<TableRow key={`row-${i}`}>
									{Object.entries(map).map(([key, value]) => {
										return (
											<TableCell key={`${key}-${i}`}>
												{row[value.sheetIndex]}
											</TableCell>
										)
									})}
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>

			<Box pt={2}>
				<Grid container spacing={2}>
					<Grid item>
						<Checkboxes
							name="saveMapping"
							formControlProps={{ margin: 'none' }}
							data={{ label: 'Save Mapping for future use', value: false }}
						/>
					</Grid>
					{values.saveMapping && (
						<Grid item xs>
							<TextField
								label="Mapping Name"
								name="mappingName"
								margin="none"
								variant="outlined"
								size="small"
								fullWidth
								required={true}
							/>
						</Grid>
					)}
				</Grid>
			</Box>
		</Box>
	)
}

export default PreviewStep
