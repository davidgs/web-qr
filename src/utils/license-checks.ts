
export { };
// import { useAppSelector } from "../stores/hooks";
// import { settingsServer } from "../types";


// export interface License {
//   username: string;
//   license: string;
//   fingerprint: string;
//   platform: string;
//   name: string;
//   id: string;
// }

// export interface LicenseResponse {
//   code: string;
//   valid: boolean;
//   message: string;
// }


// async function activateMachine(data: License): Promise<LicenseResponse> {
//   // Validate the license key before activation, so we can be sure it supports
//   // another machine. Notice that this validation is scoped to the current
//   // machine via its fingerprint - this ensures that license activation is
//   // not performed for machines that are already activated.
//   const validation = await fetch(`https://api.keygen.sh/v1/accounts/${KEYGEN_ACCOUNT_ID}/licenses/actions/validate-key`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/vnd.api+json',
//       'Accept': 'application/vnd.api+json',
//     },
//     body: JSON.stringify({
//       meta: {
//         scope: { fingerprint },
//         key,
//       }
//     })
//   })

//   const { meta, errors, data: license } = await validation.json()
//   if (errors) {
//     throw new Error(JSON.stringify(errors, null, 2))
//   }

//   // If the license is valid, that means the current machine is already
//   // activated. We can safely return.
//   if (meta.valid) {
//     const machine = await retrieveMachine(fingerprint, { key })

//     return {
//       activated: false,
//       machine,
//     }
//   }

//   // If we've gotten this far, our license is not valid for the current
//   // machine and we should attempt to activate it.
//   switch (meta.code) {
//     // This means the license already has at least 1 machine associated with
//     // it, but none match the current machine's fingerprint. We're breaking
//     // on this case because, for this example, we want to support activating
//     // more than 1 machine.
//     case 'FINGERPRINT_SCOPE_MISMATCH':
//     // You will receive a NO_MACHINES status when the license IS floating,
//     // and it does not currently have any associated machines.
//     case 'NO_MACHINES':
//     // You will receive a NO_MACHINE status when the license IS NOT floating
//     // i.e. it's node-locked, and it does not currently have any
//     // associated machines.
//     case 'NO_MACHINE': {
//       break
//     }
//     default: {
//       throw new Error(`license ${meta.detail} (${meta.code})`)
//     }
//   }

//   // Attempt to activate the current machine for the license, using the
//   // license ID that we received from the validation response and the
//   // current machine's fingerprint.
//   const activation = await fetch(`https://api.keygen.sh/v1/accounts/${KEYGEN_ACCOUNT_ID}/machines`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `License ${key}`,
//       'Content-Type': 'application/vnd.api+json',
//       'Accept': 'application/vnd.api+json',
//     },
//     body: JSON.stringify({
//       data: {
//         type: 'machines',
//         attributes: {
//           fingerprint
//         },
//         relationships: {
//           license: {
//             data: { type: 'licenses', id: license.id }
//           }
//         }
//       }
//     })
//   })

//   const { data: machine, errors: errs } = await activation.json()
//   if (errs) {
//     throw new Error(JSON.stringify(errs, null, 2))
//   }

//   // All is good - the machine was successfully activated.
//   return {
//     activated: true,
//     machine,
//   }
// }

// async function deactivateMachine(id, { key } = {}) {
//   const deactivation = await fetch(`https://api.keygen.sh/v1/accounts/${KEYGEN_ACCOUNT_ID}/machines/${encodeURIComponent(id)}`, {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `License ${key}`,
//       'Accept': 'application/vnd.api+json',
//     }
//   })

//   if (deactivation.status === 204) {
//     return
//   }

//   const { errors } = await deactivation.json()
//   if (errors) {
//     throw new Error(JSON.stringify(errors, null, 2))
//   }
// }

// async function retrieveMachine(id, { key } = {}) {
//   const retrieval = await fetch(`https://api.keygen.sh/v1/accounts/${KEYGEN_ACCOUNT_ID}/machines/${encodeURIComponent(id)}`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `License ${key}`,
//       'Accept': 'application/vnd.api+json',
//     }
//   })

//   const { data: machine, errors } = await retrieval.json()
//   if (errors) {
//     throw new Error(JSON.stringify(errors, null, 2))
//   }

//   return machine
// }

// export async function checkLicense(data: License): Promise<LicenseResponse> {
//   // fetch license info
//   let valid = false;
//   const response = await fetch(
//     `https://api.keygen.sh/v1/accounts/${data.id}/licenses/actions/validate-key`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/vnd.api+json",
//         Accept: "application/vnd.api+json",
//       },
//       body: JSON.stringify({
//         meta: {
//           key: data.license,
//           scope: {
//             fingerprint: data.fingerprint,
//           },
//         },
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("license response: ", data);
//       return data;
//     })
//     .catch((error) => console.error("license error: ", error));
//   console.log("Response: ", response);
//   if (response.meta) {
//     switch (response.meta.code) {
//       case "VALID":
//         valid = response.meta.valid;
//       case "SUSPENDED":
//         return false;
//       case "EXPIRED":
//         return false;
//       case "OVERDUE":
//         return false;
//       case "NO_MACHINE":
//         const mac = fetchMachine(data);
//         return false;
//       case "NO_MACHINES":
//         return false;
//       case "TO_MANY_MACHINES":
//         return false;
//       case "FINGERPRINT_SCOPE_MISMATCH":
//         return false;
//       case "HEARTBEAT_DEAD":
//         return false;
//       case "BANNED":
//         return false;
//       default:
//         return false;
//     }
//   }
// }

// async function fetchMachine(data: License): Promise<LicenseResponse> {
//   const response = await fetch(`${settingsServer}fetchMachine`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username: data.username,
//       license: data.license,
//       id: data.id,
//       fingerprint: data.fingerprint,
//       platform: data.platform,
//       name: data.name,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("machine response: ", data);
//       return data;
//     })
//     .catch((error) => console.error("license error: ", error));
//   return response;
// }