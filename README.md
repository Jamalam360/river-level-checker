# River Level Checker

Checks whether a river level provided by the gov.uk flooding service is under a
certain threshold, and then posts the result to a discord webhook.

I use it to check whether I can row, using a cron job to trigger it every
morning.

.env:

```
DATA_SOURCE=https://check-for-flooding.service.gov.uk/station-csv/{station_id}
MAX_HEIGHT={maximum_height}
WEBHOOK_URL={discord_webhook_url}
```
