import Userfront from "@userfront/core";
import { useSearchParams } from "react-router-dom";


export default function ResetPage() {
    Userfront.init("xbp876mb");

  const [params] = useSearchParams();
  const uuid = params.get("uuid");
  const token = params.get("token");
  const type = params.get("type");
  console.log(`uuid`, uuid);
  console.log(`token`, token);

  const payload = {
    token: token,
    uuid: uuid,
  };

  async function resetPassword() {
    const response = await fetch(
      "https://api.userfront.com/v0/tenants/xbp876mb/auth/link",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(`data`, data);
        return data;
      })
      .catch((error) => {
        console.error(`error`, error);
      });
    console.log(`response`, response);
  }

  resetPassword();
  return (
    <div>
      <h1>Reset Page</h1>
      <p>uuid: {uuid}</p>
    </div>
  );
}
