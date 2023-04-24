import Navbar from "../../core/navbar/Navbar";
import ViewBids from "./ViewBids";
import { useParams } from "react-router-dom";

const ViewBidsContainer = () => {
    let params = useParams();

    return ( 
        <>
        <div className="top-content">
            <Navbar />
           
            <h2 className="page-title">
            Bids
            </h2>
        </div>
        <div className="container">
            <ViewBids jobId={params.jobId}/>
        </div>
        </>
     );
}
 
export default ViewBidsContainer;