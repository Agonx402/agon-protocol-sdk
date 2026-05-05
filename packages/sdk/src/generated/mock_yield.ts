/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/mock_yield.json`.
 */
export type MockYield = {
  "address": "FX5RrnwvK9iRjZaczFbE6vokLfzVN9UwHw37smqBJjmB",
  "metadata": {
    "name": "mockYield",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Mock Save/Kamino-style lending program for Agon devnet demos. Mints cUSDC SPL shares against USDC deposits with a configurable APY."
  },
  "instructions": [
    {
      "name": "accrue",
      "docs": [
        "Permissionless. Bumps `total_underlying` at the current `apy_bps` for the elapsed window",
        "and stamps the new `last_accrual_ts`. Returns the post-accrual exchange rate via",
        "`set_return_data` as 16 little-endian bytes:",
        "* bytes 0..8  : `total_underlying`",
        "* bytes 8..16 : `share_mint.supply`",
        "Callers can compute the cUSDC -> USDC rate as `total_underlying / share_supply` (clamping",
        "supply == 0 to \"no shares outstanding -> rate is undefined\")."
      ],
      "discriminator": [
        23,
        76,
        128,
        149,
        229,
        247,
        72,
        228
      ],
      "accounts": [
        {
          "name": "reserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "reserve.underlying_mint",
                "account": "reserve"
              }
            ]
          }
        },
        {
          "name": "shareMint"
        }
      ],
      "args": []
    },
    {
      "name": "depositReserveLiquidity",
      "docs": [
        "Transfer `amount` underlying from `depositor_underlying` -> `liquidity_vault`, mint the",
        "proportional cUSDC into `depositor_shares`. Accrues first."
      ],
      "discriminator": [
        169,
        201,
        30,
        126,
        6,
        205,
        102,
        68
      ],
      "accounts": [
        {
          "name": "reserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "underlyingMint"
              }
            ]
          }
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
          "name": "depositorUnderlying",
          "writable": true
        },
        {
          "name": "depositorShares",
          "writable": true
        },
        {
          "name": "depositor",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeReserve",
      "discriminator": [
        91,
        188,
        92,
        135,
        153,
        155,
        112,
        16
      ],
      "accounts": [
        {
          "name": "reserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "underlyingMint"
              }
            ]
          }
        },
        {
          "name": "underlyingMint"
        },
        {
          "name": "shareMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  97,
                  114,
                  101,
                  45,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "underlyingMint"
              }
            ]
          }
        },
        {
          "name": "liquidityVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  113,
                  117,
                  105,
                  100,
                  105,
                  116,
                  121,
                  45,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "underlyingMint"
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
          "name": "apyBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "redeemReserveCollateral",
      "docs": [
        "Burn `shares` cUSDC from `redeemer_shares`, transfer the proportional underlying to",
        "`redeemer_underlying`. Accrues first."
      ],
      "discriminator": [
        234,
        117,
        181,
        125,
        185,
        142,
        220,
        29
      ],
      "accounts": [
        {
          "name": "reserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "underlyingMint"
              }
            ]
          }
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
          "name": "redeemerShares",
          "writable": true
        },
        {
          "name": "redeemerUnderlying",
          "writable": true
        },
        {
          "name": "shareAuthority",
          "docs": [
            "Authority that can burn `redeemer_shares`. For agon-protocol calls this is the",
            "`GlobalConfig` PDA (the `share_vault` owner). For end-user direct redemptions it would be",
            "the wallet holding the cUSDC."
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
          "name": "shares",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateApyBps",
      "docs": [
        "Authority-only. Settles accrual at the *old* rate before adopting `new_apy_bps`, so the new",
        "rate only applies to time *after* this instruction lands. Without this ordering the new",
        "rate would be retroactively applied to pre-change time."
      ],
      "discriminator": [
        170,
        33,
        35,
        98,
        19,
        16,
        54,
        118
      ],
      "accounts": [
        {
          "name": "reserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "reserve.underlying_mint",
                "account": "reserve"
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newApyBps",
          "type": "u16"
        }
      ]
    }
  ],
  "accounts": [
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
    }
  ],
  "events": [
    {
      "name": "accrued",
      "discriminator": [
        207,
        152,
        166,
        145,
        189,
        39,
        33,
        167
      ]
    },
    {
      "name": "apyUpdated",
      "discriminator": [
        128,
        77,
        231,
        153,
        96,
        150,
        84,
        41
      ]
    },
    {
      "name": "liquidityDeposited",
      "discriminator": [
        218,
        155,
        74,
        193,
        59,
        66,
        94,
        122
      ]
    },
    {
      "name": "liquidityRedeemed",
      "discriminator": [
        78,
        81,
        213,
        176,
        1,
        84,
        138,
        65
      ]
    },
    {
      "name": "reserveInitialized",
      "discriminator": [
        22,
        27,
        136,
        173,
        244,
        120,
        20,
        49
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "apyTooHigh",
      "msg": "APY (in bps) exceeds the protocol cap"
    },
    {
      "code": 6001,
      "name": "amountMustBePositive",
      "msg": "Amount must be greater than zero"
    },
    {
      "code": 6002,
      "name": "mathOverflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6003,
      "name": "zeroShareConversion",
      "msg": "Conversion produced zero shares; deposit underflowed"
    },
    {
      "code": 6004,
      "name": "insufficientShareSupply",
      "msg": "Insufficient share supply for redeem"
    },
    {
      "code": 6005,
      "name": "shareMintMismatch",
      "msg": "Provided share mint does not match Reserve.share_mint"
    },
    {
      "code": 6006,
      "name": "liquidityVaultMismatch",
      "msg": "Provided liquidity vault does not match Reserve.liquidity_vault"
    },
    {
      "code": 6007,
      "name": "underlyingMintMismatch",
      "msg": "Provided underlying mint does not match Reserve.underlying_mint"
    },
    {
      "code": 6008,
      "name": "unauthorized",
      "msg": "Caller is not the reserve authority"
    }
  ],
  "types": [
    {
      "name": "accrued",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reserve",
            "type": "pubkey"
          },
          {
            "name": "totalUnderlying",
            "type": "u64"
          },
          {
            "name": "shareSupply",
            "type": "u64"
          },
          {
            "name": "apyBps",
            "type": "u16"
          },
          {
            "name": "lastAccrualTs",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "apyUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reserve",
            "type": "pubkey"
          },
          {
            "name": "previousApyBps",
            "type": "u16"
          },
          {
            "name": "newApyBps",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "liquidityDeposited",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reserve",
            "type": "pubkey"
          },
          {
            "name": "depositor",
            "type": "pubkey"
          },
          {
            "name": "underlyingAmount",
            "type": "u64"
          },
          {
            "name": "sharesMinted",
            "type": "u64"
          },
          {
            "name": "totalUnderlyingAfter",
            "type": "u64"
          },
          {
            "name": "shareSupplyAfter",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "liquidityRedeemed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reserve",
            "type": "pubkey"
          },
          {
            "name": "redeemer",
            "type": "pubkey"
          },
          {
            "name": "sharesBurned",
            "type": "u64"
          },
          {
            "name": "underlyingPaid",
            "type": "u64"
          },
          {
            "name": "totalUnderlyingAfter",
            "type": "u64"
          },
          {
            "name": "shareSupplyAfter",
            "type": "u64"
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
      "name": "reserveInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reserve",
            "type": "pubkey"
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
            "name": "apyBps",
            "type": "u16"
          }
        ]
      }
    }
  ]
};
