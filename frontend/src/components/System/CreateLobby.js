// src/components/System/CreateLobby.js
import React, { useState } from 'react';

function CreateLobby({ onCreateLobby }) {
  const [lobbyName, setLobbyName] = useState('');
  const [description, setDescription] = useState('');
  const [wordWarning, setWordWarning] = useState('');
  const [showModal, setShowModal] = useState(false);
  // Added state for password
  const [password, setPassword] = useState('');

  const handleDescriptionChange = (e) => {
    const input = e.target.value;
    const wordCount = input.trim().split(/\s+/).length;

    if (wordCount > 50) {
      setWordWarning('Description must be 50 words or less.');
    } else {
      setWordWarning('');
    }
    setDescription(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lobbyName.trim() && wordWarning === '') {
      onCreateLobby(lobbyName, description, password); // Passing the password too
      setLobbyName('');
      setDescription('');
      setPassword(''); // Reset the password field
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-full shadow-md hover:shadow-purple-500/50 hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => setShowModal(true)}
      >
        + Create Lobby
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform scale-100 animate-popIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-extrabold mb-4 text-purple-700 text-center">
              Create New Lobby
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Lobby name"
                value={lobbyName}
                onChange={(e) => setLobbyName(e.target.value)}
                required
                className="w-full mb-4 p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-medium"
              />

              <textarea
                placeholder="Description (max 50 words)"
                value={description}
                onChange={handleDescriptionChange}
                className="w-full mb-2 p-3 border-2 border-purple-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 font-medium"
              />

              {/* Added password field */}
              <input
                type="password"
                placeholder="Lobby Password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-3 border-2 border-purple-300 rounded-lg"
              />

              {wordWarning && (
                <p className="text-red-500 text-sm mb-2">{wordWarning}</p>
              )}

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="submit"
                  disabled={!!wordWarning}
                  className={`px-5 py-2 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${
                    wordWarning
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 hover:shadow-md hover:shadow-indigo-500/50'
                  }`}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateLobby;
