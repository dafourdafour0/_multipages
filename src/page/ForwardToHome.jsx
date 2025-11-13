import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ForwardToHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('../Home')}, [])
    
    return <h2>ForwardToHome page</h2>
}
 
export default ForwardToHome;