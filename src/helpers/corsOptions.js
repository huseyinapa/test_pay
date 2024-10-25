const whiteList = ["http://localhost:3000",
    "http://localhost:3001",
    "https://www.gulgonenkoop.com",
    "https://api.gulgonenkoop.com",
    "https://v2.gonenkleopatra.com",
    "http://3.130.155.44",
    "https://www.huseyinapa.com"]
// "http://localhost:3000", "http://localhost:3001", 
const corsOptions = (req, callback) => {
    let corsOptions;
    if (whiteList.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }

    callback(null, corsOptions)
}

module.exports = corsOptions
