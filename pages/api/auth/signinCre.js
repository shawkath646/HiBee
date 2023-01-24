import { getDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase';

export default async function handler(req, res) {
  if (!req.method === "POST") {
    return res.status(405).send("Only POST request is accepted");
  }
  const data = req.body;
  if (!data.email || !data.password) {
    res.status(400).json({ data: 'First or last name not found' })
  } else {
    const userName = data.email.replace(/@.*$/,"");
    const userSnap  = await getDoc(doc(db, 'users', userName));
    if(userSnap.exists()) {
      res.status(200).json({ status: true });
      return userSnap.data();
    };
    res.status(404).send("User not exists")
  };
};