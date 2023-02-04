import maleProfilePic from './profilePicGenerator/user-g97baa02ee_1280.png';
import femaleProfilePic from './profilePicGenerator/user-gd2c4da885_1280.png';

export default function profilePicGenerator(gender) {
    if (gender === "Female") {
        return femaleProfilePic.src;
    }
    return maleProfilePic.src;
    
}