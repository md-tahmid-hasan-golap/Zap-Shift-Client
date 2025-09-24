import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../firebase/FirebaseAuthProvider";
import axios from "axios";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);

  const [cost, setCost] = useState(null);
  const [pendingData, setPendingData] = useState(null);

  const type = watch("type");

  // ------------------------
  // Cost calculation logic
  // ------------------------
  const calculateCost = (data) => {
    let baseCost = data.type === "document" ? 50 : 100;
    let weightCost =
      data.type === "non-document" && data.weight
        ? parseFloat(data.weight) * 10
        : 0;
    let regionFactor = data.receiverServiceCenter === "Premium" ? 50 : 20;

    return baseCost + weightCost + regionFactor;
  };

  // ------------------------
  // On Submit
  // ------------------------
  const onSubmit = (data) => {
    const deliveryCost = calculateCost(data);

    // পুরো form data pending এ save
    setPendingData({
      ...data,
      creation_date: new Date().toISOString(),
      email: user?.email,
      cost: deliveryCost,
      status: "pending",
    });
    setCost(deliveryCost);

    toast(
      (t) => (
        <div className="p-3">
          <p className="font-bold">Delivery Cost: {deliveryCost} ৳</p>
          <button
            type="button"
            className="btn btn-sm btn-success mt-2"
            onClick={() => {
              handleConfirm();
              toast.dismiss(t.id);
            }}
          >
            Confirm
          </button>
        </div>
      ),
      { duration: 6000 }
    );
  };

  // ------------------------
  // Confirm & Save to DB
  // ------------------------
  const handleConfirm = async () => {
    if (!pendingData) return;

    console.log("Saving to DB:", pendingData);

    try {
      const res = await axios.post(
        "http://localhost:5000/parcels",
        pendingData
      );

      if (res.data.insertedId) {
        toast.success("Parcel saved successfully ✅");
        reset(); // clear form
        setCost(null);
        setPendingData(null);
      }
    } catch (error) {
      console.error("Error saving parcel:", error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg my-7">
      <Toaster />

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Send a Parcel</h1>
        <p className="text-sm text-gray-500">
          Fill the form below to schedule your parcel
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ---- FORM FIELDS SAME AS BEFORE ---- */}
        {/* Parcel Info */}
        <div className="bg-base-100 p-6 rounded-lg shadow space-y-4">
          <h2 className="font-semibold text-xl">Parcel Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Type */}
            <div>
              <label className="label">Type</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: "Type is required" })}
                    className="radio radio-primary"
                  />
                  <span>Document</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: "Type is required" })}
                    className="radio radio-primary"
                  />
                  <span>Non-Document</span>
                </label>
              </div>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                placeholder="Parcel Title"
                className="input input-bordered w-full"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Weight */}
            {type === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 2.5"
                  className="input input-bordered w-full"
                  {...register("weight")}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sender Info */}
        <div className="bg-base-100 p-6 rounded-lg shadow space-y-4">
          <h2 className="font-semibold text-xl">Sender Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("senderName", {
                required: "Sender name is required",
              })}
            />
            <input
              type="text"
              placeholder="Contact"
              className="input input-bordered w-full"
              {...register("senderContact", {
                required: "Contact is required",
              })}
            />
            <select
              className="select select-bordered w-full"
              {...register("senderRegion", { required: "Select a region" })}
            >
              <option value="">Select Region</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
            </select>
            <select
              className="select select-bordered w-full"
              {...register("senderServiceCenter", {
                required: "Select service center",
              })}
            >
              <option value="">Select Service Center</option>
              <option value="Regular">Regular</option>
              <option value="Premium">Premium</option>
            </select>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full col-span-2"
              {...register("senderAddress", {
                required: "Address is required",
              })}
            />
            <input
              type="text"
              placeholder="Pickup Instruction"
              className="input input-bordered w-full col-span-2"
              {...register("pickupInstruction", {
                required: "Pickup instruction required",
              })}
            />
          </div>
        </div>

        {/* Receiver Info */}
        <div className="bg-base-100 p-6 rounded-lg shadow space-y-4">
          <h2 className="font-semibold text-xl">Receiver Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("receiverName", {
                required: "Receiver name is required",
              })}
            />
            <input
              type="text"
              placeholder="Contact"
              className="input input-bordered w-full"
              {...register("receiverContact", {
                required: "Receiver contact is required",
              })}
            />
            <select
              className="select select-bordered w-full"
              {...register("receiverRegion", { required: "Select a region" })}
            >
              <option value="">Select Region</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
            </select>
            <select
              className="select select-bordered w-full"
              {...register("receiverServiceCenter", {
                required: "Select service center",
              })}
            >
              <option value="">Select Service Center</option>
              <option value="Regular">Regular</option>
              <option value="Premium">Premium</option>
            </select>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full col-span-2"
              {...register("receiverAddress", {
                required: "Address is required",
              })}
            />
            <input
              type="text"
              placeholder="Delivery Instruction"
              className="input input-bordered w-full col-span-2"
              {...register("deliveryInstruction", {
                required: "Delivery instruction required",
              })}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary text-white px-6">
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
