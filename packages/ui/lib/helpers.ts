import { Maybe } from 'lib/types'
import { CID } from 'multiformats/cid'
import { IPFS_LINK_PATTERN } from 'lib/constants';

export const httpURL = (uri?: Maybe<string>) => {
    const [, origCID, path] =
      uri?.match(/^(?:ipfs|dweb):(?:\/\/)?([^/]+)(?:\/(.*))?$/) ?? [];
  
    if (origCID) {
      const cid = CID.parse(origCID);
      const v0CID = cid.toV0().toString();
      const v1CID = cid.toV1().toString();
      const pattern = IPFS_LINK_PATTERN;
      return pattern
        .replace(/{cid}/g, origCID)
        .replace(/{v0cid}/g, v0CID)
        .replace(/{v1cid}/g, v1CID)
        .replace(/{path}/g, path ?? '');
    }
  
    return uri ?? undefined; // Image.src won't take null
  };

export const capitalize = (str: string) => {
  if(!str?.split) return str
  return (
    str.trim().split(/\s+/g)
    .map((sub) => (`${
      sub[0]?.toUpperCase() ?? ''
    }${
      sub.substring(1)?.toLowerCase() ?? ''
    }`))
    .join(' ')
  )
}

export const isEmpty = (val: unknown) => {
  if (Array.isArray(val)) {
    return val.length === 0
  }
  if (val instanceof Object) {
    return Object.keys(val).length === 0
  }
  if (val === '') {
    return true
  }
  return false
}
