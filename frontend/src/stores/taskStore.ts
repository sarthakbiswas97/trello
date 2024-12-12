import { create } from "zustand";

interface Task {
  id: string;
  text: string;
  category: string;
  color: string;
}

interface TaskStore {
  tasks: Task[];
  categories: string[];
  inputValue: string;
  editingIndex: number | null;
  editText: string;
  selectedCategory: string;

  setInputValue: (value: string) => void;
  addTodo: () => void;
  deleteTodo: (index: number) => void;
  updateTodo: (index: number) => void;
  setEditingIndex: (index: number | null) => void;
  setEditText: (text: string) => void;
  addCategory: (category: string) => void;
  setTaskCategory: (taskId: string, category: string) => void;
  setSelectedCategory: (category: string) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  categories: ['Work', 'Personal', 'Shopping', 'Important'],
  inputValue: "",
  editingIndex: null,
  editText: "",
  selectedCategory: "",

  setInputValue: (value: string) =>
    set({ inputValue: value }),

  addTodo: () =>
    set((state) => ({
      tasks: [...state.tasks, {
        id: Date.now().toString(),
        text: state.inputValue,
        category: state.selectedCategory,
        color: '#808080'
      }],
      inputValue: "",
      selectedCategory: ""
    })),

  deleteTodo: (index: number) =>
    set((state) => ({
      tasks: state.tasks.filter((_, i) => i !== index),
    })),

  updateTodo: (index: number) =>
    set((state) => ({
      tasks: state.tasks.map((task, i) => 
        i === index 
          ? { ...task, text: state.editText }
          : task
      ),
      editingIndex: null,
      editText: "",
    })),

  setEditingIndex: (index: number | null) =>
    set((state) => ({
      editingIndex: index,
      editText: index !== null ? state.tasks[index].text : ''
    })),

  setEditText: (text: string) =>
    set({ editText: text }), 

  addCategory: (category: string) =>
    set((state) => ({
      categories: [...state.categories, category]
    })),

  setTaskCategory: (taskId: string, category: string) =>
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, category }
          : task
      )
    })),

  setSelectedCategory: (category: string) =>
    set({ selectedCategory: category }),
}));

export default useTaskStore;