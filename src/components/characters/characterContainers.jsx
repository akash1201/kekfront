import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import ReactPaginate from "react-paginate";
import { Link, navigate } from "gatsby";
import CharacterBase from "./characterBase";
import { useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import './weapons.css'
function CharactersContainer({ data, setActive }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const { show } = useSelector((state) => state?.modal);
  // const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(0);
  }, [data]);
  const getWeaponsForPage = () => {
    const startIndex = currentPage * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    endIndex = endIndex > data?.length ? data?.length : endIndex;
    // console.log(data,data.slice(startIndex, endIndex))
    if (data) return data.slice(startIndex, endIndex);
    else return [];
  };

  // handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleNavigate = (item) => {
    if (show) {
      setActive("outfits");
    } else {
      navigate(`/character/${item.id}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        height: "800px",
      }}
    >
      {getWeaponsForPage().map((item) => (
        <div
          style={{
            flex: "0 0 calc(50% - 10px)",
            margin: "5px",
            position: "relative",
          }}
          key={item.id}
        >
          <div onClick={() => handleNavigate(item)}>
            <div
              className="weapon-title"
              title="Click to customize!"
              style={{
                position: "absolute",
                zIndex: "1",
                backgroundColor: item.custom ? "green" : undefined,
              }}
            >
              {item?.name} <br />
              {item?.type && item?.subType ? `{item?.type} | ${item?.subType}` : ''}
            </div>
          </div>
          <Canvas key={item.id} style={{height:'420px',marginTop:'40px'}}>
            <CharacterBase
              glbFile={item.miniModelUrl}
              animations={["Idle", "Walk"]}
            />
          </Canvas>
        </div>
      ))}
      <ReactPaginate
        breakClassName={"item break-me "}
        breakLabel={"..."}
        disabledClassName={"disabled-page"}
        nextClassName={"item next "}
        pageClassName={"item pagination-page "}
        previousClassName={"item previous"}
        pageCount={Math.ceil(data.length ? data.length : 0 / itemsPerPage)}
        nextLabel=">"
        previousLabel="<"
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"item active"}
      />
    </div>
  );
}

export default CharactersContainer;