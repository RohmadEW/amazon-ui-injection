import { ReviewAnalysisCustomerProfile } from "./customer_profile"
import { ReviewAnalysisPros } from "./pros"

export const ReviewAnalysisMain = () => {
  return (
    <div className="p-4">
      <div>
        <strong>Intellegent Review Analysis</strong>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <ReviewAnalysisCustomerProfile />
        <ReviewAnalysisPros />
      </div>
    </div>
  )
}
