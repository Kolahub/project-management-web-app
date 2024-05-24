import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import profilePic from '../assets/person-circle.svg';
import closeImg from '../assets/x-octagon-fill.svg';

import { app } from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore';

function Profile() {
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: '',
  });
  const [show, setShow] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  const navigate = useNavigate('/')

  onAuthStateChanged(auth, user => {
    if (user) {
      const userRef = doc(db, 'UserInfo', user.uid);
      getDoc(userRef).then(cred => {
        setInfo(prevState => {
          return {
            ...prevState,
            firstName: cred.data().firstName,
            lastName: cred.data().lastName,
            email: user.email,
            imageUrl: cred.data().imageUrl,
          };
        });
      });
    }
  });

  let profileInfoCss = 'fixed top-0 bottom-0 left-0 right-0 bg-stone-600/30';

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const user = auth.currentUser;
        const userRef = doc(db, 'UserInfo', user.uid);
        await updateDoc(userRef, {
          imageUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (show) {
    profileInfoCss += ' ';
  } else {
    profileInfoCss += ' hidden';
  }

  function handleClose() {
    setShow(false);
  }

  function handleOpen() {
    setShow(true);
  }

  function handleLogout () {
    signOut(auth).then(() => navigate('/'))}

  return (
    <section>
      <div className={profileInfoCss}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-7 bg-white">
          <button onClick={handleClose}>
            <img src={closeImg} alt="" className="w-9 active:scale-90" />
          </button>
          {info.imageUrl !== '' ? (
            <img src={info.imageUrl} alt="" className="w-72 h-72 object-cover rounded-full mx-auto" />
          ) : (
            <img src={profilePic} alt="" className="w-72 h-72 object-cove rounded-full mx-auto" />
          )}
          <input type="file" accept="image/*" onChange={e => handleImageChange(e)} className="mt-9 mb-4" />
          <ul className="text-2xl font-semibold text-stone-700">
            <li>First name: {info.firstName}</li>
            <li>Last name: {info.lastName}</li>
            <li>Email: {info.email}</li>
          </ul>

    <button onClick={handleLogout} className='w-28 mt-4 p-3 bg-stone-900 text-white text-xl rounded'>Logout</button>



    

        </div>
      </div>
      <div className="flex gap-3 items-center">
      <button className="bg-slate-500 mt-4 rounded-full ml-6" onClick={handleOpen}>
        {info.imageUrl !== '' ? <img src={info.imageUrl} alt="" className="w-16 h-16  object-cover rounded-full" /> : <img src={profilePic} alt="" className="w-16 h-16 object-cover rounded-full" />}
      </button>
    <h2 className='font-semibold text-2xl'>Welcome, {info.firstName}</h2>
    </div>

    </section>
  );
}

export default Profile;
