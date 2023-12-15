import React from "react";
import PostShare from "../PostShare/PostShare";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

export default function ShareModal({ modalOpened, setModalOpened }) {
  return (
    <div>
      <Modal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <div style={style}>
          <PostShare />
        </div>
      </Modal>
    </div>
  );
}
