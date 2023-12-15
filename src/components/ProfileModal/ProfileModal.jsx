import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white', // Use your desired background color
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event, imageType) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      imageType === "profile" ? setProfileImage(img) : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);

      try {
        await dispatch(uploadImage(data));
        formData.profilePicture = fileName;
      } catch (err) {
        console.error(err);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);

      try {
        await dispatch(uploadImage(data));
        formData.coverPicture = fileName;
      } catch (err) {
        console.error(err);
      }
    }

    try {
      await dispatch(updateUser(param.id, formData));
    } catch (err) {
      console.error(err);
    }

    setModalOpened(false);
  };

  return (
    <div>
      <Modal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="infoForm" onSubmit={handleSubmit}>
            <h3>Your info</h3>

            <div>
              <input
                value={formData.firstname}
                onChange={handleChange}
                type="text"
                className="infoInput"
                name="firstname"
                placeholder="First Name"
              />

              <input
                value={formData.lastname}
                onChange={handleChange}
                type="text"
                className="infoInput"
                name="lastname"
                placeholder="Last Name"
              />
            </div>

            <div>
              <input
                value={formData.worksAt}
                onChange={handleChange}
                type="text"
                className="infoInput"
                name="worksAt"
                placeholder="Works at"
              />
            </div>

            <div>
              <input
                value={formData.livesIn}
                onChange={handleChange}
                type="text"
                className="infoInput"
                name="livesIn"
                placeholder="Lives in"
              />

              <input
                value={formData.country}
                onChange={handleChange}
                type="text"
                className="infoInput"
                name="Country"
                placeholder="Country"
              />
            </div>

            <div>
              <input
                value={formData.relationship}
                onChange={handleChange}
                type="text"
                className="infoInput"
                placeholder="Relationship Status"
                name="relationship"
              />
            </div>

            <div>
              Profile Image 
              <input type="file" name='profileImage' onChange={(e) => onImageChange(e, 'profile')} />
              Cover Image
              <input type="file" name="coverImage" onChange={(e) => onImageChange(e, 'cover')} />
            </div>

            <button className="button infoButton" type="submit">
              Update
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
