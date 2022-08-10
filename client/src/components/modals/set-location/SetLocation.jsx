import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import './setLocation.scss';
// import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

const SetLocation = ({ open, onClose, handleLocationClick, setLocation, notNow }) => {
    return ( 
        <>
        {/* create setLocation modal */}
        <Dialog
            // {...props}
            open={open}
            onClose={onClose}
            maxWidth='xs'
            fullWidth={true}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            PaperProps={{
                sx: {
                    backgroundColor: 'white'
                }
            }}
            className="dialog"
        >
            {/* Dialog title */}
            <DialogTitle id="modal-modal-title" className="dialog-title">
                <p className='h2'>Set Location</p>
                <i className='h2'><CloseIcon /></i>
            </DialogTitle>

            {/* Dialog description */}
            <DialogContent id="modal-modal-description" className="dialog-content">
                {/* Dialog content */}
                {/* <form>
                    
                    <InputLabel htmlFor='location'>Enter location</InputLabel>
                    <OutlinedInput 
                        id='location'
                        size='md'
                        placeholder='location format'
                        className='input'
                    />
                </form> */}
                {/* <p className="p-text">Alternatively...</p> */}
                <button className="button2"
                    onClick={handleLocationClick}
                >
                    Use my current location</button>
                {/*Dialog actions */}
                <div className="modal-actions">
                    <button className="button2 btn-action not-now"
                        onClick={notNow}
                    >Not now</button>
                    <button className="button2 btn-action"
                        onClick={setLocation}
                    >Set location</button>
                </div>
            </DialogContent>
        </Dialog>
        </>
     );
}
 
export default SetLocation;