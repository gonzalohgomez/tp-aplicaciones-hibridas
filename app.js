import express from "express";
import mongoose from "mongoose";
import faltaUno from "./routes/faltaUno.js"
import usuarios from "./routes/usuarios.js";
import deportes from "./routes/deportes.js";
import auth from "./routes/auth.js";
import "dotenv/config";
import fs from "fs";

mongoose
  .connect("mongodb://localhost:27017/trabajoPractico1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a la Base de Datos");
  })
  .catch(() => {
    console.log("Error al conectar con la DB");
  });

  const app = express();
  
app.use(express.static('public')); // Ruta base para archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
//   res.send("hola");
    fs.readFile("index.html", "utf8", (err, data) => {
        if (err) {
          res.status(500).send("Error al leer el archivo HTML");
          return;
        }
        // Envía el contenido del archivo como respuesta
        res.send(data);
    });
});

app.use("/login", auth);
app.use("/usuarios", usuarios);
app.use('/faltauno', faltaUno);
app.use('/deportes', deportes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log("Server corriendo!");
});
