import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allstudent")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/deletestudent/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Delete Successfull");
        }
      });
  };
  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">SN</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Dept</th>
            <th className="py-2 px-4 border-b">Update</th>
            <th className="py-2 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{student.name}</td>
              <td className="py-2 px-4 border-b">{student.id}</td>
              <td className="py-2 px-4 border-b">{student.dept}</td>
              <td className="py-2 px-4 border-b">
                <Link className="bg-blue-500 text-white px-2 py-1 rounded" to={`http://localhost:5173/update/${student._id}`}>
                  Update
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
