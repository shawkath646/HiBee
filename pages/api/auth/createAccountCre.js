import { doc, addDoc, serverTimestamp, getDocs, updateDoc, collection, where, query } from "firebase/firestore";
import { hash } from "bcrypt";
import { db } from '../../../firebase';

export default async function handler(req, res) {
  if (!req.method === "POST") {
    return res.status(400).send("Only POST request is accepted");
  };
  if(!req.body) return res.status(404).send({
    status: false,
    errorCode: 405,
    message: 'Invalid data provided to server'
  });
  const data = JSON.parse(req.body);
  if (!data.email || !data.password || !data.firstName || !data.lastName || !data.phoneNumber || !data.dateOfBrith || !data.country || !data.gender || !data.userName) {
    return res.status(400).send({
      status: false,
      errorCode: 404,
      message: 'One of data field is empty'
    });
  };
  const userData = {
    id: null,
    name: data.userName,
    email: data.email,
    secureInfo: {
      password: await hash(data.password, 12),
    },
    userInfo: {
      profilePic: "",
      coverPic: "",
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      country: data.country,
      skills: [],
      gender: data.gender,
    },
    metaInfo: {
      wizardComplete: false,
      premium: false,
      strict: 0,
      followers: [],
      description: "",
      following: []
    },
    creationInfo: {
      timestamp: serverTimestamp(),
      createdDevice: ""
    }
  }

  const querySnapshotUserName = await getDocs(query(collection(db, 'users'), where('userName', '==', userData.name)));
  querySnapshotUserName.forEach(doc => {
    if (doc.exists()) {
      return res.status(403).send({
        status: false,
        errorCode: 403,
        message: 'User already exists'
      });
    }
  });
  const querySnapshotPhoneNumber = await getDocs(query(collection(db, 'users'), where('phoneNumber', '==', userData.userInfo.phoneNumber)));
  querySnapshotPhoneNumber.forEach(doc => {
    if (doc.exists()) {
      return res.status(403).send({
        status: false,
        errorCode: 403,
        message: 'Phone number already used !'
      });
    }
  });

  const userRef = await addDoc(collection(db, 'users'), userData);

  const uid = userRef.id;

  await updateDoc(userRef, {
    id: uid,
  })
  .then(docRef => {
    return res.status(200).send({
      status: true,
      errorCode: 201,
      message: 'User account created successfully'
    });
  });
};

  