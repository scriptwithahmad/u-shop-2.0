import dbConnect from "@/config/dbConnect";
import EmployeesModel from "../../../models/employees";
import AttendaceModal from "../../../models/attendence";

export default async function handler(req, res) {
  dbConnect();

  try {
    var foundEmployees = await EmployeesModel.find({}, { _id: true });

    if (!foundEmployees) {
      return res.status(404).json({
        success: false,
        message: "Employees Not Found!",
      });
    }

    foundEmployees = foundEmployees.map((v) => {
      var obj = { employee_id: v._id };
      var dName = new Date().toLocaleDateString("us-en", { weekday: "long" });
      if (dName == "Sunday") {
        obj.status = "O";
      }

      return obj;
    });

    var data = await AttendaceModal.insertMany(foundEmployees);

    res.json({
      success: true,
      message: data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
