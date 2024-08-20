import { AiOutlineLike } from "react-icons/ai"

export const ReviewAnalysisPros = () => {
  return (
    <div className="border rounded-md">
      <div className="px-4 py-2 font-bold border-b flex items-center">
        <AiOutlineLike className="mr-2" color="orange" />
        Pros
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Topic</th>
            <th></th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {dataDummy.map((data, index) => (
            <tr key={index}>
              <td className="w-1/4">{data.topic}</td>
              <td className="w-1/4">
                <div className="flex items-center gap-2">
                  <div className="w-4">{data.percentage}%</div>
                  <progress
                    className="progress progress-success w-20"
                    value={data.percentage}
                    max="100"></progress>
                </div>
              </td>
              <td className="w-2/4">
                <div className="truncate">{data.reason}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const dataDummy = [
  {
    topic: "Protection",
    percentage: 15,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    topic: "Durability",
    percentage: 10,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    topic: "Value for Money",
    percentage: 5,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    topic: "Sturdiness",
    percentage: 55,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    topic: "Easy to Install",
    percentage: 75,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    topic: "Easy to Use",
    percentage: 45,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    topic: "Lightweight",
    percentage: 95,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
]
