import { FaRegEdit } from "react-icons/fa"

export const ReviewAnalysisCustomerProfile = () => {
  return (
    <div className="border rounded-md">
      <div className="px-4 py-2 font-bold border-b flex items-center">
        <FaRegEdit className="mr-2" color="orange" />
        Customer Profile
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Who</th>
            <th>When</th>
            <th>Where</th>
            <th>What</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
