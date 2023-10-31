export type SubmitTxRequestJSON = {
  tx: string;
  chain_id: string;
};

export type SubmitTxRequest = {
  tx: string;
  chainID: string;
};

export type SubmitTxResponseJSON = {
  success: boolean;
  tx_hash: string;
};

export type SubmitTxResponse = {
  success: boolean;
  txHash: string;
};

export type StatusState =
  | "STATE_UNKNOWN"
  | "STATE_SUBMITTED"
  | "STATE_PENDING"
  | "STATE_RECEIVED"
  | "STATE_COMPLETED"
  | "STATE_ABANDONED"
  | "STATE_COMPLETED_SUCCESS"
  | "STATE_COMPLETED_ERROR";

export type NextBlockingTransferJSON = {
  transfer_sequence_index: number;
};

export type NextBlockingTransfer = {
  transferSequenceIndex: number;
};

export type StatusRequestJSON = {
  tx_hash: string;
  chain_id: string;
};

export type StatusRequest = {
  txHash: string;
  chainID: string;
};

export type TransferState =
  | "TRANSFER_UNKNOWN"
  | "TRANSFER_PENDING"
  | "TRANSFER_RECEIVED"
  | "TRANSFER_SUCCESS"
  | "TRANSFER_FAILURE";

export type TransferInfoJSON = {
  src_chain_id: string;
  dst_chain_id: string;
  state: TransferState;
  packet_txs: PacketJSON;
};

export type TransferInfo = {
  srcChainID: string;
  dstChainID: string;
  state: TransferState;
  packetTXs: Packet;
};

export type TransferAssetReleaseJSON = {
  chain_id: string;
  denom: string;
};

export type TransferAssetRelease = {
  chainID: string;
  denom: string;
};

export type TxStatusResponseJSON = {
  status: StatusState;
  next_blocking_transfer: NextBlockingTransferJSON | null;
  transfer_sequence: TransferInfoJSON[];
  transfer_asset_release: TransferAssetReleaseJSON | null;
  error: StatusError | null;
};

export type TxStatusResponse = {
  status: StatusState;
  nextBlockingTransfer: NextBlockingTransfer | null;
  transferSequence: TransferInfo[];
  transferAssetRelease: TransferAssetRelease | null;
  error: StatusError | null;
};

export type PacketJSON = {
  send_tx: ChainTransactionJSON | null;
  receive_tx: ChainTransactionJSON | null;
  acknowledge_tx: ChainTransactionJSON | null;
  timeout_tx: ChainTransactionJSON | null;

  error: PacketError | null;
};

export type Packet = {
  sendTx: ChainTransaction | null;
  receiveTx: ChainTransaction | null;
  acknowledgeTx: ChainTransaction | null;
  timeoutTx: ChainTransaction | null;

  error: PacketError | null;
};

export type StatusErrorType =
  | "STATUS_ERROR_UNKNOWN"
  | "STATUS_ERROR_TRANSACTION_EXECUTION"
  | "STATUS_ERROR_INDEXING";

export type TransactionExecutionError = {
  code: number;
  message: string;
};

export type StatusErrorJSON = {
  code: number;
  message: string;
  type: StatusErrorType;
  details: {
    transaction_execution_error: TransactionExecutionError;
  };
};

export type StatusError = {
  code: number;
  message: string;
  type: StatusErrorType;
  details: {
    transactionExecutionError: TransactionExecutionError;
  };
};

export type PacketErrorType =
  | "PACKET_ERROR_UNKNOWN"
  | "PACKET_ERROR_ACKNOWLEDGEMENT"
  | "PACKET_ERROR_TIMEOUT";

export type AcknowledgementError = {
  message: string;
  code: number;
};

export type PacketErrorJSON = {
  code: number;
  message: string;
  type: PacketErrorType;
  details: {
    acknowledgement_error: AcknowledgementError;
  };
};

export type PacketError = {
  code: number;
  message: string;
  type: PacketErrorType;
  details: {
    acknowledgementError: AcknowledgementError;
  };
};

export type ChainTransactionJSON = {
  chain_id: string;
  tx_hash: string;
};

export type ChainTransaction = {
  chainID: string;
  txHash: string;
};

export type TrackTxRequestJSON = {
  tx_hash: string;
  chain_id: string;
};

export type TrackTxRequest = {
  txHash: string;
  chainID: string;
};

export type TrackTxResponseJSON = {
  tx_hash: string;
};

export type TrackTxResponse = {
  txHash: string;
};
