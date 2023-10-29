# 🔐 Encrypted Uploader

Encrypted Uploader is a simple implementation to encrypt files using Lit Protocol Access Control Conditions and upload them to Arweave. The app using Irys to bundle files and upload to Arweave.

## What is Lit Protocol?

Lit Protocol is a decentralized encryption and access control protocol that allows developers to build private and permissioned applications on the open Web. Lit uses threshold cryptography to encrypt data and store the encryption keys on a decentralized network of nodes. This makes it impossible for anyone to decrypt the data without the permission of the authorized users.

## What are access control conditions?

Access control conditions (ACCs) are used to define who is allowed to decrypt and access the encrypted data. Lit supports both on and off-chain ACCs. On-chain ACCs allow developers to gate access to data based on factors such as ownership of a particular ERC-721 or ERC-20 token, or membership in a particular DAO. Off-chain ACCs allow developers to gate access to data based on factors such as the result of an API call.

## What is Irys?

Irys is a decentralized provenance layer that allows users to scale permanent data and precisely attribute its origin. Data uploaded to Irys is permanent, precise, and unconstrained. This makes it ideal for storing encrypted data using Lit Protocol. Also Irys supports bundling files and uploading them to Arweave using payments in about 14 different tokens. This makes it easy for developers to integrate Irys into their applications.

## How does Encrypted Uploader work?

Encrypted Uploader uses the following steps to encrypt and store data on Arweave using Lit Protocol and Irys:

1. The user selects the data they want to encrypt and upload.
2. User Defines the access control condition (ACC) that defines who is allowed to decrypt the data. Currently the UI supports three types of ACCs
   - List of Ethereum addresses
   - Ownership of a particular ERC-721 token
   - Custom Access Control Conditions
3. Encrypted Uploader encrypts and generates a zip file with the encrypted data and the Lit Protocol access control conditions.
4. Irys bundles the zip file and uploads it to Arweave using payments in Polygon Mumbai (MATIC) tokens.
5. Users can then view their transactions on the homepage and decrypt the data using the data.

> **Note**:
>
> 1. The app currently supports only image files but can work with any type of file.
> 2. Data is uploaded to Irys Devnet, so it is not persistent and is deleted every `60 days`.

The main aspects of code are located in the Hooks directory.

1. `src/hooks/irys` - This hook is used to bundle files and upload them to arweave.
2. `src/hooks/lit` - This hook is used to encrypt and decrypt files using Lit Protocol Access Control Conditions and upload them to Arweave.

---

## Screenshots 📸

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/Mg8vGtg/1.png" alt="Homepage" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/NxsGTv8/2.png" alt="Create Game" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/YWj5d0n/3.png" alt="Game Page" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/hCtdR22/4.png" alt="Game Page" >
    </td>
  </tr>
</table>

---

## Video Demo 🎥

---

## 🚀 Getting Started

To get started with the Web3 Hackathon Starter Kit, follow these simple steps:

1. Clone the Repository: Begin by cloning the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Envoy-VC/arweave-lit-example.git
   ```

2. Install Dependencies: Navigate to the cloned repository and install the required dependencies by running the following command:

   ```bash
   pnpm install
   ```

3. Run the Project: Once you have installed the dependencies and added the required environment variables, you are ready to run the project. To start the development server, run the following command:

   ```bash
    pnpm run dev
   ```

---

Customize Your Project: Open the project in your preferred code editor and customize it according to your hackathon project requirements. Feel free to modify the existing files or add new ones as needed.

---

## Contributing 🤝

Contributions are welcomed. If you encounter any issues or have suggestions for improvements, please submit them via GitHub issues. Additionally, feel free to fork the repository and submit pull requests with your enhancements.

---

## License

The Web3 Hackathon Starter Kit is open source software licensed under the MIT License. Please see the [LICENSE](./LICENSE)

---
