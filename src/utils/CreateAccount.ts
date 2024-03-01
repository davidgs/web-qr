import { defaultBitlyConfig, defaultMainSettings, defaultQRSettings, defaultSession, defaultUTMCampaign, defaultUTMContent, defaultUTMKeyword, defaultUTMMedium, defaultUTMParams, defaultUTMSource, defaultUTMTarget, defaultUTMTerm, defaultWiFiSettings, DefaultQRStyle } from "../types";
import { PrismaClient } from '@prisma/client/edge'

interface CreateAccountProps {
  show: boolean;
  username: string;
  email: string;
}


export default function CreateAccount(props: CreateAccountProps) {
  const prisma = new PrismaClient();

  async function createAccount() {
  const user = await prisma.user.create({
    data: {
      login: props.username,
      stripe_id: "",
      first_name: props.username.split("_")[0],
      last_name: props.username.split(" ")[1],
      address: "",
      city: "",
      state: "",
      zip: "",
      email: props.email,
      active: true,
      confirmed: true,
      // licensing: {
      //   create: {
      //     cust_id: "",
      //     active: false,
      //     confirmed: false,
      //     license_key: "",
      //     license_type: "free",
      //     created_at: new Date(),
      //   },
      // },
      main_settings: {
        create: {
          brand_image: "",
          brand_height: 200,
          brand_width: 200,
          brand_opacity: 1.0,
          form_type: "simple",
        },
      },
      bitly_settings: {
        create: {
          use_value: false,
          label: "Shorten Link",
          aria_label: "Shorten Link with Bitly",
          tooltip: "Shorten Link with Bitly",
          error: "No Bitly Token Found",
          bitly_token: "",
          bitly_domain: "",
          bitly_addr: "https://api-ssl.bitly.com/v4/shorten",
          bitly_enabled: false,
          type: "bitly",
        },
      },
      utm_campaign: {
        create: {
          use_value: true,
          is_chooser: false,
          show_name: true,
          label: "Campaign",
          tooltip: "Enter a campaign name",
          error: "Please enter a valid campaign name",
          aria_label: "Campaign Name",
          value: [],
        },
      },
      utm_keyword: {
        create: {
          use_value: true,
          is_chooser: false,
          show_name: true,
          label: "Keywords",
          tooltip: "Additional keywords to append to the link",
          error: "Please enter a valid Keyword",
          aria_label: "Add any additional keywords",
          value: [],
        },
      },
      utm_content: {
        create: {
          use_value: true,
          is_chooser: false,
          show_name: true,
          label: "Content",
          tooltip: "Additional content to append to the link",
          error: "Please enter a valid content value",
          aria_label: "Add any additional content",
          value: [],
        },
      },
      utm_medium: {
        create: {
          use_value: true,
          is_chooser: false,
          show_name: true,
          label: "Referral Medium",
          tooltip:
            "What kind of referral link is this? This is usually how you're distributing the link.",
          error: "Please choose a valid referral medium",
          aria_label: "Referral medium",
          value: [
            { key: "cpc", value: "Cost Per Click" },
            { key: "direct", value: "Direct" },
            { key: "display", value: "Display" },
            { key: "email", value: "Email" },
            { key: "event", value: "Event" },
            { key: "organic", value: "Organic" },
            { key: "paid-search", value: "Paid Search" },
            { key: "paid-social", value: "Paid Social" },
            { key: "qr", value: "QR Code" },
            { key: "referral", value: "Referral" },
            { key: "retargeting", value: "Retargeting" },
            { key: "social", value: "Social" },
            { key: "ppc", value: "Pay Per Click" },
            { key: "linq", value: "Linq" },
          ],
        },
      },
      utm_source: {
        create: {
          use_value: true,
          is_chooser: false,
          show_name: true,
          label: "Referral Source",
          tooltip: "Where will you be posting this link?",
          error: "Please enter a valid referral source",
          aria_label: "Referral Source",
          value: [],
        },
      },
      utm_target: {
        create: {
          use_value: true,
          is_chooser: false,
          show_name: true,
          label: "URL to encode",
          tooltip: "Complete URL to encode",
          error: "Please enter a valid URL",
          aria_label: "This must be a valid URL",
          value: [],
        },
      },
    },
    // send email with username/password and license key
  });
  console.log(`User created: ${user}`);
  }
}