// import Input from '@mui/material/Input';
// import InputAdornment from '@mui/material/InputAdornment';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { handleFetch } from '../../../../../helpers';
import { useOutletContext } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import './payment.scss';
import { SocketContext } from '../../../../../context/SocketContext';

const Payment = () => {

    // get context values
    const { socket } = useContext(SocketContext);
    const { handymanId, activateRating } = useOutletContext();

    // state values
    const [amount, setAmount] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    // useEffect to listen for socket events
    useEffect(() => {
        socket?.on('paymentResponse', data => {
            // console.log({ data });
            // console.log('payment response received');
            if (data?.code === 1032) {
                alert('User cancelled the request');
            } else if (data?.code === 1037) {
                alert('The number you entered cannot be reached');
            } else {
                activateRating();
                alert('payment successful, you can now rate the handyman');
            }
        })
        // socket?.on('hello', data => {
        //     console.log('payment response received');
           
        // })
    }, [socket])

    // proceed to pay button clicked
    const handleSubmit = (e) => {
        e.preventDefault();
        handleFetch('mpesa/mpesa-express-request', {
            body: {
                handymanId,
                amount,
                phoneNo
            }
        })
            .then(res => {
                // activate rating on success response
                if (res.code === 0) {
                    console.log('request accepted');
                    // activateRating();
                } else {
                    alert('Unable to make payment! Please check the number you entered or try again later.')
                }
                
            })
            .catch(error => console.log({ paymentError: error }));
    }
    return ( 
        <div className="tab-content">
            <h5 className='font-small'>M-PESA</h5>

            <form onSubmit={handleSubmit}>
                {/* <Input placeholder='Amount to pay' 
                        className="input"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                /> */}
                <OutlinedInput 
                        id='amount'
                        size='md'
                        placeholder='Amount to pay'
                        className='input input-custom alt-input'
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                />

                <OutlinedInput 
                        id='phoneNo'
                        size='sm'
                        placeholder='Phone no. 2547...'
                        className='input input-custom' alt-input
                        value={phoneNo}
                        onChange={e => setPhoneNo(e.target.value)}
                />
                {/* <Input placeholder='Phone no.' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <LocalPhoneIcon fontSize='small'/> 
                        </InputAdornment>}
                        className="input"
                        value={phoneNo}
                        onChange={e => setPhoneNo(e.target.value)}
                /> */}
                <button type='submit' className='button'>
                        Proceed to pay
                </button>
            </form>
        </div>
     );
}
 
export default Payment;