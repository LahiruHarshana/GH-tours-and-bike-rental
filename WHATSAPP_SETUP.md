# WhatsApp admin alerts

New public booking requests are saved first and then sent to the administrator
through the Meta WhatsApp Cloud API. Configure these runtime values:

```dotenv
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ADMIN_PHONE=94770000000
WHATSAPP_API_VERSION=v23.0
```

`WHATSAPP_ADMIN_PHONE` must contain digits only, including the country code.

For production business-initiated notifications, create an approved WhatsApp
template with four body text variables in this order: booking reference,
booking type, guest name, and travel date. Then add:

```dotenv
WHATSAPP_TEMPLATE_NAME=
WHATSAPP_TEMPLATE_LANGUAGE=en_US
```

If a template name is not supplied, the integration sends a plain text message.
Plain text delivery is subject to Meta's active conversation-window rules. The
admin dashboard shows `SENT`, `FAILED`, or `SKIPPED` for every request and
provides a retry action.
