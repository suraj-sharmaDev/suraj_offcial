/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Jan 04 2022
 *  File : index.js
 *******************************************/
 import React from 'react';
 import styles from './contactUs.module.css';
 import Images from 'config/Images';
 import {FloatingLabelInput, Lazyloader, LoaderAnimated, PopupNotification} from 'components/commons';
 
 const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

 const BodyContainer = props => {
     const [state, setState] = React.useState({
         fullName: '',
         email: '',
         message: ''
     });

     const [isLoading, setLoading] = React.useState(false);
     const [errorMessage, setErrorMessage] = React.useState("");
     const [showNotification, setShowNotification] = React.useState(false);

     const handleInputComplete = (value, type) => {
        let newState = {...state};
        newState[type] = value;
        setState(newState);
     };

     const handleSubmit = async() => {
        setLoading(true);
        let notificationMessage = "";
        let mailError = false;
        const {fullName, email, message} = state;
        let formData = new FormData();
        formData.append("message", message);
        formData.append("from_email", email);
        formData.append("full_name", fullName);
        try {
            const rawResponse = await fetch('https://www.api.crypt4bits.com/sendMail.php', {
                method: "POST", 
                mode: 'cors',
                body: formData
              });
            const content = await rawResponse.json();
            notificationMessage = content?.success ? "We have received your message!" : "Your message could not be send!";
            mailError = !content.success;
        } catch (error) {
            console.log(error);
            mailError = true;
            notificationMessage = "There was some issue with the network";
        }
        setLoading(false);
        if(!mailError) {
            setState({
                fullName: '',
                email: '',
                message: ''
            });
        }
        setErrorMessage(notificationMessage);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 4000);
     }

     const {fullName, email, message} = state;
     const activateButton = fullName.length > 3 && email.match(mailformat) && message.length > 3;

     return (
         <div className={styles.bodyContainer}>
            <div className={styles.contactContainer}>
                <span className={styles.mainTitle}>Contact Us</span>
                <span className={styles.bigText}>Get in touch to talk about UI/UX design, Development, Data science, or just to say hello.</span>
            </div>
            <div className={styles.contactContainer}>
                <FloatingLabelInput 
                    label={'Full Name'}
                    type={'text'}
                    onComplete={(data) => handleInputComplete(data, 'fullName')}
                    value={state.fullName}
                />
                <FloatingLabelInput 
                    label={'Email'} 
                    type={'email'} 
                    onComplete={(data) => handleInputComplete(data, 'email')}
                    value={state.email}
                />
                <FloatingLabelInput 
                    label={'Message'}
                    type={'text'} 
                    onComplete={(data) => handleInputComplete(data, 'message')}
                    value={state.message}
                />
            </div>
            <Lazyloader direction={"left"}>
                <button 
                    onClick={handleSubmit} 
                    className={styles.submitButton} 
                    style={{backgroundColor: activateButton ? '#1b79fd' : '#79b1ff'}}
                    disabled={!activateButton}
                >
                    Submit
                </button>
            </Lazyloader>
            <LoaderAnimated startAnimation={isLoading}/>
            <PopupNotification message={errorMessage} showNotification={showNotification}/>
         </div>
     );
 }
 
 export {
     BodyContainer
 }