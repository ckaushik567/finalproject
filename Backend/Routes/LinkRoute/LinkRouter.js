const express = require('express');
const router = express.Router();
const Link = require('../../Modal/LinkModal/LinkSchema');
const cron  = require('node-cron');
const shortId = require('shortid');

router.post('/link', async (req, res) => {
    const date = new Date();
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formattedDateTime = Intl.DateTimeFormat('en-US', options).format(date);

    try {
        const { URL, Remarks, LinkExpiration, Status } = req.body;

        const existingURL = await Link.findOne({ URL });
        if (existingURL) {
            return res.status(401).json({ message: "URL already exists" });
        }

        const shortCode = shortId.generate();

        const newLink = new Link({
            Date: formattedDateTime,
            URL,
            shortId: shortCode,
            Remarks,
            LinkExpiration,
            Status,
            clicks:0
        });

        const savedLink = await newLink.save();
        return res.status(201).json({
            message: "Link created successfully",
            link: savedLink,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});


// router.get('/link', async (req, res) => {
//     try {
//         const links = await Link.find();
//         res.status(200).json({
//             message: "Links fetched successfully",
//             links
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// });

// this is for test



router.get('/link', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const skip = (page - 1) * limit;

    try {
         
        const links = await Link.find()
            .skip(skip)  
            .limit(limit);   

         
        const totalLinks = await Link.countDocuments();

        res.status(200).json({
            message: "Links fetched successfully",
            links,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalLinks / limit),
                totalLinks,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});


// router.get('/linkss', async (req, res) => {
//     try {
//         const links = await Link.find({}, { timestamp: 1, clicks: 1 });
//         const clickDataMap = new Map();

//         links.forEach(link => {
//             const dateObj = new Date(link.timestamp);  
//             const day = String(dateObj.getDate()).padStart(2, '0');   
//             const month = String(dateObj.getMonth() + 1).padStart(2, '0');
//             const year = dateObj.getFullYear();

//             const formattedDate = `${day}-${month}-${year}`;

//             clickDataMap.set(formattedDate, (clickDataMap.get(formattedDate) || 0) + link.clicks);
//         });

//         const chartData = Array.from(clickDataMap.entries()).map(([timestamp, value]) => ({ timestamp, value }));

//         res.status(200).json({
//             message: "Chart data fetched successfully",
//             chartData
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// });

// router.get('/:shortId', async (req, res) => {
//     const { shortId } = req.params;

//     try {
//         const link = await Link.findOne({ shortId });

//         if (!link) {
//             return res.status(404).json({ message: "Link not found" });
//         }
//         return res.redirect(link.URL);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Something went wrong" });
//     }
// });


router.get('/linkss', async (req, res) => {
    try {
        const links = await Link.find({}, { timestamp: 1, clicks: 1 }).sort({ timestamp: 1 }); // Sort in ascending order first
        const clickDataMap = new Map();

        let cumulativeClicks = 0;

        links.forEach(link => {
            const dateObj = new Date(link.timestamp);  
            const day = String(dateObj.getDate()).padStart(2, '0');   
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();

            const formattedDate = `${day}-${month}-${year}`;
            cumulativeClicks += link.clicks;

            clickDataMap.set(formattedDate, cumulativeClicks);
        });
        const chartData = Array.from(clickDataMap.entries())
            .map(([timestamp, value]) => ({ timestamp, value }))
            .sort((a, b) => {
                const dateA = a.timestamp.split("-").reverse().join("");
                const dateB = b.timestamp.split("-").reverse().join("");
                return dateB.localeCompare(dateA);
            });

        res.status(200).json({
            message: "Chart data fetched successfully",
            chartData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});




router.get('/linkSearch', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const search = req.query.search || '';

    const skip = (page - 1) * limit;

    try {
        const query = search ? { URL: { $regex: search, $options: 'i' } } : {};

        const links = await Link.find(query) 
            .skip(skip)  
            .limit(limit);   

        const totalLinks = await Link.countDocuments(query); 

        res.status(200).json({
            message: "Links fetched successfully",
            links,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalLinks / limit),
                totalLinks,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});
































router.put('/link/:id', async (req, res) => {
    const { id } = req.params;
    const { URL, Remarks, LinkExpiration, Status } = req.body;

    try {
        const updatedLink = await Link.findByIdAndUpdate(
            id,
            { URL, Remarks, LinkExpiration, Status },
            { new: true, runValidators: true }
        );

        if (!updatedLink) {
            return res.status(404).json({ message: "Link not found" });
        }

        res.status(200).json({
            message: "Link updated successfully",
            link: updatedLink
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.delete('/link/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLink = await Link.findByIdAndDelete(id);

        if (!deletedLink) {
            return res.status(404).json({ message: "Link not found" });
        }

        res.status(200).json({
            message: "Link deleted successfully",
            link: deletedLink
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

cron.schedule("10 * * * * ", async () => {
    console.log("Running automatic status update...");

    try {
        const currentDate = new Date();
        const updatedLinks = await Link.updateMany(
            { LinkExpiration: { $lte: currentDate.toISOString().split("T")[0] }, Status: "Active" },
            { $set: { Status: "Inactive" } }
        );

        console.log(`Updated ${updatedLinks.modifiedCount} links to Inactive.`);
    } catch (err) {
        console.error("Error updating link statuses:", err);
    }
});



router.patch('/link/:id/click', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedLink = await Link.findByIdAndUpdate(
            id,
            { $inc: { clicks: 1 }},
            { new: true, runValidators: true }
        );

        if (!updatedLink) {
            return res.status(404).json({ message: "Link not found" });
        }

        return res.status(200).json({
            message: "Click recorded successfully",
            link: updatedLink,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});



// router.put('/click/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Normalize to start of the day

//         // Find today's click entry
//         let existingLink = await Link.findOne({ _id: id, timestamp: { $gte: today } });

//         if (existingLink) {
//             // If today's entry exists, update clicks
//             existingLink.clicks += 1;
//             existingLink.timestamp = new Date(); // Update timestamp to current time
//             await existingLink.save();
//         } else {
//             // If no entry for today, create a new one
//             existingLink = new Link({
//                 _id: id,
//                 clicks: 1,
//                 timestamp: new Date() // Set current timestamp
//             });

//             await existingLink.save();
//         }

//         res.status(200).json({
//             message: "Click recorded successfully",
//             link: existingLink
//         });
//     } catch (err) {
//         console.error("Error updating click count:", err);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// });




module.exports = router;
