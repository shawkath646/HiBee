import { doc, setDoc, serverTimestamp, getDoc, getDocs, updateDoc, collection, where, query } from "firebase/firestore";
import { hash } from "bcrypt";
import { db } from '../../../firebase';
import { emailToUsername } from "../../../utilities/tools";

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
  const userData = {
    id: null,
    name: data.name,
    email: data.email,
    secureInfo: {
      password: data.password ? await hash(data.password, 12) : null,
    },
    image: "",
    userInfo: {
      coverPic: "",
      firstName: data.userInfo.firstName,
      lastName: data.userInfo.lastName,
      dateOfBirth: data.userInfo.dateOfBirth,
      phoneNumber: data.userInfo.phoneNumber,
      country: data.userInfo.country,
      skills: [],
      gender: data.userInfo.gender,
    },
    metaInfo: {
      wizardComplete: true,
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

  try {
    const existingUser = await getDoc(doc(db, 'users', userData.name))
    if (existingUser.exists()) {
      return res.status(403).send({
        status: false,
        errorCode: 403,
        message: 'User already exists !'
      });
    }
    const querySnapshotPhoneNumber = await getDocs(query(collection(db, 'users'), where('phoneNumber', '==', userData.userInfo.phoneNumber)));
    querySnapshotPhoneNumber.forEach(doc => {
      if (doc.exists()) {
        return res.status(403).send({
          status: false,
          errorCode: 403,
          message: 'Phone number already in use !'
        });
      }
    });
    await setDoc(doc(db, 'users', userData.name), userData);
  } catch (error) {
    console.log(error);
    return res.status(400).send({
        status: false,
        statusCode: 405,
        message: 'Invalid data provided to server'
    });
  }
  return res.status(200).send({
    status: true,
    errorCode: 201,
    message: 'User account created successfully'
  });
};

  