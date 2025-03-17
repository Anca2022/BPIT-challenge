import { ModalHeaderProps } from "../../types/Props";

export default function ModalHeader({ onClick }: ModalHeaderProps) {
  return (
    <div className="modal-header">
      <h2>Add New Transaction</h2>
      <button className="close-modal-btn" onClick={onClick}>
        ✖
      </button>
    </div>
  );
}
