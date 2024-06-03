import homeImage1 from "../assets/images/home-image-1.jpeg";
import homeImage2 from "../assets/images/home-image-2.jpeg";
import homeImage3 from "../assets/images/home-image-3.jpeg";
import homeImage4 from "../assets/images/home-image-4.jpeg";
import signup from "../assets/images/signup.png";
import logo from "../assets/images/logo.png"
import SubmitFormImage from "../assets/images/submitForm.png";
import Instagram from "../assets/icons/instagram.png";
import empty from "../assets/images/empty.png"
import logosmall from "../assets/images/logo-small.png"
import signIn from "../assets/images/signin.png"
import feedback from "../assets/images/feedback.png"
import homeback from "../assets/images/homeback.png"
import feature from "../assets/images/features.png"
import howitworks from "../assets/images/howitworks.png"

const images = {
  homeImage1,
  Instagram,
  SubmitFormImage,
  signup,
  logo,
  empty,
  logosmall,
  signIn,
  feedback,
  homeback,
  feature,
  howitworks
};

const landingImages = [
  {
    id: 1,
    img: homeImage1,
  },
  {
    id: 2,
    img: homeImage2,
  },
  {
    id: 3,
    img: homeImage3,
  },
  {
    id: 4,
    img: homeImage4,
  },
  
];

const exportObject = { images, landingImages };

export default exportObject;
