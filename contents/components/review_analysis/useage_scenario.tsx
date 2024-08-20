import { AiOutlineLike } from "react-icons/ai"

export const ReviewAnalysisUsageScenario = () => {
  return (
    <div className="border rounded-md">
      <div className="px-4 py-2 font-bold border-b flex items-center">
        <AiOutlineLike className="mr-2" color="blue" />
        Usage Scenario
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Percent</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {dataDummy.map((data, index) => (
            <tr key={index}>
              <td className="w-1/5">{data.topic}</td>
              <td className="w-1/5">{data.percentage}%</td>
              <td className="w-3/5">{data.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const dataDummy = [
  {
    topic: "Everyday Use",
    percentage: 70,
    reason: "The product is easy to use and has a good design"
  },
  {
    topic: "Traveling",
    percentage: 20,
    reason: "The product is lightweight and easy to carry"
  },
  {
    topic: "Outdoor Activities",
    percentage: 10,
    reason: "The product is durable and waterproof"
  },
  {
    topic: "Special Occasions",
    percentage: 0,
    reason: "The product is not suitable for special"
  }
]
