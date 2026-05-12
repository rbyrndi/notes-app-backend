import { nanoid } from 'nanoid';
import notes from '../notes.js';

export const createNote = (req, res, next) => { 
    const { title = 'untitled', tags, body } = req.body;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = { title, tags, body, id, createdAt, updatedAt };
    notes.push(newNote);

    const isSucess = notes.filter((note) => note.id === id).length > 0;

    if (isSucess) {
        return res.status(201).json({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: { noteId: id },
        });
    }

    return  res.status(500).json({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
};


export const getNotes = (req, res) => {
    return res.json({
        status: 'success',
        data: { notes }
    });
};

export const getNoteById = (req, res) => {
    const { id } = req.params;
    const note = notes.filter((n) => n.id === id);

    if (note.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'Catatan tidak ditemukan',
        });
    }

    return res.json({
        status: 'success',
        data: { note: note[0] }
    });
};


export const editNoteById = (req, res) => {
    const { id } = req.params;
    const { title, tags, body } = req.body;
    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        return res.json({
            status: 'success',
            message: 'Catatan berhasil diubah',
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
};


export const deleteNoteById = (req, res) => {
    const { id } = req.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        return res.json({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
};
