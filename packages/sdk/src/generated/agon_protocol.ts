/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/agon_protocol.json`.
 */
export type AgonProtocol = {
  "address": "77VR7b4BXx2KTSXA3Tbarw4w1MC5Qvv6QespTyCxWamM",
  "metadata": {
    "name": "agonProtocol",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "acceptConfigAuthority",
      "docs": [
        "Pending config authority accepts the handoff."
      ],
      "discriminator": [
        138,
        34,
        130,
        16,
        252,
        207,
        24,
        90
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "pendingAuthority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "acceptRegistryAuthority",
      "docs": [
        "Pending token registry authority accepts the handoff."
      ],
      "discriminator": [
        228,
        112,
        232,
        244,
        155,
        68,
        83,
        87
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "pendingAuthority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "accrueYield",
      "docs": [
        "Accrue yield for a yield-bearing token (permissionless). Pulls the latest cUSDC rate from",
        "the lending program, advances `user_index_q64`, and credits `protocol_owed_underlying`."
      ],
      "discriminator": [
        243,
        28,
        81,
        65,
        175,
        178,
        5,
        112
      ],
      "accounts": [
        {
          "name": "yieldStrategy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  121,
                  105,
                  101,
                  108,
                  100,
                  45,
                  115,
                  116,
                  114,
                  97,
                  116,
                  101,
                  103,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "yield_strategy.token_id",
                "account": "yieldStrategy"
              }
            ]
          }
        },
        {
          "name": "yieldProgram"
        },
        {
          "name": "reserve",
          "writable": true
        },
        {
          "name": "shareMint"
        },
        {
          "name": "shareVault"
        }
      ],
      "args": []
    },
    {
      "name": "cancelWithdrawal",
      "docs": [
        "Cancel a pending withdrawal for a specific token."
      ],
      "discriminator": [
        183,
        104,
        181,
        250,
        28,
        128,
        210,
        70
      ],
      "accounts": [
        {
          "name": "participantBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        }
      ]
    },
    {
      "name": "claimProtocolYieldFee",
      "docs": [
        "Claim accumulated protocol yield (fee_recipient only). Redeems up to",
        "`protocol_owed_underlying` USDC from the share_vault."
      ],
      "discriminator": [
        120,
        31,
        84,
        60,
        246,
        109,
        136,
        43
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "yieldStrategy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  121,
                  105,
                  101,
                  108,
                  100,
                  45,
                  115,
                  116,
                  114,
                  97,
                  116,
                  101,
                  103,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "yieldProgram"
        },
        {
          "name": "reserve",
          "writable": true
        },
        {
          "name": "underlyingMint"
        },
        {
          "name": "shareMint",
          "writable": true
        },
        {
          "name": "liquidityVault",
          "writable": true
        },
        {
          "name": "shareVault",
          "writable": true
        },
        {
          "name": "feeRecipientTokenAccount",
          "writable": true
        },
        {
          "name": "feeRecipient",
          "docs": [
            "Must be the fee_recipient (verified inside the handler against `global_config.fee_recipient`)."
          ],
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cooperativeUnlockChannelFunds",
      "docs": [
        "Instantly release channel collateral when both channel counterparties consent."
      ],
      "discriminator": [
        28,
        18,
        51,
        184,
        178,
        44,
        203,
        11
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "payerBucket",
          "writable": true
        },
        {
          "name": "payeeBucket"
        },
        {
          "name": "channelBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "payeeOwner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "payeeParticipantId",
          "type": "u32"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createChannel",
      "docs": [
        "Create a token-specific channel from payer to payee. Must be called before any payment commitments are signed or settled.",
        "Payer signs and pays ~0.002 SOL rent. Ensures payees and facilitators never pay for creation."
      ],
      "discriminator": [
        37,
        105,
        253,
        99,
        87,
        46,
        223,
        20
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "payerBucket"
        },
        {
          "name": "payeeBucket"
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "channelBucket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  110,
                  110,
                  101,
                  108,
                  45,
                  98,
                  117,
                  99,
                  107,
                  101,
                  116,
                  45,
                  118,
                  50
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              },
              {
                "kind": "arg",
                "path": "channelBucketId"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "payeeOwner",
          "signer": true,
          "optional": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "lowerParticipantId",
          "type": "u32"
        },
        {
          "name": "higherParticipantId",
          "type": "u32"
        },
        {
          "name": "channelBucketId",
          "type": "u64"
        },
        {
          "name": "authorizedSigner",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "deposit",
      "docs": [
        "Deposit tokens into the vault (credits signer's vault)."
      ],
      "discriminator": [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "participantBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "ownerTokenAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  45,
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositFor",
      "docs": [
        "Deposit a registered token for multiple participants in one tx.",
        "Funder's ATA to vault; credits each recipient.",
        "amounts.len() must equal remaining participant bucket slots. Max 16 recipients."
      ],
      "discriminator": [
        193,
        39,
        228,
        88,
        160,
        254,
        92,
        53
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "funderTokenAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  45,
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "funder",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "participantIds",
          "type": {
            "vec": "u32"
          }
        },
        {
          "name": "amounts",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "depositYieldBearing",
      "docs": [
        "Deposit USDC and receive a credit of agUSDC shares. The protocol CPIs into the lending",
        "program to mint cUSDC into its share_vault."
      ],
      "discriminator": [
        224,
        28,
        93,
        65,
        136,
        222,
        138,
        6
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "yieldStrategy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  121,
                  105,
                  101,
                  108,
                  100,
                  45,
                  115,
                  116,
                  114,
                  97,
                  116,
                  101,
                  103,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "participantBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "yieldProgram"
        },
        {
          "name": "reserve",
          "writable": true
        },
        {
          "name": "underlyingMint"
        },
        {
          "name": "shareMint",
          "writable": true
        },
        {
          "name": "liquidityVault",
          "writable": true
        },
        {
          "name": "shareVault",
          "writable": true
        },
        {
          "name": "depositorUnderlying",
          "writable": true
        },
        {
          "name": "depositor",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "executeUnlockChannelFunds",
      "docs": [
        "Execute a previously requested collateral unlock once its timelock expires."
      ],
      "discriminator": [
        15,
        42,
        242,
        109,
        6,
        117,
        101,
        63
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "payerBucket",
          "writable": true
        },
        {
          "name": "channelBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "payeeParticipantId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "executeUpdateChannelAuthorizedSigner",
      "docs": [
        "Execute a previously requested authorized-signer rotation once its timelock expires."
      ],
      "discriminator": [
        44,
        98,
        34,
        239,
        137,
        228,
        10,
        35
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "channelBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "payeeParticipantId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "executeWithdrawalTimelocked",
      "docs": [
        "Execute a withdrawal for a specific token after timelock expires."
      ],
      "discriminator": [
        15,
        177,
        178,
        198,
        72,
        205,
        114,
        135
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "participantBucket",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  45,
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "withdrawalDestination",
          "docs": [
            "Destination token account (any valid token ATA — participant or 3rd party)."
          ],
          "writable": true
        },
        {
          "name": "feeRecipientTokenAccount",
          "docs": [
            "Fee recipient's token account for the token being withdrawn."
          ],
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "participantId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "executeWithdrawalYieldBearing",
      "docs": [
        "Execute a previously requested withdrawal once its timelock expires. Redeems the",
        "proportional cUSDC into USDC and pays user (net) and fee_recipient (fee)."
      ],
      "discriminator": [
        97,
        217,
        165,
        242,
        147,
        40,
        132,
        136
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "yieldStrategy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  121,
                  105,
                  101,
                  108,
                  100,
                  45,
                  115,
                  116,
                  114,
                  97,
                  116,
                  101,
                  103,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "participantBucket",
          "writable": true
        },
        {
          "name": "yieldProgram"
        },
        {
          "name": "reserve",
          "writable": true
        },
        {
          "name": "underlyingMint"
        },
        {
          "name": "shareMint",
          "writable": true
        },
        {
          "name": "liquidityVault",
          "writable": true
        },
        {
          "name": "shareVault",
          "writable": true
        },
        {
          "name": "withdrawalDestination",
          "writable": true
        },
        {
          "name": "feeRecipientTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "participantId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "initialize",
      "docs": [
        "Initialize the protocol: creates GlobalConfig PDA.",
        "`chain_id` selects the immutable settlement domain and default timing policy."
      ],
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "feeRecipient",
          "docs": [
            "Wallet that receives registration-fee lamports and owns fee token accounts."
          ]
        },
        {
          "name": "upgradeAuthority",
          "docs": [
            "Program's upgrade authority performs the one-time bootstrap."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "program",
          "address": "77VR7b4BXx2KTSXA3Tbarw4w1MC5Qvv6QespTyCxWamM"
        },
        {
          "name": "programData"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "chainId",
          "type": "u16"
        },
        {
          "name": "feeBps",
          "type": "u16"
        },
        {
          "name": "registrationFeeLamports",
          "type": "u64"
        },
        {
          "name": "initialAuthority",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "initializeParticipant",
      "docs": [
        "One-time participant registration."
      ],
      "discriminator": [
        140,
        19,
        249,
        135,
        62,
        118,
        69,
        153
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "participantBucket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  99,
                  105,
                  112,
                  97,
                  110,
                  116,
                  45,
                  98,
                  117,
                  99,
                  107,
                  101,
                  116,
                  45,
                  118,
                  50
                ]
              },
              {
                "kind": "arg",
                "path": "participantBucketId"
              }
            ]
          }
        },
        {
          "name": "ownerIndexBucket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  119,
                  110,
                  101,
                  114,
                  45,
                  105,
                  110,
                  100,
                  101,
                  120,
                  45,
                  98,
                  117,
                  99,
                  107,
                  101,
                  116,
                  45,
                  118,
                  50
                ]
              },
              {
                "kind": "arg",
                "path": "ownerIndexBucketId"
              }
            ]
          }
        },
        {
          "name": "feeRecipient",
          "writable": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "participantBucketId",
          "type": "u32"
        },
        {
          "name": "ownerIndexBucketId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "initializeTokenRegistry",
      "docs": [
        "Initialize the token registry (authority only, called once after program deployment)."
      ],
      "discriminator": [
        206,
        94,
        91,
        162,
        242,
        92,
        51,
        192
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "lockChannelFunds",
      "docs": [
        "Lock tokens as ring-fenced collateral for a specific payee channel."
      ],
      "discriminator": [
        17,
        122,
        150,
        31,
        214,
        154,
        222,
        93
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "payerBucket",
          "writable": true
        },
        {
          "name": "channelBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "payeeParticipantId",
          "type": "u32"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "registerParticipantBlsKey",
      "docs": [
        "Register a BLS key used only for cooperative clearing rounds."
      ],
      "discriminator": [
        73,
        33,
        200,
        201,
        238,
        231,
        71,
        145
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "participantBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "blsPubkeyCompressed",
          "type": {
            "array": [
              "u8",
              96
            ]
          }
        },
        {
          "name": "popSignatureCompressed",
          "type": {
            "array": [
              "u8",
              48
            ]
          }
        }
      ]
    },
    {
      "name": "registerToken",
      "docs": [
        "Register a new token in the registry (authority only)."
      ],
      "discriminator": [
        32,
        146,
        36,
        240,
        80,
        183,
        36,
        84
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "vaultTokenAccount",
          "docs": [
            "Vault token account for this token (created when token is registered)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  45,
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "Mint to register"
          ]
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "docs": [
            "Registry authority"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "symbolBytes",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        }
      ]
    },
    {
      "name": "registerYieldBearingToken",
      "docs": [
        "Register a yield-bearing wrapper token (e.g. agUSDC). Creates a TokenEntry with",
        "`kind = YieldBearing`, allocates a `YieldStrategy` PDA, and creates the protocol-owned",
        "`share_vault` (a cUSDC ATA whose authority is the GlobalConfig PDA). Authority-only."
      ],
      "discriminator": [
        210,
        113,
        58,
        208,
        254,
        12,
        56,
        53
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "yieldStrategy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  121,
                  105,
                  101,
                  108,
                  100,
                  45,
                  115,
                  116,
                  114,
                  97,
                  116,
                  101,
                  103,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "underlyingMint",
          "docs": [
            "Underlying SPL mint (USDC)."
          ]
        },
        {
          "name": "yieldProgram",
          "docs": [
            "Lending program (mock-yield in dev / Save-Kamino in prod). Validated against `Reserve`."
          ]
        },
        {
          "name": "reserve",
          "docs": [
            "Existing `Reserve` PDA in the yield program. Must be initialised already."
          ]
        },
        {
          "name": "shareMint",
          "docs": [
            "Lending share mint (cUSDC). Mint authority = `reserve`."
          ]
        },
        {
          "name": "liquidityVault",
          "docs": [
            "Reserve's USDC vault — kept for symmetry/CPI ergonomics."
          ]
        },
        {
          "name": "shareVault",
          "docs": [
            "Protocol-owned cUSDC ATA under GlobalConfig PDA. PDA-seeded so it is deterministic."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  121,
                  105,
                  101,
                  108,
                  100,
                  45,
                  115,
                  104,
                  97,
                  114,
                  101,
                  45,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "symbolBytes",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        },
        {
          "name": "protocolYieldShareBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "requestUnlockChannelFunds",
      "docs": [
        "Request a timelocked partial unlock of channel collateral."
      ],
      "discriminator": [
        227,
        33,
        208,
        127,
        89,
        141,
        27,
        203
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "channelBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "payeeParticipantId",
          "type": "u32"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "requestUpdateChannelAuthorizedSigner",
      "docs": [
        "Request a timelocked rotation of the channel's authorized signer."
      ],
      "discriminator": [
        196,
        150,
        53,
        172,
        4,
        107,
        185,
        203
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "channelBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "payeeParticipantId",
          "type": "u32"
        },
        {
          "name": "newSigner",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "requestWithdrawal",
      "docs": [
        "Request a timelocked withdrawal for a specific token."
      ],
      "discriminator": [
        251,
        85,
        121,
        205,
        56,
        201,
        12,
        177
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "participantBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "withdrawalDestination",
          "docs": [
            "The withdrawal destination token account"
          ]
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "destination",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "requestWithdrawalYieldBearing",
      "docs": [
        "Request a timelocked withdrawal of `shares` agUSDC, redeemable to `destination` (USDC ATA)."
      ],
      "discriminator": [
        163,
        217,
        181,
        40,
        252,
        238,
        234,
        225
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "yieldStrategy",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  121,
                  105,
                  101,
                  108,
                  100,
                  45,
                  115,
                  116,
                  114,
                  97,
                  116,
                  101,
                  103,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "tokenId"
              }
            ]
          }
        },
        {
          "name": "participantBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "withdrawalDestination"
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
        },
        {
          "name": "shares",
          "type": "u64"
        },
        {
          "name": "destination",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "settleClearingRound",
      "docs": [
        "BLS-authenticated cooperative clearing round: advances many logical channels and applies",
        "only net participant balance changes through bucket accounts."
      ],
      "discriminator": [
        172,
        91,
        157,
        209,
        159,
        165,
        164,
        205
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "submitter",
          "writable": true,
          "signer": true
        },
        {
          "name": "instructionsSysvar",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "message",
          "type": "bytes"
        },
        {
          "name": "aggregateSignatureCompressed",
          "type": {
            "array": [
              "u8",
              48
            ]
          }
        }
      ]
    },
    {
      "name": "settleCommitmentBundle",
      "docs": [
        "Settle many latest commitments for one payee across many unilateral channels."
      ],
      "discriminator": [
        216,
        165,
        96,
        156,
        207,
        11,
        86,
        63
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "submitter",
          "writable": true,
          "signer": true
        },
        {
          "name": "instructionsSysvar",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "count",
          "type": "u8"
        }
      ]
    },
    {
      "name": "settleIndividual",
      "docs": [
        "Settle a single payment commitment. Submitter must be the payee or an authorized settler."
      ],
      "discriminator": [
        34,
        189,
        136,
        193,
        154,
        42,
        233,
        49
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "submitter",
          "writable": true,
          "signer": true
        },
        {
          "name": "instructionsSysvar",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateConfig",
      "docs": [
        "Update protocol configuration (authority only).",
        "Settlement chain_id and default timing policies are immutable and cannot be changed."
      ],
      "discriminator": [
        29,
        158,
        252,
        191,
        10,
        83,
        219,
        99
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "docs": [
            "Config authority — only this key can update config."
          ],
          "signer": true,
          "relations": [
            "globalConfig"
          ]
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "newFeeRecipient",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "newFeeBps",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "newRegistrationFeeLamports",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "updateInboundChannelPolicy",
      "docs": [
        "Update the participant's inbound channel policy."
      ],
      "discriminator": [
        90,
        47,
        72,
        151,
        139,
        252,
        19,
        78
      ],
      "accounts": [
        {
          "name": "participantBucket",
          "writable": true
        },
        {
          "name": "ownerIndexBucket"
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "inboundChannelPolicy",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateRegistryAuthority",
      "docs": [
        "Nominate a pending token registry authority."
      ],
      "discriminator": [
        36,
        103,
        15,
        149,
        117,
        134,
        26,
        41
      ],
      "accounts": [
        {
          "name": "tokenRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  45,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "currentAuthority",
          "docs": [
            "Current authority"
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "pubkey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalConfig",
      "discriminator": [
        149,
        8,
        156,
        202,
        160,
        252,
        176,
        217
      ]
    },
    {
      "name": "ownerIndexBucket",
      "discriminator": [
        185,
        229,
        16,
        160,
        17,
        106,
        145,
        192
      ]
    },
    {
      "name": "reserve",
      "discriminator": [
        43,
        242,
        204,
        202,
        26,
        247,
        59,
        127
      ]
    },
    {
      "name": "tokenRegistry",
      "discriminator": [
        227,
        255,
        152,
        118,
        84,
        200,
        145,
        120
      ]
    },
    {
      "name": "yieldStrategy",
      "discriminator": [
        153,
        203,
        41,
        77,
        234,
        105,
        146,
        235
      ]
    }
  ],
  "events": [
    {
      "name": "channelAuthorizedSignerUpdateRequested",
      "discriminator": [
        23,
        50,
        157,
        244,
        11,
        21,
        150,
        241
      ]
    },
    {
      "name": "channelAuthorizedSignerUpdated",
      "discriminator": [
        52,
        244,
        219,
        121,
        176,
        126,
        4,
        38
      ]
    },
    {
      "name": "channelCreated",
      "discriminator": [
        32,
        4,
        161,
        165,
        148,
        144,
        56,
        139
      ]
    },
    {
      "name": "channelFundsLocked",
      "discriminator": [
        146,
        187,
        75,
        43,
        84,
        112,
        53,
        224
      ]
    },
    {
      "name": "channelFundsUnlocked",
      "discriminator": [
        137,
        22,
        235,
        8,
        189,
        212,
        74,
        196
      ]
    },
    {
      "name": "channelUnlockRequested",
      "discriminator": [
        178,
        124,
        32,
        190,
        132,
        96,
        189,
        79
      ]
    },
    {
      "name": "clearingRoundSettled",
      "discriminator": [
        122,
        115,
        145,
        36,
        176,
        77,
        63,
        212
      ]
    },
    {
      "name": "commitmentBundleSettled",
      "discriminator": [
        220,
        114,
        110,
        246,
        81,
        235,
        243,
        248
      ]
    },
    {
      "name": "configAuthorityTransferStarted",
      "discriminator": [
        56,
        105,
        50,
        173,
        103,
        239,
        20,
        7
      ]
    },
    {
      "name": "configAuthorityTransferred",
      "discriminator": [
        116,
        152,
        24,
        23,
        117,
        176,
        34,
        143
      ]
    },
    {
      "name": "configUpdated",
      "discriminator": [
        40,
        241,
        230,
        122,
        11,
        19,
        198,
        194
      ]
    },
    {
      "name": "deposited",
      "discriminator": [
        111,
        141,
        26,
        45,
        161,
        35,
        100,
        57
      ]
    },
    {
      "name": "inboundChannelPolicyUpdated",
      "discriminator": [
        105,
        82,
        102,
        34,
        224,
        237,
        140,
        178
      ]
    },
    {
      "name": "individualSettled",
      "discriminator": [
        5,
        202,
        48,
        14,
        106,
        152,
        91,
        3
      ]
    },
    {
      "name": "participantBlsKeyRegistered",
      "discriminator": [
        215,
        146,
        255,
        155,
        160,
        112,
        89,
        102
      ]
    },
    {
      "name": "participantInitialized",
      "discriminator": [
        177,
        34,
        13,
        226,
        173,
        96,
        231,
        179
      ]
    },
    {
      "name": "protocolYieldClaimed",
      "discriminator": [
        232,
        119,
        241,
        63,
        52,
        240,
        156,
        100
      ]
    },
    {
      "name": "registryAuthorityTransferStarted",
      "discriminator": [
        98,
        230,
        147,
        76,
        30,
        12,
        224,
        43
      ]
    },
    {
      "name": "registryAuthorityTransferred",
      "discriminator": [
        70,
        11,
        67,
        54,
        50,
        206,
        25,
        115
      ]
    },
    {
      "name": "withdrawalCancelled",
      "discriminator": [
        119,
        175,
        207,
        80,
        186,
        237,
        229,
        9
      ]
    },
    {
      "name": "withdrawalRequested",
      "discriminator": [
        75,
        207,
        21,
        12,
        160,
        102,
        150,
        55
      ]
    },
    {
      "name": "withdrawn",
      "discriminator": [
        20,
        89,
        223,
        198,
        194,
        124,
        219,
        13
      ]
    },
    {
      "name": "yieldAccrued",
      "discriminator": [
        195,
        121,
        41,
        184,
        183,
        9,
        52,
        221
      ]
    },
    {
      "name": "yieldBearingTokenRegistered",
      "discriminator": [
        33,
        190,
        209,
        168,
        77,
        193,
        96,
        12
      ]
    },
    {
      "name": "yieldDeposited",
      "discriminator": [
        240,
        44,
        237,
        73,
        80,
        47,
        196,
        86
      ]
    },
    {
      "name": "yieldWithdrawn",
      "discriminator": [
        175,
        101,
        144,
        232,
        244,
        176,
        99,
        108
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "insufficientBalance",
      "msg": "Insufficient balance for this operation"
    },
    {
      "code": 6001,
      "name": "withdrawalAlreadyPending",
      "msg": "A withdrawal is already pending"
    },
    {
      "code": 6002,
      "name": "noWithdrawalPending",
      "msg": "No withdrawal is currently pending"
    },
    {
      "code": 6003,
      "name": "withdrawalLocked",
      "msg": "Unlock timelock has not yet expired"
    },
    {
      "code": 6004,
      "name": "invalidWithdrawalDestination",
      "msg": "Invalid withdrawal destination address"
    },
    {
      "code": 6005,
      "name": "invalidAuthority",
      "msg": "Authority cannot be the zero address"
    },
    {
      "code": 6006,
      "name": "invalidFeeRecipient",
      "msg": "Fee recipient cannot be the zero address"
    },
    {
      "code": 6007,
      "name": "invalidInboundChannelPolicy",
      "msg": "Invalid inbound channel policy"
    },
    {
      "code": 6008,
      "name": "unauthorizedInitializer",
      "msg": "Only the program upgrade authority can initialize the protocol"
    },
    {
      "code": 6009,
      "name": "invalidFeeBps",
      "msg": "Fee BPS must be between 3 (0.03%) and 30 (0.3%)"
    },
    {
      "code": 6010,
      "name": "invalidRegistrationFee",
      "msg": "Registration fee must be 0 or between 0.001 and 0.01 SOL"
    },
    {
      "code": 6011,
      "name": "invalidDepositFor",
      "msg": "Invalid deposit_for: amounts length must match recipients, max 16"
    },
    {
      "code": 6012,
      "name": "amountMustBePositive",
      "msg": "Amount must be greater than zero"
    },
    {
      "code": 6013,
      "name": "commitmentAmountMustIncrease",
      "msg": "Committed amount must be greater than the previously settled amount"
    },
    {
      "code": 6014,
      "name": "invalidAuthoritySignature",
      "msg": "Invalid authority signature"
    },
    {
      "code": 6015,
      "name": "signatureAlreadyUsed",
      "msg": "This signature or clearing round has already been used"
    },
    {
      "code": 6016,
      "name": "participantNotFound",
      "msg": "Participant not found"
    },
    {
      "code": 6017,
      "name": "accountIdMismatch",
      "msg": "Account participant_id does not match message participant_id"
    },
    {
      "code": 6018,
      "name": "invalidCommitmentMessage",
      "msg": "Invalid payment commitment message format"
    },
    {
      "code": 6019,
      "name": "invalidClearingRoundMessage",
      "msg": "Invalid clearing round message format"
    },
    {
      "code": 6020,
      "name": "netFlowImbalance",
      "msg": "Net flow sums do not balance"
    },
    {
      "code": 6021,
      "name": "netPositionOverflow",
      "msg": "Net position computation overflowed"
    },
    {
      "code": 6022,
      "name": "mathOverflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6023,
      "name": "invalidChainId",
      "msg": "Chain ID is not supported by this deployment configuration"
    },
    {
      "code": 6024,
      "name": "invalidMessageDomain",
      "msg": "Message domain does not match this deployment"
    },
    {
      "code": 6025,
      "name": "invalidSignature",
      "msg": "Ed25519 signature verification failed"
    },
    {
      "code": 6026,
      "name": "invalidBlsPublicKey",
      "msg": "Invalid BLS public key"
    },
    {
      "code": 6027,
      "name": "invalidBlsSignature",
      "msg": "Invalid BLS aggregate signature"
    },
    {
      "code": 6028,
      "name": "invalidBlsProofOfPossession",
      "msg": "Invalid BLS proof of possession"
    },
    {
      "code": 6029,
      "name": "participantBlsKeyNotFound",
      "msg": "Participant inline BLS key is not registered"
    },
    {
      "code": 6030,
      "name": "participantBlsKeyAlreadyRegistered",
      "msg": "Participant already has a registered BLS key"
    },
    {
      "code": 6031,
      "name": "accountBlsKeyMismatch",
      "msg": "BLS key registration does not match the participant"
    },
    {
      "code": 6032,
      "name": "blsSyscallFailed",
      "msg": "BLS syscall failed or is unavailable on this cluster"
    },
    {
      "code": 6033,
      "name": "cpiNotAllowed",
      "msg": "CPI calls to settlement instructions are not allowed"
    },
    {
      "code": 6034,
      "name": "invalidEd25519Data",
      "msg": "Invalid Ed25519 instruction data"
    },
    {
      "code": 6035,
      "name": "channelNotInitialized",
      "msg": "Channel must be initialized before use - call create_channel first"
    },
    {
      "code": 6036,
      "name": "channelAlreadyExists",
      "msg": "Channel already exists for this payer-payee pair"
    },
    {
      "code": 6037,
      "name": "unauthorizedSettler",
      "msg": "Only the payee or authorized settler can submit this payment commitment"
    },
    {
      "code": 6038,
      "name": "inboundChannelConsentRequired",
      "msg": "Payee consent is required to create this inbound channel"
    },
    {
      "code": 6039,
      "name": "counterpartyConsentRequired",
      "msg": "Counterparty consent is required for cooperative channel unlock"
    },
    {
      "code": 6040,
      "name": "inboundChannelsDisabled",
      "msg": "This participant does not accept inbound channels"
    },
    {
      "code": 6041,
      "name": "selfChannelNotAllowed",
      "msg": "Self-channels are not allowed"
    },
    {
      "code": 6042,
      "name": "noPendingAuthorityTransfer",
      "msg": "No authority transfer is currently pending"
    },
    {
      "code": 6043,
      "name": "unauthorizedPendingAuthority",
      "msg": "Only the nominated pending authority can accept this transfer"
    },
    {
      "code": 6044,
      "name": "tooManyTokenBalances",
      "msg": "Maximum token balances per participant exceeded"
    },
    {
      "code": 6045,
      "name": "tokenNotFound",
      "msg": "Token ID not registered in token registry"
    },
    {
      "code": 6046,
      "name": "tokenAlreadyRegistered",
      "msg": "Token mint already registered"
    },
    {
      "code": 6047,
      "name": "tokenIdAlreadyInUse",
      "msg": "Token ID already in use"
    },
    {
      "code": 6048,
      "name": "unauthorizedTokenRegistration",
      "msg": "Unauthorized token registration"
    },
    {
      "code": 6049,
      "name": "invalidTokenId",
      "msg": "Token ID must be greater than zero"
    },
    {
      "code": 6050,
      "name": "invalidTokenSymbol",
      "msg": "Token symbol must be valid ASCII"
    },
    {
      "code": 6051,
      "name": "invalidTokenDecimals",
      "msg": "Token decimals exceed the protocol maximum"
    },
    {
      "code": 6052,
      "name": "tokenRegistryFull",
      "msg": "Token registry account is full"
    },
    {
      "code": 6053,
      "name": "invalidTokenMint",
      "msg": "Token account mint doesn't match registered token"
    },
    {
      "code": 6054,
      "name": "insufficientLockedBalance",
      "msg": "Requested unlock amount exceeds the channel's locked balance"
    },
    {
      "code": 6055,
      "name": "noChannelUnlockPending",
      "msg": "No channel unlock is currently pending"
    },
    {
      "code": 6056,
      "name": "invalidAuthorizedSigner",
      "msg": "Authorized signer cannot be the zero address or the current signer"
    },
    {
      "code": 6057,
      "name": "noAuthorizedSignerUpdatePending",
      "msg": "No authorized signer update is currently pending"
    },
    {
      "code": 6058,
      "name": "bucketAccountMismatch",
      "msg": "Bucket account does not match the expected bucket id or PDA"
    },
    {
      "code": 6059,
      "name": "bucketSlotMismatch",
      "msg": "Bucket slot does not match the expected logical row"
    },
    {
      "code": 6060,
      "name": "bucketSlotAlreadyInitialized",
      "msg": "Bucket slot is already initialized"
    },
    {
      "code": 6061,
      "name": "bucketFull",
      "msg": "Bucket has no remaining free slots"
    },
    {
      "code": 6062,
      "name": "ownerAlreadyRegistered",
      "msg": "Owner is already registered"
    },
    {
      "code": 6063,
      "name": "tokenIsYieldBearing",
      "msg": "Token id is yield-bearing; use the yield-bearing instruction variant"
    },
    {
      "code": 6064,
      "name": "tokenIsNotYieldBearing",
      "msg": "Token id is plain; use the plain deposit/withdrawal instruction"
    },
    {
      "code": 6065,
      "name": "invalidYieldStrategy",
      "msg": "YieldStrategy account does not match the registered token configuration"
    },
    {
      "code": 6066,
      "name": "insufficientProtocolYield",
      "msg": "Requested protocol yield claim exceeds accrued protocol yield"
    },
    {
      "code": 6067,
      "name": "yieldUnderlyingMismatch",
      "msg": "Yield-bearing underlying mint does not match the lending reserve"
    },
    {
      "code": 6068,
      "name": "solvencyInvariantBroken",
      "msg": "Solvency invariant violated: share_vault USDC value < user_owed + protocol_owed"
    },
    {
      "code": 6069,
      "name": "invalidYieldProgram",
      "msg": "Yield program account does not match strategy.yield_program"
    },
    {
      "code": 6070,
      "name": "invalidProtocolYieldShareBps",
      "msg": "Protocol yield share bps exceeds the maximum allowed value"
    }
  ],
  "types": [
    {
      "name": "channelAuthorizedSignerUpdateRequested",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payerId",
            "type": "u32"
          },
          {
            "name": "payeeId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "currentAuthorizedSigner",
            "type": "pubkey"
          },
          {
            "name": "pendingAuthorizedSigner",
            "type": "pubkey"
          },
          {
            "name": "activateAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "channelAuthorizedSignerUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payerId",
            "type": "u32"
          },
          {
            "name": "payeeId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "previousAuthorizedSigner",
            "type": "pubkey"
          },
          {
            "name": "newAuthorizedSigner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "channelCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payerId",
            "type": "u32"
          },
          {
            "name": "payeeId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "channelFundsLocked",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payerId",
            "type": "u32"
          },
          {
            "name": "payeeId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "totalLocked",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "channelFundsUnlocked",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payerId",
            "type": "u32"
          },
          {
            "name": "payeeId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "releasedAmount",
            "type": "u64"
          },
          {
            "name": "remainingLocked",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "channelUnlockRequested",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payerId",
            "type": "u32"
          },
          {
            "name": "payeeId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "requestedAmount",
            "type": "u64"
          },
          {
            "name": "unlockAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "clearingRoundSettled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "participantCount",
            "type": "u16"
          },
          {
            "name": "channelCount",
            "type": "u16"
          },
          {
            "name": "totalGross",
            "type": "u64"
          },
          {
            "name": "totalNetAdjusted",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "commitmentBundleSettled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payeeId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "channelCount",
            "type": "u16"
          },
          {
            "name": "total",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "configAuthorityTransferStarted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentAuthority",
            "type": "pubkey"
          },
          {
            "name": "pendingAuthority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "configAuthorityTransferred",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "previousAuthority",
            "type": "pubkey"
          },
          {
            "name": "newAuthority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "configUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "feeRecipient",
            "type": "pubkey"
          },
          {
            "name": "feeBps",
            "type": "u16"
          },
          {
            "name": "chainId",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "deposited",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "participantId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "globalConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Active config authority - can update fee_recipient, fee_bps, etc.",
              "Bootstrap starts with the program upgrade authority until any nominated authority accepts."
            ],
            "type": "pubkey"
          },
          {
            "name": "feeRecipient",
            "docs": [
              "Wallet that receives registration-fee lamports and owns per-token fee accounts."
            ],
            "type": "pubkey"
          },
          {
            "name": "feeBps",
            "docs": [
              "Withdrawal fee in basis points (default 30 = 0.3%)"
            ],
            "type": "u16"
          },
          {
            "name": "withdrawalTimelockSeconds",
            "docs": [
              "Seconds before a pending available-balance withdrawal becomes executable."
            ],
            "type": "i64"
          },
          {
            "name": "registrationFeeLamports",
            "docs": [
              "Flat SOL fee at initialize_participant (default 0)"
            ],
            "type": "u64"
          },
          {
            "name": "nextParticipantId",
            "docs": [
              "Auto-incrementing participant ID counter"
            ],
            "type": "u32"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump"
            ],
            "type": "u8"
          },
          {
            "name": "chainId",
            "docs": [
              "Protocol chain identifier used in signed message validation."
            ],
            "type": "u16"
          },
          {
            "name": "messageDomain",
            "docs": [
              "Immutable deployment-scoped domain used by signed settlement messages."
            ],
            "type": {
              "array": [
                "u8",
                16
              ]
            }
          },
          {
            "name": "pendingAuthority",
            "docs": [
              "Pending authority that must explicitly accept before a handoff completes."
            ],
            "type": "pubkey"
          },
          {
            "name": "channelUnlockTimelockSeconds",
            "docs": [
              "Seconds before a unilateral channel-collateral unlock becomes executable."
            ],
            "type": "i64"
          },
          {
            "name": "reserved",
            "docs": [
              "Reserved for future config expansion."
            ],
            "type": {
              "array": [
                "u8",
                6
              ]
            }
          }
        ]
      }
    },
    {
      "name": "inboundChannelPolicyUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "participantId",
            "type": "u32"
          },
          {
            "name": "inboundChannelPolicy",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "individualSettled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payerId",
            "type": "u32"
          },
          {
            "name": "payeeId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "committedAmount",
            "type": "u64"
          },
          {
            "name": "fromLocked",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "ownerIndexBucket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bucketId",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "slots",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "ownerIndexSlot"
                  }
                },
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ownerIndexSlot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "participantId",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "participantBlsKeyRegistered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "participantId",
            "type": "u32"
          },
          {
            "name": "participantBucket",
            "type": "pubkey"
          },
          {
            "name": "schemeVersion",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "participantInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "participantId",
            "type": "u32"
          },
          {
            "name": "registrationFeeLamports",
            "type": "u64"
          },
          {
            "name": "inboundChannelPolicy",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "protocolYieldClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "feeRecipient",
            "type": "pubkey"
          },
          {
            "name": "usdcAmount",
            "type": "u64"
          },
          {
            "name": "protocolOwedUnderlyingAfter",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "registryAuthorityTransferStarted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentAuthority",
            "type": "pubkey"
          },
          {
            "name": "pendingAuthority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "registryAuthorityTransferred",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "previousAuthority",
            "type": "pubkey"
          },
          {
            "name": "newAuthority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "reserve",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "underlyingMint",
            "type": "pubkey"
          },
          {
            "name": "shareMint",
            "type": "pubkey"
          },
          {
            "name": "liquidityVault",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "apyBps",
            "type": "u16"
          },
          {
            "name": "lastAccrualTs",
            "type": "i64"
          },
          {
            "name": "totalUnderlying",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tokenEntry",
      "docs": [
        "Token registry entry",
        "Total: 56 bytes per entry (was 51 in v5; +1 for `kind`, +4 reserved for future fields)."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "Unique 2-byte token identifier (0-65,535)"
            ],
            "type": "u16"
          },
          {
            "name": "mint",
            "docs": [
              "SPL token mint address (or `Pubkey::default()` for yield-bearing wrapper tokens",
              "that have no separate mint)."
            ],
            "type": "pubkey"
          },
          {
            "name": "decimals",
            "docs": [
              "Token decimals for amount validation. For yield-bearing wrappers this matches the",
              "underlying so balance display / commitment math stays uniform."
            ],
            "type": "u8"
          },
          {
            "name": "symbol",
            "docs": [
              "ASCII symbol (e.g., \"TOK1\", \"TOK2\") - null-terminated"
            ],
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "registeredAt",
            "docs": [
              "Unix timestamp when token was registered (immutable)"
            ],
            "type": "i64"
          },
          {
            "name": "kind",
            "docs": [
              "`0 = Plain`, `1 = YieldBearing` (see TOKEN_KIND_* consts)."
            ],
            "type": "u8"
          },
          {
            "name": "reserved",
            "docs": [
              "Reserved padding for future fields (do not change the size — accounts are pre-allocated)."
            ],
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tokenRegistry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Registry authority - can register new tokens"
            ],
            "type": "pubkey"
          },
          {
            "name": "tokens",
            "docs": [
              "Array of registered token entries stored inside a fixed-size account."
            ],
            "type": {
              "vec": {
                "defined": {
                  "name": "tokenEntry"
                }
              }
            }
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump"
            ],
            "type": "u8"
          },
          {
            "name": "pendingAuthority",
            "docs": [
              "Pending authority that must explicitly accept before a handoff completes."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "withdrawalCancelled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "participantId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "amountReturned",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "withdrawalRequested",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "participantId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "destination",
            "type": "pubkey"
          },
          {
            "name": "unlockAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "withdrawn",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "participantId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "netAmount",
            "type": "u64"
          },
          {
            "name": "feeAmount",
            "type": "u64"
          },
          {
            "name": "destination",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "yieldAccrued",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "currentUnderlying",
            "type": "u64"
          },
          {
            "name": "lastSettledUnderlying",
            "type": "u64"
          },
          {
            "name": "userIndexQ64",
            "type": "u128"
          },
          {
            "name": "protocolOwedUnderlying",
            "type": "u64"
          },
          {
            "name": "totalUserShares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "yieldBearingTokenRegistered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "underlyingMint",
            "type": "pubkey"
          },
          {
            "name": "shareMint",
            "type": "pubkey"
          },
          {
            "name": "shareVault",
            "type": "pubkey"
          },
          {
            "name": "reserve",
            "type": "pubkey"
          },
          {
            "name": "yieldProgram",
            "type": "pubkey"
          },
          {
            "name": "protocolYieldShareBps",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "yieldDeposited",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "participantId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "usdcAmount",
            "type": "u64"
          },
          {
            "name": "sharesMinted",
            "type": "u64"
          },
          {
            "name": "userIndexQ64",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "yieldStrategy",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenId",
            "docs": [
              "agUSDC token id (the yield-bearing wrapper this strategy represents)."
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump for `[YIELD_STRATEGY_SEED, token_id_le]`."
            ],
            "type": "u8"
          },
          {
            "name": "shareVaultBump",
            "docs": [
              "PDA bump for `[YIELD_SHARE_VAULT_SEED, token_id_le]`."
            ],
            "type": "u8"
          },
          {
            "name": "protocolYieldShareBps",
            "docs": [
              "Protocol's slice of new yield, in basis points. `3_333` = 33.33%."
            ],
            "type": "u16"
          },
          {
            "name": "underlyingMint",
            "docs": [
              "Underlying SPL mint (e.g. USDC). Same as `mock_yield::Reserve.underlying_mint`."
            ],
            "type": "pubkey"
          },
          {
            "name": "yieldProgram",
            "docs": [
              "Mock-yield (or production lending) program id."
            ],
            "type": "pubkey"
          },
          {
            "name": "reserve",
            "docs": [
              "`Reserve` account in the yield program."
            ],
            "type": "pubkey"
          },
          {
            "name": "shareMint",
            "docs": [
              "Lending share mint (e.g. cUSDC)."
            ],
            "type": "pubkey"
          },
          {
            "name": "shareVault",
            "docs": [
              "Protocol-owned ATA holding cUSDC, authority = GlobalConfig PDA. Single ATA backs both",
              "users and the protocol fee."
            ],
            "type": "pubkey"
          },
          {
            "name": "liquidityVault",
            "docs": [
              "`Reserve.liquidity_vault` cached for CPI ergonomics."
            ],
            "type": "pubkey"
          },
          {
            "name": "userIndexQ64",
            "docs": [
              "Q64.64 index: 1 agUSDC share -> (user_index_q64 / 2^64) USDC. Starts at `Q64_ONE`,",
              "monotonically non-decreasing under accrual, never decreases under deposits/withdrawals."
            ],
            "type": "u128"
          },
          {
            "name": "lastSettledUnderlying",
            "docs": [
              "USDC value of `share_vault` as of last accrual. Used to detect new yield in `accrue_yield`."
            ],
            "type": "u64"
          },
          {
            "name": "totalUserShares",
            "docs": [
              "Sum of agUSDC `available + withdrawing` across all participant buckets for this token.",
              "Sanity counter; truth still lives in buckets. Used by `accrue_yield` to compute per-share",
              "yield attribution and to enforce the invariant."
            ],
            "type": "u64"
          },
          {
            "name": "protocolOwedUnderlying",
            "docs": [
              "Protocol's USDC claim. Increases only inside `accrue_yield`. Decreases only inside",
              "`claim_protocol_yield_fee`. Never touched by deposit/withdraw/channel paths."
            ],
            "type": "u64"
          },
          {
            "name": "reserved",
            "docs": [
              "Padding for future fields (e.g. additional fee tiers, snapshot history)."
            ],
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    },
    {
      "name": "yieldWithdrawn",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "participantId",
            "type": "u32"
          },
          {
            "name": "tokenId",
            "type": "u16"
          },
          {
            "name": "sharesBurned",
            "type": "u64"
          },
          {
            "name": "usdcGross",
            "type": "u64"
          },
          {
            "name": "usdcNet",
            "type": "u64"
          },
          {
            "name": "usdcFee",
            "type": "u64"
          },
          {
            "name": "destination",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
