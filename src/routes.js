import express from 'express';
import { 
    createNote,
    editNoteById,
    getNotes,
    getNoteById,
} from './controller.js';

const router = express.Router();

router.post('/notes', createNote);
router .get('/notes', getNotes);   
router.get('/notes/:id', getNoteById); 
router.put('/notes/:id', editNoteById);

export default router;