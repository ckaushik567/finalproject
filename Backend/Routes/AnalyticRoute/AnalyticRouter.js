const express = require("express");
const router = express.Router();
const device = require("express-device");
const Analytics = require("../../Modal/AnalyticModal/AnalyticsSchema");

router.post("/trackClick", async (req, res) => {
  try {
    const date = new Date();
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDateTime = Intl.DateTimeFormat("en-US", options).format(date);
    const { originalLink, shortLink } = req.body;

    const clickData = {
      timestamp: formattedDateTime,
      originalLink,
      shortLink,
      ipAddress: req.ip,
      anotherDevice:req.device.type,
      userDevice:
        req.headers["user-agent"]?.startsWith("Mozilla")
          ? "Mozilla"
          : req.headers["user-agent"]?.split(" ")[0] || "Unknown",
    };

    const newClick = new Analytics(clickData);
    await newClick.save();
    console.log(req.headers["user-agent"]);
    console.log(req.device.type)

    res.status(201).json({ message: "Click tracked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error tracking click" });
  }
});

router.get("/analytics", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const analyticsData = await Analytics.find()
      .skip(skip)
      .limit(limit);

    const totalRecords = await Analytics.countDocuments();

    const totalPages = Math.ceil(totalRecords / limit);

    res.status(200).json({
      analytics: analyticsData,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalRecords: totalRecords,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching analytics data" });
  }
});


router.get("/device-wise-analytics", async (req, res) => {
  try {
     
    const deviceClickData = await Analytics.aggregate([
      {
        $group: {
          _id: "$anotherDevice", 
          totalClicks: { $sum: 1 },
        },
      },
      { $sort: { totalClicks: -1 } },
    ]);

    res.status(200).json(deviceClickData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching device-wise analytics" });
  }
});






module.exports = router;









































// const express = require("express");
// const router = express.Router();
// const Analytics = require("../../Modal/AnalyticModal/AnalyticsSchema");

// router.post("/trackClick", async (req, res) => {
//   try {
//     const date = new Date();
//     const options = {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: false
//     };
//     const formattedDateTime = Intl.DateTimeFormat('en-US', options).format(date);
//     const { originalLink ,shortLink} = req.body;

//     const clickData = {
//       timestamp:formattedDateTime,
//       originalLink,
//       shortLink,
//       ipAddress: req.ip,
//       userDevice: req.headers["user-agent"]?.startsWith("Mozilla") ? "Mozilla" : req.headers["user-agent"]?.split(" ")[0] || "Unknown",
//     };

//     const newClick = new Analytics(clickData);
//     await newClick.save();

//     res.status(201).json({ message: "Click tracked successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error tracking click" });
//   }
// });

// router.get("/analytics", async (req, res) => {
//     try {
//       const analyticsData = await Analytics.find();
//       res.status(200).json({ analytics: analyticsData });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error fetching analytics data" });
//     }
//   });
  
// module.exports = router;