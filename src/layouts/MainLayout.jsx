import { Outlet } from "react-router-dom"
import Nav from "../Front/Nav"

function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Nav />

      {/* Main Content */}
      <Outlet />
    </div>
  )
}

export default MainLayout