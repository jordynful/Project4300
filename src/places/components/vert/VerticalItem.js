import React, { useState, useContext } from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import { AuthContext } from '../../../shared/context/auth-context';
import './VerticalItem.css';

const VerticalItem = props => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const showDetailView = () => {
    setShowDetail(true);
  }
  const cancelDetailView = () => {
    setShowDetail(false);
  }
 const showDeleteWarningHandler = () => {
   setShowConfirmModal(true);
 };

  const cancelDeleteHandler = () => {
   setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
  };

  //const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    //setIsHovering(true);
  };

  const handleMouseOut = () => {
    //setIsHovering(false);
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
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
      >
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
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
       </div>
      }
      footer = {
        <Button inverse onClick={cancelDetailView}>
        CANCEL
      </Button>
      }
      ></Modal>
      <li className="place-item" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h4>{props.title}</h4>
            <div>
            <Button className = "details" details onClick={showDetailView}>
                 details
                </Button>
            </div>
            <p>{props.description}</p>
          </div>
          
         
            <div className="place-item__actions">
             {auth.isLoggedIn && (
                <Button to={`/places/vert/${props.id}`}>EDIT</Button>
                )}

              {auth.isLoggedIn && (
                <Button danger onClick={showDeleteWarningHandler}>
                 DELETE
                </Button>
               )
               }
              
               </div>
         
        </Card>
      </li>
    </React.Fragment>
  );
};

export default VerticalItem;
