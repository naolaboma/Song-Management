import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SongForm from "./SongForm";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("SongForm Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      songs: {
        list: [],
        loading: false,
        error: null,
      },
    });
  });

  it("renders the form inputs and submit button", () => {
    render(
      <Provider store={store}>
        <SongForm />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Artist")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Album")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Year")).toBeInTheDocument();
    expect(screen.getByText("Add Song")).toBeInTheDocument();
  });

  it("dispatches addSongRequest when the form is submitted", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SongForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Song" },
    });
    fireEvent.change(screen.getByPlaceholderText("Artist"), {
      target: { value: "Test Artist" },
    });
    fireEvent.change(screen.getByPlaceholderText("Album"), {
      target: { value: "Test Album" },
    });
    fireEvent.change(screen.getByPlaceholderText("Year"), {
      target: { value: "2025" },
    });

    fireEvent.click(screen.getByText("Add Song"));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "songs/addSongRequest",
        payload: {
          title: "Test Song",
          artist: "Test Artist",
          album: "Test Album",
          year: "2025",
        },
      })
    );
  });
});
