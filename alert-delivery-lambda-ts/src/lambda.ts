import { SNSEvent } from "aws-lambda";
import { fetch } from "cross-fetch";
import { getAlertsSecret } from "./get_alerts_secret";

export const handler = async (event: SNSEvent): Promise<void> => {
  const { alertSlackWebhook } = await getAlertsSecret();

  if (alertSlackWebhook === null) {
    console.warn(
      "alertSlackWebhook is null, not sending the message from SNS to Slack."
    );
    return;
  }

  for (const record of event.Records) {
    const {
      Sns: { Message, MessageId },
    } = record;
    console.info(`Processing message ${MessageId}`);
    const encodedMsg = JSON.stringify({ text: Message });

    await fetch(alertSlackWebhook, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: encodedMsg,
    });
  }
};
