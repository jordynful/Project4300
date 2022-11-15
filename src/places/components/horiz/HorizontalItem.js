import React, { useState, useContext } from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import { AuthContext } from '../../../shared/context/auth-context';
import './HorizontalItem.css';

const HorizontalItem = props => {
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
  
   // setIsHovering(false);
  };

  
  return (
    <React.Fragment >
      <Modal
        header={props.address}
        contentClass="place-item__modal-contenth"
        footerClass="place-item__modal-actionsh"
      >
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actionsh"
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
      {/* popup modal */}
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
      <li className="place-itemh" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
        <Card className="place-item__contenth">
          <div className = "image-titleh">
          <div className="place-item__imageh">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__infoh">
            <h4>{props.title}</h4>
            <Button className = "details" details onClick={showDetailView}>
                 details
                </Button>
            <p>{props.description}</p>
          </div>
          </div>
          <div>
        
            <div className="place-item__actionsh">
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

export default HorizontalItem;
