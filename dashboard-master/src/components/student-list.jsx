import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../Firebase";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

function StudentList() {
  const [students, setStudents] = useState([]);

  const init = async () => {
    const collectionRef = collection(db, "add-student");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const combinedDataWithId = { ...doc.data(), id: doc.id };
        data.push(combinedDataWithId);
      });
      setStudents(data);
    });
    return unsubscribe;
  };

  const deleteStudent = async (id) => {
    try {
      const documentRef = doc(db, "add-student", id);
      await deleteDoc(documentRef);
      toast("Record has been deleted");
    } catch (error) {
      toast(error?.message);
    }
  };

  const markAttendance = async (id, existingAttendance = []) => {
    const today = new Date().toDateString();

    const alreadyMarkedToday = existingAttendance?.some((timestamp) => {
      const date = new Date(timestamp).toDateString();
      return date === today;
    });

    if (alreadyMarkedToday) {
      toast("Attendance already marked for today");
      return;
    }

    try {
      const documentRef = doc(db, "add-student", id);
      await updateDoc(documentRef, {
        attendance: arrayUnion(Date.now()),
      });
      toast("Attendance marked for today");
    } catch (error) {
      toast(error?.message || "Failed to update attendance");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Attendance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => {
          const hasMarkedToday = student.attendance?.some((timestamp) => {
            const date = new Date(timestamp).toDateString();
            return date === new Date().toDateString();
          });

          return (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>
                <Trash
                  size={16}
                  onClick={() => deleteStudent(student.id)}
                  className="cursor-pointer text-red-500"
                />
              </TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={hasMarkedToday}
                  disabled={hasMarkedToday}
                  onChange={() =>
                    markAttendance(student.id, student.attendance || [])
                  }
                />
                {student.attendance?.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Last:{" "}
                    {new Date(
                      student.attendance[student.attendance.length - 1]
                    ).toLocaleDateString()}
                  </div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default StudentList;