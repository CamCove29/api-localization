const express = require("express");
const { Localizacion, Disponibilidad } = require("../models/localizacion");
const router = express.Router();

// Obtener todas las localizaciones
router.get("/", async (req, res) => {
  try {
    const localizaciones = await Localizacion.find();
    res.json(localizaciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una localización por ID
router.get("/:id", async (req, res) => {
  try {
    const localizacion = await Localizacion.findById(req.params.id);
    if (!localizacion) {
      return res.status(404).json({ message: "Localización no encontrada" });
    }
    res.json(localizacion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar una nueva localización
router.post("/", async (req, res) => {
  const localizacion = new Localizacion({
    nombre: req.body.nombre,
    direccion: req.body.direccion,
  });

  try {
    const nuevaLocalizacion = await localizacion.save();
    res.status(201).json(nuevaLocalizacion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una localización por ID
router.patch("/:id", async (req, res) => {
  try {
    const localizacion = await Localizacion.findById(req.params.id);
    if (!localizacion) {
      return res.status(404).json({ message: "Localización no encontrada" });
    }

    if (req.body.nombre) {
      localizacion.nombre = req.body.nombre;
    }
    if (req.body.direccion) {
      localizacion.direccion = req.body.direccion;
    }

    const localizacionActualizada = await localizacion.save();
    res.json(localizacionActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una localización por ID
router.delete("/:id", async (req, res) => {
  try {
    const localizacion = await Localizacion.findById(req.params.id);
    if (!localizacion) {
      return res.status(404).json({ message: "Localización no encontrada" });
    }

    await localizacion.remove();
    res.json({ message: "Localización eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar la disponibilidad de libros
router.post("/disponibilidad", async (req, res) => {
  const disponibilidad = new Disponibilidad({
    libro_id: req.body.libro_id,
    localizacion_id: req.body.localizacion_id,
    cantidad: req.body.cantidad,
  });

  try {
    const nuevaDisponibilidad = await disponibilidad.save();
    res.status(201).json(nuevaDisponibilidad);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener disponibilidad por localización
router.get("/disponibilidad/:id", async (req, res) => {
  try {
    const disponibilidades = await Disponibilidad.find({ localizacion_id: req.params.id });
    res.json(disponibilidades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar disponibilidad por ID
router.patch("/disponibilidad/:id", async (req, res) => {
  try {
    const disponibilidad = await Disponibilidad.findById(req.params.id);
    if (!disponibilidad) {
      return res.status(404).json({ message: "Disponibilidad no encontrada" });
    }

    if (req.body.libro_id) {
      disponibilidad.libro_id = req.body.libro_id;
    }
    if (req.body.localizacion_id) {
      disponibilidad.localizacion_id = req.body.localizacion_id;
    }
    if (req.body.cantidad) {
      disponibilidad.cantidad = req.body.cantidad;
    }

    const disponibilidadActualizada = await disponibilidad.save();
    res.json(disponibilidadActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar disponibilidad por ID
router.delete("/disponibilidad/:id", async (req, res) => {
  try {
    const disponibilidad = await Disponibilidad.findById(req.params.id);
    if (!disponibilidad) {
      return res.status(404).json({ message: "Disponibilidad no encontrada" });
    }

    await disponibilidad.remove();
    res.json({ message: "Disponibilidad eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
