const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
    .connect("mongodb+srv://huseyinapabusiness:FQtaiyi1uWP7Qgcr@paymentcluster.rvkfctr.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Veritabanına Başarıyla Bağlandı");
    })
    .catch((err) => {
        console.log("Veritabanına bağlanırken hata çıktı : ", err);
    });
