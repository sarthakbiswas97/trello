import { create } from "zustand";

type TaskStore = {
  todos: string[];
  inputValue: string;
  editingIndex: number | null;
  editText: string;

  setInputValue: (value: string) => void;
  addTodo: () => void; 
  deleteTodo: (index: number) => void;
  updateTodo: (index: number) => void; 
  setEditingIndex: (index: number | null) => void;
  setEditText: (text: string) => void;
};

const useTaskStore = create<TaskStore>((set) => ({
  todos: [],
  inputValue: "",
  editingIndex: null,
  editText: "",

  setInputValue: (value: string) =>
    set(() => ({
      inputValue: value,
    })),

  addTodo: () =>
    set((state) => ({
      todos: [...state.todos, state.inputValue],
      inputValue: "",
    })),

  deleteTodo: (index: number) =>
    set((state) => ({
      todos: state.todos.filter((_, i) => i !== index),
    })),

  updateTodo: (index: number) =>
    set((state) => ({
      todos: state.todos.map((todo, i) => (i === index ? state.editText : todo)),
      editingIndex: null,
      editText: "",
    })),

  setEditingIndex: (index: number | null) =>
    set((state) => ({
      editingIndex: index,
      editText: index !== null ? state.todos[index] : ''
    })),

  setEditText: (text: string) =>
    set(() => ({
      editText: text,
    })),
}));

export default useTaskStore;