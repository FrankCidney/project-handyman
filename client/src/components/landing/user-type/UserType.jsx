import { useNavigate } from "react-router-dom";
import './userType.scss';

const UserType = () => {
    const navigate = useNavigate();
    return ( 
        <div className="user-type">
            
            <p className="p2">Continue as...</p>
            <button className="button btn-custom"
                onClick={e => navigate('/signin/client')}
            >
                Client
            </button>
            <button className="button btn-custom"
                onClick={e => navigate('/signin/handyman')}
            >
                Handyman
            </button>

        </div>
     );
}
 
export default UserType;