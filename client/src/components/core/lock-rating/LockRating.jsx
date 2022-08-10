
const LockRating = ({ children, ratingActive }) => {
    return  ratingActive? (
        children
    ) : (
        <div>
            <p className="p-base">
                Rating only available after payment
            </p>
        </div>
    );
}
 
export default LockRating;