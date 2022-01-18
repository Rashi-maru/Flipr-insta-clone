const express = require("express"),
    morgan = require("morgan");

const { PORT, MODE } = require("./config");
const { connect } = require("./api/v1/helpers/dbconnect");
const apis = require("./api");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
// routes
app.use("/api", apis);

app.get("/ping", (req, res) => {
    res.status(200).send("pong");
});

// dead end
app.use((req, res) => {
    res.status(404).json({ message: "verb is not supported" }).end();
});

const start = async() => {
    try {
        await connect();
        app.listen(PORT, () => {
            console.log(`Server now running in ${MODE} and is running at port ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
};
start();