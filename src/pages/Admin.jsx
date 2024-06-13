import { useEffect } from "react"
import AdminPanel from "../components/AdminPanel"

function Admin() {
    useEffect(() => {
        document.title = "Admin Panel | Aryvart"
    })

    return (
        <>
            <AdminPanel />
        </>
    )
}

export default Admin
