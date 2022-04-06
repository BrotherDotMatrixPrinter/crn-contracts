Required information: Wallet Private Key

This allows you to easily interact with CRN's smart contracts and the Cronaswap Router.

'contract/ContractController.ts' exports a class that provides:
- Signed contracts
- Interface wrapped functions
- Observable properties
- Contract function implementation
- Auto retry for implemented functions
- TODO: Contract event interface

The ContractController class gives you the option to either use the built-in functions or create your own implementations and interact with other contract functions and events.

---

To use, create a 'PrivateKeys.json' file and export an array with all of the keys you want in this format:
```json
[
	[ "plainKey", false ]
]
```

After encrypting the keys, the json will reformat like this:
```json
[
	[ "encKey", true ]
]
```

Change env variables in 'ENV.json'.

Run:
```
npm i
tsc
node build/index.js [password]
```

---

- Roadmap
	- Add MarketController for price checking (via API and Contracts) - main branch
	- Add DB for value tracking and records keeping - main branch
	- Add documentation - main branch