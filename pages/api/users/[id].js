// import dbConnect from "@/config/dbConnect";
// import userModal from "@/models/user";

// export default async function handler(req, res) {
//   dbConnect();

//   try {
//     const fetchUser = await userModal.findById(req.query.id);

//     if (!fetchUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User Not Found!",
//       });
//     }

//     const deleteUser = await userModal.findByIdAndDelete(req.query.id);

//     if (!deleteUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Unable to delete the User!",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User Deleted Successfully!",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error!",
//       error: error.message,
//     });
//   }
// }








// 2nd logic ---------------------------------------------------------/

// import dbConnect from "@/config/dbConnect";
// import userModal from "@/models/user";

// export default async function handler(req, res) {
//   dbConnect();

//   try {
//     const userId = req.query.id;
//     const addressIdToDelete = req.query.addressId; // assuming the addressId is passed in the query parameters

//     const fetchUser = await userModal.findById(userId);

//     if (!fetchUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User Not Found!",
//       });
//     }

//     if (addressIdToDelete) {
//       // If addressId is provided, delete the specified addressDetails object
//       const addressIndex = fetchUser.addressDetails.findIndex(
//         (address) => address._id === addressIdToDelete
//       );

//       if (addressIndex !== -1) {
//         // Delete the addressDetails object from the array
//         fetchUser.addressDetails.splice(addressIndex, 1);
//         await fetchUser.save();
//       } else {
//         return res.status(404).json({
//           success: false,
//           message: "addressDetails Not Found!",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: "addressDetails Deleted Successfully!",
//       });
//     } else {
//       // If addressId is not provided, delete the entire user
//       const deleteUser = await userModal.findByIdAndDelete(userId);

//       if (!deleteUser) {
//         return res.status(400).json({
//           success: false,
//           message: "Unable to delete the User!",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: "User Deleted Successfully!",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error!",
//       error: error.message,
//     });
//   }
// }




// 3rd logic ==================================================================/
import dbConnect from "@/config/dbConnect";
import userModal from "@/models/user";

export default async function handler(req, res) {
  dbConnect();

  try {
    const userId = req.query.id;
    const addressIdToDelete = req.query.addressId;

    const fetchUser = await userModal.findById(userId);

    if (!fetchUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    if (addressIdToDelete) {
      // If addressId is provided, delete the specified addressDetails object
      const updatedUser = await userModal.findByIdAndUpdate(
        userId,
        { $pull: { addressDetails: { _id: addressIdToDelete } } },
        { new: true } // to get the updated user document
      );

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "AddressDetails Not Found!",
        });
      }

      res.status(200).json({
        success: true,
        message: "AddressDetails Deleted Successfully!",
      });
    } else {
      // If addressId is not provided, delete the entire user
      const deleteUser = await userModal.findByIdAndDelete(userId);

      if (!deleteUser) {
        return res.status(400).json({
          success: false,
          message: "Unable to delete the User!",
        });
      }

      res.status(200).json({
        success: true,
        message: "User Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error!",
      error: error.message,
    });
  }
}

