import * as splToken from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';

const swapStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[];
}>([['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]], 'SwapInstructionArgs');
export type SwapInstructionAccounts = {
  treasuryMint: web3.PublicKey;
  payer: web3.PublicKey;
  paymentAccount: web3.PublicKey;
  paymentTransferAuthority: web3.PublicKey;
  token: web3.PublicKey;
  replacementTokenMetadata: web3.PublicKey;
  replacementTokenMint: web3.PublicKey;
  replacementToken: web3.PublicKey;
  transferAuthority: web3.PublicKey;
  tokenAEscrow: web3.PublicKey;
  tokenBEscrow: web3.PublicKey;
  entangledPair: web3.PublicKey;
};

const swapInstructionDiscriminator = [248, 198, 158, 145, 225, 117, 135, 200];

/**
 * Creates a _Swap_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 */
export function createSwapInstruction(accounts: SwapInstructionAccounts) {
  const {
    treasuryMint,
    payer,
    paymentAccount,
    paymentTransferAuthority,
    token,
    replacementTokenMetadata,
    replacementTokenMint,
    replacementToken,
    transferAuthority,
    tokenAEscrow,
    tokenBEscrow,
    entangledPair,
  } = accounts;

  const [data] = swapStruct.serialize({
    instructionDiscriminator: swapInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: treasuryMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: payer,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: paymentAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: paymentTransferAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: token,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: replacementTokenMetadata,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: replacementTokenMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: replacementToken,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: transferAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: tokenAEscrow,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: tokenBEscrow,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: entangledPair,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey('qntmGodpGkrM42mN68VCZHXnKqDCT8rdY23wFcXCLPd'),
    keys,
    data,
  });
  return ix;
}