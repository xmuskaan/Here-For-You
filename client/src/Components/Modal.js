import '../Stylesheets/Modal.css';

const Modal = ({deletePost, closeModal}) => {


    return ( 
        <div className="modalBackground">
            <div className="modalContent">
                <button className="closeModal" onClick={() => closeModal(false) }>X</button>
                <p className="modalHead"> Are you sure you want to delete this?</p>

                <div className="buttonFlex">
                    <button className="modalyes button" 
                        onClick={() => 
                            {deletePost()
                            closeModal(false)}}
                            >Yes</button>
                    <button className="modalno button"  onClick={() => closeModal(false)}>No</button>
                </div>    
               
            </div>
        </div>
     );
}
 
export default Modal;