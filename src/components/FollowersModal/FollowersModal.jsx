import React from "react";
import { Modal, useTheme } from "@mui/material";
import FollowersCard from "../FollowersCard/FollowersCard";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const theme = useTheme(); // Make sure to use the useTheme hook to access the theme object

  return (
    <Modal
      open={modalOpened}
      onClose={() => setModalOpened(false)}
      aria-labelledby="followers-modal-title"
      aria-describedby="followers-modal-description"
    >
      <div
        style={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <FollowersCard location="modal" />
      </div>
    </Modal>
  );
};

export default FollowersModal;
