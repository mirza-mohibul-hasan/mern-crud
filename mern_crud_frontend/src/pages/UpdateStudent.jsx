import { useParams } from "react-router-dom";

const UpdateStudent = () => {
  const { _id } = useParams();
  console.log(_id);

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const id = form.id.value;
    const dept = form.dept.value;
    const updatedStudent = { name, id, dept };
    fetch(`http://localhost:5000/updatestudent/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        if ( data.modifiedCount) {
          alert("Student updated successfully");
        }
      });
  };
  return (
    <div>
      <div className="bg-[#F4F3F0] p-24">
        <h1 className="text-3xl text-purple-600 text-center font-bold">
          Update Student
        </h1>
        <form onSubmit={handleUpdate} className="w-1/3 mx-auto">
          <div className="md:flex gap-4 justify-center">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  style={{ borderRadius: "8px" }}
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">ID</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="id"
                  placeholder="ID"
                  className="input input-bordered w-full"
                  style={{ borderRadius: "8px" }}
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">DEPARTMENT</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="dept"
                  placeholder="Dept"
                  className="input input-bordered w-full"
                  style={{ borderRadius: "8px" }}
                />
              </label>
            </div>
          </div>
          <input
            className="btn btn-block bg-blue-700 cursor-pointer rounded-xl"
            type="submit"
            value="Update Student"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
