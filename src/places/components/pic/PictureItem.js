import React, { useState, useContext } from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import { AuthContext } from '../../../shared/context/auth-context';
import './PictureItem.css';
import axios from 'axios';
const PictureItem = props => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

 const showDeleteWarningHandler = () => {
   setShowConfirmModal(true);
 };

  const cancelDeleteHandler = () => {
   setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
    const pid = props._id;
    axios({
      url: '/api/pic/'+ pid,
      method: 'delete',
    })
      .then(() => {
        console.log('Data has been sent to the server');
      })
      .catch(() => {
        console.log('Internal server error');
      });
  };
  const showDetailView = () => {
    setShowDetail(true);
  }
  const cancelDetailView = () => {
    setShowDetail(false);
  }
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const PopUp = props => {
    // create state `open` with default as false
    const [open, setOpen] = useState(false);
    return (
      <>
        {/* click of button toggles `open` value therefore visibility */}
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target={props.description}
        >
         View Details
        </button>
        {/* If open is true show your <div /> */}
        {open && (
          <div
            className="modal fade"
            id={props.id}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <p>The Description should go here</p>
          </div>
        )}
      </>
    );
  };

  return (
    <React.Fragment>
      <Modal
        header={props.address}
        contentClass="place-item__modal-contentp"
        footerClass="place-item__modal-actionsp"
      >
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actionsp"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <Modal
      show = {showDetail}
      onCancel = {cancelDetailView}
      header = {props.title}
      className = "modal"
      footerClass = "modal-footer"
      contentClass = "modal-contents"
      children = {
        <div>
       <h3>Nutrition Facts</h3>
       <p> {props.facts} </p>
       </div>
      }
      footer = {
        <Button inverse onClick={cancelDetailView}>
        CANCEL
      </Button>
      }
      ></Modal>
      <li className="place-itemp" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <Card className="place-item__contentp">
          <div className="place-item__imagep">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__infop">
            <h4>{props.title}</h4>
            <Button className = "details" details onClick={showDetailView}>
                 details
                </Button>
            <p>{props.description}</p>
          </div>
          <div>
         
            <div className="place-item__actionsp">
             {auth.isLoggedIn && (
                <Button to={`/places/${props.id}`}>EDIT</Button>
                )}

              {auth.isLoggedIn && (
                <Button danger onClick={showDeleteWarningHandler}>
                 DELETE
                </Button>
               )
               }
            
               </div>
     
            </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PictureItem;
