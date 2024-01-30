export type SubmitTxRequestJSON = {
  tx: string;
  chain_id: string;
  client_id?: string;
};

export type SubmitTxRequest = {
  tx: string;
  chainID: string;
  clientID?: string;
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
  client_id?: string;
};

export type StatusRequest = {
  txHash: string;
  chainID: string;
  clientID?: string;
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
  transfer_sequence: TransferEventJSON[];
  next_blocking_transfer: NextBlockingTransferJSON | null;
  transfer_asset_release: TransferAssetReleaseJSON | null;
  error: StatusError | null;
  state: StatusState;
  transfers: TransferStatusJSON[];
};

export type TxStatusResponse = {
  status: StatusState;
  transferSequence: TransferEvent[];
  nextBlockingTransfer: NextBlockingTransfer | null;
  transferAssetRelease: TransferAssetRelease | null;
  error: StatusError | null;
  state: StatusState;
  transfers: TransferStatus[];
};

export type TransferStatusJSON = {
  state: StatusState;
  transfer_sequence: TransferEventJSON[];
  next_blocking_transfer: NextBlockingTransferJSON | null;
  transfer_asset_release: TransferAssetReleaseJSON | null;
  error: StatusError | null;
};

export type TransferStatus = {
  state: StatusState;
  transferSequence: TransferEvent[];
  nextBlockingTransfer: NextBlockingTransfer | null;
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
  explorer_link: string;
};

export type ChainTransaction = {
  chainID: string;
  txHash: string;
  explorerLink: string;
};

export type TrackTxRequestJSON = {
  tx_hash: string;
  chain_id: string;
  client_id?: string;
};

export type TrackTxRequest = {
  txHash: string;
  chainID: string;
  clientID?: string;
};

export type TrackTxResponseJSON = {
  tx_hash: string;
};

export type TrackTxResponse = {
  txHash: string;
};

export type AxelarTransferType =
  | "AXELAR_TRANSFER_CONTRACT_CALL_WITH_TOKEN"
  | "AXELAR_TRANSFER_SEND_TOKEN";

export type AxelarTransferState =
  | "AXELAR_TRANSFER_UNKNOWN"
  | "AXELAR_TRANSFER_PENDING_CONFIRMATION"
  | "AXELAR_TRANSFER_PENDING_RECEIPT"
  | "AXELAR_TRANSFER_SUCCESS"
  | "AXELAR_TRANSFER_FAILURE";

export type AxelarTransferInfoJSON = {
  src_chain_id: string;
  dst_chain_id: string;
  type: AxelarTransferType;
  state: AxelarTransferState;
  txs: AxelarTransferTransactionsJSON;
  axelar_scan_link: string;
};

export type AxelarTransferInfo = {
  srcChainID: string;
  dstChainID: string;
  type: AxelarTransferType;
  state: AxelarTransferState;
  txs: AxelarTransferTransactions;
  axelarScanLink: string;
};

export type AxelarTransferTransactionsJSON =
  | {
      contract_call_with_token_txs: ContractCallWithTokenTransactionsJSON;
    }
  | {
      send_token_txs: SendTokenTransactionsJSON;
    };

export type AxelarTransferTransactions =
  | {
      contractCallWithTokenTxs: ContractCallWithTokenTransactions;
    }
  | {
      sendTokenTxs: SendTokenTransactions;
    };

export type ContractCallWithTokenTransactionsJSON = {
  send_tx: ChainTransactionJSON | null;
  gas_paid_tx: ChainTransactionJSON | null;
  confirm_tx: ChainTransactionJSON | null;
  approve_tx: ChainTransactionJSON | null;
  execute_tx: ChainTransactionJSON | null;
  error: ContractCallWithTokenError | null;
};

export type ContractCallWithTokenTransactions = {
  sendTx: ChainTransaction | null;
  gasPaidTx: ChainTransaction | null;
  confirmTx: ChainTransaction | null;
  approveTx: ChainTransaction | null;
  executeTx: ChainTransaction | null;
  error: ContractCallWithTokenError | null;
};

export type ContractCallWithTokenError = {
  message: string;
  type: ContractCallWithTokenErrorType;
};

export type ContractCallWithTokenErrorType =
  "CONTRACT_CALL_WITH_TOKEN_EXECUTION_ERROR";

export type SendTokenTransactionsJSON = {
  send_tx: ChainTransactionJSON | null;
  confirm_tx: ChainTransactionJSON | null;
  execute_tx: ChainTransactionJSON | null;
  error: SendTokenError | null;
};

export type SendTokenTransactions = {
  sendTx: ChainTransaction | null;
  confirmTx: ChainTransaction | null;
  executeTx: ChainTransaction | null;
  error: SendTokenError | null;
};

export type SendTokenErrorType = "SEND_TOKEN_EXECUTION_ERROR";

export type SendTokenError = {
  message: string;
  type: SendTokenErrorType;
};

export type CCTPTransferState =
  | "CCTP_TRANSFER_UNKNOWN"
  | "CCTP_TRANSFER_SENT"
  | "CCTP_TRANSFER_PENDING_CONFIRMATION"
  | "CCTP_TRANSFER_CONFIRMED"
  | "CCTP_TRANSFER_RECEIVED";

export type CCTPTransferTransactionsJSON = {
  send_tx: ChainTransactionJSON | null;
  receive_tx: ChainTransactionJSON | null;
};

export type CCTPTransferTransactions = {
  sendTx: ChainTransaction | null;
  receiveTx: ChainTransaction | null;
};

export type CCTPTransferInfoJSON = {
  src_chain_id: string;
  dst_chain_id: string;
  state: CCTPTransferState;
  txs: CCTPTransferTransactionsJSON;
};

export type CCTPTransferInfo = {
  srcChainID: string;
  dstChainID: string;
  state: CCTPTransferState;
  txs: CCTPTransferTransactions;
};

export type TransferEventJSON =
  | {
      ibc_transfer: TransferInfoJSON;
    }
  | {
      axelar_transfer: AxelarTransferInfoJSON;
    }
  | { cctp_transfer: CCTPTransferInfoJSON };

export type TransferEvent =
  | {
      ibcTransfer: TransferInfo;
    }
  | { axelarTransfer: AxelarTransferInfo }
  | { cctpTransfer: CCTPTransferInfo };
