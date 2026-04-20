/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/agon_protocol.json`.
 */
export type AgonProtocol = {
  "address": "Ba2puU8D2CLD1dYfRQ4YBXxirdyz3zVLLChvMf9AqJ1Y",
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
          "name": "participantAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "participantAccount"
          ]
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
          "name": "payerAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "payeeAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "payee_account.owner",
                "account": "participantAccount"
              }
            ]
          }
        },
        {
          "name": "channelState",
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
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "payer_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "payee_account.participant_id",
                "account": "participantAccount"
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
          "writable": true,
          "signer": true,
          "relations": [
            "payerAccount"
          ]
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
          "name": "participantAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
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
          "signer": true,
          "relations": [
            "participantAccount"
          ]
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
        "amounts.len() must equal remaining_accounts (ParticipantAccounts). Max 16 recipients."
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
          "name": "amounts",
          "type": {
            "vec": "u64"
          }
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
          "name": "payerAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "payeeAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "payee_account.owner",
                "account": "participantAccount"
              }
            ]
          }
        },
        {
          "name": "channelState",
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
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "payer_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "payee_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "channel_state.token_id",
                "account": "channelState"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "payerAccount"
          ]
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
          "name": "payerAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "payeeAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "payee_account.owner",
                "account": "participantAccount"
              }
            ]
          }
        },
        {
          "name": "channelState",
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
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "payer_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "payee_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "channel_state.token_id",
                "account": "channelState"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "payerAccount"
          ]
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
          "name": "participantAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "participant_account.owner",
                "account": "participantAccount"
              }
            ]
          }
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
        }
      ]
    },
    {
      "name": "initialize",
      "docs": [
        "Initialize the protocol: creates GlobalConfig PDA.",
        "`chain_id` selects the immutable settlement domain and withdrawal timelock."
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
          "address": "Ba2puU8D2CLD1dYfRQ4YBXxirdyz3zVLLChvMf9AqJ1Y"
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
          "name": "participantAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
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
      "args": []
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
          "name": "payerAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "payeeAccount"
        },
        {
          "name": "channelState",
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
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "payer_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "payee_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "channel_state.token_id",
                "account": "channelState"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "payerAccount"
          ]
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
          "name": "amount",
          "type": "u64"
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
          "name": "payerAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "payeeAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "payee_account.owner",
                "account": "participantAccount"
              }
            ]
          }
        },
        {
          "name": "channelState",
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
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "payer_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "payee_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "channel_state.token_id",
                "account": "channelState"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "payerAccount"
          ]
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
          "name": "payerAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "payeeAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "payee_account.owner",
                "account": "participantAccount"
              }
            ]
          }
        },
        {
          "name": "channelState",
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
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "payer_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "payee_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "channel_state.token_id",
                "account": "channelState"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "payerAccount"
          ]
        }
      ],
      "args": [
        {
          "name": "tokenId",
          "type": "u16"
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
          "name": "participantAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "withdrawalDestination",
          "docs": [
            "The withdrawal destination token account"
          ]
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "participantAccount"
          ]
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
      "name": "settleClearingRound",
      "docs": [
        "Cooperative clearing round: advances many channels and applies only net participant balance changes."
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
      "args": []
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
          "name": "payeeAccount",
          "writable": true
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
          "name": "payerAccount",
          "writable": true
        },
        {
          "name": "payeeAccount",
          "writable": true
        },
        {
          "name": "channelState",
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
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "payer_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "payee_account.participant_id",
                "account": "participantAccount"
              },
              {
                "kind": "account",
                "path": "channel_state.token_id",
                "account": "channelState"
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
        "Settlement chain_id and withdrawal timelock are immutable and cannot be changed."
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
          "name": "participantAccount",
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "participantAccount"
          ]
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
      "name": "channelState",
      "discriminator": [
        74,
        132,
        141,
        196,
        64,
        52,
        83,
        136
      ]
    },
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
      "name": "participantAccount",
      "discriminator": [
        239,
        31,
        144,
        66,
        245,
        178,
        84,
        109
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
      "msg": "Withdrawal timelock has not yet expired"
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
      "name": "cpiNotAllowed",
      "msg": "CPI calls to settlement instructions are not allowed"
    },
    {
      "code": 6027,
      "name": "invalidEd25519Data",
      "msg": "Invalid Ed25519 instruction data"
    },
    {
      "code": 6028,
      "name": "channelNotInitialized",
      "msg": "Channel must be initialized before use - call create_channel first"
    },
    {
      "code": 6029,
      "name": "channelAlreadyExists",
      "msg": "Channel already exists for this payer-payee pair"
    },
    {
      "code": 6030,
      "name": "unauthorizedSettler",
      "msg": "Only the payee or authorized settler can submit this payment commitment"
    },
    {
      "code": 6031,
      "name": "inboundChannelConsentRequired",
      "msg": "Payee consent is required to create this inbound channel"
    },
    {
      "code": 6032,
      "name": "inboundChannelsDisabled",
      "msg": "This participant does not accept inbound channels"
    },
    {
      "code": 6033,
      "name": "selfChannelNotAllowed",
      "msg": "Self-channels are not allowed"
    },
    {
      "code": 6034,
      "name": "noPendingAuthorityTransfer",
      "msg": "No authority transfer is currently pending"
    },
    {
      "code": 6035,
      "name": "unauthorizedPendingAuthority",
      "msg": "Only the nominated pending authority can accept this transfer"
    },
    {
      "code": 6036,
      "name": "tooManyTokenBalances",
      "msg": "Maximum token balances per participant exceeded"
    },
    {
      "code": 6037,
      "name": "tokenNotFound",
      "msg": "Token ID not registered in token registry"
    },
    {
      "code": 6038,
      "name": "tokenAlreadyRegistered",
      "msg": "Token mint already registered"
    },
    {
      "code": 6039,
      "name": "tokenIdAlreadyInUse",
      "msg": "Token ID already in use"
    },
    {
      "code": 6040,
      "name": "unauthorizedTokenRegistration",
      "msg": "Unauthorized token registration"
    },
    {
      "code": 6041,
      "name": "invalidTokenId",
      "msg": "Token ID must be greater than zero"
    },
    {
      "code": 6042,
      "name": "invalidTokenSymbol",
      "msg": "Token symbol must be valid ASCII"
    },
    {
      "code": 6043,
      "name": "invalidTokenDecimals",
      "msg": "Token decimals exceed the protocol maximum"
    },
    {
      "code": 6044,
      "name": "tokenRegistryFull",
      "msg": "Token registry account is full"
    },
    {
      "code": 6045,
      "name": "invalidTokenMint",
      "msg": "Token account mint doesn't match registered token"
    },
    {
      "code": 6046,
      "name": "insufficientLockedBalance",
      "msg": "Requested unlock amount exceeds the channel's locked balance"
    },
    {
      "code": 6047,
      "name": "noChannelUnlockPending",
      "msg": "No channel unlock is currently pending"
    },
    {
      "code": 6048,
      "name": "invalidAuthorizedSigner",
      "msg": "Authorized signer cannot be the zero address or the current signer"
    },
    {
      "code": 6049,
      "name": "noAuthorizedSignerUpdatePending",
      "msg": "No authorized signer update is currently pending"
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
      "name": "channelState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenId",
            "docs": [
              "Token ID for this channel (from token registry)"
            ],
            "type": "u16"
          },
          {
            "name": "payerId",
            "docs": [
              "Cached payer participant id for validation and events."
            ],
            "type": "u32"
          },
          {
            "name": "payeeId",
            "docs": [
              "Cached payee participant id for validation and events."
            ],
            "type": "u32"
          },
          {
            "name": "settledCumulative",
            "docs": [
              "Highest cumulative committed amount already settled for this lane."
            ],
            "type": "u64"
          },
          {
            "name": "lockedBalance",
            "docs": [
              "Token amount locked as ring-fenced collateral (0 = no lock)"
            ],
            "type": "u64"
          },
          {
            "name": "authorizedSigner",
            "docs": [
              "Signer authorized to advance this channel's cumulative commitment."
            ],
            "type": "pubkey"
          },
          {
            "name": "pendingUnlockAmount",
            "docs": [
              "Amount the payer most recently requested to unlock after the timelock."
            ],
            "type": "u64"
          },
          {
            "name": "unlockRequestedAt",
            "docs": [
              "Unix timestamp when the latest unlock request was created (0 = none pending)."
            ],
            "type": "i64"
          },
          {
            "name": "pendingAuthorizedSigner",
            "docs": [
              "Signer that will replace `authorized_signer` once the rotation timelock elapses."
            ],
            "type": "pubkey"
          },
          {
            "name": "authorizedSignerUpdateRequestedAt",
            "docs": [
              "Unix timestamp when the latest signer-rotation request was created (0 = none pending)."
            ],
            "type": "i64"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump"
            ],
            "type": "u8"
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
              "Seconds before a pending withdrawal becomes executable (default 604_800 = 7 days)"
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
            "name": "reserved",
            "docs": [
              "Reserved for future config expansion."
            ],
            "type": {
              "array": [
                "u8",
                14
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
      "name": "participantAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "docs": [
              "Participant's signing keypair (e.g. Privy smart wallet address)"
            ],
            "type": "pubkey"
          },
          {
            "name": "participantId",
            "docs": [
              "Compact numeric ID used in all commitment/netting payloads and PDA seeds"
            ],
            "type": "u32"
          },
          {
            "name": "tokenBalances",
            "docs": [
              "Token-specific balances (up to 16 different tokens per participant)"
            ],
            "type": {
              "vec": {
                "defined": {
                  "name": "tokenBalance"
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
            "name": "inboundChannelPolicy",
            "docs": [
              "How this participant handles inbound channels created by other parties."
            ],
            "type": "u8"
          },
          {
            "name": "reserved",
            "docs": [
              "Reserved for future participant-level configuration."
            ],
            "type": {
              "array": [
                "u8",
                7
              ]
            }
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
      "name": "tokenBalance",
      "docs": [
        "Token-specific balance entry for participants",
        "Total: 58 bytes per token balance"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenId",
            "docs": [
              "2-byte token identifier from registry"
            ],
            "type": "u16"
          },
          {
            "name": "availableBalance",
            "docs": [
              "Available balance in token's native decimals"
            ],
            "type": "u64"
          },
          {
            "name": "withdrawingBalance",
            "docs": [
              "Balance locked in pending withdrawal"
            ],
            "type": "u64"
          },
          {
            "name": "withdrawalUnlockAt",
            "docs": [
              "Unix timestamp when withdrawal unlockable (0 = none pending)"
            ],
            "type": "i64"
          },
          {
            "name": "withdrawalDestination",
            "docs": [
              "Destination ATA for pending withdrawal"
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "tokenEntry",
      "docs": [
        "Token registry entry",
        "Total: 51 bytes per entry"
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
              "SPL token mint address"
            ],
            "type": "pubkey"
          },
          {
            "name": "decimals",
            "docs": [
              "Token decimals for amount validation"
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
    }
  ]
};
