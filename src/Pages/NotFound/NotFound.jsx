import { Helmet } from "react-helmet"
import NotFoundImage from "../../assets/images/error.svg"
export default function NotFound() {
    return <>
        <Helmet>
            <title>Not found page</title>
            <meta name="description" content="Not found your page" />
        </Helmet>
        <figure>
            <img src={NotFoundImage} alt="Error 404" className="mx-auto" />
        </figure>
    </>
}