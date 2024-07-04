import React, { useState } from "react";

function SearchAndSortAlbum(props) {
  const [searchType, setSearchType] = useState();
  const albums = props.albums;

  function selectSearchType(event) {
    let foundsArr;
    if (event.target.value == "all") {
      foundsArr = props.originalAlbums.map((t, i) => {
        if (t != null) return { ...t, originalIndex: i, editable: false };
      });
      props.setalbums(foundsArr.filter((t) => t != null));
      setSearchType();
    } else setSearchType(event.target.value);
  }
  function searchalbums(event) {
    let foundsArr, foundIndex;
    const { name, value } = event.target;
    foundsArr = props.originalAlbums.map((t, i) => {
      if (t != null && t[name].toString().includes(value))
        return { ...t, originalIndex: i, editable: false };
    });
    props.setalbums(foundsArr.filter((t) => t != null));
  }
  function sortalbums(event) {
    event.preventDefault();
    let sortArr = albums.slice();
    switch (event.target.value) {
      case "creation date":
        props.setalbums(sortArr.sort((a, b) => a.creationdate - b.creationdate));
        break;
      case "alphabet":
        props.setalbums(
          sortArr.sort((a, b) =>
            a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
          )
        );
        break;
      case "random":
        props.setalbums(sortArr.sort(() => (Math.random() > 0.5 ? -1 : 1)));
        break;
    }
  }
  return (
    <>
      <div className="search-sort">
        <div className="sort">
        <label htmlFor="sort">order by</label>
        <select onChange={sortalbums} name="sort">
          <option value="all"> </option>
          <option value="creation date">creation date</option>
          <option value="alphabet">alphabet</option>
          <option value="random">random</option>
        </select>
        <br />
        </div>
        <div className="search">
        <label htmlFor="search">search by</label>
        <select onChange={selectSearchType} name="search">
          <option value="all"></option>
          <option value="albumId">id</option>
          <option value="name">title</option>
          <option value="childName">child name</option>
        </select>
        <div 
        className="input-con"
        >
          {searchType ? (
            searchType == "id" ? (
              <>
                <label htmlFor="id">id</label>
                <input
                  type="text"
                  name="id"
                  onChange={(event) => searchalbums(event)}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  name={searchType}
                  onChange={(event) => searchalbums(event)}
                />
              </>
            )
          ) : (
            <></>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
export default SearchAndSortAlbum;
