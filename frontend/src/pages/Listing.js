import React, { useState } from 'react';
import './Listing.css'; 

function Listing() {
  const [savedLists, setSavedLists] = useState(() => {
    const saved = localStorage.getItem('savedLists');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedList, setSelectedList] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedList, setEditedList] = useState(null);

  const handleSave = () => {
    const listName = prompt("Enter a name for your list:");
    if (listName) {
      const newList = {
        name: listName,
        date: new Date().toLocaleDateString(),
        images: savedLists // Assuming savedLists contains the current images to be saved
      };
      const updatedLists = [...savedLists, newList];
      setSavedLists(updatedLists);
      localStorage.setItem('savedLists', JSON.stringify(updatedLists));
    }
  };

  const handleSelectList = (index) => {
    setSelectedList(savedLists[index]);
  };

  const handleDeleteList = (index) => {
    const updatedLists = savedLists.filter((_, i) => i !== index);
    setSavedLists(updatedLists);
    localStorage.setItem('savedLists', JSON.stringify(updatedLists));
  };

  const handleEditList = (index) => {
    setIsEditing(true);
    setEditedList(savedLists[index]);
  };

  const handleSaveEdit = () => {
    const updatedLists = savedLists.map((list) => (list.name === editedList.name ? editedList : list));
    setSavedLists(updatedLists);
    localStorage.setItem('savedLists', JSON.stringify(updatedLists));
    setIsEditing(false);
    setEditedList(null);
  };

  return (
    <div className="listing-container">
      <h1>Saved Lists</h1>
      {savedLists.length > 0 ? (
        savedLists.map((list, index) => (
          <div key={index} className="saved-list">
            <h2>{list.name}</h2>
            <p>{list.date}</p>
            <button onClick={() => handleSelectList(index)}>View</button>
            <button onClick={() => handleEditList(index)}>Edit</button>
            <button onClick={() => handleDeleteList(index)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No saved lists found.</p>
      )}

      {selectedList && (
        <div className="selected-list">
          <h2>{selectedList.name}</h2>
          <p>{selectedList.date}</p>
          <div>
            {selectedList.images.map((src, imgIndex) => (
              <img key={imgIndex} src={src} alt={`Image ${imgIndex}`} />
            ))}
          </div>
        </div>
      )}

      {isEditing && (
        <div className="edit-list">
          <h2>Editing {editedList.name}</h2>
          <input
            type="text"
            className="edit-input"
            value={editedList.name}
            onChange={(e) => setEditedList({ ...editedList, name: e.target.value })}
          />
          {/* Add other fields to edit as needed */}
          <button onClick={handleSaveEdit}>Save Changes</button>
        </div>
      )}

      <button onClick={handleSave}>Save Current List</button>
    </div>
  );
}

export default Listing;
