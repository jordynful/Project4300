import React, { useState, useContext } from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import { AuthContext } from '../../../shared/context/auth-context';
import Input from '../../../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import './VerticalItem.css';
import axios from 'axios';

const VerticalItem = props => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      imageUrl: {
        value: '',
        isValid: false
      },
      facts: {
        value: '',
        isValid: false
      },
    },
    false
  );
  const showEditView = () => {

    setShowEdit(true);
    setFormData(
      {
        title: {
          value: props.title,
          isValid: true
        },
        description: {
          value: props.description,
          isValid: true
        },
        imageUrl: {
          value: props.imageUrl,
          isValid: true
        },
        facts: {
          value: props.facts,
          isValid: true
        },
      },
      true
    );
  }
  const cancelEditView = () => {
    setShowEdit(false);
  }
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
    const pid = props._id;
    axios({
      url: '/api/vert/'+ pid,
      method: 'delete',
    })
      .then(() => {
        console.log('Data has been sent to the server');
      })
      .catch(() => {
        console.log('Internal server error');
      });
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
  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    const payload = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      imageUrl: formState.inputs.imageUrl.value,
      facts: formState.inputs.facts.value,
    };

    axios({
      url: '/api/vert/put/' + props._id,
      method: 'put',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });
      setShowEdit(false);
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
        <p> {props.facts} </p>
        </div>
      }
      footer = {
        <Button inverse onClick={cancelDetailView}>
        CANCEL
      </Button>
      }
      ></Modal>

     {/* edit modal */}
     <Modal
      show = {showEdit}
      onCancel = {cancelDetailView}
      header = {props.title}
      className = "modal"
      footerClass = "modal-footer"
      contentClass = "modal-contents"
      children = {
        <div>
         <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
            <Input
        id="imageUrl"
        element="textarea"
        label="ImageUrl"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid url"
        onInput={inputHandler}
        initialValue={formState.inputs.imageUrl.value}
        initialValid={formState.inputs.imageUrl.isValid}
      />
            <Input
        id="facts"
        element="textarea"
        label="Facts"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter valid facts (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.facts.value}
        initialValid={formState.inputs.facts.isValid}
      />
      <Button type="submit" >
        UPDATE ITEM
      </Button>
    </form>
       </div>
      }
      footer = {
        <Button inverse onClick={cancelEditView}>
        CANCEL
      </Button>
      }
      ></Modal>
      <li className="place-item" >
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
                <Button details onClick = {showEditView}>EDIT</Button>
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
