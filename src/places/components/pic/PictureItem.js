import React, { useState, useContext } from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import { AuthContext } from '../../../shared/context/auth-context';
import './PictureItem.css';

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
                <Button danger onClick={showDetailView}>
                 detail
                </Button>
               </div>
     
            </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PictureItem;
