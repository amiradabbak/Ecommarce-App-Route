import { createRoot } from 'react-dom/client'
import '@fontsource-variable/cairo';
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@flaticon/flaticon-uicons/css/all/all.css"
import "react-image-gallery/styles/css/image-gallery.css";
import { register } from 'swiper/element/bundle';
register();
createRoot(document.getElementById('root')).render(
    <App />
)
