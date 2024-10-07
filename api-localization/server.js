const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const localizacionesRoutes = require("./routes/localizaciones");

const app = express();
const port = 8001; // Cambia el puerto a 8001

// Middleware
app.use(bodyParser.json());

// Rutas
app.use("/localizaciones", localizacionesRoutes);

// Conexión a MongoDB
mongoose
  .connect("mongodb://172.31.44.64:27017/localizacionDB", { // Cambia la URL aquí
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
