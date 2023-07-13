import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls, OrbitControls } from '@react-three/drei'
import { getUniqueWeaponAttachmentType, getWeaponAttachments } from "../../../service/weapons";
import Loader from '../../../components/loadingidicator/loader'
import "./weaponDetail.css"
import Button from '../../../components/shared/button';
import SwitchWeapon from './weaponSwitcher'
import { TextureLoader } from 'three';
const WeaponDetails = ({weaponid}) => {



    const [selectedSights, setselectedSights] = useState(null);
    const [selectedMag, setselectedMag] = useState(null);
    const [selectedUnderbarrel, setselectedUnderbarrel] = useState(null);
    const [selectedMuzzle, setselectedMuzzle] = useState(null);
    const [attachmentData, setattachmentData] = useState(null);
    const [selectedSideRail, setselectedSideRail] = useState(null);
    
    const [selectedTexture, setselectedTexture] = useState(null);


    const [uniqueAttachments, setUniqueAttachments] = useState([]);

    const fetchGunData = () => {


        getUniqueWeaponAttachmentType(weaponid)
        .then(uniqueAttachments => {
            setUniqueAttachments(uniqueAttachments);
            console.log(uniqueAttachments)
        })
        getWeaponAttachments(weaponid)
        .then(allAttachments => {
            let groupedAttachments = allAttachments.reduce((acc, curr) => {
                if (acc[curr.type]) {
                  acc[curr.type].push(curr);
                } else {
                  acc[curr.type] = [curr];
                }
                return acc;
              }, {});

            setattachmentData(groupedAttachments);
            console.log(groupedAttachments,"groupedAttachments")
        })
    }
    
    
    const getWeapon = (weaponid) => {
        if(weaponid){
            const Switcher = SwitchWeapon[weaponid];
            return (
                <Switcher
                key={weaponid} // or something unique
                sight={selectedSights} 
                muzzle={selectedMuzzle}
                underBarrel={selectedUnderbarrel}
                magazine={selectedMag}
                sideRail={selectedSideRail}
                // {...section.fields}

                normalMap={selectedTexture?.normalMap} 
                aoMap={selectedTexture?.aoMap} 
                metalnessMap={selectedTexture?.metalnessMap}
                />
            );
        }
       
    }
    useEffect(() => {
        fetchGunData()
    }, [])

  useEffect(() => {
    const fetchTextures = async () => {
      const textureLoader = new TextureLoader();
      const [metalnessMap, normalMap, aoMap] = await Promise.all([
        textureLoader.load('https://ac-dev-s3.s3.us-west-1.amazonaws.com/materials/SM_Military_Rifle1_Rifle1_MetallicSmoothness.png'),
        textureLoader.load('https://ac-dev-s3.s3.us-west-1.amazonaws.com/materials/SM_Military_Rifle1_Rifle1_Normal.png'),
        textureLoader.load('https://ac-dev-s3.s3.us-west-1.amazonaws.com/materials/SM_Military_Rifle1_Rifle1_AlbedoTransparency.png'),
      ]);
      setselectedTexture({ metalnessMap, normalMap, aoMap });
    };

    fetchTextures();
  }, []);
    
  return (
    <div style={{ position: 'relative', backgroundImage: 'url(../../assets/images/weaponConfigBG.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
    <div id="dropdowns" style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px', margin: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)' }}>
        <a style={uniqueAttachments.some(item => item.trim().toLowerCase() === 'sight') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Sight</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" onChange={(e) => setselectedSights(e.target.value)} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {attachmentData?.Sight?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a>
        <a style={uniqueAttachments.some(item => item.trim().toLowerCase() === 'barrel') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Barrel</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" onChange={(e) => setselectedMuzzle(e.target.value)} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {attachmentData?.Barrel?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a> 
        <a style={uniqueAttachments.some(item => item.trim().toLowerCase() === 'muzzle') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Muzzle</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" onChange={(e) => setselectedMuzzle(e.target.value)} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {attachmentData?.Muzzle?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a>
        <a style={{  margin:'20px', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' }}>
           <Button>Save</Button>
        </a>
    </div>
    
    <Canvas style={{ width: '100%', height: '400px', maxWidth: '800px', margin: '20px auto' }}>
      <mesh>
        <ambientLight intensity={0.6} />
        <spotLight intensity={0.8} position={[10, 0, 0]} />
        <Suspense fallback={<Loader />}>
            <Stage intensity={2}>
                {getWeapon(weaponid)}
            </Stage>
        </Suspense>
      </mesh>
      <OrbitControls></OrbitControls>
    </Canvas>

   <div id="dropdowns" style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px', margin: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)' }}>
        <a style={uniqueAttachments.some(item => item.trim().toLowerCase() === 'magazine') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{ margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Magazine</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" onChange={(e) => setselectedMag(e.target.value)} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {attachmentData?.Magazine?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a>
        <a style={uniqueAttachments.some(item => item.trim().toLowerCase() === 'trigger') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px',padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Trigger</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" onChange={(e) => setselectedMuzzle(e.target.value)} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {attachmentData?.Trigger?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a>
        <a style={uniqueAttachments.some(item => item.trim().toLowerCase() === 'underbarrel') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Under barrel</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" onChange={(e) => setselectedUnderbarrel(e.target.value)} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {attachmentData?.UnderBarrel?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a>
        <a style={uniqueAttachments.some(item => item.trim().toLowerCase() === 'rightrail') ? { margin: '20px', fontSize: '20px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom, #606060, #808080)', opacity: 0.8, borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', color: '#fff' } : {display: 'none'}}>
            <label style={{  margin:'20px', padding: '20px', fontWeight: 'bold' }} htmlFor="selectDropdown1">Side Rail</label>
            <br></br><hr></hr>
            <select id="selectDropdown3" onChange={(e) => setselectedSideRail(e.target.value)} style={{ background: 'rgba(128, 128, 128, 0.5)', border: 'none', padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>
                <option>None</option>
                {attachmentData?.RightRail?.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
        </a>


    </div>
  </div>
  
  );
};

export default WeaponDetails;
