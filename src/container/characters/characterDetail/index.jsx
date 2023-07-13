import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls, OrbitControls } from '@react-three/drei'
import CQBMaster_custom from '../../../assets/weaponJsx/CQBMaster-custom';
import { getUniqueOutfitOptionType, getCharacterOutfits, getCharacterDetails, saveCharacter } from "../../../service/characters";
import Loader from '../../../components/loadingidicator/loader'
import SK_Military_Character6 from '../../../assets/characterJsx/SK_Military_Charcter6'
// import "./weaponDetail.css"
import Button from '../../../components/shared/button';
import SwitchCharacter from './characterSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_MODAL } from '../../../redux/types/modalType';
const CharacterDetail = ({ characterid }) => {
    const [defaultCharacter, setDefaultCharacter] = useState(true)
    const [outfit, setOutfits] = useState({
        Backpack: "",
        Decals: "",
        Eyewear: "",
        Footwear: "",
        Gloves: "",
        Headgear: "",
        Headset: "",
        Pants: "",
        Shirts: "",
        Vest: "",
        Vest_Attachments: "",
        Extras: "",
        Headwear: "",

    })
    const [outfitData, setOutfitData] = useState(null);
    const [animation, setanimation] = useState(null);
    const [uniqueOutfits, setUniqueOutfits] = useState([]);
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state?.auth);
    const fetchCharacterData = () => {
        Promise.all([getCharacterDetails(characterid), getUniqueOutfitOptionType(characterid), getCharacterOutfits(characterid)]).then((combined) => {
            console.log(combined);
            let characterDetails = combined[0]
            let uniqueOutfits = combined[1]
            let allOutfits = combined[2]

            console.log(characterDetails.minRequiredOutfits, "characterDetails");
            const validJSONString = characterDetails.minRequiredOutfits.replace(/'/g, '"');
            const requiredOutfit = JSON.parse(validJSONString);


            setUniqueOutfits(uniqueOutfits);
            console.log(uniqueOutfits,"uniqueOutfits")

            let groupedAttachments = allOutfits.reduce((acc, curr) => {
                if (acc[curr.type]) {
                  acc[curr.type].push(curr);
                } else {
                  acc[curr.type] = [curr];
                }
                return acc;
              }, {});

            setOutfitData(groupedAttachments);
            if (requiredOutfit.includes('shirt')) {
                setOutfits({...outfit, Shirts: groupedAttachments.Shirts[0].name });
                
            }
            if (requiredOutfit.includes('pant')) {
                setOutfits({...outfit, Pants: groupedAttachments.Pants[0].name });
                
            }
            if (requiredOutfit.includes('boots')) {
                setOutfits({...outfit, Footwear: groupedAttachments.Footwear[0].name });
            }
          });
    }
    useEffect(() => {
        fetchCharacterData()
    }, [])


    const getCharacter = (characterid) => {
        if(characterid){
            const Switcher = SwitchCharacter[characterid];
            return (
                <Switcher
                key={characterid} // or something unique
                animation={animation}
                backpack={outfit.Backpack}
                decal={outfit.Decals}
                extras={outfit.Extras}
                eyewear={outfit.Eyewear}
                footwear={outfit.Footwear}
                // gloves={selectedGloves}
                headgear={outfit.Headgear}
                headset={outfit.Headset}
                pant={outfit.Pants}
                shirt={outfit.Shirts}
                vest={outfit.Vest}
                vest_attachments={outfit.Vest_Attachments}
                // {...section.fields}
                />
            );
        }
       
    }
    let x =0;
    const handleCanvasClick = () => {
        x=x+1;
        setanimation(x)
    }
    if (userInfo?.userCharacter?.length) {
        setDefaultCharacter(false)
    }  
    const handleSave = () => {
        const obj = {
            character_id: characterid,
            outfit,
            default: defaultCharacter
        }
        console.log(obj)
        saveCharacter(userInfo.userId, obj)
        dispatch({type: HIDE_MODAL})
    }
    const handleChange = (e) => {
        setOutfits({...outfit, [e.target.name]: e.target.value})
    }

  return (
    <div style={{ position: 'relative', backgroundImage: 'url(../../assets/images/weaponConfigBG.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
    <div className=' flex items-center justify-center flex-wrap px-2'>

        <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'headset') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Headset</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" name='Headset' value={outfit.Headset} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {outfitData?.Headset?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a>
        <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'headgear') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Headgear</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" name='Headgear' value={outfit.Headgear} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {outfitData?.Headgear?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
              </a>
         <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'eyewear') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
             <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Eyewear</label>
             <br></br><hr></hr>
             <select id="selectDropdown3" name='Eyewear' value={outfit.Eyewear} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
             <option>None</option>
              {outfitData?.Eyewear?.map(option => (
                <option key={option.id} value={option.value}>{option.name}</option>
               ))}
             </select>
        </a>
        <a onClick={handleSave} style={{  margin:'20px', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' }}>
           <Button>Save</Button>
        </a>
          </div>
          <div className="flex lg:flex-row flex-col ">
                <div className="flex flex-col items-center justify-evenly">
                    <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'decals') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding:       '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
                       <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Decals</label>
                       <br></br><hr></hr>
                       <select id="selectDropdown3" name='Decals' value={outfit.Decals} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                            <option>None</option>
                            {outfitData?.Decals?.map(option => (
                            <option key={option.id} value={option.value}>{option.name}</option>
                            ))}
                       </select>
                    </a>
                    <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'shirts') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
                        <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Shirt</label>
                        <br></br><hr></hr>
                        <select id="selectDropdown3" name='Shirts' value={outfit.Shirts} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                                <option>None</option>
                                {outfitData?.Shirts?.map(option => (
                                <option key={option.id} value={option.value}>{option.name}</option>
                            ))}
                        </select>
                    </a>
                </div>
            <Canvas onClick={handleCanvasClick} style={{ width: '100%', height: '600px', maxWidth: '800px', margin: '20px auto' }}>
            <mesh>
                <ambientLight intensity={0.6} />
                <spotLight intensity={0.8} position={[0, 0, 0]} />
                <Suspense fallback={<Loader />}>
                    <Stage intensity={2}>
                        {getCharacter(characterid)}
                    </Stage>
                </Suspense>
            </mesh>
            <OrbitControls></OrbitControls>
            </Canvas>
              <div className="flex flex-col items-center justify-evenly">
              <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'footwear') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
                    <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Footwear</label>
                    <br></br><hr></hr>
                    <select id="selectDropdown3" name='Footwear' value={outfit.Footwear} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                        <option>None</option>
                        {outfitData?.Footwear?.map(option => (
                            <option key={option.id} value={option.value}>{option.name}</option>
                        ))}
                    </select>
              </a> 
                <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'pants') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
                    <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Pants</label>
                    <br></br><hr></hr>
                    <select id="selectDropdown3" name='Pants' value={outfit.Pants} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                        <option>None</option>
                        {outfitData?.Pants?.map(option => (
                            <option key={option.id} value={option.value}>{option.name}</option>
                        ))}
                    </select>
                </a>
              </div>
          </div>



    <div id='dropdowns' className='flex items-center justify-center flex-wrap px-2'>
        <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'backpack') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Backpack</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" name='Backpack' value={outfit.Backpack} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {outfitData?.Backpack?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a>
        <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'vest attachments') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
                      <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Vest Attachments</label>
                      <br></br><hr></hr>
                      <select id="selectDropdown3" name='Vest_Attachments' value={outfit.Vest_Attachments} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                        <option>None</option>
                        {outfitData?.['Vest Attachments']?.map(option => (
                            <option key={option.id} value={option.value}>{option.name}</option>
                        ))}
                      </select>
        </a>
        <a style={uniqueOutfits.some(item => item.trim().toLowerCase() === 'extras') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Extras</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" name='Extras' value={outfit.Extras} onChange={handleChange} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {outfitData?.Extras?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a>
    </div>
  </div>
  
  );
};

export default CharacterDetail;