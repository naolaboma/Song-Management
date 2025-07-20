import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SongsList from "./SongsList";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("SongsList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      songs: {
        list: [
          {
            id: 1,
            title: "Tizita",
            artist: "Muluken Melesse",
            album: "Ethiopian Classics",
            year: 1970,
          },
          {
            id: 2,
            title: "Yene Habesha",
            artist: "Teddy Afro",
            album: "Tikur Sew",
            year: 2012,
          },
          {
            id: 3,
            title: "Abebayehosh",
            artist: "Aster Aweke",
            album: "Kabu",
            year: 1991,
          },
          {
            id: 4,
            title: "Song 4",
            artist: "Artist 4",
            album: "Album 4",
            year: 2000,
          },
          {
            id: 5,
            title: "Song 5",
            artist: "Artist 5",
            album: "Album 5",
            year: 2001,
          },
          {
            id: 6,
            title: "Song 6",
            artist: "Artist 6",
            album: "Album 6",
            year: 2002,
          }, // page 2
        ],
        loading: false,
        error: null,
      },
    });
  });

  it("renders the list of songs", () => {
    render(
      <Provider store={store}>
        <SongsList />
      </Provider>
    );

    expect(screen.getByText(/Tizita by Muluken Melesse/i)).toBeInTheDocument();
    expect(screen.getByText(/Yene Habesha by Teddy Afro/i)).toBeInTheDocument();
    expect(screen.getByText(/Abebayehosh by Aster Aweke/i)).toBeInTheDocument();
  });

  it("displays the edit form when Edit button is clicked", () => {
    render(
      <Provider store={store}>
        <SongsList />
      </Provider>
    );

    fireEvent.click(screen.getAllByText("Edit")[0]);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Artist")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Album")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Year")).toBeInTheDocument();
  });

  it("dispatches updateSongRequest when the edit form is submitted", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SongsList />
      </Provider>
    );

    fireEvent.click(screen.getAllByText("Edit")[0]);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Song" },
    });
    fireEvent.change(screen.getByPlaceholderText("Artist"), {
      target: { value: "Updated Artist" },
    });
    fireEvent.change(screen.getByPlaceholderText("Album"), {
      target: { value: "Updated Album" },
    });
    fireEvent.change(screen.getByPlaceholderText("Year"), {
      target: { value: "2026" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "songs/updateSongRequest",
        payload: {
          id: 1,
          title: "Updated Song",
          artist: "Updated Artist",
          album: "Updated Album",
          year: "2026",
        },
      })
    );
  });

  it("dispatches deleteSongRequest when the Delete button is clicked", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SongsList />
      </Provider>
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "songs/deleteSongRequest",
        payload: 1,
      })
    );
  });

  it("navigates between pages using pagination", async () => {
    render(
      <Provider store={store}>
        <SongsList />
      </Provider>
    );

    // Verify initial content on the first page
    expect(screen.getByText(/Tizita by Muluken Melesse/i)).toBeInTheDocument();

    // Go to next page
    fireEvent.click(screen.getByText("Next →"));

    // Wait for DOM update
    await waitFor(() => {
      expect(
        screen.queryByText(/Tizita by Muluken Melesse/i)
      ).not.toBeInTheDocument();
      expect(screen.getByText(/Song 6 by Artist 6/i)).toBeInTheDocument();
    });

    // Go back to previous page
    fireEvent.click(screen.getByText("← Previous"));

    await waitFor(() => {
      expect(
        screen.getByText(/Tizita by Muluken Melesse/i)
      ).toBeInTheDocument();
    });
  });

  it("displays an error message if there is an error", () => {
    store = mockStore({
      songs: {
        list: [],
        loading: false,
        error: "Failed to fetch songs",
      },
    });

    render(
      <Provider store={store}>
        <SongsList />
      </Provider>
    );

    expect(
      screen.getByText("Error: Failed to fetch songs")
    ).toBeInTheDocument();
  });
});
