import supportedChains from './chains';
import { IChainData } from './types';
import heart  from "../assets/img/emojies/512.gif";
import mind from "../assets/img/emojies/513.gif";
import think from "../assets/img/emojies/514.gif";
import surprice from "../assets/img/emojies/515.gif";
import please from "../assets/img/emojies/517.gif";
import star from "../assets/img/emojies/518.gif";
import thumb from "../assets/img/emojies/519.gif";
import fire from "../assets/img/emojies/520.gif";
import celebrate from "../assets/img/emojies/521.gif";
import laugh from "../assets/img/emojies/522.gif";
import eyelove from "../assets/img/emojies/523.gif";
import onehun from "../assets/img/emojies/524.gif";
import laughcry from "../assets/img/emojies/525.gif";
const emojis = [
  { live: heart, code: "❤️" },
  { live: laughcry, code: "😂" },
  { live: onehun, code: "💯" },
  { live: laugh, code: "😅" },
  { live: fire, code: "🔥" },
  { live: please, code: "🙏" },
  { live: thumb, code: "👍" },
  { live: think, code: "🤔" },
  { live: celebrate, code: "🎉" },
  { live: eyelove, code: "😍" },
  { live: surprice, code: "😳" },
  { live: star, code: "💫" },
  { live: mind, code: "🤯" },
];

export function getChainData(chainId?: number): IChainData {
  if (!chainId) {
    return null as any;
  }
  const chainData = supportedChains.filter(
    (chain: any) => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    throw new Error('ChainId missing or not supported');
  }

  const API_KEY = '460f40a260564ac4a4f4b3fffb032dad';

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export function ellipseAddress(address = '', width = 6): string {
  if (!address) {
    return '';
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function numDaysBetween(d1: any, d2:any) {
  var diff = Math.abs(d1 - d2.getTime() / 1000);
  console.log('d1', d1);
  console.log('d2', d2);

  if (diff <= 0) {
    return 0;
  } else {
    return diff / (60 * 60 * 24);
  }
}

export function timeConverter(UNIX_timestamp:any) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

export function greeter() {
  var d = new Date();
  var hour = d.getHours();
  if (hour >= 6 && hour < 12) {
    return 'Good Morning';
  } else if (hour > +12 && hour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

export function truncateString(str:any, length:any) {
  return str.length > length ? str.substring(0, length - 3) + '...' : str;
}

export default emojis 

export const convertSecondsToHHMMSS = secs => {
  const format = val => `0${Math.floor(val)}`.slice(-2);
  const mins = (secs % 3600) / 60;
  // Uncomment if you want hours to the time format
  // const hrs = secs / 3600;

  // Add hrs variable before mins to apply changes
  return [mins, secs % 60].map(format).join(':');
};

export const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


  export function formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : minutes;
  }
  
  export function formatSeconds(seconds) {
    return seconds < 10 ? `0${seconds}` : seconds;
  }
  