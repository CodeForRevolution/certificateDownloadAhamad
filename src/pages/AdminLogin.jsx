import { useEffect } from "react"
import AdminLoginForm from "../components/AdminLoginForm"

function AdminLogin() {
    useEffect(() => {
        document.title = "Admin Login | Aryvart"
    })
    return (
        <>
            <AdminLoginForm />
        </>
    )
}

export default AdminLogin
