import Express from "express";
const _PORT_ = 80;
const app = Express();
app.use("/",Express.static("src/public"));
app.listen(_PORT_, () => {
    console.log("The server is up and running on port: ", _PORT_);
});

