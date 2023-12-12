import {Link, useLocation} from "react-router-dom";

function ProjectNav() {
    const { pathname } = useLocation();
    return (
        <nav className={"nav nav-tabs mb-2"}>
            <Link className={`nav-link`} to={"./Home"}>Home</Link>
            <Link className={`nav-link`} to={"./Profile"}>Profile</Link>
            <Link className={`nav-link`} to={"./Search"}>Search</Link>
            <Link className={`nav-link`} to={"./Login"}>Login</Link>
            <Link className={`nav-link`} to={"./Signup"}>Signup</Link>
        </nav>
    );
}
export default ProjectNav;