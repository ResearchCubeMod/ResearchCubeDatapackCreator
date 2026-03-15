import { useUIStore } from '../../stores/uiStore';
import Modal from './Modal';

export default function ConfirmDialog() {
  const { open, title, message, onConfirm } = useUIStore((s) => s.confirmDialog);
  const closeConfirm = useUIStore((s) => s.closeConfirm);

  const handleConfirm = () => {
    onConfirm?.();
    closeConfirm();
  };

  return (
    <Modal open={open} onClose={closeConfirm} title={title} width={400}>
      <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>{message}</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button className="btn-secondary btn-sm" onClick={closeConfirm}>Cancel</button>
        <button className="btn-danger btn-sm" onClick={handleConfirm}>Confirm</button>
      </div>
    </Modal>
  );
}
