import { useState } from 'react';

interface SignatureModalProps {
  demoMode?: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export function SignatureModal({ demoMode, onSuccess, onClose }: SignatureModalProps) {
  const [signing, setSigning] = useState(false);

  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = Math.random().toString(36).substring(2, 10);

  const message = `Welcome to Nexus Protocol!

By signing this message, you verify ownership of this wallet.

Timestamp: ${timestamp}
Nonce: ${nonce}

This signature request will not trigger a blockchain transaction or cost any gas fees.`;

  const handleSign = async () => {
    setSigning(true);

    if (demoMode) {
      // Simulate signing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess();
    } else {
      // Real Privy signature would go here
      // const signature = await signMessage(message);
      // Verify signature...
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess();
    }

    setSigning(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__icon">🔐</div>

        <h3 className="modal__title">Verify Ownership</h3>

        <p className="modal__text">
          Sign this message to prove you own this wallet. This won't cost any gas.
        </p>

        <div className="modal__message">{message}</div>

        <button
          className="btn btn--glow"
          onClick={handleSign}
          disabled={signing}
          style={{ width: '100%' }}
        >
          {signing ? '⏳ Awaiting Signature...' : '✍️ Sign Message'}
        </button>

        <button className="btn btn--ghost mt-md" onClick={onClose} style={{ width: '100%' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
