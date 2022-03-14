import test from 'tape';
import { PayerTransactionHandler } from '@metaplex-foundation/amman';
import { Connection, Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';

import { findPrimaryMetadataCreatorsAddress } from '../../src';
import { createSavePrimaryMetadataCreatorsInstruction } from '../../src/generated/instructions/savePrimaryMetadataCreators';
import { Creator } from '../../src/types';

type CreateSecondaryMetadataCreatorsParams = {
  test: test.Test;
  transactionHandler: PayerTransactionHandler;
  payer: Keypair;
  connection: Connection;
  metadata: PublicKey;
  creators: Creator[];
};

export const createSavePrimaryMetadataCreators = async ({
  payer,
  metadata,
  creators,
}: CreateSecondaryMetadataCreatorsParams): Promise<{
  savePrimaryMetadataCreatorsInstruction: TransactionInstruction;
  primaryMetadataCreators: PublicKey;
}> => {
  const [primaryMetadataCreators, primaryMetadataCreatorsBump] =
    await findPrimaryMetadataCreatorsAddress(metadata);

  const savePrimaryMetadataCreatorsInstruction = createSavePrimaryMetadataCreatorsInstruction(
    {
      admin: payer.publicKey,
      metadata,
      primaryMetadataCreators,
    },
    {
      primaryMetadataCreatorsBump,
      creators,
    },
  );

  return { savePrimaryMetadataCreatorsInstruction, primaryMetadataCreators };
};
