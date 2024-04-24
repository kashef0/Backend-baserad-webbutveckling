// // const express = require('express');
// // const cors = require('cors');
// // const mongoose = require('mongoose');

// // require('dotenv').config();

// // const app = express();
// // const port = process.env.PORT || 3000;

// // app.use(cors());
// // app.use(express.json());

// // // ansluta till MongoDB
// // mongoose.connect(process.env.MONGODB_URI).then(() => {
// //         console.log("Ansluten till MongoDB");
// //     })
// //     .catch((error) => {
// //         console.error("Fel vid anslutning till MongoDB:", error);
// //     });

// // // difenera MongoDB schema
// // const jobbSchema = new mongoose.Schema({
// //     company_name: {
// //         type: String,
// //         required: true
// //     },
// //     job_title: {
// //         type: String,
// //         required: true
// //     },
// //     location: {
// //         type: String,
// //         required: true
// //     },
// //     start_date: {
// //         type: Date,
// //         required: true
// //     },
// //     end_date: {
// //         type: Date,
// //         required: true
// //     },
// //     description: {
// //         type: String,
// //         required: true
// //     },
// //     created: {
// //         type: Date,
// //         default: Date.now
// //     }
// // });

// // const jobb = mongoose.model("jobb", jobbSchema);

// // // diffnera router
// // app.get("/api", async (req, res) => {
// //     res.json({ message: "Welcome to this API" });
// // });


// // // visa en tabel
// // app.get("/jobbs", async (req, res) => {
// //     try {
// //         let resultat = await jobb.find({});
// //         return res.json(resultat);
// //     } catch (error) {
// //         return res.status(500).json(error);
// //     }
// // });

// // // lägga till en tabel
// // app.post("/jobbs", async (req, res) => {
// //     try {
// //         let result = await jobb.create(req.body);
// //         res.json({massage: "Jobb har lagts till", result});
// //         // const savedWorkExperiences = await jobbSchema.insertMany(jobbSchema);
// //         // console.log("Saved work experiences:", savedWorkExperiences);
// //         return res.json(result);
// //     } catch (error) {
// //         return res.status(400).json(error);
// //     }
// // });

// // // uppdatera tabel via id
// // app.put("/jobbs/:id", async (req, res) => {
// //     try {
// //         const updatedJobb = await jobb.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //         res.json(updatedJobb);
// //     } catch (error) {
// //         console.error("Fel vid uppdatering jobb:", error);
// //         res.status(500).json(error);
// //     }
// // });

// // // radera en tabel via ID
// // app.delete("/jobbs/:id", async (req, res) => {
// //     try {
// //         const deletedJobb = await jobb.findByIdAndDelete(req.params.id);
// //         res.json({ message: "Jobb raderades framgångsrikt", deletedJobb });
// //     } catch (error) {
// //         console.error("Fel vid radering jobb:", error);
// //         res.status(500).json(error);
// //     }
// // });

// // app.listen(port, () => {
// //     console.log('Server körs på port: ' + port);
// // });


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



// Anslut till MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Ansluten till MongoDB");
}).catch((error) => {
    console.error("Fel vid anslutning till MongoDB:", error);
});

// Definiera MongoDB-schema
const jobbSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Jobb = mongoose.model("Jobb", jobbSchema); // Uppdaterat modellnamn till singular form

// Definiera routerna

// Visa alla jobb
app.get("/jobbs", async (req, res) => {
    try {
        let resultat = await Jobb.find({});
        return res.json(resultat);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Lägg till ett jobb
app.post("/jobbs", async (req, res) => {
    try {
        let result = await Jobb.create(req.body);
        res.status(200).json({ message: "Jobb har lagts till", result });
    } catch (error) {
        console.error("Fel vid skapande av jobb:", error);
        res.status(400).json({ error: "Kunde inte skapa jobb" });
    }
});

// Uppdatera ett jobb via id
app.put("/jobbs/:id", async (req, res) => {
    try {
        const updatedJobb = await Jobb.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJobb);
    } catch (error) {
        console.error("Fel vid uppdatering jobb:", error);
        res.status(500).json(error);
    }
});

// Radera ett jobb via ID
app.delete("/jobbs/:id", async (req, res) => {
    try {
        const deletedJobb = await Jobb.findByIdAndDelete(req.params.id);
        res.json({ message: "Jobb raderades framgångsrikt", deletedJobb });
    } catch (error) {
        console.error("Fel vid radering jobb:", error);
        res.status(500).json(error);
    }
});

app.listen(port, () => {
    console.log('Server körs på port: ' + port);
});


// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const { MongoClient } = require("mongodb");

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// Anslut till MongoDB med Mongoose
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     console.log("Ansluten till MongoDB med Mongoose");
// }).catch((error) => {
//     console.error("Fel vid anslutning till MongoDB med Mongoose:", error);
// });

// Anslut till MongoDB med MongoClient (direkt anslutning)
// const username = encodeURIComponent(process.env.MONGODB_USERNAME);
// const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
// const cluster = process.env.MONGODB_CLUSTER;
// const dbName = process.env.MONGODB_DBNAME;
// const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function run() {
//     try {
//         await client.connect();
//         console.log("Ansluten till MongoDB med MongoClient");

//         const database = client.db(dbName);
//         const ratings = database.collection("ratings");
//         const cursor = ratings.find();
//         await cursor.forEach(doc => console.dir(doc));
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);

// Definiera MongoDB-schema och modell med Mongoose
// const jobbSchema = new mongoose.Schema({
//     company_name: {
//         type: String,
//         required: true
//     },
//     job_title: {
//         type: String,
//         required: true
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     start_date: {
//         type: Date,
//         required: true
//     },
//     end_date: {
//         type: Date,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     created: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Jobb = mongoose.model("company", jobbSchema);

// Definiera routerna för att interagera med MongoDB via Mongoose

// Visa alla jobb
// app.get("/company", async (req, res) => {
//     try {
//         let resultat = await Jobb.find({});
//         return res.json(resultat);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// });

// Lägg till ett jobb
// app.post("/company", async (req, res) => {
//     try {
//         let result = await Jobb.create(req.body);
//         res.status(200).json({ message: "Jobb har lagts till", result });
//     } catch (error) {
//         console.error("Fel vid skapande av jobb:", error);
//         res.status(400).json({ error: "Kunde inte skapa jobb" });
//     }
// });

// Uppdatera ett jobb via id
// app.put("/company/:id", async (req, res) => {
//     try {
//         const updatedJobb = await Jobb.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedJobb);
//     } catch (error) {
//         console.error("Fel vid uppdatering jobb:", error);
//         res.status(500).json(error);
//     }
// });

// Radera ett jobb via ID
// app.delete("/company/:id", async (req, res) => {
//     try {
//         const deletedJobb = await Jobb.findByIdAndDelete(req.params.id);
//         res.json({ message: "Jobb raderades framgångsrikt", deletedJobb });
//     } catch (error) {
//         console.error("Fel vid radering jobb:", error);
//         res.status(500).json(error);
//     }
// });

// app.listen(port, () => {
//     console.log('Server körs på port: ' + port);
// });
