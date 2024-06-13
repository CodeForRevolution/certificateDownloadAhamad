import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"
import UserLogin from "./pages/UserLogin"
import Result from "./pages/Result"

function App() {
	const auth = localStorage.getItem('login')

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<UserLogin />} />
				<Route path="/admin" element={!auth ? <AdminLogin /> : <Navigate replace to='/admin-panel' />} />
				<Route path="/admin-panel" element={auth ? <Admin /> : <Navigate replace to='/admin' />} />
				<Route path='/certificate' element={<Result />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
