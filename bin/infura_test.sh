#!/usr/bin/env bash

HOST='mimis.infura-ipfs.io'
CID='QmPY47Dp1PcD7x1xdK7kxypUyRJfHKkPh4eVtNYBQPk5gj'
FILE='metadata.2022-05-11T19:13:08.420Z.json'
CIDV1="$(ipfs cid format "$CID" -v=1 -b=base32)"
URL="https://$HOST/ipfs/$CID/$(urlencode "$FILE")"
ROOT="$(realpath --relative-to=. "${0%/*}/../")"
ENV="$ROOT/packages/ui/.env.local"
USER="$(grep IPFS_AUTH_USERNAME "$ENV" | sed -e 's/.*=//' | tr -d [:space:])"
PASS="$(grep IPFS_AUTH_PASSWORD "$ENV" | sed -e 's/.*=//' | tr -d [:space:])"
AUTH="Basic $(echo -n "$USER:$PASS" | base64 -w100)"
APIURL="https://ipfs.infura.io:5001/api/v0/cat?arg=$CID/$(urlencode "$FILE")"
DWEBURL="https://$CIDV1.ipfs.dweb.link/$(urlencode "$FILE")"

echo "Read \$USER = \"$USER\" & \$PASS = \"$PASS\" from $ENV"
echo "Retrieving: $URL"
curl -D - "$URL"
echo '  ————————————————————————————————————————————————————————————————————'
echo "Retrieving: $URL with Authorization"
curl -D - -H "Authorization: $AUTH" "$URL"
echo '  ————————————————————————————————————————————————————————————————————'
echo "Retrieving: $APIURL with \`curl\` \`-u\`"
curl -D - -X POST -u "$USER:$PASS" "$APIURL"
echo '  ————————————————————————————————————————————————————————————————————'
echo "Retrieving: $DWEBURL"
curl -D - "$DWEBURL"
