const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

routes.forEach((route) => {
  return app.use(
    `/${route}`,
    express.static(path.join(__dirname, `${route}/build`))
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
