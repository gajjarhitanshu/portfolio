import { Projects_arr } from "../../../public/projects_data";

export default function Projects() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="py-2">Year</th>
            <th className="py-2">Project</th>
            <th className="py-2">Made at</th>
            <th className="py-2">Built with</th>
            <th className="py-2">Short Description</th>
          </tr>
        </thead>
        <tbody>
          {Projects_arr.map((project, index) => (
            <tr
              key={index}
              className="border-b border-gray-800 hover:bg-gray-800"
            >
              <td className="py-2">{project.year}</td>
              <td className="py-2 font-semibold">{project.name}</td>
              <td className="py-2">{project.madeAt}</td>
              <td className="py-2">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-2">
                <p>{project.oneLineDescription}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
