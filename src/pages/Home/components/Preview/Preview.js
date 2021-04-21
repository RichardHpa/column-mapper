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
} from '@material-ui/core'
import XLSX from 'xlsx'

const Preview = (props) => {
	const { columns, map, data } = props
	const [rows, setRows] = useState([])

	useEffect(() => {
		if (data && map) {
			const reader = new FileReader()
			const rABS = !!reader.readAsBinaryString
			reader.onload = ({ target: { result } }) => {
				const wb = XLSX.read(result, { type: rABS ? 'binary' : 'array' })
				const wsname = wb.SheetNames[0]
				const ws = wb.Sheets[wsname]
				const jsonData = XLSX.utils.sheet_to_json(ws, {
					header: 1,
				})
				console.log(jsonData[0])
				setRows(jsonData)
			}
			if (rABS) reader.readAsBinaryString(data)
			else reader.readAsArrayBuffer(data)
		}
	}, [data, map])

	// useEffect(() => {
	// 	console.log(rows)
	// }, [rows])

	// useEffect(() => {
	// 	console.log(map.map)
	// }, [map])

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
							{columns.map((col) => {
								return <TableCell key={col}>{col}</TableCell>
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows?.splice(1, 10).map((row) => {
							return (
								<TableRow key={row.id}>
									{columns.map((col) => {
										return (
											<TableCell key={row[map.map[col].index]}>
												{row[map.map[col].index]}
											</TableCell>
										)
									})}
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default Preview
