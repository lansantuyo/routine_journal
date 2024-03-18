import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col gap-2">
            404 Not Found
            {/* If you want to go back to link but NOT refresh the page */}
            <Link to ="/"> Back to Home</Link>

            {/* If you want to go back to link and refresh the page */}
            {/* <a href="/">Home from A</a> */}
        </div>
    );
}