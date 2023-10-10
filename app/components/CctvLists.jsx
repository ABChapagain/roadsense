"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CctvLists = ({ cctvLists }) => {
   const router = useRouter();

   const [show, setShow] = useState(false);
   const [cctvid, setCCTVId] = useState("");
   const [cctvIp, setCCTVIp] = useState("");
   const [newValue, setNewValue] = useState("");

   const handlePopup = async (id, ipAddress) => {
      setShow(true);
      setCCTVId(id);
      setCCTVIp(ipAddress);
   };

   const handleSave = async () => {
      await fetch(`/api/cctvs/${cctvid}`, {
         method: "PUT",
         body: JSON.stringify({ ipAddress: newValue }),
      });

      toast.success("CCTV updated successfully");
      setShow(false);
      router.refresh();
   };

   const handleDelete = async (id) => {
      await fetch(`/api/cctvs/${id}`, {
         method: "DELETE",
      });
      router.refresh();
      toast.success("CCTV deleted successfully");
   };
   return (
      <div>
         {show && (
            <div
               className={`min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ${
                  show ? "block" : "hidden"
               }`}
               style={{ backgroundImage: "u rl()" }}
               id="modal-id"
            >
               <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
               <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
                  {/*content*/}
                  <div className="">
                     {/*body*/}
                     <div className="text-center p-5 flex-auto justify-center">
                        <div className="flex w-full justify-center items-center">
                           <img
                              src="https://th.bing.com/th/id/OIP.NBRhdDu3xPQP6dqq0kauPgHaHa?pid=ImgDet&rs=1"
                              className="h-20 w-20"
                              alt="warning"
                           />
                        </div>
                        <h2 className="text-xl font-bold py-4">
                           Edit CCTV Info{" "}
                        </h2>
                        <p className="text-sm text-black px-8">
                           Add a Video Source
                        </p>
                        <input
                           type="text"
                           defaultValue={cctvIp}
                           onChange={(e) => setNewValue(e.target.value)}
                           className="border-black focus:bg-gray-200 mt-3 p-2 rounded-md w-full border-2 outline-none"
                        />
                     </div>
                     {/*footer*/}

                     <div className="p-3 mt-2 text-center space-x-4 md:block">
                        <button
                           onClick={() => {
                              setShow(false);
                           }}
                           className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm
font-medium tracking-wider border text-gray-600 rounded-full
hover:shadow-lg hover:bg-gray-100"
                        >
                           Cancel
                        </button>
                        <button
                           onClick={() => {
                              handleSave();
                           }}
                           className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                        >
                           {" "}
                           Save
                        </button>
                     </div>
                  </div>
               </div>
               {/* audio element */}
            </div>
         )}
         <h1 className="mb-3 text-2xl font-semibold">Areas covered by CCTVs</h1>
         <div className="flex gap-3 flex-col">
            {cctvLists.map(({ _id, city, ipAddress }) => (
               <div
                  key={_id}
                  className="border px-5 py-4 rounded-full shadow-sm flex justify-between items-center"
               >
                  <h2 className="text-black/80 tracking-wide">
                     {city} (
                     <a
                        href={ipAddress}
                        target="_blank"
                        className="text-blue-400"
                     >
                        {ipAddress}
                     </a>
                     )
                  </h2>
                  <div className="flex gap-2">
                     <button onClick={() => handlePopup(_id, ipAddress)}>
                        <AiOutlineEdit className="h-5 w-5 cursor-pointer hover:text-blue-500" />
                     </button>
                     <button onClick={() => handleDelete(_id)}>
                        <AiOutlineDelete className="h-5 w-5 cursor-pointer hover:text-red-500" />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default CctvLists;
