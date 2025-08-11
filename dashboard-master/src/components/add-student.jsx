import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "../Firebase";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { db } from "../Firebase";
import { toast } from "sonner";

function AddStudent() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .min(10, "Invalid Phone Number")
        .required("Phone Number is Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // 🔍 Check if email already exists
        const q = query(
          collection(db, "add-student"),
          where("email", "==", values.email)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          toast.error("This email is already used. Please use a different one.");
          setLoading(false);
          return;
        }

        // ✅ Add new student
        const docRef = await addDoc(collection(db, "add-student"), {
          ...values,
          attendance: [],
          timestamp: serverTimestamp(),
        });

        if (docRef) {
          formik.resetForm();
          toast("Student record has been added!");
        }
      } catch (error) {
        toast(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
          <DialogDescription>
            Please insert student details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Enter Your Name"
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.name}
              </span>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter your Email"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.email}
              </span>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="Phone Number"
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.phone}
              </span>
            )}
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudent;