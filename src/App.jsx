// src/components/NotesApp.jsx
import React, { useState, useEffect } from 'react';
import { BsTrash, BsPencil, BsPlus } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const NotesApp = () => {
  const [containers, setContainers] = useState(['', '', '', '']);

  // Paimti konteinerių duomenis iš LocalStorage
  useEffect(() => {
    const storedContainers = JSON.parse(localStorage.getItem('noteContainers')) || [''];
    setContainers(storedContainers);
  }, []);

  const saveContainersToLocalStorage = (updatedContainers) => {
    // Įrašyti konteinerių duomenis į LocalStorage
    localStorage.setItem('noteContainers', JSON.stringify(updatedContainers));
  };

  const handleAddContainer = () => {
    const updatedContainers = [...containers, ''];
    setContainers(updatedContainers);
    saveContainersToLocalStorage(updatedContainers);
  };

  const handleDeleteContainer = (index) => {
    const newContainers = [...containers];
    newContainers.splice(index, 1);
    setContainers(newContainers);
    saveContainersToLocalStorage(newContainers);
  };

  const handleEditContainer = (index, text) => {
    const newContainers = [...containers];
    newContainers[index] = text;
    setContainers(newContainers);
    saveContainersToLocalStorage(newContainers);
  };

  return (
    <div className="notes-app-container">
      <h1>Notes App</h1>
      <div className="add-note-button">
        <button onClick={handleAddContainer}>
          <BsPlus /> Add Note
        </button>
      </div>
      <div className="notebook">
        <AnimatePresence>
          {containers.map((container, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="note-container"
            >
              <div className="small-part">
                <button className="edit-button" onClick={() => handleEditContainer(index, '')}>
                  <BsPencil />
                </button>
                <button className="delete-button" onClick={() => handleDeleteContainer(index)}>
                  <BsTrash />
                </button>
              </div>
              <div className="big-part">
                <textarea
                  value={container}
                  onChange={(e) => handleEditContainer(index, e.target.value)}
                  placeholder={`Enter text #${index + 1}`}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotesApp;


