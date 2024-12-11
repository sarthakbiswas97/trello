import { MdTaskAlt, MdEdit, MdDelete, MdSave, MdCancel, MdAdd } from "react-icons/md";
import useTaskStore from "@/stores/taskStore.js";
import React from "react";


function TaskTodo() {
  const {
    todos,
    inputValue,
    editingIndex,
    editText,
    setInputValue,
    addTodo,
    deleteTodo,
    setEditingIndex,
    setEditText,
    updateTodo
  } = useTaskStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    addTodo();
  };

  return (
    <div className="grid place-items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px] border border-gray-100">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <MdTaskAlt size={24} className="text-blue-500" />
              <label htmlFor="taskInput" className="text-blue-800 font-medium text-lg">
                ✨ Task List
              </label>
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-200 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                id="taskInput"
                type="text"
                placeholder="Add a new task"
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                disabled={inputValue.trim() === ""}
              >
                <MdAdd size={20} />
                Add
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 space-y-4">
          {todos.map((todo, index) => (
            <div
              key={index}
              className={`rounded-lg transition-all ${
                editingIndex === index
                  ? "bg-white shadow-lg border border-blue-200"
                  : "bg-blue-50 hover:shadow-md"
              }`}
            >
              {editingIndex === index ? (
                <div className="p-4">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[100px] mb-3"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => updateTodo(index)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                      <MdSave size={18} />
                      Save
                    </button>
                    <button
                      onClick={()=>setEditingIndex(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                      <MdCancel size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center p-4">
                  <MdTaskAlt size={20} className="text-blue-500 mr-3 flex-shrink-0" 

                  />
                  <span className="flex-grow text-gray-800">{todo}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
                    >
                      <MdEdit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
                    >
                      <MdDelete size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No tasks yet. Add your first task above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskTodo;