import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', description: '' });
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // API base URL (using Vite proxy)
  const API_BASE_URL = '/api/notes';

  // Load notes when starting the application
  useEffect(() => {
    console.log('useEffect ejecutándose...'); // Debug log
    const loadNotes = async () => {
      try {
        await fetchNotes();
      } catch (error) {
        console.error('Error en useEffect:', error);
        setError('Error initializing application');
        setLoading(false);
      }
    };
    
    loadNotes();
  }, []);

  // Function to get all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting notes fetch...'); // Debug log
      const response = await fetch(API_BASE_URL);
      console.log('Response received:', response); // Debug log
      if (response.ok) {
        const data = await response.json();
        console.log('Data received:', data); // Debug log
        setNotes(data);
      } else {
        const errorText = await response.text();
        console.error('Server error:', response.status, errorText);
        setError(`Error loading notes: ${response.status}`);
      }
    } catch (error) {
      console.error('Complete error:', error); // Debug log
      setError('Connection error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new note
  const createNote = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.description.trim()) return;

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        setNewNote({ title: '', description: '' });
        setSuccess('Note created successfully!');
        setTimeout(() => setSuccess(null), 3000);
        fetchNotes(); // Reload notes
      } else {
        setError('Error creating note');
      }
    } catch (error) {
      setError('Connection error: ' + error.message);
    }
  };

  // Function to update a note
  const updateNote = async (e) => {
    e.preventDefault();
    if (!editingNote.title.trim() || !editingNote.description.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${editingNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingNote.title,
          description: editingNote.description,
        }),
      });

      if (response.ok) {
        setEditingNote(null);
        setSuccess('Note updated successfully!');
        setTimeout(() => setSuccess(null), 3000);
        fetchNotes(); // Reload notes
      } else {
        setError('Error updating note');
      }
    } catch (error) {
      setError('Connection error: ' + error.message);
    }
  };

  // Function to delete a note
  const deleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Note deleted successfully!');
        setTimeout(() => setSuccess(null), 3000);
        fetchNotes(); // Reload notes
      } else {
        setError('Error deleting note');
      }
    } catch (error) {
      setError('Connection error: ' + error.message);
    }
  };

  // Filter notes by search term
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to clear messages after some time
  const clearMessage = (type) => {
    if (type === 'error') setError(null);
    if (type === 'success') setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-8 relative overflow-hidden">
      {/* Background decorative elements*/}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with title and statistics */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-4 shadow-lg shadow-yellow-400/50">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-3 drop-shadow-lg">
            EzNotes
          </h1>
          <p className="text-xl text-gray-300 mb-6 font-light">Organize your ideas</p>
          <div className="inline-flex items-center bg-yellow-400 text-black px-6 py-3 rounded-full shadow-lg shadow-yellow-400/30 border-2 border-yellow-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-black rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-bold">
                {notes.length} {notes.length === 1 ? 'note saved' : 'notes saved'}
              </span>
            </div>
          </div>
        </div>

        {/* Status messages */}
        {error && (
          <div className="bg-red-900 border-l-4 border-red-500 text-red-300 px-6 py-4 rounded-r-lg mb-6 flex items-center justify-between shadow-lg shadow-red-500/20">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="font-medium">{error}</span>
            </div>
            <button 
              onClick={() => clearMessage('error')}
              className="text-red-400 hover:text-red-300 ml-4 p-1 rounded-full hover:bg-red-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}

        {success && (
          <div className="bg-yellow-900 border-l-4 border-yellow-400 text-yellow-200 px-6 py-4 rounded-r-lg mb-6 flex items-center justify-between shadow-lg shadow-yellow-400/20">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="font-medium">{success}</span>
            </div>
            <button 
              onClick={() => clearMessage('success')}
              className="text-yellow-400 hover:text-yellow-300 ml-4 p-1 rounded-full hover:bg-yellow-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}

        {/* Form to create new note */}
        <div className="bg-yellow-400 rounded-2xl shadow-2xl shadow-yellow-400/30 p-8 mb-8 border-2 border-yellow-500 backdrop-blur-sm">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-black rounded-lg mr-4 shadow-lg">
              {editingNote ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-bold text-black">
              {editingNote ? 'Edit Note' : 'New Note'}
            </h2>
          </div>
          <form onSubmit={editingNote ? updateNote : createNote} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter a descriptive title..."
                className="w-full p-4 border-2 border-black rounded-xl focus:outline-none focus:ring-4 focus:ring-black focus:border-black transition-all duration-200 text-black placeholder-gray-600 bg-white font-medium shadow-inner"
                value={editingNote ? editingNote.title : newNote.title}
                onChange={(e) =>
                  editingNote
                    ? setEditingNote({ ...editingNote, title: e.target.value })
                    : setNewNote({ ...newNote, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Description
              </label>
              <textarea
                placeholder="Write your note content here..."
                className="w-full p-4 border-2 border-black rounded-xl h-44 resize-none focus:outline-none focus:ring-4 focus:ring-black focus:border-black transition-all duration-200 text-black placeholder-gray-600 leading-relaxed bg-white font-medium shadow-inner"
                value={editingNote ? editingNote.description : newNote.description}
                onChange={(e) =>
                  editingNote
                    ? setEditingNote({ ...editingNote, description: e.target.value })
                    : setNewNote({ ...newNote, description: e.target.value })
                }
                required
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 bg-black hover:bg-gray-800 text-yellow-400 font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-black"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {editingNote ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  )}
                </svg>
                {editingNote ? 'Update Note' : 'Create Note'}
              </button>
              {editingNote && (
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="flex items-center justify-center px-8 py-3 bg-gray-700 hover:bg-gray-600 text-yellow-400 font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-gray-600"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Notes list */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-400 rounded-lg mr-4 shadow-lg shadow-yellow-400/50">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">My Notes</h2>
                {filteredNotes.length !== notes.length && (
                  <p className="text-sm text-gray-400 mt-1">
                    Showing {filteredNotes.length} of {notes.length} notes
                  </p>
                )}
              </div>
            </div>
            
            {/* Enhanced search bar */}
            <div className="relative w-full lg:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search your notes..."
                className="w-full pl-12 pr-12 py-4 border-2 border-yellow-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 text-black placeholder-gray-600 bg-white font-medium shadow-lg shadow-yellow-400/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-6 shadow-lg shadow-yellow-400/50">
                <svg className="w-8 h-8 text-black animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Loading your notes</h3>
              <p className="text-gray-400">Please wait a moment...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-6 shadow-lg shadow-yellow-400/50">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {searchTerm ? 'No results' : 'No notes yet'}
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {searchTerm 
                  ? `We couldn't find notes matching "${searchTerm}". Try different terms.`
                  : 'Start creating your first note using the form above. It\'s easy and quick.'
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredNotes.map((note) => (
                <div key={note._id} className="group bg-yellow-400 rounded-2xl shadow-2xl border-2 border-yellow-500 hover:shadow-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-black line-clamp-2 group-hover:text-gray-800 transition-colors duration-200">
                        {note.title}
                      </h3>
                      <div className="flex gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => setEditingNote(note)}
                          className="p-2 text-black hover:text-gray-800 hover:bg-yellow-300 rounded-lg transition-all duration-200 border border-black"
                          title="Edit note"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteNote(note._id)}
                          className="p-2 text-black hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200 border border-black"
                          title="Delete note"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-black mb-6 line-clamp-4 text-sm leading-relaxed font-medium">
                      {note.description}
                    </p>
                  </div>
                  <div className="px-6 py-4 bg-black border-t-2 border-yellow-500">
                    <div className="flex items-center justify-between text-xs text-yellow-400">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="font-medium">
                          {new Date(note.createdAt).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="font-medium">{(note.description || '').length} characters</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
