import { OutlinedInput } from "@mui/material";
import { useState } from "react";
import { handleFetch } from "../../../helpers";
import Navbar from "../../core/navbar/Navbar";
import './withdraw.scss';

const Withdraw = () => {
    const [amount, setAmount] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        handleFetch('mpesa/b2c/request', {
            method: 'GET'
        }).then()
            .catch(error => console.log({ withdrawError: error }));
        console.log(amount)
    }
    return ( 
        <>
        <div className="top-content">
            <Navbar />
        </div>
        <div className="withdraw-container">
            <div className="within">
                <h1 className="withdraw">Withdraw</h1>
                <form onSubmit={handleSubmit}>
                    <OutlinedInput
                        id="amount"
                        size="sm"
                        placeholder="Amount to withdraw"
                        className="input input-custom"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                    <button type='submit' className='button'>
                                Withdraw
                    </button>
                </form>
            </div>
        </div>
        </>
     );
}
 
export default Withdraw;