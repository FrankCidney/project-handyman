const { searchHandymen, searchBySimOnly } = require('../helperFuncs');
const Handyman = require('../models/Handyman');

module.exports.find_handyman_get = (req, res) => {
    const searchQuery = req.params.query;
    const nCid = req.query.nCid;
    let nearbyHandymen = [];


    // get all handymen within a 5km radius of the given coordinates
    Handyman.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                },
                distanceField: 'dist.calculated',
                maxDistance: 5000,
                spherical: true
            }
        }
    ]) 
        .then((result) => { 
            if (result.length === 0) {
                res.json("No nearby handymen");
            } else {
                nearbyHandymen = result;
                console.log('got to nearby hm')
                // res.status(200).json(nearbyHandymen);

                // handle recommendations
                searchHandymen(searchQuery, nCid)
                .then(recResult => {
                    console.log('got to recommendation results');

                    // filter recommendations by distance to client
                    const filteredRecbyDistance = nearbyHandymen.filter(handyman => {
                        const isRecommended = recResult.find(recomHm => recomHm.id === handyman.id);
                        return isRecommended;
                    });

                    // return filtered list
                    if (filteredRecbyDistance.length === 0) {
                        searchBySimOnly(searchQuery, './python_files/querySearch.py')
                            .then(relResult => {
                                // filter query results by distance to client
                                const filteredRelbyDist = nearbyHandymen.filter(handyman => {
                                    const isRelevant = relResult.find(relevantHm => relevantHm.id === handyman.id);
                                    return isRelevant;
                                });

                                if (filteredRelbyDist.length === 0) {
                                    res.json("No nearby handymen");
                                }
                                else {
                                    res.status(200).json(filteredRelbyDist);
                                }
                            })
                            .catch(error => console.log({ relevantHmErr: error }));
                        
                    } else {
                        res.status(200).json(filteredRecbyDistance);
                    }
                })
                .catch(error => console.log({ recommendationErr: error }));
                // ///////////////////////////////////////////////////////////////
            }
        })
        .catch((error) => console.log({ nearbyHmErr: error }));

  

}