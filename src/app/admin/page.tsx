import FileUpload from "@/components/FileUpload"
import AdminImagesList from "@/components/AdminImagesList"
import { Suspense } from "react";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage your portfolio images</p>
        </div>

        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <FileUpload />
        </Suspense>

        <Suspense fallback={<div className="text-center py-8">Loading images...</div>}>
          <AdminImagesList />
        </Suspense>
      </div>
    </div>
  )
}

export default AdminPage