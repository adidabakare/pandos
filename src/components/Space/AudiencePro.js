import React, { useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Modal, Input, Button, Text, Loading } from "@nextui-org/react";
import { ethers } from "ethers";
import { AuthContext } from "../../utils/AuthProvider";
import pakari from "../../assets/img/pakari.jpeg";
const AudiencePro = (props) => {
  console.log("props address", props.image);
  const [visible2, setVisible2] = React.useState(false);
  const [amount, setamount] = useState("");
  const [isloading, setisloading] = useState(false);

  const { address, signer, contract, provider, chainId, connect } =
    useContext(AuthContext);

  const notify = (msg) =>
    toast.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  const closeHandler2 = () => {
    setVisible2(false);
    console.log("closed");
  };

  const onTipUser = async () => {
    const amount_ = ethers.utils.parseUnits(amount, "ether");
    let transaction = await signer.tipUserSpace(props.id, {
      value: amount_,
    });
    setisloading(true);
    let txReceipt = await transaction.wait();
    setisloading(false);
    setVisible2(false);

    notify("Transaction Completed Successfully");
  };
  return (
    <>
      <Toaster />

      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible2}
        onClose={closeHandler2}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Enter an amount <Text b size={18}></Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            required
            value={amount}
            onChange={(e) => {
              setamount(e.target.value);
            }}
            placeholder="Enter amount(eth)"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler2}>
            Close
          </Button>
          <Button
            auto
            onClick={() => {
              // setuserid(userinfo?.artistId?.toString());
              onTipUser();
            }}
          >
            {isloading ? (
              <Loading size="xs" color="white" className="pr-4" />
            ) : (
              ""
            )}
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="rounded-3xl w-36 relative h-36 mb-5 ">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex flex-row items-center justify-center top-0 border-4 border-[#111827]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute ">
          {!props.speaking ? (
            <iframe
              // onClick={props.microphoneState}
              src="https://embed.lottiefiles.com/animation/21222"
              width={80}
              height={80}
            ></iframe>
          ) : (
            <ion-icon
              // onClick={props.microphoneState}
              name="mic-off"
              class="text-[#f31260] m-auto  text-3xl"
            ></ion-icon>
          )}
        </div>
        <img
          src={props.image}
          // src={pakari}
          // src={
          //   "https://drive.google.com/uc?export=view&id=1AOkHvZ1g-Nx7ibaZvEOkaMb0rPmU67xk"
          // }
          className="object-cover h-36 w-36 rounded-3xl"
        />
        <div class="w-full px-4 py-1 rounded-b-3xl absolute bottom-0 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          <p className="text-white text-center">{props.name}</p>
          <p className="text-white text-center">{props.address}</p>
          <p
            onClick={() => {
              setVisible2(true);
            }}
            className="cursor-pointer bg-[#41e1e9] mb-1 text-center rounded-full text-white "
          >
            Tip
          </p>
        </div>
      </div>
    </>
  );
};

export default AudiencePro;
