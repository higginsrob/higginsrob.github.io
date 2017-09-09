import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '@/types';

interface ProjectsState {
  projects: Project[];
  filteredProjects: Project[];
  selectedCategory: string | null;
  isLoading: boolean;
}

const initialState: ProjectsState = {
  projects: [],
  filteredProjects: [],
  selectedCategory: null,
  isLoading: false,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.filteredProjects = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      if (action.payload === null) {
        state.filteredProjects = state.projects;
      } else {
        state.filteredProjects = state.projects.filter(
          project => project.category === action.payload
        );
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProjects, setSelectedCategory, setIsLoading } = projectsSlice.actions;
export default projectsSlice.reducer;