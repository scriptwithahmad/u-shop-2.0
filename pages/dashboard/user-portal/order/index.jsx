import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import React, { useContext, useEffect } from "react";

const index = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.fullname;

  // console.log(userId);

  const fetchOrderHistory = async () => {
    try {
      const { data } = await axios.get(`/api/orders/?fullname=${userId}`);

      console.log(data?.message);

    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div>
      <h1>Order page</h1>
    </div>
  );
};

export default index;
