const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Clicks = require("../../Modal/ClicksModal/ClicksSchema");

router.post('/click', async (req, res) => {
    try {
        const currentDate = new Date().toISOString().split('T')[0];
        const timestamp = new Date(currentDate);

        console.log("Checking for existing entry with date:", timestamp);
        const existingClick = await Clicks.findOne({ timestamp: timestamp });

        if (existingClick) {
            existingClick.clicks += 1;
            await existingClick.save();
            return res.status(200).json({ message: "Click updated successfully", data: existingClick });
        } else {
            const lastEntry = await Clicks.findOne().sort({ timestamp: -1 });

            let previousClicks = 0;
            if (lastEntry) {
                previousClicks = lastEntry.clicks;
            }
            const newClick = new Clicks({
                timestamp: timestamp,
                clicks: previousClicks + 1,
            });

            await newClick.save();

            return res.status(201).json({ message: "New click entry created", data: newClick });
        }

    } catch (err) {
        console.error("Error creating/updating click entry:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
});



router.get('/clicksdata', async (req, res) => {
    try {
        const { date } = req.query;

        let query = {};
        if (date) {
            const timestamp = new Date(date).toISOString().split('T')[0];
            query.timestamp = new Date(timestamp);
        }

        const clicksData = await Clicks.find(query).sort({ timestamp: -1 }); // Sorting in descending order

        if (!clicksData.length) {
            return res.status(404).json({ message: "No data found for the given date." });
        }

        // Format the date in 'DD-MM-YYYY' format before sending the response
        clicksData.forEach(entry => {
            const formattedDate = `${String(entry.timestamp.getDate()).padStart(2, '0')}-${String(entry.timestamp.getMonth() + 1).padStart(2, '0')}-${entry.timestamp.getFullYear()}`;
            entry.timestamp = formattedDate; // Format the date
        });

        res.status(200).json({ message: "Clicks data retrieved successfully", data: clicksData });
    } catch (err) {
        console.error("Error fetching click data:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
});





module.exports = router;