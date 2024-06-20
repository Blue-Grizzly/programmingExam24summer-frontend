type ConfirmDeleteProps = {
    confirmDeleteEntity: (entity: Object) => void;
    entity: object;
    handleCancelDelete: () => void;
}

export default function ConfirmDelete({confirmDeleteEntity, entity, handleCancelDelete}: ConfirmDeleteProps){
    return(
        <div>
            <h1>Confirm delete</h1>
            <p>Are you sure you want to delete?</p>
            <button onClick={()=>confirmDeleteEntity(entity)} className="btn-delete">Delete</button>
            <button onClick={handleCancelDelete} className="btn-cancel">Cancel</button>
        </div>
    )
}