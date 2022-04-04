Required information: Contract ABI and Address, Wallet Private Key

The ABI will allow the ethers Contract to operate but without a TS interface, intellitype is unavailable.

The functions exported from 'ethers_util/Constructor.ts' combine these into a working ethers Contract:
	1. Contract ABI
	2. Contract Address
	3. Wallet Private Key
	3. TS Interface

'ethers_util/ContractController.ts' exports a Class that provides signed contracts and wrapped functions for a private key.

---

To use, create a 'PrivateKeys.ts' file and export an array with all of the keys you want.

Change env variables in 'ENV.ts'.

---

- Roadmap
	- Add MarketController for price checking (via API and Contracts) - main branch
	- Add DB for value tracking and records keeping - main branch
	- Add documentation - main branch
	- Add better encryption/hashing for private keys
		- see https://stackoverflow.com/a/53573115