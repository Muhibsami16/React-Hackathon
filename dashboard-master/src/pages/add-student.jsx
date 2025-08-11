import AddStudent from "../components/add-student";
import Layout from "../components/layout/layout";
import StudentList from "../components/student-list";


const AddStudentComp = () => {
  return (
    <Layout>
      <div className="flex justify-end items-center p-2">
        <AddStudent />
      </div>
      <div className="p-2">
        <StudentList />
      </div>
    </Layout>
  );
};

export default AddStudentComp;
