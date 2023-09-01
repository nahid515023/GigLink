const db = require("../models/dbConnection");

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Difference in latitude converted to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Difference in longitude converted to radians

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance; // Distance in kilometers
}


const jobFeed = (req, res) => {
    const id = req.user.id;
    db.query('SELECT * FROM jobPost INNER JOIN clientProfileInfo ON jobPost.jobPosterId = clientProfileInfo.email', (err, result) => {
        if (err) {
            console.error(err);
            // Handle the error appropriately (e.g., send an error response)
            return;
        }
        db.query('SELECT * FROM shopInfo WHERE email = ?', [id], (err, result1) => {
            if (err) {
                console.error(err);
                // Handle the error appropriately (e.g., send an error response)
                return;
            }
            if (result1.length === 0) {
                console.log('No shopInfo found for the specified user ID');
                // Handle the scenario where no shopInfo is found for the user (e.g., send an appropriate response)
                return;
            }
            var val = result1[0].shopAddress.split(" ");
            var postList = [];
            var dist = [];

            for (var i = 0; i < result.length; i++) {
                var ar = result[i].location.split(" ");
                var l1 = Number(val[0]);
                var l2 = Number(val[1]);
                var l3 = Number(ar[0]);
                var l4 = Number(ar[1]);
                var dis = calculateDistance(l1, l2, l3, l4);

               

                if (dis < 5) {
                    postList.push(result[i]);
                    if (parseInt(dis) === 0) {
                        var x = parseInt(dis * 1000) + "m";  // Removed 'str()' function call
                        dist.push(x);
                    } else {
                        dist.push(parseInt(dis) + "km");  // Removed 'str()' function call
                    }
                }
                // console.log(ar);
            }


            // Render the 'Job_feed' view and pass the 'result' data to it
            res.render('Job_feed', { posts: postList, dist });
        });
    });

}
module.exports = jobFeed;