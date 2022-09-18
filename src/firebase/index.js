import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCNB4J5aPB4Wi5iPxgoc_kF28idnbFxw94",
  authDomain: "final-project-7cd43.firebaseapp.com",
  projectId: "final-project-7cd43",
  storageBucket: "final-project-7cd43.appspot.com",
  messagingSenderId: "582209079266",
  appId: "1:582209079266:web:d311aedc4d412e435d1bbb"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage()


export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const handleLoginWithGoogle = () => signInWithPopup(auth, provider)


export const handleLoginWithEmailAndPassword = async (useremail, userpassword, setError) => {
  try{
    await signInWithEmailAndPassword(auth, useremail, userpassword)
  }catch(e){
    setError(e)
  }
}

export const handleRegisterWithEmailAndPassword = async (useremail, userpassword, name, photo, setError) => {
  try{
    const res = await createUserWithEmailAndPassword(auth, useremail, userpassword)
    updateProfile(res.user , {
      displayName:name,
      photoURL:photo
    })
  }catch(e){
    setError(e)
  }
}

export async function upload(file, currentUser) {
  const fileRef = ref(storage, currentUser.uid + '.png')

  const snapshot = await uploadBytes(fileRef, file)

  const photoURL = await getDownloadURL(fileRef)

  updateProfile(currentUser, {photoURL})

  alert("Uploaded file!")
}

export const handleSignOut = () => signOut(auth)