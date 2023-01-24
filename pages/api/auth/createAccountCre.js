import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';

export default async function handler(req, res) {
  if (!req.method === "POST") {
    return res.status(405).send("Only POST request is accepted");
  };
  if(!req.body) return res.status(404).json({
    status: false,
    message: "No data",
  });
  const data = JSON.parse(req.body);
  console.log(data)
  if (!data.email || !data.password || !data.firstName || !data.lastName || !data.phoneNumber || !data.dateOfBrith || !data.country) {
    res.status(400).json({ data: 'First or last name not found' })
    console.log("not runn")
  } else {
    const userData = {
      userId: null,
      userName: data.email.replace(/@.*$/,""),
      password: data.password,
      userInfo: {
        profilePic: "",
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBrith: data.dateOfBrith,
        phoneNumber: data.phoneNumber,
        country: data.country,
        skills: [],
      },
      metaInfo: {
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
    console.log("runn")
    const userRef = doc(db, 'users', userData.userName);
    const userSnap  = await getDoc(userRef);
    if(userSnap.exists()) return res.status(403).json({
      status: false,
      message: "user already exists"
    });
    await setDoc(userRef, userData);
    return res.status(200).json({ status: true });
  };
};

  