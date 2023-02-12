import { doc, getDoc, updateDoc, collection, where, query } from "firebase/firestore";
import { db } from '../../../firebase';

export default async function handler(req, res) {
    if (!req.method === "POST") {
      return res.status(400).send("Only POST request is accepted");
    };
    if(!req.body) return res.status(404).send({
      status: false,
      statusCode: 405,
      message: 'Invalid data provided to server'
    });
    const data = JSON.parse(req.body);
    try {
        const existingUser = await getDoc(doc(db, 'users', data.name));
        if (existingUser.exists()) {
            console.log(existingUser.data())
            const userInfo = existingUser.data();
            await updateDoc(doc(db, 'users', userInfo.name), data, { merge: true })
        } else {
            await fetch(`${process.env.BASE_URL}/api/auth/createAccount`, {
                method: "POST",
                body: req.body,
            })
            .then(res => {
                return res;
            })
        }
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
        statusCode: 200,
        message: 'Data updated successfully'
    })
}