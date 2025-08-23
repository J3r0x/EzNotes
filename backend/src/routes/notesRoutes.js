import express from "express"
import Note from "../models/nodeModel.js";
const router = express.Router();

//Get all notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error al obtener las notas", error);
        res.status(500).json({ error: "Internal server error"})
    }
})

//Get notes by ID

router.get("/:id", async (req, res) => {

    try{
        const id = req.params.id;
        const note = await Note.findById(id);
        if(!note){
            res.status(404).json({ error: "Note not found."})
        }else{
            res.status(200).json(note);
        }
    }catch(error){
        console.error("Error al obtener las notas", error);
        res.status(500).json({ error: "Internal server error"})
    }
})


//New note
router.post("/", async (req, res) => {
    try {
        const {title,  description} = req.body;
        const note = new Note ({title , description})
        const savedNote = await note.save();
        if(savedNote){res.status(201).json({message: "Nota creada correctamente", note: savedNote})}
    } catch (error) {
        console.error("No se pudo crear una nota", error)
        res.status(500). json({error: "Internal server error"})
    }
})

//Delete

router.delete("/:id", async (req, res) => {

    try{
        const id = req.params.id;
        const deleteNote = await Note.findByIdAndDelete(id);
        if(!deleteNote){
            res.status(404).json({ error: "Note not found."})
        }else{
            res.status(200).json(`Note deleted ${id}`);
        }
    }catch(error){
        console.error("Error al obtener las notas", error);
        res.status(500).json({ error: "Internal server error"})
    }
})

//Edit note
router.put("/:id", async (req, res) =>{
    try {
        const id = req.params.id;
        const {title,  description} = req.body;
        const updateData = {title, description};
        const savedNote = await Note.findByIdAndUpdate(id, updateData, {new: true});
        if(savedNote){res.status(200).json({message: "Nota actualizada correctamente", note: savedNote})}
    } catch (error) {
        console.error("No se pudo actualizar una nota", error)
        res.status(500). json({error: "Internal server error"})
    }
})


export default router;
