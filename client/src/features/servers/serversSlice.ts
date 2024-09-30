import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAddServer,
  fetchRemoveServer,
  fetchLoadServers,
  fetchUppdateServer,
} from '../../App/api';
import type { Server, ServerId, ServerWhisOutId, ServerState, FilterParams } from './types';

const initialState: ServerState = {
  servers: [],
  filteredServers: [],
  filterParams: { key: 'desc', stro: '', value: '' },
  error: undefined,
  loading: true,
  selectedLanguage: 'ru',
};
export const loadServers = createAsyncThunk('/servers/load', () => fetchLoadServers());
export const addServer = createAsyncThunk('/servers/add', (server: ServerWhisOutId) =>
  fetchAddServer(server),
);
export const removeServer = createAsyncThunk('/servers/remove', (serverId: ServerId) =>
  fetchRemoveServer(serverId),
);
export const uppdateServer = createAsyncThunk('/servers/:serverId', (server: Server) =>
  fetchUppdateServer(server),
);

const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {

    
    switchToEnglish: (state) => {
      state.selectedLanguage = 'en';
    },
    switchToRussian: (state) => {
      state.selectedLanguage = 'ru';
    },
    setFilterParams(state, action: PayloadAction<FilterParams>) {
      state.filterParams = action.payload;
    },
    setTopServersFilter(state) {
      const { key, stro, value } = state.filterParams;
      console.log({ key, stro, value });

      if (key === 'openAt') {
        state.filteredServers = state.servers.filter(
          (server) => new Date(server[key]).toLocaleDateString() === value,
        );
      } else if (key === 'rating' && value === '11') {
        // console.log(state.servers[2].rating.toString())
        state.filteredServers = state.servers.filter((server) => +server.rating < +value);
      } else if (key === 'rating' && value === '101') {
        state.filteredServers = state.servers.filter((server) => +server.rating > +value);
      } else if (key === 'rating' || key === 'desc' || key === 'chronicles') {
        state.filteredServers = state.servers.filter((server) => server[key] === value);
      } else if (stro === '' && value !== '') {
        console.log(value);
        const numbers = value.split('-').map(Number);
        state.filteredServers = state.servers.filter(
          (server) => +server.rating >= numbers[0] && +server.rating <= numbers[1],
        );
      } else if (stro !== '' && value === '') {
        state.filteredServers = state.servers.filter((server) => server.chronicles === stro);
      } else if (stro !== '' && value !== '') {
        console.log(stro);
        const numbers = value.split('-').map(Number);
        state.filteredServers = state.servers.filter(
          (server) =>
            server.chronicles === stro &&
            +server.rating >= numbers[0] &&
            +server.rating <= numbers[1],
        );
      } else if (stro === '' && value === '') {
        state.filteredServers = state.servers.filter((server) => server);
      }
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadServers.fulfilled, (state, action) => {
        state.servers = action.payload;
      })
      .addCase(loadServers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addServer.fulfilled, (state, action) => {
        state.servers.push(action.payload);
        
      })
      .addCase(addServer.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeServer.fulfilled, (state, action) => {
        state.servers = state.servers.filter((server) => server.id !== +action.payload);
      })
      .addCase(removeServer.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(uppdateServer.fulfilled, (state) => {
      
        // state.users = action.payload.filter((user) =>user.firstName === "Анна")
      })
      .addCase(uppdateServer.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setTopServersFilter, setFilterParams, stopLoading,switchToEnglish,switchToRussian } = serversSlice.actions;
export default serversSlice.reducer;
