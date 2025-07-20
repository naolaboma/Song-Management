import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSongsRequest,
  updateSongRequest,
  deleteSongRequest,
} from "../reducers/songsSlice";
import styled from "@emotion/styled";
import "./SongsList.css";

const ListContainer = styled.div`
  margin-top: 20px;
`;

const SongItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const ITEMS_PER_PAGE = 5;

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const SongsList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.songs);

  const [currentPage, setCurrentPage] = useState(0);
  const [editingSong, setEditingSong] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
  });
  const [currentSongs, setCurrentSongs] = useState([]);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  useEffect(() => {
    const offset = currentPage * ITEMS_PER_PAGE;
    setCurrentSongs(list.slice(offset, offset + ITEMS_PER_PAGE));
  }, [currentPage, list]);

  const handleUpdate = (song) => {
    const updatedSong = { ...song, title: `${song.title} (Updated)` };
    dispatch(updateSongRequest(updatedSong));
  };

  const handleDelete = (id) => {
    dispatch(deleteSongRequest(id));
  };

  const handlePageChange = ({ selected }) => {
    const validPage = Math.max(
      0,
      Math.min(selected, Math.ceil(list.length / ITEMS_PER_PAGE) - 1)
    );
    setCurrentPage(validPage);
  };

  const handleEditClick = (song) => {
    setEditingSong(song.id);
    setUpdatedDetails({
      title: song.title,
      artist: song.artist,
      album: song.album,
      year: song.year,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSongRequest({ id: editingSong, ...updatedDetails }));
    setEditingSong(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Songs List</h2>
      <ListContainer>
        <ul>
          {currentSongs.map((song) => (
            <SongItem key={song.id}>
              {editingSong === song.id ? (
                <EditForm onSubmit={handleUpdateSubmit}>
                  <input
                    type="text"
                    name="title"
                    value={updatedDetails.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    name="artist"
                    value={updatedDetails.artist}
                    onChange={handleInputChange}
                    placeholder="Artist"
                  />
                  <input
                    type="text"
                    name="album"
                    value={updatedDetails.album}
                    onChange={handleInputChange}
                    placeholder="Album"
                  />
                  <input
                    type="number"
                    name="year"
                    value={updatedDetails.year}
                    onChange={handleInputChange}
                    placeholder="Year"
                  />
                  <Button type="submit">Save</Button>
                  <Button type="button" onClick={() => setEditingSong(null)}>
                    Cancel
                  </Button>
                </EditForm>
              ) : (
                <>
                  {song.title} by {song.artist}
                  <div>
                    <Button onClick={() => handleEditClick(song)}>Edit</Button>
                    <Button onClick={() => handleDelete(song.id)}>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </SongItem>
          ))}
        </ul>
        <PaginationContainer>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={Math.ceil(list.length / ITEMS_PER_PAGE)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </PaginationContainer>
      </ListContainer>
    </div>
  );
};

export default SongsList;
