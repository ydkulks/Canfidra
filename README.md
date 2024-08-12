# Confidra: Elevating Secure Conferencing

Confidra is more than just a web application; it's a fortress of confidentiality
tailored for the modern world's most sensitive collaborations. Designed to meet
the rigorous demands of educational institutions and corporate entities,
Confidra redefines secure conferencing by seamlessly blending the essence of
**"Confidentiality"** with the resilience of the legendary **"Hydra."**

- 🔒 **Unparalleled Security**: End-to-end encryption and multi-layered
  protocols keep your conversations confidential and shielded from unauthorized
  access.

- 🌐 **Custom Hosting**: Host on-premises or trusted cloud platforms for data
  control in your realm.

- 🦠 **Hydra-like Resilience**: Adapt and regenerate defenses against evolving
  cyber threats.

- 📷 **Crystal-Clear Video Calls**: High-definition video calls for education
  and business.

- 🔐 **Access Control**: Grant access only to trusted participants.

- 🌐 **Cross-Disciplinary**: From classrooms to boardrooms, Confidra caters to
  diverse collaboration needs.

Discover the power of Confidra and embark on secure communication's next era.

## How to run?
1. Clone the repository
```sh
git clone github.com/ydkulks/Confidra
```
2. Install the dependency packages (both for front-end and back-end)

```sh
cd Confidra
npm install
cd backend
npm install
```
3. Add the credentials of `Firebase` for Authentication in `.env` file

```txt
NEXT_PUBLIC_APIKEY=
NEXT_PUBLIC_AUTHDOMAIN=
NEXT_PUBLIC_PROJECTID=
NEXT_PUBLIC_STORAGEBUCKET=
NEXT_PUBLIC_MESSAGINGSENDERID=
NEXT_PUBLIC_APPID=
NEXT_PUBLIC_MEASUREMENTID=
```
4. Run both front-end and back-end

```sh
cd Confidra
npm run build
cd Confidra/backend
npm run build
```
