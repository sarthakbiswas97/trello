import { MdTaskAlt, MdEdit, MdDelete, MdSave, MdCancel, MdAdd } from "react-icons/md";
import useTaskStore from "@/stores/taskStore.js";
import React, { useState } from "react";

function TaskTodo() {
  const {
    tasks,
    categories,
    inputValue,
    editingIndex,
    editText,
    selectedCategory,
    addCategory,
    setSelectedCategory,
    setInputValue,
    addTodo,
    deleteTodo,
    setEditingIndex,
    setEditText,
    updateTodo
  } = useTaskStore();

  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    addTodo();
  };

  const handleAddCategory = () => {
    setShowCategoryInput(true);
  };

  const handleSaveCategory = () => {
    if (newCategoryValue.trim()) {
      addCategory(newCategoryValue.trim());
      setNewCategoryValue("");
      setShowCategoryInput(false);
    }
  };

  const handleCancelCategory = () => {
    setNewCategoryValue("");
    setShowCategoryInput(false);
  };

  return (
    <div className="min-h-screen bg-gray-300 p-4">
      <div className="max-w-lg mx-auto bg-slate-100 p-4 rounded">
        <form onSubmit={handleSubmit} className="mb-4">
          <div>
            <div className="flex items-center mb-4">
              <MdTaskAlt size={24} />
              <label className="ml-2">Task List</label>
            </div>
            <div className="space-y-2">
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Add a new task"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 p-2 border rounded"
                >
                  <option value="">No category</option>
                  {categories.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="flex items-center gap-1 px-3 border rounded"
                >
                  <MdAdd size={20} />
                  New
                </button>
              </div>
              {showCategoryInput && (
                <div className="p-2 border rounded">
                  <input
                    type="text"
                    value={newCategoryValue}
                    onChange={(e) => setNewCategoryValue(e.target.value)}
                    placeholder="Enter category name"
                    className="w-full p-2 border rounded mb-2"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleCancelCategory}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCategory}
                      disabled={!newCategoryValue.trim()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="flex items-center justify-center gap-1 w-full p-2 border rounded"
                disabled={inputValue.trim() === ""}
              >
                <MdAdd size={20} />
                Add Task
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="border rounded p-2"
            >
              {editingIndex === index ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => updateTodo(index)}>
                      <MdSave size={18} /> Save
                    </button>
                    <button onClick={() => setEditingIndex(null)}>
                      <MdCancel size={18} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span>{task.text}</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-red-400">
                      {task.category || "No category"}
                    </span>
                    <button onClick={() => setEditingIndex(index)}>
                      <MdEdit size={16} />
                    </button>
                    <button onClick={() => deleteTodo(index)} className="ml-2">
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center p-4">
              Add your first task!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskTodo;