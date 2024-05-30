const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.config");
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/auth", require("./routes/jwtauth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/inventory", require("./routes/inventory"));

app.listen(5000, () => {
  console.log("backend running on 5000");
});
