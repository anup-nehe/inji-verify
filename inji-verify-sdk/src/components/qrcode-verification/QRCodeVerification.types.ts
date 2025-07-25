type ExclusiveCallbacks =
  /**
   * Callback triggered when the verification presentation (VP) is received.
   * Provides the associated transaction ID.
   */
  | { onVCReceived: (txnId: string) => void; onVCProcessed?: never }
  /**
   * Callback triggered when the VP is successfully processed.
   * Provides the verification result data.
   */
  | {
      onVCProcessed: (vpResult: VerificationResults) => void;
      onVCReceived?: never;
    };

export type QRCodeVerificationProps = ExclusiveCallbacks & {
  /**
   * React element that triggers the verification process (e.g., a button).
   * If not provided, the component may automatically start the process.
   */
  triggerElement?: React.ReactNode;

  /**
   * The backend service URL where the verification request will be sent.
   * This is a required field.
   */
  verifyServiceUrl: string;

  /**
   * Callback triggered when an error occurs during the verification process.
   * This is a required field to ensure proper error handling.
   */
  onError: (error: Error) => void;

  /**
   * Upload button config.
   */
  uploadButtonId?: string;

  uploadButtonStyle?: string;

  /**
   * Enable camera zoom (mobile).
   */
  isEnableZoom?: boolean;

  /**
   * Enable upload functionality.
   * Defaults to true.
   */
  isEnableUpload?: boolean;

  /**
   * Enable scan functionality.
   * Defaults to true.
   */
  isEnableScan?: boolean;
};

interface VerificationResult {
  /**
   * Verified credential data (structure depends on implementation).
   */
  vc: unknown;

  /**
   * The status of the verification (e.g., "valid", "invalid", "expired").
   */
  vcStatus: VcStatus;
}

export type VerificationResults = VerificationResult[];

export type VcStatus = "SUCCESS" | "INVALID" | "EXPIRED";

export type scanResult = { data: any; error: Error | null };

export interface QrData {
  /**
   * Unique transaction identifier.
   */
  transactionId: string;

  /**
   * Request identifier associated with the verification.
   */
  requestId: string;

  /**
   * Authorization details required for verification.
   */
  authorizationDetails: {
    responseType: string;
    clientId: string;
    presentationDefinition: Record<string, unknown>; // More precise than 'object'
    presentationDefinitionUri?: string;
    responseUri: string;
    nonce: string;
    iat: number;
  };

  /**
   * Expiration timestamp of the QR code.
   */
  expiresAt: number;
}

export interface vpRequestBody {
  clientId: string;
  nonce: string;
  transactionId?: string;
  presentationDefinitionId?: string;
  presentationDefinition?: Record<string, unknown>;
}
