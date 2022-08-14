import './category.scss';
import Neo from '../../../../../assets/neo.png';
import Electricity from '../../../../../assets/electricity~1.jpg';
import Plumbing from '../../../../../assets/plumbing~1.jpg';
import Painting from '../../../../../assets/painting~1.jpg';
import DrywallInstallation from '../../../../../assets/drywall~1.jpg';
import Tiling from '../../../../../assets/tiling~1.jpg';
import Welding from '../../../../../assets/welding~1.jpg';
import GutterRepair from '../../../../../assets/gutterRepair~1.jpg';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const images = {
        Electricity, Plumbing, Painting, DrywallInstallation, Tiling, Welding, GutterRepair
    }
    return ( 
        <div className="category">
            <Link to={`/search/${category.id}`}>
                <img src={images[category.label]} alt={category.label} />
                <div className='cat-content'>
                    <h2 className="category-title">
                        { category.label }
                    </h2>
                    <p className="category-description p-base">
                        { category.description }
                    </p>
                </div>
            </Link>
        </div>
     );
}
 
export default Category;