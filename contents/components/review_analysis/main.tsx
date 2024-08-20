import { ScrapeReviewsMain } from "../scrape_reviews/main"
import { ReviewAnalysisCons } from "./cons"
import { ReviewAnalysisCustomerExpectation } from "./customer_expectation"
import { ReviewAnalysisCustomerProfile } from "./customer_profile"
import { ReviewAnalysisPros } from "./pros"
import { ReviewAnalysisPurchaseMotivations } from "./purchase_motivations"
import { ReviewAnalysisUsageScenario } from "./useage_scenario"

interface ReviewAnalysisMainProps {
  asin: string
}

export const ReviewAnalysisMain = ({ asin }: ReviewAnalysisMainProps) => {
  return (
    <div className="p-4">
      <div>
        <strong>Intellegent Review Analysis</strong>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <ReviewAnalysisCustomerProfile />
        <ReviewAnalysisPros />
        <ReviewAnalysisUsageScenario />
        <ReviewAnalysisCons />
        <ReviewAnalysisCustomerExpectation />
        <ReviewAnalysisPurchaseMotivations />
      </div>
      <ScrapeReviewsMain asin={asin} />
    </div>
  )
}
