import { AiOutlineDislike } from "react-icons/ai"

export const ReviewAnalysisCons = () => {
  return (
    <div className="border rounded-md">
      <div className="px-4 py-2 font-bold border-b flex items-center">
        <AiOutlineDislike className="mr-2" color="green" />
        Cons
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
              <td className="w-1/5">{data.topic}</td>
              <td className="w-1/5">
                <div className="flex items-center gap-2">
                  <div className="w-6 text-right">{data.percentage}%</div>
                  <progress
                    className="progress progress-error w-20"
                    value={data.percentage}
                    max="100"></progress>
                </div>
              </td>
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
    topic: "Battery Life",
    percentage: 15,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    topic: "Price",
    percentage: 30,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    topic: "Durability",
    percentage: 10,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    topic: "Design",
    percentage: 5,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    topic: "Performance",
    percentage: 20,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    topic: "Sound Quality",
    percentage: 20,
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  }
]
