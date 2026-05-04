import { nanoid } from 'nanoid';
import notes from '../src/notes.js';


export const createNote = (req, res, next) => { 
    const { title = 'untitled', tags, body } = req.body;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = { title, tags, body, id, createdAt, updatedAt };
    notes.push(newNote);
};