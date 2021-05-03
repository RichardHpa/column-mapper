import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core'
import { TextField } from 'mui-rff'

const SaveDialog = (props) => {
	const { open, close, form } = props
	const { values } = form.getState()

	const handleClose = () => {
		if (close) {
			close()
		}
	}

	const handleOnsSave = () => {
		const { values } = form.getState()
		form.mutators.setValue('saveMapping', true)
		const newMap = values
		delete newMap['file']
		const savedMaps = JSON.parse(localStorage.getItem('columnMapper')) || []
		const found = savedMaps.findIndex(
			(i) => i.mappingName === values.mappingName
		)
		if (found !== -1) {
			savedMaps.splice(found, 1, newMap)
		} else {
			savedMaps.push(newMap)
		}
		localStorage.setItem('columnMapper', JSON.stringify(savedMaps))

		if (close) {
			close()
		}
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Save current Mapping</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To save a map, please give it a name so you can use it again later. If
					you use a name of a map that already exists, it will override it.
				</DialogContentText>
				<TextField
					label="Mapping Name"
					name="mappingName"
					required={true}
					autoFocus
					fullWidth
					margin="dense"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button
					onClick={handleOnsSave}
					color="primary"
					disabled={!values.mappingName}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default SaveDialog
