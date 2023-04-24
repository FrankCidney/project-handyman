const ListingCont = ({ job }) => {
    return ( 
        <>
            <div className="listing-top">
                <p className='p-base p-top p-list'>{job.jobTitle}</p>
                <p className="p-base p-list">{job.bidCount? job.bidCount: 0} bids</p>
            </div>
            
            <p className='p-base-grey desc'>
                {job.jobDescription}
            </p>
            <ul className='skills font-small p-list'>
                {job?.skills?.map(skill => (
                <li>{skill}</li>
                ))}
            </ul>
            <ul className='prices p4'>
                <li>Ksh {job.budget} (Budget)</li>
                <li>Ksh {job.avgBidPrice? job.avgBidPrice: 0} (Avg bid)</li>
            </ul>
        </>
     );
}
 
export default ListingCont;