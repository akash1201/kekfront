import React, { useEffect, useState } from "react";
import AllCharacters from "../../container/characters/allCharacters";
import CharacterDetail from "../../container/characters/characterDetail";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../redux/types/modalType";
import { toast } from "react-toastify";

const SelectCharacter = () => {
  const [activeSectionKey, setActiveSectionKey] = useState("character");
  const dispatch = useDispatch();
  if (activeSectionKey === 'character') {
    toast.info('Please select a character')
  }
  const selection = {
    character: "Character",
    outfits: "Outfits",
  };
  const handleNavigation = (e) => {
    setActiveSectionKey(e);
  };
  useEffect(() => {
    handleNavigation(activeSectionKey);
  }, [activeSectionKey]);

  const generateBody = () => {
    switch (selection[activeSectionKey]) {
      case selection.character:
        return <AllCharacters setActive={setActiveSectionKey} />;
      case selection.outfits:
        return <CharacterDetail characterid={1} />;
      default:
        return null;
    }
  };
  const handleClose = () => {
    dispatch({ type: HIDE_MODAL });
  };
  return (
    <div className="fixed z-50 h-screen w-screen bg-[#0e0e0e]">
      <div className="relative w-screen h-screen p-4">
        <div className=" cursor-pointer absolute top-3 right-7 z-50" onClick={handleClose}>
          &#x2573;
        </div>
        {generateBody()}
      </div>
    </div>
  );
};

export default SelectCharacter;