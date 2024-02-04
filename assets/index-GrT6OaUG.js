(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function Gu(t,e={}){const{fees:n=t.fees,formatters:r=t.formatters,serializers:o=t.serializers}=e;return{...t,fees:n,formatters:r,serializers:o}}const lg="1.21.3",ug=t=>t,fc=t=>t,dg=()=>`viem@${lg}`;class G extends Error{constructor(e,n={}){var i;super(),Object.defineProperty(this,"details",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"docsPath",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"metaMessages",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"shortMessage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ViemError"}),Object.defineProperty(this,"version",{enumerable:!0,configurable:!0,writable:!0,value:dg()});const r=n.cause instanceof G?n.cause.details:(i=n.cause)!=null&&i.message?n.cause.message:n.details,o=n.cause instanceof G&&n.cause.docsPath||n.docsPath;this.message=[e||"An error occurred.","",...n.metaMessages?[...n.metaMessages,""]:[],...o?[`Docs: https://viem.sh${o}.html${n.docsSlug?`#${n.docsSlug}`:""}`]:[],...r?[`Details: ${r}`]:[],`Version: ${this.version}`].join(`
`),n.cause&&(this.cause=n.cause),this.details=r,this.docsPath=o,this.metaMessages=n.metaMessages,this.shortMessage=e}walk(e){return sh(this,e)}}function sh(t,e){return e!=null&&e(t)?t:t&&typeof t=="object"&&"cause"in t?sh(t.cause,e):e?null:t}class fg extends G{constructor({max:e,min:n,signed:r,size:o,value:i}){super(`Number "${i}" is not in safe ${o?`${o*8}-bit ${r?"signed":"unsigned"} `:""}integer range ${e?`(${n} to ${e})`:`(above ${n})`}`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"IntegerOutOfRangeError"})}}class hg extends G{constructor(e){super(`Hex value "${e}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidHexBooleanError"})}}class pg extends G{constructor({givenSize:e,maxSize:n}){super(`Size cannot exceed ${n} bytes. Given size: ${e} bytes.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"SizeOverflowError"})}}function _n(t,{strict:e=!0}={}){return!t||typeof t!="string"?!1:e?/^0x[0-9a-fA-F]*$/.test(t):t.startsWith("0x")}function lt(t){return _n(t,{strict:!1})?Math.ceil((t.length-2)/2):t.length}function jr(t,{dir:e="left"}={}){let n=typeof t=="string"?t.replace("0x",""):t,r=0;for(let o=0;o<n.length-1&&n[e==="left"?o:n.length-o-1].toString()==="0";o++)r++;return n=e==="left"?n.slice(r):n.slice(0,n.length-r),typeof t=="string"?(n.length===1&&e==="right"&&(n=`${n}0`),`0x${n.length%2===1?`0${n}`:n}`):n}class ah extends G{constructor({offset:e,position:n,size:r}){super(`Slice ${n==="start"?"starting":"ending"} at offset "${e}" is out-of-bounds (size: ${r}).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"SliceOffsetOutOfBoundsError"})}}class ch extends G{constructor({size:e,targetSize:n,type:r}){super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${e}) exceeds padding size (${n}).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"SizeExceedsPaddingSizeError"})}}function oo(t,{dir:e,size:n=32}={}){return typeof t=="string"?or(t,{dir:e,size:n}):gg(t,{dir:e,size:n})}function or(t,{dir:e,size:n=32}={}){if(n===null)return t;const r=t.replace("0x","");if(r.length>n*2)throw new ch({size:Math.ceil(r.length/2),targetSize:n,type:"hex"});return`0x${r[e==="right"?"padEnd":"padStart"](n*2,"0")}`}function gg(t,{dir:e,size:n=32}={}){if(n===null)return t;if(t.length>n)throw new ch({size:t.length,targetSize:n,type:"bytes"});const r=new Uint8Array(n);for(let o=0;o<n;o++){const i=e==="right";r[i?o:n-o-1]=t[i?o:t.length-o-1]}return r}const mg=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Zn(t,e={}){return typeof t=="number"||typeof t=="bigint"?xe(t,e):typeof t=="string"?qu(t,e):typeof t=="boolean"?lh(t,e):Mo(t,e)}function lh(t,e={}){const n=`0x${Number(t)}`;return typeof e.size=="number"?(vr(n,{size:e.size}),oo(n,{size:e.size})):n}function Mo(t,e={}){let n="";for(let o=0;o<t.length;o++)n+=mg[t[o]];const r=`0x${n}`;return typeof e.size=="number"?(vr(r,{size:e.size}),oo(r,{dir:"right",size:e.size})):r}function xe(t,e={}){const{signed:n,size:r}=e,o=BigInt(t);let i;r?n?i=(1n<<BigInt(r)*8n-1n)-1n:i=2n**(BigInt(r)*8n)-1n:typeof t=="number"&&(i=BigInt(Number.MAX_SAFE_INTEGER));const s=typeof i=="bigint"&&n?-i-1n:0;if(i&&o>i||o<s){const c=typeof t=="bigint"?"n":"";throw new fg({max:i?`${i}${c}`:void 0,min:`${s}${c}`,signed:n,size:r,value:`${t}${c}`})}const a=`0x${(n&&o<0?(1n<<BigInt(r*8))+BigInt(o):o).toString(16)}`;return r?oo(a,{size:r}):a}const wg=new TextEncoder;function qu(t,e={}){const n=wg.encode(t);return Mo(n,e)}const bg=new TextEncoder;function lr(t,e={}){return typeof t=="number"||typeof t=="bigint"?vg(t,e):typeof t=="boolean"?yg(t,e):_n(t)?Ku(t,e):Ln(t,e)}function yg(t,e={}){const n=new Uint8Array(1);return n[0]=Number(t),typeof e.size=="number"?(vr(n,{size:e.size}),oo(n,{size:e.size})):n}const Nn={zero:48,nine:57,A:65,F:70,a:97,f:102};function g0(t){if(t>=Nn.zero&&t<=Nn.nine)return t-Nn.zero;if(t>=Nn.A&&t<=Nn.F)return t-(Nn.A-10);if(t>=Nn.a&&t<=Nn.f)return t-(Nn.a-10)}function Ku(t,e={}){let n=t;e.size&&(vr(n,{size:e.size}),n=oo(n,{dir:"right",size:e.size}));let r=n.slice(2);r.length%2&&(r=`0${r}`);const o=r.length/2,i=new Uint8Array(o);for(let s=0,a=0;s<o;s++){const c=g0(r.charCodeAt(a++)),l=g0(r.charCodeAt(a++));if(c===void 0||l===void 0)throw new G(`Invalid byte sequence ("${r[a-2]}${r[a-1]}" in "${r}").`);i[s]=c*16+l}return i}function vg(t,e){const n=xe(t,e);return Ku(n)}function Ln(t,e={}){const n=bg.encode(t);return typeof e.size=="number"?(vr(n,{size:e.size}),oo(n,{dir:"right",size:e.size})):n}function vr(t,{size:e}){if(lt(t)>e)throw new pg({givenSize:lt(t),maxSize:e})}function hc(t,e={}){const{signed:n}=e;e.size&&vr(t,{size:e.size});const r=BigInt(t);if(!n)return r;const o=(t.length-2)/2,i=(1n<<BigInt(o)*8n-1n)-1n;return r<=i?r:r-BigInt(`0x${"f".padStart(o*2,"f")}`)-1n}function xg(t,e={}){let n=t;if(e.size&&(vr(n,{size:e.size}),n=jr(n)),jr(n)==="0x00")return!1;if(jr(n)==="0x01")return!0;throw new hg(n)}function wt(t,e={}){return Number(hc(t,e))}function uh(t,e={}){let n=Ku(t);return e.size&&(vr(n,{size:e.size}),n=jr(n,{dir:"right"})),new TextDecoder().decode(n)}const dh={"0x0":"legacy","0x1":"eip2930","0x2":"eip1559"};function fh(t){const e={...t,blockHash:t.blockHash?t.blockHash:null,blockNumber:t.blockNumber?BigInt(t.blockNumber):null,chainId:t.chainId?wt(t.chainId):void 0,gas:t.gas?BigInt(t.gas):void 0,gasPrice:t.gasPrice?BigInt(t.gasPrice):void 0,maxFeePerGas:t.maxFeePerGas?BigInt(t.maxFeePerGas):void 0,maxPriorityFeePerGas:t.maxPriorityFeePerGas?BigInt(t.maxPriorityFeePerGas):void 0,nonce:t.nonce?wt(t.nonce):void 0,to:t.to?t.to:null,transactionIndex:t.transactionIndex?Number(t.transactionIndex):null,type:t.type?dh[t.type]:void 0,typeHex:t.type?t.type:void 0,value:t.value?BigInt(t.value):void 0,v:t.v?BigInt(t.v):void 0};return e.yParity=(()=>{if(t.yParity)return Number(t.yParity);if(typeof e.v=="bigint"){if(e.v===0n||e.v===27n)return 0;if(e.v===1n||e.v===28n)return 1;if(e.v>=35n)return e.v%2n===0n?1:0}})(),e.type==="legacy"&&(delete e.accessList,delete e.maxFeePerGas,delete e.maxPriorityFeePerGas,delete e.yParity),e.type==="eip2930"&&(delete e.maxFeePerGas,delete e.maxPriorityFeePerGas),e}function hh(t){var n;const e=(n=t.transactions)==null?void 0:n.map(r=>typeof r=="string"?r:fh(r));return{...t,baseFeePerGas:t.baseFeePerGas?BigInt(t.baseFeePerGas):null,difficulty:t.difficulty?BigInt(t.difficulty):void 0,gasLimit:t.gasLimit?BigInt(t.gasLimit):void 0,gasUsed:t.gasUsed?BigInt(t.gasUsed):void 0,hash:t.hash?t.hash:null,logsBloom:t.logsBloom?t.logsBloom:null,nonce:t.nonce?t.nonce:null,number:t.number?BigInt(t.number):null,size:t.size?BigInt(t.size):void 0,timestamp:t.timestamp?BigInt(t.timestamp):void 0,transactions:e,totalDifficulty:t.totalDifficulty?BigInt(t.totalDifficulty):null}}function on(t,{args:e,eventName:n}={}){return{...t,blockHash:t.blockHash?t.blockHash:null,blockNumber:t.blockNumber?BigInt(t.blockNumber):null,logIndex:t.logIndex?Number(t.logIndex):null,transactionHash:t.transactionHash?t.transactionHash:null,transactionIndex:t.transactionIndex?Number(t.transactionIndex):null,...n?{args:e,eventName:n}:{}}}const Eg={"0x0":"reverted","0x1":"success"};function _g(t){return{...t,blockNumber:t.blockNumber?BigInt(t.blockNumber):null,contractAddress:t.contractAddress?t.contractAddress:null,cumulativeGasUsed:t.cumulativeGasUsed?BigInt(t.cumulativeGasUsed):null,effectiveGasPrice:t.effectiveGasPrice?BigInt(t.effectiveGasPrice):null,gasUsed:t.gasUsed?BigInt(t.gasUsed):null,logs:t.logs?t.logs.map(e=>on(e)):null,to:t.to?t.to:null,transactionIndex:t.transactionIndex?wt(t.transactionIndex):null,status:t.status?Eg[t.status]:null,type:t.type?dh[t.type]||t.type:null}}const Cg={legacy:"0x0",eip2930:"0x1",eip1559:"0x2"};function pc(t){return{...t,gas:typeof t.gas<"u"?xe(t.gas):void 0,gasPrice:typeof t.gasPrice<"u"?xe(t.gasPrice):void 0,maxFeePerGas:typeof t.maxFeePerGas<"u"?xe(t.maxFeePerGas):void 0,maxPriorityFeePerGas:typeof t.maxPriorityFeePerGas<"u"?xe(t.maxPriorityFeePerGas):void 0,nonce:typeof t.nonce<"u"?xe(t.nonce):void 0,type:typeof t.type<"u"?Cg[t.type]:void 0,value:typeof t.value<"u"?xe(t.value):void 0}}class Uo extends G{constructor({address:e}){super(`Address "${e}" is invalid.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidAddressError"})}}class Vl extends G{constructor({blockNumber:e,chain:n,contract:r}){super(`Chain "${n.name}" does not support contract "${r.name}".`,{metaMessages:["This could be due to any of the following:",...e&&r.blockCreated&&r.blockCreated>e?[`- The contract "${r.name}" was not deployed until block ${r.blockCreated} (current block ${e}).`]:[`- The chain does not have the contract "${r.name}" configured.`]]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ChainDoesNotSupportContract"})}}let Sg=class extends G{constructor({chain:e,currentChainId:n}){super(`The current chain of the wallet (id: ${n}) does not match the target chain for the transaction (id: ${e.id} – ${e.name}).`,{metaMessages:[`Current Chain ID:  ${n}`,`Expected Chain ID: ${e.id} – ${e.name}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ChainMismatchError"})}};class Ag extends G{constructor(){super(["No chain was provided to the request.","Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient."].join(`
`)),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ChainNotFoundError"})}}class ph extends G{constructor(){super("No chain was provided to the Client."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ClientChainNotConfiguredError"})}}const Tg={gwei:9,wei:18},Ig={ether:-9,wei:9},$g={ether:-18,gwei:-9};function Ea(t,e){let n=t.toString();const r=n.startsWith("-");r&&(n=n.slice(1)),n=n.padStart(e,"0");let[o,i]=[n.slice(0,n.length-e),n.slice(n.length-e)];return i=i.replace(/(0+)$/,""),`${r?"-":""}${o||"0"}${i?`.${i}`:""}`}function Dt(t,e="wei"){return Ea(t,Ig[e])}class $i extends G{constructor({cause:e,message:n}={}){var o;const r=(o=n==null?void 0:n.replace("execution reverted: ",""))==null?void 0:o.replace("execution reverted","");super(`Execution reverted ${r?`with reason: ${r}`:"for an unknown reason"}.`,{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ExecutionRevertedError"})}}Object.defineProperty($i,"code",{enumerable:!0,configurable:!0,writable:!0,value:3});Object.defineProperty($i,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/execution reverted/});class _a extends G{constructor({cause:e,maxFeePerGas:n}={}){super(`The fee cap (\`maxFeePerGas\`${n?` = ${Dt(n)} gwei`:""}) cannot be higher than the maximum allowed value (2^256-1).`,{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"FeeCapTooHigh"})}}Object.defineProperty(_a,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/});class Zl extends G{constructor({cause:e,maxFeePerGas:n}={}){super(`The fee cap (\`maxFeePerGas\`${n?` = ${Dt(n)}`:""} gwei) cannot be lower than the block base fee.`,{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"FeeCapTooLow"})}}Object.defineProperty(Zl,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/});class Gl extends G{constructor({cause:e,nonce:n}={}){super(`Nonce provided for the transaction ${n?`(${n}) `:""}is higher than the next one expected.`,{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"NonceTooHighError"})}}Object.defineProperty(Gl,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/nonce too high/});class ql extends G{constructor({cause:e,nonce:n}={}){super([`Nonce provided for the transaction ${n?`(${n}) `:""}is lower than the current nonce of the account.`,"Try increasing the nonce or find the latest nonce with `getTransactionCount`."].join(`
`),{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"NonceTooLowError"})}}Object.defineProperty(ql,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/nonce too low|transaction already imported|already known/});class Kl extends G{constructor({cause:e,nonce:n}={}){super(`Nonce provided for the transaction ${n?`(${n}) `:""}exceeds the maximum allowed nonce.`,{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"NonceMaxValueError"})}}Object.defineProperty(Kl,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/nonce has max value/});class Yl extends G{constructor({cause:e}={}){super(["The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."].join(`
`),{cause:e,metaMessages:["This error could arise when the account does not have enough funds to:"," - pay for the total gas fee,"," - pay for the value to send."," ","The cost of the transaction is calculated as `gas * gas fee + value`, where:"," - `gas` is the amount of gas needed for transaction to execute,"," - `gas fee` is the gas fee,"," - `value` is the amount of ether to send to the recipient."]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InsufficientFundsError"})}}Object.defineProperty(Yl,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/insufficient funds/});class Jl extends G{constructor({cause:e,gas:n}={}){super(`The amount of gas ${n?`(${n}) `:""}provided for the transaction exceeds the limit allowed for the block.`,{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"IntrinsicGasTooHighError"})}}Object.defineProperty(Jl,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/intrinsic gas too high|gas limit reached/});class Xl extends G{constructor({cause:e,gas:n}={}){super(`The amount of gas ${n?`(${n}) `:""}provided for the transaction is too low.`,{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"IntrinsicGasTooLowError"})}}Object.defineProperty(Xl,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/intrinsic gas too low/});class Ql extends G{constructor({cause:e}){super("The transaction type is not supported for this chain.",{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"TransactionTypeNotSupportedError"})}}Object.defineProperty(Ql,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/transaction type not valid/});class Ca extends G{constructor({cause:e,maxPriorityFeePerGas:n,maxFeePerGas:r}={}){super([`The provided tip (\`maxPriorityFeePerGas\`${n?` = ${Dt(n)} gwei`:""}) cannot be higher than the fee cap (\`maxFeePerGas\`${r?` = ${Dt(r)} gwei`:""}).`].join(`
`),{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"TipAboveFeeCapError"})}}Object.defineProperty(Ca,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max priority fee per gas higher than max fee per gas|tip higher than fee cap/});class gc extends G{constructor({cause:e}){super(`An error occurred while executing: ${e==null?void 0:e.shortMessage}`,{cause:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"UnknownNodeError"})}}const Dg=/^0x[a-fA-F0-9]{40}$/;function ur(t){return Dg.test(t)}function Fn(t){return typeof t[0]=="string"?Yu(t):Pg(t)}function Pg(t){let e=0;for(const o of t)e+=o.length;const n=new Uint8Array(e);let r=0;for(const o of t)n.set(o,r),r+=o.length;return n}function Yu(t){return`0x${t.reduce((e,n)=>e+n.replace("0x",""),"")}`}function Og(t,e){const n=t.exec(e);return n==null?void 0:n.groups}const m0=/^tuple(?<array>(\[(\d*)\])*)$/;function eu(t){let e=t.type;if(m0.test(t.type)&&"components"in t){e="(";const n=t.components.length;for(let o=0;o<n;o++){const i=t.components[o];e+=eu(i),o<n-1&&(e+=", ")}const r=Og(m0,t.type);return e+=`)${(r==null?void 0:r.array)??""}`,eu({...t,type:e})}return"indexed"in t&&t.indexed&&(e=`${e} indexed`),t.name?`${e} ${t.name}`:e}function bo(t){let e="";const n=t.length;for(let r=0;r<n;r++){const o=t[r];e+=eu(o),r!==n-1&&(e+=", ")}return e}function Rg(t){return t.type==="function"?`function ${t.name}(${bo(t.inputs)})${t.stateMutability&&t.stateMutability!=="nonpayable"?` ${t.stateMutability}`:""}${t.outputs.length?` returns (${bo(t.outputs)})`:""}`:t.type==="event"?`event ${t.name}(${bo(t.inputs)})`:t.type==="error"?`error ${t.name}(${bo(t.inputs)})`:t.type==="constructor"?`constructor(${bo(t.inputs)})${t.stateMutability==="payable"?" payable":""}`:t.type==="fallback"?"fallback()":"receive() external payable"}function he(t,e,n){return r=>{var o;return((o=t[e.name||n])==null?void 0:o.call(t,r))??e(t,r)}}function Wn(t,{includeName:e=!1}={}){if(t.type!=="function"&&t.type!=="event"&&t.type!=="error")throw new Gg(t.type);return`${t.name}(${mc(t.inputs,{includeName:e})})`}function mc(t,{includeName:e=!1}={}){return t?t.map(n=>Ng(n,{includeName:e})).join(e?", ":","):""}function Ng(t,{includeName:e}){return t.type.startsWith("tuple")?`(${mc(t.components,{includeName:e})})${t.type.slice(5)}`:t.type+(e&&t.name?` ${t.name}`:"")}class kg extends G{constructor({docsPath:e}){super(["A constructor was not found on the ABI.","Make sure you are using the correct ABI and that the constructor exists on it."].join(`
`),{docsPath:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiConstructorNotFoundError"})}}class w0 extends G{constructor({docsPath:e}){super(["Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.","Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."].join(`
`),{docsPath:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiConstructorParamsNotFoundError"})}}class Ju extends G{constructor({data:e,params:n,size:r}){super([`Data size of ${r} bytes is too small for given parameters.`].join(`
`),{metaMessages:[`Params: (${mc(n,{includeName:!0})})`,`Data:   ${e} (${r} bytes)`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiDecodingDataSizeTooSmallError"}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"params",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"size",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.data=e,this.params=n,this.size=r}}class wc extends G{constructor(){super('Cannot decode zero data ("0x") with ABI parameters.'),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiDecodingZeroDataError"})}}class Mg extends G{constructor({expectedLength:e,givenLength:n,type:r}){super([`ABI encoding array length mismatch for type ${r}.`,`Expected length: ${e}`,`Given length: ${n}`].join(`
`)),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiEncodingArrayLengthMismatchError"})}}class Ug extends G{constructor({expectedSize:e,value:n}){super(`Size of bytes "${n}" (bytes${lt(n)}) does not match expected size (bytes${e}).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiEncodingBytesSizeMismatchError"})}}class Bg extends G{constructor({expectedLength:e,givenLength:n}){super(["ABI encoding params/values length mismatch.",`Expected length (params): ${e}`,`Given length (values): ${n}`].join(`
`)),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiEncodingLengthMismatchError"})}}class gh extends G{constructor(e,{docsPath:n}){super([`Encoded error signature "${e}" not found on ABI.`,"Make sure you are using the correct ABI and that the error exists on it.",`You can look up the decoded signature here: https://openchain.xyz/signatures?query=${e}.`].join(`
`),{docsPath:n}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiErrorSignatureNotFoundError"}),Object.defineProperty(this,"signature",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.signature=e}}class Lg extends G{constructor({docsPath:e}){super("Cannot extract event signature from empty topics.",{docsPath:e}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiEventSignatureEmptyTopicsError"})}}class jg extends G{constructor(e,{docsPath:n}){super([`Encoded event signature "${e}" not found on ABI.`,"Make sure you are using the correct ABI and that the event exists on it.",`You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`].join(`
`),{docsPath:n}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiEventSignatureNotFoundError"})}}class b0 extends G{constructor(e,{docsPath:n}={}){super([`Event ${e?`"${e}" `:""}not found on ABI.`,"Make sure you are using the correct ABI and that the event exists on it."].join(`
`),{docsPath:n}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiEventNotFoundError"})}}class Sa extends G{constructor(e,{docsPath:n}={}){super([`Function ${e?`"${e}" `:""}not found on ABI.`,"Make sure you are using the correct ABI and that the function exists on it."].join(`
`),{docsPath:n}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiFunctionNotFoundError"})}}class Fg extends G{constructor(e,{docsPath:n}){super([`Function "${e}" does not contain any \`outputs\` on ABI.`,"Cannot decode function result without knowing what the parameter types are.","Make sure you are using the correct ABI and that the function exists on it."].join(`
`),{docsPath:n}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiFunctionOutputsNotFoundError"})}}class Wg extends G{constructor(e,n){super("Found ambiguous types in overloaded ABI items.",{metaMessages:[`\`${e.type}\` in \`${Wn(e.abiItem)}\`, and`,`\`${n.type}\` in \`${Wn(n.abiItem)}\``,"","These types encode differently and cannot be distinguished at runtime.","Remove one of the ambiguous items in the ABI."]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiItemAmbiguityError"})}}class zg extends G{constructor({expectedSize:e,givenSize:n}){super(`Expected bytes${e}, got bytes${n}.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"BytesSizeMismatchError"})}}class Hr extends G{constructor({abiItem:e,data:n,params:r,size:o}){super([`Data size of ${o} bytes is too small for non-indexed event parameters.`].join(`
`),{metaMessages:[`Params: (${mc(r,{includeName:!0})})`,`Data:   ${n} (${o} bytes)`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"DecodeLogDataMismatch"}),Object.defineProperty(this,"abiItem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"params",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"size",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.abiItem=e,this.data=n,this.params=r,this.size=o}}class so extends G{constructor({abiItem:e,param:n}){super([`Expected a topic for indexed event parameter${n.name?` "${n.name}"`:""} on event "${Wn(e,{includeName:!0})}".`].join(`
`)),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"DecodeLogTopicsMismatch"}),Object.defineProperty(this,"abiItem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.abiItem=e}}class Hg extends G{constructor(e,{docsPath:n}){super([`Type "${e}" is not a valid encoding type.`,"Please provide a valid ABI type."].join(`
`),{docsPath:n}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidAbiEncodingType"})}}class Vg extends G{constructor(e,{docsPath:n}){super([`Type "${e}" is not a valid decoding type.`,"Please provide a valid ABI type."].join(`
`),{docsPath:n}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidAbiDecodingType"})}}class Zg extends G{constructor(e){super([`Value "${e}" is not a valid array.`].join(`
`)),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidArrayError"})}}class Gg extends G{constructor(e){super([`"${e}" is not a valid definition type.`,'Valid types: "function", "event", "error"'].join(`
`)),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidDefinitionTypeError"})}}class qg extends G{constructor(e){super(`Filter type "${e}" is not supported.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"FilterTypeNotSupportedError"})}}function Kg(t){let e=!0,n="",r=0,o="",i=!1;for(let s=0;s<t.length;s++){const a=t[s];if(["(",")",","].includes(a)&&(e=!0),a==="("&&r++,a===")"&&r--,!!e){if(r===0){if(a===" "&&["event","function",""].includes(o))o="";else if(o+=a,a===")"){i=!0;break}continue}if(a===" "){t[s-1]!==","&&n!==","&&n!==",("&&(n="",e=!1);continue}o+=a,n+=a}}if(!i)throw new G("Unable to normalize signature.");return o}const mh=t=>{const e=typeof t=="string"?t:Rg(t);return Kg(e)},Yg=t=>mh(t);function y0(t){if(!Number.isSafeInteger(t)||t<0)throw new Error(`Wrong positive integer: ${t}`)}function wh(t,...e){if(!(t instanceof Uint8Array))throw new Error("Expected Uint8Array");if(e.length>0&&!e.includes(t.length))throw new Error(`Expected Uint8Array of length ${e}, not of length=${t.length}`)}function v0(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function Jg(t,e){wh(t);const n=e.outputLen;if(t.length<n)throw new Error(`digestInto() expects output buffer of length at least ${n}`)}const ia=BigInt(2**32-1),x0=BigInt(32);function Xg(t,e=!1){return e?{h:Number(t&ia),l:Number(t>>x0&ia)}:{h:Number(t>>x0&ia)|0,l:Number(t&ia)|0}}function Qg(t,e=!1){let n=new Uint32Array(t.length),r=new Uint32Array(t.length);for(let o=0;o<t.length;o++){const{h:i,l:s}=Xg(t[o],e);[n[o],r[o]]=[i,s]}return[n,r]}const em=(t,e,n)=>t<<n|e>>>32-n,tm=(t,e,n)=>e<<n|t>>>32-n,nm=(t,e,n)=>e<<n-32|t>>>64-n,rm=(t,e,n)=>t<<n-32|e>>>64-n;/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */const im=t=>t instanceof Uint8Array,om=t=>new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4)),sm=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;if(!sm)throw new Error("Non little-endian hardware is not supported");function am(t){if(typeof t!="string")throw new Error(`utf8ToBytes expected string, got ${typeof t}`);return new Uint8Array(new TextEncoder().encode(t))}function bh(t){if(typeof t=="string"&&(t=am(t)),!im(t))throw new Error(`expected Uint8Array, got ${typeof t}`);return t}class cm{clone(){return this._cloneInto()}}function lm(t){const e=r=>t().update(bh(r)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e}const[yh,vh,xh]=[[],[],[]],um=BigInt(0),yo=BigInt(1),dm=BigInt(2),fm=BigInt(7),hm=BigInt(256),pm=BigInt(113);for(let t=0,e=yo,n=1,r=0;t<24;t++){[n,r]=[r,(2*n+3*r)%5],yh.push(2*(5*r+n)),vh.push((t+1)*(t+2)/2%64);let o=um;for(let i=0;i<7;i++)e=(e<<yo^(e>>fm)*pm)%hm,e&dm&&(o^=yo<<(yo<<BigInt(i))-yo);xh.push(o)}const[gm,mm]=Qg(xh,!0),E0=(t,e,n)=>n>32?nm(t,e,n):em(t,e,n),_0=(t,e,n)=>n>32?rm(t,e,n):tm(t,e,n);function wm(t,e=24){const n=new Uint32Array(10);for(let r=24-e;r<24;r++){for(let s=0;s<10;s++)n[s]=t[s]^t[s+10]^t[s+20]^t[s+30]^t[s+40];for(let s=0;s<10;s+=2){const a=(s+8)%10,c=(s+2)%10,l=n[c],u=n[c+1],p=E0(l,u,1)^n[a],g=_0(l,u,1)^n[a+1];for(let m=0;m<50;m+=10)t[s+m]^=p,t[s+m+1]^=g}let o=t[2],i=t[3];for(let s=0;s<24;s++){const a=vh[s],c=E0(o,i,a),l=_0(o,i,a),u=yh[s];o=t[u],i=t[u+1],t[u]=c,t[u+1]=l}for(let s=0;s<50;s+=10){for(let a=0;a<10;a++)n[a]=t[s+a];for(let a=0;a<10;a++)t[s+a]^=~n[(a+2)%10]&n[(a+4)%10]}t[0]^=gm[r],t[1]^=mm[r]}n.fill(0)}class Xu extends cm{constructor(e,n,r,o=!1,i=24){if(super(),this.blockLen=e,this.suffix=n,this.outputLen=r,this.enableXOF=o,this.rounds=i,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,y0(r),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=om(this.state)}keccak(){wm(this.state32,this.rounds),this.posOut=0,this.pos=0}update(e){v0(this);const{blockLen:n,state:r}=this;e=bh(e);const o=e.length;for(let i=0;i<o;){const s=Math.min(n-this.pos,o-i);for(let a=0;a<s;a++)r[this.pos++]^=e[i++];this.pos===n&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:e,suffix:n,pos:r,blockLen:o}=this;e[r]^=n,n&128&&r===o-1&&this.keccak(),e[o-1]^=128,this.keccak()}writeInto(e){v0(this,!1),wh(e),this.finish();const n=this.state,{blockLen:r}=this;for(let o=0,i=e.length;o<i;){this.posOut>=r&&this.keccak();const s=Math.min(r-this.posOut,i-o);e.set(n.subarray(this.posOut,this.posOut+s),o),this.posOut+=s,o+=s}return e}xofInto(e){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(e)}xof(e){return y0(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(Jg(e,this),this.finished)throw new Error("digest() was already called");return this.writeInto(e),this.destroy(),e}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(e){const{blockLen:n,suffix:r,outputLen:o,rounds:i,enableXOF:s}=this;return e||(e=new Xu(n,r,o,s,i)),e.state32.set(this.state32),e.pos=this.pos,e.posOut=this.posOut,e.finished=this.finished,e.rounds=i,e.suffix=r,e.outputLen=o,e.enableXOF=s,e.destroyed=this.destroyed,e}}const bm=(t,e,n)=>lm(()=>new Xu(e,t,n)),ym=bm(1,136,256/8);function xt(t,e){const n=e||"hex",r=ym(_n(t,{strict:!1})?lr(t):t);return n==="bytes"?r:Zn(r)}const vm=t=>xt(lr(t)),Qu=t=>vm(Yg(t));function at(t,e,n,{strict:r}={}){return _n(t,{strict:!1})?Em(t,e,n,{strict:r}):xm(t,e,n,{strict:r})}function Eh(t,e){if(typeof e=="number"&&e>0&&e>lt(t)-1)throw new ah({offset:e,position:"start",size:lt(t)})}function _h(t,e,n){if(typeof e=="number"&&typeof n=="number"&&lt(t)!==n-e)throw new ah({offset:n,position:"end",size:lt(t)})}function xm(t,e,n,{strict:r}={}){Eh(t,e);const o=t.slice(e,n);return r&&_h(o,e,n),o}function Em(t,e,n,{strict:r}={}){Eh(t,e);const o=`0x${t.replace("0x","").slice((e??0)*2,(n??t.length)*2)}`;return r&&_h(o,e,n),o}function Rs(t,e){if(t.length!==e.length)throw new Bg({expectedLength:t.length,givenLength:e.length});const n=_m({params:t,values:e}),r=td(n);return r.length===0?"0x":r}function _m({params:t,values:e}){const n=[];for(let r=0;r<t.length;r++)n.push(ed({param:t[r],value:e[r]}));return n}function ed({param:t,value:e}){const n=bc(t.type);if(n){const[r,o]=n;return Sm(e,{length:r,param:{...t,type:o}})}if(t.type==="tuple")return Dm(e,{param:t});if(t.type==="address")return Cm(e);if(t.type==="bool")return Tm(e);if(t.type.startsWith("uint")||t.type.startsWith("int")){const r=t.type.startsWith("int");return Im(e,{signed:r})}if(t.type.startsWith("bytes"))return Am(e,{param:t});if(t.type==="string")return $m(e);throw new Hg(t.type,{docsPath:"/docs/contract/encodeAbiParameters"})}function td(t){let e=0;for(let i=0;i<t.length;i++){const{dynamic:s,encoded:a}=t[i];s?e+=32:e+=lt(a)}const n=[],r=[];let o=0;for(let i=0;i<t.length;i++){const{dynamic:s,encoded:a}=t[i];s?(n.push(xe(e+o,{size:32})),r.push(a),o+=lt(a)):n.push(a)}return Fn([...n,...r])}function Cm(t){if(!ur(t))throw new Uo({address:t});return{dynamic:!1,encoded:or(t.toLowerCase())}}function Sm(t,{length:e,param:n}){const r=e===null;if(!Array.isArray(t))throw new Zg(t);if(!r&&t.length!==e)throw new Mg({expectedLength:e,givenLength:t.length,type:`${n.type}[${e}]`});let o=!1;const i=[];for(let s=0;s<t.length;s++){const a=ed({param:n,value:t[s]});a.dynamic&&(o=!0),i.push(a)}if(r||o){const s=td(i);if(r){const a=xe(i.length,{size:32});return{dynamic:!0,encoded:i.length>0?Fn([a,s]):a}}if(o)return{dynamic:!0,encoded:s}}return{dynamic:!1,encoded:Fn(i.map(({encoded:s})=>s))}}function Am(t,{param:e}){const[,n]=e.type.split("bytes"),r=lt(t);if(!n){let o=t;return r%32!==0&&(o=or(o,{dir:"right",size:Math.ceil((t.length-2)/2/32)*32})),{dynamic:!0,encoded:Fn([or(xe(r,{size:32})),o])}}if(r!==parseInt(n))throw new Ug({expectedSize:parseInt(n),value:t});return{dynamic:!1,encoded:or(t,{dir:"right"})}}function Tm(t){return{dynamic:!1,encoded:or(lh(t))}}function Im(t,{signed:e}){return{dynamic:!1,encoded:xe(t,{size:32,signed:e})}}function $m(t){const e=qu(t),n=Math.ceil(lt(e)/32),r=[];for(let o=0;o<n;o++)r.push(or(at(e,o*32,(o+1)*32),{dir:"right"}));return{dynamic:!0,encoded:Fn([or(xe(lt(e),{size:32})),...r])}}function Dm(t,{param:e}){let n=!1;const r=[];for(let o=0;o<e.components.length;o++){const i=e.components[o],s=Array.isArray(t)?o:i.name,a=ed({param:i,value:t[s]});r.push(a),a.dynamic&&(n=!0)}return{dynamic:n,encoded:n?td(r):Fn(r.map(({encoded:o})=>o))}}function bc(t){const e=t.match(/^(.*)\[(\d+)?\]$/);return e?[e[2]?Number(e[2]):null,e[1]]:void 0}const Pm=t=>xt(lr(t)),nd=t=>at(Pm(mh(t)),0,4);function Ns({abi:t,args:e=[],name:n}){const r=_n(n,{strict:!1}),o=t.filter(s=>r?s.type==="function"?nd(s)===n:s.type==="event"?Qu(s)===n:!1:"name"in s&&s.name===n);if(o.length===0)return;if(o.length===1)return o[0];let i;for(const s of o){if(!("inputs"in s))continue;if(!e||e.length===0){if(!s.inputs||s.inputs.length===0)return s;continue}if(!s.inputs||s.inputs.length===0||s.inputs.length!==e.length)continue;if(e.every((c,l)=>{const u="inputs"in s&&s.inputs[l];return u?tu(c,u):!1})){if(i&&"inputs"in i&&i.inputs){const c=Ch(s.inputs,i.inputs,e);if(c)throw new Wg({abiItem:s,type:c[0]},{abiItem:i,type:c[1]})}i=s}}return i||o[0]}function tu(t,e){const n=typeof t,r=e.type;switch(r){case"address":return ur(t);case"bool":return n==="boolean";case"function":return n==="string";case"string":return n==="string";default:return r==="tuple"&&"components"in e?Object.values(e.components).every((o,i)=>tu(Object.values(t)[i],o)):/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(r)?n==="number"||n==="bigint":/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r)?n==="string"||t instanceof Uint8Array:/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r)?Array.isArray(t)&&t.every(o=>tu(o,{...e,type:r.replace(/(\[[0-9]{0,}\])$/,"")})):!1}}function Ch(t,e,n){for(const r in t){const o=t[r],i=e[r];if(o.type==="tuple"&&i.type==="tuple"&&"components"in o&&"components"in i)return Ch(o.components,i.components,n[r]);const s=[o.type,i.type];if(s.includes("address")&&s.includes("bytes20")?!0:s.includes("address")&&s.includes("string")||s.includes("address")&&s.includes("bytes")?ur(n[r]):!1)return s}}function ks({abi:t,eventName:e,args:n}){var a;let r=t[0];if(e&&(r=Ns({abi:t,args:n,name:e}),!r))throw new b0(e,{docsPath:"/docs/contract/encodeEventTopics"});if(r.type!=="event")throw new b0(void 0,{docsPath:"/docs/contract/encodeEventTopics"});const o=Wn(r),i=Qu(o);let s=[];if(n&&"inputs"in r){const c=(a=r.inputs)==null?void 0:a.filter(u=>"indexed"in u&&u.indexed),l=Array.isArray(n)?n:Object.values(n).length>0?(c==null?void 0:c.map(u=>n[u.name]))??[]:[];l.length>0&&(s=(c==null?void 0:c.map((u,p)=>Array.isArray(l[p])?l[p].map((g,m)=>C0({param:u,value:l[p][m]})):l[p]?C0({param:u,value:l[p]}):null))??[])}return[i,...s]}function C0({param:t,value:e}){if(t.type==="string"||t.type==="bytes")return xt(lr(e));if(t.type==="tuple"||t.type.match(/^(.*)\[(\d+)?\]$/))throw new qg(t.type);return Rs([t],[e])}function yc(t,{method:e}){var r,o;const n={};return t.transport.type==="fallback"&&((o=(r=t.transport).onResponse)==null||o.call(r,({method:i,response:s,status:a,transport:c})=>{a==="success"&&e===i&&(n[s]=c.request)})),i=>n[i]||t.request}async function Sh(t,{address:e,abi:n,args:r,eventName:o,fromBlock:i,strict:s,toBlock:a}){const c=yc(t,{method:"eth_newFilter"}),l=o?ks({abi:n,args:r,eventName:o}):void 0,u=await t.request({method:"eth_newFilter",params:[{address:e,fromBlock:typeof i=="bigint"?xe(i):i,toBlock:typeof a=="bigint"?xe(a):a,topics:l}]});return{abi:n,args:r,eventName:o,id:u,request:c(u),strict:s,type:"event"}}function Kt(t){return typeof t=="string"?{address:t,type:"json-rpc"}:t}function xr({abi:t,args:e,functionName:n}){let r=t[0];if(n&&(r=Ns({abi:t,args:e,name:n}),!r))throw new Sa(n,{docsPath:"/docs/contract/encodeFunctionData"});if(r.type!=="function")throw new Sa(void 0,{docsPath:"/docs/contract/encodeFunctionData"});const o=Wn(r),i=nd(o),s="inputs"in r&&r.inputs?Rs(r.inputs,e??[]):void 0;return Yu([i,s??"0x"])}const Ah={1:"An `assert` condition failed.",17:"Arithmic operation resulted in underflow or overflow.",18:"Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",33:"Attempted to convert to an invalid type.",34:"Attempted to access a storage byte array that is incorrectly encoded.",49:"Performed `.pop()` on an empty array",50:"Array index is out of bounds.",65:"Allocated too much memory or created an array which is too large.",81:"Attempted to call a zero-initialized variable of internal function type."},Om={inputs:[{name:"message",type:"string"}],name:"Error",type:"error"},Rm={inputs:[{name:"reason",type:"uint256"}],name:"Panic",type:"error"};function rd(t,e){const n=e?`${e}${t.toLowerCase()}`:t.substring(2).toLowerCase(),r=xt(Ln(n),"bytes"),o=(e?n.substring(`${e}0x`.length):n).split("");for(let i=0;i<40;i+=2)r[i>>1]>>4>=8&&o[i]&&(o[i]=o[i].toUpperCase()),(r[i>>1]&15)>=8&&o[i+1]&&(o[i+1]=o[i+1].toUpperCase());return`0x${o.join("")}`}function Vt(t,e){if(!ur(t))throw new Uo({address:t});return rd(t,e)}function vc(t,e){if(e==="0x"&&t.length>0)throw new wc;if(lt(e)&&lt(e)<32)throw new Ju({data:e,params:t,size:lt(e)});return Nm({data:e,params:t})}function Nm({data:t,params:e}){const n=[];let r=0;for(let o=0;o<e.length;o++){if(r>=lt(t))throw new Ju({data:t,params:e,size:lt(t)});const i=e[o],{consumed:s,value:a}=Di({data:t,param:i,position:r});n.push(a),r+=s}return n}function Di({data:t,param:e,position:n}){const r=bc(e.type);if(r){const[i,s]=r;return Mm(t,{length:i,param:{...e,type:s},position:n})}if(e.type==="tuple")return Fm(t,{param:e,position:n});if(e.type==="string")return jm(t,{position:n});if(e.type.startsWith("bytes"))return Bm(t,{param:e,position:n});const o=at(t,n,n+32,{strict:!0});if(e.type.startsWith("uint")||e.type.startsWith("int"))return Lm(o,{param:e});if(e.type==="address")return km(o);if(e.type==="bool")return Um(o);throw new Vg(e.type,{docsPath:"/docs/contract/decodeAbiParameters"})}function km(t){return{consumed:32,value:rd(at(t,-20))}}function Mm(t,{param:e,length:n,position:r}){if(!n){const s=wt(at(t,r,r+32,{strict:!0})),a=wt(at(t,s,s+32,{strict:!0}));let c=0;const l=[];for(let u=0;u<a;++u){const p=Di({data:at(t,s+32),param:e,position:c});c+=p.consumed,l.push(p.value)}return{value:l,consumed:32}}if(Aa(e)){const s=bc(e.type),a=!(s!=null&&s[0]);let c=0;const l=[];for(let u=0;u<n;++u){const p=wt(at(t,r,r+32,{strict:!0})),g=Di({data:at(t,p),param:e,position:a?c:u*32});c+=g.consumed,l.push(g.value)}return{value:l,consumed:32}}let o=0;const i=[];for(let s=0;s<n;++s){const a=Di({data:t,param:e,position:r+o});o+=a.consumed,i.push(a.value)}return{value:i,consumed:o}}function Um(t){return{consumed:32,value:xg(t)}}function Bm(t,{param:e,position:n}){const[r,o]=e.type.split("bytes");if(!o){const s=wt(at(t,n,n+32,{strict:!0})),a=wt(at(t,s,s+32,{strict:!0}));return a===0?{consumed:32,value:"0x"}:{consumed:32,value:at(t,s+32,s+32+a,{strict:!0})}}return{consumed:32,value:at(t,n,n+parseInt(o),{strict:!0})}}function Lm(t,{param:e}){const n=e.type.startsWith("int");return{consumed:32,value:parseInt(e.type.split("int")[1]||"256")>48?hc(t,{signed:n}):wt(t,{signed:n})}}function jm(t,{position:e}){const n=wt(at(t,e,e+32,{strict:!0})),r=wt(at(t,n,n+32,{strict:!0}));return r===0?{consumed:32,value:""}:{consumed:32,value:uh(jr(at(t,n+32,n+32+r,{strict:!0})))}}function Fm(t,{param:e,position:n}){const r=e.components.length===0||e.components.some(({name:s})=>!s),o=r?[]:{};let i=0;if(Aa(e)){const s=wt(at(t,n,n+32,{strict:!0}));for(let a=0;a<e.components.length;++a){const c=e.components[a],l=Di({data:at(t,s),param:c,position:i});i+=l.consumed,o[r?a:c==null?void 0:c.name]=l.value}return{consumed:32,value:o}}for(let s=0;s<e.components.length;++s){const a=e.components[s],c=Di({data:t,param:a,position:n+i});i+=c.consumed,o[r?s:a==null?void 0:a.name]=c.value}return{consumed:i,value:o}}function Aa(t){var r;const{type:e}=t;if(e==="string"||e==="bytes"||e.endsWith("[]"))return!0;if(e==="tuple")return(r=t.components)==null?void 0:r.some(Aa);const n=bc(t.type);return!!(n&&Aa({...t,type:n[1]}))}function Wm({abi:t,data:e}){const n=at(e,0,4);if(n==="0x")throw new wc;const o=[...t||[],Om,Rm].find(i=>i.type==="error"&&n===nd(Wn(i)));if(!o)throw new gh(n,{docsPath:"/docs/contract/decodeErrorResult"});return{abiItem:o,args:"inputs"in o&&o.inputs&&o.inputs.length>0?vc(o.inputs,at(e,4)):void 0,errorName:o.name}}const _t=(t,e,n)=>JSON.stringify(t,(r,o)=>{const i=typeof o=="bigint"?o.toString():o;return typeof e=="function"?e(r,i):i},n);function Th({abiItem:t,args:e,includeFunctionName:n=!0,includeName:r=!1}){if("name"in t&&"inputs"in t&&t.inputs)return`${n?t.name:""}(${t.inputs.map((o,i)=>`${r&&o.name?`${o.name}: `:""}${typeof e[i]=="object"?_t(e[i]):e[i]}`).join(", ")})`}function id(t,e="wei"){return Ea(t,Tg[e])}function Ms(t){const e=Object.entries(t).map(([r,o])=>o===void 0||o===!1?null:[r,o]).filter(Boolean),n=e.reduce((r,[o])=>Math.max(r,o.length),0);return e.map(([r,o])=>`  ${`${r}:`.padEnd(n+1)}  ${o}`).join(`
`)}class zm extends G{constructor(){super(["Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.","Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."].join(`
`)),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"FeeConflictError"})}}class Hm extends G{constructor({transaction:e}){super("Cannot infer a transaction type from provided transaction.",{metaMessages:["Provided Transaction:","{",Ms(e),"}","","To infer the type, either provide:","- a `type` to the Transaction, or","- an EIP-1559 Transaction with `maxFeePerGas`, or","- an EIP-2930 Transaction with `gasPrice` & `accessList`, or","- a Legacy Transaction with `gasPrice`"]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidSerializableTransactionError"})}}class Vm extends G{constructor(e,{account:n,docsPath:r,chain:o,data:i,gas:s,gasPrice:a,maxFeePerGas:c,maxPriorityFeePerGas:l,nonce:u,to:p,value:g}){var w;const m=Ms({chain:o&&`${o==null?void 0:o.name} (id: ${o==null?void 0:o.id})`,from:n==null?void 0:n.address,to:p,value:typeof g<"u"&&`${id(g)} ${((w=o==null?void 0:o.nativeCurrency)==null?void 0:w.symbol)||"ETH"}`,data:i,gas:s,gasPrice:typeof a<"u"&&`${Dt(a)} gwei`,maxFeePerGas:typeof c<"u"&&`${Dt(c)} gwei`,maxPriorityFeePerGas:typeof l<"u"&&`${Dt(l)} gwei`,nonce:u});super(e.shortMessage,{cause:e,docsPath:r,metaMessages:[...e.metaMessages?[...e.metaMessages," "]:[],"Request Arguments:",m].filter(Boolean)}),Object.defineProperty(this,"cause",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"TransactionExecutionError"}),this.cause=e}}class Ih extends G{constructor({blockHash:e,blockNumber:n,blockTag:r,hash:o,index:i}){let s="Transaction";r&&i!==void 0&&(s=`Transaction at block time "${r}" at index "${i}"`),e&&i!==void 0&&(s=`Transaction at block hash "${e}" at index "${i}"`),n&&i!==void 0&&(s=`Transaction at block number "${n}" at index "${i}"`),o&&(s=`Transaction with hash "${o}"`),super(`${s} could not be found.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"TransactionNotFoundError"})}}class $h extends G{constructor({hash:e}){super(`Transaction receipt with hash "${e}" could not be found. The Transaction may not be processed on a block yet.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"TransactionReceiptNotFoundError"})}}class Zm extends G{constructor({hash:e}){super(`Timed out while waiting for transaction with hash "${e}" to be confirmed.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"WaitForTransactionReceiptTimeoutError"})}}class Dh extends G{constructor(e,{account:n,docsPath:r,chain:o,data:i,gas:s,gasPrice:a,maxFeePerGas:c,maxPriorityFeePerGas:l,nonce:u,to:p,value:g}){var v;const m=n?Kt(n):void 0,w=Ms({from:m==null?void 0:m.address,to:p,value:typeof g<"u"&&`${id(g)} ${((v=o==null?void 0:o.nativeCurrency)==null?void 0:v.symbol)||"ETH"}`,data:i,gas:s,gasPrice:typeof a<"u"&&`${Dt(a)} gwei`,maxFeePerGas:typeof c<"u"&&`${Dt(c)} gwei`,maxPriorityFeePerGas:typeof l<"u"&&`${Dt(l)} gwei`,nonce:u});super(e.shortMessage,{cause:e,docsPath:r,metaMessages:[...e.metaMessages?[...e.metaMessages," "]:[],"Raw Call Arguments:",w].filter(Boolean)}),Object.defineProperty(this,"cause",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"CallExecutionError"}),this.cause=e}}class od extends G{constructor(e,{abi:n,args:r,contractAddress:o,docsPath:i,functionName:s,sender:a}){const c=Ns({abi:n,args:r,name:s}),l=c?Th({abiItem:c,args:r,includeFunctionName:!1,includeName:!1}):void 0,u=c?Wn(c,{includeName:!0}):void 0,p=Ms({address:o&&ug(o),function:u,args:l&&l!=="()"&&`${[...Array((s==null?void 0:s.length)??0).keys()].map(()=>" ").join("")}${l}`,sender:a});super(e.shortMessage||`An unknown error occurred while executing the contract function "${s}".`,{cause:e,docsPath:i,metaMessages:[...e.metaMessages?[...e.metaMessages," "]:[],"Contract Call:",p].filter(Boolean)}),Object.defineProperty(this,"abi",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"args",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"cause",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"contractAddress",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"formattedArgs",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"functionName",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"sender",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ContractFunctionExecutionError"}),this.abi=n,this.args=r,this.cause=e,this.contractAddress=o,this.functionName=s,this.sender=a}}class nu extends G{constructor({abi:e,data:n,functionName:r,message:o}){let i,s,a,c;if(n&&n!=="0x")try{s=Wm({abi:e,data:n});const{abiItem:u,errorName:p,args:g}=s;if(p==="Error")c=g[0];else if(p==="Panic"){const[m]=g;c=Ah[m]}else{const m=u?Wn(u,{includeName:!0}):void 0,w=u&&g?Th({abiItem:u,args:g,includeFunctionName:!1,includeName:!1}):void 0;a=[m?`Error: ${m}`:"",w&&w!=="()"?`       ${[...Array((p==null?void 0:p.length)??0).keys()].map(()=>" ").join("")}${w}`:""]}}catch(u){i=u}else o&&(c=o);let l;i instanceof gh&&(l=i.signature,a=[`Unable to decode signature "${l}" as it was not found on the provided ABI.`,"Make sure you are using the correct ABI and that the error exists on it.",`You can look up the decoded signature here: https://openchain.xyz/signatures?query=${l}.`]),super(c&&c!=="execution reverted"||l?[`The contract function "${r}" reverted with the following ${l?"signature":"reason"}:`,c||l].join(`
`):`The contract function "${r}" reverted.`,{cause:i,metaMessages:a}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ContractFunctionRevertedError"}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"reason",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"signature",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.data=s,this.reason=c,this.signature=l}}class Gm extends G{constructor({functionName:e}){super(`The contract function "${e}" returned no data ("0x").`,{metaMessages:["This could be due to any of the following:",`  - The contract does not have the function "${e}",`,"  - The parameters passed to the contract function may be invalid, or","  - The address is not a contract."]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ContractFunctionZeroDataError"})}}class sd extends G{constructor({data:e,message:n}){super(n||""),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:3}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"RawContractError"}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.data=e}}class $o extends G{constructor({body:e,details:n,headers:r,status:o,url:i}){super("HTTP request failed.",{details:n,metaMessages:[o&&`Status: ${o}`,`URL: ${fc(i)}`,e&&`Request body: ${_t(e)}`].filter(Boolean)}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"HttpRequestError"}),Object.defineProperty(this,"body",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"headers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"status",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"url",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.body=e,this.headers=r,this.status=o,this.url=i}}class qm extends G{constructor({body:e,details:n,url:r}){super("WebSocket request failed.",{details:n,metaMessages:[`URL: ${fc(r)}`,`Request body: ${_t(e)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"WebSocketRequestError"})}}class ad extends G{constructor({body:e,error:n,url:r}){super("RPC Request failed.",{cause:n,details:n.message,metaMessages:[`URL: ${fc(r)}`,`Request body: ${_t(e)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"RpcRequestError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.code=n.code}}class ru extends G{constructor({body:e,url:n}){super("The request took too long to respond.",{details:"The request timed out.",metaMessages:[`URL: ${fc(n)}`,`Request body: ${_t(e)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"TimeoutError"})}}const Km=-1;class Rt extends G{constructor(e,{code:n,docsPath:r,metaMessages:o,shortMessage:i}){super(i,{cause:e,docsPath:r,metaMessages:o||(e==null?void 0:e.metaMessages)}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"RpcError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name=e.name,this.code=e instanceof ad?e.code:n??Km}}class ao extends Rt{constructor(e,n){super(e,n),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ProviderRpcError"}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.data=n.data}}class Bo extends Rt{constructor(e){super(e,{code:Bo.code,shortMessage:"Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ParseRpcError"})}}Object.defineProperty(Bo,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32700});class Lo extends Rt{constructor(e){super(e,{code:Lo.code,shortMessage:"JSON is not a valid request object."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidRequestRpcError"})}}Object.defineProperty(Lo,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32600});class jo extends Rt{constructor(e){super(e,{code:jo.code,shortMessage:"The method does not exist / is not available."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"MethodNotFoundRpcError"})}}Object.defineProperty(jo,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32601});class Fo extends Rt{constructor(e){super(e,{code:Fo.code,shortMessage:["Invalid parameters were provided to the RPC method.","Double check you have provided the correct parameters."].join(`
`)}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidParamsRpcError"})}}Object.defineProperty(Fo,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32602});class Mi extends Rt{constructor(e){super(e,{code:Mi.code,shortMessage:"An internal error was received."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InternalRpcError"})}}Object.defineProperty(Mi,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32603});class Vr extends Rt{constructor(e){super(e,{code:Vr.code,shortMessage:["Missing or invalid parameters.","Double check you have provided the correct parameters."].join(`
`)}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidInputRpcError"})}}Object.defineProperty(Vr,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32e3});class Wo extends Rt{constructor(e){super(e,{code:Wo.code,shortMessage:"Requested resource not found."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ResourceNotFoundRpcError"})}}Object.defineProperty(Wo,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32001});class Ui extends Rt{constructor(e){super(e,{code:Ui.code,shortMessage:"Requested resource not available."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ResourceUnavailableRpcError"})}}Object.defineProperty(Ui,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32002});class zo extends Rt{constructor(e){super(e,{code:zo.code,shortMessage:"Transaction creation failed."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"TransactionRejectedRpcError"})}}Object.defineProperty(zo,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32003});class Ho extends Rt{constructor(e){super(e,{code:Ho.code,shortMessage:"Method is not implemented."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"MethodNotSupportedRpcError"})}}Object.defineProperty(Ho,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32004});class Vo extends Rt{constructor(e){super(e,{code:Vo.code,shortMessage:"Request exceeds defined limit."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"LimitExceededRpcError"})}}Object.defineProperty(Vo,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32005});class Zo extends Rt{constructor(e){super(e,{code:Zo.code,shortMessage:"Version of JSON-RPC protocol is not supported."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"JsonRpcVersionUnsupportedError"})}}Object.defineProperty(Zo,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32006});class $t extends ao{constructor(e){super(e,{code:$t.code,shortMessage:"User rejected the request."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"UserRejectedRequestError"})}}Object.defineProperty($t,"code",{enumerable:!0,configurable:!0,writable:!0,value:4001});class Go extends ao{constructor(e){super(e,{code:Go.code,shortMessage:"The requested method and/or account has not been authorized by the user."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"UnauthorizedProviderError"})}}Object.defineProperty(Go,"code",{enumerable:!0,configurable:!0,writable:!0,value:4100});class qo extends ao{constructor(e){super(e,{code:qo.code,shortMessage:"The Provider does not support the requested method."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"UnsupportedProviderMethodError"})}}Object.defineProperty(qo,"code",{enumerable:!0,configurable:!0,writable:!0,value:4200});class Ko extends ao{constructor(e){super(e,{code:Ko.code,shortMessage:"The Provider is disconnected from all chains."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ProviderDisconnectedError"})}}Object.defineProperty(Ko,"code",{enumerable:!0,configurable:!0,writable:!0,value:4900});class Yo extends ao{constructor(e){super(e,{code:Yo.code,shortMessage:"The Provider is not connected to the requested chain."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ChainDisconnectedError"})}}Object.defineProperty(Yo,"code",{enumerable:!0,configurable:!0,writable:!0,value:4901});class sn extends ao{constructor(e){super(e,{code:sn.code,shortMessage:"An error occurred when attempting to switch chain."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"SwitchChainError"})}}Object.defineProperty(sn,"code",{enumerable:!0,configurable:!0,writable:!0,value:4902});class Ym extends Rt{constructor(e){super(e,{shortMessage:"An unknown RPC error occurred."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"UnknownRpcError"})}}const Jm=3;function Jo(t,{abi:e,address:n,args:r,docsPath:o,functionName:i,sender:s}){const{code:a,data:c,message:l,shortMessage:u}=t instanceof sd?t:t instanceof G?t.walk(g=>"data"in g)||t.walk():{},p=t instanceof wc?new Gm({functionName:i}):[Jm,Mi.code].includes(a)&&(c||l||u)?new nu({abi:e,data:typeof c=="object"?c.data:c,functionName:i,message:u??l}):t;return new od(p,{abi:e,args:r,contractAddress:n,docsPath:o,functionName:i,sender:s})}class co extends G{constructor({docsPath:e}={}){super(["Could not find an Account to execute with this Action.","Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the WalletClient."].join(`
`),{docsPath:e,docsSlug:"account"}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AccountNotFoundError"})}}class Xm extends G{constructor(e,{account:n,docsPath:r,chain:o,data:i,gas:s,gasPrice:a,maxFeePerGas:c,maxPriorityFeePerGas:l,nonce:u,to:p,value:g}){var w;const m=Ms({from:n==null?void 0:n.address,to:p,value:typeof g<"u"&&`${id(g)} ${((w=o==null?void 0:o.nativeCurrency)==null?void 0:w.symbol)||"ETH"}`,data:i,gas:s,gasPrice:typeof a<"u"&&`${Dt(a)} gwei`,maxFeePerGas:typeof c<"u"&&`${Dt(c)} gwei`,maxPriorityFeePerGas:typeof l<"u"&&`${Dt(l)} gwei`,nonce:u});super(e.shortMessage,{cause:e,docsPath:r,metaMessages:[...e.metaMessages?[...e.metaMessages," "]:[],"Estimate Gas Arguments:",m].filter(Boolean)}),Object.defineProperty(this,"cause",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"EstimateGasExecutionError"}),this.cause=e}}function cd(t,e){const n=(t.details||"").toLowerCase(),r=t.walk(o=>o.code===$i.code);return r instanceof G?new $i({cause:t,message:r.details}):$i.nodeMessage.test(n)?new $i({cause:t,message:t.details}):_a.nodeMessage.test(n)?new _a({cause:t,maxFeePerGas:e==null?void 0:e.maxFeePerGas}):Zl.nodeMessage.test(n)?new Zl({cause:t,maxFeePerGas:e==null?void 0:e.maxFeePerGas}):Gl.nodeMessage.test(n)?new Gl({cause:t,nonce:e==null?void 0:e.nonce}):ql.nodeMessage.test(n)?new ql({cause:t,nonce:e==null?void 0:e.nonce}):Kl.nodeMessage.test(n)?new Kl({cause:t,nonce:e==null?void 0:e.nonce}):Yl.nodeMessage.test(n)?new Yl({cause:t}):Jl.nodeMessage.test(n)?new Jl({cause:t,gas:e==null?void 0:e.gas}):Xl.nodeMessage.test(n)?new Xl({cause:t,gas:e==null?void 0:e.gas}):Ql.nodeMessage.test(n)?new Ql({cause:t}):Ca.nodeMessage.test(n)?new Ca({cause:t,maxFeePerGas:e==null?void 0:e.maxFeePerGas,maxPriorityFeePerGas:e==null?void 0:e.maxPriorityFeePerGas}):new gc({cause:t})}function Qm(t,{docsPath:e,...n}){const r=(()=>{const o=cd(t,n);return o instanceof gc?t:o})();return new Xm(r,{docsPath:e,...n})}function ld(t,{format:e}){if(!e)return{};const n={};function r(i){const s=Object.keys(i);for(const a of s)a in t&&(n[a]=t[a]),i[a]&&typeof i[a]=="object"&&!Array.isArray(i[a])&&r(i[a])}const o=e(t||{});return r(o),n}function Us(t){const{account:e,gasPrice:n,maxFeePerGas:r,maxPriorityFeePerGas:o,to:i}=t,s=e?Kt(e):void 0;if(s&&!ur(s.address))throw new Uo({address:s.address});if(i&&!ur(i))throw new Uo({address:i});if(typeof n<"u"&&(typeof r<"u"||typeof o<"u"))throw new zm;if(r&&r>2n**256n-1n)throw new _a({maxFeePerGas:r});if(o&&r&&o>r)throw new Ca({maxFeePerGas:r,maxPriorityFeePerGas:o})}class ew extends G{constructor(){super("`baseFeeMultiplier` must be greater than 1."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"BaseFeeScalarError"})}}class ud extends G{constructor(){super("Chain does not support EIP-1559 fees."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Eip1559FeesNotSupportedError"})}}class tw extends G{constructor({maxPriorityFeePerGas:e}){super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${Dt(e)} gwei).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"MaxFeePerGasTooLowError"})}}class Ph extends G{constructor({blockHash:e,blockNumber:n}){let r="Block";e&&(r=`Block at hash "${e}"`),n&&(r=`Block at number "${n}"`),super(`${r} could not be found.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"BlockNotFoundError"})}}async function dr(t,{blockHash:e,blockNumber:n,blockTag:r,includeTransactions:o}={}){var u,p,g;const i=r??"latest",s=o??!1,a=n!==void 0?xe(n):void 0;let c=null;if(e?c=await t.request({method:"eth_getBlockByHash",params:[e,s]}):c=await t.request({method:"eth_getBlockByNumber",params:[a||i,s]}),!c)throw new Ph({blockHash:e,blockNumber:n});return(((g=(p=(u=t.chain)==null?void 0:u.formatters)==null?void 0:p.block)==null?void 0:g.format)||hh)(c)}async function dd(t){const e=await t.request({method:"eth_gasPrice"});return BigInt(e)}async function nw(t,e){return Oh(t,e)}async function Oh(t,e){var i,s,a;const{block:n,chain:r=t.chain,request:o}=e||{};if(typeof((i=r==null?void 0:r.fees)==null?void 0:i.defaultPriorityFee)=="function"){const c=n||await he(t,dr,"getBlock")({});return r.fees.defaultPriorityFee({block:c,client:t,request:o})}if(typeof((s=r==null?void 0:r.fees)==null?void 0:s.defaultPriorityFee)<"u")return(a=r==null?void 0:r.fees)==null?void 0:a.defaultPriorityFee;try{const c=await t.request({method:"eth_maxPriorityFeePerGas"});return hc(c)}catch{const[c,l]=await Promise.all([n?Promise.resolve(n):he(t,dr,"getBlock")({}),he(t,dd,"getGasPrice")({})]);if(typeof c.baseFeePerGas!="bigint")throw new ud;const u=l-c.baseFeePerGas;return u<0n?0n:u}}async function rw(t,e){return iu(t,e)}async function iu(t,e){var g,m;const{block:n,chain:r=t.chain,request:o,type:i="eip1559"}=e||{},s=await(async()=>{var w,v;return typeof((w=r==null?void 0:r.fees)==null?void 0:w.baseFeeMultiplier)=="function"?r.fees.baseFeeMultiplier({block:n,client:t,request:o}):((v=r==null?void 0:r.fees)==null?void 0:v.baseFeeMultiplier)??1.2})();if(s<1)throw new ew;const c=10**(((g=s.toString().split(".")[1])==null?void 0:g.length)??0),l=w=>w*BigInt(Math.ceil(s*c))/BigInt(c),u=n||await he(t,dr,"getBlock")({});if(typeof((m=r==null?void 0:r.fees)==null?void 0:m.estimateFeesPerGas)=="function")return r.fees.estimateFeesPerGas({block:n,client:t,multiply:l,request:o,type:i});if(i==="eip1559"){if(typeof u.baseFeePerGas!="bigint")throw new ud;const w=o!=null&&o.maxPriorityFeePerGas?o.maxPriorityFeePerGas:await Oh(t,{block:u,chain:r,request:o}),v=l(u.baseFeePerGas);return{maxFeePerGas:(o==null?void 0:o.maxFeePerGas)??v+w,maxPriorityFeePerGas:w}}return{gasPrice:(o==null?void 0:o.gasPrice)??l(await he(t,dd,"getGasPrice")({}))}}async function Rh(t,{address:e,blockTag:n="latest",blockNumber:r}){const o=await t.request({method:"eth_getTransactionCount",params:[e,r?xe(r):n]});return wt(o)}function iw(t){if(t.type)return t.type;if(typeof t.maxFeePerGas<"u"||typeof t.maxPriorityFeePerGas<"u")return"eip1559";if(typeof t.gasPrice<"u")return typeof t.accessList<"u"?"eip2930":"legacy";throw new Hm({transaction:t})}async function xc(t,e){const{account:n=t.account,chain:r,gas:o,nonce:i,type:s}=e;if(!n)throw new co;const a=Kt(n),c=await he(t,dr,"getBlock")({blockTag:"latest"}),l={...e,from:a.address};if(typeof i>"u"&&(l.nonce=await he(t,Rh,"getTransactionCount")({address:a.address,blockTag:"pending"})),typeof s>"u")try{l.type=iw(l)}catch{l.type=typeof c.baseFeePerGas=="bigint"?"eip1559":"legacy"}if(l.type==="eip1559"){const{maxFeePerGas:u,maxPriorityFeePerGas:p}=await iu(t,{block:c,chain:r,request:l});if(typeof e.maxPriorityFeePerGas>"u"&&e.maxFeePerGas&&e.maxFeePerGas<p)throw new tw({maxPriorityFeePerGas:p});l.maxPriorityFeePerGas=p,l.maxFeePerGas=u}else{if(typeof e.maxFeePerGas<"u"||typeof e.maxPriorityFeePerGas<"u")throw new ud;const{gasPrice:u}=await iu(t,{block:c,chain:r,request:l,type:"legacy"});l.gasPrice=u}return typeof o>"u"&&(l.gas=await he(t,fd,"estimateGas")({...l,account:{address:a.address,type:"json-rpc"}})),Us(l),l}async function fd(t,e){var o,i,s;const n=e.account??t.account;if(!n)throw new co({docsPath:"/docs/actions/public/estimateGas"});const r=Kt(n);try{const{accessList:a,blockNumber:c,blockTag:l,data:u,gas:p,gasPrice:g,maxFeePerGas:m,maxPriorityFeePerGas:w,nonce:v,to:_,value:I,...b}=r.type==="local"?await xc(t,e):e,x=(c?xe(c):void 0)||l;Us(e);const C=(s=(i=(o=t.chain)==null?void 0:o.formatters)==null?void 0:i.transactionRequest)==null?void 0:s.format,f=(C||pc)({...ld(b,{format:C}),from:r.address,accessList:a,data:u,gas:p,gasPrice:g,maxFeePerGas:m,maxPriorityFeePerGas:w,nonce:v,to:_,value:I}),T=await t.request({method:"eth_estimateGas",params:x?[f,x]:[f]});return BigInt(T)}catch(a){throw Qm(a,{...e,account:r,chain:t.chain})}}async function ow(t,{abi:e,address:n,args:r,functionName:o,...i}){const s=xr({abi:e,args:r,functionName:o});try{return await he(t,fd,"estimateGas")({data:s,to:n,...i})}catch(a){const c=i.account?Kt(i.account):void 0;throw Jo(a,{abi:e,address:n,args:r,docsPath:"/docs/contract/estimateContractGas",functionName:o,sender:c==null?void 0:c.address})}}const S0="/docs/contract/decodeEventLog";function Bs({abi:t,data:e,strict:n,topics:r}){const o=n??!0,[i,...s]=r;if(!i)throw new Lg({docsPath:S0});const a=t.find(w=>w.type==="event"&&i===Qu(Wn(w)));if(!(a&&"name"in a)||a.type!=="event")throw new jg(i,{docsPath:S0});const{name:c,inputs:l}=a,u=l==null?void 0:l.some(w=>!("name"in w&&w.name));let p=u?[]:{};const g=l.filter(w=>"indexed"in w&&w.indexed);for(let w=0;w<g.length;w++){const v=g[w],_=s[w];if(!_)throw new so({abiItem:a,param:v});p[v.name||w]=sw({param:v,value:_})}const m=l.filter(w=>!("indexed"in w&&w.indexed));if(m.length>0){if(e&&e!=="0x")try{const w=vc(m,e);if(w)if(u)p=[...p,...w];else for(let v=0;v<m.length;v++)p[m[v].name]=w[v]}catch(w){if(o)throw w instanceof Ju?new Hr({abiItem:a,data:w.data,params:w.params,size:w.size}):w}else if(o)throw new Hr({abiItem:a,data:"0x",params:m,size:0})}return{eventName:c,args:Object.values(p).length>0?p:void 0}}function sw({param:t,value:e}){return t.type==="string"||t.type==="bytes"||t.type==="tuple"||t.type.match(/^(.*)\[(\d+)?\]$/)?e:(vc([t],e)||[])[0]}async function hd(t,{address:e,blockHash:n,fromBlock:r,toBlock:o,event:i,events:s,args:a,strict:c}={}){const l=c??!1,u=s??(i?[i]:void 0);let p=[];u&&(p=[u.flatMap(m=>ks({abi:[m],eventName:m.name,args:a}))],i&&(p=p[0]));let g;return n?g=await t.request({method:"eth_getLogs",params:[{address:e,topics:p,blockHash:n}]}):g=await t.request({method:"eth_getLogs",params:[{address:e,topics:p,fromBlock:typeof r=="bigint"?xe(r):r,toBlock:typeof o=="bigint"?xe(o):o}]}),g.map(m=>{var w;try{const{eventName:v,args:_}=u?Bs({abi:u,data:m.data,topics:m.topics,strict:l}):{eventName:void 0,args:void 0};return on(m,{args:_,eventName:v})}catch(v){let _,I;if(v instanceof Hr||v instanceof so){if(l)return;_=v.abiItem.name,I=(w=v.abiItem.inputs)==null?void 0:w.some(b=>!("name"in b&&b.name))}return on(m,{args:I?[]:{},eventName:_})}}).filter(Boolean)}async function Nh(t,{abi:e,address:n,args:r,blockHash:o,eventName:i,fromBlock:s,toBlock:a,strict:c}){const l=i?Ns({abi:e,name:i}):void 0,u=l?void 0:e.filter(p=>p.type==="event");return he(t,hd,"getLogs")({address:n,args:r,blockHash:o,event:l,events:u,fromBlock:s,toBlock:a,strict:c})}const dl="/docs/contract/decodeFunctionResult";function lo({abi:t,args:e,functionName:n,data:r}){let o=t[0];if(n&&(o=Ns({abi:t,args:e,name:n}),!o))throw new Sa(n,{docsPath:dl});if(o.type!=="function")throw new Sa(void 0,{docsPath:dl});if(!o.outputs)throw new Fg(o.name,{docsPath:dl});const i=vc(o.outputs,r);if(i&&i.length>1)return i;if(i&&i.length===1)return i[0]}const aw="modulepreload",cw=function(t){return"/"+t},A0={},Bi=function(e,n,r){let o=Promise.resolve();if(n&&n.length>0){const i=document.getElementsByTagName("link");o=Promise.all(n.map(s=>{if(s=cw(s),s in A0)return;A0[s]=!0;const a=s.endsWith(".css"),c=a?'[rel="stylesheet"]':"";if(!!r)for(let p=i.length-1;p>=0;p--){const g=i[p];if(g.href===s&&(!a||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${c}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":aw,a||(u.as="script",u.crossOrigin=""),u.href=s,document.head.appendChild(u),a)return new Promise((p,g)=>{u.addEventListener("load",p),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${s}`)))})}))}return o.then(()=>e()).catch(i=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i})},ou=[{inputs:[{components:[{name:"target",type:"address"},{name:"allowFailure",type:"bool"},{name:"callData",type:"bytes"}],name:"calls",type:"tuple[]"}],name:"aggregate3",outputs:[{components:[{name:"success",type:"bool"},{name:"returnData",type:"bytes"}],name:"returnData",type:"tuple[]"}],stateMutability:"view",type:"function"}],kh=[{inputs:[],name:"ResolverNotFound",type:"error"},{inputs:[],name:"ResolverWildcardNotSupported",type:"error"}],Mh=[...kh,{name:"resolve",type:"function",stateMutability:"view",inputs:[{name:"name",type:"bytes"},{name:"data",type:"bytes"}],outputs:[{name:"",type:"bytes"},{name:"address",type:"address"}]}],lw=[...kh,{name:"reverse",type:"function",stateMutability:"view",inputs:[{type:"bytes",name:"reverseName"}],outputs:[{type:"string",name:"resolvedName"},{type:"address",name:"resolvedAddress"},{type:"address",name:"reverseResolver"},{type:"address",name:"resolver"}]}],T0=[{name:"text",type:"function",stateMutability:"view",inputs:[{name:"name",type:"bytes32"},{name:"key",type:"string"}],outputs:[{name:"",type:"string"}]}],I0=[{name:"addr",type:"function",stateMutability:"view",inputs:[{name:"name",type:"bytes32"}],outputs:[{name:"",type:"address"}]},{name:"addr",type:"function",stateMutability:"view",inputs:[{name:"name",type:"bytes32"},{name:"coinType",type:"uint256"}],outputs:[{name:"",type:"bytes"}]}],uw=[{inputs:[{internalType:"address",name:"_signer",type:"address"},{internalType:"bytes32",name:"_hash",type:"bytes32"},{internalType:"bytes",name:"_signature",type:"bytes"}],stateMutability:"nonpayable",type:"constructor"}],dw="0x82ad56cb";function uo({blockNumber:t,chain:e,contract:n}){var o;const r=(o=e==null?void 0:e.contracts)==null?void 0:o[n];if(!r)throw new Vl({chain:e,contract:{name:n}});if(t&&r.blockCreated&&r.blockCreated>t)throw new Vl({blockNumber:t,chain:e,contract:{name:n,blockCreated:r.blockCreated}});return r.address}function fw(t,{docsPath:e,...n}){const r=(()=>{const o=cd(t,n);return o instanceof gc?t:o})();return new Dh(r,{docsPath:e,...n})}const fl=new Map;function pd({fn:t,id:e,shouldSplitBatch:n,wait:r=0,sort:o}){const i=async()=>{const u=c();s();const p=u.map(({args:g})=>g);p.length!==0&&t(p).then(g=>{var m;o&&Array.isArray(g)&&g.sort(o);for(let w=0;w<u.length;w++){const{pendingPromise:v}=u[w];(m=v.resolve)==null||m.call(v,[g[w],g])}}).catch(g=>{var m;for(let w=0;w<u.length;w++){const{pendingPromise:v}=u[w];(m=v.reject)==null||m.call(v,g)}})},s=()=>fl.delete(e),a=()=>c().map(({args:u})=>u),c=()=>fl.get(e)||[],l=u=>fl.set(e,[...c(),u]);return{flush:s,async schedule(u){const p={},g=new Promise((v,_)=>{p.resolve=v,p.reject=_});return(n==null?void 0:n([...a(),u]))&&i(),c().length>0?(l({args:u,pendingPromise:p}),g):(l({args:u,pendingPromise:p}),setTimeout(i,r),g)}}}async function Ec(t,e){var I,b,E,x;const{account:n=t.account,batch:r=!!((I=t.batch)!=null&&I.multicall),blockNumber:o,blockTag:i="latest",accessList:s,data:a,gas:c,gasPrice:l,maxFeePerGas:u,maxPriorityFeePerGas:p,nonce:g,to:m,value:w,...v}=e,_=n?Kt(n):void 0;try{Us(e);const A=(o?xe(o):void 0)||i,f=(x=(E=(b=t.chain)==null?void 0:b.formatters)==null?void 0:E.transactionRequest)==null?void 0:x.format,R=(f||pc)({...ld(v,{format:f}),from:_==null?void 0:_.address,accessList:s,data:a,gas:c,gasPrice:l,maxFeePerGas:u,maxPriorityFeePerGas:p,nonce:g,to:m,value:w});if(r&&hw({request:R}))try{return await pw(t,{...R,blockNumber:o,blockTag:i})}catch(M){if(!(M instanceof ph)&&!(M instanceof Vl))throw M}const k=await t.request({method:"eth_call",params:A?[R,A]:[R]});return k==="0x"?{data:void 0}:{data:k}}catch(C){const A=gw(C),{offchainLookup:f,offchainLookupSignature:T}=await Bi(()=>import("./ccip-QZf-IHea.js"),__vite__mapDeps([]));if((A==null?void 0:A.slice(0,10))===T&&m)return{data:await f(t,{data:A,to:m})};throw fw(C,{...e,account:_,chain:t.chain})}}function hw({request:t}){const{data:e,to:n,...r}=t;return!(!e||e.startsWith(dw)||!n||Object.values(r).filter(o=>typeof o<"u").length>0)}async function pw(t,e){var v;const{batchSize:n=1024,wait:r=0}=typeof((v=t.batch)==null?void 0:v.multicall)=="object"?t.batch.multicall:{},{blockNumber:o,blockTag:i="latest",data:s,multicallAddress:a,to:c}=e;let l=a;if(!l){if(!t.chain)throw new ph;l=uo({blockNumber:o,chain:t.chain,contract:"multicall3"})}const p=(o?xe(o):void 0)||i,{schedule:g}=pd({id:`${t.uid}.${p}`,wait:r,shouldSplitBatch(_){return _.reduce((b,{data:E})=>b+(E.length-2),0)>n*2},fn:async _=>{const I=_.map(x=>({allowFailure:!0,callData:x.data,target:x.to})),b=xr({abi:ou,args:[I],functionName:"aggregate3"}),E=await t.request({method:"eth_call",params:[{data:b,to:l},p]});return lo({abi:ou,args:[I],functionName:"aggregate3",data:E||"0x"})}}),[{returnData:m,success:w}]=await g({data:s,to:c});if(!w)throw new sd({data:m});return m==="0x"?{data:void 0}:{data:m}}function gw(t){if(!(t instanceof G))return;const e=t.walk();return typeof e.data=="object"?e.data.data:e.data}async function fr(t,{abi:e,address:n,args:r,functionName:o,...i}){const s=xr({abi:e,args:r,functionName:o});try{const{data:a}=await he(t,Ec,"call")({data:s,to:n,...i});return lo({abi:e,args:r,functionName:o,data:a||"0x"})}catch(a){throw Jo(a,{abi:e,address:n,args:r,docsPath:"/docs/contract/readContract",functionName:o})}}async function mw(t,{abi:e,address:n,args:r,dataSuffix:o,functionName:i,...s}){const a=s.account?Kt(s.account):void 0,c=xr({abi:e,args:r,functionName:i});try{const{data:l}=await he(t,Ec,"call")({batch:!1,data:`${c}${o?o.replace("0x",""):""}`,to:n,...s});return{result:lo({abi:e,args:r,functionName:i,data:l||"0x"}),request:{abi:e,address:n,args:r,dataSuffix:o,functionName:i,...s}}}catch(l){throw Jo(l,{abi:e,address:n,args:r,docsPath:"/docs/contract/simulateContract",functionName:i,sender:a==null?void 0:a.address})}}const hl=new Map,$0=new Map;let ww=0;function fo(t,e,n){const r=++ww,o=()=>hl.get(t)||[],i=()=>{const u=o();hl.set(t,u.filter(p=>p.id!==r))},s=()=>{const u=$0.get(t);o().length===1&&u&&u(),i()},a=o();if(hl.set(t,[...a,{id:r,fns:e}]),a&&a.length>0)return s;const c={};for(const u in e)c[u]=(...p)=>{var m,w;const g=o();if(g.length!==0)for(const v of g)(w=(m=v.fns)[u])==null||w.call(m,...p)};const l=n(c);return typeof l=="function"&&$0.set(t,l),s}async function Ta(t){return new Promise(e=>setTimeout(e,t))}function Ls(t,{emitOnBegin:e,initialWaitTime:n,interval:r}){let o=!0;const i=()=>o=!1;return(async()=>{let a;e&&(a=await t({unpoll:i}));const c=await(n==null?void 0:n(a))??r;await Ta(c);const l=async()=>{o&&(await t({unpoll:i}),await Ta(r),l())};l()})(),i}const bw=new Map,yw=new Map;function vw(t){const e=(o,i)=>({clear:()=>i.delete(o),get:()=>i.get(o),set:s=>i.set(o,s)}),n=e(t,bw),r=e(t,yw);return{clear:()=>{n.clear(),r.clear()},promise:n,response:r}}async function xw(t,{cacheKey:e,cacheTime:n=1/0}){const r=vw(e),o=r.response.get();if(o&&n>0&&new Date().getTime()-o.created.getTime()<n)return o.data;let i=r.promise.get();i||(i=t(),r.promise.set(i));try{const s=await i;return r.response.set({created:new Date,data:s}),s}finally{r.promise.clear()}}const Ew=t=>`blockNumber.${t}`;async function js(t,{cacheTime:e=t.cacheTime,maxAge:n}={}){const r=await xw(()=>t.request({method:"eth_blockNumber"}),{cacheKey:Ew(t.uid),cacheTime:n??e});return BigInt(r)}async function _c(t,{filter:e}){const n="strict"in e&&e.strict;return(await e.request({method:"eth_getFilterChanges",params:[e.id]})).map(o=>{var i;if(typeof o=="string")return o;try{const{eventName:s,args:a}="abi"in e&&e.abi?Bs({abi:e.abi,data:o.data,topics:o.topics,strict:n}):{eventName:void 0,args:void 0};return on(o,{args:a,eventName:s})}catch(s){let a,c;if(s instanceof Hr||s instanceof so){if("strict"in e&&e.strict)return;a=s.abiItem.name,c=(i=s.abiItem.inputs)==null?void 0:i.some(l=>!("name"in l&&l.name))}return on(o,{args:c?[]:{},eventName:a})}}).filter(Boolean)}async function Cc(t,{filter:e}){return e.request({method:"eth_uninstallFilter",params:[e.id]})}function _w(t,{abi:e,address:n,args:r,batch:o=!0,eventName:i,onError:s,onLogs:a,poll:c,pollingInterval:l=t.pollingInterval,strict:u}){return(typeof c<"u"?c:t.transport.type!=="webSocket")?(()=>{const w=_t(["watchContractEvent",n,r,o,t.uid,i,l]),v=u??!1;return fo(w,{onLogs:a,onError:s},_=>{let I,b,E=!1;const x=Ls(async()=>{var C;if(!E){try{b=await he(t,Sh,"createContractEventFilter")({abi:e,address:n,args:r,eventName:i,strict:v})}catch{}E=!0;return}try{let A;if(b)A=await he(t,_c,"getFilterChanges")({filter:b});else{const f=await he(t,js,"getBlockNumber")({});I&&I!==f?A=await he(t,Nh,"getContractEvents")({abi:e,address:n,args:r,eventName:i,fromBlock:I+1n,toBlock:f,strict:v}):A=[],I=f}if(A.length===0)return;if(o)_.onLogs(A);else for(const f of A)_.onLogs([f])}catch(A){b&&A instanceof Vr&&(E=!1),(C=_.onError)==null||C.call(_,A)}},{emitOnBegin:!0,interval:l});return async()=>{b&&await he(t,Cc,"uninstallFilter")({filter:b}),x()}})})():(()=>{let w=!0,v=()=>w=!1;return(async()=>{try{const _=i?ks({abi:e,eventName:i,args:r}):[],{unsubscribe:I}=await t.transport.subscribe({params:["logs",{address:n,topics:_}],onData(b){var x;if(!w)return;const E=b.result;try{const{eventName:C,args:A}=Bs({abi:e,data:E.data,topics:E.topics,strict:u}),f=on(E,{args:A,eventName:C});a([f])}catch(C){let A,f;if(C instanceof Hr||C instanceof so){if(u)return;A=C.abiItem.name,f=(x=C.abiItem.inputs)==null?void 0:x.some(R=>!("name"in R&&R.name))}const T=on(E,{args:f?[]:{},eventName:A});a([T])}},onError(b){s==null||s(b)}});v=I,w||v()}catch(_){s==null||s(_)}})(),v})()}function Uh({chain:t,currentChainId:e}){if(!t)throw new Ag;if(e!==t.id)throw new Sg({chain:t,currentChainId:e})}function Cw(t,{docsPath:e,...n}){const r=(()=>{const o=cd(t,n);return o instanceof gc?t:o})();return new Vm(r,{docsPath:e,...n})}async function Xo(t){const e=await t.request({method:"eth_chainId"});return wt(e)}async function gd(t,{serializedTransaction:e}){return t.request({method:"eth_sendRawTransaction",params:[e]})}async function md(t,e){var v,_,I,b;const{account:n=t.account,chain:r=t.chain,accessList:o,data:i,gas:s,gasPrice:a,maxFeePerGas:c,maxPriorityFeePerGas:l,nonce:u,to:p,value:g,...m}=e;if(!n)throw new co({docsPath:"/docs/actions/wallet/sendTransaction"});const w=Kt(n);try{Us(e);let E;if(r!==null&&(E=await he(t,Xo,"getChainId")({}),Uh({currentChainId:E,chain:r})),w.type==="local"){const f=await he(t,xc,"prepareTransactionRequest")({account:w,accessList:o,chain:r,data:i,gas:s,gasPrice:a,maxFeePerGas:c,maxPriorityFeePerGas:l,nonce:u,to:p,value:g,...m});E||(E=await he(t,Xo,"getChainId")({}));const T=(v=r==null?void 0:r.serializers)==null?void 0:v.transaction,R=await w.signTransaction({...f,chainId:E},{serializer:T});return await he(t,gd,"sendRawTransaction")({serializedTransaction:R})}const x=(b=(I=(_=t.chain)==null?void 0:_.formatters)==null?void 0:I.transactionRequest)==null?void 0:b.format,A=(x||pc)({...ld(m,{format:x}),accessList:o,data:i,from:w.address,gas:s,gasPrice:a,maxFeePerGas:c,maxPriorityFeePerGas:l,nonce:u,to:p,value:g});return await t.request({method:"eth_sendTransaction",params:[A]})}catch(E){throw Cw(E,{...e,account:w,chain:e.chain||void 0})}}async function Sw(t,{abi:e,address:n,args:r,dataSuffix:o,functionName:i,...s}){const a=xr({abi:e,args:r,functionName:i});return await he(t,md,"sendTransaction")({data:`${a}${o?o.replace("0x",""):""}`,to:n,...s})}async function Aw(t,{chain:e}){const{id:n,name:r,nativeCurrency:o,rpcUrls:i,blockExplorers:s}=e;await t.request({method:"wallet_addEthereumChain",params:[{chainId:xe(n),chainName:r,nativeCurrency:o,rpcUrls:i.default.http,blockExplorerUrls:s?Object.values(s).map(({url:a})=>a):void 0}]})}const su=256;let oa=su,sa;function Tw(t=11){if(!sa||oa+t>su*2){sa="",oa=0;for(let e=0;e<su;e++)sa+=(256+Math.random()*256|0).toString(16).substring(1)}return sa.substring(oa,oa+++t)}function Bh(t){const{batch:e,cacheTime:n=t.pollingInterval??4e3,key:r="base",name:o="Base Client",pollingInterval:i=4e3,type:s="base"}=t,a=t.chain,c=t.account?Kt(t.account):void 0,{config:l,request:u,value:p}=t.transport({chain:a,pollingInterval:i}),g={...l,...p},m={account:c,batch:e,cacheTime:n,chain:a,key:r,name:o,pollingInterval:i,request:u,transport:g,type:s,uid:Tw()};function w(v){return _=>{const I=_(v);for(const E in m)delete I[E];const b={...v,...I};return Object.assign(b,{extend:w(b)})}}return Object.assign(m,{extend:w(m)})}function au(t,{delay:e=100,retryCount:n=2,shouldRetry:r=()=>!0}={}){return new Promise((o,i)=>{const s=async({count:a=0}={})=>{const c=async({error:l})=>{const u=typeof e=="function"?e({count:a,error:l}):e;u&&await Ta(u),s({count:a+1})};try{const l=await t();o(l)}catch(l){if(a<n&&await r({count:a,error:l}))return c({error:l});i(l)}};s()})}const Lh=t=>"code"in t?t.code!==-1&&t.code!==-32004&&t.code!==-32005&&t.code!==-32042&&t.code!==-32603:t instanceof $o&&t.status?t.status!==403&&t.status!==408&&t.status!==413&&t.status!==429&&t.status!==500&&t.status!==502&&t.status!==503&&t.status!==504:!1;function Iw(t,{retryDelay:e=150,retryCount:n=3}={}){return async r=>au(async()=>{try{return await t(r)}catch(o){const i=o;switch(i.code){case Bo.code:throw new Bo(i);case Lo.code:throw new Lo(i);case jo.code:throw new jo(i);case Fo.code:throw new Fo(i);case Mi.code:throw new Mi(i);case Vr.code:throw new Vr(i);case Wo.code:throw new Wo(i);case Ui.code:throw new Ui(i);case zo.code:throw new zo(i);case Ho.code:throw new Ho(i);case Vo.code:throw new Vo(i);case Zo.code:throw new Zo(i);case $t.code:throw new $t(i);case Go.code:throw new Go(i);case qo.code:throw new qo(i);case Ko.code:throw new Ko(i);case Yo.code:throw new Yo(i);case sn.code:throw new sn(i);case 5e3:throw new $t(i);default:throw o instanceof G?o:new Ym(i)}}},{delay:({count:o,error:i})=>{var s;if(i&&i instanceof $o){const a=(s=i==null?void 0:i.headers)==null?void 0:s.get("Retry-After");if(a!=null&&a.match(/\d/))return parseInt(a)*1e3}return~~(1<<o)*e},retryCount:n,shouldRetry:({error:o})=>!Lh(o)})}function Sc({key:t,name:e,request:n,retryCount:r=3,retryDelay:o=150,timeout:i,type:s},a){return{config:{key:t,name:e,request:n,retryCount:r,retryDelay:o,timeout:i,type:s},request:Iw(n,{retryCount:r,retryDelay:o}),value:a}}function Ac(t,e={}){const{key:n="custom",name:r="Custom Provider",retryDelay:o}=e;return({retryCount:i})=>Sc({key:n,name:r,request:t.request.bind(t),retryCount:e.retryCount??i,retryDelay:o,type:"custom"})}function D0(t,e={}){const{key:n="fallback",name:r="Fallback",rank:o=!1,retryCount:i,retryDelay:s}=e;return({chain:a,pollingInterval:c=4e3,timeout:l})=>{let u=t,p=()=>{};const g=Sc({key:n,name:r,async request({method:m,params:w}){const v=async(_=0)=>{const I=u[_]({chain:a,retryCount:0,timeout:l});try{const b=await I.request({method:m,params:w});return p({method:m,params:w,response:b,transport:I,status:"success"}),b}catch(b){if(p({error:b,method:m,params:w,transport:I,status:"error"}),Lh(b)||_===u.length-1)throw b;return v(_+1)}};return v()},retryCount:i,retryDelay:s,type:"fallback"},{onResponse:m=>p=m,transports:u.map(m=>m({chain:a,retryCount:0}))});if(o){const m=typeof o=="object"?o:{};$w({chain:a,interval:m.interval??c,onTransports:w=>u=w,sampleCount:m.sampleCount,timeout:m.timeout,transports:u,weights:m.weights})}return g}}function $w({chain:t,interval:e=4e3,onTransports:n,sampleCount:r=10,timeout:o=1e3,transports:i,weights:s={}}){const{stability:a=.7,latency:c=.3}=s,l=[],u=async()=>{const p=await Promise.all(i.map(async w=>{const v=w({chain:t,retryCount:0,timeout:o}),_=Date.now();let I,b;try{await v.request({method:"net_listening"}),b=1}catch{b=0}finally{I=Date.now()}return{latency:I-_,success:b}}));l.push(p),l.length>r&&l.shift();const g=Math.max(...l.map(w=>Math.max(...w.map(({latency:v})=>v)))),m=i.map((w,v)=>{const _=l.map(C=>C[v].latency),b=1-_.reduce((C,A)=>C+A,0)/_.length/g,E=l.map(C=>C[v].success),x=E.reduce((C,A)=>C+A,0)/E.length;return x===0?[0,v]:[c*b+a*x,v]}).sort((w,v)=>v[0]-w[0]);n(m.map(([,w])=>i[w])),await Ta(e),u()};u()}class jh extends G{constructor(){super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",{docsPath:"/docs/clients/intro"})}}function Dw(){if(typeof WebSocket<"u")return WebSocket;if(typeof global.WebSocket<"u")return global.WebSocket;if(typeof window.WebSocket<"u")return window.WebSocket;if(typeof self.WebSocket<"u")return self.WebSocket;throw new Error("`WebSocket` is not supported in this environment")}const P0=Dw();function Fh(t,{errorInstance:e=new Error("timed out"),timeout:n,signal:r}){return new Promise((o,i)=>{(async()=>{let s;try{const a=new AbortController;n>0&&(s=setTimeout(()=>{r?a.abort():i(e)},n)),o(await t({signal:a==null?void 0:a.signal}))}catch(a){a.name==="AbortError"&&i(e),i(a)}finally{clearTimeout(s)}})()})}let cu=0;async function Pw(t,{body:e,fetchOptions:n={},timeout:r=1e4}){var a;const{headers:o,method:i,signal:s}=n;try{const c=await Fh(async({signal:u})=>await fetch(t,{...n,body:Array.isArray(e)?_t(e.map(g=>({jsonrpc:"2.0",id:g.id??cu++,...g}))):_t({jsonrpc:"2.0",id:e.id??cu++,...e}),headers:{...o,"Content-Type":"application/json"},method:i||"POST",signal:s||(r>0?u:void 0)}),{errorInstance:new ru({body:e,url:t}),timeout:r,signal:!0});let l;if((a=c.headers.get("Content-Type"))!=null&&a.startsWith("application/json")?l=await c.json():l=await c.text(),!c.ok)throw new $o({body:e,details:_t(l.error)||c.statusText,headers:c.headers,status:c.status,url:t});return l}catch(c){throw c instanceof $o||c instanceof ru?c:new $o({body:e,details:c.message,url:t})}}const pl=new Map;async function gl(t){let e=pl.get(t);if(e)return e;const{schedule:n}=pd({id:t,fn:async()=>{const i=new P0(t),s=new Map,a=new Map,c=({data:u})=>{const p=JSON.parse(u),g=p.method==="eth_subscription",m=g?p.params.subscription:p.id,w=g?a:s,v=w.get(m);v&&v({data:u}),g||w.delete(m)},l=()=>{pl.delete(t),i.removeEventListener("close",l),i.removeEventListener("message",c)};return i.addEventListener("close",l),i.addEventListener("message",c),i.readyState===P0.CONNECTING&&await new Promise((u,p)=>{i&&(i.onopen=u,i.onerror=p)}),e=Object.assign(i,{requests:s,subscriptions:a}),pl.set(t,e),[e]}}),[r,[o]]=await n();return o}function Ow(t,{body:e,onResponse:n}){if(t.readyState===t.CLOSED||t.readyState===t.CLOSING)throw new qm({body:e,url:t.url,details:"Socket is closed."});const r=cu++,o=({data:i})=>{var a;const s=JSON.parse(i);typeof s.id=="number"&&r!==s.id||(n==null||n(s),e.method==="eth_subscribe"&&typeof s.result=="string"&&t.subscriptions.set(s.result,o),e.method==="eth_unsubscribe"&&t.subscriptions.delete((a=e.params)==null?void 0:a[0]))};return t.requests.set(r,o),t.send(JSON.stringify({jsonrpc:"2.0",...e,id:r})),t}async function Rw(t,{body:e,timeout:n=1e4}){return Fh(()=>new Promise(r=>Pi.webSocket(t,{body:e,onResponse:r})),{errorInstance:new ru({body:e,url:t.url}),timeout:n})}const Pi={http:Pw,webSocket:Ow,webSocketAsync:Rw};function Nw(t,e={}){const{batch:n,fetchOptions:r,key:o="http",name:i="HTTP JSON-RPC",retryDelay:s}=e;return({chain:a,retryCount:c,timeout:l})=>{const{batchSize:u=1e3,wait:p=0}=typeof n=="object"?n:{},g=e.retryCount??c,m=l??e.timeout??1e4,w=t||(a==null?void 0:a.rpcUrls.default.http[0]);if(!w)throw new jh;return Sc({key:o,name:i,async request({method:v,params:_}){const I={method:v,params:_},{schedule:b}=pd({id:`${t}`,wait:p,shouldSplitBatch(A){return A.length>u},fn:A=>Pi.http(w,{body:A,fetchOptions:r,timeout:m}),sort:(A,f)=>A.id-f.id}),E=async A=>n?b(A):[await Pi.http(w,{body:A,fetchOptions:r,timeout:m})],[{error:x,result:C}]=await E(I);if(x)throw new ad({body:I,error:x,url:w});return C},retryCount:g,retryDelay:s,timeout:m,type:"http"},{fetchOptions:r,url:t})}}function wd(t,e){var r,o,i;if(!(t instanceof G))return!1;const n=t.walk(s=>s instanceof nu);return n instanceof nu?!!(((r=n.data)==null?void 0:r.errorName)==="ResolverNotFound"||((o=n.data)==null?void 0:o.errorName)==="ResolverWildcardNotSupported"||(i=n.reason)!=null&&i.includes("Wildcard on non-extended resolvers is not supported")||e==="reverse"&&n.reason===Ah[50]):!1}function Wh(t){if(t.length!==66||t.indexOf("[")!==0||t.indexOf("]")!==65)return null;const e=`0x${t.slice(1,65)}`;return _n(e)?e:null}function ga(t){let e=new Uint8Array(32).fill(0);if(!t)return Mo(e);const n=t.split(".");for(let r=n.length-1;r>=0;r-=1){const o=Wh(n[r]),i=o?lr(o):xt(Ln(n[r]),"bytes");e=xt(Fn([e,i]),"bytes")}return Mo(e)}function kw(t){return`[${t.slice(2)}]`}function Mw(t){const e=new Uint8Array(32).fill(0);return t?Wh(t)||xt(Ln(t)):Mo(e)}function Tc(t){const e=t.replace(/^\.|\.$/gm,"");if(e.length===0)return new Uint8Array(1);const n=new Uint8Array(Ln(e).byteLength+2);let r=0;const o=e.split(".");for(let i=0;i<o.length;i++){let s=Ln(o[i]);s.byteLength>255&&(s=Ln(kw(Mw(o[i])))),n[r]=s.length,n.set(s,r+1),r+=s.length+1}return n.byteLength!==r+1?n.slice(0,r+1):n}async function Uw(t,{blockNumber:e,blockTag:n,coinType:r,name:o,universalResolverAddress:i}){let s=i;if(!s){if(!t.chain)throw new Error("client chain not configured. universalResolverAddress is required.");s=uo({blockNumber:e,chain:t.chain,contract:"ensUniversalResolver"})}try{const a=xr({abi:I0,functionName:"addr",...r!=null?{args:[ga(o),BigInt(r)]}:{args:[ga(o)]}}),c=await he(t,fr,"readContract")({address:s,abi:Mh,functionName:"resolve",args:[Zn(Tc(o)),a],blockNumber:e,blockTag:n});if(c[0]==="0x")return null;const l=lo({abi:I0,args:r!=null?[ga(o),BigInt(r)]:void 0,functionName:"addr",data:c[0]});return l==="0x"||jr(l)==="0x00"?null:l}catch(a){if(wd(a,"resolve"))return null;throw a}}class Bw extends G{constructor({data:e}){super("Unable to extract image from metadata. The metadata may be malformed or invalid.",{metaMessages:["- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.","",`Provided data: ${JSON.stringify(e)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"EnsAvatarInvalidMetadataError"})}}class vo extends G{constructor({reason:e}){super(`ENS NFT avatar URI is invalid. ${e}`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"EnsAvatarInvalidNftUriError"})}}class bd extends G{constructor({uri:e}){super(`Unable to resolve ENS avatar URI "${e}". The URI may be malformed, invalid, or does not respond with a valid image.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"EnsAvatarUriResolutionError"})}}class Lw extends G{constructor({namespace:e}){super(`ENS NFT avatar namespace "${e}" is not supported. Must be "erc721" or "erc1155".`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"EnsAvatarUnsupportedNamespaceError"})}}const jw=/(?<protocol>https?:\/\/[^\/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/,Fw=/^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/,Ww=/^data:([a-zA-Z\-/+]*);base64,([^"].*)/,zw=/^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;async function Hw(t){try{const e=await fetch(t,{method:"HEAD"});if(e.status===200){const n=e.headers.get("content-type");return n==null?void 0:n.startsWith("image/")}return!1}catch(e){return typeof e=="object"&&typeof e.response<"u"||!globalThis.hasOwnProperty("Image")?!1:new Promise(n=>{const r=new Image;r.onload=()=>{n(!0)},r.onerror=()=>{n(!1)},r.src=t})}}function O0(t,e){return t?t.endsWith("/")?t.slice(0,-1):t:e}function zh({uri:t,gatewayUrls:e}){const n=Ww.test(t);if(n)return{uri:t,isOnChain:!0,isEncoded:n};const r=O0(e==null?void 0:e.ipfs,"https://ipfs.io"),o=O0(e==null?void 0:e.arweave,"https://arweave.net"),i=t.match(jw),{protocol:s,subpath:a,target:c,subtarget:l=""}=(i==null?void 0:i.groups)||{},u=s==="ipns:/"||a==="ipns/",p=s==="ipfs:/"||a==="ipfs/"||Fw.test(t);if(t.startsWith("http")&&!u&&!p){let m=t;return e!=null&&e.arweave&&(m=t.replace(/https:\/\/arweave.net/g,e==null?void 0:e.arweave)),{uri:m,isOnChain:!1,isEncoded:!1}}if((u||p)&&c)return{uri:`${r}/${u?"ipns":"ipfs"}/${c}${l}`,isOnChain:!1,isEncoded:!1};if(s==="ar:/"&&c)return{uri:`${o}/${c}${l||""}`,isOnChain:!1,isEncoded:!1};let g=t.replace(zw,"");if(g.startsWith("<svg")&&(g=`data:image/svg+xml;base64,${btoa(g)}`),g.startsWith("data:")||g.startsWith("{"))return{uri:g,isOnChain:!0,isEncoded:!1};throw new bd({uri:t})}function Hh(t){if(typeof t!="object"||!("image"in t)&&!("image_url"in t)&&!("image_data"in t))throw new Bw({data:t});return t.image||t.image_url||t.image_data}async function Vw({gatewayUrls:t,uri:e}){try{const n=await fetch(e).then(o=>o.json());return await yd({gatewayUrls:t,uri:Hh(n)})}catch{throw new bd({uri:e})}}async function yd({gatewayUrls:t,uri:e}){const{uri:n,isOnChain:r}=zh({uri:e,gatewayUrls:t});if(r||await Hw(n))return n;throw new bd({uri:e})}function Zw(t){let e=t;e.startsWith("did:nft:")&&(e=e.replace("did:nft:","").replace(/_/g,"/"));const[n,r,o]=e.split("/"),[i,s]=n.split(":"),[a,c]=r.split(":");if(!i||i.toLowerCase()!=="eip155")throw new vo({reason:"Only EIP-155 supported"});if(!s)throw new vo({reason:"Chain ID not found"});if(!c)throw new vo({reason:"Contract address not found"});if(!o)throw new vo({reason:"Token ID not found"});if(!a)throw new vo({reason:"ERC namespace not found"});return{chainID:parseInt(s),namespace:a.toLowerCase(),contractAddress:c,tokenID:o}}async function Gw(t,{nft:e}){if(e.namespace==="erc721")return fr(t,{address:e.contractAddress,abi:[{name:"tokenURI",type:"function",stateMutability:"view",inputs:[{name:"tokenId",type:"uint256"}],outputs:[{name:"",type:"string"}]}],functionName:"tokenURI",args:[BigInt(e.tokenID)]});if(e.namespace==="erc1155")return fr(t,{address:e.contractAddress,abi:[{name:"uri",type:"function",stateMutability:"view",inputs:[{name:"_id",type:"uint256"}],outputs:[{name:"",type:"string"}]}],functionName:"uri",args:[BigInt(e.tokenID)]});throw new Lw({namespace:e.namespace})}async function qw(t,{gatewayUrls:e,record:n}){return/eip155:/i.test(n)?Kw(t,{gatewayUrls:e,record:n}):yd({uri:n,gatewayUrls:e})}async function Kw(t,{gatewayUrls:e,record:n}){const r=Zw(n),o=await Gw(t,{nft:r}),{uri:i,isOnChain:s,isEncoded:a}=zh({uri:o,gatewayUrls:e});if(s&&(i.includes("data:application/json;base64,")||i.startsWith("{"))){const l=a?atob(i.replace("data:application/json;base64,","")):i,u=JSON.parse(l);return yd({uri:Hh(u),gatewayUrls:e})}let c=r.tokenID;return r.namespace==="erc1155"&&(c=c.replace("0x","").padStart(64,"0")),Vw({gatewayUrls:e,uri:i.replace(/(?:0x)?{id}/,c)})}async function Vh(t,{blockNumber:e,blockTag:n,name:r,key:o,universalResolverAddress:i}){let s=i;if(!s){if(!t.chain)throw new Error("client chain not configured. universalResolverAddress is required.");s=uo({blockNumber:e,chain:t.chain,contract:"ensUniversalResolver"})}try{const a=await he(t,fr,"readContract")({address:s,abi:Mh,functionName:"resolve",args:[Zn(Tc(r)),xr({abi:T0,functionName:"text",args:[ga(r),o]})],blockNumber:e,blockTag:n});if(a[0]==="0x")return null;const c=lo({abi:T0,functionName:"text",data:a[0]});return c===""?null:c}catch(a){if(wd(a,"resolve"))return null;throw a}}async function Yw(t,{blockNumber:e,blockTag:n,gatewayUrls:r,name:o,universalResolverAddress:i}){const s=await he(t,Vh,"getEnsText")({blockNumber:e,blockTag:n,key:"avatar",name:o,universalResolverAddress:i});if(!s)return null;try{return await qw(t,{record:s,gatewayUrls:r})}catch{return null}}async function Jw(t,{address:e,blockNumber:n,blockTag:r,universalResolverAddress:o}){let i=o;if(!i){if(!t.chain)throw new Error("client chain not configured. universalResolverAddress is required.");i=uo({blockNumber:n,chain:t.chain,contract:"ensUniversalResolver"})}const s=`${e.toLowerCase().substring(2)}.addr.reverse`;try{const[a,c]=await he(t,fr,"readContract")({address:i,abi:lw,functionName:"reverse",args:[Zn(Tc(s))],blockNumber:n,blockTag:r});return e.toLowerCase()!==c.toLowerCase()?null:a}catch(a){if(wd(a,"reverse"))return null;throw a}}async function Xw(t,{blockNumber:e,blockTag:n,name:r,universalResolverAddress:o}){let i=o;if(!i){if(!t.chain)throw new Error("client chain not configured. universalResolverAddress is required.");i=uo({blockNumber:e,chain:t.chain,contract:"ensUniversalResolver"})}const[s]=await he(t,fr,"readContract")({address:i,abi:[{inputs:[{type:"bytes"}],name:"findResolver",outputs:[{type:"address"},{type:"bytes32"}],stateMutability:"view",type:"function"}],functionName:"findResolver",args:[Zn(Tc(r))],blockNumber:e,blockTag:n});return s}async function Qw(t){const e=yc(t,{method:"eth_newBlockFilter"}),n=await t.request({method:"eth_newBlockFilter"});return{id:n,request:e(n),type:"block"}}async function Zh(t,{address:e,args:n,event:r,events:o,fromBlock:i,strict:s,toBlock:a}={}){const c=o??(r?[r]:void 0),l=yc(t,{method:"eth_newFilter"});let u=[];c&&(u=[c.flatMap(g=>ks({abi:[g],eventName:g.name,args:n}))],r&&(u=u[0]));const p=await t.request({method:"eth_newFilter",params:[{address:e,fromBlock:typeof i=="bigint"?xe(i):i,toBlock:typeof a=="bigint"?xe(a):a,...u.length?{topics:u}:{}}]});return{abi:c,args:n,eventName:r?r.name:void 0,fromBlock:i,id:p,request:l(p),strict:s,toBlock:a,type:"event"}}async function Gh(t){const e=yc(t,{method:"eth_newPendingTransactionFilter"}),n=await t.request({method:"eth_newPendingTransactionFilter"});return{id:n,request:e(n),type:"transaction"}}async function e2(t,{address:e,blockNumber:n,blockTag:r="latest"}){const o=n?xe(n):void 0,i=await t.request({method:"eth_getBalance",params:[e,o||r]});return BigInt(i)}async function t2(t,{blockHash:e,blockNumber:n,blockTag:r="latest"}={}){const o=n!==void 0?xe(n):void 0;let i;return e?i=await t.request({method:"eth_getBlockTransactionCountByHash",params:[e]}):i=await t.request({method:"eth_getBlockTransactionCountByNumber",params:[o||r]}),wt(i)}async function n2(t,{address:e,blockNumber:n,blockTag:r="latest"}){const o=n!==void 0?xe(n):void 0,i=await t.request({method:"eth_getCode",params:[e,o||r]});if(i!=="0x")return i}function r2(t){var e;return{baseFeePerGas:t.baseFeePerGas.map(n=>BigInt(n)),gasUsedRatio:t.gasUsedRatio,oldestBlock:BigInt(t.oldestBlock),reward:(e=t.reward)==null?void 0:e.map(n=>n.map(r=>BigInt(r)))}}async function i2(t,{blockCount:e,blockNumber:n,blockTag:r="latest",rewardPercentiles:o}){const i=n?xe(n):void 0,s=await t.request({method:"eth_feeHistory",params:[xe(e),i||r,o]});return r2(s)}async function o2(t,{filter:e}){const n=e.strict??!1;return(await e.request({method:"eth_getFilterLogs",params:[e.id]})).map(o=>{var i;try{const{eventName:s,args:a}="abi"in e&&e.abi?Bs({abi:e.abi,data:o.data,topics:o.topics,strict:n}):{eventName:void 0,args:void 0};return on(o,{args:a,eventName:s})}catch(s){let a,c;if(s instanceof Hr||s instanceof so){if("strict"in e&&e.strict)return;a=s.abiItem.name,c=(i=s.abiItem.inputs)==null?void 0:i.some(l=>!("name"in l&&l.name))}return on(o,{args:c?[]:{},eventName:a})}}).filter(Boolean)}const s2=/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,a2=/^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;function c2({domain:t,message:e,primaryType:n,types:r}){const o=typeof t>"u"?{}:t,i={EIP712Domain:Qh({domain:o}),...r};Xh({domain:o,message:e,primaryType:n,types:i});const s=["0x1901"];return o&&s.push(l2({domain:o,types:i})),n!=="EIP712Domain"&&s.push(qh({data:e,primaryType:n,types:i})),xt(Fn(s))}function l2({domain:t,types:e}){return qh({data:t,primaryType:"EIP712Domain",types:e})}function qh({data:t,primaryType:e,types:n}){const r=Kh({data:t,primaryType:e,types:n});return xt(r)}function Kh({data:t,primaryType:e,types:n}){const r=[{type:"bytes32"}],o=[u2({primaryType:e,types:n})];for(const i of n[e]){const[s,a]=Jh({types:n,name:i.name,type:i.type,value:t[i.name]});r.push(s),o.push(a)}return Rs(r,o)}function u2({primaryType:t,types:e}){const n=Zn(d2({primaryType:t,types:e}));return xt(n)}function d2({primaryType:t,types:e}){let n="";const r=Yh({primaryType:t,types:e});r.delete(t);const o=[t,...Array.from(r).sort()];for(const i of o)n+=`${i}(${e[i].map(({name:s,type:a})=>`${a} ${s}`).join(",")})`;return n}function Yh({primaryType:t,types:e},n=new Set){const r=t.match(/^\w*/u),o=r==null?void 0:r[0];if(n.has(o)||e[o]===void 0)return n;n.add(o);for(const i of e[o])Yh({primaryType:i.type,types:e},n);return n}function Jh({types:t,name:e,type:n,value:r}){if(t[n]!==void 0)return[{type:"bytes32"},xt(Kh({data:r,primaryType:n,types:t}))];if(n==="bytes")return r=`0x${(r.length%2?"0":"")+r.slice(2)}`,[{type:"bytes32"},xt(r)];if(n==="string")return[{type:"bytes32"},xt(Zn(r))];if(n.lastIndexOf("]")===n.length-1){const o=n.slice(0,n.lastIndexOf("[")),i=r.map(s=>Jh({name:e,type:o,types:t,value:s}));return[{type:"bytes32"},xt(Rs(i.map(([s])=>s),i.map(([,s])=>s)))]}return[{type:n},r]}function Xh({domain:t,message:e,primaryType:n,types:r}){const o=r,i=(s,a)=>{for(const c of s){const{name:l,type:u}=c,p=u,g=a[l],m=p.match(a2);if(m&&(typeof g=="number"||typeof g=="bigint")){const[_,I,b]=m;xe(g,{signed:I==="int",size:parseInt(b)/8})}if(p==="address"&&typeof g=="string"&&!ur(g))throw new Uo({address:g});const w=p.match(s2);if(w){const[_,I]=w;if(I&&lt(g)!==parseInt(I))throw new zg({expectedSize:parseInt(I),givenSize:lt(g)})}const v=o[p];v&&i(v,g)}};if(o.EIP712Domain&&t&&i(o.EIP712Domain,t),n!=="EIP712Domain"){const s=o[n];i(s,e)}}function Qh({domain:t}){return[typeof(t==null?void 0:t.name)=="string"&&{name:"name",type:"string"},(t==null?void 0:t.version)&&{name:"version",type:"string"},typeof(t==null?void 0:t.chainId)=="number"&&{name:"chainId",type:"uint256"},(t==null?void 0:t.verifyingContract)&&{name:"verifyingContract",type:"address"},(t==null?void 0:t.salt)&&{name:"salt",type:"bytes32"}].filter(Boolean)}const ml="/docs/contract/encodeDeployData";function ep({abi:t,args:e,bytecode:n}){if(!e||e.length===0)return n;const r=t.find(i=>"type"in i&&i.type==="constructor");if(!r)throw new kg({docsPath:ml});if(!("inputs"in r))throw new w0({docsPath:ml});if(!r.inputs||r.inputs.length===0)throw new w0({docsPath:ml});const o=Rs(r.inputs,e);return Yu([n,o])}const f2=`Ethereum Signed Message:
`;function h2(t,e){const n=typeof t=="string"?Ln(t):t.raw instanceof Uint8Array?t.raw:lr(t.raw),r=Ln(`${f2}${n.length}`);return xt(Fn([r,n]),e)}function p2(t){return t.map(e=>({...e,value:BigInt(e.value)}))}function g2(t){return{...t,balance:t.balance?BigInt(t.balance):void 0,nonce:t.nonce?wt(t.nonce):void 0,storageProof:t.storageProof?p2(t.storageProof):void 0}}async function m2(t,{address:e,blockNumber:n,blockTag:r,storageKeys:o}){const i=r??"latest",s=n!==void 0?xe(n):void 0,a=await t.request({method:"eth_getProof",params:[e,o,s||i]});return g2(a)}async function w2(t,{address:e,blockNumber:n,blockTag:r="latest",slot:o}){const i=n!==void 0?xe(n):void 0;return await t.request({method:"eth_getStorageAt",params:[e,o,i||r]})}async function vd(t,{blockHash:e,blockNumber:n,blockTag:r,hash:o,index:i}){var u,p,g;const s=r||"latest",a=n!==void 0?xe(n):void 0;let c=null;if(o?c=await t.request({method:"eth_getTransactionByHash",params:[o]}):e?c=await t.request({method:"eth_getTransactionByBlockHashAndIndex",params:[e,xe(i)]}):(a||s)&&(c=await t.request({method:"eth_getTransactionByBlockNumberAndIndex",params:[a||s,xe(i)]})),!c)throw new Ih({blockHash:e,blockNumber:n,blockTag:s,hash:o,index:i});return(((g=(p=(u=t.chain)==null?void 0:u.formatters)==null?void 0:p.transaction)==null?void 0:g.format)||fh)(c)}async function b2(t,{hash:e,transactionReceipt:n}){const[r,o]=await Promise.all([he(t,js,"getBlockNumber")({}),e?he(t,vd,"getBlockNumber")({hash:e}):void 0]),i=(n==null?void 0:n.blockNumber)||(o==null?void 0:o.blockNumber);return i?r-i+1n:0n}async function lu(t,{hash:e}){var o,i,s;const n=await t.request({method:"eth_getTransactionReceipt",params:[e]});if(!n)throw new $h({hash:e});return(((s=(i=(o=t.chain)==null?void 0:o.formatters)==null?void 0:i.transactionReceipt)==null?void 0:s.format)||_g)(n)}async function y2(t,e){var v;const{allowFailure:n=!0,batchSize:r,blockNumber:o,blockTag:i,contracts:s,multicallAddress:a}=e,c=r??(typeof((v=t.batch)==null?void 0:v.multicall)=="object"&&t.batch.multicall.batchSize||1024);let l=a;if(!l){if(!t.chain)throw new Error("client chain not configured. multicallAddress is required.");l=uo({blockNumber:o,chain:t.chain,contract:"multicall3"})}const u=[[]];let p=0,g=0;for(let _=0;_<s.length;_++){const{abi:I,address:b,args:E,functionName:x}=s[_];try{const C=xr({abi:I,args:E,functionName:x});g+=(C.length-2)/2,c>0&&g>c&&u[p].length>0&&(p++,g=(C.length-2)/2,u[p]=[]),u[p]=[...u[p],{allowFailure:!0,callData:C,target:b}]}catch(C){const A=Jo(C,{abi:I,address:b,args:E,docsPath:"/docs/contract/multicall",functionName:x});if(!n)throw A;u[p]=[...u[p],{allowFailure:!0,callData:"0x",target:b}]}}const m=await Promise.allSettled(u.map(_=>he(t,fr,"readContract")({abi:ou,address:l,args:[_],blockNumber:o,blockTag:i,functionName:"aggregate3"}))),w=[];for(let _=0;_<m.length;_++){const I=m[_];if(I.status==="rejected"){if(!n)throw I.reason;for(let E=0;E<u[_].length;E++)w.push({status:"failure",error:I.reason,result:void 0});continue}const b=I.value;for(let E=0;E<b.length;E++){const{returnData:x,success:C}=b[E],{callData:A}=u[_][E],{abi:f,address:T,functionName:R,args:k}=s[w.length];try{if(A==="0x")throw new wc;if(!C)throw new sd({data:x});const M=lo({abi:f,args:k,data:x,functionName:R});w.push(n?{result:M,status:"success"}:M)}catch(M){const Y=Jo(M,{abi:f,address:T,args:k,docsPath:"/docs/contract/multicall",functionName:R});if(!n)throw Y;w.push({error:Y,result:void 0,status:"failure"})}}}if(w.length!==s.length)throw new G("multicall results mismatch");return w}const v2="0x60806040523480156200001157600080fd5b50604051620007003803806200070083398101604081905262000034916200056f565b6000620000438484846200004f565b9050806000526001601ff35b600080846001600160a01b0316803b806020016040519081016040528181526000908060200190933c90507f6492649264926492649264926492649264926492649264926492649264926492620000a68462000451565b036200021f57600060608085806020019051810190620000c79190620005ce565b8651929550909350915060000362000192576000836001600160a01b031683604051620000f5919062000643565b6000604051808303816000865af19150503d806000811462000134576040519150601f19603f3d011682016040523d82523d6000602084013e62000139565b606091505b5050905080620001905760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b505b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90620001c4908b90869060040162000661565b602060405180830381865afa158015620001e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200020891906200069d565b6001600160e01b031916149450505050506200044a565b805115620002b157604051630b135d3f60e11b808252906001600160a01b03871690631626ba7e9062000259908890889060040162000661565b602060405180830381865afa15801562000277573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200029d91906200069d565b6001600160e01b031916149150506200044a565b8251604114620003195760405162461bcd60e51b815260206004820152603a6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e677468000000000000606482015260840162000187565b620003236200046b565b506020830151604080850151855186939260009185919081106200034b576200034b620006c9565b016020015160f81c9050601b81148015906200036b57508060ff16601c14155b15620003cf5760405162461bcd60e51b815260206004820152603b6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c75650000000000606482015260840162000187565b6040805160008152602081018083528a905260ff83169181019190915260608101849052608081018390526001600160a01b038a169060019060a0016020604051602081039080840390855afa1580156200042e573d6000803e3d6000fd5b505050602060405103516001600160a01b031614955050505050505b9392505050565b60006020825110156200046357600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b03811681146200049f57600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620004d5578181015183820152602001620004bb565b50506000910152565b600082601f830112620004f057600080fd5b81516001600160401b03808211156200050d576200050d620004a2565b604051601f8301601f19908116603f01168101908282118183101715620005385762000538620004a2565b816040528381528660208588010111156200055257600080fd5b62000565846020830160208901620004b8565b9695505050505050565b6000806000606084860312156200058557600080fd5b8351620005928162000489565b6020850151604086015191945092506001600160401b03811115620005b657600080fd5b620005c486828701620004de565b9150509250925092565b600080600060608486031215620005e457600080fd5b8351620005f18162000489565b60208501519093506001600160401b03808211156200060f57600080fd5b6200061d87838801620004de565b935060408601519150808211156200063457600080fd5b50620005c486828701620004de565b6000825162000657818460208701620004b8565b9190910192915050565b828152604060208201526000825180604084015262000688816060850160208701620004b8565b601f01601f1916919091016060019392505050565b600060208284031215620006b057600080fd5b81516001600160e01b0319811681146200044a57600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */BigInt(0);BigInt(1);BigInt(2);function x2(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}function E2(t,e){const n=_n(t)?lr(t):t,r=_n(e)?lr(e):e;return x2(n,r)}async function tp(t,{address:e,hash:n,signature:r,...o}){const i=_n(r)?r:Zn(r);try{const{data:s}=await he(t,Ec,"call")({data:ep({abi:uw,args:[e,n,i],bytecode:v2}),...o});return E2(s??"0x0","0x1")}catch(s){if(s instanceof Dh)return!1;throw s}}async function _2(t,{address:e,message:n,signature:r,...o}){const i=h2(n);return tp(t,{address:e,hash:i,signature:r,...o})}async function C2(t,{address:e,signature:n,message:r,primaryType:o,types:i,domain:s,...a}){const c=c2({message:r,primaryType:o,types:i,domain:s});return tp(t,{address:e,hash:c,signature:n,...a})}function np(t,{emitOnBegin:e=!1,emitMissed:n=!1,onBlockNumber:r,onError:o,poll:i,pollingInterval:s=t.pollingInterval}){const a=typeof i<"u"?i:t.transport.type!=="webSocket";let c;return a?(()=>{const p=_t(["watchBlockNumber",t.uid,e,n,s]);return fo(p,{onBlockNumber:r,onError:o},g=>Ls(async()=>{var m;try{const w=await he(t,js,"getBlockNumber")({cacheTime:0});if(c){if(w===c)return;if(w-c>1&&n)for(let v=c+1n;v<w;v++)g.onBlockNumber(v,c),c=v}(!c||w>c)&&(g.onBlockNumber(w,c),c=w)}catch(w){(m=g.onError)==null||m.call(g,w)}},{emitOnBegin:e,interval:s}))})():(()=>{let p=!0,g=()=>p=!1;return(async()=>{try{const{unsubscribe:m}=await t.transport.subscribe({params:["newHeads"],onData(w){var _;if(!p)return;const v=hc((_=w.result)==null?void 0:_.number);r(v,c),c=v},onError(w){o==null||o(w)}});g=m,p||g()}catch(m){o==null||o(m)}})(),g})()}async function S2(t,{confirmations:e=1,hash:n,onReplaced:r,pollingInterval:o=t.pollingInterval,timeout:i}){const s=_t(["waitForTransactionReceipt",t.uid,n]);let a,c,l,u=!1;return new Promise((p,g)=>{i&&setTimeout(()=>g(new Zm({hash:n})),i);const m=fo(s,{onReplaced:r,resolve:p,reject:g},w=>{const v=he(t,np,"watchBlockNumber")({emitMissed:!0,emitOnBegin:!0,poll:!0,pollingInterval:o,async onBlockNumber(_){if(u)return;let I=_;const b=E=>{v(),E(),m()};try{if(l){if(e>1&&(!l.blockNumber||I-l.blockNumber+1n<e))return;b(()=>w.resolve(l));return}if(a||(u=!0,await au(async()=>{a=await he(t,vd,"getTransaction")({hash:n}),a.blockNumber&&(I=a.blockNumber)},{delay:({count:E})=>~~(1<<E)*200,retryCount:6}),u=!1),l=await he(t,lu,"getTransactionReceipt")({hash:n}),e>1&&(!l.blockNumber||I-l.blockNumber+1n<e))return;b(()=>w.resolve(l))}catch(E){if(a&&(E instanceof Ih||E instanceof $h))try{c=a,u=!0;const x=await au(()=>he(t,dr,"getBlock")({blockNumber:I,includeTransactions:!0}),{delay:({count:f})=>~~(1<<f)*200,retryCount:6,shouldRetry:({error:f})=>f instanceof Ph});u=!1;const C=x.transactions.find(({from:f,nonce:T})=>f===c.from&&T===c.nonce);if(!C||(l=await he(t,lu,"getTransactionReceipt")({hash:C.hash}),e>1&&(!l.blockNumber||I-l.blockNumber+1n<e)))return;let A="replaced";C.to===c.to&&C.value===c.value?A="repriced":C.from===C.to&&C.value===0n&&(A="cancelled"),b(()=>{var f;(f=w.onReplaced)==null||f.call(w,{reason:A,replacedTransaction:c,transaction:C,transactionReceipt:l}),w.resolve(l)})}catch(x){b(()=>w.reject(x))}else b(()=>w.reject(E))}}})})})}function A2(t,{blockTag:e="latest",emitMissed:n=!1,emitOnBegin:r=!1,onBlock:o,onError:i,includeTransactions:s,poll:a,pollingInterval:c=t.pollingInterval}){const l=typeof a<"u"?a:t.transport.type!=="webSocket",u=s??!1;let p;return l?(()=>{const w=_t(["watchBlocks",t.uid,n,r,u,c]);return fo(w,{onBlock:o,onError:i},v=>Ls(async()=>{var _;try{const I=await he(t,dr,"getBlock")({blockTag:e,includeTransactions:u});if(I.number&&(p!=null&&p.number)){if(I.number===p.number)return;if(I.number-p.number>1&&n)for(let b=(p==null?void 0:p.number)+1n;b<I.number;b++){const E=await he(t,dr,"getBlock")({blockNumber:b,includeTransactions:u});v.onBlock(E,p),p=E}}(!(p!=null&&p.number)||e==="pending"&&!(I!=null&&I.number)||I.number&&I.number>p.number)&&(v.onBlock(I,p),p=I)}catch(I){(_=v.onError)==null||_.call(v,I)}},{emitOnBegin:r,interval:c}))})():(()=>{let w=!0,v=()=>w=!1;return(async()=>{try{const{unsubscribe:_}=await t.transport.subscribe({params:["newHeads"],onData(I){var x,C,A;if(!w)return;const E=(((A=(C=(x=t.chain)==null?void 0:x.formatters)==null?void 0:C.block)==null?void 0:A.format)||hh)(I.result);o(E,p),p=E},onError(I){i==null||i(I)}});v=_,w||v()}catch(_){i==null||i(_)}})(),v})()}function T2(t,{address:e,args:n,batch:r=!0,event:o,events:i,onError:s,onLogs:a,poll:c,pollingInterval:l=t.pollingInterval,strict:u}){const p=typeof c<"u"?c:t.transport.type!=="webSocket",g=u??!1;return p?(()=>{const v=_t(["watchEvent",e,n,r,t.uid,o,l]);return fo(v,{onLogs:a,onError:s},_=>{let I,b,E=!1;const x=Ls(async()=>{var C;if(!E){try{b=await he(t,Zh,"createEventFilter")({address:e,args:n,event:o,events:i,strict:g})}catch{}E=!0;return}try{let A;if(b)A=await he(t,_c,"getFilterChanges")({filter:b});else{const f=await he(t,js,"getBlockNumber")({});I&&I!==f?A=await he(t,hd,"getLogs")({address:e,args:n,event:o,events:i,fromBlock:I+1n,toBlock:f}):A=[],I=f}if(A.length===0)return;if(r)_.onLogs(A);else for(const f of A)_.onLogs([f])}catch(A){b&&A instanceof Vr&&(E=!1),(C=_.onError)==null||C.call(_,A)}},{emitOnBegin:!0,interval:l});return async()=>{b&&await he(t,Cc,"uninstallFilter")({filter:b}),x()}})})():(()=>{let v=!0,_=()=>v=!1;return(async()=>{try{const I=i??(o?[o]:void 0);let b=[];I&&(b=[I.flatMap(x=>ks({abi:[x],eventName:x.name,args:n}))],o&&(b=b[0]));const{unsubscribe:E}=await t.transport.subscribe({params:["logs",{address:e,topics:b}],onData(x){var A;if(!v)return;const C=x.result;try{const{eventName:f,args:T}=Bs({abi:I,data:C.data,topics:C.topics,strict:g}),R=on(C,{args:T,eventName:f});a([R])}catch(f){let T,R;if(f instanceof Hr||f instanceof so){if(u)return;T=f.abiItem.name,R=(A=f.abiItem.inputs)==null?void 0:A.some(M=>!("name"in M&&M.name))}const k=on(C,{args:R?[]:{},eventName:T});a([k])}},onError(x){s==null||s(x)}});_=E,v||_()}catch(I){s==null||s(I)}})(),_})()}function I2(t,{batch:e=!0,onError:n,onTransactions:r,poll:o,pollingInterval:i=t.pollingInterval}){return(typeof o<"u"?o:t.transport.type!=="webSocket")?(()=>{const l=_t(["watchPendingTransactions",t.uid,e,i]);return fo(l,{onTransactions:r,onError:n},u=>{let p;const g=Ls(async()=>{var m;try{if(!p)try{p=await he(t,Gh,"createPendingTransactionFilter")({});return}catch(v){throw g(),v}const w=await he(t,_c,"getFilterChanges")({filter:p});if(w.length===0)return;if(e)u.onTransactions(w);else for(const v of w)u.onTransactions([v])}catch(w){(m=u.onError)==null||m.call(u,w)}},{emitOnBegin:!0,interval:i});return async()=>{p&&await he(t,Cc,"uninstallFilter")({filter:p}),g()}})})():(()=>{let l=!0,u=()=>l=!1;return(async()=>{try{const{unsubscribe:p}=await t.transport.subscribe({params:["newPendingTransactions"],onData(g){if(!l)return;const m=g.result;r([m])},onError(g){n==null||n(g)}});u=p,l||u()}catch(p){n==null||n(p)}})(),u})()}function $2(t){return{call:e=>Ec(t,e),createBlockFilter:()=>Qw(t),createContractEventFilter:e=>Sh(t,e),createEventFilter:e=>Zh(t,e),createPendingTransactionFilter:()=>Gh(t),estimateContractGas:e=>ow(t,e),estimateGas:e=>fd(t,e),getBalance:e=>e2(t,e),getBlock:e=>dr(t,e),getBlockNumber:e=>js(t,e),getBlockTransactionCount:e=>t2(t,e),getBytecode:e=>n2(t,e),getChainId:()=>Xo(t),getContractEvents:e=>Nh(t,e),getEnsAddress:e=>Uw(t,e),getEnsAvatar:e=>Yw(t,e),getEnsName:e=>Jw(t,e),getEnsResolver:e=>Xw(t,e),getEnsText:e=>Vh(t,e),getFeeHistory:e=>i2(t,e),estimateFeesPerGas:e=>rw(t,e),getFilterChanges:e=>_c(t,e),getFilterLogs:e=>o2(t,e),getGasPrice:()=>dd(t),getLogs:e=>hd(t,e),getProof:e=>m2(t,e),estimateMaxPriorityFeePerGas:e=>nw(t,e),getStorageAt:e=>w2(t,e),getTransaction:e=>vd(t,e),getTransactionConfirmations:e=>b2(t,e),getTransactionCount:e=>Rh(t,e),getTransactionReceipt:e=>lu(t,e),multicall:e=>y2(t,e),prepareTransactionRequest:e=>xc(t,e),readContract:e=>fr(t,e),sendRawTransaction:e=>gd(t,e),simulateContract:e=>mw(t,e),verifyMessage:e=>_2(t,e),verifyTypedData:e=>C2(t,e),uninstallFilter:e=>Cc(t,e),waitForTransactionReceipt:e=>S2(t,e),watchBlocks:e=>A2(t,e),watchBlockNumber:e=>np(t,e),watchContractEvent:e=>_w(t,e),watchEvent:e=>T2(t,e),watchPendingTransactions:e=>I2(t,e)}}function R0(t){const{key:e="public",name:n="Public Client"}=t;return Bh({...t,key:e,name:n,type:"publicClient"}).extend($2)}function D2(t,{abi:e,args:n,bytecode:r,...o}){const i=ep({abi:e,args:n,bytecode:r});return md(t,{...o,data:i})}async function P2(t){var n;return((n=t.account)==null?void 0:n.type)==="local"?[t.account.address]:(await t.request({method:"eth_accounts"})).map(r=>rd(r))}async function O2(t){return await t.request({method:"wallet_getPermissions"})}async function R2(t){return(await t.request({method:"eth_requestAccounts"})).map(n=>Vt(n))}async function N2(t,e){return t.request({method:"wallet_requestPermissions",params:[e]})}async function k2(t,{account:e=t.account,message:n}){if(!e)throw new co({docsPath:"/docs/actions/wallet/signMessage"});const r=Kt(e);if(r.type==="local")return r.signMessage({message:n});const o=typeof n=="string"?qu(n):n.raw instanceof Uint8Array?Zn(n.raw):n.raw;return t.request({method:"personal_sign",params:[o,r.address]})}async function M2(t,e){var l,u,p,g;const{account:n=t.account,chain:r=t.chain,...o}=e;if(!n)throw new co({docsPath:"/docs/actions/wallet/signTransaction"});const i=Kt(n);Us({account:i,...e});const s=await he(t,Xo,"getChainId")({});r!==null&&Uh({currentChainId:s,chain:r});const a=(r==null?void 0:r.formatters)||((l=t.chain)==null?void 0:l.formatters),c=((u=a==null?void 0:a.transactionRequest)==null?void 0:u.format)||pc;return i.type==="local"?i.signTransaction({...o,chainId:s},{serializer:(g=(p=t.chain)==null?void 0:p.serializers)==null?void 0:g.transaction}):await t.request({method:"eth_signTransaction",params:[{...c(o),chainId:xe(s),from:i.address}]})}async function U2(t,{account:e=t.account,domain:n,message:r,primaryType:o,types:i}){if(!e)throw new co({docsPath:"/docs/actions/wallet/signTypedData"});const s=Kt(e),a={EIP712Domain:Qh({domain:n}),...i};if(Xh({domain:n,message:r,primaryType:o,types:a}),s.type==="local")return s.signTypedData({domain:n,primaryType:o,types:a,message:r});const c=_t({domain:n??{},primaryType:o,types:a,message:r},(l,u)=>_n(u)?u.toLowerCase():u);return t.request({method:"eth_signTypedData_v4",params:[s.address,c]})}async function B2(t,{id:e}){await t.request({method:"wallet_switchEthereumChain",params:[{chainId:xe(e)}]})}async function L2(t,e){return await t.request({method:"wallet_watchAsset",params:e})}function j2(t){return{addChain:e=>Aw(t,e),deployContract:e=>D2(t,e),getAddresses:()=>P2(t),getChainId:()=>Xo(t),getPermissions:()=>O2(t),prepareTransactionRequest:e=>xc(t,e),requestAddresses:()=>R2(t),requestPermissions:e=>N2(t,e),sendRawTransaction:e=>gd(t,e),sendTransaction:e=>md(t,e),signMessage:e=>k2(t,e),signTransaction:e=>M2(t,e),signTypedData:e=>U2(t,e),switchChain:e=>B2(t,e),watchAsset:e=>L2(t,e),writeContract:e=>Sw(t,e)}}function Ic(t){const{key:e="wallet",name:n="Wallet Client",transport:r}=t;return Bh({...t,key:e,name:n,transport:i=>r({...i,retryCount:0}),type:"walletClient"}).extend(j2)}function F2(t,e={}){const{key:n="webSocket",name:r="WebSocket JSON-RPC",retryDelay:o}=e;return({chain:i,retryCount:s,timeout:a})=>{var p;const c=e.retryCount??s,l=a??e.timeout??1e4,u=t||((p=i==null?void 0:i.rpcUrls.default.webSocket)==null?void 0:p[0]);if(!u)throw new jh;return Sc({key:n,name:r,async request({method:g,params:m}){const w={method:g,params:m},v=await gl(u),{error:_,result:I}=await Pi.webSocketAsync(v,{body:w,timeout:l});if(_)throw new ad({body:w,error:_,url:u});return I},retryCount:c,retryDelay:o,timeout:l,type:"webSocket"},{getSocket(){return gl(u)},async subscribe({params:g,onData:m,onError:w}){const v=await gl(u),{result:_}=await new Promise((I,b)=>Pi.webSocket(v,{body:{method:"eth_subscribe",params:g},onResponse(E){if(E.error){b(E.error),w==null||w(E.error);return}if(typeof E.id=="number"){I(E);return}E.method==="eth_subscription"&&m(E.params)}}));return{subscriptionId:_,async unsubscribe(){return new Promise(I=>Pi.webSocket(v,{body:{method:"eth_unsubscribe",params:[_]},onResponse:I}))}}}})}}const W2=Gu({id:5,network:"goerli",name:"Goerli",nativeCurrency:{name:"Goerli Ether",symbol:"ETH",decimals:18},rpcUrls:{alchemy:{http:["https://eth-goerli.g.alchemy.com/v2"],webSocket:["wss://eth-goerli.g.alchemy.com/v2"]},infura:{http:["https://goerli.infura.io/v3"],webSocket:["wss://goerli.infura.io/ws/v3"]},default:{http:["https://rpc.ankr.com/eth_goerli"]},public:{http:["https://rpc.ankr.com/eth_goerli"]}},blockExplorers:{etherscan:{name:"Etherscan",url:"https://goerli.etherscan.io"},default:{name:"Etherscan",url:"https://goerli.etherscan.io"}},contracts:{ensRegistry:{address:"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"},ensUniversalResolver:{address:"0x56522D00C410a43BFfDF00a9A569489297385790",blockCreated:8765204},multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:6507670}},testnet:!0}),rp=Gu({id:1,network:"homestead",name:"Ethereum",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{alchemy:{http:["https://eth-mainnet.g.alchemy.com/v2"],webSocket:["wss://eth-mainnet.g.alchemy.com/v2"]},infura:{http:["https://mainnet.infura.io/v3"],webSocket:["wss://mainnet.infura.io/ws/v3"]},default:{http:["https://cloudflare-eth.com"]},public:{http:["https://cloudflare-eth.com"]}},blockExplorers:{etherscan:{name:"Etherscan",url:"https://etherscan.io"},default:{name:"Etherscan",url:"https://etherscan.io"}},contracts:{ensRegistry:{address:"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"},ensUniversalResolver:{address:"0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62",blockCreated:16966585},multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:14353601}}}),Ia=Gu({id:19,name:"Songbird Mainnet",network:"songbird-mainnet",nativeCurrency:{decimals:18,name:"songbird",symbol:"SGB"},rpcUrls:{default:{http:["https://songbird-api.flare.network/ext/C/rpc"]},public:{http:["https://songbird-api.flare.network/ext/C/rpc"]}},blockExplorers:{default:{name:"Songbird Explorer",url:"https://songbird-explorer.flare.network"}}});var ip=class extends Error{constructor({chainId:t,connectorId:e}){super(`Chain "${t}" not configured for connector "${e}".`),this.name="ChainNotConfiguredForConnectorError"}},xn=class extends Error{constructor(){super(...arguments),this.name="ConnectorNotFoundError",this.message="Connector not found"}};function $a(t){return typeof t=="string"?Number.parseInt(t,t.trim().substring(0,2)==="0x"?16:10):typeof t=="bigint"?Number(t):t}var xd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $c(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function op(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var n=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(r){var o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return t[r]}})}),n}var sp={exports:{}};(function(t){var e=Object.prototype.hasOwnProperty,n="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(n=!1));function o(c,l,u){this.fn=c,this.context=l,this.once=u||!1}function i(c,l,u,p,g){if(typeof u!="function")throw new TypeError("The listener must be a function");var m=new o(u,p||c,g),w=n?n+l:l;return c._events[w]?c._events[w].fn?c._events[w]=[c._events[w],m]:c._events[w].push(m):(c._events[w]=m,c._eventsCount++),c}function s(c,l){--c._eventsCount===0?c._events=new r:delete c._events[l]}function a(){this._events=new r,this._eventsCount=0}a.prototype.eventNames=function(){var l=[],u,p;if(this._eventsCount===0)return l;for(p in u=this._events)e.call(u,p)&&l.push(n?p.slice(1):p);return Object.getOwnPropertySymbols?l.concat(Object.getOwnPropertySymbols(u)):l},a.prototype.listeners=function(l){var u=n?n+l:l,p=this._events[u];if(!p)return[];if(p.fn)return[p.fn];for(var g=0,m=p.length,w=new Array(m);g<m;g++)w[g]=p[g].fn;return w},a.prototype.listenerCount=function(l){var u=n?n+l:l,p=this._events[u];return p?p.fn?1:p.length:0},a.prototype.emit=function(l,u,p,g,m,w){var v=n?n+l:l;if(!this._events[v])return!1;var _=this._events[v],I=arguments.length,b,E;if(_.fn){switch(_.once&&this.removeListener(l,_.fn,void 0,!0),I){case 1:return _.fn.call(_.context),!0;case 2:return _.fn.call(_.context,u),!0;case 3:return _.fn.call(_.context,u,p),!0;case 4:return _.fn.call(_.context,u,p,g),!0;case 5:return _.fn.call(_.context,u,p,g,m),!0;case 6:return _.fn.call(_.context,u,p,g,m,w),!0}for(E=1,b=new Array(I-1);E<I;E++)b[E-1]=arguments[E];_.fn.apply(_.context,b)}else{var x=_.length,C;for(E=0;E<x;E++)switch(_[E].once&&this.removeListener(l,_[E].fn,void 0,!0),I){case 1:_[E].fn.call(_[E].context);break;case 2:_[E].fn.call(_[E].context,u);break;case 3:_[E].fn.call(_[E].context,u,p);break;case 4:_[E].fn.call(_[E].context,u,p,g);break;default:if(!b)for(C=1,b=new Array(I-1);C<I;C++)b[C-1]=arguments[C];_[E].fn.apply(_[E].context,b)}}return!0},a.prototype.on=function(l,u,p){return i(this,l,u,p,!1)},a.prototype.once=function(l,u,p){return i(this,l,u,p,!0)},a.prototype.removeListener=function(l,u,p,g){var m=n?n+l:l;if(!this._events[m])return this;if(!u)return s(this,m),this;var w=this._events[m];if(w.fn)w.fn===u&&(!g||w.once)&&(!p||w.context===p)&&s(this,m);else{for(var v=0,_=[],I=w.length;v<I;v++)(w[v].fn!==u||g&&!w[v].once||p&&w[v].context!==p)&&_.push(w[v]);_.length?this._events[m]=_.length===1?_[0]:_:s(this,m)}return this},a.prototype.removeAllListeners=function(l){var u;return l?(u=n?n+l:l,this._events[u]&&s(this,u)):(this._events=new r,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=n,a.EventEmitter=a,t.exports=a})(sp);var z2=sp.exports;const H2=$c(z2);var Ed=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)},Le=(t,e,n)=>(Ed(t,e,"read from private field"),n?n.call(t):e.get(t)),Tt=(t,e,n)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,n)},Qo=(t,e,n,r)=>(Ed(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),ht=(t,e,n)=>(Ed(t,e,"access private method"),n),Dc=class extends H2{constructor({chains:t=[rp,W2],options:e}){super(),this.chains=t,this.options=e}getBlockExplorerUrls(t){const{default:e,...n}=t.blockExplorers??{};if(e)return[e.url,...Object.values(n).map(r=>r.url)]}isChainUnsupported(t){return!this.chains.some(e=>e.id===t)}setStorage(t){this.storage=t}};function V2(t){var n;if(!t)return"Injected";const e=r=>{if(r.isApexWallet)return"Apex Wallet";if(r.isAvalanche)return"Core Wallet";if(r.isBackpack)return"Backpack";if(r.isBifrost)return"Bifrost Wallet";if(r.isBitKeep)return"BitKeep";if(r.isBitski)return"Bitski";if(r.isBlockWallet)return"BlockWallet";if(r.isBraveWallet)return"Brave Wallet";if(r.isCoin98)return"Coin98 Wallet";if(r.isCoinbaseWallet)return"Coinbase Wallet";if(r.isDawn)return"Dawn Wallet";if(r.isDefiant)return"Defiant";if(r.isDesig)return"Desig Wallet";if(r.isEnkrypt)return"Enkrypt";if(r.isExodus)return"Exodus";if(r.isFordefi)return"Fordefi";if(r.isFrame)return"Frame";if(r.isFrontier)return"Frontier Wallet";if(r.isGamestop)return"GameStop Wallet";if(r.isHaqqWallet)return"HAQQ Wallet";if(r.isHyperPay)return"HyperPay Wallet";if(r.isImToken)return"ImToken";if(r.isHaloWallet)return"Halo Wallet";if(r.isKuCoinWallet)return"KuCoin Wallet";if(r.isMathWallet)return"MathWallet";if(r.isNovaWallet)return"Nova Wallet";if(r.isOkxWallet||r.isOKExWallet)return"OKX Wallet";if(r.isOktoWallet)return"Okto Wallet";if(r.isOneInchIOSWallet||r.isOneInchAndroidWallet)return"1inch Wallet";if(r.isOneKey)return"OneKey Wallet";if(r.isOpera)return"Opera";if(r.isPhantom)return"Phantom";if(r.isPortal)return"Ripio Portal";if(r.isRabby)return"Rabby Wallet";if(r.isRainbow)return"Rainbow";if(r.isSafePal)return"SafePal Wallet";if(r.isStatus)return"Status";if(r.isSubWallet)return"SubWallet";if(r.isTalisman)return"Talisman";if(r.isTally)return"Taho";if(r.isTokenPocket)return"TokenPocket";if(r.isTokenary)return"Tokenary";if(r.isTrust||r.isTrustWallet)return"Trust Wallet";if(r.isTTWallet)return"TTWallet";if(r.isXDEFI)return"XDEFI Wallet";if(r.isZeal)return"Zeal";if(r.isZerion)return"Zerion";if(r.isMetaMask)return"MetaMask"};if((n=t.providers)!=null&&n.length){const r=new Set;let o=1;for(const s of t.providers){let a=e(s);a||(a=`Unknown Wallet #${o}`,o+=1),r.add(a)}const i=[...r];return i.length?i:i[0]??"Injected"}return e(t)??"Injected"}var ma,_d=class extends Dc{constructor({chains:t,options:e}={}){const n={shimDisconnect:!0,getProvider(){if(typeof window>"u")return;const o=window.ethereum;return o!=null&&o.providers&&o.providers.length>0?o.providers[0]:o},...e};super({chains:t,options:n}),this.id="injected",Tt(this,ma,void 0),this.shimDisconnectKey=`${this.id}.shimDisconnect`,this.onAccountsChanged=o=>{o.length===0?this.emit("disconnect"):this.emit("change",{account:Vt(o[0])})},this.onChainChanged=o=>{const i=$a(o),s=this.isChainUnsupported(i);this.emit("change",{chain:{id:i,unsupported:s}})},this.onDisconnect=async o=>{var i;o.code===1013&&await this.getProvider()&&await this.getAccount()||(this.emit("disconnect"),this.options.shimDisconnect&&((i=this.storage)==null||i.removeItem(this.shimDisconnectKey)))};const r=n.getProvider();if(typeof n.name=="string")this.name=n.name;else if(r){const o=V2(r);n.name?this.name=n.name(o):typeof o=="string"?this.name=o:this.name=o[0]}else this.name="Injected";this.ready=!!r}async connect({chainId:t}={}){var e;try{const n=await this.getProvider();if(!n)throw new xn;n.on&&(n.on("accountsChanged",this.onAccountsChanged),n.on("chainChanged",this.onChainChanged),n.on("disconnect",this.onDisconnect)),this.emit("message",{type:"connecting"});const r=await n.request({method:"eth_requestAccounts"}),o=Vt(r[0]);let i=await this.getChainId(),s=this.isChainUnsupported(i);return t&&i!==t&&(i=(await this.switchChain(t)).id,s=this.isChainUnsupported(i)),this.options.shimDisconnect&&((e=this.storage)==null||e.setItem(this.shimDisconnectKey,!0)),{account:o,chain:{id:i,unsupported:s}}}catch(n){throw this.isUserRejectedRequestError(n)?new $t(n):n.code===-32002?new Ui(n):n}}async disconnect(){var e;const t=await this.getProvider();t!=null&&t.removeListener&&(t.removeListener("accountsChanged",this.onAccountsChanged),t.removeListener("chainChanged",this.onChainChanged),t.removeListener("disconnect",this.onDisconnect),this.options.shimDisconnect&&((e=this.storage)==null||e.removeItem(this.shimDisconnectKey)))}async getAccount(){const t=await this.getProvider();if(!t)throw new xn;const e=await t.request({method:"eth_accounts"});return Vt(e[0])}async getChainId(){const t=await this.getProvider();if(!t)throw new xn;return t.request({method:"eth_chainId"}).then($a)}async getProvider(){const t=this.options.getProvider();return t&&Qo(this,ma,t),Le(this,ma)}async getWalletClient({chainId:t}={}){const[e,n]=await Promise.all([this.getProvider(),this.getAccount()]),r=this.chains.find(o=>o.id===t);if(!e)throw new Error("provider is required.");return Ic({account:n,chain:r,transport:Ac(e)})}async isAuthorized(){var t;try{if(this.options.shimDisconnect&&!((t=this.storage)!=null&&t.getItem(this.shimDisconnectKey)))return!1;if(!await this.getProvider())throw new xn;return!!await this.getAccount()}catch{return!1}}async switchChain(t){var r,o,i;const e=await this.getProvider();if(!e)throw new xn;const n=xe(t);try{return await Promise.all([e.request({method:"wallet_switchEthereumChain",params:[{chainId:n}]}),new Promise(s=>this.on("change",({chain:a})=>{(a==null?void 0:a.id)===t&&s()}))]),this.chains.find(s=>s.id===t)??{id:t,name:`Chain ${n}`,network:`${n}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpcUrls:{default:{http:[""]},public:{http:[""]}}}}catch(s){const a=this.chains.find(c=>c.id===t);if(!a)throw new ip({chainId:t,connectorId:this.id});if(s.code===4902||((o=(r=s==null?void 0:s.data)==null?void 0:r.originalError)==null?void 0:o.code)===4902)try{if(await e.request({method:"wallet_addEthereumChain",params:[{chainId:n,chainName:a.name,nativeCurrency:a.nativeCurrency,rpcUrls:[((i=a.rpcUrls.public)==null?void 0:i.http[0])??""],blockExplorerUrls:this.getBlockExplorerUrls(a)}]}),await this.getChainId()!==t)throw new $t(new Error("User rejected switch after adding network."));return a}catch(c){throw new $t(c)}throw this.isUserRejectedRequestError(s)?new $t(s):new sn(s)}}async watchAsset({address:t,decimals:e=18,image:n,symbol:r}){const o=await this.getProvider();if(!o)throw new xn;return o.request({method:"wallet_watchAsset",params:{type:"ERC20",options:{address:t,decimals:e,image:n,symbol:r}}})}isUserRejectedRequestError(t){return t.code===4001}};ma=new WeakMap;var Cd=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)},wl=(t,e,n)=>(Cd(t,e,"read from private field"),n?n.call(t):e.get(t)),bl=(t,e,n)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,n)},aa=(t,e,n,r)=>(Cd(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),Z2=(t,e,n)=>(Cd(t,e,"access private method"),n),G2={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const q2=t=>(e,n,r)=>{const o=r.subscribe;return r.subscribe=(s,a,c)=>{let l=s;if(a){const u=(c==null?void 0:c.equalityFn)||Object.is;let p=s(r.getState());l=g=>{const m=s(g);if(!u(p,m)){const w=p;a(p=m,w)}},c!=null&&c.fireImmediately&&a(p,p)}return o(l)},t(e,n,r)},K2=q2;function Y2(t,e){let n;try{n=t()}catch{return}return{getItem:o=>{var i;const s=c=>c===null?null:JSON.parse(c,e==null?void 0:e.reviver),a=(i=n.getItem(o))!=null?i:null;return a instanceof Promise?a.then(s):s(a)},setItem:(o,i)=>n.setItem(o,JSON.stringify(i,e==null?void 0:e.replacer)),removeItem:o=>n.removeItem(o)}}const es=t=>e=>{try{const n=t(e);return n instanceof Promise?n:{then(r){return es(r)(n)},catch(r){return this}}}catch(n){return{then(r){return this},catch(r){return es(r)(n)}}}},J2=(t,e)=>(n,r,o)=>{let i={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:_=>_,version:0,merge:(_,I)=>({...I,..._}),...e},s=!1;const a=new Set,c=new Set;let l;try{l=i.getStorage()}catch{}if(!l)return t((..._)=>{console.warn(`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`),n(..._)},r,o);const u=es(i.serialize),p=()=>{const _=i.partialize({...r()});let I;const b=u({state:_,version:i.version}).then(E=>l.setItem(i.name,E)).catch(E=>{I=E});if(I)throw I;return b},g=o.setState;o.setState=(_,I)=>{g(_,I),p()};const m=t((..._)=>{n(..._),p()},r,o);let w;const v=()=>{var _;if(!l)return;s=!1,a.forEach(b=>b(r()));const I=((_=i.onRehydrateStorage)==null?void 0:_.call(i,r()))||void 0;return es(l.getItem.bind(l))(i.name).then(b=>{if(b)return i.deserialize(b)}).then(b=>{if(b)if(typeof b.version=="number"&&b.version!==i.version){if(i.migrate)return i.migrate(b.state,b.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return b.state}).then(b=>{var E;return w=i.merge(b,(E=r())!=null?E:m),n(w,!0),p()}).then(()=>{I==null||I(w,void 0),s=!0,c.forEach(b=>b(w))}).catch(b=>{I==null||I(void 0,b)})};return o.persist={setOptions:_=>{i={...i,..._},_.getStorage&&(l=_.getStorage())},clearStorage:()=>{l==null||l.removeItem(i.name)},getOptions:()=>i,rehydrate:()=>v(),hasHydrated:()=>s,onHydrate:_=>(a.add(_),()=>{a.delete(_)}),onFinishHydration:_=>(c.add(_),()=>{c.delete(_)})},v(),w||m},X2=(t,e)=>(n,r,o)=>{let i={storage:Y2(()=>localStorage),partialize:v=>v,version:0,merge:(v,_)=>({..._,...v}),...e},s=!1;const a=new Set,c=new Set;let l=i.storage;if(!l)return t((...v)=>{console.warn(`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`),n(...v)},r,o);const u=()=>{const v=i.partialize({...r()});return l.setItem(i.name,{state:v,version:i.version})},p=o.setState;o.setState=(v,_)=>{p(v,_),u()};const g=t((...v)=>{n(...v),u()},r,o);o.getInitialState=()=>g;let m;const w=()=>{var v,_;if(!l)return;s=!1,a.forEach(b=>{var E;return b((E=r())!=null?E:g)});const I=((_=i.onRehydrateStorage)==null?void 0:_.call(i,(v=r())!=null?v:g))||void 0;return es(l.getItem.bind(l))(i.name).then(b=>{if(b)if(typeof b.version=="number"&&b.version!==i.version){if(i.migrate)return i.migrate(b.state,b.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return b.state}).then(b=>{var E;return m=i.merge(b,(E=r())!=null?E:g),n(m,!0),u()}).then(()=>{I==null||I(m,void 0),m=r(),s=!0,c.forEach(b=>b(m))}).catch(b=>{I==null||I(void 0,b)})};return o.persist={setOptions:v=>{i={...i,...v},v.storage&&(l=v.storage)},clearStorage:()=>{l==null||l.removeItem(i.name)},getOptions:()=>i,rehydrate:()=>w(),hasHydrated:()=>s,onHydrate:v=>(a.add(v),()=>{a.delete(v)}),onFinishHydration:v=>(c.add(v),()=>{c.delete(v)})},i.skipHydration||w(),m||g},Q2=(t,e)=>"getStorage"in e||"serialize"in e||"deserialize"in e?((G2?"production":void 0)!=="production"&&console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."),J2(t,e)):X2(t,e),eb=Q2;var tb={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const N0=t=>{let e;const n=new Set,r=(u,p)=>{const g=typeof u=="function"?u(e):u;if(!Object.is(g,e)){const m=e;e=p??(typeof g!="object"||g===null)?g:Object.assign({},e,g),n.forEach(w=>w(e,m))}},o=()=>e,c={setState:r,getState:o,getInitialState:()=>l,subscribe:u=>(n.add(u),()=>n.delete(u)),destroy:()=>{(tb?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},l=e=t(r,o,c);return c},nb=t=>t?N0(t):N0;function ap(t,e){if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(const[r,o]of t)if(!Object.is(o,e.get(r)))return!1;return!0}if(t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(const r of t)if(!e.has(r))return!1;return!0}const n=Object.keys(t);if(n.length!==Object.keys(e).length)return!1;for(let r=0;r<n.length;r++)if(!Object.prototype.hasOwnProperty.call(e,n[r])||!Object.is(t[n[r]],e[n[r]]))return!1;return!0}function cp(t,e,{batch:n={multicall:{wait:32}},pollingInterval:r=4e3,rank:o,retryCount:i,retryDelay:s,stallTimeout:a}={}){if(!t.length)throw new Error("must have at least one chain");let c=[];const l={},u={};for(const p of t){let g=!1;for(const m of e){const w=m(p);w&&(g=!0,c.some(({id:v})=>v===p.id)||(c=[...c,w.chain]),l[p.id]=[...l[p.id]||[],...w.rpcUrls.http],w.rpcUrls.webSocket&&(u[p.id]=[...u[p.id]||[],...w.rpcUrls.webSocket]))}if(!g)throw new Error([`Could not find valid provider configuration for chain "${p.name}".
`,"You may need to add `jsonRpcProvider` to `configureChains` with the chain's RPC URLs.","Read more: https://wagmi.sh/core/providers/jsonRpc"].join(`
`))}return{chains:c,publicClient:({chainId:p})=>{const g=c.find(v=>v.id===p)??t[0],m=l[g.id];if(!m||!m[0])throw new Error(`No providers configured for chain "${g.id}"`);const w=R0({batch:n,chain:g,transport:D0(m.map(v=>Nw(v,{timeout:a})),{rank:o,retryCount:i,retryDelay:s}),pollingInterval:r});return Object.assign(w,{chains:c})},webSocketPublicClient:({chainId:p})=>{const g=c.find(v=>v.id===p)??t[0],m=u[g.id];if(!m||!m[0])return;const w=R0({batch:n,chain:g,transport:D0(m.map(v=>F2(v,{timeout:a})),{rank:o,retryCount:i,retryDelay:s}),pollingInterval:r});return Object.assign(w,{chains:c})}}}var rb=class extends Error{constructor({activeChain:t,targetChain:e}){super(`Chain mismatch: Expected "${e}", received "${t}".`),this.name="ChainMismatchError"}},ib=class extends Error{constructor({chainId:t,connectorId:e}){super(`Chain "${t}" not configured${e?` for connector "${e}"`:""}.`),this.name="ChainNotConfigured"}},ob=class extends Error{constructor(){super(...arguments),this.name="ConnectorAlreadyConnectedError",this.message="Connector already connected"}},sb=class extends Error{constructor(){super(...arguments),this.name="ConfigChainsNotFound",this.message="No chains were found on the wagmi config. Some functions that require a chain may not work."}},ab=class extends Error{constructor({connector:t}){super(`"${t.name}" does not support programmatic chain switching.`),this.name="SwitchChainNotSupportedError"}},uu=(t,{find:e,replace:n})=>t&&e(t)?n(t):typeof t!="object"?t:Array.isArray(t)?t.map(r=>uu(r,{find:e,replace:n})):t instanceof Object?Object.entries(t).reduce((r,[o,i])=>({...r,[o]:uu(i,{find:e,replace:n})}),{}):t;function cb(t){const e=JSON.parse(t);return uu(e,{find:r=>typeof r=="string"&&r.startsWith("#bigint."),replace:r=>BigInt(r.replace("#bigint.",""))})}function lb(t){return{accessList:t.accessList,account:t.account,blockNumber:t.blockNumber,blockTag:t.blockTag,data:t.data,gas:t.gas,gasPrice:t.gasPrice,maxFeePerGas:t.maxFeePerGas,maxPriorityFeePerGas:t.maxPriorityFeePerGas,nonce:t.nonce,to:t.to,value:t.value}}function k0(t){return typeof t=="number"?t:t==="wei"?0:Math.abs($g[t])}function M0(t,e){return t.slice(0,e).join(".")||"."}function U0(t,e){const{length:n}=t;for(let r=0;r<n;++r)if(t[r]===e)return r+1;return 0}function ub(t,e){const n=typeof t=="function",r=typeof e=="function",o=[],i=[];return function(a,c){if(typeof c=="object")if(o.length){const l=U0(o,this);l===0?o[o.length]=this:(o.splice(l),i.splice(l)),i[i.length]=a;const u=U0(o,c);if(u!==0)return r?e.call(this,a,c,M0(i,u)):`[ref=${M0(i,u)}]`}else o[0]=c,i[0]=a;return n?t.call(this,a,c):c}}function db(t,e,n,r){return JSON.stringify(t,ub((o,i)=>{const s=typeof i=="bigint"?`#bigint.${i.toString()}`:i;return(e==null?void 0:e(o,s))||s},r),n??void 0)}var fb={getItem:t=>"",setItem:(t,e)=>null,removeItem:t=>null};function hb({deserialize:t=cb,key:e="wagmi",serialize:n=db,storage:r}){return{...r,getItem:(o,i=null)=>{const s=r.getItem(`${e}.${o}`);try{return s?t(s):i}catch(a){return console.warn(a),i}},setItem:(o,i)=>{if(i===null)r.removeItem(`${e}.${o}`);else try{r.setItem(`${e}.${o}`,n(i))}catch(s){console.error(s)}},removeItem:o=>r.removeItem(`${e}.${o}`)}}var B0="store",Ci,So,du,lp,pb=class{constructor({autoConnect:t=!1,connectors:e=[new _d],publicClient:n,storage:r=hb({storage:typeof window<"u"?window.localStorage:fb}),logger:o={warn:console.warn},webSocketPublicClient:i}){var l,u;bl(this,du),this.publicClients=new Map,this.webSocketPublicClients=new Map,bl(this,Ci,void 0),bl(this,So,void 0),this.args={autoConnect:t,connectors:e,logger:o,publicClient:n,storage:r,webSocketPublicClient:i};let s="disconnected",a;if(t)try{const p=r.getItem(B0),g=(l=p==null?void 0:p.state)==null?void 0:l.data;s=g!=null&&g.account?"reconnecting":"connecting",a=(u=g==null?void 0:g.chain)==null?void 0:u.id}catch{}const c=typeof e=="function"?e():e;c.forEach(p=>p.setStorage(r)),this.store=nb(K2(eb(()=>({connectors:c,publicClient:this.getPublicClient({chainId:a}),status:s,webSocketPublicClient:this.getWebSocketPublicClient({chainId:a})}),{name:B0,storage:r,partialize:p=>{var g,m;return{...t&&{data:{account:(g=p==null?void 0:p.data)==null?void 0:g.account,chain:(m=p==null?void 0:p.data)==null?void 0:m.chain}},chains:p==null?void 0:p.chains}},version:2}))),this.storage=r,aa(this,So,r==null?void 0:r.getItem("wallet")),Z2(this,du,lp).call(this),t&&typeof window<"u"&&setTimeout(async()=>await this.autoConnect(),0)}get chains(){return this.store.getState().chains}get connectors(){return this.store.getState().connectors}get connector(){return this.store.getState().connector}get data(){return this.store.getState().data}get error(){return this.store.getState().error}get lastUsedChainId(){var t,e;return(e=(t=this.data)==null?void 0:t.chain)==null?void 0:e.id}get publicClient(){return this.store.getState().publicClient}get status(){return this.store.getState().status}get subscribe(){return this.store.subscribe}get webSocketPublicClient(){return this.store.getState().webSocketPublicClient}setState(t){const e=typeof t=="function"?t(this.store.getState()):t;this.store.setState(e,!0)}clearState(){this.setState(t=>({...t,chains:void 0,connector:void 0,data:void 0,error:void 0,status:"disconnected"}))}async destroy(){var t,e;this.connector&&await((e=(t=this.connector).disconnect)==null?void 0:e.call(t)),aa(this,Ci,!1),this.clearState(),this.store.destroy()}async autoConnect(){if(wl(this,Ci))return;aa(this,Ci,!0),this.setState(n=>{var r;return{...n,status:(r=n.data)!=null&&r.account?"reconnecting":"connecting"}});const t=wl(this,So)?[...this.connectors].sort(n=>n.id===wl(this,So)?-1:1):this.connectors;let e=!1;for(const n of t){if(!n.ready||!n.isAuthorized||!await n.isAuthorized())continue;const o=await n.connect();this.setState(i=>({...i,connector:n,chains:n==null?void 0:n.chains,data:o,status:"connected"})),e=!0;break}return e||this.setState(n=>({...n,data:void 0,status:"disconnected"})),aa(this,Ci,!1),this.data}setConnectors(t){this.args={...this.args,connectors:t};const e=typeof t=="function"?t():t;e.forEach(n=>n.setStorage(this.args.storage)),this.setState(n=>({...n,connectors:e}))}getPublicClient({chainId:t}={}){let e=this.publicClients.get(-1);if(e&&(e==null?void 0:e.chain.id)===t||(e=this.publicClients.get(t??-1),e))return e;const{publicClient:n}=this.args;return e=typeof n=="function"?n({chainId:t}):n,this.publicClients.set(t??-1,e),e}setPublicClient(t){var n,r;const e=(r=(n=this.data)==null?void 0:n.chain)==null?void 0:r.id;this.args={...this.args,publicClient:t},this.publicClients.clear(),this.setState(o=>({...o,publicClient:this.getPublicClient({chainId:e})}))}getWebSocketPublicClient({chainId:t}={}){let e=this.webSocketPublicClients.get(-1);if(e&&(e==null?void 0:e.chain.id)===t||(e=this.webSocketPublicClients.get(t??-1),e))return e;const{webSocketPublicClient:n}=this.args;return e=typeof n=="function"?n({chainId:t}):n,e&&this.webSocketPublicClients.set(t??-1,e),e}setWebSocketPublicClient(t){var n,r;const e=(r=(n=this.data)==null?void 0:n.chain)==null?void 0:r.id;this.args={...this.args,webSocketPublicClient:t},this.webSocketPublicClients.clear(),this.setState(o=>({...o,webSocketPublicClient:this.getWebSocketPublicClient({chainId:e})}))}setLastUsedConnector(t=null){var e;(e=this.storage)==null||e.setItem("wallet",t)}};Ci=new WeakMap;So=new WeakMap;du=new WeakSet;lp=function(){const t=a=>{this.setState(c=>({...c,data:{...c.data,...a}}))},e=()=>{this.clearState()},n=a=>{this.setState(c=>({...c,error:a}))};this.store.subscribe(({connector:a})=>a,(a,c)=>{var l,u,p,g,m,w;(l=c==null?void 0:c.off)==null||l.call(c,"change",t),(u=c==null?void 0:c.off)==null||u.call(c,"disconnect",e),(p=c==null?void 0:c.off)==null||p.call(c,"error",n),a&&((g=a.on)==null||g.call(a,"change",t),(m=a.on)==null||m.call(a,"disconnect",e),(w=a.on)==null||w.call(a,"error",n))});const{publicClient:r,webSocketPublicClient:o}=this.args;(typeof r=="function"||typeof o=="function")&&this.store.subscribe(({data:a})=>{var c;return(c=a==null?void 0:a.chain)==null?void 0:c.id},a=>{this.setState(c=>({...c,publicClient:this.getPublicClient({chainId:a}),webSocketPublicClient:this.getWebSocketPublicClient({chainId:a})}))})};var fu;function gb(t){const e=new pb(t);return fu=e,e}function Pn(){if(!fu)throw new Error("No wagmi config found. Ensure you have set up a config: https://wagmi.sh/react/config");return fu}async function L0({chainId:t,connector:e}){const n=Pn(),r=n.connector;if(r&&e.id===r.id)throw new ob;try{n.setState(i=>({...i,status:"connecting"}));const o=await e.connect({chainId:t});return n.setLastUsedConnector(e.id),n.setState(i=>({...i,connector:e,chains:e==null?void 0:e.chains,data:o,status:"connected"})),n.storage.setItem("connected",!0),{...o,connector:e}}catch(o){throw n.setState(i=>({...i,status:i.connector?"connected":"disconnected"})),o}}async function up(){const t=Pn();t.connector&&await t.connector.disconnect(),t.clearState(),t.storage.removeItem("connected")}var mb=[{type:"event",name:"Approval",inputs:[{indexed:!0,name:"owner",type:"address"},{indexed:!0,name:"spender",type:"address"},{indexed:!1,name:"value",type:"uint256"}]},{type:"event",name:"Transfer",inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}]},{type:"function",name:"allowance",stateMutability:"view",inputs:[{name:"owner",type:"address"},{name:"spender",type:"address"}],outputs:[{name:"",type:"uint256"}]},{type:"function",name:"approve",stateMutability:"nonpayable",inputs:[{name:"spender",type:"address"},{name:"amount",type:"uint256"}],outputs:[{name:"",type:"bool"}]},{type:"function",name:"balanceOf",stateMutability:"view",inputs:[{name:"account",type:"address"}],outputs:[{name:"",type:"uint256"}]},{type:"function",name:"decimals",stateMutability:"view",inputs:[],outputs:[{name:"",type:"uint8"}]},{type:"function",name:"name",stateMutability:"view",inputs:[],outputs:[{name:"",type:"string"}]},{type:"function",name:"symbol",stateMutability:"view",inputs:[],outputs:[{name:"",type:"string"}]},{type:"function",name:"totalSupply",stateMutability:"view",inputs:[],outputs:[{name:"",type:"uint256"}]},{type:"function",name:"transfer",stateMutability:"nonpayable",inputs:[{name:"recipient",type:"address"},{name:"amount",type:"uint256"}],outputs:[{name:"",type:"bool"}]},{type:"function",name:"transferFrom",stateMutability:"nonpayable",inputs:[{name:"sender",type:"address"},{name:"recipient",type:"address"},{name:"amount",type:"uint256"}],outputs:[{name:"",type:"bool"}]}],wb=[{type:"event",name:"Approval",inputs:[{indexed:!0,name:"owner",type:"address"},{indexed:!0,name:"spender",type:"address"},{indexed:!1,name:"value",type:"uint256"}]},{type:"event",name:"Transfer",inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}]},{type:"function",name:"allowance",stateMutability:"view",inputs:[{name:"owner",type:"address"},{name:"spender",type:"address"}],outputs:[{name:"",type:"uint256"}]},{type:"function",name:"approve",stateMutability:"nonpayable",inputs:[{name:"spender",type:"address"},{name:"amount",type:"uint256"}],outputs:[{name:"",type:"bool"}]},{type:"function",name:"balanceOf",stateMutability:"view",inputs:[{name:"account",type:"address"}],outputs:[{name:"",type:"uint256"}]},{type:"function",name:"decimals",stateMutability:"view",inputs:[],outputs:[{name:"",type:"uint8"}]},{type:"function",name:"name",stateMutability:"view",inputs:[],outputs:[{name:"",type:"bytes32"}]},{type:"function",name:"symbol",stateMutability:"view",inputs:[],outputs:[{name:"",type:"bytes32"}]},{type:"function",name:"totalSupply",stateMutability:"view",inputs:[],outputs:[{name:"",type:"uint256"}]},{type:"function",name:"transfer",stateMutability:"nonpayable",inputs:[{name:"recipient",type:"address"},{name:"amount",type:"uint256"}],outputs:[{name:"",type:"bool"}]},{type:"function",name:"transferFrom",stateMutability:"nonpayable",inputs:[{name:"sender",type:"address"},{name:"recipient",type:"address"},{name:"amount",type:"uint256"}],outputs:[{name:"",type:"bool"}]}];function fi({chainId:t}={}){const e=Pn();return t&&e.getPublicClient({chainId:t})||e.publicClient}async function Sd({chainId:t}={}){var r,o;return await((o=(r=Pn().connector)==null?void 0:r.getWalletClient)==null?void 0:o.call(r,{chainId:t}))||null}async function bb({abi:t,address:e,args:n,chainId:r,dataSuffix:o,functionName:i,walletClient:s,...a}){const c=fi({chainId:r}),l=s??await Sd({chainId:r});if(!l)throw new xn;r&&fp({chainId:r});const{account:u,accessList:p,blockNumber:g,blockTag:m,gas:w,gasPrice:v,maxFeePerGas:_,maxPriorityFeePerGas:I,nonce:b,value:E}=lb(a),{result:x,request:C}=await c.simulateContract({abi:t,address:e,functionName:i,args:n,account:u||l.account,accessList:p,blockNumber:g,blockTag:m,dataSuffix:o,gas:w,gasPrice:v,maxFeePerGas:_,maxPriorityFeePerGas:I,nonce:b,value:E}),A=t.filter(f=>"name"in f&&f.name===i);return{mode:"prepared",request:{...C,abi:A,chainId:r},result:x}}async function yb({chainId:t,contracts:e,blockNumber:n,blockTag:r,...o}){const i=fi({chainId:t});if(!i.chains)throw new sb;if(t&&i.chain.id!==t)throw new ib({chainId:t});return i.multicall({allowFailure:o.allowFailure??!0,blockNumber:n,blockTag:r,contracts:e})}async function vb({address:t,account:e,chainId:n,abi:r,args:o,functionName:i,blockNumber:s,blockTag:a}){return fi({chainId:n}).readContract({abi:r,address:t,account:e,functionName:i,args:o,blockNumber:s,blockTag:a})}async function xb({contracts:t,blockNumber:e,blockTag:n,...r}){const{allowFailure:o=!0}=r;try{const i=fi(),s=t.reduce((u,p,g)=>{const m=p.chainId??i.chain.id;return{...u,[m]:[...u[m]||[],{contract:p,index:g}]}},{}),a=()=>Object.entries(s).map(([u,p])=>yb({allowFailure:o,chainId:parseInt(u),contracts:p.map(({contract:g})=>g),blockNumber:e,blockTag:n})),c=(await Promise.all(a())).flat(),l=Object.values(s).flatMap(u=>u.map(({index:p})=>p));return c.reduce((u,p,g)=>(u&&(u[l[g]]=p),u),[])}catch(i){if(i instanceof od)throw i;const s=()=>t.map(a=>vb({...a,blockNumber:e,blockTag:n}));return o?(await Promise.allSettled(s())).map(a=>a.status==="fulfilled"?{result:a.value,status:"success"}:{error:a.reason,result:void 0,status:"failure"}):await Promise.all(s())}}async function Eb(t){const e=await Sd({chainId:t.chainId});if(!e)throw new xn;t.chainId&&fp({chainId:t.chainId});let n;if(t.mode==="prepared")n=t.request;else{const{chainId:o,mode:i,...s}=t;n=(await bb(s)).request}return{hash:await e.writeContract({...n,chain:t.chainId?{id:t.chainId}:null})}}async function _b({address:t,chainId:e,formatUnits:n,token:r}){const o=Pn(),i=fi({chainId:e});if(r){const l=async({abi:u})=>{const p={abi:u,address:r,chainId:e},[g,m,w]=await xb({allowFailure:!1,contracts:[{...p,functionName:"balanceOf",args:[t]},{...p,functionName:"decimals"},{...p,functionName:"symbol"}]});return{decimals:m,formatted:Ea(g??"0",k0(n??m)),symbol:w,value:g}};try{return await l({abi:mb})}catch(u){if(u instanceof od){const{symbol:p,...g}=await l({abi:wb});return{symbol:uh(jr(p,{dir:"right"})),...g}}throw u}}const s=[...o.publicClient.chains||[],...o.chains??[]],a=await i.getBalance({address:t}),c=s.find(l=>l.id===i.chain.id);return{decimals:(c==null?void 0:c.nativeCurrency.decimals)??18,formatted:Ea(a??"0",k0(n??18)),symbol:(c==null?void 0:c.nativeCurrency.symbol)??"ETH",value:a}}function Da(){const{data:t,connector:e,status:n}=Pn();switch(n){case"connected":return{address:t==null?void 0:t.account,connector:e,isConnected:!0,isConnecting:!1,isDisconnected:!1,isReconnecting:!1,status:n};case"reconnecting":return{address:t==null?void 0:t.account,connector:e,isConnected:!!(t!=null&&t.account),isConnecting:!1,isDisconnected:!1,isReconnecting:!0,status:n};case"connecting":return{address:t==null?void 0:t.account,connector:e,isConnected:!1,isConnecting:!0,isDisconnected:!1,isReconnecting:!1,status:n};case"disconnected":return{address:void 0,connector:void 0,isConnected:!1,isConnecting:!1,isDisconnected:!0,isReconnecting:!1,status:n}}}function ts(){var o,i,s,a;const t=Pn(),e=(i=(o=t.data)==null?void 0:o.chain)==null?void 0:i.id,n=t.chains??[],r=[...((s=t.publicClient)==null?void 0:s.chains)||[],...n].find(c=>c.id===e)??{id:e,name:`Chain ${e}`,network:`${e}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpcUrls:{default:{http:[""]},public:{http:[""]}}};return{chain:e?{...r,...(a=t.data)==null?void 0:a.chain,id:e}:void 0,chains:n}}async function Cb(t){const e=await Sd();if(!e)throw new xn;return await e.signMessage({message:t.message})}async function Ad({chainId:t}){const{connector:e}=Pn();if(!e)throw new xn;if(!e.switchChain)throw new ab({connector:e});return e.switchChain(t)}function dp(t,{selector:e=n=>n}={}){const n=Pn(),r=()=>t(Da());return n.subscribe(({data:i,connector:s,status:a})=>e({address:i==null?void 0:i.account,connector:s,status:a}),r,{equalityFn:ap})}function Sb(t,{selector:e=n=>n}={}){const n=Pn(),r=()=>t(ts());return n.subscribe(({data:i,chains:s})=>{var a;return e({chainId:(a=i==null?void 0:i.chain)==null?void 0:a.id,chains:s})},r,{equalityFn:ap})}async function Ab({name:t,chainId:e}){const{normalize:n}=await Bi(()=>import("./index-E2376F-G.js"),__vite__mapDeps([]));return await fi({chainId:e}).getEnsAvatar({name:n(t)})}async function Tb({address:t,chainId:e}){return fi({chainId:e}).getEnsName({address:Vt(t)})}function fp({chainId:t}){var o,i;const{chain:e,chains:n}=ts(),r=e==null?void 0:e.id;if(r&&t!==r)throw new rb({activeChain:((o=n.find(s=>s.id===r))==null?void 0:o.name)??`Chain ${r}`,targetChain:((i=n.find(s=>s.id===t))==null?void 0:i.name)??`Chain ${t}`})}const Ib=Symbol(),j0=Object.getPrototypeOf,hu=new WeakMap,$b=t=>t&&(hu.has(t)?hu.get(t):j0(t)===Object.prototype||j0(t)===Array.prototype),Db=t=>$b(t)&&t[Ib]||null,F0=(t,e=!0)=>{hu.set(t,e)};var Pa={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const yl=t=>typeof t=="object"&&t!==null,er=new WeakMap,Ao=new WeakSet,Pb=(t=Object.is,e=(l,u)=>new Proxy(l,u),n=l=>yl(l)&&!Ao.has(l)&&(Array.isArray(l)||!(Symbol.iterator in l))&&!(l instanceof WeakMap)&&!(l instanceof WeakSet)&&!(l instanceof Error)&&!(l instanceof Number)&&!(l instanceof Date)&&!(l instanceof String)&&!(l instanceof RegExp)&&!(l instanceof ArrayBuffer),r=l=>{switch(l.status){case"fulfilled":return l.value;case"rejected":throw l.reason;default:throw l}},o=new WeakMap,i=(l,u,p=r)=>{const g=o.get(l);if((g==null?void 0:g[0])===u)return g[1];const m=Array.isArray(l)?[]:Object.create(Object.getPrototypeOf(l));return F0(m,!0),o.set(l,[u,m]),Reflect.ownKeys(l).forEach(w=>{if(Object.getOwnPropertyDescriptor(m,w))return;const v=Reflect.get(l,w),_={value:v,enumerable:!0,configurable:!0};if(Ao.has(v))F0(v,!1);else if(v instanceof Promise)delete _.value,_.get=()=>p(v);else if(er.has(v)){const[I,b]=er.get(v);_.value=i(I,b(),p)}Object.defineProperty(m,w,_)}),Object.preventExtensions(m)},s=new WeakMap,a=[1,1],c=l=>{if(!yl(l))throw new Error("object required");const u=s.get(l);if(u)return u;let p=a[0];const g=new Set,m=(R,k=++a[0])=>{p!==k&&(p=k,g.forEach(M=>M(R,k)))};let w=a[1];const v=(R=++a[1])=>(w!==R&&!g.size&&(w=R,I.forEach(([k])=>{const M=k[1](R);M>p&&(p=M)})),p),_=R=>(k,M)=>{const Y=[...k];Y[1]=[R,...Y[1]],m(Y,M)},I=new Map,b=(R,k)=>{if((Pa?"production":void 0)!=="production"&&I.has(R))throw new Error("prop listener already exists");if(g.size){const M=k[3](_(R));I.set(R,[k,M])}else I.set(R,[k])},E=R=>{var k;const M=I.get(R);M&&(I.delete(R),(k=M[1])==null||k.call(M))},x=R=>(g.add(R),g.size===1&&I.forEach(([M,Y],ie)=>{if((Pa?"production":void 0)!=="production"&&Y)throw new Error("remove already exists");const W=M[3](_(ie));I.set(ie,[M,W])}),()=>{g.delete(R),g.size===0&&I.forEach(([M,Y],ie)=>{Y&&(Y(),I.set(ie,[M]))})}),C=Array.isArray(l)?[]:Object.create(Object.getPrototypeOf(l)),f=e(C,{deleteProperty(R,k){const M=Reflect.get(R,k);E(k);const Y=Reflect.deleteProperty(R,k);return Y&&m(["delete",[k],M]),Y},set(R,k,M,Y){const ie=Reflect.has(R,k),W=Reflect.get(R,k,Y);if(ie&&(t(W,M)||s.has(M)&&t(W,s.get(M))))return!0;E(k),yl(M)&&(M=Db(M)||M);let j=M;if(M instanceof Promise)M.then(B=>{M.status="fulfilled",M.value=B,m(["resolve",[k],B])}).catch(B=>{M.status="rejected",M.reason=B,m(["reject",[k],B])});else{!er.has(M)&&n(M)&&(j=c(M));const B=!Ao.has(j)&&er.get(j);B&&b(k,B)}return Reflect.set(R,k,j,Y),m(["set",[k],M,W]),!0}});s.set(l,f);const T=[C,v,i,x];return er.set(f,T),Reflect.ownKeys(l).forEach(R=>{const k=Object.getOwnPropertyDescriptor(l,R);"value"in k&&(f[R]=l[R],delete k.value,delete k.writable),Object.defineProperty(C,R,k)}),f})=>[c,er,Ao,t,e,n,r,o,i,s,a],[Ob]=Pb();function At(t={}){return Ob(t)}function Gn(t,e,n){const r=er.get(t);(Pa?"production":void 0)!=="production"&&!r&&console.warn("Please use proxy object");let o;const i=[],s=r[3];let a=!1;const l=s(u=>{if(i.push(u),n){e(i.splice(0));return}o||(o=Promise.resolve().then(()=>{o=void 0,a&&e(i.splice(0))}))});return a=!0,()=>{a=!1,l()}}function hp(t,e){const n=er.get(t);(Pa?"production":void 0)!=="production"&&!n&&console.warn("Please use proxy object");const[r,o,i]=n;return i(r,o(),e)}function ns(t){return Ao.add(t),t}function pn(t,e,n,r){let o=t[e];return Gn(t,()=>{const i=t[e];Object.is(o,i)||n(o=i)},r)}const vl="https://secure.web3modal.com",Bn={FOUR_MINUTES_MS:24e4,TEN_SEC_MS:1e4,ONE_SEC_MS:1e3,SECURE_SITE:vl,SECURE_SITE_DASHBOARD:`${vl}/dashboard`,SECURE_SITE_FAVICON:`${vl}/images/favicon.png`,RESTRICTED_TIMEZONES:["ASIA/SHANGHAI","ASIA/URUMQI","ASIA/CHONGQING","ASIA/HARBIN","ASIA/KASHGAR","ASIA/MACAU","ASIA/HONG_KONG","ASIA/MACAO","ASIA/BEIJING","ASIA/HARBIN"],CONNECTOR_RDNS_MAP:{coinbaseWallet:"com.coinbase.wallet"}},le={isMobile(){return typeof window<"u"?!!(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){const t=window.navigator.userAgent.toLowerCase();return le.isMobile()&&t.includes("android")},isIos(){const t=window.navigator.userAgent.toLowerCase();return le.isMobile()&&(t.includes("iphone")||t.includes("ipad"))},isClient(){return typeof window<"u"},isPairingExpired(t){return t?t-Date.now()<=Bn.TEN_SEC_MS:!0},isAllowedRetry(t){return Date.now()-t>=Bn.ONE_SEC_MS},copyToClopboard(t){navigator.clipboard.writeText(t)},getPairingExpiry(){return Date.now()+Bn.FOUR_MINUTES_MS},getPlainAddress(t){return t.split(":")[2]},async wait(t){return new Promise(e=>{setTimeout(e,t)})},debounce(t,e=500){let n;return(...r)=>{function o(){t(...r)}n&&clearTimeout(n),n=setTimeout(o,e)}},isHttpUrl(t){return t.startsWith("http://")||t.startsWith("https://")},formatNativeUrl(t,e){if(le.isHttpUrl(t))return this.formatUniversalUrl(t,e);let n=t;n.includes("://")||(n=t.replaceAll("/","").replaceAll(":",""),n=`${n}://`),n.endsWith("/")||(n=`${n}/`);const r=encodeURIComponent(e);return{redirect:`${n}wc?uri=${r}`,href:n}},formatUniversalUrl(t,e){if(!le.isHttpUrl(t))return this.formatNativeUrl(t,e);let n=t;n.endsWith("/")||(n=`${n}/`);const r=encodeURIComponent(e);return{redirect:`${n}wc?uri=${r}`,href:n}},openHref(t,e){window.open(t,e,"noreferrer noopener")},async preloadImage(t){const e=new Promise((n,r)=>{const o=new Image;o.onload=n,o.onerror=r,o.crossOrigin="anonymous",o.src=t});return Promise.race([e,le.wait(2e3)])},formatBalance(t,e){var r;let n;if(t==="0")n="0.000";else if(typeof t=="string"){const o=Number(t);o&&(n=(r=o.toString().match(/^-?\d+(?:\.\d{0,3})?/u))==null?void 0:r[0])}return n?`${n} ${e}`:`0.000 ${e}`},isRestrictedRegion(){try{const{timeZone:t}=new Intl.DateTimeFormat().resolvedOptions(),e=t.toUpperCase();return Bn.RESTRICTED_TIMEZONES.includes(e)}catch{return!1}},getApiUrl(){return le.isRestrictedRegion()?"https://api.web3modal.org":"https://api.web3modal.com"},getBlockchainApiUrl(){return le.isRestrictedRegion()?"https://rpc.walletconnect.org":"https://rpc.walletconnect.com"},getAnalyticsUrl(){return le.isRestrictedRegion()?"https://pulse.walletconnect.org":"https://pulse.walletconnect.com"},getUUID(){return crypto!=null&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)})},parseError(t){var e,n;return typeof t=="string"?t:typeof((n=(e=t==null?void 0:t.issues)==null?void 0:e[0])==null?void 0:n.message)=="string"?t.issues[0].message:t instanceof Error?t.message:"Unknown error"}},ot=At({isConnected:!1}),ke={state:ot,subscribe(t){return Gn(ot,()=>t(ot))},subscribeKey(t,e){return pn(ot,t,e)},setIsConnected(t){ot.isConnected=t},setCaipAddress(t){ot.caipAddress=t,ot.address=t?le.getPlainAddress(t):void 0},setBalance(t,e){ot.balance=t,ot.balanceSymbol=e},setProfileName(t){ot.profileName=t},setProfileImage(t){ot.profileImage=t},setAddressExplorerUrl(t){ot.addressExplorerUrl=t},resetAccount(){ot.isConnected=!1,ot.caipAddress=void 0,ot.address=void 0,ot.balance=void 0,ot.balanceSymbol=void 0,ot.profileName=void 0,ot.profileImage=void 0,ot.addressExplorerUrl=void 0}};class Td{constructor({baseUrl:e}){this.baseUrl=e}async get({headers:e,...n}){const r=this.createUrl(n);return(await fetch(r,{method:"GET",headers:e})).json()}async getBlob({headers:e,...n}){const r=this.createUrl(n);return(await fetch(r,{method:"GET",headers:e})).blob()}async post({body:e,headers:n,...r}){const o=this.createUrl(r);return(await fetch(o,{method:"POST",headers:n,body:e?JSON.stringify(e):void 0})).json()}async put({body:e,headers:n,...r}){const o=this.createUrl(r);return(await fetch(o,{method:"PUT",headers:n,body:e?JSON.stringify(e):void 0})).json()}async delete({body:e,headers:n,...r}){const o=this.createUrl(r);return(await fetch(o,{method:"DELETE",headers:n,body:e?JSON.stringify(e):void 0})).json()}createUrl({path:e,params:n}){const r=new URL(e,this.baseUrl);return n&&Object.entries(n).forEach(([o,i])=>{i&&r.searchParams.append(o,i)}),r}}const xl="WALLETCONNECT_DEEPLINK_CHOICE",W0="@w3m/recent",z0="@w3m/connected_wallet_image_url",H0="@w3m/connected_connector",Et={setWalletConnectDeepLink({href:t,name:e}){try{localStorage.setItem(xl,JSON.stringify({href:t,name:e}))}catch{console.info("Unable to set WalletConnect deep link")}},getWalletConnectDeepLink(){try{const t=localStorage.getItem(xl);if(t)return JSON.parse(t)}catch{console.info("Unable to get WalletConnect deep link")}},deleteWalletConnectDeepLink(){try{localStorage.removeItem(xl)}catch{console.info("Unable to delete WalletConnect deep link")}},setWeb3ModalRecent(t){try{const e=Et.getRecentWallets();e.find(r=>r.id===t.id)||(e.unshift(t),e.length>2&&e.pop(),localStorage.setItem(W0,JSON.stringify(e)))}catch{console.info("Unable to set Web3Modal recent")}},getRecentWallets(){try{const t=localStorage.getItem(W0);return t?JSON.parse(t):[]}catch{console.info("Unable to get Web3Modal recent")}return[]},setConnectedWalletImageUrl(t){try{localStorage.setItem(z0,t)}catch{console.info("Unable to set Connected Wallet Image Url")}},getConnectedWalletImageUrl(){try{return localStorage.getItem(z0)}catch{console.info("Unable to set Connected Wallet Image Url")}},setConnectedConnector(t){try{localStorage.setItem(H0,t)}catch{console.info("Unable to set Connected Connector")}},getConnectedConnector(){try{return localStorage.getItem(H0)}catch{console.info("Unable to get Connected Connector")}}},Qn=At({walletImages:{},networkImages:{},connectorImages:{},tokenImages:{}}),Oi={state:Qn,subscribeNetworkImages(t){return Gn(Qn.networkImages,()=>t(Qn.networkImages))},subscribeKey(t,e){return pn(Qn,t,e)},setWalletImage(t,e){Qn.walletImages[t]=e},setNetworkImage(t,e){Qn.networkImages[t]=e},setConnectorImage(t,e){Qn.connectorImages[t]=e},setTokenImage(t,e){Qn.tokenImages[t]=e}},Mt=At({projectId:"",sdkType:"w3m",sdkVersion:"html-wagmi-undefined"}),Ue={state:Mt,subscribeKey(t,e){return pn(Mt,t,e)},setProjectId(t){Mt.projectId=t},setIncludeWalletIds(t){Mt.includeWalletIds=t},setExcludeWalletIds(t){Mt.excludeWalletIds=t},setFeaturedWalletIds(t){Mt.featuredWalletIds=t},setTokens(t){Mt.tokens=t},setTermsConditionsUrl(t){Mt.termsConditionsUrl=t},setPrivacyPolicyUrl(t){Mt.privacyPolicyUrl=t},setCustomWallets(t){Mt.customWallets=t},setEnableAnalytics(t){Mt.enableAnalytics=t},setSdkVersion(t){Mt.sdkVersion=t},setMetadata(t){Mt.metadata=t}},Dr=At({connectors:[]}),We={state:Dr,subscribeKey(t,e){return pn(Dr,t,e)},setConnectors(t){Dr.connectors=t.map(e=>ns(e))},addConnector(t){var e,n;if(Dr.connectors.push(ns(t)),t.id==="w3mEmail"){const r=t,o=hp(Ue.state);(n=(e=r==null?void 0:r.provider)==null?void 0:e.syncDappData)==null||n.call(e,{metadata:o.metadata,sdkVersion:o.sdkVersion,projectId:o.projectId})}},getEmailConnector(){return Dr.connectors.find(t=>t.type==="EMAIL")},getAnnouncedConnectorRdns(){return Dr.connectors.filter(t=>t.type==="ANNOUNCED").map(t=>{var e;return(e=t.info)==null?void 0:e.rdns})},getConnectors(){return Dr.connectors}},xo=At({open:!1,selectedNetworkId:void 0}),Li={state:xo,subscribe(t){return Gn(xo,()=>t(xo))},set(t){Object.assign(xo,{...xo,...t})}},gt=At({supportsAllNetworks:!0,isDefaultCaipNetwork:!1}),Qe={state:gt,subscribeKey(t,e){return pn(gt,t,e)},_getClient(){if(!gt._client)throw new Error("NetworkController client not set");return gt._client},setClient(t){gt._client=ns(t)},setCaipNetwork(t){gt.caipNetwork=t,Li.set({selectedNetworkId:t==null?void 0:t.id})},setDefaultCaipNetwork(t){gt.caipNetwork=t,Li.set({selectedNetworkId:t==null?void 0:t.id}),gt.isDefaultCaipNetwork=!0},setRequestedCaipNetworks(t){gt.requestedCaipNetworks=t},async getApprovedCaipNetworksData(){const t=await this._getClient().getApprovedCaipNetworksData();gt.supportsAllNetworks=t.supportsAllNetworks,gt.approvedCaipNetworkIds=t.approvedCaipNetworkIds},async switchActiveNetwork(t){await this._getClient().switchCaipNetwork(t),gt.caipNetwork=t},resetNetwork(){gt.isDefaultCaipNetwork||(gt.caipNetwork=void 0),gt.approvedCaipNetworkIds=void 0,gt.supportsAllNetworks=!0}},Rb=le.getApiUrl(),bn=new Td({baseUrl:Rb}),Nb="40",V0="4",vt=At({page:1,count:0,featured:[],recommended:[],wallets:[],search:[]}),Pe={state:vt,subscribeKey(t,e){return pn(vt,t,e)},_getApiHeaders(){const{projectId:t,sdkType:e,sdkVersion:n}=Ue.state;return{"x-project-id":t,"x-sdk-type":e,"x-sdk-version":n}},async _fetchWalletImage(t){const e=`${bn.baseUrl}/getWalletImage/${t}`,n=await bn.getBlob({path:e,headers:Pe._getApiHeaders()});Oi.setWalletImage(t,URL.createObjectURL(n))},async _fetchNetworkImage(t){const e=`${bn.baseUrl}/public/getAssetImage/${t}`,n=await bn.getBlob({path:e,headers:Pe._getApiHeaders()});Oi.setNetworkImage(t,URL.createObjectURL(n))},async _fetchConnectorImage(t){const e=`${bn.baseUrl}/public/getAssetImage/${t}`,n=await bn.getBlob({path:e,headers:Pe._getApiHeaders()});Oi.setConnectorImage(t,URL.createObjectURL(n))},async fetchNetworkImages(){const{requestedCaipNetworks:t}=Qe.state,e=t==null?void 0:t.map(({imageId:n})=>n).filter(Boolean);e&&await Promise.allSettled(e.map(n=>Pe._fetchNetworkImage(n)))},async fetchConnectorImages(){const{connectors:t}=We.state,e=t.map(({imageId:n})=>n).filter(Boolean);await Promise.allSettled(e.map(n=>Pe._fetchConnectorImage(n)))},async fetchFeaturedWallets(){const{featuredWalletIds:t}=Ue.state;if(t!=null&&t.length){const{data:e}=await bn.get({path:"/getWallets",headers:Pe._getApiHeaders(),params:{page:"1",entries:t!=null&&t.length?String(t.length):V0,include:t==null?void 0:t.join(",")}});e.sort((r,o)=>t.indexOf(r.id)-t.indexOf(o.id));const n=e.map(r=>r.image_id).filter(Boolean);await Promise.allSettled(n.map(r=>Pe._fetchWalletImage(r))),vt.featured=e}},async fetchRecommendedWallets(){const{includeWalletIds:t,excludeWalletIds:e,featuredWalletIds:n}=Ue.state,r=[...e??[],...n??[]].filter(Boolean),{data:o,count:i}=await bn.get({path:"/getWallets",headers:Pe._getApiHeaders(),params:{page:"1",entries:V0,include:t==null?void 0:t.join(","),exclude:r==null?void 0:r.join(",")}}),s=Et.getRecentWallets(),a=o.map(l=>l.image_id).filter(Boolean),c=s.map(l=>l.image_id).filter(Boolean);await Promise.allSettled([...a,...c].map(l=>Pe._fetchWalletImage(l))),vt.recommended=o,vt.count=i??0},async fetchWallets({page:t}){const{includeWalletIds:e,excludeWalletIds:n,featuredWalletIds:r}=Ue.state,o=[...vt.recommended.map(({id:c})=>c),...n??[],...r??[]].filter(Boolean),{data:i,count:s}=await bn.get({path:"/getWallets",headers:Pe._getApiHeaders(),params:{page:String(t),entries:Nb,include:e==null?void 0:e.join(","),exclude:o.join(",")}}),a=i.map(c=>c.image_id).filter(Boolean);await Promise.allSettled([...a.map(c=>Pe._fetchWalletImage(c)),le.wait(300)]),vt.wallets=[...vt.wallets,...i],vt.count=s>vt.count?s:vt.count,vt.page=t},async searchWallet({search:t}){const{includeWalletIds:e,excludeWalletIds:n}=Ue.state;vt.search=[];const{data:r}=await bn.get({path:"/getWallets",headers:Pe._getApiHeaders(),params:{page:"1",entries:"100",search:t,include:e==null?void 0:e.join(","),exclude:n==null?void 0:n.join(",")}}),o=r.map(i=>i.image_id).filter(Boolean);await Promise.allSettled([...o.map(i=>Pe._fetchWalletImage(i)),le.wait(300)]),vt.search=r},prefetch(){vt.prefetchPromise=Promise.race([Promise.allSettled([Pe.fetchFeaturedWallets(),Pe.fetchRecommendedWallets(),Pe.fetchNetworkImages(),Pe.fetchConnectorImages()]),le.wait(3e3)])}},kb=le.getAnalyticsUrl(),Mb=new Td({baseUrl:kb}),Ub=["MODAL_CREATED"],vi=At({timestamp:Date.now(),data:{type:"track",event:"MODAL_CREATED"}}),we={state:vi,subscribe(t){return Gn(vi,()=>t(vi))},_getApiHeaders(){const{projectId:t,sdkType:e,sdkVersion:n}=Ue.state;return{"x-project-id":t,"x-sdk-type":e,"x-sdk-version":n}},async _sendAnalyticsEvent(t){try{if(Ub.includes(t.data.event)||typeof window>"u")return;await Mb.post({path:"/e",headers:we._getApiHeaders(),body:{eventId:le.getUUID(),url:window.location.href,domain:window.location.hostname,timestamp:t.timestamp,props:t.data}})}catch{}},sendEvent(t){vi.timestamp=Date.now(),vi.data=t,Ue.state.enableAnalytics&&we._sendAnalyticsEvent(vi)}},Ge=At({view:"Connect",history:["Connect"]}),oe={state:Ge,subscribeKey(t,e){return pn(Ge,t,e)},push(t,e){t!==Ge.view&&(Ge.view=t,Ge.history.push(t),Ge.data=e)},reset(t){Ge.view=t,Ge.history=[t]},replace(t,e){Ge.history.length>1&&Ge.history.at(-1)!==t&&(Ge.view=t,Ge.history[Ge.history.length-1]=t,Ge.data=e)},goBack(){if(Ge.history.length>1){Ge.history.pop();const[t]=Ge.history.slice(-1);t&&(Ge.view=t)}},goBackToIndex(t){if(Ge.history.length>1){Ge.history=Ge.history.slice(0,t+1);const[e]=Ge.history.slice(-1);e&&(Ge.view=e)}}},Pr=At({loading:!1,open:!1}),ze={state:Pr,subscribe(t){return Gn(Pr,()=>t(Pr))},subscribeKey(t,e){return pn(Pr,t,e)},async open(t){await Pe.state.prefetchPromise,t!=null&&t.view?oe.reset(t.view):ke.state.isConnected?oe.reset("Account"):oe.reset("Connect"),Pr.open=!0,Li.set({open:!0}),we.sendEvent({type:"track",event:"MODAL_OPEN"})},close(){Pr.open=!1,Li.set({open:!1}),we.sendEvent({type:"track",event:"MODAL_CLOSE"})},setLoading(t){Pr.loading=t}},Bb=le.getBlockchainApiUrl(),Z0=new Td({baseUrl:Bb}),pp={fetchIdentity({caipChainId:t,address:e}){return Z0.get({path:`/v1/identity/${e}`,params:{chainId:t,projectId:Ue.state.projectId}})},fetchTransactions({account:t,projectId:e,cursor:n}){const r=n?{cursor:n}:{};return Z0.get({path:`/v1/account/${t}/history?projectId=${e}`,params:r})}},kn=At({message:"",variant:"success",open:!1}),et={state:kn,subscribeKey(t,e){return pn(kn,t,e)},showSuccess(t){kn.message=t,kn.variant="success",kn.open=!0},showError(t){const e=le.parseError(t);kn.message=e,kn.variant="error",kn.open=!0},hide(){kn.open=!1}},st=At({transactions:[],transactionsByYear:{},loading:!1,empty:!1,next:void 0}),Xt={state:st,subscribe(t){return Gn(st,()=>t(st))},async fetchTransactions(t){const{projectId:e}=Ue.state;if(!e||!t)throw new Error("Transactions can't be fetched without a projectId and an accountAddress");st.loading=!0;try{const n=await pp.fetchTransactions({account:t,projectId:e,cursor:st.next}),r=this.filterSpamTransactions(n.data),o=[...st.transactions,...r];st.loading=!1,st.transactions=o,st.transactionsByYear=this.groupTransactionsByYear(st.transactionsByYear,r),st.empty=o.length===0,st.next=n.next?n.next:void 0}catch{we.sendEvent({type:"track",event:"ERROR_FETCH_TRANSACTIONS",properties:{address:t,projectId:e,cursor:st.next}}),et.showError("Failed to fetch transactions"),st.loading=!1,st.empty=!0}},groupTransactionsByYear(t={},e=[]){const n=t;return e.forEach(r=>{var i;const o=new Date(r.metadata.minedAt).getFullYear();n[o]||(n[o]=[]),(i=n[o])==null||i.push(r)}),n},filterSpamTransactions(t){return t.filter(e=>!e.transfers.every(r=>{var o;return((o=r.nft_info)==null?void 0:o.flags.is_spam)===!0}))},resetTransactions(){st.transactions=[],st.transactionsByYear={},st.loading=!1,st.empty=!1,st.next=void 0}},ft=At({wcError:!1,buffering:!1}),Re={state:ft,subscribeKey(t,e){return pn(ft,t,e)},_getClient(){if(!ft._client)throw new Error("ConnectionController client not set");return ft._client},setClient(t){ft._client=ns(t)},connectWalletConnect(){ft.wcPromise=this._getClient().connectWalletConnect(t=>{ft.wcUri=t,ft.wcPairingExpiry=le.getPairingExpiry()})},async connectExternal(t){var e,n;await((n=(e=this._getClient()).connectExternal)==null?void 0:n.call(e,t)),Et.setConnectedConnector(t.type)},async signMessage(t){return this._getClient().signMessage(t)},checkInstalled(t){var e,n;return(n=(e=this._getClient()).checkInstalled)==null?void 0:n.call(e,t)},resetWcConnection(){ft.wcUri=void 0,ft.wcPairingExpiry=void 0,ft.wcPromise=void 0,ft.wcLinking=void 0,ft.recentWallet=void 0,Xt.resetTransactions(),Et.deleteWalletConnectDeepLink()},setWcLinking(t){ft.wcLinking=t},setWcError(t){ft.wcError=t,ft.buffering=!1},setRecentWallet(t){ft.recentWallet=t},setBuffering(t){ft.buffering=t},async disconnect(){await this._getClient().disconnect(),this.resetWcConnection()}},Ut=At({status:"uninitialized",isSiweEnabled:!1}),nt={state:Ut,subscribeKey(t,e){return pn(Ut,t,e)},subscribe(t){return Gn(Ut,()=>t(Ut))},_getClient(){if(!Ut._client)throw new Error("SIWEController client not set");return Ut._client},async getNonce(){const e=await this._getClient().getNonce();return this.setNonce(e),e},async getSession(){const e=await this._getClient().getSession();return e&&(this.setSession(e),this.setStatus("success")),e},createMessage(t){const n=this._getClient().createMessage(t);return this.setMessage(n),n},async verifyMessage(t){return await this._getClient().verifyMessage(t)},async signIn(){return await this._getClient().signIn()},async signOut(){var e;const t=this._getClient();await t.signOut(),this.setStatus("ready"),(e=t.onSignOut)==null||e.call(t)},onSignIn(t){var n;const e=this._getClient();(n=e.onSignIn)==null||n.call(e,t)},onSignOut(){var e;const t=this._getClient();(e=t.onSignOut)==null||e.call(t)},setSIWEClient(t){Ut._client=ns(t),Ut.status="ready",Ut.isSiweEnabled=t.options.enabled},setNonce(t){Ut.nonce=t},setStatus(t){Ut.status=t},setMessage(t){Ut.message=t},setSession(t){Ut.session=t}},Or=At({themeMode:"dark",themeVariables:{}}),It={state:Or,subscribe(t){return Gn(Or,()=>t(Or))},setThemeMode(t){Or.themeMode=t},setThemeVariables(t){Or.themeVariables={...Or.themeVariables,...t}},getSnapshot(){return hp(Or)}},Xe={getWalletImage(t){if(t!=null&&t.image_url)return t==null?void 0:t.image_url;if(t!=null&&t.image_id)return Oi.state.walletImages[t.image_id]},getNetworkImage(t){if(t!=null&&t.imageUrl)return t==null?void 0:t.imageUrl;if(t!=null&&t.imageId)return Oi.state.networkImages[t.imageId]},getConnectorImage(t){if(t!=null&&t.imageUrl)return t.imageUrl;if(t!=null&&t.imageId)return Oi.state.connectorImages[t.imageId]}},gp={goBackOrCloseModal(){oe.state.history.length>1?oe.goBack():ze.close()},navigateAfterNetworkSwitch(){const{history:t}=oe.state,e=t.findIndex(n=>n==="Networks");e>=1?oe.goBackToIndex(e-1):ze.close()}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wa=globalThis,Id=wa.ShadowRoot&&(wa.ShadyCSS===void 0||wa.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$d=Symbol(),G0=new WeakMap;let mp=class{constructor(e,n,r){if(this._$cssResult$=!0,r!==$d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(Id&&e===void 0){const r=n!==void 0&&n.length===1;r&&(e=G0.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&G0.set(n,e))}return e}toString(){return this.cssText}};const vn=t=>new mp(typeof t=="string"?t:t+"",void 0,$d),q=(t,...e)=>{const n=t.length===1?t[0]:e.reduce((r,o,i)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new mp(n,t,$d)},Lb=(t,e)=>{if(Id)t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of e){const r=document.createElement("style"),o=wa.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=n.cssText,t.appendChild(r)}},q0=Id?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const r of e.cssRules)n+=r.cssText;return vn(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:jb,defineProperty:Fb,getOwnPropertyDescriptor:Wb,getOwnPropertyNames:zb,getOwnPropertySymbols:Hb,getPrototypeOf:Vb}=Object,sr=globalThis,K0=sr.trustedTypes,Zb=K0?K0.emptyScript:"",El=sr.reactiveElementPolyfillSupport,Do=(t,e)=>t,Oa={toAttribute(t,e){switch(e){case Boolean:t=t?Zb:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},Dd=(t,e)=>!jb(t,e),Y0={attribute:!0,type:String,converter:Oa,reflect:!1,hasChanged:Dd};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),sr.litPropertyMetadata??(sr.litPropertyMetadata=new WeakMap);let Si=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=Y0){if(n.state&&(n.attribute=!1),this._$Ei(),this.elementProperties.set(e,n),!n.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(e,r,n);o!==void 0&&Fb(this.prototype,e,o)}}static getPropertyDescriptor(e,n,r){const{get:o,set:i}=Wb(this.prototype,e)??{get(){return this[n]},set(s){this[n]=s}};return{get(){return o==null?void 0:o.call(this)},set(s){const a=o==null?void 0:o.call(this);i.call(this,s),this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Y0}static _$Ei(){if(this.hasOwnProperty(Do("elementProperties")))return;const e=Vb(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Do("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Do("properties"))){const n=this.properties,r=[...zb(n),...Hb(n)];for(const o of r)this.createProperty(o,n[o])}const e=this[Symbol.metadata];if(e!==null){const n=litPropertyMetadata.get(e);if(n!==void 0)for(const[r,o]of n)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[n,r]of this.elementProperties){const o=this._$Eu(n,r);o!==void 0&&this._$Eh.set(o,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)n.unshift(q0(o))}else e!==void 0&&n.push(q0(e));return n}static _$Eu(e,n){const r=n.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(n=>n(this))}addController(e){var n;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)==null||n.call(e))}removeController(e){var n;(n=this._$EO)==null||n.delete(e)}_$E_(){const e=new Map,n=this.constructor.elementProperties;for(const r of n.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lb(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(n=>{var r;return(r=n.hostConnected)==null?void 0:r.call(n)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(n=>{var r;return(r=n.hostDisconnected)==null?void 0:r.call(n)})}attributeChangedCallback(e,n,r){this._$AK(e,r)}_$EC(e,n){var i;const r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){const s=(((i=r.converter)==null?void 0:i.toAttribute)!==void 0?r.converter:Oa).toAttribute(n,r.type);this._$Em=e,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,n){var i;const r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const s=r.getPropertyOptions(o),a=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)==null?void 0:i.fromAttribute)!==void 0?s.converter:Oa;this._$Em=o,this[o]=a.fromAttribute(n,s.type),this._$Em=null}}requestUpdate(e,n,r){if(e!==void 0){if(r??(r=this.constructor.getPropertyOptions(e)),!(r.hasChanged??Dd)(this[e],n))return;this.P(e,n,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,n,r){this._$AL.has(e)||this._$AL.set(e,n),r.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[i,s]of o)s.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.P(i,this[i],s)}let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),(r=this._$EO)==null||r.forEach(o=>{var i;return(i=o.hostUpdate)==null?void 0:i.call(o)}),this.update(n)):this._$EU()}catch(o){throw e=!1,this._$EU(),o}e&&this._$AE(n)}willUpdate(e){}_$AE(e){var n;(n=this._$EO)==null||n.forEach(r=>{var o;return(o=r.hostUpdated)==null?void 0:o.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(n=>this._$EC(n,this[n]))),this._$EU()}updated(e){}firstUpdated(e){}};Si.elementStyles=[],Si.shadowRootOptions={mode:"open"},Si[Do("elementProperties")]=new Map,Si[Do("finalized")]=new Map,El==null||El({ReactiveElement:Si}),(sr.reactiveElementVersions??(sr.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Po=globalThis,Ra=Po.trustedTypes,J0=Ra?Ra.createPolicy("lit-html",{createHTML:t=>t}):void 0,wp="$lit$",tr=`lit$${(Math.random()+"").slice(9)}$`,bp="?"+tr,Gb=`<${bp}>`,Zr=document,rs=()=>Zr.createComment(""),is=t=>t===null||typeof t!="object"&&typeof t!="function",yp=Array.isArray,qb=t=>yp(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",_l=`[ 	
\f\r]`,Eo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,X0=/-->/g,Q0=/>/g,Rr=RegExp(`>|${_l}(?:([^\\s"'>=/]+)(${_l}*=${_l}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ef=/'/g,tf=/"/g,vp=/^(?:script|style|textarea|title)$/i,xp=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),$=xp(1),K=xp(2),Gr=Symbol.for("lit-noChange"),rt=Symbol.for("lit-nothing"),nf=new WeakMap,Ur=Zr.createTreeWalker(Zr,129);function Ep(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return J0!==void 0?J0.createHTML(e):e}const Kb=(t,e)=>{const n=t.length-1,r=[];let o,i=e===2?"<svg>":"",s=Eo;for(let a=0;a<n;a++){const c=t[a];let l,u,p=-1,g=0;for(;g<c.length&&(s.lastIndex=g,u=s.exec(c),u!==null);)g=s.lastIndex,s===Eo?u[1]==="!--"?s=X0:u[1]!==void 0?s=Q0:u[2]!==void 0?(vp.test(u[2])&&(o=RegExp("</"+u[2],"g")),s=Rr):u[3]!==void 0&&(s=Rr):s===Rr?u[0]===">"?(s=o??Eo,p=-1):u[1]===void 0?p=-2:(p=s.lastIndex-u[2].length,l=u[1],s=u[3]===void 0?Rr:u[3]==='"'?tf:ef):s===tf||s===ef?s=Rr:s===X0||s===Q0?s=Eo:(s=Rr,o=void 0);const m=s===Rr&&t[a+1].startsWith("/>")?" ":"";i+=s===Eo?c+Gb:p>=0?(r.push(l),c.slice(0,p)+wp+c.slice(p)+tr+m):c+tr+(p===-2?a:m)}return[Ep(t,i+(t[n]||"<?>")+(e===2?"</svg>":"")),r]};let pu=class _p{constructor({strings:e,_$litType$:n},r){let o;this.parts=[];let i=0,s=0;const a=e.length-1,c=this.parts,[l,u]=Kb(e,n);if(this.el=_p.createElement(l,r),Ur.currentNode=this.el.content,n===2){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=Ur.nextNode())!==null&&c.length<a;){if(o.nodeType===1){if(o.hasAttributes())for(const p of o.getAttributeNames())if(p.endsWith(wp)){const g=u[s++],m=o.getAttribute(p).split(tr),w=/([.?@])?(.*)/.exec(g);c.push({type:1,index:i,name:w[2],strings:m,ctor:w[1]==="."?Jb:w[1]==="?"?Xb:w[1]==="@"?Qb:Pc}),o.removeAttribute(p)}else p.startsWith(tr)&&(c.push({type:6,index:i}),o.removeAttribute(p));if(vp.test(o.tagName)){const p=o.textContent.split(tr),g=p.length-1;if(g>0){o.textContent=Ra?Ra.emptyScript:"";for(let m=0;m<g;m++)o.append(p[m],rs()),Ur.nextNode(),c.push({type:2,index:++i});o.append(p[g],rs())}}}else if(o.nodeType===8)if(o.data===bp)c.push({type:2,index:i});else{let p=-1;for(;(p=o.data.indexOf(tr,p+1))!==-1;)c.push({type:7,index:i}),p+=tr.length-1}i++}}static createElement(e,n){const r=Zr.createElement("template");return r.innerHTML=e,r}};function ji(t,e,n=t,r){var s,a;if(e===Gr)return e;let o=r!==void 0?(s=n._$Co)==null?void 0:s[r]:n._$Cl;const i=is(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==i&&((a=o==null?void 0:o._$AO)==null||a.call(o,!1),i===void 0?o=void 0:(o=new i(t),o._$AT(t,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(e=ji(t,o._$AS(t,e.values),o,r)),e}let Yb=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:r}=this._$AD,o=((e==null?void 0:e.creationScope)??Zr).importNode(n,!0);Ur.currentNode=o;let i=Ur.nextNode(),s=0,a=0,c=r[0];for(;c!==void 0;){if(s===c.index){let l;c.type===2?l=new Fs(i,i.nextSibling,this,e):c.type===1?l=new c.ctor(i,c.name,c.strings,this,e):c.type===6&&(l=new e3(i,this,e)),this._$AV.push(l),c=r[++a]}s!==(c==null?void 0:c.index)&&(i=Ur.nextNode(),s++)}return Ur.currentNode=Zr,o}p(e){let n=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,n),n+=r.strings.length-2):r._$AI(e[n])),n++}};class Fs{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,n,r,o){this.type=2,this._$AH=rt,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=ji(this,e,n),is(e)?e===rt||e==null||e===""?(this._$AH!==rt&&this._$AR(),this._$AH=rt):e!==this._$AH&&e!==Gr&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qb(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==rt&&is(this._$AH)?this._$AA.nextSibling.data=e:this.T(Zr.createTextNode(e)),this._$AH=e}$(e){var i;const{values:n,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=pu.createElement(Ep(r.h,r.h[0]),this.options)),r);if(((i=this._$AH)==null?void 0:i._$AD)===o)this._$AH.p(n);else{const s=new Yb(o,this),a=s.u(this.options);s.p(n),this.T(a),this._$AH=s}}_$AC(e){let n=nf.get(e.strings);return n===void 0&&nf.set(e.strings,n=new pu(e)),n}k(e){yp(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let r,o=0;for(const i of e)o===n.length?n.push(r=new Fs(this.S(rs()),this.S(rs()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(e=this._$AA.nextSibling,n){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,n);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var n;this._$AM===void 0&&(this._$Cv=e,(n=this._$AP)==null||n.call(this,e))}}class Pc{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,r,o,i){this.type=1,this._$AH=rt,this._$AN=void 0,this.element=e,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=rt}_$AI(e,n=this,r,o){const i=this.strings;let s=!1;if(i===void 0)e=ji(this,e,n,0),s=!is(e)||e!==this._$AH&&e!==Gr,s&&(this._$AH=e);else{const a=e;let c,l;for(e=i[0],c=0;c<i.length-1;c++)l=ji(this,a[r+c],n,c),l===Gr&&(l=this._$AH[c]),s||(s=!is(l)||l!==this._$AH[c]),l===rt?e=rt:e!==rt&&(e+=(l??"")+i[c+1]),this._$AH[c]=l}s&&!o&&this.j(e)}j(e){e===rt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let Jb=class extends Pc{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===rt?void 0:e}},Xb=class extends Pc{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==rt)}};class Qb extends Pc{constructor(e,n,r,o,i){super(e,n,r,o,i),this.type=5}_$AI(e,n=this){if((e=ji(this,e,n,0)??rt)===Gr)return;const r=this._$AH,o=e===rt&&r!==rt||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==rt&&(r===rt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,e):this._$AH.handleEvent(e)}}let e3=class{constructor(e,n,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){ji(this,e)}};const Cl=Po.litHtmlPolyfillSupport;Cl==null||Cl(pu,Fs),(Po.litHtmlVersions??(Po.litHtmlVersions=[])).push("3.1.2");const t3=(t,e,n)=>{const r=(n==null?void 0:n.renderBefore)??e;let o=r._$litPart$;if(o===void 0){const i=(n==null?void 0:n.renderBefore)??null;r._$litPart$=o=new Fs(e.insertBefore(rs(),i),i,void 0,n??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let H=class extends Si{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const e=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=e.firstChild),e}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=t3(n,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Gr}};var ih;H._$litElement$=!0,H.finalized=!0,(ih=globalThis.litElementHydrateSupport)==null||ih.call(globalThis,{LitElement:H});const Sl=globalThis.litElementPolyfillSupport;Sl==null||Sl({LitElement:H});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");let Oo,ar,cr;function Cp(t,e){Oo=document.createElement("style"),ar=document.createElement("style"),cr=document.createElement("style"),Oo.textContent=Ri(t).core.cssText,ar.textContent=Ri(t).dark.cssText,cr.textContent=Ri(t).light.cssText,document.head.appendChild(Oo),document.head.appendChild(ar),document.head.appendChild(cr),Pd(e)}function Pd(t){ar&&cr&&(t==="light"?(ar.removeAttribute("media"),cr.media="enabled"):(cr.removeAttribute("media"),ar.media="enabled"))}function Sp(t){Oo&&ar&&cr&&(Oo.textContent=Ri(t).core.cssText,ar.textContent=Ri(t).dark.cssText,cr.textContent=Ri(t).light.cssText)}function Ri(t){return{core:q`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      :root {
        --w3m-color-mix-strength: ${vn(t!=null&&t["--w3m-color-mix-strength"]?`${t["--w3m-color-mix-strength"]}%`:"0%")};
        --w3m-font-family: ${vn((t==null?void 0:t["--w3m-font-family"])||"Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${vn((t==null?void 0:t["--w3m-font-size-master"])||"10px")};
        --w3m-border-radius-master: ${vn((t==null?void 0:t["--w3m-border-radius-master"])||"4px")};
        --w3m-z-index: ${vn((t==null?void 0:t["--w3m-z-index"])||100)};

        --wui-font-family: var(--w3m-font-family);

        --wui-font-size-micro: var(--w3m-font-size-master);
        --wui-font-size-tiny: calc(var(--w3m-font-size-master) * 1.2);
        --wui-font-size-small: calc(var(--w3m-font-size-master) * 1.4);
        --wui-font-size-paragraph: calc(var(--w3m-font-size-master) * 1.6);
        --wui-font-size-large: calc(var(--w3m-font-size-master) * 2);

        --wui-border-radius-5xs: var(--w3m-border-radius-master);
        --wui-border-radius-4xs: calc(var(--w3m-border-radius-master) * 1.5);
        --wui-border-radius-3xs: calc(var(--w3m-border-radius-master) * 2);
        --wui-border-radius-xxs: calc(var(--w3m-border-radius-master) * 3);
        --wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4);
        --wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5);
        --wui-border-radius-m: calc(var(--w3m-border-radius-master) * 7);
        --wui-border-radius-l: calc(var(--w3m-border-radius-master) * 9);
        --wui-border-radius-3xl: calc(var(--w3m-border-radius-master) * 20);

        --wui-font-weight-light: 400;
        --wui-font-weight-regular: 500;
        --wui-font-weight-medium: 600;
        --wui-font-weight-bold: 700;

        --wui-letter-spacing-large: -0.8px;
        --wui-letter-spacing-paragraph: -0.64px;
        --wui-letter-spacing-small: -0.56px;
        --wui-letter-spacing-tiny: -0.48px;
        --wui-letter-spacing-micro: -0.2px;

        --wui-spacing-0: 0px;
        --wui-spacing-4xs: 2px;
        --wui-spacing-3xs: 4px;
        --wui-spacing-xxs: 6px;
        --wui-spacing-2xs: 7px;
        --wui-spacing-xs: 8px;
        --wui-spacing-1xs: 10px;
        --wui-spacing-s: 12px;
        --wui-spacing-m: 14px;
        --wui-spacing-l: 16px;
        --wui-spacing-2l: 18px;
        --wui-spacing-xl: 20px;
        --wui-spacing-xxl: 24px;
        --wui-spacing-2xl: 32px;
        --wui-spacing-3xl: 40px;
        --wui-spacing-4xl: 90px;

        --wui-icon-box-size-xxs: 14px;
        --wui-icon-box-size-xs: 20px;
        --wui-icon-box-size-sm: 24px;
        --wui-icon-box-size-md: 32px;
        --wui-icon-box-size-lg: 40px;
        --wui-icon-box-size-xl: 64px;

        --wui-icon-size-inherit: inherit;
        --wui-icon-size-xxs: 10px;
        --wui-icon-size-xs: 12px;
        --wui-icon-size-sm: 14px;
        --wui-icon-size-md: 16px;
        --wui-icon-size-mdl: 18px;
        --wui-icon-size-lg: 20px;
        --wui-icon-size-xl: 24px;

        --wui-wallet-image-size-inherit: inherit;
        --wui-wallet-image-size-sm: 40px;
        --wui-wallet-image-size-md: 56px;
        --wui-wallet-image-size-lg: 80px;

        --wui-box-size-md: 100px;
        --wui-box-size-lg: 120px;

        --wui-ease-out-power-2: cubic-bezier(0, 0, 0.22, 1);
        --wui-ease-out-power-1: cubic-bezier(0, 0, 0.55, 1);

        --wui-ease-in-power-3: cubic-bezier(0.66, 0, 1, 1);
        --wui-ease-in-power-2: cubic-bezier(0.45, 0, 1, 1);
        --wui-ease-in-power-1: cubic-bezier(0.3, 0, 1, 1);

        --wui-ease-inout-power-1: cubic-bezier(0.45, 0, 0.55, 1);

        --wui-duration-lg: 200ms;
        --wui-duration-md: 125ms;
        --wui-duration-sm: 75ms;

        --wui-path-network: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --wui-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --wui-color-inherit: inherit;

        --wui-color-inverse-100: #fff;
        --wui-color-inverse-000: #000;

        --wui-cover: rgba(20, 20, 20, 0.8);

        --wui-color-modal-bg: var(--wui-color-modal-bg-base);

        --wui-color-blue-100: var(--wui-color-blue-base-100);

        --wui-color-accent-100: var(--wui-color-accent-base-100);
        --wui-color-accent-090: var(--wui-color-accent-base-090);
        --wui-color-accent-080: var(--wui-color-accent-base-080);

        --wui-accent-glass-090: var(--wui-accent-glass-base-090);
        --wui-accent-glass-080: var(--wui-accent-glass-base-080);
        --wui-accent-glass-020: var(--wui-accent-glass-base-020);
        --wui-accent-glass-015: var(--wui-accent-glass-base-015);
        --wui-accent-glass-010: var(--wui-accent-glass-base-010);
        --wui-accent-glass-005: var(--wui-accent-glass-base-005);
        --wui-accent-glass-002: var(--wui-accent-glass-base-002);

        --wui-color-fg-100: var(--wui-color-fg-base-100);
        --wui-color-fg-125: var(--wui-color-fg-base-125);
        --wui-color-fg-150: var(--wui-color-fg-base-150);
        --wui-color-fg-175: var(--wui-color-fg-base-175);
        --wui-color-fg-200: var(--wui-color-fg-base-200);
        --wui-color-fg-225: var(--wui-color-fg-base-225);
        --wui-color-fg-250: var(--wui-color-fg-base-250);
        --wui-color-fg-275: var(--wui-color-fg-base-275);
        --wui-color-fg-300: var(--wui-color-fg-base-300);

        --wui-color-bg-100: var(--wui-color-bg-base-100);
        --wui-color-bg-125: var(--wui-color-bg-base-125);
        --wui-color-bg-150: var(--wui-color-bg-base-150);
        --wui-color-bg-175: var(--wui-color-bg-base-175);
        --wui-color-bg-200: var(--wui-color-bg-base-200);
        --wui-color-bg-225: var(--wui-color-bg-base-225);
        --wui-color-bg-250: var(--wui-color-bg-base-250);
        --wui-color-bg-275: var(--wui-color-bg-base-275);
        --wui-color-bg-300: var(--wui-color-bg-base-300);

        --wui-color-success-100: var(--wui-color-success-base-100);
        --wui-color-error-100: var(--wui-color-error-base-100);

        --wui-icon-box-bg-error-100: var(--wui-icon-box-bg-error-base-100);
        --wui-icon-box-bg-blue-100: var(--wui-icon-box-bg-blue-base-100);
        --wui-icon-box-bg-success-100: var(--wui-icon-box-bg-success-base-100);
        --wui-icon-box-bg-inverse-100: var(--wui-icon-box-bg-inverse-base-100);

        --wui-all-wallets-bg-100: var(--wui-all-wallets-bg-base-100);

        --wui-avatar-border: var(--wui-avatar-border-base);

        --wui-thumbnail-border: var(--wui-thumbnail-border-base);

        --wui-box-shadow-blue: rgba(71, 161, 255, 0.16);
      }

      @supports (background: color-mix(in srgb, white 50%, black)) {
        :root {
          --wui-color-modal-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-modal-bg-base)
          );

          --wui-box-shadow-blue: color-mix(in srgb, var(--wui-color-accent-100) 16%, transparent);

          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            var(--w3m-default)
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            var(--w3m-default)
          );

          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );

          --wui-accent-glass-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-accent-glass-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-accent-glass-020: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 20%,
            transparent
          );
          --wui-accent-glass-015: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 15%,
            transparent
          );
          --wui-accent-glass-010: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 10%,
            transparent
          );
          --wui-accent-glass-005: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 5%,
            transparent
          );
          --wui-color-accent-002: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 2%,
            transparent
          );

          --wui-color-fg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-base-100)
          );
          --wui-color-fg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-base-125)
          );
          --wui-color-fg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-base-150)
          );
          --wui-color-fg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-base-175)
          );
          --wui-color-fg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-base-200)
          );
          --wui-color-fg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-base-225)
          );
          --wui-color-fg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-base-250)
          );
          --wui-color-fg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-base-275)
          );
          --wui-color-fg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-base-300)
          );

          --wui-color-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-base-100)
          );
          --wui-color-bg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-base-125)
          );
          --wui-color-bg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-base-150)
          );
          --wui-color-bg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-base-175)
          );
          --wui-color-bg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-base-200)
          );
          --wui-color-bg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-base-225)
          );
          --wui-color-bg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-base-250)
          );
          --wui-color-bg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-base-275)
          );
          --wui-color-bg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-base-300)
          );

          --wui-color-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-100)
          );
          --wui-color-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-100)
          );

          --wui-icon-box-bg-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-error-base-100)
          );
          --wui-icon-box-bg-accent-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-blue-base-100)
          );
          --wui-icon-box-bg-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-success-base-100)
          );
          --wui-icon-box-bg-inverse-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-inverse-base-100)
          );

          --wui-all-wallets-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-all-wallets-bg-base-100)
          );

          --wui-avatar-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-avatar-border-base)
          );

          --wui-thumbnail-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-thumbnail-border-base)
          );
        }
      }
    `,light:q`
      :root {
        --w3m-color-mix: ${vn((t==null?void 0:t["--w3m-color-mix"])||"#fff")};
        --w3m-accent: ${vn((t==null?void 0:t["--w3m-accent"])||"#47a1ff")};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: #191a1a;

        --wui-color-blue-base-100: #47a1ff;

        --wui-color-accent-base-100: var(--w3m-accent);
        --wui-color-accent-base-090: #59aaff;
        --wui-color-accent-base-080: #6cb4ff;

        --wui-accent-glass-base-090: rgba(71, 161, 255, 0.9);
        --wui-accent-glass-base-080: rgba(71, 161, 255, 0.8);
        --wui-accent-glass-base-020: rgba(71, 161, 255, 0.2);
        --wui-accent-glass-base-015: rgba(71, 161, 255, 0.15);
        --wui-accent-glass-base-010: rgba(71, 161, 255, 0.1);
        --wui-accent-glass-base-005: rgba(71, 161, 255, 0.05);
        --wui-accent-glass-base-002: rgba(71, 161, 255, 0.02);

        --wui-color-fg-base-100: #e4e7e7;
        --wui-color-fg-base-125: #d0d5d5;
        --wui-color-fg-base-150: #a8b1b1;
        --wui-color-fg-base-175: #a8b0b0;
        --wui-color-fg-base-200: #949e9e;
        --wui-color-fg-base-225: #868f8f;
        --wui-color-fg-base-250: #788080;
        --wui-color-fg-base-275: #788181;
        --wui-color-fg-base-300: #6e7777;

        --wui-color-bg-base-100: #141414;
        --wui-color-bg-base-125: #191a1a;
        --wui-color-bg-base-150: #1e1f1f;
        --wui-color-bg-base-175: #222525;
        --wui-color-bg-base-200: #272a2a;
        --wui-color-bg-base-225: #2c3030;
        --wui-color-bg-base-250: #313535;
        --wui-color-bg-base-275: #363b3b;
        --wui-color-bg-base-300: #3b4040;

        --wui-color-success-base-100: #26d962;
        --wui-color-error-base-100: #f25a67;

        --wui-success-glass-001: rgba(38, 217, 98, 0.01);
        --wui-success-glass-002: rgba(38, 217, 98, 0.02);
        --wui-success-glass-005: rgba(38, 217, 98, 0.05);
        --wui-success-glass-010: rgba(38, 217, 98, 0.1);
        --wui-success-glass-015: rgba(38, 217, 98, 0.15);
        --wui-success-glass-020: rgba(38, 217, 98, 0.2);
        --wui-success-glass-025: rgba(38, 217, 98, 0.25);
        --wui-success-glass-030: rgba(38, 217, 98, 0.3);
        --wui-success-glass-060: rgba(38, 217, 98, 0.6);
        --wui-success-glass-080: rgba(38, 217, 98, 0.8);

        --wui-icon-box-bg-error-base-100: #3c2426;
        --wui-icon-box-bg-blue-base-100: #20303f;
        --wui-icon-box-bg-success-base-100: var(--wui-success-glass-015);
        --wui-icon-box-bg-inverse-base-100: #243240;

        --wui-all-wallets-bg-base-100: #222b35;

        --wui-avatar-border-base: #252525;

        --wui-thumbnail-border-base: #252525;

        --wui-gray-glass-001: rgba(255, 255, 255, 0.01);
        --wui-gray-glass-002: rgba(255, 255, 255, 0.02);
        --wui-gray-glass-005: rgba(255, 255, 255, 0.05);
        --wui-gray-glass-010: rgba(255, 255, 255, 0.1);
        --wui-gray-glass-015: rgba(255, 255, 255, 0.15);
        --wui-gray-glass-020: rgba(255, 255, 255, 0.2);
        --wui-gray-glass-025: rgba(255, 255, 255, 0.25);
        --wui-gray-glass-030: rgba(255, 255, 255, 0.3);
        --wui-gray-glass-060: rgba(255, 255, 255, 0.6);
        --wui-gray-glass-080: rgba(255, 255, 255, 0.8);
      }
    `,dark:q`
      :root {
        --w3m-color-mix: ${vn((t==null?void 0:t["--w3m-color-mix"])||"#000")};
        --w3m-accent: ${vn((t==null?void 0:t["--w3m-accent"])||"#3396ff")};
        --w3m-default: #000;

        --wui-color-modal-bg-base: #fff;

        --wui-color-blue-base-100: #3396ff;

        --wui-color-accent-base-100: var(--w3m-accent);
        --wui-color-accent-base-090: #2d7dd2;
        --wui-color-accent-base-080: #2978cc;

        --wui-accent-glass-base-090: rgba(51, 150, 255, 0.9);
        --wui-accent-glass-base-080: rgba(51, 150, 255, 0.8);
        --wui-accent-glass-base-020: rgba(51, 150, 255, 0.2);
        --wui-accent-glass-base-015: rgba(51, 150, 255, 0.15);
        --wui-accent-glass-base-010: rgba(51, 150, 255, 0.1);
        --wui-accent-glass-base-005: rgba(51, 150, 255, 0.05);
        --wui-accent-glass-base-002: rgba(51, 150, 255, 0.02);

        --wui-color-fg-base-100: #141414;
        --wui-color-fg-base-125: #2d3131;
        --wui-color-fg-base-150: #474d4d;
        --wui-color-fg-base-175: #636d6d;
        --wui-color-fg-base-200: #798686;
        --wui-color-fg-base-225: #828f8f;
        --wui-color-fg-base-250: #8b9797;
        --wui-color-fg-base-275: #95a0a0;
        --wui-color-fg-base-300: #9ea9a9;

        --wui-color-bg-base-100: #ffffff;
        --wui-color-bg-base-125: #f5fafa;
        --wui-color-bg-base-150: #f3f8f8;
        --wui-color-bg-base-175: #eef4f4;
        --wui-color-bg-base-200: #eaf1f1;
        --wui-color-bg-base-225: #e5eded;
        --wui-color-bg-base-250: #e1e9e9;
        --wui-color-bg-base-275: #dce7e7;
        --wui-color-bg-base-300: #d8e3e3;

        --wui-color-success-base-100: #26b562;
        --wui-color-error-base-100: #f05142;

        --wui-success-glass-001: rgba(38, 181, 98, 0.01);
        --wui-success-glass-002: rgba(38, 181, 98, 0.02);
        --wui-success-glass-005: rgba(38, 181, 98, 0.05);
        --wui-success-glass-010: rgba(38, 181, 98, 0.1);
        --wui-success-glass-015: rgba(38, 181, 98, 0.15);
        --wui-success-glass-020: rgba(38, 181, 98, 0.2);
        --wui-success-glass-025: rgba(38, 181, 98, 0.25);
        --wui-success-glass-030: rgba(38, 181, 98, 0.3);
        --wui-success-glass-060: rgba(38, 181, 98, 0.6);
        --wui-success-glass-080: rgba(38, 181, 98, 0.8);

        --wui-icon-box-bg-error-base-100: #f4dfdd;
        --wui-icon-box-bg-blue-base-100: #d9ecfb;
        --wui-icon-box-bg-success-base-100: #daf0e4;
        --wui-icon-box-bg-inverse-base-100: #dcecfc;

        --wui-all-wallets-bg-base-100: #e8f1fa;

        --wui-avatar-border-base: #f3f4f4;

        --wui-thumbnail-border-base: #eaefef;

        --wui-gray-glass-001: rgba(0, 0, 0, 0.01);
        --wui-gray-glass-002: rgba(0, 0, 0, 0.02);
        --wui-gray-glass-005: rgba(0, 0, 0, 0.05);
        --wui-gray-glass-010: rgba(0, 0, 0, 0.1);
        --wui-gray-glass-015: rgba(0, 0, 0, 0.15);
        --wui-gray-glass-020: rgba(0, 0, 0, 0.2);
        --wui-gray-glass-025: rgba(0, 0, 0, 0.25);
        --wui-gray-glass-030: rgba(0, 0, 0, 0.3);
        --wui-gray-glass-060: rgba(0, 0, 0, 0.6);
        --wui-gray-glass-080: rgba(0, 0, 0, 0.8);
      }
    `}}const pe=q`
  *,
  *::after,
  *::before,
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--wui-font-family);
    backface-visibility: hidden;
  }
`,Ye=q`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    outline: none;
    border: 1px solid transparent;
    column-gap: var(--wui-spacing-3xs);
    background-color: transparent;
    text-decoration: none;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-gray-glass-005);
    }

    button:active:enabled {
      transition: all var(--wui-ease-out-power-2) var(--wui-duration-sm);
      background-color: var(--wui-gray-glass-010);
    }

    button[data-variant='fill']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='accentBg']:hover:enabled {
      background: var(--wui-accent-glass-015);
    }

    button[data-variant='accentBg']:active:enabled {
      background: var(--wui-accent-glass-020);
    }
  }

  button:disabled {
    cursor: not-allowed;
    background-color: var(--wui-gray-glass-005);
  }

  button[data-variant='shade']:disabled,
  button[data-variant='accent']:disabled,
  button[data-variant='accentBg']:disabled {
    background-color: var(--wui-gray-glass-010);
    color: var(--wui-gray-glass-015);
    filter: grayscale(1);
  }

  button:disabled > wui-wallet-image,
  button:disabled > wui-all-wallets-image,
  button:disabled > wui-network-image,
  button:disabled > wui-image,
  button:disabled > wui-icon-box,
  button:disabled > wui-transaction-visual,
  button:disabled > wui-logo {
    filter: grayscale(1);
  }

  button:focus-visible,
  a:focus-visible {
    border: 1px solid var(--wui-color-accent-100);
    background-color: var(--wui-gray-glass-005);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-variant='fill']:focus-visible {
    background-color: var(--wui-color-accent-090);
  }

  button[data-variant='fill'] {
    color: var(--wui-color-inverse-100);
    background-color: var(--wui-color-accent-100);
  }

  button[data-variant='fill']:disabled {
    color: var(--wui-gray-glass-015);
    background-color: var(--wui-gray-glass-015);
  }

  button[data-variant='fill']:disabled > wui-icon {
    color: var(--wui-gray-glass-015);
  }

  button[data-variant='shade'] {
    color: var(--wui-color-fg-200);
  }

  button[data-variant='accent'],
  button[data-variant='accentBg'] {
    color: var(--wui-color-accent-100);
  }

  button[data-variant='accentBg'] {
    background: var(--wui-accent-glass-010);
    border: 1px solid var(--wui-accent-glass-010);
  }

  button[data-variant='fullWidth'] {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    height: 56px;
    border: none;
    background-color: var(--wui-gray-glass-002);
    color: var(--wui-color-fg-200);
    gap: var(--wui-spacing-xs);
  }

  button:active:enabled {
    background-color: var(--wui-gray-glass-010);
  }

  button[data-variant='fill']:active:enabled {
    background-color: var(--wui-color-accent-080);
    border: 1px solid var(--wui-gray-glass-010);
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`,Od=q`
  .wui-color-inherit {
    color: var(--wui-color-inherit);
  }

  .wui-color-accent-100 {
    color: var(--wui-color-accent-100);
  }

  .wui-color-error-100 {
    color: var(--wui-color-error-100);
  }

  .wui-color-success-100 {
    color: var(--wui-color-success-100);
  }

  .wui-color-inverse-100 {
    color: var(--wui-color-inverse-100);
  }

  .wui-color-inverse-000 {
    color: var(--wui-color-inverse-000);
  }

  .wui-color-fg-100 {
    color: var(--wui-color-fg-100);
  }

  .wui-color-fg-200 {
    color: var(--wui-color-fg-200);
  }

  .wui-color-fg-300 {
    color: var(--wui-color-fg-300);
  }

  .wui-bg-color-inherit {
    background-color: var(--wui-color-inherit);
  }

  .wui-bg-color-blue-100 {
    background-color: var(--wui-color-accent-100);
  }

  .wui-bg-color-error-100 {
    background-color: var(--wui-color-error-100);
  }

  .wui-bg-color-success-100 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-inverse-100 {
    background-color: var(--wui-color-inverse-100);
  }

  .wui-bg-color-inverse-000 {
    background-color: var(--wui-color-inverse-000);
  }

  .wui-bg-color-fg-100 {
    background-color: var(--wui-color-fg-100);
  }

  .wui-bg-color-fg-200 {
    background-color: var(--wui-color-fg-200);
  }

  .wui-bg-color-fg-300 {
    background-color: var(--wui-color-fg-300);
  }
`;function n3(t,e){const{kind:n,elements:r}=e;return{kind:n,elements:r,finisher(o){customElements.get(t)||customElements.define(t,o)}}}function r3(t,e){return customElements.get(t)||customElements.define(t,e),e}function z(t){return function(n){return typeof n=="function"?r3(t,n):n3(t,n)}}const i3=q`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    border: 1px solid var(--wui-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }
`;var o3=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Na=class extends H{render(){return $`<slot></slot>`}};Na.styles=[pe,i3];Na=o3([z("wui-card")],Na);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s3={attribute:!0,type:String,converter:Oa,reflect:!1,hasChanged:Dd},a3=(t=s3,e,n)=>{const{kind:r,metadata:o}=n;let i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),i.set(n.name,t),r==="accessor"){const{name:s}=n;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(s,c,t)},init(a){return a!==void 0&&this.P(s,void 0,t),a}}}if(r==="setter"){const{name:s}=n;return function(a){const c=this[s];e.call(this,a),this.requestUpdate(s,c,t)}}throw Error("Unsupported decorator location: "+r)};function D(t){return(e,n)=>typeof n=="object"?a3(t,e,n):((r,o,i)=>{const s=o.hasOwnProperty(i);return o.constructor.createProperty(i,s?{...r,wrapped:!0}:r),s?Object.getOwnPropertyDescriptor(o,i):void 0})(t,e,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ee(t){return D({...t,state:!0,attribute:!1})}const c3=q`
  :host {
    display: flex;
    aspect-ratio: 1 / 1;
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }
`,l3=K`<svg fill="none" viewBox="0 0 24 24">
  <path
    style="fill: var(--wui-color-accent-100);"
    d="M10.2 6.6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM21 6.6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM10.2 17.4a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM21 17.4a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0Z"
  />
</svg>`,u3=K`
<svg width="36" height="36">
  <path
    d="M28.724 0H7.271A7.269 7.269 0 0 0 0 7.272v21.46A7.268 7.268 0 0 0 7.271 36H28.73A7.272 7.272 0 0 0 36 28.728V7.272A7.275 7.275 0 0 0 28.724 0Z"
    fill="url(#a)"
  />
  <path
    d="m17.845 8.271.729-1.26a1.64 1.64 0 1 1 2.843 1.638l-7.023 12.159h5.08c1.646 0 2.569 1.935 1.853 3.276H6.434a1.632 1.632 0 0 1-1.638-1.638c0-.909.73-1.638 1.638-1.638h4.176l5.345-9.265-1.67-2.898a1.642 1.642 0 0 1 2.844-1.638l.716 1.264Zm-6.317 17.5-1.575 2.732a1.64 1.64 0 1 1-2.844-1.638l1.17-2.025c1.323-.41 2.398-.095 3.249.931Zm13.56-4.954h4.262c.909 0 1.638.729 1.638 1.638 0 .909-.73 1.638-1.638 1.638h-2.367l1.597 2.772c.45.788.185 1.782-.602 2.241a1.642 1.642 0 0 1-2.241-.603c-2.69-4.666-4.711-8.159-6.052-10.485-1.372-2.367-.391-4.743.576-5.549 1.075 1.846 2.682 4.631 4.828 8.348Z"
    fill="#fff"
  />
  <defs>
    <linearGradient id="a" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#18BFFB" />
      <stop offset="1" stop-color="#2072F3" />
    </linearGradient>
  </defs>
</svg>`,d3=K`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#000" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M28.77 23.3c-.69 1.99-2.75 5.52-4.87 5.56-1.4.03-1.86-.84-3.46-.84-1.61 0-2.12.81-3.45.86-2.25.1-5.72-5.1-5.72-9.62 0-4.15 2.9-6.2 5.42-6.25 1.36-.02 2.64.92 3.47.92.83 0 2.38-1.13 4.02-.97.68.03 2.6.28 3.84 2.08-3.27 2.14-2.76 6.61.75 8.25ZM24.2 7.88c-2.47.1-4.49 2.69-4.2 4.84 2.28.17 4.47-2.39 4.2-4.84Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`,f3=K`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 1.99a1 1 0 0 1 1 1v7.58l2.46-2.46a1 1 0 0 1 1.41 1.42L7.7 13.69a1 1 0 0 1-1.41 0L2.12 9.53A1 1 0 0 1 3.54 8.1L6 10.57V3a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`,h3=K`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M13 7.99a1 1 0 0 1-1 1H4.4l2.46 2.46a1 1 0 1 1-1.41 1.41L1.29 8.7a1 1 0 0 1 0-1.41L5.46 3.1a1 1 0 0 1 1.41 1.42L4.41 6.99H12a1 1 0 0 1 1 1Z"
    clip-rule="evenodd"
  />
</svg>`,p3=K`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M1 7.99a1 1 0 0 1 1-1h7.58L7.12 4.53A1 1 0 1 1 8.54 3.1l4.16 4.17a1 1 0 0 1 0 1.41l-4.16 4.17a1 1 0 1 1-1.42-1.41l2.46-2.46H2a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`,g3=K`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 13.99a1 1 0 0 1-1-1V5.4L3.54 7.86a1 1 0 0 1-1.42-1.41L6.3 2.28a1 1 0 0 1 1.41 0l4.17 4.17a1 1 0 1 1-1.41 1.41L8 5.4v7.59a1 1 0 0 1-1 1Z"
    clip-rule="evenodd"
  />
</svg>`,m3=K`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4 6.4a1 1 0 0 1-.46.89 6.98 6.98 0 0 0 .38 6.18A7 7 0 0 0 16.46 7.3a1 1 0 0 1-.47-.92 7 7 0 0 0-12 .03Zm-2.02-.5a9 9 0 1 1 16.03 8.2A9 9 0 0 1 1.98 5.9Z"
    clip-rule="evenodd"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.03 8.63c-1.46-.3-2.72-.75-3.6-1.35l-.02-.01-.14-.11a1 1 0 0 1 1.2-1.6l.1.08c.6.4 1.52.74 2.69 1 .16-.99.39-1.88.67-2.65.3-.79.68-1.5 1.15-2.02A2.58 2.58 0 0 1 9.99 1c.8 0 1.45.44 1.92.97.47.52.84 1.23 1.14 2.02.29.77.52 1.66.68 2.64a8 8 0 0 0 2.7-1l.26-.18h.48a1 1 0 0 1 .12 2c-.86.51-2.01.91-3.34 1.18a22.24 22.24 0 0 1-.03 3.19c1.45.29 2.7.73 3.58 1.31a1 1 0 0 1-1.1 1.68c-.6-.4-1.56-.76-2.75-1-.15.8-.36 1.55-.6 2.2-.3.79-.67 1.5-1.14 2.02-.47.53-1.12.97-1.92.97-.8 0-1.45-.44-1.91-.97a6.51 6.51 0 0 1-1.15-2.02c-.24-.65-.44-1.4-.6-2.2-1.18.24-2.13.6-2.73.99a1 1 0 1 1-1.1-1.67c.88-.58 2.12-1.03 3.57-1.31a22.03 22.03 0 0 1-.04-3.2Zm2.2-1.7c.15-.86.34-1.61.58-2.24.24-.65.51-1.12.76-1.4.25-.28.4-.29.42-.29.03 0 .17.01.42.3.25.27.52.74.77 1.4.23.62.43 1.37.57 2.22a19.96 19.96 0 0 1-3.52 0Zm-.18 4.6a20.1 20.1 0 0 1-.03-2.62 21.95 21.95 0 0 0 3.94 0 20.4 20.4 0 0 1-.03 2.63 21.97 21.97 0 0 0-3.88 0Zm.27 2c.13.66.3 1.26.49 1.78.24.65.51 1.12.76 1.4.25.28.4.29.42.29.03 0 .17-.01.42-.3.25-.27.52-.74.77-1.4.19-.5.36-1.1.49-1.78a20.03 20.03 0 0 0-3.35 0Z"
    clip-rule="evenodd"
  />
</svg>`,w3=K`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M12.04 2.65c.47.3.6.91.3 1.38l-5.78 9a1 1 0 0 1-1.61.1L1.73 9.27A1 1 0 1 1 3.27 8L5.6 10.8l5.05-7.85a1 1 0 0 1 1.38-.3Z"
    clip-rule="evenodd"
  />
</svg>`,b3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M1.46 4.96a1 1 0 0 1 1.41 0L8 10.09l5.13-5.13a1 1 0 1 1 1.41 1.41l-5.83 5.84a1 1 0 0 1-1.42 0L1.46 6.37a1 1 0 0 1 0-1.41Z"
    clip-rule="evenodd"
  />
</svg>`,y3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M11.04 1.46a1 1 0 0 1 0 1.41L5.91 8l5.13 5.13a1 1 0 1 1-1.41 1.41L3.79 8.71a1 1 0 0 1 0-1.42l5.84-5.83a1 1 0 0 1 1.41 0Z"
    clip-rule="evenodd"
  />
</svg>`,v3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.96 14.54a1 1 0 0 1 0-1.41L10.09 8 4.96 2.87a1 1 0 0 1 1.41-1.41l5.84 5.83a1 1 0 0 1 0 1.42l-5.84 5.83a1 1 0 0 1-1.41 0Z"
    clip-rule="evenodd"
  />
</svg>`,x3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M14.54 11.04a1 1 0 0 1-1.41 0L8 5.92l-5.13 5.12a1 1 0 1 1-1.41-1.41l5.83-5.84a1 1 0 0 1 1.42 0l5.83 5.84a1 1 0 0 1 0 1.41Z"
    clip-rule="evenodd"
  />
</svg>`,E3=K`<svg width="36" height="36" fill="none">
  <path
    fill="#fff"
    fill-opacity=".05"
    d="M0 14.94c0-5.55 0-8.326 1.182-10.4a9 9 0 0 1 3.359-3.358C6.614 0 9.389 0 14.94 0h6.12c5.55 0 8.326 0 10.4 1.182a9 9 0 0 1 3.358 3.359C36 6.614 36 9.389 36 14.94v6.12c0 5.55 0 8.326-1.182 10.4a9 9 0 0 1-3.359 3.358C29.386 36 26.611 36 21.06 36h-6.12c-5.55 0-8.326 0-10.4-1.182a9 9 0 0 1-3.358-3.359C0 29.386 0 26.611 0 21.06v-6.12Z"
  />
  <path
    stroke="#fff"
    stroke-opacity=".05"
    d="M14.94.5h6.12c2.785 0 4.84 0 6.46.146 1.612.144 2.743.43 3.691.97a8.5 8.5 0 0 1 3.172 3.173c.541.948.826 2.08.971 3.692.145 1.62.146 3.675.146 6.459v6.12c0 2.785 0 4.84-.146 6.46-.145 1.612-.43 2.743-.97 3.691a8.5 8.5 0 0 1-3.173 3.172c-.948.541-2.08.826-3.692.971-1.62.145-3.674.146-6.459.146h-6.12c-2.784 0-4.84 0-6.46-.146-1.612-.145-2.743-.43-3.691-.97a8.5 8.5 0 0 1-3.172-3.173c-.541-.948-.827-2.08-.971-3.692C.5 25.9.5 23.845.5 21.06v-6.12c0-2.784 0-4.84.146-6.46.144-1.612.43-2.743.97-3.691A8.5 8.5 0 0 1 4.79 1.617C5.737 1.076 6.869.79 8.48.646 10.1.5 12.156.5 14.94.5Z"
  />
  <path
    fill="url(#a)"
    d="M17.998 10.8h12.469a14.397 14.397 0 0 0-24.938.001l6.234 10.798.006-.001a7.19 7.19 0 0 1 6.23-10.799Z"
  />
  <path
    fill="url(#b)"
    d="m24.237 21.598-6.234 10.798A14.397 14.397 0 0 0 30.47 10.798H18.002l-.002.006a7.191 7.191 0 0 1 6.237 10.794Z"
  />
  <path
    fill="url(#c)"
    d="M11.765 21.601 5.531 10.803A14.396 14.396 0 0 0 18.001 32.4l6.235-10.798-.004-.004a7.19 7.19 0 0 1-12.466.004Z"
  />
  <path fill="#fff" d="M18 25.2a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4Z" />
  <path fill="#1A73E8" d="M18 23.7a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4Z" />
  <defs>
    <linearGradient
      id="a"
      x1="6.294"
      x2="41.1"
      y1="5.995"
      y2="5.995"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#D93025" />
      <stop offset="1" stop-color="#EA4335" />
    </linearGradient>
    <linearGradient
      id="b"
      x1="20.953"
      x2="37.194"
      y1="32.143"
      y2="2.701"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FCC934" />
      <stop offset="1" stop-color="#FBBC04" />
    </linearGradient>
    <linearGradient
      id="c"
      x1="25.873"
      x2="9.632"
      y1="31.2"
      y2="1.759"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#1E8E3E" />
      <stop offset="1" stop-color="#34A853" />
    </linearGradient>
  </defs>
</svg>`,_3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 2.99a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-7 5a7 7 0 1 1 14 0 7 7 0 0 1-14 0Zm7-4a1 1 0 0 1 1 1v2.58l1.85 1.85a1 1 0 0 1-1.41 1.42L6.29 8.69A1 1 0 0 1 6 8v-3a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`,C3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M2.54 2.54a1 1 0 0 1 1.42 0L8 6.6l4.04-4.05a1 1 0 1 1 1.42 1.42L9.4 8l4.05 4.04a1 1 0 0 1-1.42 1.42L8 9.4l-4.04 4.05a1 1 0 0 1-1.42-1.42L6.6 8 2.54 3.96a1 1 0 0 1 0-1.42Z"
    clip-rule="evenodd"
  />
</svg>`,S3=K`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10 3a7 7 0 0 0-6.85 8.44l8.29-8.3C10.97 3.06 10.49 3 10 3Zm3.49.93-9.56 9.56c.32.55.71 1.06 1.16 1.5L15 5.1a7.03 7.03 0 0 0-1.5-1.16Zm2.7 2.8-9.46 9.46a7 7 0 0 0 9.46-9.46ZM1.99 5.9A9 9 0 1 1 18 14.09 9 9 0 0 1 1.98 5.91Z"
    clip-rule="evenodd"
  />
</svg>`,A3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm10.66-2.65a1 1 0 0 1 .23 1.06L9.83 9.24a1 1 0 0 1-.59.58l-2.83 1.06A1 1 0 0 1 5.13 9.6l1.06-2.82a1 1 0 0 1 .58-.59L9.6 5.12a1 1 0 0 1 1.06.23ZM7.9 7.89l-.13.35.35-.13.12-.35-.34.13Z"
    clip-rule="evenodd"
  />
</svg>`,T3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.5 0h1.67c.68 0 1.26 0 1.73.04.5.05.97.14 1.42.4.52.3.95.72 1.24 1.24.26.45.35.92.4 1.42.04.47.04 1.05.04 1.73V6.5c0 .69 0 1.26-.04 1.74-.05.5-.14.97-.4 1.41-.3.52-.72.95-1.24 1.25-.45.25-.92.35-1.42.4-.43.03-.95.03-1.57.03 0 .62 0 1.14-.04 1.57-.04.5-.14.97-.4 1.42-.29.52-.72.95-1.24 1.24-.44.26-.92.35-1.41.4-.48.04-1.05.04-1.74.04H4.83c-.68 0-1.26 0-1.73-.04-.5-.05-.97-.14-1.42-.4-.52-.3-.95-.72-1.24-1.24a3.39 3.39 0 0 1-.4-1.42A20.9 20.9 0 0 1 0 11.17V9.5c0-.69 0-1.26.04-1.74.05-.5.14-.97.4-1.41.3-.52.72-.95 1.24-1.25.45-.25.92-.35 1.42-.4.43-.03.95-.03 1.57-.03 0-.62 0-1.14.04-1.57.04-.5.14-.97.4-1.42.29-.52.72-.95 1.24-1.24.44-.26.92-.35 1.41-.4A20.9 20.9 0 0 1 9.5 0ZM4.67 6.67c-.63 0-1.06 0-1.4.03-.35.03-.5.09-.6.14-.2.12-.38.3-.5.5-.05.1-.1.24-.14.6C2 8.32 2 8.8 2 9.54v1.59c0 .73 0 1.22.03 1.6.04.35.1.5.15.6.11.2.29.38.5.5.09.05.24.1.6.14.37.03.86.03 1.6.03h1.58c.74 0 1.22 0 1.6-.03.36-.04.5-.1.6-.15.2-.11.38-.29.5-.5.05-.09.1-.24.14-.6.03-.33.03-.76.03-1.39-.6 0-1.13 0-1.57-.04-.5-.04-.97-.14-1.41-.4-.52-.29-.95-.72-1.25-1.24a3.39 3.39 0 0 1-.4-1.41c-.03-.44-.03-.96-.03-1.57Zm3.27-4.64c-.36.04-.5.1-.6.15-.2.11-.38.29-.5.5-.05.09-.1.24-.14.6-.03.37-.03.86-.03 1.6v1.58c0 .74 0 1.22.03 1.6.03.36.09.5.14.6.12.2.3.38.5.5.1.05.24.1.6.14.38.03.86.03 1.6.03h1.59c.73 0 1.22 0 1.6-.03.35-.03.5-.09.6-.14.2-.12.38-.3.5-.5.05-.1.1-.24.14-.6.03-.38.03-.86.03-1.6V4.87c0-.73 0-1.22-.03-1.6a1.46 1.46 0 0 0-.15-.6c-.11-.2-.29-.38-.5-.5-.09-.05-.24-.1-.6-.14-.37-.03-.86-.03-1.6-.03H9.55c-.74 0-1.22 0-1.6.03Z"
    clip-rule="evenodd"
  />
</svg>`,I3=K` <svg fill="none" viewBox="0 0 13 4">
  <path fill="currentColor" d="M.5 0h12L8.9 3.13a3.76 3.76 0 0 1-4.8 0L.5 0Z" />
</svg>`,$3=K`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M13.66 2H6.34c-1.07 0-1.96 0-2.68.08-.74.08-1.42.25-2.01.68a4 4 0 0 0-.89.89c-.43.6-.6 1.27-.68 2.01C0 6.38 0 7.26 0 8.34v.89c0 1.07 0 1.96.08 2.68.08.74.25 1.42.68 2.01a4 4 0 0 0 .89.89c.6.43 1.27.6 2.01.68a27 27 0 0 0 2.68.08h7.32a27 27 0 0 0 2.68-.08 4.03 4.03 0 0 0 2.01-.68 4 4 0 0 0 .89-.89c.43-.6.6-1.27.68-2.01.08-.72.08-1.6.08-2.68v-.89c0-1.07 0-1.96-.08-2.68a4.04 4.04 0 0 0-.68-2.01 4 4 0 0 0-.89-.89c-.6-.43-1.27-.6-2.01-.68C15.62 2 14.74 2 13.66 2ZM2.82 4.38c.2-.14.48-.25 1.06-.31C4.48 4 5.25 4 6.4 4h7.2c1.15 0 1.93 0 2.52.07.58.06.86.17 1.06.31a2 2 0 0 1 .44.44c.14.2.25.48.31 1.06.07.6.07 1.37.07 2.52v.77c0 1.15 0 1.93-.07 2.52-.06.58-.17.86-.31 1.06a2 2 0 0 1-.44.44c-.2.14-.48.25-1.06.32-.6.06-1.37.06-2.52.06H6.4c-1.15 0-1.93 0-2.52-.06-.58-.07-.86-.18-1.06-.32a2 2 0 0 1-.44-.44c-.14-.2-.25-.48-.31-1.06C2 11.1 2 10.32 2 9.17V8.4c0-1.15 0-1.93.07-2.52.06-.58.17-.86.31-1.06a2 2 0 0 1 .44-.44Z"
    clip-rule="evenodd"
  />
  <path fill="currentColor" d="M6.14 17.57a1 1 0 1 0 0 2h7.72a1 1 0 1 0 0-2H6.14Z" />
</svg>`,D3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.07 1h.57a1 1 0 0 1 0 2h-.52c-.98 0-1.64 0-2.14.06-.48.05-.7.14-.84.24-.13.1-.25.22-.34.35-.1.14-.2.35-.25.83-.05.5-.05 1.16-.05 2.15v2.74c0 .99 0 1.65.05 2.15.05.48.14.7.25.83.1.14.2.25.34.35.14.1.36.2.84.25.5.05 1.16.05 2.14.05h.52a1 1 0 0 1 0 2h-.57c-.92 0-1.69 0-2.3-.07a3.6 3.6 0 0 1-1.8-.61c-.3-.22-.57-.49-.8-.8a3.6 3.6 0 0 1-.6-1.79C.5 11.11.5 10.35.5 9.43V6.58c0-.92 0-1.7.06-2.31a3.6 3.6 0 0 1 .62-1.8c.22-.3.48-.57.79-.79a3.6 3.6 0 0 1 1.8-.61C4.37 1 5.14 1 6.06 1ZM9.5 3a1 1 0 0 1 1.42 0l4.28 4.3a1 1 0 0 1 0 1.4L10.93 13a1 1 0 0 1-1.42-1.42L12.1 9H6.8a1 1 0 1 1 0-2h5.3L9.51 4.42a1 1 0 0 1 0-1.41Z"
    clip-rule="evenodd"
  />
</svg>`,P3=K`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5865F2" />
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M25.71 28.15C30.25 28 32 25.02 32 25.02c0-6.61-2.96-11.98-2.96-11.98-2.96-2.22-5.77-2.15-5.77-2.15l-.29.32c3.5 1.07 5.12 2.61 5.12 2.61a16.75 16.75 0 0 0-10.34-1.93l-.35.04a15.43 15.43 0 0 0-5.88 1.9s1.71-1.63 5.4-2.7l-.2-.24s-2.81-.07-5.77 2.15c0 0-2.96 5.37-2.96 11.98 0 0 1.73 2.98 6.27 3.13l1.37-1.7c-2.6-.79-3.6-2.43-3.6-2.43l.58.35.09.06.08.04.02.01.08.05a17.25 17.25 0 0 0 4.52 1.58 14.4 14.4 0 0 0 8.3-.86c.72-.27 1.52-.66 2.37-1.21 0 0-1.03 1.68-3.72 2.44.61.78 1.35 1.67 1.35 1.67Zm-9.55-9.6c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28.01-1.25-.93-2.28-2.1-2.28Zm7.5 0c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28 0-1.25-.93-2.28-2.1-2.28Z"
        clip-rule="evenodd"
      />
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
  </defs>
</svg>`,O3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M4.25 7a.63.63 0 0 0-.63.63v3.97c0 .28-.2.51-.47.54l-.75.07a.93.93 0 0 1-.9-.47A7.51 7.51 0 0 1 5.54.92a7.5 7.5 0 0 1 9.54 4.62c.12.35.06.72-.16 1-.74.97-1.68 1.78-2.6 2.44V4.44a.64.64 0 0 0-.63-.64h-1.06c-.35 0-.63.3-.63.64v5.5c0 .23-.12.42-.32.5l-.52.23V6.05c0-.36-.3-.64-.64-.64H7.45c-.35 0-.64.3-.64.64v4.97c0 .25-.17.46-.4.52a5.8 5.8 0 0 0-.45.11v-4c0-.36-.3-.65-.64-.65H4.25ZM14.07 12.4A7.49 7.49 0 0 1 3.6 14.08c4.09-.58 9.14-2.5 11.87-6.6v.03a7.56 7.56 0 0 1-1.41 4.91Z"
  />
</svg>`,R3=K`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.71 2.99a.57.57 0 0 0-.57.57 1 1 0 0 1-1 1c-.58 0-.96 0-1.24.03-.27.03-.37.07-.42.1a.97.97 0 0 0-.36.35c-.04.08-.09.21-.11.67a2.57 2.57 0 0 1 0 5.13c.02.45.07.6.11.66.09.15.21.28.36.36.07.04.21.1.67.12a2.57 2.57 0 0 1 5.12 0c.46-.03.6-.08.67-.12a.97.97 0 0 0 .36-.36c.03-.04.07-.14.1-.41.02-.29.03-.66.03-1.24a1 1 0 0 1 1-1 .57.57 0 0 0 0-1.15 1 1 0 0 1-1-1c0-.58 0-.95-.03-1.24a1.04 1.04 0 0 0-.1-.42.97.97 0 0 0-.36-.36 1.04 1.04 0 0 0-.42-.1c-.28-.02-.65-.02-1.24-.02a1 1 0 0 1-1-1 .57.57 0 0 0-.57-.57ZM5.15 13.98a1 1 0 0 0 .99-1v-.78a.57.57 0 0 1 1.14 0v.78a1 1 0 0 0 .99 1H8.36a66.26 66.26 0 0 0 .73 0 3.78 3.78 0 0 0 1.84-.38c.46-.26.85-.64 1.1-1.1.23-.4.32-.8.36-1.22.02-.2.03-.4.03-.63a2.57 2.57 0 0 0 0-4.75c0-.23-.01-.44-.03-.63a2.96 2.96 0 0 0-.35-1.22 2.97 2.97 0 0 0-1.1-1.1c-.4-.22-.8-.31-1.22-.35a8.7 8.7 0 0 0-.64-.04 2.57 2.57 0 0 0-4.74 0c-.23 0-.44.02-.63.04-.42.04-.83.13-1.22.35-.46.26-.84.64-1.1 1.1-.33.57-.37 1.2-.39 1.84a21.39 21.39 0 0 0 0 .72v.1a1 1 0 0 0 1 .99h.78a.57.57 0 0 1 0 1.15h-.77a1 1 0 0 0-1 .98v.1a63.87 63.87 0 0 0 0 .73c0 .64.05 1.27.38 1.83.26.47.64.85 1.1 1.11.56.32 1.2.37 1.84.38a20.93 20.93 0 0 0 .72 0h.1Z"
    clip-rule="evenodd"
  />
</svg>`,N3=K`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.74 3.99a1 1 0 0 1 1-1H11a1 1 0 0 1 1 1v6.26a1 1 0 0 1-2 0V6.4l-6.3 6.3a1 1 0 0 1-1.4-1.42l6.29-6.3H4.74a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`,k3=K`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1877F2" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M26 12.38h-2.89c-.92 0-1.61.38-1.61 1.34v1.66H26l-.36 4.5H21.5v12H17v-12h-3v-4.5h3V12.5c0-3.03 1.6-4.62 5.2-4.62H26v4.5Z"
        />
      </g>
    </g>
    <path
      fill="#1877F2"
      d="M40 20a20 20 0 1 0-23.13 19.76V25.78H11.8V20h5.07v-4.4c0-5.02 3-7.79 7.56-7.79 2.19 0 4.48.4 4.48.4v4.91h-2.53c-2.48 0-3.25 1.55-3.25 3.13V20h5.54l-.88 5.78h-4.66v13.98A20 20 0 0 0 40 20Z"
    />
    <path
      fill="#fff"
      d="m27.79 25.78.88-5.78h-5.55v-3.75c0-1.58.78-3.13 3.26-3.13h2.53V8.2s-2.3-.39-4.48-.39c-4.57 0-7.55 2.77-7.55 7.78V20H11.8v5.78h5.07v13.98a20.15 20.15 0 0 0 6.25 0V25.78h4.67Z"
    />
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`,M3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Zm2.63 5.25a1 1 0 0 1 1-1h8.75a1 1 0 1 1 0 2H3.63a1 1 0 0 1-1-1Zm2.62 5.25a1 1 0 0 1 1-1h3.5a1 1 0 0 1 0 2h-3.5a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`,U3=K`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1B1F23" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M8 19.89a12 12 0 1 1 15.8 11.38c-.6.12-.8-.26-.8-.57v-3.3c0-1.12-.4-1.85-.82-2.22 2.67-.3 5.48-1.31 5.48-5.92 0-1.31-.47-2.38-1.24-3.22.13-.3.54-1.52-.12-3.18 0 0-1-.32-3.3 1.23a11.54 11.54 0 0 0-6 0c-2.3-1.55-3.3-1.23-3.3-1.23a4.32 4.32 0 0 0-.12 3.18 4.64 4.64 0 0 0-1.24 3.22c0 4.6 2.8 5.63 5.47 5.93-.34.3-.65.83-.76 1.6-.69.31-2.42.84-3.5-1 0 0-.63-1.15-1.83-1.23 0 0-1.18-.02-.09.73 0 0 .8.37 1.34 1.76 0 0 .7 2.14 4.03 1.41v2.24c0 .31-.2.68-.8.57A12 12 0 0 1 8 19.9Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`,B3=K`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#fff" fill-opacity=".05" />
      <g clip-path="url(#c)">
        <path
          fill="#4285F4"
          d="M20 17.7v4.65h6.46a5.53 5.53 0 0 1-2.41 3.61l3.9 3.02c2.26-2.09 3.57-5.17 3.57-8.82 0-.85-.08-1.67-.22-2.46H20Z"
        />
        <path
          fill="#34A853"
          d="m13.27 22.17-.87.67-3.11 2.42A12 12 0 0 0 20 31.9c3.24 0 5.96-1.07 7.94-2.9l-3.9-3.03A7.15 7.15 0 0 1 20 27.12a7.16 7.16 0 0 1-6.72-4.94v-.01Z"
        />
        <path
          fill="#FBBC05"
          d="M9.29 14.5a11.85 11.85 0 0 0 0 10.76l3.99-3.1a7.19 7.19 0 0 1 0-4.55l-4-3.1Z"
        />
        <path
          fill="#EA4335"
          d="M20 12.66c1.77 0 3.34.61 4.6 1.8l3.43-3.44A11.51 11.51 0 0 0 20 7.89c-4.7 0-8.74 2.69-10.71 6.62l3.99 3.1A7.16 7.16 0 0 1 20 12.66Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`,L3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M8.51 5.66a.83.83 0 0 0-.57-.2.83.83 0 0 0-.52.28.8.8 0 0 0-.25.52 1 1 0 0 1-2 0c0-.75.34-1.43.81-1.91a2.75 2.75 0 0 1 4.78 1.92c0 1.24-.8 1.86-1.25 2.2l-.04.03c-.47.36-.5.43-.5.65a1 1 0 1 1-2 0c0-1.25.8-1.86 1.24-2.2l.04-.04c.47-.36.5-.43.5-.65 0-.3-.1-.49-.24-.6ZM9.12 11.87a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"
    clip-rule="evenodd"
  />
</svg>`,j3=K`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    d="M6 10.49a1 1 0 1 0 2 0v-2a1 1 0 0 0-2 0v2ZM7 4.49a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 14.99a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-7a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
    clip-rule="evenodd"
  />
</svg>`,F3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.83 1.34h6.34c.68 0 1.26 0 1.73.04.5.05.97.15 1.42.4.52.3.95.72 1.24 1.24.26.45.35.92.4 1.42.04.47.04 1.05.04 1.73v3.71c0 .69 0 1.26-.04 1.74-.05.5-.14.97-.4 1.41-.3.52-.72.95-1.24 1.25-.45.25-.92.35-1.42.4-.47.03-1.05.03-1.73.03H4.83c-.68 0-1.26 0-1.73-.04-.5-.04-.97-.14-1.42-.4-.52-.29-.95-.72-1.24-1.24a3.39 3.39 0 0 1-.4-1.41A20.9 20.9 0 0 1 0 9.88v-3.7c0-.7 0-1.27.04-1.74.05-.5.14-.97.4-1.42.3-.52.72-.95 1.24-1.24.45-.25.92-.35 1.42-.4.47-.04 1.05-.04 1.73-.04ZM3.28 3.38c-.36.03-.51.08-.6.14-.21.11-.39.29-.5.5a.8.8 0 0 0-.08.19l5.16 3.44c.45.3 1.03.3 1.48 0L13.9 4.2a.79.79 0 0 0-.08-.2c-.11-.2-.29-.38-.5-.5-.09-.05-.24-.1-.6-.13-.37-.04-.86-.04-1.6-.04H4.88c-.73 0-1.22 0-1.6.04ZM14 6.54 9.85 9.31a3.33 3.33 0 0 1-3.7 0L2 6.54v3.3c0 .74 0 1.22.03 1.6.04.36.1.5.15.6.11.2.29.38.5.5.09.05.24.1.6.14.37.03.86.03 1.6.03h6.25c.73 0 1.22 0 1.6-.03.35-.03.5-.09.6-.14.2-.12.38-.3.5-.5.05-.1.1-.24.14-.6.03-.38.03-.86.03-1.6v-3.3Z"
    clip-rule="evenodd"
  />
</svg>`,W3=K`<svg fill="none" viewBox="0 0 20 20">
  <path fill="currentColor" d="M10.81 5.81a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3 4.75A4.75 4.75 0 0 1 7.75 0h4.5A4.75 4.75 0 0 1 17 4.75v10.5A4.75 4.75 0 0 1 12.25 20h-4.5A4.75 4.75 0 0 1 3 15.25V4.75ZM7.75 2A2.75 2.75 0 0 0 5 4.75v10.5A2.75 2.75 0 0 0 7.75 18h4.5A2.75 2.75 0 0 0 15 15.25V4.75A2.75 2.75 0 0 0 12.25 2h-4.5Z"
    clip-rule="evenodd"
  />
</svg>`,z3=K`<svg fill="none" viewBox="0 0 22 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M16.32 13.62a3.14 3.14 0 1 1-.99 1.72l-1.6-.93a3.83 3.83 0 0 1-3.71 1 3.66 3.66 0 0 1-1.74-1l-1.6.94a3.14 3.14 0 1 1-1-1.73l1.6-.94a3.7 3.7 0 0 1 0-2 3.81 3.81 0 0 1 1.8-2.33c.29-.17.6-.3.92-.38V6.1a3.14 3.14 0 1 1 2 0l-.01.02v1.85H12a3.82 3.82 0 0 1 2.33 1.8 3.7 3.7 0 0 1 .39 2.91l1.6.93ZM2.6 16.54a1.14 1.14 0 0 0 1.98-1.14 1.14 1.14 0 0 0-1.98 1.14ZM11 2.01a1.14 1.14 0 1 0 0 2.28 1.14 1.14 0 0 0 0-2.28Zm1.68 10.45c.08-.19.14-.38.16-.58v-.05l.02-.13v-.13a1.92 1.92 0 0 0-.24-.8l-.11-.15a1.89 1.89 0 0 0-.74-.6 1.86 1.86 0 0 0-.77-.17h-.19a1.97 1.97 0 0 0-.89.34 1.98 1.98 0 0 0-.61.74 1.99 1.99 0 0 0-.16.9v.05a1.87 1.87 0 0 0 .24.74l.1.15c.12.16.26.3.42.42l.16.1.13.07.04.02a1.84 1.84 0 0 0 .76.17h.17a2 2 0 0 0 .91-.35 1.78 1.78 0 0 0 .52-.58l.03-.05a.84.84 0 0 0 .05-.11Zm5.15 4.5a1.14 1.14 0 0 0 1.14-1.97 1.13 1.13 0 0 0-1.55.41c-.32.55-.13 1.25.41 1.56Z"
    clip-rule="evenodd"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.63 9.43a1.5 1.5 0 1 0 1.5-2.6 1.5 1.5 0 0 0-1.5 2.6Zm.32-1.55a.5.5 0 0 1 .68-.19.5.5 0 0 1 .18.68.5.5 0 0 1-.68.19.5.5 0 0 1-.18-.68ZM17.94 8.88a1.5 1.5 0 1 1-2.6-1.5 1.5 1.5 0 1 1 2.6 1.5ZM16.9 7.69a.5.5 0 0 0-.68.19.5.5 0 0 0 .18.68.5.5 0 0 0 .68-.19.5.5 0 0 0-.18-.68ZM9.75 17.75a1.5 1.5 0 1 1 2.6 1.5 1.5 1.5 0 1 1-2.6-1.5Zm1.05 1.18a.5.5 0 0 0 .68-.18.5.5 0 0 0-.18-.68.5.5 0 0 0-.68.18.5.5 0 0 0 .18.68Z"
    clip-rule="evenodd"
  />
</svg>`,H3=K`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.13 1h1.71c1.46 0 2.63 0 3.56.1.97.1 1.8.33 2.53.85a5 5 0 0 1 1.1 1.11c.53.73.75 1.56.86 2.53.1.93.1 2.1.1 3.55v1.72c0 1.45 0 2.62-.1 3.55-.1.97-.33 1.8-.86 2.53a5 5 0 0 1-1.1 1.1c-.73.53-1.56.75-2.53.86-.93.1-2.1.1-3.55.1H9.13c-1.45 0-2.62 0-3.56-.1-.96-.1-1.8-.33-2.52-.85a5 5 0 0 1-1.1-1.11 5.05 5.05 0 0 1-.86-2.53c-.1-.93-.1-2.1-.1-3.55V9.14c0-1.45 0-2.62.1-3.55.1-.97.33-1.8.85-2.53a5 5 0 0 1 1.1-1.1 5.05 5.05 0 0 1 2.53-.86C6.51 1 7.67 1 9.13 1ZM5.79 3.09a3.1 3.1 0 0 0-1.57.48 3 3 0 0 0-.66.67c-.24.32-.4.77-.48 1.56-.1.82-.1 1.88-.1 3.4v1.6c0 1.15 0 2.04.05 2.76l.41-.42c.5-.5.93-.92 1.32-1.24.41-.33.86-.6 1.43-.7a3 3 0 0 1 .94 0c.35.06.66.2.95.37a17.11 17.11 0 0 0 .8.45c.1-.08.2-.2.41-.4l.04-.03a27 27 0 0 1 1.95-1.84 4.03 4.03 0 0 1 1.91-.94 4 4 0 0 1 1.25 0c.73.11 1.33.46 1.91.94l.64.55V9.2c0-1.52 0-2.58-.1-3.4a3.1 3.1 0 0 0-.48-1.56 3 3 0 0 0-.66-.67 3.1 3.1 0 0 0-1.56-.48C13.37 3 12.3 3 10.79 3h-1.6c-1.52 0-2.59 0-3.4.09Zm11.18 10-.04-.05a26.24 26.24 0 0 0-1.83-1.74c-.45-.36-.73-.48-.97-.52a2 2 0 0 0-.63 0c-.24.04-.51.16-.97.52-.46.38-1.01.93-1.83 1.74l-.02.02c-.17.18-.34.34-.49.47a2.04 2.04 0 0 1-1.08.5 1.97 1.97 0 0 1-1.25-.27l-.79-.46-.02-.02a.65.65 0 0 0-.24-.1 1 1 0 0 0-.31 0c-.08.02-.21.06-.49.28-.3.24-.65.59-1.2 1.14l-.56.56-.65.66a3 3 0 0 0 .62.6c.33.24.77.4 1.57.49.81.09 1.88.09 3.4.09h1.6c1.52 0 2.58 0 3.4-.09a3.1 3.1 0 0 0 1.56-.48 3 3 0 0 0 .66-.67c.24-.32.4-.77.49-1.56l.07-1.12Zm-8.02-1.03ZM4.99 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
    clip-rule="evenodd"
  />
</svg>`,V3=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M8 0a1 1 0 0 1 1 1v5.38a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1ZM5.26 2.6a1 1 0 0 1-.28 1.39 5.46 5.46 0 1 0 6.04 0 1 1 0 1 1 1.1-1.67 7.46 7.46 0 1 1-8.25 0 1 1 0 0 1 1.4.28Z"
    clip-rule="evenodd"
  />
</svg>`,Z3=K` <svg
  width="36"
  height="36"
  fill="none"
>
  <path
    d="M0 8a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8Z"
    fill="#fff"
    fill-opacity=".05"
  />
  <path
    d="m18.262 17.513-8.944 9.49v.01a2.417 2.417 0 0 0 3.56 1.452l.026-.017 10.061-5.803-4.703-5.132Z"
    fill="#EA4335"
  />
  <path
    d="m27.307 15.9-.008-.008-4.342-2.52-4.896 4.36 4.913 4.912 4.325-2.494a2.42 2.42 0 0 0 .008-4.25Z"
    fill="#FBBC04"
  />
  <path
    d="M9.318 8.997c-.05.202-.084.403-.084.622V26.39c0 .218.025.42.084.621l9.246-9.247-9.246-8.768Z"
    fill="#4285F4"
  />
  <path
    d="m18.33 18 4.627-4.628-10.053-5.828a2.427 2.427 0 0 0-3.586 1.444L18.329 18Z"
    fill="#34A853"
  />
  <path
    d="M8 .5h20A7.5 7.5 0 0 1 35.5 8v20a7.5 7.5 0 0 1-7.5 7.5H8A7.5 7.5 0 0 1 .5 28V8A7.5 7.5 0 0 1 8 .5Z"
    stroke="#fff"
    stroke-opacity=".05"
  />
</svg>`,G3=K`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M3 6a3 3 0 0 1 3-3h1a1 1 0 1 0 0-2H6a5 5 0 0 0-5 5v1a1 1 0 0 0 2 0V6ZM13 1a1 1 0 1 0 0 2h1a3 3 0 0 1 3 3v1a1 1 0 1 0 2 0V6a5 5 0 0 0-5-5h-1ZM3 13a1 1 0 1 0-2 0v1a5 5 0 0 0 5 5h1a1 1 0 1 0 0-2H6a3 3 0 0 1-3-3v-1ZM19 13a1 1 0 1 0-2 0v1a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1.01a5 5 0 0 0 5-5v-1ZM5.3 6.36c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05A1.5 1.5 0 0 0 9.2 8.14c.06-.2.06-.43.06-.89s0-.7-.06-.89A1.5 1.5 0 0 0 8.14 5.3c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06ZM10.8 6.36c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05a1.5 1.5 0 0 0 1.06-1.06c.06-.2.06-.43.06-.89s0-.7-.06-.89a1.5 1.5 0 0 0-1.06-1.06c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06ZM5.26 12.75c0-.46 0-.7.05-.89a1.5 1.5 0 0 1 1.06-1.06c.19-.05.42-.05.89-.05.46 0 .7 0 .88.05.52.14.93.54 1.06 1.06.06.2.06.43.06.89s0 .7-.06.89a1.5 1.5 0 0 1-1.06 1.06c-.19.05-.42.05-.88.05-.47 0-.7 0-.9-.05a1.5 1.5 0 0 1-1.05-1.06c-.05-.2-.05-.43-.05-.89ZM10.8 11.86c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05a1.5 1.5 0 0 0 1.06-1.06c.06-.2.06-.43.06-.89s0-.7-.06-.89a1.5 1.5 0 0 0-1.06-1.06c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06Z"
  />
</svg>`,q3=K`<svg fill="none" viewBox="0 0 14 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.94 1.04a1 1 0 0 1 .7 1.23l-.48 1.68a5.85 5.85 0 0 1 8.53 4.32 5.86 5.86 0 0 1-11.4 2.56 1 1 0 0 1 1.9-.57 3.86 3.86 0 1 0 1.83-4.5l1.87.53a1 1 0 0 1-.55 1.92l-4.1-1.15a1 1 0 0 1-.69-1.23l1.16-4.1a1 1 0 0 1 1.23-.7Z"
    clip-rule="evenodd"
  />
</svg>`,K3=K`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.36 4.21a5.14 5.14 0 1 0 0 10.29 5.14 5.14 0 0 0 0-10.29ZM1.64 9.36a7.71 7.71 0 1 1 14 4.47l2.52 2.5a1.29 1.29 0 1 1-1.82 1.83l-2.51-2.51A7.71 7.71 0 0 1 1.65 9.36Z"
    clip-rule="evenodd"
  />
</svg>`,Y3=K`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.76.3a1 1 0 0 1 0 1.4L4.07 4.4h9a1 1 0 1 1 0 2h-9l2.69 2.68a1 1 0 1 1-1.42 1.42L.95 6.09a1 1 0 0 1 0-1.4l4.4-4.4a1 1 0 0 1 1.4 0Zm6.49 9.21a1 1 0 0 1 1.41 0l4.39 4.4a1 1 0 0 1 0 1.4l-4.39 4.4a1 1 0 0 1-1.41-1.42l2.68-2.68h-9a1 1 0 0 1 0-2h9l-2.68-2.68a1 1 0 0 1 0-1.42Z"
    clip-rule="evenodd"
  />
</svg>`,J3=K`<svg width="10" height="10" viewBox="0 0 10 10">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.77986 0.566631C4.0589 0.845577 4.0589 1.29784 3.77986 1.57678L3.08261 2.2738H6.34184C6.73647 2.2738 7.05637 2.5936 7.05637 2.98808C7.05637 3.38257 6.73647 3.70237 6.34184 3.70237H3.08261L3.77986 4.39938C4.0589 4.67833 4.0589 5.13059 3.77986 5.40954C3.50082 5.68848 3.04841 5.68848 2.76937 5.40954L0.852346 3.49316C0.573306 3.21421 0.573306 2.76195 0.852346 2.48301L2.76937 0.566631C3.04841 0.287685 3.50082 0.287685 3.77986 0.566631ZM6.22 4.59102C6.49904 4.31208 6.95145 4.31208 7.23049 4.59102L9.14751 6.5074C9.42655 6.78634 9.42655 7.23861 9.14751 7.51755L7.23049 9.43393C6.95145 9.71287 6.49904 9.71287 6.22 9.43393C5.94096 9.15498 5.94096 8.70272 6.22 8.42377L6.91725 7.72676L3.65802 7.72676C3.26339 7.72676 2.94349 7.40696 2.94349 7.01247C2.94349 6.61798 3.26339 6.29819 3.65802 6.29819L6.91725 6.29819L6.22 5.60117C5.94096 5.32223 5.94096 4.86997 6.22 4.59102Z"
    clip-rule="evenodd"
  />
</svg>`,X3=K`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.48 2.18a1 1 0 0 1 1.41 0l2.68 2.68a1 1 0 1 1-1.41 1.42l-.98-.98v4.56a1 1 0 0 1-2 0V5.3l-.97.98A1 1 0 0 1 .79 4.86l2.69-2.68Zm6.34 2.93a1 1 0 0 1 1 1v4.56l.97-.98a1 1 0 1 1 1.42 1.42l-2.69 2.68a1 1 0 0 1-1.41 0l-2.68-2.68a1 1 0 0 1 1.41-1.42l.98.98V6.1a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`,Q3=K`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5865F2" />
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M25.71 28.15C30.25 28 32 25.02 32 25.02c0-6.61-2.96-11.98-2.96-11.98-2.96-2.22-5.77-2.15-5.77-2.15l-.29.32c3.5 1.07 5.12 2.61 5.12 2.61a16.75 16.75 0 0 0-10.34-1.93l-.35.04a15.43 15.43 0 0 0-5.88 1.9s1.71-1.63 5.4-2.7l-.2-.24s-2.81-.07-5.77 2.15c0 0-2.96 5.37-2.96 11.98 0 0 1.73 2.98 6.27 3.13l1.37-1.7c-2.6-.79-3.6-2.43-3.6-2.43l.58.35.09.06.08.04.02.01.08.05a17.25 17.25 0 0 0 4.52 1.58 14.4 14.4 0 0 0 8.3-.86c.72-.27 1.52-.66 2.37-1.21 0 0-1.03 1.68-3.72 2.44.61.78 1.35 1.67 1.35 1.67Zm-9.55-9.6c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28.01-1.25-.93-2.28-2.1-2.28Zm7.5 0c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28 0-1.25-.93-2.28-2.1-2.28Z"
        clip-rule="evenodd"
      />
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
  </defs>
</svg> `,ey=K`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5A3E85" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M18.22 25.7 20 23.91h3.34l2.1-2.1v-6.68H15.4v8.78h2.82v1.77Zm3.87-8.16h1.25v3.66H22.1v-3.66Zm-3.34 0H20v3.66h-1.25v-3.66ZM20 7.9a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm6.69 14.56-3.66 3.66h-2.72l-1.77 1.78h-1.88V26.1H13.3v-9.82l.94-2.4H26.7v8.56Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`,ty=K`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1D9BF0" />
      <path
        fill="#fff"
        d="M30 13.81c-.74.33-1.53.55-2.36.65.85-.51 1.5-1.32 1.8-2.27-.79.47-1.66.8-2.6 1a4.1 4.1 0 0 0-7 3.73c-3.4-.17-6.42-1.8-8.45-4.28a4.1 4.1 0 0 0 1.27 5.47c-.67-.02-1.3-.2-1.86-.5a4.1 4.1 0 0 0 3.3 4.07c-.58.15-1.21.19-1.86.07a4.1 4.1 0 0 0 3.83 2.85A8.25 8.25 0 0 1 10 26.3a11.62 11.62 0 0 0 6.29 1.84c7.62 0 11.92-6.44 11.66-12.2.8-.59 1.5-1.3 2.05-2.13Z"
      />
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
  </defs>
</svg>`,ny=K`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="m14.36 4.74.01.42c0 4.34-3.3 9.34-9.34 9.34A9.3 9.3 0 0 1 0 13.03a6.6 6.6 0 0 0 4.86-1.36 3.29 3.29 0 0 1-3.07-2.28c.5.1 1 .07 1.48-.06A3.28 3.28 0 0 1 .64 6.11v-.04c.46.26.97.4 1.49.41A3.29 3.29 0 0 1 1.11 2.1a9.32 9.32 0 0 0 6.77 3.43 3.28 3.28 0 0 1 5.6-3 6.59 6.59 0 0 0 2.08-.8 3.3 3.3 0 0 1-1.45 1.82A6.53 6.53 0 0 0 16 3.04c-.44.66-1 1.23-1.64 1.7Z"
  />
</svg>`,ry=K`<svg fill="none" viewBox="0 0 28 28">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M18.1 4.76c-.42-.73-1.33-1.01-2.09-.66l-1.42.66c-.37.18-.8.18-1.18 0l-1.4-.65a1.63 1.63 0 0 0-2.1.66l-.84 1.45c-.2.34-.53.59-.92.67l-1.7.35c-.83.17-1.39.94-1.3 1.78l.19 1.56c.04.39-.08.78-.33 1.07l-1.12 1.3c-.52.6-.52 1.5 0 2.11L5 16.38c.25.3.37.68.33 1.06l-.18 1.57c-.1.83.46 1.6 1.28 1.78l1.7.35c.4.08.73.32.93.66l.84 1.43a1.63 1.63 0 0 0 2.09.66l1.41-.66c.37-.17.8-.17 1.18 0l1.43.67c.76.35 1.66.07 2.08-.65l.86-1.45c.2-.34.54-.58.92-.66l1.68-.35A1.63 1.63 0 0 0 22.84 19l-.18-1.57a1.4 1.4 0 0 1 .33-1.06l1.12-1.32c.52-.6.52-1.5 0-2.11l-1.12-1.3a1.4 1.4 0 0 1-.33-1.07l.18-1.57c.1-.83-.46-1.6-1.28-1.77l-1.68-.35a1.4 1.4 0 0 1-.92-.66l-.86-1.47Zm-3.27-3.2a4.43 4.43 0 0 1 5.69 1.78l.54.93 1.07.22a4.43 4.43 0 0 1 3.5 4.84l-.11.96.7.83a4.43 4.43 0 0 1 .02 5.76l-.72.85.1.96a4.43 4.43 0 0 1-3.5 4.84l-1.06.22-.54.92a4.43 4.43 0 0 1-5.68 1.77l-.84-.4-.82.39a4.43 4.43 0 0 1-5.7-1.79l-.51-.89-1.09-.22a4.43 4.43 0 0 1-3.5-4.84l.1-.96-.72-.85a4.43 4.43 0 0 1 .01-5.76l.71-.83-.1-.95a4.43 4.43 0 0 1 3.5-4.84l1.08-.23.53-.9a4.43 4.43 0 0 1 5.7-1.8l.81.38.83-.39ZM18.2 9.4c.65.42.84 1.28.42 1.93l-4.4 6.87a1.4 1.4 0 0 1-2.26.14L9.5 15.39a1.4 1.4 0 0 1 2.15-1.8l1.23 1.48 3.38-5.26a1.4 1.4 0 0 1 1.93-.42Z"
    clip-rule="evenodd"
  />
</svg>`,iy=K`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="m4.1 12.43-.45-.78-.93-.2a1.65 1.65 0 0 1-1.31-1.8l.1-.86-.61-.71a1.65 1.65 0 0 1 0-2.16l.6-.7-.09-.85c-.1-.86.47-1.64 1.3-1.81l.94-.2.45-.78A1.65 1.65 0 0 1 6.23.9l.77.36.78-.36c.77-.36 1.69-.07 2.12.66l.47.8.91.2c.84.17 1.4.95 1.31 1.8l-.1.86.6.7c.54.62.54 1.54.01 2.16l-.6.71.09.86c.1.85-.47 1.63-1.3 1.8l-.92.2-.47.79a1.65 1.65 0 0 1-2.12.66L7 12.74l-.77.36c-.78.35-1.7.07-2.13-.67Zm5.74-6.9a1 1 0 1 0-1.68-1.07L6.32 7.3l-.55-.66a1 1 0 0 0-1.54 1.28l1.43 1.71a1 1 0 0 0 1.61-.1l2.57-4Z"
    clip-rule="evenodd"
  />
</svg>`,oy=K`
  <svg fill="none" viewBox="0 0 48 44">
    <path
      style="fill: var(--wui-color-bg-300);"
      d="M4.56 8.64c-1.23 1.68-1.23 4.08-1.23 8.88v8.96c0 4.8 0 7.2 1.23 8.88.39.55.87 1.02 1.41 1.42C7.65 38 10.05 38 14.85 38h14.3c4.8 0 7.2 0 8.88-1.22a6.4 6.4 0 0 0 1.41-1.42c.83-1.14 1.1-2.6 1.19-4.92a6.4 6.4 0 0 0 5.16-4.65c.21-.81.21-1.8.21-3.79 0-1.98 0-2.98-.22-3.79a6.4 6.4 0 0 0-5.15-4.65c-.1-2.32-.36-3.78-1.19-4.92a6.4 6.4 0 0 0-1.41-1.42C36.35 6 33.95 6 29.15 6h-14.3c-4.8 0-7.2 0-8.88 1.22a6.4 6.4 0 0 0-1.41 1.42Z"
    />
    <path
      style="fill: var(--wui-color-fg-200);"
      fill-rule="evenodd"
      d="M2.27 11.33a6.4 6.4 0 0 1 6.4-6.4h26.66a6.4 6.4 0 0 1 6.4 6.4v1.7a6.4 6.4 0 0 1 5.34 6.3v5.34a6.4 6.4 0 0 1-5.34 6.3v1.7a6.4 6.4 0 0 1-6.4 6.4H8.67a6.4 6.4 0 0 1-6.4-6.4V11.33ZM39.6 31.07h-6.93a9.07 9.07 0 1 1 0-18.14h6.93v-1.6a4.27 4.27 0 0 0-4.27-4.26H8.67a4.27 4.27 0 0 0-4.27 4.26v21.34a4.27 4.27 0 0 0 4.27 4.26h26.66a4.27 4.27 0 0 0 4.27-4.26v-1.6Zm-6.93-16a6.93 6.93 0 0 0 0 13.86h8a4.27 4.27 0 0 0 4.26-4.26v-5.34a4.27 4.27 0 0 0-4.26-4.26h-8Z"
      clip-rule="evenodd"
    />
  </svg>
`,sy=K`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 5.5c0-1.8 1.46-3.25 3.25-3.25H14.5c1.8 0 3.25 1.46 3.25 3.25v.28A3.25 3.25 0 0 1 20 8.88v2.24c0 1.45-.94 2.68-2.25 3.1v.28c0 1.8-1.46 3.25-3.25 3.25H3.25A3.25 3.25 0 0 1 0 14.5v-9Zm15.75 8.88h-2.38a4.38 4.38 0 0 1 0-8.76h2.38V5.5c0-.69-.56-1.25-1.25-1.25H3.25C2.56 4.25 2 4.81 2 5.5v9c0 .69.56 1.25 1.25 1.25H14.5c.69 0 1.25-.56 1.25-1.25v-.13Zm-2.38-6.76a2.37 2.37 0 1 0 0 4.75h3.38c.69 0 1.25-.55 1.25-1.24V8.87c0-.69-.56-1.24-1.25-1.24h-3.38Z"
    clip-rule="evenodd"
  />
</svg>`,ay=K`<svg fill="none" viewBox="0 0 96 67">
  <path
    fill="currentColor"
    d="M25.32 18.8a32.56 32.56 0 0 1 45.36 0l1.5 1.47c.63.62.63 1.61 0 2.22l-5.15 5.05c-.31.3-.82.3-1.14 0l-2.07-2.03a22.71 22.71 0 0 0-31.64 0l-2.22 2.18c-.31.3-.82.3-1.14 0l-5.15-5.05a1.55 1.55 0 0 1 0-2.22l1.65-1.62Zm56.02 10.44 4.59 4.5c.63.6.63 1.6 0 2.21l-20.7 20.26c-.62.61-1.63.61-2.26 0L48.28 41.83a.4.4 0 0 0-.56 0L33.03 56.21c-.63.61-1.64.61-2.27 0L10.07 35.95a1.55 1.55 0 0 1 0-2.22l4.59-4.5a1.63 1.63 0 0 1 2.27 0L31.6 43.63a.4.4 0 0 0 .57 0l14.69-14.38a1.63 1.63 0 0 1 2.26 0l14.69 14.38a.4.4 0 0 0 .57 0l14.68-14.38a1.63 1.63 0 0 1 2.27 0Z"
  />
  <path
    stroke="#000"
    stroke-opacity=".1"
    d="M25.67 19.15a32.06 32.06 0 0 1 44.66 0l1.5 1.48c.43.42.43 1.09 0 1.5l-5.15 5.05a.31.31 0 0 1-.44 0l-2.07-2.03a23.21 23.21 0 0 0-32.34 0l-2.22 2.18a.31.31 0 0 1-.44 0l-5.15-5.05a1.05 1.05 0 0 1 0-1.5l1.65-1.63ZM81 29.6l4.6 4.5c.42.41.42 1.09 0 1.5l-20.7 20.26c-.43.43-1.14.43-1.57 0L48.63 41.47a.9.9 0 0 0-1.26 0L32.68 55.85c-.43.43-1.14.43-1.57 0L10.42 35.6a1.05 1.05 0 0 1 0-1.5l4.59-4.5a1.13 1.13 0 0 1 1.57 0l14.68 14.38a.9.9 0 0 0 1.27 0l-.35-.35.35.35L47.22 29.6a1.13 1.13 0 0 1 1.56 0l14.7 14.38a.9.9 0 0 0 1.26 0L79.42 29.6a1.13 1.13 0 0 1 1.57 0Z"
  />
</svg>`,cy=K`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M11 6.67a1 1 0 1 0-2 0v2.66a1 1 0 0 0 2 0V6.67ZM10 14.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-7 9a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"
    clip-rule="evenodd"
  />
</svg>`,ly=K`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.687 0.557043C11.1462 0.671832 11.4254 1.13706 11.3106 1.59615C11.2044 2.02082 11.0975 2.51184 10.9822 3.04102C10.7176 4.25623 10.4091 5.6727 9.96482 6.94907C10.1435 7.58939 10.3065 8.16905 10.4935 8.68429C10.6447 9.10072 10.7858 9.39487 10.9179 9.58289C11.0055 9.70747 11.0597 9.74443 11.0748 9.75277C11.096 9.75724 11.1075 9.75764 11.1531 9.71916C11.2342 9.65067 11.3386 9.50891 11.4426 9.28357C11.5416 9.06892 11.614 8.8366 11.662 8.6497C11.6854 8.55831 11.7019 8.48242 11.7122 8.43111C11.7174 8.40555 11.7209 8.38638 11.723 8.37476L11.725 8.36363C11.8 7.89659 12.2395 7.57864 12.7068 7.65342C13.1742 7.72822 13.4925 8.16766 13.4177 8.63494C13.4153 8.64924 13.42 8.62063 13.4177 8.63494L13.4175 8.63596L13.4173 8.63721L13.4168 8.64037L13.4153 8.64924L13.4105 8.67692C13.4064 8.69961 13.4006 8.73069 13.3929 8.76891C13.3776 8.84516 13.3545 8.95091 13.3224 9.07586C13.2593 9.32166 13.1564 9.66085 12.9992 10.0015C12.8469 10.3315 12.6139 10.7288 12.2595 11.0282C11.8757 11.3523 11.35 11.5553 10.7293 11.4312C10.1645 11.3183 9.77597 10.939 9.51527 10.5681C9.2535 10.1957 9.05129 9.7349 8.88212 9.26898C8.87877 9.25975 8.87542 9.25049 8.87208 9.2412C8.03954 10.4941 6.83375 11.4479 5.03926 11.4479C3.48049 11.4479 2.31021 10.7159 1.56788 9.63945C0.846767 8.5938 0.544023 7.25403 0.573206 5.9702C0.60242 4.68505 0.966023 3.36073 1.69055 2.33272C2.42915 1.28475 3.5614 0.531453 5.03927 0.531453C6.44937 0.531453 7.4408 1.29593 8.1276 2.27567C8.48261 2.7821 8.77248 3.36668 9.0177 3.97383C9.1059 3.59106 9.18901 3.20908 9.27086 2.83294C9.39492 2.26277 9.51606 1.70605 9.64752 1.18046C9.76235 0.721369 10.2277 0.442254 10.687 0.557043ZM8.16354 6.87693C8.08689 6.60534 8.01003 6.33741 7.93241 6.08076C7.59522 4.96581 7.22132 3.969 6.72371 3.25914C6.24674 2.57873 5.72135 2.24516 5.03927 2.24516C4.21565 2.24516 3.56947 2.6422 3.09195 3.31975C2.60035 4.01725 2.31013 4.99361 2.28705 6.00913C2.26393 7.02599 2.51041 7.9869 2.97927 8.66676C3.42691 9.31586 4.08734 9.73417 5.03926 9.73417C6.48097 9.73417 7.4216 8.72164 8.14437 6.9249C8.15079 6.90893 8.15718 6.89294 8.16354 6.87693Z" fill="#47A1FF"/>
</svg>`;var Oc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const uy={allWallets:l3,alpha:ly,appStore:u3,chromeStore:E3,apple:d3,arrowBottom:f3,arrowLeft:h3,arrowRight:p3,arrowTop:g3,browser:m3,checkmark:w3,chevronBottom:b3,chevronLeft:y3,chevronRight:v3,chevronTop:x3,clock:_3,close:C3,compass:A3,coinPlaceholder:S3,copy:T3,cursor:I3,desktop:$3,disconnect:D3,discord:P3,etherscan:O3,extension:R3,externalLink:N3,facebook:k3,filters:M3,github:U3,google:B3,helpCircle:L3,infoCircle:j3,mail:F3,mobile:W3,networkPlaceholder:z3,nftPlaceholder:H3,off:V3,playStore:Z3,qrCode:G3,refresh:q3,search:K3,swapHorizontal:Y3,swapHorizontalBold:J3,swapVertical:X3,telegram:Q3,twitch:ey,twitter:ty,twitterIcon:ny,verify:ry,verifyFilled:iy,wallet:sy,walletConnect:ay,walletPlaceholder:oy,warningCircle:cy};let qr=class extends H{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300"}render(){return this.style.cssText=`
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
    `,$`${uy[this.name]}`}};qr.styles=[pe,Od,c3];Oc([D()],qr.prototype,"size",void 0);Oc([D()],qr.prototype,"name",void 0);Oc([D()],qr.prototype,"color",void 0);qr=Oc([z("wui-icon")],qr);const dy=q`
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var Rd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Fi=class extends H{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image"}render(){return $`<img src=${this.src} alt=${this.alt} />`}};Fi.styles=[pe,Od,dy];Rd([D()],Fi.prototype,"src",void 0);Rd([D()],Fi.prototype,"alt",void 0);Fi=Rd([z("wui-image")],Fi);const fy=q`
  :host {
    display: block;
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
  }

  svg {
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
    transition: all var(--wui-ease-in-power-3) var(--wui-duration-lg);
  }

  use {
    stroke: var(--wui-color-accent-100);
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var hy=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ka=class extends H{render(){return $`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `}};ka.styles=[pe,fy];ka=hy([z("wui-loading-hexagon")],ka);const py=q`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
    transition: all var(--wui-ease-in-power-3) var(--wui-duration-lg);
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;var Nd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Wi=class extends H{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: var(--wui-color-${this.color});`,this.dataset.size=this.size,$`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};Wi.styles=[pe,py];Nd([D()],Wi.prototype,"color",void 0);Nd([D()],Wi.prototype,"size",void 0);Wi=Nd([z("wui-loading-spinner")],Wi);const gy=q`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
    transition: all var(--wui-ease-in-power-3) var(--wui-duration-lg);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var Ap=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let os=class extends H{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,r=36-e,o=116+r,i=245+r,s=360+r*1.75;return $`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${o} ${i}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};os.styles=[pe,gy];Ap([D({type:Number})],os.prototype,"radius",void 0);os=Ap([z("wui-loading-thumbnail")],os);const my=q`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var Rc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Kr=class extends H{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: ${`clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px)`};
    `,$`<slot></slot>`}};Kr.styles=[my];Rc([D()],Kr.prototype,"width",void 0);Rc([D()],Kr.prototype,"height",void 0);Rc([D()],Kr.prototype,"borderRadius",void 0);Kr=Rc([z("wui-shimmer")],Kr);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tp={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ip=t=>(...e)=>({_$litDirective$:t,values:e});let $p=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,r){this._$Ct=e,this._$AM=n,this._$Ci=r}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wy=Ip(class extends $p{constructor(t){var e;if(super(t),t.type!==Tp.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var r,o;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!((r=this.nt)!=null&&r.has(i))&&this.st.add(i);return this.render(e)}const n=t.element.classList;for(const i of this.st)i in e||(n.remove(i),this.st.delete(i));for(const i in e){const s=!!e[i];s===this.st.has(i)||(o=this.nt)!=null&&o.has(i)||(s?(n.add(i),this.st.add(i)):(n.remove(i),this.st.delete(i)))}return Gr}}),by=q`
  :host {
    display: flex !important;
  }

  slot {
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-small-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }
`;var Nc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Yr=class extends H{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left"}render(){const e={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,$`<slot class=${wy(e)}></slot>`}};Yr.styles=[pe,by];Nc([D()],Yr.prototype,"variant",void 0);Nc([D()],Yr.prototype,"color",void 0);Nc([D()],Yr.prototype,"align",void 0);Yr=Nc([z("wui-text")],Yr);const yy=K`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#1DC956" rx="30" />
  <circle cx="30" cy="30" r="3" fill="#fff" />
  <path
    fill="#2BEE6C"
    stroke="#fff"
    stroke-width="2"
    d="m45.32 17.9-.88-.42.88.42.02-.05c.1-.2.21-.44.26-.7l-.82-.15.82.16a2 2 0 0 0-.24-1.4c-.13-.23-.32-.42-.47-.57a8.42 8.42 0 0 1-.04-.04l-.04-.04a2.9 2.9 0 0 0-.56-.47l-.51.86.5-.86a2 2 0 0 0-1.4-.24c-.26.05-.5.16-.69.26l-.05.02-15.05 7.25-.1.05c-1.14.55-1.85.89-2.46 1.37a7 7 0 0 0-1.13 1.14c-.5.6-.83 1.32-1.38 2.45l-.05.11-7.25 15.05-.02.05c-.1.2-.21.43-.26.69a2 2 0 0 0 .24 1.4l.85-.5-.85.5c.13.23.32.42.47.57l.04.04.04.04c.15.15.34.34.56.47a2 2 0 0 0 1.41.24l-.2-.98.2.98c.25-.05.5-.17.69-.26l.05-.02-.42-.87.42.87 15.05-7.25.1-.05c1.14-.55 1.85-.89 2.46-1.38a7 7 0 0 0 1.13-1.13 12.87 12.87 0 0 0 1.43-2.56l7.25-15.05Z"
  />
  <path
    fill="#1DC956"
    d="M33.38 32.72 30.7 29.3 15.86 44.14l.2.2a1 1 0 0 0 1.14.2l15.1-7.27a3 3 0 0 0 1.08-4.55Z"
  />
  <path
    fill="#86F999"
    d="m26.62 27.28 2.67 3.43 14.85-14.85-.2-.2a1 1 0 0 0-1.14-.2l-15.1 7.27a3 3 0 0 0-1.08 4.55Z"
  />
  <circle cx="30" cy="30" r="3" fill="#fff" transform="rotate(45 30 30)" />
  <rect width="59" height="59" x=".5" y=".5" stroke="#062B2B" stroke-opacity=".1" rx="29.5" />
</svg> `,vy=K`<svg viewBox="0 0 60 60" fill="none">
  <g clip-path="url(#clip0_7734_50402)">
    <path
      d="M0 24.9C0 15.6485 0 11.0228 1.97053 7.56812C3.3015 5.23468 5.23468 3.3015 7.56812 1.97053C11.0228 0 15.6485 0 24.9 0H35.1C44.3514 0 48.9772 0 52.4319 1.97053C54.7653 3.3015 56.6985 5.23468 58.0295 7.56812C60 11.0228 60 15.6485 60 24.9V35.1C60 44.3514 60 48.9772 58.0295 52.4319C56.6985 54.7653 54.7653 56.6985 52.4319 58.0295C48.9772 60 44.3514 60 35.1 60H24.9C15.6485 60 11.0228 60 7.56812 58.0295C5.23468 56.6985 3.3015 54.7653 1.97053 52.4319C0 48.9772 0 44.3514 0 35.1V24.9Z"
      fill="#EB8B47"
    />
    <path
      d="M0.5 24.9C0.5 20.2652 0.50047 16.8221 0.744315 14.105C0.987552 11.3946 1.46987 9.45504 2.40484 7.81585C3.69145 5.56019 5.56019 3.69145 7.81585 2.40484C9.45504 1.46987 11.3946 0.987552 14.105 0.744315C16.8221 0.50047 20.2652 0.5 24.9 0.5H35.1C39.7348 0.5 43.1779 0.50047 45.895 0.744315C48.6054 0.987552 50.545 1.46987 52.1841 2.40484C54.4398 3.69145 56.3086 5.56019 57.5952 7.81585C58.5301 9.45504 59.0124 11.3946 59.2557 14.105C59.4995 16.8221 59.5 20.2652 59.5 24.9V35.1C59.5 39.7348 59.4995 43.1779 59.2557 45.895C59.0124 48.6054 58.5301 50.545 57.5952 52.1841C56.3086 54.4398 54.4398 56.3086 52.1841 57.5952C50.545 58.5301 48.6054 59.0124 45.895 59.2557C43.1779 59.4995 39.7348 59.5 35.1 59.5H24.9C20.2652 59.5 16.8221 59.4995 14.105 59.2557C11.3946 59.0124 9.45504 58.5301 7.81585 57.5952C5.56019 56.3086 3.69145 54.4398 2.40484 52.1841C1.46987 50.545 0.987552 48.6054 0.744315 45.895C0.50047 43.1779 0.5 39.7348 0.5 35.1V24.9Z"
      stroke="#062B2B"
      stroke-opacity="0.1"
    />
    <path
      d="M19 52C24.5228 52 29 47.5228 29 42C29 36.4772 24.5228 32 19 32C13.4772 32 9 36.4772 9 42C9 47.5228 13.4772 52 19 52Z"
      fill="#FF974C"
      stroke="white"
      stroke-width="2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M42.8437 8.3264C42.4507 7.70891 41.5493 7.70891 41.1564 8.32641L28.978 27.4638C28.5544 28.1295 29.0326 29.0007 29.8217 29.0007H54.1783C54.9674 29.0007 55.4456 28.1295 55.022 27.4638L42.8437 8.3264Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M42.3348 11.6456C42.659 11.7608 42.9061 12.1492 43.4005 12.926L50.7332 24.4488C51.2952 25.332 51.5763 25.7737 51.5254 26.1382C51.4915 26.3808 51.3698 26.6026 51.1833 26.7614C50.9031 27 50.3796 27 49.3327 27H34.6673C33.6204 27 33.0969 27 32.8167 26.7614C32.6302 26.6026 32.5085 26.3808 32.4746 26.1382C32.4237 25.7737 32.7048 25.332 33.2669 24.4488L40.5995 12.926C41.0939 12.1492 41.341 11.7608 41.6652 11.6456C41.8818 11.5687 42.1182 11.5687 42.3348 11.6456ZM35.0001 26.999C38.8661 26.999 42.0001 23.865 42.0001 19.999C42.0001 23.865 45.1341 26.999 49.0001 26.999H35.0001Z"
      fill="#FF974C"
    />
    <path
      d="M10.1061 9.35712C9.9973 9.67775 9.99867 10.0388 9.99978 10.3323C9.99989 10.3611 10 10.3893 10 10.4167V25.5833C10 25.6107 9.99989 25.6389 9.99978 25.6677C9.99867 25.9612 9.9973 26.3222 10.1061 26.6429C10.306 27.2317 10.7683 27.694 11.3571 27.8939C11.6777 28.0027 12.0388 28.0013 12.3323 28.0002C12.3611 28.0001 12.3893 28 12.4167 28H19C24.5228 28 29 23.5228 29 18C29 12.4772 24.5228 8 19 8H12.4167C12.3893 8 12.3611 7.99989 12.3323 7.99978C12.0388 7.99867 11.6778 7.9973 11.3571 8.10614C10.7683 8.306 10.306 8.76834 10.1061 9.35712Z"
      fill="#FF974C"
      stroke="white"
      stroke-width="2"
    />
    <circle cx="19" cy="18" r="4" fill="#EB8B47" stroke="white" stroke-width="2" />
    <circle cx="19" cy="42" r="4" fill="#EB8B47" stroke="white" stroke-width="2" />
  </g>
  <defs>
    <clipPath id="clip0_7734_50402">
      <rect width="60" height="60" fill="white" />
    </clipPath>
  </defs>
</svg> `,xy=K`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <path
      fill="#1DC956"
      d="M0 25.01c0-9.25 0-13.88 1.97-17.33a15 15 0 0 1 5.6-5.6C11.02.11 15.65.11 24.9.11h10.2c9.25 0 13.88 0 17.33 1.97a15 15 0 0 1 5.6 5.6C60 11.13 60 15.76 60 25v10.2c0 9.25 0 13.88-1.97 17.33a15 15 0 0 1-5.6 5.6c-3.45 1.97-8.08 1.97-17.33 1.97H24.9c-9.25 0-13.88 0-17.33-1.97a15 15 0 0 1-5.6-5.6C0 49.1 0 44.46 0 35.21v-10.2Z"
    />
    <path
      fill="#2BEE6C"
      d="M16.1 60c-3.82-.18-6.4-.64-8.53-1.86a15 15 0 0 1-5.6-5.6C.55 50.06.16 46.97.04 41.98L4.2 40.6a4 4 0 0 0 2.48-2.39l4.65-12.4a2 2 0 0 1 2.5-1.2l2.53.84a2 2 0 0 0 2.43-1l2.96-5.94a2 2 0 0 1 3.7.32l3.78 12.58a2 2 0 0 0 3.03 1.09l3.34-2.23a2 2 0 0 0 .65-.7l5.3-9.72a2 2 0 0 1 1.42-1.01l4.14-.69a2 2 0 0 1 1.6.44l3.9 3.24a2 2 0 0 0 2.7-.12l4.62-4.63c.08 2.2.08 4.8.08 7.93v10.2c0 9.25 0 13.88-1.97 17.33a15 15 0 0 1-5.6 5.6c-2.13 1.22-4.7 1.68-8.54 1.86H16.11Z"
    />
    <path
      fill="#fff"
      d="m.07 43.03-.05-2.1 3.85-1.28a3 3 0 0 0 1.86-1.79l4.66-12.4a3 3 0 0 1 3.75-1.8l2.53.84a1 1 0 0 0 1.21-.5l2.97-5.94a3 3 0 0 1 5.56.48l3.77 12.58a1 1 0 0 0 1.51.55l3.34-2.23a1 1 0 0 0 .33-.35l5.3-9.71a3 3 0 0 1 2.14-1.53l4.13-.69a3 3 0 0 1 2.41.66l3.9 3.24a1 1 0 0 0 1.34-.06l5.28-5.28c.05.85.08 1.75.1 2.73L56 22.41a3 3 0 0 1-4.04.19l-3.9-3.25a1 1 0 0 0-.8-.21l-4.13.69a1 1 0 0 0-.72.5l-5.3 9.72a3 3 0 0 1-.97 1.05l-3.34 2.23a3 3 0 0 1-4.53-1.63l-3.78-12.58a1 1 0 0 0-1.85-.16l-2.97 5.94a3 3 0 0 1-3.63 1.5l-2.53-.84a1 1 0 0 0-1.25.6l-4.65 12.4a5 5 0 0 1-3.1 3L.07 43.02Z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M49.5 19a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
      clip-rule="evenodd"
    />
    <path fill="#fff" d="M45 .28v59.66l-2 .1V.19c.7.02 1.37.05 2 .1Z" />
    <path fill="#2BEE6C" d="M47.5 19a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
    <path
      stroke="#fff"
      stroke-opacity=".1"
      d="M.5 25.01c0-4.63 0-8.08.24-10.8.25-2.7.73-4.64 1.66-6.28a14.5 14.5 0 0 1 5.42-5.41C9.46 1.58 11.39 1.1 14.1.85A133 133 0 0 1 24.9.61h10.2c4.63 0 8.08 0 10.8.24 2.7.25 4.65.73 6.28 1.67a14.5 14.5 0 0 1 5.42 5.4c.93 1.65 1.41 3.58 1.66 6.3.24 2.71.24 6.16.24 10.79v10.2c0 4.64 0 8.08-.24 10.8-.25 2.7-.73 4.65-1.66 6.28a14.5 14.5 0 0 1-5.42 5.42c-1.63.93-3.57 1.41-6.28 1.66-2.72.24-6.17.24-10.8.24H24.9c-4.63 0-8.08 0-10.8-.24-2.7-.25-4.64-.73-6.28-1.66a14.5 14.5 0 0 1-5.42-5.42C1.47 50.66 1 48.72.74 46.01A133 133 0 0 1 .5 35.2v-10.2Z"
    />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M0 0h60v60H0z" /></clipPath>
  </defs>
</svg>`,Ey=K`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#C653C6" rx="30" />
    <path
      fill="#E87DE8"
      d="M57.98.01v19.5a4.09 4.09 0 0 0-2.63 2.29L50.7 34.2a2 2 0 0 1-2.5 1.2l-2.53-.84a2 2 0 0 0-2.42 1l-2.97 5.94a2 2 0 0 1-3.7-.32L32.8 28.6a2 2 0 0 0-3.02-1.09l-3.35 2.23a2 2 0 0 0-.64.7l-5.3 9.72a2 2 0 0 1-1.43 1.01l-4.13.69a2 2 0 0 1-1.61-.44l-3.9-3.24a2 2 0 0 0-2.69.12L2.1 42.93.02 43V.01h57.96Z"
    />
    <path
      fill="#fff"
      d="m61.95 16.94.05 2.1-3.85 1.28a3 3 0 0 0-1.86 1.79l-4.65 12.4a3 3 0 0 1-3.76 1.8l-2.53-.84a1 1 0 0 0-1.2.5l-2.98 5.94a3 3 0 0 1-5.55-.48l-3.78-12.58a1 1 0 0 0-1.5-.55l-3.35 2.23a1 1 0 0 0-.32.35l-5.3 9.72a3 3 0 0 1-2.14 1.52l-4.14.69a3 3 0 0 1-2.41-.66l-3.9-3.24a1 1 0 0 0-1.34.06l-5.28 5.28c-.05-.84-.08-1.75-.1-2.73l3.97-3.96a3 3 0 0 1 4.04-.19l3.89 3.25a1 1 0 0 0 .8.21l4.14-.68a1 1 0 0 0 .71-.51l5.3-9.71a3 3 0 0 1 .97-1.06l3.34-2.23a3 3 0 0 1 4.54 1.63l3.77 12.58a1 1 0 0 0 1.86.16l2.96-5.93a3 3 0 0 1 3.64-1.5l2.52.83a1 1 0 0 0 1.25-.6l4.66-12.4a5 5 0 0 1 3.1-2.99l4.43-1.48Z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M35.5 27a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
      clip-rule="evenodd"
    />
    <path fill="#fff" d="M31 0v60h-2V0h2Z" />
    <path fill="#E87DE8" d="M33.5 27a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="29.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="30" /></clipPath>
  </defs>
</svg> `,_y=K`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#987DE8" rx="30" />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="m15.48 28.37 11.97-19.3a3 3 0 0 1 5.1 0l11.97 19.3a6 6 0 0 1 .9 3.14v.03a6 6 0 0 1-1.16 3.56L33.23 50.2a4 4 0 0 1-6.46 0L15.73 35.1a6 6 0 0 1-1.15-3.54v-.03a6 6 0 0 1 .9-3.16Z"
      clip-rule="evenodd"
    />
    <path
      fill="#643CDD"
      d="M30.84 10.11a1 1 0 0 0-.84-.46V24.5l12.6 5.53a2 2 0 0 0-.28-1.4L30.84 10.11Z"
    />
    <path
      fill="#BDADEB"
      d="M30 9.65a1 1 0 0 0-.85.46L17.66 28.64a2 2 0 0 0-.26 1.39L30 24.5V9.65Z"
    />
    <path
      fill="#643CDD"
      d="M30 50.54a1 1 0 0 0 .8-.4l11.24-15.38c.3-.44-.2-1-.66-.73l-9.89 5.68a3 3 0 0 1-1.5.4v10.43Z"
    />
    <path
      fill="#BDADEB"
      d="m17.97 34.76 11.22 15.37c.2.28.5.41.8.41V40.11a3 3 0 0 1-1.49-.4l-9.88-5.68c-.47-.27-.97.3-.65.73Z"
    />
    <path
      fill="#401AB3"
      d="M42.6 30.03 30 24.5v13.14a3 3 0 0 0 1.5-.4l10.14-5.83a2 2 0 0 0 .95-1.38Z"
    />
    <path
      fill="#7C5AE2"
      d="M30 37.64V24.46l-12.6 5.57a2 2 0 0 0 .97 1.39l10.13 5.82a3 3 0 0 0 1.5.4Z"
    />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="29.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="30" /></clipPath>
  </defs>
</svg> `,Cy=K`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#1DC956" rx="3" />
  <path
    fill="#1FAD7E"
    stroke="#fff"
    stroke-width="2"
    d="m30.49 29.13-.49-.27-.49.27-12.77 7.1-.05.02c-.86.48-1.58.88-2.1 1.24-.54.37-1.04.81-1.28 1.45a3 3 0 0 0 0 2.12c.24.63.74 1.08 1.27 1.45.53.36 1.25.76 2.11 1.24l.05.03 6.33 3.51.17.1c2.33 1.3 3.72 2.06 5.22 2.32a9 9 0 0 0 3.08 0c1.5-.26 2.9-1.03 5.22-2.32l.18-.1 6.32-3.51.05-.03a26.9 26.9 0 0 0 2.1-1.24 3.21 3.21 0 0 0 1.28-1.45l-.94-.35.94.35a3 3 0 0 0 0-2.12l-.94.35.94-.35a3.21 3.21 0 0 0-1.27-1.45c-.53-.36-1.25-.76-2.11-1.24l-.05-.03-12.77-7.1Z"
  />
  <path
    fill="#2BEE6C"
    stroke="#fff"
    stroke-width="2"
    d="m30.49 19.13-.49-.27-.49.27-12.77 7.1-.05.02c-.86.48-1.58.88-2.1 1.24-.54.37-1.04.81-1.28 1.45a3 3 0 0 0 0 2.12c.24.63.74 1.08 1.27 1.45.53.36 1.25.76 2.11 1.24l.05.03 6.33 3.51.17.1c2.33 1.3 3.72 2.06 5.22 2.32a9 9 0 0 0 3.08 0c1.5-.26 2.9-1.03 5.22-2.32l.18-.1 6.32-3.51.05-.03a26.9 26.9 0 0 0 2.1-1.24 3.21 3.21 0 0 0 1.28-1.45l-.94-.35.94.35a3 3 0 0 0 0-2.12l-.94.35.94-.35a3.21 3.21 0 0 0-1.27-1.45c-.53-.36-1.25-.76-2.11-1.24l-.05-.03-12.77-7.1Z"
  />
  <path
    fill="#86F999"
    stroke="#fff"
    stroke-width="2"
    d="m46.69 21.06-.94-.35.94.35a3 3 0 0 0 0-2.12l-.94.35.94-.35a3.21 3.21 0 0 0-1.27-1.45c-.53-.36-1.25-.76-2.11-1.24l-.05-.03-6.32-3.51-.18-.1c-2.33-1.3-3.72-2.06-5.22-2.33a9 9 0 0 0-3.08 0c-1.5.27-2.9 1.04-5.22 2.33l-.17.1-6.33 3.51-.05.03c-.86.48-1.58.88-2.1 1.24-.54.37-1.04.81-1.28 1.45a3 3 0 0 0 0 2.12c.24.63.74 1.08 1.27 1.45.53.36 1.25.76 2.11 1.24l.05.03 6.33 3.51.17.1c2.33 1.3 3.72 2.06 5.22 2.32a9 9 0 0 0 3.08 0c1.5-.26 2.9-1.03 5.22-2.32l.18-.1 6.32-3.51.05-.03a26.9 26.9 0 0 0 2.1-1.24 3.21 3.21 0 0 0 1.28-1.45Z"
  />
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
</svg>`,Sy=K`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#C653C6" rx="3" />
  <path
    fill="#fff"
    d="M20.03 15.22C20 15.6 20 16.07 20 17v2.8c0 1.14 0 1.7-.2 2.12-.15.31-.3.5-.58.71-.37.28-1.06.42-2.43.7-.59.12-1.11.29-1.6.51a9 9 0 0 0-4.35 4.36C10 30 10 32.34 10 37c0 4.66 0 7 .84 8.8a9 9 0 0 0 4.36 4.36C17 51 19.34 51 24 51h12c4.66 0 7 0 8.8-.84a9 9 0 0 0 4.36-4.36C50 44 50 41.66 50 37c0-4.66 0-7-.84-8.8a9 9 0 0 0-4.36-4.36c-.48-.22-1-.39-1.6-.5-1.36-.29-2.05-.43-2.42-.7-.27-.22-.43-.4-.58-.72-.2-.42-.2-.98-.2-2.11V17c0-.93 0-1.4-.03-1.78a9 9 0 0 0-8.19-8.19C31.4 7 30.93 7 30 7s-1.4 0-1.78.03a9 9 0 0 0-8.19 8.19Z"
  />
  <path
    fill="#E87DE8"
    d="M22 17c0-.93 0-1.4.04-1.78a7 7 0 0 1 6.18-6.18C28.6 9 29.07 9 30 9s1.4 0 1.78.04a7 7 0 0 1 6.18 6.18c.04.39.04.85.04 1.78v4.5a1.5 1.5 0 0 1-3 0V17c0-.93 0-1.4-.08-1.78a4 4 0 0 0-3.14-3.14C31.39 12 30.93 12 30 12s-1.4 0-1.78.08a4 4 0 0 0-3.14 3.14c-.08.39-.08.85-.08 1.78v4.5a1.5 1.5 0 0 1-3 0V17Z"
  />
  <path
    fill="#E87DE8"
    fill-rule="evenodd"
    d="M12 36.62c0-4.32 0-6.48.92-8.09a7 7 0 0 1 2.61-2.61C17.14 25 19.3 25 23.62 25h6.86c.46 0 .7 0 .9.02 2.73.22 4.37 2.43 4.62 4.98.27-2.7 2.11-5 5.02-5A6.98 6.98 0 0 1 48 31.98v5.4c0 4.32 0 6.48-.92 8.09a7 7 0 0 1-2.61 2.61c-1.61.92-3.77.92-8.09.92h-5.86c-.46 0-.7 0-.9-.02-2.73-.22-4.37-2.43-4.62-4.98-.26 2.58-1.94 4.82-4.71 4.99l-.7.01c-.55 0-.82 0-1.05-.02a7 7 0 0 1-6.52-6.52c-.02-.23-.02-.5-.02-1.05v-4.79Zm21.24-.27a4 4 0 1 0-6.48 0 31.28 31.28 0 0 1 1.57 2.23c.17.4.17.81.17 1.24V42.5a1.5 1.5 0 0 0 3 0V39.82c0-.43 0-.85.17-1.24.09-.2.58-.87 1.57-2.23Z"
    clip-rule="evenodd"
  />
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
</svg>`,Ay=K`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <path
      fill="#EB8B47"
      d="M0 24.9c0-9.25 0-13.88 1.97-17.33a15 15 0 0 1 5.6-5.6C11.02 0 15.65 0 24.9 0h10.2c9.25 0 13.88 0 17.33 1.97a15 15 0 0 1 5.6 5.6C60 11.02 60 15.65 60 24.9v10.2c0 9.25 0 13.88-1.97 17.33a15 15 0 0 1-5.6 5.6C48.98 60 44.35 60 35.1 60H24.9c-9.25 0-13.88 0-17.33-1.97a15 15 0 0 1-5.6-5.6C0 48.98 0 44.35 0 35.1V24.9Z"
    />
    <path
      stroke="#062B2B"
      stroke-opacity=".1"
      d="M.5 24.9c0-4.64 0-8.08.24-10.8.25-2.7.73-4.65 1.66-6.28A14.5 14.5 0 0 1 7.82 2.4C9.46 1.47 11.39 1 14.1.74A133 133 0 0 1 24.9.5h10.2c4.63 0 8.08 0 10.8.24 2.7.25 4.65.73 6.28 1.66a14.5 14.5 0 0 1 5.42 5.42c.93 1.63 1.41 3.57 1.66 6.28.24 2.72.24 6.16.24 10.8v10.2c0 4.63 0 8.08-.24 10.8-.25 2.7-.73 4.64-1.66 6.28a14.5 14.5 0 0 1-5.42 5.41c-1.63.94-3.57 1.42-6.28 1.67-2.72.24-6.17.24-10.8.24H24.9c-4.63 0-8.08 0-10.8-.24-2.7-.25-4.64-.73-6.28-1.67a14.5 14.5 0 0 1-5.42-5.4C1.47 50.53 1 48.6.74 45.88A133 133 0 0 1 .5 35.1V24.9Z"
    />
    <path
      fill="#FF974C"
      stroke="#fff"
      stroke-width="2"
      d="M39.2 29.2a13 13 0 1 0-18.4 0l1.3 1.28a12.82 12.82 0 0 1 2.1 2.39 6 6 0 0 1 .6 1.47c.2.76.2 1.56.2 3.17v11.24c0 1.08 0 1.61.13 2.12a4 4 0 0 0 .41.98c.26.45.64.83 1.4 1.6l.3.29c.65.65.98.98 1.36 1.09.26.07.54.07.8 0 .38-.11.7-.44 1.36-1.1l3.48-3.47c.65-.65.98-.98 1.09-1.36a1.5 1.5 0 0 0 0-.8c-.1-.38-.44-.7-1.1-1.36l-.47-.48c-.65-.65-.98-.98-1.09-1.36a1.5 1.5 0 0 1 0-.8c.1-.38.44-.7 1.1-1.36l.47-.48c.65-.65.98-.98 1.09-1.36a1.5 1.5 0 0 0 0-.8c-.1-.38-.44-.7-1.1-1.36l-.48-.5c-.65-.64-.98-.97-1.08-1.35a1.5 1.5 0 0 1 0-.79c.1-.38.42-.7 1.06-1.36l5.46-5.55Z"
    />
    <circle cx="30" cy="17" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2" />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M0 0h60v60H0z" /></clipPath>
  </defs>
</svg> `,Ty=K`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#00ACE6" rx="30" />
    <circle cx="64" cy="39" r="50" fill="#1AC6FF" stroke="#fff" stroke-width="2" />
    <circle cx="78" cy="30" r="50" fill="#4DD2FF" stroke="#fff" stroke-width="2" />
    <circle cx="72" cy="15" r="35" fill="#80DFFF" stroke="#fff" stroke-width="2" />
    <circle cx="34" cy="-17" r="45" stroke="#fff" stroke-width="2" />
    <circle cx="34" cy="-5" r="50" stroke="#fff" stroke-width="2" />
    <circle cx="30" cy="45" r="4" fill="#4DD2FF" stroke="#fff" stroke-width="2" />
    <circle cx="39.5" cy="27.5" r="4" fill="#80DFFF" stroke="#fff" stroke-width="2" />
    <circle cx="16" cy="24" r="4" fill="#19C6FF" stroke="#fff" stroke-width="2" />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#062B2B" stroke-opacity=".1" rx="29.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="30" /></clipPath>
  </defs>
</svg>`,Iy=K`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#C653C6" rx="3" />
    <path
      fill="#E87DE8"
      stroke="#fff"
      stroke-width="2"
      d="M52.1 47.34c0-4.24-1.44-9.55-5.9-12.4a2.86 2.86 0 0 0-1.6-3.89v-.82c0-1.19-.52-2.26-1.35-3a4.74 4.74 0 0 0-2.4-6.26v-5.5a11.31 11.31 0 1 0-22.63 0v2.15a3.34 3.34 0 0 0-1.18 5.05 4.74 4.74 0 0 0-.68 6.44A5.22 5.22 0 0 0 14 35.92c-3.06 4.13-6.1 8.3-6.1 15.64 0 2.67.37 4.86.74 6.39a20.3 20.3 0 0 0 .73 2.39l.02.04v.01l.92-.39-.92.4.26.6h38.26l.3-.49-.87-.51.86.5.02-.01.03-.07a16.32 16.32 0 0 0 .57-1.05c.36-.72.85-1.74 1.33-2.96a25.51 25.51 0 0 0 1.94-9.07Z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M26.5 29.5c-3-.5-5.5-3-5.5-7v-7c0-.47 0-.7.03-.9a3 3 0 0 1 2.58-2.57c.2-.03.42-.03.89-.03 2 0 2.5-2.5 2.5-2.5s0 2.5 2.5 2.5c1.4 0 2.1 0 2.65.23a3 3 0 0 1 1.62 1.62c.23.55.23 1.25.23 2.65v6c0 4-3 7-6.5 7 1.35.23 4 0 6.5-2v9.53C34 38.5 31.5 40 28 40s-6-1.5-6-2.97L24 34l2.5 1.5v-6ZM26 47h4.5c2.5 0 3 4 3 5.5h-3l-1-1.5H26v-4Zm-6.25 5.5H24V57h-8c0-1 1-4.5 3.75-4.5Z"
      clip-rule="evenodd"
    />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="3" /></clipPath>
  </defs>
</svg> `,$y=K`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#794CFF" rx="3" />
  <path
    fill="#987DE8"
    stroke="#fff"
    stroke-width="2"
    d="M33 22.5v-1H16v5H8.5V36H13v-5h3v7.5h17V31h1v7.5h17v-17H34v5h-1v-4Z"
  />
  <path fill="#fff" d="M37.5 25h10v10h-10z" />
  <path fill="#4019B2" d="M42.5 25h5v10h-5z" />
  <path fill="#fff" d="M19.5 25h10v10h-10z" />
  <path fill="#4019B2" d="M24.5 25h5v10h-5z" />
  <path fill="#fff" d="M12 30.5h4V37h-4v-6.5Z" />
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
</svg>`,Dy=K`<svg
  viewBox="0 0 60 60"
  fill="none"
>
  <g clip-path="url(#1)">
    <rect width="60" height="60" rx="30" fill="#00ACE6" />
    <path
      d="M59 73C59 89.0163 46.0163 102 30 102C13.9837 102 1 89.0163 1 73C1 56.9837 12 44 30 44C48 44 59 56.9837 59 73Z"
      fill="#1AC6FF"
      stroke="white"
      stroke-width="2"
    />
    <path
      d="M18.6904 19.9015C19.6264 15.3286 23.3466 11.8445 27.9708 11.2096C29.3231 11.024 30.6751 11.0238 32.0289 11.2096C36.6532 11.8445 40.3733 15.3286 41.3094 19.9015C41.4868 20.7681 41.6309 21.6509 41.7492 22.5271C41.8811 23.5041 41.8811 24.4944 41.7492 25.4715C41.6309 26.3476 41.4868 27.2304 41.3094 28.097C40.3733 32.6699 36.6532 36.154 32.0289 36.7889C30.6772 36.9744 29.3216 36.9743 27.9708 36.7889C23.3466 36.154 19.6264 32.6699 18.6904 28.097C18.513 27.2304 18.3689 26.3476 18.2506 25.4715C18.1186 24.4944 18.1186 23.5041 18.2506 22.5271C18.3689 21.6509 18.513 20.7681 18.6904 19.9015Z"
      fill="#1AC6FF"
      stroke="white"
      stroke-width="2"
    />
    <circle cx="24.5" cy="23.5" r="1.5" fill="white" />
    <circle cx="35.5" cy="23.5" r="1.5" fill="white" />
    <path
      d="M31 20L28 28H32"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
  <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="white" stroke-opacity="0.1" />
  <defs>
    <clipPath id="1">
      <rect width="60" height="60" rx="30" fill="white" />
    </clipPath>
  </defs>
</svg> `,Py=K`<svg viewBox="0 0 60 60" fill="none">
  <g clip-path="url(#1)">
    <path
      d="M0 24.9C0 15.6485 0 11.0228 1.97053 7.56812C3.3015 5.23468 5.23468 3.3015 7.56812 1.97053C11.0228 0 15.6485 0 24.9 0H35.1C44.3514 0 48.9772 0 52.4319 1.97053C54.7653 3.3015 56.6985 5.23468 58.0295 7.56812C60 11.0228 60 15.6485 60 24.9V35.1C60 44.3514 60 48.9772 58.0295 52.4319C56.6985 54.7653 54.7653 56.6985 52.4319 58.0295C48.9772 60 44.3514 60 35.1 60H24.9C15.6485 60 11.0228 60 7.56812 58.0295C5.23468 56.6985 3.3015 54.7653 1.97053 52.4319C0 48.9772 0 44.3514 0 35.1V24.9Z"
      fill="#794CFF"
    />
    <path
      d="M0.5 24.9C0.5 20.2652 0.50047 16.8221 0.744315 14.105C0.987552 11.3946 1.46987 9.45504 2.40484 7.81585C3.69145 5.56019 5.56019 3.69145 7.81585 2.40484C9.45504 1.46987 11.3946 0.987552 14.105 0.744315C16.8221 0.50047 20.2652 0.5 24.9 0.5H35.1C39.7348 0.5 43.1779 0.50047 45.895 0.744315C48.6054 0.987552 50.545 1.46987 52.1841 2.40484C54.4398 3.69145 56.3086 5.56019 57.5952 7.81585C58.5301 9.45504 59.0124 11.3946 59.2557 14.105C59.4995 16.8221 59.5 20.2652 59.5 24.9V35.1C59.5 39.7348 59.4995 43.1779 59.2557 45.895C59.0124 48.6054 58.5301 50.545 57.5952 52.1841C56.3086 54.4398 54.4398 56.3086 52.1841 57.5952C50.545 58.5301 48.6054 59.0124 45.895 59.2557C43.1779 59.4995 39.7348 59.5 35.1 59.5H24.9C20.2652 59.5 16.8221 59.4995 14.105 59.2557C11.3946 59.0124 9.45504 58.5301 7.81585 57.5952C5.56019 56.3086 3.69145 54.4398 2.40484 52.1841C1.46987 50.545 0.987552 48.6054 0.744315 45.895C0.50047 43.1779 0.5 39.7348 0.5 35.1V24.9Z"
      stroke="#062B2B"
      stroke-opacity="0.1"
    />
    <path
      d="M35.1403 31.5016C35.1193 30.9637 35.388 30.4558 35.8446 30.1707C36.1207 29.9982 36.4761 29.8473 36.7921 29.7685C37.3143 29.6382 37.8664 29.7977 38.2386 30.1864C38.8507 30.8257 39.3004 31.6836 39.8033 32.408C40.2796 33.0942 41.4695 33.2512 41.9687 32.5047C42.4839 31.7341 42.9405 30.8229 43.572 30.1399C43.9375 29.7447 44.4866 29.5756 45.0111 29.6967C45.3283 29.7701 45.6863 29.9147 45.9655 30.0823C46.4269 30.3595 46.7045 30.8626 46.6928 31.4008C46.6731 32.3083 46.3764 33.2571 46.2158 34.1473C46.061 35.0048 46.9045 35.8337 47.7592 35.664C48.6464 35.4878 49.5899 35.1747 50.497 35.1391C51.0348 35.1181 51.5427 35.3868 51.8279 35.8433C52.0004 36.1195 52.1513 36.4749 52.2301 36.7908C52.3604 37.3131 52.2009 37.8651 51.8121 38.2374C51.1729 38.8495 50.3151 39.2991 49.5908 39.8019C48.9046 40.2782 48.7473 41.4683 49.4939 41.9675C50.2644 42.4827 51.1757 42.9393 51.8587 43.5708C52.2539 43.9362 52.423 44.4854 52.3018 45.0099C52.2285 45.3271 52.0839 45.6851 51.9162 45.9642C51.6391 46.4257 51.1359 46.7032 50.5978 46.6916C49.6903 46.6719 48.7417 46.3753 47.8516 46.2146C46.9939 46.0598 46.1648 46.9035 46.3346 47.7583C46.5108 48.6454 46.8239 49.5888 46.8594 50.4958C46.8805 51.0336 46.6117 51.5415 46.1552 51.8267C45.879 51.9992 45.5236 52.15 45.2077 52.2289C44.6854 52.3592 44.1334 52.1997 43.7611 51.8109C43.1491 51.1718 42.6996 50.314 42.1968 49.5897C41.7203 48.9034 40.5301 48.7463 40.0309 49.493C39.5157 50.2634 39.0592 51.1746 38.4278 51.8574C38.0623 52.2527 37.5132 52.4218 36.9887 52.3006C36.6715 52.2273 36.3135 52.0826 36.0343 51.915C35.5729 51.6379 35.2953 51.1347 35.307 50.5966C35.3267 49.6891 35.6233 48.7405 35.7839 47.8505C35.9388 46.9928 35.0951 46.1636 34.2402 46.3334C33.3531 46.5096 32.4098 46.8227 31.5028 46.8582C30.9649 46.8793 30.457 46.6105 30.1719 46.154C29.9994 45.8778 29.8485 45.5224 29.7697 45.2065C29.6394 44.6842 29.7989 44.1322 30.1877 43.7599C30.8269 43.1479 31.6847 42.6982 32.4091 42.1954C33.0954 41.7189 33.2522 40.5289 32.5056 40.0297C31.7351 39.5145 30.824 39.058 30.1411 38.4265C29.7459 38.0611 29.5768 37.5119 29.698 36.9875C29.7713 36.6702 29.9159 36.3122 30.0836 36.0331C30.3607 35.5717 30.8638 35.2941 31.402 35.3058C32.3095 35.3255 33.2583 35.6221 34.1485 35.7828C35.006 35.9376 35.8349 35.094 35.6652 34.2393C35.489 33.3521 35.1759 32.4087 35.1403 31.5016Z"
      fill="#906EF7"
      stroke="white"
      stroke-width="2"
    />
    <path
      d="M20.7706 8.22357C20.9036 7.51411 21.5231 7 22.2449 7H23.7551C24.4769 7 25.0964 7.51411 25.2294 8.22357C25.5051 9.69403 25.4829 11.6321 27.1202 12.2606C27.3092 12.3331 27.4958 12.4105 27.6798 12.4926C29.2818 13.2072 30.6374 11.8199 31.8721 10.9752C32.4678 10.5676 33.2694 10.6421 33.7798 11.1525L34.8477 12.2204C35.3581 12.7308 35.4326 13.5323 35.025 14.128C34.1802 15.3627 32.7931 16.7183 33.5077 18.3202C33.5898 18.5043 33.6672 18.6909 33.7398 18.88C34.3683 20.5171 36.3061 20.4949 37.7764 20.7706C38.4859 20.9036 39 21.5231 39 22.2449V23.7551C39 24.4769 38.4859 25.0964 37.7764 25.2294C36.3061 25.5051 34.3685 25.483 33.7401 27.1201C33.6675 27.3093 33.59 27.4961 33.5079 27.6803C32.7934 29.282 34.1803 30.6374 35.025 31.8719C35.4326 32.4677 35.3581 33.2692 34.8477 33.7796L33.7798 34.8475C33.2694 35.3579 32.4678 35.4324 31.8721 35.0248C30.6376 34.1801 29.2823 32.7934 27.6806 33.508C27.4962 33.5903 27.3093 33.6678 27.12 33.7405C25.483 34.3688 25.5051 36.3062 25.2294 37.7764C25.0964 38.4859 24.4769 39 23.7551 39H22.2449C21.5231 39 20.9036 38.4859 20.7706 37.7764C20.4949 36.3062 20.517 34.3688 18.88 33.7405C18.6908 33.6678 18.5039 33.5903 18.3196 33.5081C16.7179 32.7936 15.3625 34.1804 14.1279 35.0251C13.5322 35.4327 12.7307 35.3582 12.2203 34.8478L11.1524 33.7799C10.642 33.2695 10.5675 32.4679 10.9751 31.8722C11.8198 30.6376 13.2067 29.2822 12.4922 27.6804C12.41 27.4962 12.3325 27.3093 12.2599 27.1201C11.6315 25.483 9.69392 25.5051 8.22357 25.2294C7.51411 25.0964 7 24.4769 7 23.7551V22.2449C7 21.5231 7.51411 20.9036 8.22357 20.7706C9.69394 20.4949 11.6317 20.5171 12.2602 18.88C12.3328 18.6909 12.4103 18.5042 12.4924 18.3201C13.207 16.7181 11.8198 15.3625 10.975 14.1278C10.5674 13.5321 10.6419 12.7305 11.1523 12.2201L12.2202 11.1522C12.7306 10.6418 13.5322 10.5673 14.1279 10.9749C15.3626 11.8197 16.7184 13.2071 18.3204 12.4925C18.5044 12.4105 18.6909 12.3331 18.8799 12.2606C20.5171 11.6321 20.4949 9.69403 20.7706 8.22357Z"
      fill="#906EF7"
      stroke="white"
      stroke-width="2"
    />
    <circle cx="23" cy="23" r="6" fill="#794CFF" stroke="white" stroke-width="2" />
    <circle cx="41" cy="41" r="4" fill="#794CFF" stroke="white" stroke-width="2" />
  </g>
  <defs>
    <clipPath id="1">
      <rect width="60" height="60" fill="white" />
    </clipPath>
  </defs>
</svg> `,Oy=q`
  :host {
    display: block;
    width: 55px;
    height: 55px;
  }
`;var Dp=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const Ry={browser:yy,dao:vy,defi:xy,defiAlt:Ey,eth:_y,layers:Cy,lock:Sy,login:Ay,network:Ty,nft:Iy,noun:$y,profile:Dy,system:Py};let ss=class extends H{constructor(){super(...arguments),this.name="browser"}render(){return $`${Ry[this.name]}`}};ss.styles=[pe,Oy];Dp([D()],ss.prototype,"name",void 0);ss=Dp([z("wui-visual")],ss);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ve=t=>t??rt,Be={getSpacingStyles(t,e){if(Array.isArray(t))return t[e]?`var(--wui-spacing-${t[e]})`:void 0;if(typeof t=="string")return`var(--wui-spacing-${t})`},getFormattedDate(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t)},getHostName(t){return new URL(t).hostname},getTruncateString({string:t,charsStart:e,charsEnd:n,truncate:r}){return t.length<=e+n?t:r==="end"?`${t.substring(0,e)}...`:r==="start"?`...${t.substring(t.length-n)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(n))}`},generateAvatarColors(t){const n=t.toLowerCase().replace(/^0x/iu,"").substring(0,6),r=this.hexToRgb(n),o=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),s=100-3*Number(o==null?void 0:o.replace("px","")),a=`${s}% ${s}% at 65% 40%`,c=[];for(let l=0;l<5;l+=1){const u=this.tintColor(r,.15*l);c.push(`rgb(${u[0]}, ${u[1]}, ${u[2]})`)}return`
    --local-color-1: ${c[0]};
    --local-color-2: ${c[1]};
    --local-color-3: ${c[2]};
    --local-color-4: ${c[3]};
    --local-color-5: ${c[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(t){const e=parseInt(t,16),n=e>>16&255,r=e>>8&255,o=e&255;return[n,r,o]},tintColor(t,e){const[n,r,o]=t,i=Math.round(n+(255-n)*e),s=Math.round(r+(255-r)*e),a=Math.round(o+(255-o)*e);return[i,s,a]},isNumber(t){return{number:/^[0-9]+$/u}.number.test(t)},getColorTheme(t){return t||(typeof window<"u"&&window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":"dark")}},Ny=q`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var Wt=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let bt=class extends H{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&Be.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&Be.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&Be.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&Be.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&Be.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&Be.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&Be.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&Be.getSpacingStyles(this.margin,3)};
    `,$`<slot></slot>`}};bt.styles=[pe,Ny];Wt([D()],bt.prototype,"flexDirection",void 0);Wt([D()],bt.prototype,"flexWrap",void 0);Wt([D()],bt.prototype,"flexBasis",void 0);Wt([D()],bt.prototype,"flexGrow",void 0);Wt([D()],bt.prototype,"flexShrink",void 0);Wt([D()],bt.prototype,"alignItems",void 0);Wt([D()],bt.prototype,"justifyContent",void 0);Wt([D()],bt.prototype,"columnGap",void 0);Wt([D()],bt.prototype,"rowGap",void 0);Wt([D()],bt.prototype,"gap",void 0);Wt([D()],bt.prototype,"padding",void 0);Wt([D()],bt.prototype,"margin",void 0);bt=Wt([z("wui-flex")],bt);const ky=q`
  :host {
    display: block;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 8px var(--wui-gray-glass-005);
    overflow: hidden;
    position: relative;
  }

  :host([data-variant='generated']) {
    --mixed-local-color-1: var(--local-color-1);
    --mixed-local-color-2: var(--local-color-2);
    --mixed-local-color-3: var(--local-color-3);
    --mixed-local-color-4: var(--local-color-4);
    --mixed-local-color-5: var(--local-color-5);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host([data-variant='generated']) {
      --mixed-local-color-1: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-1)
      );
      --mixed-local-color-2: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-2)
      );
      --mixed-local-color-3: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-3)
      );
      --mixed-local-color-4: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-4)
      );
      --mixed-local-color-5: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-5)
      );
    }
  }

  :host([data-variant='generated']) {
    box-shadow: 0 0 0 8px var(--wui-gray-glass-005);
    background: radial-gradient(
      var(--local-radial-circle),
      #fff 0.52%,
      var(--mixed-local-color-5) 31.25%,
      var(--mixed-local-color-3) 51.56%,
      var(--mixed-local-color-2) 65.63%,
      var(--mixed-local-color-1) 82.29%,
      var(--mixed-local-color-4) 100%
    );
  }

  :host([data-variant='default']) {
    box-shadow: 0 0 0 8px var(--wui-gray-glass-005);
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      #fff 0.52%,
      #f5ccfc 31.25%,
      #dba4f5 51.56%,
      #9a8ee8 65.63%,
      #6493da 82.29%,
      #6ebdea 100%
    );
  }
`;var kc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Jr=class extends H{constructor(){super(...arguments),this.imageSrc=void 0,this.alt=void 0,this.address=void 0}render(){return $`${this.visualTemplate()}`}visualTemplate(){if(this.imageSrc)return this.dataset.variant="image",$`<wui-image src=${this.imageSrc} alt=${this.alt??"avatar"}></wui-image>`;if(this.address){this.dataset.variant="generated";const e=Be.generateAvatarColors(this.address);return this.style.cssText=e,null}return this.dataset.variant="default",null}};Jr.styles=[pe,ky];kc([D()],Jr.prototype,"imageSrc",void 0);kc([D()],Jr.prototype,"alt",void 0);kc([D()],Jr.prototype,"address",void 0);Jr=kc([z("wui-avatar")],Jr);const My=q`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-gray-glass-020);
    border-radius: var(--local-border-radius);
    box-shadow: 0 0 0 1px var(--local-border);
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;var qn=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Zt=class extends H{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const e=this.iconSize||this.size,n=this.size==="lg",r=this.size==="xl",o=n?"12%":"16%",i=n?"xxs":r?"s":"3xl",s=this.background==="gray",a=this.background==="opaque",c=this.backgroundColor==="accent-100"&&a||this.backgroundColor==="success-100"&&a||this.backgroundColor==="error-100"&&a||this.backgroundColor==="inverse-100"&&a;let l=`var(--wui-color-${this.backgroundColor})`;return c?l=`var(--wui-icon-box-bg-${this.backgroundColor})`:s&&(l=`var(--wui-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${l};
       --local-bg-mix: ${c||s?"100%":o};
       --local-border-radius: var(--wui-border-radius-${i});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${this.borderColor==="wui-color-bg-125"?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,$` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `}};Zt.styles=[pe,Ye,My];qn([D()],Zt.prototype,"size",void 0);qn([D()],Zt.prototype,"backgroundColor",void 0);qn([D()],Zt.prototype,"iconColor",void 0);qn([D()],Zt.prototype,"iconSize",void 0);qn([D()],Zt.prototype,"background",void 0);qn([D({type:Boolean})],Zt.prototype,"border",void 0);qn([D()],Zt.prototype,"borderColor",void 0);qn([D()],Zt.prototype,"icon",void 0);Zt=qn([z("wui-icon-box")],Zt);const Uy=q`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    background: var(--wui-gray-glass-002);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-gray-glass-005);
  }

  button:disabled {
    background: var(--wui-gray-glass-015);
  }

  button:disabled > wui-text {
    color: var(--wui-gray-glass-015);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-gray-glass-015);
  }

  button:disabled > wui-image,
  button:disabled > wui-icon-box,
  button:disabled > wui-flex > wui-avatar {
    filter: grayscale(1);
  }

  button:has(wui-image) {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-3xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
  }

  wui-text {
    color: var(--wui-color-fg-100);
  }

  wui-flex > wui-text {
    color: var(--wui-color-fg-200);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-gray-glass-005);
  }

  wui-flex {
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-gray-glass-005);
    background: var(--wui-gray-glass-005);
    padding: 4px var(--wui-spacing-m) 4px var(--wui-spacing-xxs);
  }

  button.local-no-balance {
    border-radius: 0px;
    border: none;
    background: transparent;
  }

  wui-avatar {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 2px var(--wui-accent-glass-010);
  }

  @media (max-width: 500px) {
    button {
      gap: 0px;
      padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) !important;
      height: 32px;
    }
    wui-image,
    wui-icon-box,
    button > wui-text {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
    button {
      border-radius: 0px;
      border: none;
      background: transparent;
      padding: 0px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }

    button:active:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }
  }
`;var Kn=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Gt=class extends H{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.balance=void 0,this.disabled=!1,this.isProfileName=!1,this.address="",this.charsStart=4,this.charsEnd=6}render(){return $`
      <button
        ?disabled=${this.disabled}
        class=${ve(this.balance?void 0:"local-no-balance")}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${Be.getTruncateString({string:this.address,charsStart:this.isProfileName?18:this.charsStart,charsEnd:this.isProfileName?0:this.charsEnd,truncate:this.isProfileName?"end":"middle"})}
          </wui-text>
        </wui-flex>
      </button>
    `}balanceTemplate(){if(this.balance){const e=this.networkSrc?$`<wui-image src=${this.networkSrc}></wui-image>`:$`
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `;return $`
        ${e}
        <wui-text variant="paragraph-600" color="inherit"> ${this.balance} </wui-text>
      `}return null}};Gt.styles=[pe,Ye,Uy];Kn([D()],Gt.prototype,"networkSrc",void 0);Kn([D()],Gt.prototype,"avatarSrc",void 0);Kn([D()],Gt.prototype,"balance",void 0);Kn([D({type:Boolean})],Gt.prototype,"disabled",void 0);Kn([D({type:Boolean})],Gt.prototype,"isProfileName",void 0);Kn([D()],Gt.prototype,"address",void 0);Kn([D()],Gt.prototype,"charsStart",void 0);Kn([D()],Gt.prototype,"charsEnd",void 0);Gt=Kn([z("wui-account-button")],Gt);const By=q`
  :host {
    position: relative;
    background-color: var(--wui-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-base-150, #1e1f1f);
    padding: 1px;
  }
`;var hi=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Cn=class extends H{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return this.size==="lg"?e="m":this.size==="md"?e="xs":e="xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),$`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?$`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?$`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:$`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};Cn.styles=[pe,By];hi([D()],Cn.prototype,"size",void 0);hi([D()],Cn.prototype,"name",void 0);hi([D()],Cn.prototype,"imageSrc",void 0);hi([D()],Cn.prototype,"walletIcon",void 0);hi([D({type:Boolean})],Cn.prototype,"installed",void 0);hi([D()],Cn.prototype,"badgeSize",void 0);Cn=hi([z("wui-wallet-image")],Cn);const Ly=q`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var Pp=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const Al=4;let as=class extends H{constructor(){super(...arguments),this.walletImages=[]}render(){const e=this.walletImages.length<Al;return $`${this.walletImages.slice(0,Al).map(({src:n,walletName:r})=>$`
            <wui-wallet-image
              size="inherit"
              imageSrc=${n}
              name=${ve(r)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(Al-this.walletImages.length)].map(()=>$` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};as.styles=[pe,Ly];Pp([D({type:Array})],as.prototype,"walletImages",void 0);as=Pp([z("wui-all-wallets-image")],as);const jy=q`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: 1px solid var(--wui-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    width: var(--local-width);
  }

  button:disabled {
    border: 1px solid var(--wui-gray-glass-010);
  }

  button[data-size='sm'] {
    padding: var(--wui-spacing-xxs) var(--wui-spacing-s);
  }

  button[data-size='sm'][data-icon-left='true'] {
    padding: var(--wui-spacing-xxs) var(--wui-spacing-s) var(--wui-spacing-xxs)
      var(--wui-spacing-xs);
  }

  button[data-size='sm'][data-icon-right='true'] {
    padding: var(--wui-spacing-xxs) var(--wui-spacing-xs) var(--wui-spacing-xxs)
      var(--wui-spacing-s);
  }

  ::slotted(*) {
    transition: opacity 200ms ease-in-out;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity 200ms ease-in-out;
    opacity: var(--local-opacity-100);
  }

  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'][data-icon-left='true'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transition: all 200ms ease-in-out;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var Er=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let an=class extends H{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="fill",this.hasIconLeft=!1,this.hasIconRight=!1}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};`;const e=this.size==="md"?"paragraph-600":"small-600";return $`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled||this.loading}
        ontouchstart
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){return this.loading?$`<wui-loading-spinner color="fg-300"></wui-loading-spinner>`:$``}};an.styles=[pe,Ye,jy];Er([D()],an.prototype,"size",void 0);Er([D({type:Boolean})],an.prototype,"disabled",void 0);Er([D({type:Boolean})],an.prototype,"fullWidth",void 0);Er([D({type:Boolean})],an.prototype,"loading",void 0);Er([D()],an.prototype,"variant",void 0);Er([D({type:Boolean})],an.prototype,"hasIconLeft",void 0);Er([D({type:Boolean})],an.prototype,"hasIconRight",void 0);an=Er([z("wui-button")],an);const Op=K`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,Fy=q`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 76px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-gray-glass-010);
    stroke-width: 1px;
  }
`;var Rp=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let cs=class extends H{constructor(){super(...arguments),this.type="wallet"}render(){return $`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?$` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${Op}`:$`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};cs.styles=[pe,Ye,Fy];Rp([D()],cs.prototype,"type",void 0);cs=Rp([z("wui-card-select-loader")],cs);const Wy=K`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`,zy=q`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    fill: var(--wui-gray-glass-002);
  }

  svg > path {
    stroke: var(--local-stroke);
    transition: stroke var(--wui-ease-out-power-1) var(--wui-duration-lg);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: var(--wui-gray-glass-002);
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`;var Ws=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let hr=class extends H{constructor(){super(...arguments),this.size="md",this.name="uknown",this.selected=!1}render(){const e=this.size==="lg";return this.style.cssText=`
      --local-stroke: ${this.selected?"var(--wui-color-accent-100)":"var(--wui-gray-glass-010)"};
      --local-path: ${e?"var(--wui-path-network-lg)":"var(--wui-path-network)"};
      --local-width: ${e?"86px":"48px"};
      --local-height: ${e?"96px":"54px"};
      --local-icon-size: ${e?"42px":"24px"};
    `,$`${this.templateVisual()} ${e?Wy:Op}`}templateVisual(){return this.imageSrc?$`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:$`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};hr.styles=[pe,zy];Ws([D()],hr.prototype,"size",void 0);Ws([D()],hr.prototype,"name",void 0);Ws([D()],hr.prototype,"imageSrc",void 0);Ws([D({type:Boolean})],hr.prototype,"selected",void 0);hr=Ws([z("wui-network-image")],hr);const Hy=q`
  button {
    flex-direction: column;
    width: 76px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-0);
    background-color: var(--wui-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
  }

  button > wui-text {
    color: var(--wui-color-fg-100);
    max-width: var(--wui-icon-box-size-xl);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button:disabled > wui-text {
    color: var(--wui-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-accent-glass-010);
  }
`;var pi=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Sn=class extends H{constructor(){super(...arguments),this.name="Unknown",this.type="wallet",this.imageSrc=void 0,this.disabled=!1,this.selected=!1,this.installed=!1}render(){return $`
      <button data-selected=${ve(this.selected)} ?disabled=${this.disabled} ontouchstart>
        ${this.imageTemplate()}
        <wui-text variant="tiny-500" color=${this.selected?"accent-100":"inherit"}>
          ${this.name}
        </wui-text>
      </button>
    `}imageTemplate(){return this.type==="network"?$`
        <wui-network-image
          .selected=${this.selected}
          imageSrc=${ve(this.imageSrc)}
          name=${this.name}
        >
        </wui-network-image>
      `:$`
      <wui-wallet-image
        size="md"
        imageSrc=${ve(this.imageSrc)}
        name=${this.name}
        .installed=${this.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}};Sn.styles=[pe,Ye,Hy];pi([D()],Sn.prototype,"name",void 0);pi([D()],Sn.prototype,"type",void 0);pi([D()],Sn.prototype,"imageSrc",void 0);pi([D({type:Boolean})],Sn.prototype,"disabled",void 0);pi([D({type:Boolean})],Sn.prototype,"selected",void 0);pi([D({type:Boolean})],Sn.prototype,"installed",void 0);Sn=pi([z("wui-card-select")],Sn);const Vy=q`
  a {
    border: 1px solid var(--wui-gray-glass-010);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  a.disabled > wui-icon,
  a.disabled > wui-image {
    filter: grayscale(1);
  }

  a[data-variant='fill'] {
    color: var(--wui-color-inverse-100);
    background-color: var(--wui-color-accent-100);
  }

  a[data-variant='shade'],
  a[data-variant='shadeSmall'] {
    background-color: transparent;
    background-color: var(--wui-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  a[data-variant='success'] {
    column-gap: var(--wui-spacing-xxs);
    border: 1px solid var(--wui-success-glass-010);
    background-color: var(--wui-success-glass-010);
    color: var(--wui-color-success-100);
  }

  a[data-variant='transparent'] {
    column-gap: var(--wui-spacing-xxs);
    background-color: transparent;
    color: var(--wui-color-fg-150);
  }

  a[data-variant='transparent'],
  a[data-variant='success'],
  a[data-variant='shadeSmall'] {
    padding: 7px var(--wui-spacing-s) 7px 10px;
  }

  a[data-variant='transparent']:has(wui-text:first-child),
  a[data-variant='success']:has(wui-text:first-child),
  a[data-variant='shadeSmall']:has(wui-text:first-child) {
    padding: 7px var(--wui-spacing-s);
  }

  a[data-variant='fill'],
  a[data-variant='shade'] {
    column-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-xxs)
      var(--wui-spacing-xs);
  }

  a[data-variant='fill']:has(wui-text:first-child),
  a[data-variant='shade']:has(wui-text:first-child) {
    padding: 9px var(--wui-spacing-m) 9px var(--wui-spacing-m);
  }

  a[data-variant='fill'] > wui-image,
  a[data-variant='shade'] > wui-image {
    width: 24px;
    height: 24px;
  }

  a[data-variant='fill'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  a[data-variant='shade'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-gray-glass-010);
  }

  a[data-variant='fill'] > wui-icon,
  a[data-variant='shade'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-image,
  a[data-variant='success'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-icon,
  a[data-variant='success'] > wui-icon,
  a[data-variant='shadeSmall'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  a[data-variant='fill']:focus-visible {
    background-color: var(--wui-color-accent-090);
  }

  a[data-variant='shade']:focus-visible,
  a[data-variant='shadeSmall']:focus-visible {
    background-color: var(--wui-gray-glass-015);
  }

  a[data-variant='transparent']:focus-visible {
    background-color: var(--wui-gray-glass-005);
  }

  a[data-variant='success']:focus-visible {
    background-color: var(--wui-success-glass-015);
  }

  a.disabled {
    color: var(--wui-gray-glass-015);
    background-color: var(--wui-gray-glass-015);
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    a[data-variant='fill']:hover {
      background-color: var(--wui-color-accent-090);
    }

    a[data-variant='shade']:hover,
    a[data-variant='shadeSmall']:hover {
      background-color: var(--wui-gray-glass-015);
    }

    a[data-variant='transparent']:hover {
      background-color: var(--wui-gray-glass-005);
    }

    a[data-variant='success']:hover {
      background-color: var(--wui-success-glass-015);
    }
  }

  a[data-variant='fill']:active {
    background-color: var(--wui-color-accent-080);
  }

  a[data-variant='shade']:active,
  a[data-variant='shadeSmall']:active {
    background-color: var(--wui-gray-glass-020);
  }

  a[data-variant='transparent']:active {
    background-color: var(--wui-gray-glass-010);
  }

  a[data-variant='success']:active {
    background-color: var(--wui-success-glass-020);
  }
`;var gi=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let An=class extends H{constructor(){super(...arguments),this.variant="fill",this.imageSrc=void 0,this.disabled=!1,this.icon="externalLink",this.href="",this.text=void 0}render(){const n=this.variant==="success"||this.variant==="transparent"||this.variant==="shadeSmall"?"small-600":"paragraph-600";return $`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
      >
        ${this.imageTemplate()}
        <wui-text variant=${n} color="inherit">
          ${this.title?this.title:Be.getHostName(this.href)}
        </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </a>
    `}imageTemplate(){return this.imageSrc?$`<wui-image src=${this.imageSrc}></wui-image>`:null}};An.styles=[pe,Ye,Vy];gi([D()],An.prototype,"variant",void 0);gi([D()],An.prototype,"imageSrc",void 0);gi([D({type:Boolean})],An.prototype,"disabled",void 0);gi([D()],An.prototype,"icon",void 0);gi([D()],An.prototype,"href",void 0);gi([D()],An.prototype,"text",void 0);An=gi([z("wui-chip")],An);const Zy=q`
  :host {
    position: relative;
    display: block;
  }

  button {
    background: var(--wui-color-accent-100);
    border: 1px solid var(--wui-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    gap: var(--wui-spacing-xs);
  }

  button.loading {
    background: var(--wui-gray-glass-010);
    border: 1px solid var(--wui-gray-glass-010);
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-gray-glass-015);
    border: 1px solid var(--wui-gray-glass-010);
  }

  button:disabled > wui-text {
    color: var(--wui-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-080);
    }
  }

  button:focus-visible {
    border: 1px solid var(--wui-gray-glass-010);
    background-color: var(--wui-color-accent-090);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-size='sm'] {
    padding: 6.75px 10px 7.25px;
  }

  ::slotted(*) {
    transition: opacity 200ms ease-in-out;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity 200ms ease-in-out;
    opacity: var(--local-opacity-100);
    color: var(--wui-color-inverse-100);
  }

  button[data-size='md'] {
    padding: 9px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'] + wui-text {
    padding-left: var(--wui-spacing-3xs);
  }

  @media (max-width: 500px) {
    button[data-size='md'] {
      height: 32px;
      padding: 5px 12px;
    }

    button[data-size='md'] > wui-text > slot {
      font-size: 14px !important;
    }
  }

  wui-loading-spinner {
    width: 14px;
    height: 14px;
  }

  wui-loading-spinner::slotted(svg) {
    width: 10px !important;
    height: 10px !important;
  }

  button[data-size='sm'] > wui-loading-spinner {
    width: 12px;
    height: 12px;
  }
`;var kd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let zi=class extends H{constructor(){super(...arguments),this.size="md",this.loading=!1}render(){const e=this.size==="md"?"paragraph-600":"small-600";return $`
      <button data-size=${this.size} ?disabled=${this.loading} ontouchstart>
        ${this.loadingTemplate()}
        <wui-text variant=${e} color=${this.loading?"accent-100":"inherit"}>
          <slot></slot>
        </wui-text>
      </button>
    `}loadingTemplate(){return this.loading?$`<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`:null}};zi.styles=[pe,Ye,Zy];kd([D()],zi.prototype,"size",void 0);kd([D({type:Boolean})],zi.prototype,"loading",void 0);zi=kd([z("wui-connect-button")],zi);const Gy=q`
  wui-flex {
    width: 100%;
    background-color: var(--wui-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var Mc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Xr=class extends H{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return $`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-button size="sm" variant="accent">
          ${this.buttonLabel}
          <wui-icon size="xs" color="inherit" slot="iconRight" name="chevronRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};Xr.styles=[pe,Ye,Gy];Mc([D({type:Boolean})],Xr.prototype,"disabled",void 0);Mc([D()],Xr.prototype,"label",void 0);Mc([D()],Xr.prototype,"buttonLabel",void 0);Xr=Mc([z("wui-cta-button")],Xr);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qy=t=>t.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ro=(t,e)=>{var r;const n=t._$AN;if(n===void 0)return!1;for(const o of n)(r=o._$AO)==null||r.call(o,e,!1),Ro(o,e);return!0},Ma=t=>{let e,n;do{if((e=t._$AM)===void 0)break;n=e._$AN,n.delete(t),t=e}while((n==null?void 0:n.size)===0)},Np=t=>{for(let e;e=t._$AM;t=e){let n=e._$AN;if(n===void 0)e._$AN=n=new Set;else if(n.has(t))break;n.add(t),Jy(e)}};function Ky(t){this._$AN!==void 0?(Ma(this),this._$AM=t,Np(this)):this._$AM=t}function Yy(t,e=!1,n=0){const r=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(r))for(let i=n;i<r.length;i++)Ro(r[i],!1),Ma(r[i]);else r!=null&&(Ro(r,!1),Ma(r));else Ro(this,t)}const Jy=t=>{t.type==Tp.CHILD&&(t._$AP??(t._$AP=Yy),t._$AQ??(t._$AQ=Ky))};class Xy extends $p{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,n,r){super._$AT(e,n,r),Np(this),this.isConnected=e._$AU}_$AO(e,n=!0){var r,o;e!==this.isConnected&&(this.isConnected=e,e?(r=this.reconnected)==null||r.call(this):(o=this.disconnected)==null||o.call(this)),n&&(Ro(this,e),Ma(this))}setValue(e){if(qy(this._$Ct))this._$Ct._$AI(e,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=e,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Uc=()=>new Qy;let Qy=class{};const Tl=new WeakMap,Bc=Ip(class extends Xy{render(t){return rt}update(t,[e]){var r;const n=e!==this.Y;return n&&this.Y!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.Y=e,this.ht=(r=t.options)==null?void 0:r.host,this.rt(this.ct=t.element)),rt}rt(t){if(typeof this.Y=="function"){const e=this.ht??globalThis;let n=Tl.get(e);n===void 0&&(n=new WeakMap,Tl.set(e,n)),n.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),n.set(this.Y,t),t!==void 0&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){var t,e;return typeof this.Y=="function"?(t=Tl.get(this.ht??globalThis))==null?void 0:t.get(this.Y):(e=this.Y)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),ev=q`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-gray-glass-005);
    background: var(--wui-gray-glass-005);
    font-size: var(--wui-font-size-paragraph);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition: all var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-sm);
    background-color: var(--wui-gray-glass-010);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-gray-glass-010);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px 40px;
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all var(--wui-ease-in-power-2) var(--wui-duration-md);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var _r=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let cn=class extends H{constructor(){super(...arguments),this.inputElementRef=Uc(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text"}render(){const e=`wui-size-${this.size}`;return $` ${this.templateIcon()}
      <input
        ${Bc(this.inputElementRef)}
        class=${e}
        type=${this.type}
        enterkeyhint=${ve(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        value=${ve(this.value)}
      />
      <slot></slot>`}templateIcon(){return this.icon?$`<wui-icon
        data-input=${this.size}
        size="sm"
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){var e;this.dispatchEvent(new CustomEvent("inputChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.value,bubbles:!0,composed:!0}))}};cn.styles=[pe,Ye,ev];_r([D()],cn.prototype,"size",void 0);_r([D()],cn.prototype,"icon",void 0);_r([D({type:Boolean})],cn.prototype,"disabled",void 0);_r([D()],cn.prototype,"placeholder",void 0);_r([D()],cn.prototype,"type",void 0);_r([D()],cn.prototype,"keyHint",void 0);_r([D()],cn.prototype,"value",void 0);cn=_r([z("wui-input-text")],cn);const tv=q`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`;var Lc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Qr=class extends H{constructor(){super(...arguments),this.disabled=!1}render(){return $`
      <wui-input-text
        placeholder="Email"
        icon="mail"
        size="md"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?$`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};Qr.styles=[pe,tv];Lc([D()],Qr.prototype,"errorMessage",void 0);Lc([D({type:Boolean})],Qr.prototype,"disabled",void 0);Lc([D()],Qr.prototype,"value",void 0);Qr=Lc([z("wui-email-input")],Qr);const nv=q`
  button {
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-fg-100);
    padding: var(--wui-spacing-2xs);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`;var zs=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let pr=class extends H{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="inherit"}render(){return $`
      <button ?disabled=${this.disabled} ontouchstart>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};pr.styles=[pe,Ye,Od,nv];zs([D()],pr.prototype,"size",void 0);zs([D({type:Boolean})],pr.prototype,"disabled",void 0);zs([D()],pr.prototype,"icon",void 0);zs([D()],pr.prototype,"iconColor",void 0);pr=zs([z("wui-icon-link")],pr);const rv=q`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  button:active:enabled {
    background-color: var(--wui-color-fg-225);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }
  }
`;var kp=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ls=class extends H{constructor(){super(...arguments),this.icon="copy"}render(){return $`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};ls.styles=[pe,Ye,rv];kp([D()],ls.prototype,"icon",void 0);ls=kp([z("wui-input-element")],ls);const iv=q`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 50px;
    height: 50px;
    background: var(--wui-gray-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-gray-glass-005);
    font-family: var(--wui-font-family);
    font-size: var(--wui-font-size-large);
    font-weight: var(--wui-font-weight-regular);
    letter-spacing: var(--wui-letter-spacing-large);
    text-align: center;
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    transition: all var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-gray-glass-010);
    background: var(--wui-gray-glass-005);
  }

  input:focus:enabled {
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-sm);
    background-color: var(--wui-gray-glass-015);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }
  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      background-color: var(--wui-gray-glass-015);
    }
  }
`;var Md=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Hi=class extends H{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return $`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};Hi.styles=[pe,Ye,iv];Md([D({type:Boolean})],Hi.prototype,"disabled",void 0);Md([D({type:String})],Hi.prototype,"value",void 0);Hi=Md([z("wui-input-numeric")],Hi);const ov=q`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-gray-glass-015);
  }
`;var Ud=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Vi=class extends H{constructor(){super(...arguments),this.disabled=!1,this.color="inherit"}render(){return $`
      <button ?disabled=${this.disabled} ontouchstart>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};Vi.styles=[pe,Ye,ov];Ud([D({type:Boolean})],Vi.prototype,"disabled",void 0);Ud([D()],Vi.prototype,"color",void 0);Vi=Ud([z("wui-link")],Vi);const sv=q`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    background-color: var(--wui-gray-glass-015);
    color: var(--wui-gray-glass-015);
  }

  button[data-loading='true'] > wui-icon {
    transition: opacity 200ms ease-in-out;
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var On=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Ft=class extends H{constructor(){super(...arguments),this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return $`
      <button
        ?disabled=${this.loading?!0:!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${ve(this.iconVariant)}
        ontouchstart
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if(this.variant==="image"&&this.imageSrc)return $`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if(this.iconVariant==="square"&&this.icon&&this.variant==="icon")return $`<wui-icon name=${this.icon}></wui-icon>`;if(this.variant==="icon"&&this.icon&&this.iconVariant){const e=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",n=this.iconVariant==="square-blue"?"mdl":"md",r=this.iconSize?this.iconSize:n;return $`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${r}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${n}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?$`<wui-loading-spinner color="fg-300"></wui-loading-spinner>`:$``}chevronTemplate(){return this.chevron?$`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};Ft.styles=[pe,Ye,sv];On([D()],Ft.prototype,"icon",void 0);On([D()],Ft.prototype,"iconSize",void 0);On([D()],Ft.prototype,"variant",void 0);On([D()],Ft.prototype,"iconVariant",void 0);On([D({type:Boolean})],Ft.prototype,"disabled",void 0);On([D()],Ft.prototype,"imageSrc",void 0);On([D()],Ft.prototype,"alt",void 0);On([D({type:Boolean})],Ft.prototype,"chevron",void 0);On([D({type:Boolean})],Ft.prototype,"loading",void 0);Ft=On([z("wui-list-item")],Ft);var gu;(function(t){t.approve="approved",t.bought="bought",t.borrow="borrowed",t.burn="burnt",t.cancel="canceled",t.claim="claimed",t.deploy="deployed",t.deposit="deposited",t.execute="executed",t.mint="minted",t.receive="received",t.repay="repaid",t.send="sent",t.sell="sold",t.stake="staked",t.trade="swapped",t.unstake="unstaked",t.withdraw="withdrawn"})(gu||(gu={}));const av=q`
  :host > wui-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 1px var(--wui-gray-glass-005);
    background-color: var(--wui-gray-glass-005);
  }

  :host > wui-flex wui-image {
    display: block;
    z-index: -1;
  }

  :host > wui-flex,
  :host > wui-flex wui-image,
  .swap-images-container,
  .swap-images-container.nft,
  wui-image.nft {
    border-top-left-radius: var(--local-left-border-radius);
    border-top-right-radius: var(--local-right-border-radius);
    border-bottom-left-radius: var(--local-left-border-radius);
    border-bottom-right-radius: var(--local-right-border-radius);
  }

  wui-icon {
    width: 20px;
    height: 20px;
  }

  wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }

  .swap-images-container {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .swap-images-container wui-image:first-child {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0%;
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-images-container wui-image:last-child {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }
`;var mi=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Tn=class extends H{constructor(){super(...arguments),this.images=[],this.secondImage={type:void 0,url:""}}render(){const[e,n]=this.images,r=(e==null?void 0:e.type)==="NFT",o=n!=null&&n.url?n.type==="NFT":r,i=r?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)",s=o?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)";return this.style.cssText=`
    --local-left-border-radius: ${i};
    --local-right-border-radius: ${s};
    `,$`<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`}templateVisual(){const[e,n]=this.images,r=e==null?void 0:e.type;return this.images.length===2&&(e!=null&&e.url||n!=null&&n.url)?$`<div class="swap-images-container">
        ${e!=null&&e.url?$`<wui-image src=${e.url} alt="Transaction image"></wui-image>`:null}
        ${n!=null&&n.url?$`<wui-image src=${n.url} alt="Transaction image"></wui-image>`:null}
      </div>`:e!=null&&e.url?$`<wui-image src=${e.url} alt="Transaction image"></wui-image>`:r==="NFT"?$`<wui-icon size="inherit" color="fg-200" name="nftPlaceholder"></wui-icon>`:$`<wui-icon size="inherit" color="fg-200" name="coinPlaceholder"></wui-icon>`}templateIcon(){let e="accent-100",n;return n=this.getIcon(),this.status&&(e=this.getStatusColor()),n?$`
      <wui-icon-box
        size="xxs"
        iconColor=${e}
        backgroundColor=${e}
        background="opaque"
        icon=${n}
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
    `:null}getDirectionIcon(){switch(this.direction){case"in":return"arrowBottom";case"out":return"arrowTop";default:return}}getIcon(){return this.onlyDirectionIcon?this.getDirectionIcon():this.type==="trade"?"swapHorizontalBold":this.type==="approve"?"checkmark":this.type==="cancel"?"close":this.getDirectionIcon()}getStatusColor(){switch(this.status){case"confirmed":return"success-100";case"failed":return"error-100";case"pending":return"inverse-100";default:return"accent-100"}}};Tn.styles=[av];mi([D()],Tn.prototype,"type",void 0);mi([D()],Tn.prototype,"status",void 0);mi([D()],Tn.prototype,"direction",void 0);mi([D({type:Boolean})],Tn.prototype,"onlyDirectionIcon",void 0);mi([D({type:Array})],Tn.prototype,"images",void 0);mi([D({type:Object})],Tn.prototype,"secondImage",void 0);Tn=mi([z("wui-transaction-visual")],Tn);const cv=q`
  :host > wui-flex:first-child {
    align-items: center;
    column-gap: var(--wui-spacing-s);
    padding: 6.5px var(--wui-spacing-l) 6.5px var(--wui-spacing-xs);
    width: 100%;
  }

  :host > wui-flex:first-child wui-text:nth-child(1) {
    text-transform: capitalize;
  }

  wui-transaction-visual {
    width: 40px;
    height: 40px;
  }

  wui-flex {
    flex: 1;
  }

  :host wui-flex wui-flex {
    overflow: hidden;
  }

  :host .description-container wui-text span {
    word-break: break-all;
  }

  :host .description-container wui-text {
    overflow: hidden;
  }

  :host .description-separator-icon {
    margin: 0px 6px;
  }

  :host wui-text > span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;var Cr=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ln=class extends H{constructor(){super(...arguments),this.type="approve",this.onlyDirectionIcon=!1,this.images=[]}render(){return $`
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${ve(this.direction)}
          type=${this.type}
          onlyDirectionIcon=${ve(this.onlyDirectionIcon)}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="3xs">
          <wui-text variant="paragraph-600" color="fg-100">
            ${gu[this.type]}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>
      </wui-flex>
    `}templateDescription(){var n;const e=(n=this.descriptions)==null?void 0:n[0];return e?$`
          <wui-text variant="small-500" color="fg-200">
            <span>${e}</span>
          </wui-text>
        `:null}templateSecondDescription(){var n;const e=(n=this.descriptions)==null?void 0:n[1];return e?$`
          <wui-icon class="description-separator-icon" size="xxs" name="arrowRight"></wui-icon>
          <wui-text variant="small-400" color="fg-200">
            <span>${e}</span>
          </wui-text>
        `:null}};ln.styles=[pe,cv];Cr([D()],ln.prototype,"type",void 0);Cr([D({type:Array})],ln.prototype,"descriptions",void 0);Cr([D()],ln.prototype,"date",void 0);Cr([D({type:Boolean})],ln.prototype,"onlyDirectionIcon",void 0);Cr([D()],ln.prototype,"status",void 0);Cr([D()],ln.prototype,"direction",void 0);Cr([D({type:Array})],ln.prototype,"images",void 0);ln=Cr([z("wui-transaction-list-item")],ln);const lv=q`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;var uv=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Ua=class extends H{render(){return $`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" borderRadius="5xs"></wui-shimmer>
      </wui-flex>
    `}};Ua.styles=[pe,lv];Ua=uv([z("wui-transaction-list-item-loader")],Ua);const dv=q`
  :host {
    display: block;
    padding: 3.5px 5px !important;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }
`;var Mp=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let us=class extends H{constructor(){super(...arguments),this.variant="main"}render(){return this.dataset.variant=this.variant,$`
      <wui-text data-variant=${this.variant} variant="micro-700" color="inherit">
        <slot></slot>
      </wui-text>
    `}};us.styles=[pe,dv];Mp([D()],us.prototype,"variant",void 0);us=Mp([z("wui-tag")],us);const fv=q`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }

  button:disabled {
    background-color: var(--wui-gray-glass-015);
    color: var(--wui-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-gray-glass-010);
    color: var(--wui-color-fg-300);
  }
`;var gn=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Ot=class extends H{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.installed=!1,this.disabled=!1,this.showAllWallets=!1}render(){return $`
      <button ?disabled=${this.disabled} ontouchstart>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?$` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?$` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?$`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?$`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.tagLabel&&this.tagVariant?$`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?$`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};Ot.styles=[pe,Ye,fv];gn([D({type:Array})],Ot.prototype,"walletImages",void 0);gn([D()],Ot.prototype,"imageSrc",void 0);gn([D()],Ot.prototype,"name",void 0);gn([D()],Ot.prototype,"tagLabel",void 0);gn([D()],Ot.prototype,"tagVariant",void 0);gn([D()],Ot.prototype,"icon",void 0);gn([D()],Ot.prototype,"walletIcon",void 0);gn([D({type:Boolean})],Ot.prototype,"installed",void 0);gn([D({type:Boolean})],Ot.prototype,"disabled",void 0);gn([D({type:Boolean})],Ot.prototype,"showAllWallets",void 0);Ot=gn([z("wui-list-wallet")],Ot);const hv=q`
  :host {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-gray-glass-010);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`;var Up=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ds=class extends H{constructor(){super(...arguments),this.logo="google"}render(){return $`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};ds.styles=[pe,hv];Up([D()],ds.prototype,"logo",void 0);ds=Up([z("wui-logo")],ds);const pv=q`
  :host {
    display: block;
  }

  button {
    width: 50px;
    height: 50px;
    background: var(--wui-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var Bd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Zi=class extends H{constructor(){super(...arguments),this.logo="google",this.disabled=!1}render(){return $`
      <button ?disabled=${this.disabled} ontouchstart>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `}};Zi.styles=[pe,Ye,pv];Bd([D()],Zi.prototype,"logo",void 0);Bd([D({type:Boolean})],Zi.prototype,"disabled",void 0);Zi=Bd([z("wui-logo-select")],Zi);const gv=q`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-s) var(--wui-spacing-2xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-gray-glass-010);
    background-color: var(--wui-gray-glass-005);
    color: var(--wui-color-fg-100);
  }

  button:disabled {
    border: 1px solid var(--wui-gray-glass-005);
    background-color: var(--wui-gray-glass-015);
    color: var(--wui-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-gray-glass-010);
    }

    button:active:enabled {
      background-color: var(--wui-gray-glass-015);
    }
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-gray-glass-005);
  }
`;var Ld=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Gi=class extends H{constructor(){super(...arguments),this.imageSrc=void 0,this.disabled=!1}render(){return $`
      <button ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `}visualTemplate(){return this.imageSrc?$`<wui-image src=${this.imageSrc}></wui-image>`:$`
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};Gi.styles=[pe,Ye,gv];Ld([D()],Gi.prototype,"imageSrc",void 0);Ld([D({type:Boolean})],Gi.prototype,"disabled",void 0);Gi=Ld([z("wui-network-button")],Gi);const mv=q`
  :host {
    position: relative;
    display: block;
  }
`;var jc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ei=class extends H{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=e=>this.values.slice(0,e).every(r=>r!==""),this.handleKeyDown=(e,n)=>{const r=e.target,o=this.getInputElement(r),i=["ArrowLeft","ArrowRight","Shift","Delete"];if(!o)return;i.includes(e.key)&&e.preventDefault();const s=o.selectionStart;switch(e.key){case"ArrowLeft":s&&o.setSelectionRange(s+1,s+1),this.focusInputField("prev",n);break;case"ArrowRight":this.focusInputField("next",n);break;case"Shift":this.focusInputField("next",n);break;case"Delete":o.value===""?this.focusInputField("prev",n):this.updateInput(o,n,"");break;case"Backspace":o.value===""?this.focusInputField("prev",n):this.updateInput(o,n,"");break}},this.focusInputField=(e,n)=>{if(e==="next"){const r=n+1;if(!this.shouldInputBeEnabled(r))return;const o=this.numerics[r<this.length?r:n],i=o?this.getInputElement(o):void 0;i&&(i.disabled=!1,i.focus())}if(e==="prev"){const r=n-1,o=this.numerics[r>-1?r:n],i=o?this.getInputElement(o):void 0;i&&i.focus()}}}firstUpdated(){var n,r;this.otp&&(this.values=this.otp.split(""));const e=(n=this.shadowRoot)==null?void 0:n.querySelectorAll("wui-input-numeric");e&&(this.numerics=Array.from(e)),(r=this.numerics[0])==null||r.focus()}render(){return $`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((e,n)=>$`
            <wui-input-numeric
              @input=${r=>this.handleInput(r,n)}
              @keydown=${r=>this.handleKeyDown(r,n)}
              .disabled=${!this.shouldInputBeEnabled(n)}
              .value=${this.values[n]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(e,n,r){const o=this.numerics[n],i=e||(o?this.getInputElement(o):void 0);i&&(i.value=r,this.values=this.values.map((s,a)=>a===n?r:s))}handleInput(e,n){const r=e.target,o=this.getInputElement(r);if(o){const i=o.value;e.inputType==="insertFromPaste"?this.handlePaste(o,i,n):Be.isNumber(i)&&e.data?(this.updateInput(o,n,e.data),this.focusInputField("next",n)):this.updateInput(o,n,"")}this.dispatchInputChangeEvent()}handlePaste(e,n,r){const o=n[0];if(o&&Be.isNumber(o)){this.updateInput(e,r,o);const s=n.substring(1);if(r+1<this.length&&s.length){const a=this.numerics[r+1],c=a?this.getInputElement(a):void 0;c&&this.handlePaste(c,s,r+1)}else this.focusInputField("next",r)}else this.updateInput(e,r,"")}getInputElement(e){var n;return(n=e.shadowRoot)!=null&&n.querySelector("input")?e.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){const e=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:e,bubbles:!0,composed:!0}))}};ei.styles=[pe,mv];jc([D({type:Number})],ei.prototype,"length",void 0);jc([D({type:String})],ei.prototype,"otp",void 0);jc([ee()],ei.prototype,"values",void 0);ei=jc([z("wui-otp")],ei);var Hs={},wv=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},Bp={},zt={};let jd;const bv=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];zt.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};zt.getSymbolTotalCodewords=function(e){return bv[e]};zt.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e};zt.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');jd=e};zt.isKanjiModeEnabled=function(){return typeof jd<"u"};zt.toSJIS=function(e){return jd(e)};var Fc={};(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function e(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+n)}}t.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},t.from=function(r,o){if(t.isValid(r))return r;try{return e(r)}catch{return o}}})(Fc);function Lp(){this.buffer=[],this.length=0}Lp.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let n=0;n<e;n++)this.putBit((t>>>e-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var yv=Lp;function Vs(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}Vs.prototype.set=function(t,e,n,r){const o=t*this.size+e;this.data[o]=n,r&&(this.reservedBit[o]=!0)};Vs.prototype.get=function(t,e){return this.data[t*this.size+e]};Vs.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n};Vs.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};var vv=Vs,jp={};(function(t){const e=zt.getSymbolSize;t.getRowColCoords=function(r){if(r===1)return[];const o=Math.floor(r/7)+2,i=e(r),s=i===145?26:Math.ceil((i-13)/(2*o-2))*2,a=[i-7];for(let c=1;c<o-1;c++)a[c]=a[c-1]-s;return a.push(6),a.reverse()},t.getPositions=function(r){const o=[],i=t.getRowColCoords(r),s=i.length;for(let a=0;a<s;a++)for(let c=0;c<s;c++)a===0&&c===0||a===0&&c===s-1||a===s-1&&c===0||o.push([i[a],i[c]]);return o}})(jp);var Fp={};const xv=zt.getSymbolSize,rf=7;Fp.getPositions=function(e){const n=xv(e);return[[0,0],[n-rf,0],[0,n-rf]]};var Wp={};(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};t.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},t.from=function(o){return t.isValid(o)?parseInt(o,10):void 0},t.getPenaltyN1=function(o){const i=o.size;let s=0,a=0,c=0,l=null,u=null;for(let p=0;p<i;p++){a=c=0,l=u=null;for(let g=0;g<i;g++){let m=o.get(p,g);m===l?a++:(a>=5&&(s+=e.N1+(a-5)),l=m,a=1),m=o.get(g,p),m===u?c++:(c>=5&&(s+=e.N1+(c-5)),u=m,c=1)}a>=5&&(s+=e.N1+(a-5)),c>=5&&(s+=e.N1+(c-5))}return s},t.getPenaltyN2=function(o){const i=o.size;let s=0;for(let a=0;a<i-1;a++)for(let c=0;c<i-1;c++){const l=o.get(a,c)+o.get(a,c+1)+o.get(a+1,c)+o.get(a+1,c+1);(l===4||l===0)&&s++}return s*e.N2},t.getPenaltyN3=function(o){const i=o.size;let s=0,a=0,c=0;for(let l=0;l<i;l++){a=c=0;for(let u=0;u<i;u++)a=a<<1&2047|o.get(l,u),u>=10&&(a===1488||a===93)&&s++,c=c<<1&2047|o.get(u,l),u>=10&&(c===1488||c===93)&&s++}return s*e.N3},t.getPenaltyN4=function(o){let i=0;const s=o.data.length;for(let c=0;c<s;c++)i+=o.data[c];return Math.abs(Math.ceil(i*100/s/5)-10)*e.N4};function n(r,o,i){switch(r){case t.Patterns.PATTERN000:return(o+i)%2===0;case t.Patterns.PATTERN001:return o%2===0;case t.Patterns.PATTERN010:return i%3===0;case t.Patterns.PATTERN011:return(o+i)%3===0;case t.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(i/3))%2===0;case t.Patterns.PATTERN101:return o*i%2+o*i%3===0;case t.Patterns.PATTERN110:return(o*i%2+o*i%3)%2===0;case t.Patterns.PATTERN111:return(o*i%3+(o+i)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}t.applyMask=function(o,i){const s=i.size;for(let a=0;a<s;a++)for(let c=0;c<s;c++)i.isReserved(c,a)||i.xor(c,a,n(o,c,a))},t.getBestMask=function(o,i){const s=Object.keys(t.Patterns).length;let a=0,c=1/0;for(let l=0;l<s;l++){i(l),t.applyMask(l,o);const u=t.getPenaltyN1(o)+t.getPenaltyN2(o)+t.getPenaltyN3(o)+t.getPenaltyN4(o);t.applyMask(l,o),u<c&&(c=u,a=l)}return a}})(Wp);var Wc={};const ir=Fc,ca=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],la=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Wc.getBlocksCount=function(e,n){switch(n){case ir.L:return ca[(e-1)*4+0];case ir.M:return ca[(e-1)*4+1];case ir.Q:return ca[(e-1)*4+2];case ir.H:return ca[(e-1)*4+3];default:return}};Wc.getTotalCodewordsCount=function(e,n){switch(n){case ir.L:return la[(e-1)*4+0];case ir.M:return la[(e-1)*4+1];case ir.Q:return la[(e-1)*4+2];case ir.H:return la[(e-1)*4+3];default:return}};var zp={},zc={};const No=new Uint8Array(512),Ba=new Uint8Array(256);(function(){let e=1;for(let n=0;n<255;n++)No[n]=e,Ba[e]=n,e<<=1,e&256&&(e^=285);for(let n=255;n<512;n++)No[n]=No[n-255]})();zc.log=function(e){if(e<1)throw new Error("log("+e+")");return Ba[e]};zc.exp=function(e){return No[e]};zc.mul=function(e,n){return e===0||n===0?0:No[Ba[e]+Ba[n]]};(function(t){const e=zc;t.mul=function(r,o){const i=new Uint8Array(r.length+o.length-1);for(let s=0;s<r.length;s++)for(let a=0;a<o.length;a++)i[s+a]^=e.mul(r[s],o[a]);return i},t.mod=function(r,o){let i=new Uint8Array(r);for(;i.length-o.length>=0;){const s=i[0];for(let c=0;c<o.length;c++)i[c]^=e.mul(o[c],s);let a=0;for(;a<i.length&&i[a]===0;)a++;i=i.slice(a)}return i},t.generateECPolynomial=function(r){let o=new Uint8Array([1]);for(let i=0;i<r;i++)o=t.mul(o,new Uint8Array([1,e.exp(i)]));return o}})(zp);const Hp=zp;function Fd(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}Fd.prototype.initialize=function(e){this.degree=e,this.genPoly=Hp.generateECPolynomial(this.degree)};Fd.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(e.length+this.degree);n.set(e);const r=Hp.mod(n,this.genPoly),o=this.degree-r.length;if(o>0){const i=new Uint8Array(this.degree);return i.set(r,o),i}return r};var Ev=Fd,Vp={},Sr={},Wd={};Wd.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var Rn={};const Zp="[0-9]+",_v="[A-Z $%*+\\-./:]+";let fs="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";fs=fs.replace(/u/g,"\\u");const Cv="(?:(?![A-Z0-9 $%*+\\-./:]|"+fs+`)(?:.|[\r
]))+`;Rn.KANJI=new RegExp(fs,"g");Rn.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");Rn.BYTE=new RegExp(Cv,"g");Rn.NUMERIC=new RegExp(Zp,"g");Rn.ALPHANUMERIC=new RegExp(_v,"g");const Sv=new RegExp("^"+fs+"$"),Av=new RegExp("^"+Zp+"$"),Tv=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");Rn.testKanji=function(e){return Sv.test(e)};Rn.testNumeric=function(e){return Av.test(e)};Rn.testAlphanumeric=function(e){return Tv.test(e)};(function(t){const e=Wd,n=Rn;t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(i,s){if(!i.ccBits)throw new Error("Invalid mode: "+i);if(!e.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?i.ccBits[0]:s<27?i.ccBits[1]:i.ccBits[2]},t.getBestModeForData=function(i){return n.testNumeric(i)?t.NUMERIC:n.testAlphanumeric(i)?t.ALPHANUMERIC:n.testKanji(i)?t.KANJI:t.BYTE},t.toString=function(i){if(i&&i.id)return i.id;throw new Error("Invalid mode")},t.isValid=function(i){return i&&i.bit&&i.ccBits};function r(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+o)}}t.from=function(i,s){if(t.isValid(i))return i;try{return r(i)}catch{return s}}})(Sr);(function(t){const e=zt,n=Wc,r=Fc,o=Sr,i=Wd,s=7973,a=e.getBCHDigit(s);function c(g,m,w){for(let v=1;v<=40;v++)if(m<=t.getCapacity(v,w,g))return v}function l(g,m){return o.getCharCountIndicator(g,m)+4}function u(g,m){let w=0;return g.forEach(function(v){const _=l(v.mode,m);w+=_+v.getBitsLength()}),w}function p(g,m){for(let w=1;w<=40;w++)if(u(g,w)<=t.getCapacity(w,m,o.MIXED))return w}t.from=function(m,w){return i.isValid(m)?parseInt(m,10):w},t.getCapacity=function(m,w,v){if(!i.isValid(m))throw new Error("Invalid QR Code version");typeof v>"u"&&(v=o.BYTE);const _=e.getSymbolTotalCodewords(m),I=n.getTotalCodewordsCount(m,w),b=(_-I)*8;if(v===o.MIXED)return b;const E=b-l(v,m);switch(v){case o.NUMERIC:return Math.floor(E/10*3);case o.ALPHANUMERIC:return Math.floor(E/11*2);case o.KANJI:return Math.floor(E/13);case o.BYTE:default:return Math.floor(E/8)}},t.getBestVersionForData=function(m,w){let v;const _=r.from(w,r.M);if(Array.isArray(m)){if(m.length>1)return p(m,_);if(m.length===0)return 1;v=m[0]}else v=m;return c(v.mode,v.getLength(),_)},t.getEncodedBits=function(m){if(!i.isValid(m)||m<7)throw new Error("Invalid QR Code version");let w=m<<12;for(;e.getBCHDigit(w)-a>=0;)w^=s<<e.getBCHDigit(w)-a;return m<<12|w}})(Vp);var Gp={};const mu=zt,qp=1335,Iv=21522,of=mu.getBCHDigit(qp);Gp.getEncodedBits=function(e,n){const r=e.bit<<3|n;let o=r<<10;for(;mu.getBCHDigit(o)-of>=0;)o^=qp<<mu.getBCHDigit(o)-of;return(r<<10|o)^Iv};var Kp={};const $v=Sr;function qi(t){this.mode=$v.NUMERIC,this.data=t.toString()}qi.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};qi.prototype.getLength=function(){return this.data.length};qi.prototype.getBitsLength=function(){return qi.getBitsLength(this.data.length)};qi.prototype.write=function(e){let n,r,o;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),o=parseInt(r,10),e.put(o,10);const i=this.data.length-n;i>0&&(r=this.data.substr(n),o=parseInt(r,10),e.put(o,i*3+1))};var Dv=qi;const Pv=Sr,Il=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function Ki(t){this.mode=Pv.ALPHANUMERIC,this.data=t}Ki.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};Ki.prototype.getLength=function(){return this.data.length};Ki.prototype.getBitsLength=function(){return Ki.getBitsLength(this.data.length)};Ki.prototype.write=function(e){let n;for(n=0;n+2<=this.data.length;n+=2){let r=Il.indexOf(this.data[n])*45;r+=Il.indexOf(this.data[n+1]),e.put(r,11)}this.data.length%2&&e.put(Il.indexOf(this.data[n]),6)};var Ov=Ki,Rv=function(e){for(var n=[],r=e.length,o=0;o<r;o++){var i=e.charCodeAt(o);if(i>=55296&&i<=56319&&r>o+1){var s=e.charCodeAt(o+1);s>=56320&&s<=57343&&(i=(i-55296)*1024+s-56320+65536,o+=1)}if(i<128){n.push(i);continue}if(i<2048){n.push(i>>6|192),n.push(i&63|128);continue}if(i<55296||i>=57344&&i<65536){n.push(i>>12|224),n.push(i>>6&63|128),n.push(i&63|128);continue}if(i>=65536&&i<=1114111){n.push(i>>18|240),n.push(i>>12&63|128),n.push(i>>6&63|128),n.push(i&63|128);continue}n.push(239,191,189)}return new Uint8Array(n).buffer};const Nv=Rv,kv=Sr;function Yi(t){this.mode=kv.BYTE,typeof t=="string"&&(t=Nv(t)),this.data=new Uint8Array(t)}Yi.getBitsLength=function(e){return e*8};Yi.prototype.getLength=function(){return this.data.length};Yi.prototype.getBitsLength=function(){return Yi.getBitsLength(this.data.length)};Yi.prototype.write=function(t){for(let e=0,n=this.data.length;e<n;e++)t.put(this.data[e],8)};var Mv=Yi;const Uv=Sr,Bv=zt;function Ji(t){this.mode=Uv.KANJI,this.data=t}Ji.getBitsLength=function(e){return e*13};Ji.prototype.getLength=function(){return this.data.length};Ji.prototype.getBitsLength=function(){return Ji.getBitsLength(this.data.length)};Ji.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let n=Bv.toSJIS(this.data[e]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),t.put(n,13)}};var Lv=Ji,Yp={exports:{}};(function(t){var e={single_source_shortest_paths:function(n,r,o){var i={},s={};s[r]=0;var a=e.PriorityQueue.make();a.push(r,0);for(var c,l,u,p,g,m,w,v,_;!a.empty();){c=a.pop(),l=c.value,p=c.cost,g=n[l]||{};for(u in g)g.hasOwnProperty(u)&&(m=g[u],w=p+m,v=s[u],_=typeof s[u]>"u",(_||v>w)&&(s[u]=w,a.push(u,w),i[u]=l))}if(typeof o<"u"&&typeof s[o]>"u"){var I=["Could not find a path from ",r," to ",o,"."].join("");throw new Error(I)}return i},extract_shortest_path_from_predecessor_list:function(n,r){for(var o=[],i=r;i;)o.push(i),n[i],i=n[i];return o.reverse(),o},find_path:function(n,r,o){var i=e.single_source_shortest_paths(n,r,o);return e.extract_shortest_path_from_predecessor_list(i,o)},PriorityQueue:{make:function(n){var r=e.PriorityQueue,o={},i;n=n||{};for(i in r)r.hasOwnProperty(i)&&(o[i]=r[i]);return o.queue=[],o.sorter=n.sorter||r.default_sorter,o},default_sorter:function(n,r){return n.cost-r.cost},push:function(n,r){var o={value:n,cost:r};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=e})(Yp);var jv=Yp.exports;(function(t){const e=Sr,n=Dv,r=Ov,o=Mv,i=Lv,s=Rn,a=zt,c=jv;function l(I){return unescape(encodeURIComponent(I)).length}function u(I,b,E){const x=[];let C;for(;(C=I.exec(E))!==null;)x.push({data:C[0],index:C.index,mode:b,length:C[0].length});return x}function p(I){const b=u(s.NUMERIC,e.NUMERIC,I),E=u(s.ALPHANUMERIC,e.ALPHANUMERIC,I);let x,C;return a.isKanjiModeEnabled()?(x=u(s.BYTE,e.BYTE,I),C=u(s.KANJI,e.KANJI,I)):(x=u(s.BYTE_KANJI,e.BYTE,I),C=[]),b.concat(E,x,C).sort(function(f,T){return f.index-T.index}).map(function(f){return{data:f.data,mode:f.mode,length:f.length}})}function g(I,b){switch(b){case e.NUMERIC:return n.getBitsLength(I);case e.ALPHANUMERIC:return r.getBitsLength(I);case e.KANJI:return i.getBitsLength(I);case e.BYTE:return o.getBitsLength(I)}}function m(I){return I.reduce(function(b,E){const x=b.length-1>=0?b[b.length-1]:null;return x&&x.mode===E.mode?(b[b.length-1].data+=E.data,b):(b.push(E),b)},[])}function w(I){const b=[];for(let E=0;E<I.length;E++){const x=I[E];switch(x.mode){case e.NUMERIC:b.push([x,{data:x.data,mode:e.ALPHANUMERIC,length:x.length},{data:x.data,mode:e.BYTE,length:x.length}]);break;case e.ALPHANUMERIC:b.push([x,{data:x.data,mode:e.BYTE,length:x.length}]);break;case e.KANJI:b.push([x,{data:x.data,mode:e.BYTE,length:l(x.data)}]);break;case e.BYTE:b.push([{data:x.data,mode:e.BYTE,length:l(x.data)}])}}return b}function v(I,b){const E={},x={start:{}};let C=["start"];for(let A=0;A<I.length;A++){const f=I[A],T=[];for(let R=0;R<f.length;R++){const k=f[R],M=""+A+R;T.push(M),E[M]={node:k,lastCount:0},x[M]={};for(let Y=0;Y<C.length;Y++){const ie=C[Y];E[ie]&&E[ie].node.mode===k.mode?(x[ie][M]=g(E[ie].lastCount+k.length,k.mode)-g(E[ie].lastCount,k.mode),E[ie].lastCount+=k.length):(E[ie]&&(E[ie].lastCount=k.length),x[ie][M]=g(k.length,k.mode)+4+e.getCharCountIndicator(k.mode,b))}}C=T}for(let A=0;A<C.length;A++)x[C[A]].end=0;return{map:x,table:E}}function _(I,b){let E;const x=e.getBestModeForData(I);if(E=e.from(b,x),E!==e.BYTE&&E.bit<x.bit)throw new Error('"'+I+'" cannot be encoded with mode '+e.toString(E)+`.
 Suggested mode is: `+e.toString(x));switch(E===e.KANJI&&!a.isKanjiModeEnabled()&&(E=e.BYTE),E){case e.NUMERIC:return new n(I);case e.ALPHANUMERIC:return new r(I);case e.KANJI:return new i(I);case e.BYTE:return new o(I)}}t.fromArray=function(b){return b.reduce(function(E,x){return typeof x=="string"?E.push(_(x,null)):x.data&&E.push(_(x.data,x.mode)),E},[])},t.fromString=function(b,E){const x=p(b,a.isKanjiModeEnabled()),C=w(x),A=v(C,E),f=c.find_path(A.map,"start","end"),T=[];for(let R=1;R<f.length-1;R++)T.push(A.table[f[R]].node);return t.fromArray(m(T))},t.rawSplit=function(b){return t.fromArray(p(b,a.isKanjiModeEnabled()))}})(Kp);const Hc=zt,$l=Fc,Fv=yv,Wv=vv,zv=jp,Hv=Fp,wu=Wp,bu=Wc,Vv=Ev,La=Vp,Zv=Gp,Gv=Sr,Dl=Kp;function qv(t,e){const n=t.size,r=Hv.getPositions(e);for(let o=0;o<r.length;o++){const i=r[o][0],s=r[o][1];for(let a=-1;a<=7;a++)if(!(i+a<=-1||n<=i+a))for(let c=-1;c<=7;c++)s+c<=-1||n<=s+c||(a>=0&&a<=6&&(c===0||c===6)||c>=0&&c<=6&&(a===0||a===6)||a>=2&&a<=4&&c>=2&&c<=4?t.set(i+a,s+c,!0,!0):t.set(i+a,s+c,!1,!0))}}function Kv(t){const e=t.size;for(let n=8;n<e-8;n++){const r=n%2===0;t.set(n,6,r,!0),t.set(6,n,r,!0)}}function Yv(t,e){const n=zv.getPositions(e);for(let r=0;r<n.length;r++){const o=n[r][0],i=n[r][1];for(let s=-2;s<=2;s++)for(let a=-2;a<=2;a++)s===-2||s===2||a===-2||a===2||s===0&&a===0?t.set(o+s,i+a,!0,!0):t.set(o+s,i+a,!1,!0)}}function Jv(t,e){const n=t.size,r=La.getEncodedBits(e);let o,i,s;for(let a=0;a<18;a++)o=Math.floor(a/3),i=a%3+n-8-3,s=(r>>a&1)===1,t.set(o,i,s,!0),t.set(i,o,s,!0)}function Pl(t,e,n){const r=t.size,o=Zv.getEncodedBits(e,n);let i,s;for(i=0;i<15;i++)s=(o>>i&1)===1,i<6?t.set(i,8,s,!0):i<8?t.set(i+1,8,s,!0):t.set(r-15+i,8,s,!0),i<8?t.set(8,r-i-1,s,!0):i<9?t.set(8,15-i-1+1,s,!0):t.set(8,15-i-1,s,!0);t.set(r-8,8,1,!0)}function Xv(t,e){const n=t.size;let r=-1,o=n-1,i=7,s=0;for(let a=n-1;a>0;a-=2)for(a===6&&a--;;){for(let c=0;c<2;c++)if(!t.isReserved(o,a-c)){let l=!1;s<e.length&&(l=(e[s]>>>i&1)===1),t.set(o,a-c,l),i--,i===-1&&(s++,i=7)}if(o+=r,o<0||n<=o){o-=r,r=-r;break}}}function Qv(t,e,n){const r=new Fv;n.forEach(function(c){r.put(c.mode.bit,4),r.put(c.getLength(),Gv.getCharCountIndicator(c.mode,t)),c.write(r)});const o=Hc.getSymbolTotalCodewords(t),i=bu.getTotalCodewordsCount(t,e),s=(o-i)*8;for(r.getLengthInBits()+4<=s&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);const a=(s-r.getLengthInBits())/8;for(let c=0;c<a;c++)r.put(c%2?17:236,8);return e5(r,t,e)}function e5(t,e,n){const r=Hc.getSymbolTotalCodewords(e),o=bu.getTotalCodewordsCount(e,n),i=r-o,s=bu.getBlocksCount(e,n),a=r%s,c=s-a,l=Math.floor(r/s),u=Math.floor(i/s),p=u+1,g=l-u,m=new Vv(g);let w=0;const v=new Array(s),_=new Array(s);let I=0;const b=new Uint8Array(t.buffer);for(let f=0;f<s;f++){const T=f<c?u:p;v[f]=b.slice(w,w+T),_[f]=m.encode(v[f]),w+=T,I=Math.max(I,T)}const E=new Uint8Array(r);let x=0,C,A;for(C=0;C<I;C++)for(A=0;A<s;A++)C<v[A].length&&(E[x++]=v[A][C]);for(C=0;C<g;C++)for(A=0;A<s;A++)E[x++]=_[A][C];return E}function t5(t,e,n,r){let o;if(Array.isArray(t))o=Dl.fromArray(t);else if(typeof t=="string"){let l=e;if(!l){const u=Dl.rawSplit(t);l=La.getBestVersionForData(u,n)}o=Dl.fromString(t,l||40)}else throw new Error("Invalid data");const i=La.getBestVersionForData(o,n);if(!i)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=i;else if(e<i)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+i+`.
`);const s=Qv(e,n,o),a=Hc.getSymbolSize(e),c=new Wv(a);return qv(c,e),Kv(c),Yv(c,e),Pl(c,n,0),e>=7&&Jv(c,e),Xv(c,s),isNaN(r)&&(r=wu.getBestMask(c,Pl.bind(null,c,n))),wu.applyMask(r,c),Pl(c,n,r),{modules:c,version:e,errorCorrectionLevel:n,maskPattern:r,segments:o}}Bp.create=function(e,n){if(typeof e>"u"||e==="")throw new Error("No input text");let r=$l.M,o,i;return typeof n<"u"&&(r=$l.from(n.errorCorrectionLevel,$l.M),o=La.from(n.version),i=wu.from(n.maskPattern),n.toSJISFunc&&Hc.setToSJISFunction(n.toSJISFunc)),t5(e,o,r,i)};var Jp={},zd={};(function(t){function e(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");let r=n.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+n);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(i){return[i,i]}))),r.length===6&&r.push("F","F");const o=parseInt(r.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+r.slice(0,6).join("")}}t.getOptions=function(r){r||(r={}),r.color||(r.color={});const o=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,i=r.width&&r.width>=21?r.width:void 0,s=r.scale||4;return{width:i,scale:i?4:s,margin:o,color:{dark:e(r.color.dark||"#000000ff"),light:e(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},t.getScale=function(r,o){return o.width&&o.width>=r+o.margin*2?o.width/(r+o.margin*2):o.scale},t.getImageWidth=function(r,o){const i=t.getScale(r,o);return Math.floor((r+o.margin*2)*i)},t.qrToImageData=function(r,o,i){const s=o.modules.size,a=o.modules.data,c=t.getScale(s,i),l=Math.floor((s+i.margin*2)*c),u=i.margin*c,p=[i.color.light,i.color.dark];for(let g=0;g<l;g++)for(let m=0;m<l;m++){let w=(g*l+m)*4,v=i.color.light;if(g>=u&&m>=u&&g<l-u&&m<l-u){const _=Math.floor((g-u)/c),I=Math.floor((m-u)/c);v=p[a[_*s+I]?1:0]}r[w++]=v.r,r[w++]=v.g,r[w++]=v.b,r[w]=v.a}}})(zd);(function(t){const e=zd;function n(o,i,s){o.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=s,i.width=s,i.style.height=s+"px",i.style.width=s+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(i,s,a){let c=a,l=s;typeof c>"u"&&(!s||!s.getContext)&&(c=s,s=void 0),s||(l=r()),c=e.getOptions(c);const u=e.getImageWidth(i.modules.size,c),p=l.getContext("2d"),g=p.createImageData(u,u);return e.qrToImageData(g.data,i,c),n(p,l,u),p.putImageData(g,0,0),l},t.renderToDataURL=function(i,s,a){let c=a;typeof c>"u"&&(!s||!s.getContext)&&(c=s,s=void 0),c||(c={});const l=t.render(i,s,c),u=c.type||"image/png",p=c.rendererOpts||{};return l.toDataURL(u,p.quality)}})(Jp);var Xp={};const n5=zd;function sf(t,e){const n=t.a/255,r=e+'="'+t.hex+'"';return n<1?r+" "+e+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function Ol(t,e,n){let r=t+e;return typeof n<"u"&&(r+=" "+n),r}function r5(t,e,n){let r="",o=0,i=!1,s=0;for(let a=0;a<t.length;a++){const c=Math.floor(a%e),l=Math.floor(a/e);!c&&!i&&(i=!0),t[a]?(s++,a>0&&c>0&&t[a-1]||(r+=i?Ol("M",c+n,.5+l+n):Ol("m",o,0),o=0,i=!1),c+1<e&&t[a+1]||(r+=Ol("h",s),s=0)):o++}return r}Xp.render=function(e,n,r){const o=n5.getOptions(n),i=e.modules.size,s=e.modules.data,a=i+o.margin*2,c=o.color.light.a?"<path "+sf(o.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",l="<path "+sf(o.color.dark,"stroke")+' d="'+r5(s,i,o.margin)+'"/>',u='viewBox="0 0 '+a+" "+a+'"',g='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+u+' shape-rendering="crispEdges">'+c+l+`</svg>
`;return typeof r=="function"&&r(null,g),g};const i5=wv,yu=Bp,Qp=Jp,o5=Xp;function Hd(t,e,n,r,o){const i=[].slice.call(arguments,1),s=i.length,a=typeof i[s-1]=="function";if(!a&&!i5())throw new Error("Callback required as last argument");if(a){if(s<2)throw new Error("Too few arguments provided");s===2?(o=n,n=e,e=r=void 0):s===3&&(e.getContext&&typeof o>"u"?(o=r,r=void 0):(o=r,r=n,n=e,e=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(n=e,e=r=void 0):s===2&&!e.getContext&&(r=n,n=e,e=void 0),new Promise(function(c,l){try{const u=yu.create(n,r);c(t(u,e,r))}catch(u){l(u)}})}try{const c=yu.create(n,r);o(null,t(c,e,r))}catch(c){o(c)}}Hs.create=yu.create;Hs.toCanvas=Hd.bind(null,Qp.render);Hs.toDataURL=Hd.bind(null,Qp.renderToDataURL);Hs.toString=Hd.bind(null,function(t,e,n){return o5.render(t,n)});const s5=.1,af=2.5,Mn=7;function Rl(t,e,n){return t===e?!1:(t-e<0?e-t:t-e)<=n+s5}function a5(t,e){const n=Array.prototype.slice.call(Hs.create(t,{errorCorrectionLevel:e}).modules.data,0),r=Math.sqrt(n.length);return n.reduce((o,i,s)=>(s%r===0?o.push([i]):o[o.length-1].push(i))&&o,[])}const c5={generate(t,e,n){const r="#141414",o="transparent",s=[],a=a5(t,"Q"),c=e/a.length,l=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];l.forEach(({x:v,y:_})=>{const I=(a.length-Mn)*c*v,b=(a.length-Mn)*c*_,E=.45;for(let x=0;x<l.length;x+=1){const C=c*(Mn-x*2);s.push(K`
            <rect
              fill=${x===2?r:o}
              width=${x===0?C-5:C}
              rx= ${x===0?(C-5)*E:C*E}
              ry= ${x===0?(C-5)*E:C*E}
              stroke=${r}
              stroke-width=${x===0?5:0}
              height=${x===0?C-5:C}
              x= ${x===0?b+c*x+5/2:b+c*x}
              y= ${x===0?I+c*x+5/2:I+c*x}
            />
          `)}});const u=Math.floor((n+25)/c),p=a.length/2-u/2,g=a.length/2+u/2-1,m=[];a.forEach((v,_)=>{v.forEach((I,b)=>{if(a[_][b]&&!(_<Mn&&b<Mn||_>a.length-(Mn+1)&&b<Mn||_<Mn&&b>a.length-(Mn+1))&&!(_>p&&_<g&&b>p&&b<g)){const E=_*c+c/2,x=b*c+c/2;m.push([E,x])}})});const w={};return m.forEach(([v,_])=>{var I;w[v]?(I=w[v])==null||I.push(_):w[v]=[_]}),Object.entries(w).map(([v,_])=>{const I=_.filter(b=>_.every(E=>!Rl(b,E,c)));return[Number(v),I]}).forEach(([v,_])=>{_.forEach(I=>{s.push(K`<circle cx=${v} cy=${I} fill=${r} r=${c/af} />`)})}),Object.entries(w).filter(([v,_])=>_.length>1).map(([v,_])=>{const I=_.filter(b=>_.some(E=>Rl(b,E,c)));return[Number(v),I]}).map(([v,_])=>{_.sort((b,E)=>b<E?-1:1);const I=[];for(const b of _){const E=I.find(x=>x.some(C=>Rl(b,C,c)));E?E.push(b):I.push([b])}return[v,I.map(b=>[b[0],b[b.length-1]])]}).forEach(([v,_])=>{_.forEach(([I,b])=>{s.push(K`
              <line
                x1=${v}
                x2=${v}
                y1=${I}
                y2=${b}
                stroke=${r}
                stroke-width=${c/(af/2)}
                stroke-linecap="round"
              />
            `)})}),s}},l5=q`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;var ho=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let zn=class extends H{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0}render(){return this.dataset.theme=this.theme,this.style.cssText=`--local-size: ${this.size}px`,$`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){const e=this.theme==="light"?this.size:this.size-32;return K`
      <svg height=${e} width=${e}>
        ${c5.generate(this.uri,e,e/4)}
      </svg>
    `}templateVisual(){return this.imageSrc?$`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:$`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};zn.styles=[pe,l5];ho([D()],zn.prototype,"uri",void 0);ho([D({type:Number})],zn.prototype,"size",void 0);ho([D()],zn.prototype,"theme",void 0);ho([D()],zn.prototype,"imageSrc",void 0);ho([D()],zn.prototype,"alt",void 0);zn=ho([z("wui-qr-code")],zn);const u5=q`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var d5=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ja=class extends H{constructor(){super(...arguments),this.inputComponentRef=Uc()}render(){return $`
      <wui-input-text
        ${Bc(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const e=this.inputComponentRef.value,n=e==null?void 0:e.inputElementRef.value;n&&(n.value="",n.focus(),n.dispatchEvent(new Event("input")))}};ja.styles=[pe,u5];ja=d5([z("wui-search-bar")],ja);const f5=q`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-xs);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-gray-glass-005);
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);
  }
`;var Zs=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let gr=class extends H{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message=""}render(){return $`
      <wui-icon-box
        size="sm"
        iconSize="xs"
        iconColor=${this.iconColor}
        backgroundColor=${this.backgroundColor}
        icon=${this.icon}
        background="opaque"
      ></wui-icon-box>
      <wui-text variant="paragraph-500" color="fg-100">${this.message}</wui-text>
    `}};gr.styles=[pe,f5];Zs([D()],gr.prototype,"backgroundColor",void 0);Zs([D()],gr.prototype,"iconColor",void 0);Zs([D()],gr.prototype,"icon",void 0);Zs([D()],gr.prototype,"message",void 0);gr=Zs([z("wui-snackbar")],gr);const h5=q`
  :host {
    display: inline-flex;
    background-color: var(--wui-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }

  button {
    width: var(--local-tab-width);
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var Ar=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let un=class extends H{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.activeTab=0,this.localTabWidth="100px",this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,n)=>{const r=n===this.activeTab;return $`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(n)}
          data-active=${r}
        >
          <wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,n){const r=this.buttons[this.activeTab],o=this.buttons[e],i=r==null?void 0:r.querySelector("wui-text"),s=o==null?void 0:o.querySelector("wui-text"),a=o==null?void 0:o.getBoundingClientRect(),c=s==null?void 0:s.getBoundingClientRect();r&&i&&!n&&e!==this.activeTab&&(i.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),r.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&a&&c&&s&&(e!==this.activeTab||n)&&(this.localTabWidth=`${Math.round(a.width+c.width)+6}px`,o.animate([{width:`${a.width+c.width}px`}],{duration:n?0:500,fill:"forwards",easing:"ease"}),s.animate([{opacity:1}],{duration:n?0:125,delay:n?0:200,fill:"forwards",easing:"ease"}))}};un.styles=[pe,Ye,h5];Ar([D({type:Array})],un.prototype,"tabs",void 0);Ar([D()],un.prototype,"onTabChange",void 0);Ar([D({type:Array})],un.prototype,"buttons",void 0);Ar([D({type:Boolean})],un.prototype,"disabled",void 0);Ar([ee()],un.prototype,"activeTab",void 0);Ar([ee()],un.prototype,"localTabWidth",void 0);Ar([ee()],un.prototype,"isDense",void 0);un=Ar([z("wui-tabs")],un);const p5=q`
  :host {
    display: block;
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    background-color: var(--wui-color-fg-100);
    color: var(--wui-color-bg-100);
    position: relative;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  wui-icon[data-placement='top'] {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;var Vd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Xi=class extends H{constructor(){super(...arguments),this.placement="top",this.message=""}render(){return $`<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name="cursor"
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`}};Xi.styles=[pe,Ye,p5];Vd([D()],Xi.prototype,"placement",void 0);Vd([D()],Xi.prototype,"message",void 0);Xi=Vd([z("wui-tooltip")],Xi);const g5=q`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    box-shadow: 0 0 0 8px var(--wui-thumbnail-border);
    border-radius: var(--local-border-radius);
    overflow: hidden;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`;var Vc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ti=class extends H{render(){return this.style.cssText=`--local-border-radius: ${this.borderRadiusFull?"1000px":"20px"};`,$`${this.templateVisual()}`}templateVisual(){return this.imageSrc?$`<wui-image src=${this.imageSrc} alt=${this.alt??""}></wui-image>`:$`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};ti.styles=[pe,g5];Vc([D()],ti.prototype,"imageSrc",void 0);Vc([D()],ti.prototype,"alt",void 0);Vc([D({type:Boolean})],ti.prototype,"borderRadiusFull",void 0);ti=Vc([z("wui-visual-thumbnail")],ti);const m5=q`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: block;
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-2l);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-accent-glass-015);
  }

  button:hover {
    background-color: var(--wui-accent-glass-010) !important;
  }

  button:active {
    background-color: var(--wui-accent-glass-020) !important;
  }
`;var Zc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ni=class extends H{constructor(){super(...arguments),this.label="",this.description="",this.icon="wallet"}render(){return $`
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `}};ni.styles=[pe,Ye,m5];Zc([D()],ni.prototype,"label",void 0);Zc([D()],ni.prototype,"description",void 0);Zc([D()],ni.prototype,"icon",void 0);ni=Zc([z("wui-notice-card")],ni);const w5=q`
  button {
    height: auto;
    position: relative;
    flex-direction: column;
    gap: var(--wui-spacing-s);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  .overflowedContent {
    width: 100%;
    overflow: hidden;
  }

  .overflowedContent[data-active='false']:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, var(--wui-color-bg-200), transparent);
    border-bottom-left-radius: var(--wui-border-radius-xs);
    border-bottom-right-radius: var(--wui-border-radius-xs);
  }

  .heightContent {
    max-height: 100px;
  }

  pre {
    text-align: left;
    white-space: pre-wrap;
    height: auto;
    overflow-x: auto;
    overflow-wrap: anywhere;
  }
`;var Zd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const Nl=100;let Qi=class extends H{constructor(){super(...arguments),this.textTitle="",this.overflowedContent="",this.toggled=!1,this.enableAccordion=!1,this.scrollElement=void 0,this.scrollHeightElement=0}firstUpdated(){setTimeout(()=>{var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector(".heightContent");if(e){this.scrollElement=e;const r=e==null?void 0:e.scrollHeight;r&&r>Nl&&(this.enableAccordion=!0,this.scrollHeightElement=r,this.requestUpdate())}},0)}render(){return $`
      <button ontouchstart @click=${()=>this.onClick()}>
        <wui-flex justifyContent="space-between" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-100">${this.textTitle}</wui-text>
          ${this.chevronTemplate()}
        </wui-flex>
        <div
          data-active=${this.enableAccordion?!!this.toggled:!0}
          class="overflowedContent"
        >
          <div class="heightContent">
            <wui-text variant="paragraph-400" color="fg-200">
              <pre>${this.overflowedContent}</pre>
            </wui-text>
          </div>
        </div>
      </button>
    `}onClick(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector("wui-icon");this.enableAccordion&&(this.toggled=!this.toggled,this.requestUpdate(),this.scrollElement&&this.scrollElement.animate([{maxHeight:this.toggled?`${Nl}px`:`${this.scrollHeightElement}px`},{maxHeight:this.toggled?`${this.scrollHeightElement}px`:`${Nl}px`}],{duration:300,fill:"forwards",easing:"ease"}),e&&e.animate([{transform:this.toggled?"rotate(0deg)":"rotate(180deg)"},{transform:this.toggled?"rotate(180deg)":"rotate(0deg)"}],{duration:300,fill:"forwards",easing:"ease"}))}chevronTemplate(){return this.enableAccordion?$` <wui-icon color="fg-100" size="sm" name="chevronBottom"></wui-icon>`:null}};Qi.styles=[pe,Ye,w5];Zd([D()],Qi.prototype,"textTitle",void 0);Zd([D()],Qi.prototype,"overflowedContent",void 0);Qi=Zd([z("wui-list-accordion")],Qi);const b5=q`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  wui-image {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-icon {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
  }
`;var Gc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ri=class extends H{constructor(){super(...arguments),this.imageSrc=void 0,this.textTitle="",this.textValue=void 0}render(){return $`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color=${this.textValue?"fg-200":"fg-100"}>
          ${this.textTitle}
        </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `}templateContent(){return this.imageSrc?$`<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>`:this.textValue?$` <wui-text variant="paragraph-400" color="fg-100"> ${this.textValue} </wui-text>`:$`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};ri.styles=[pe,Ye,b5];Gc([D()],ri.prototype,"imageSrc",void 0);Gc([D()],ri.prototype,"textTitle",void 0);Gc([D()],ri.prototype,"textValue",void 0);ri=Gc([z("wui-list-content")],ri);const y5=q`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--wui-spacing-l);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  wui-image {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-icon {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
  }
`;var Gs=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let mr=class extends H{constructor(){super(...arguments),this.amount="",this.networkCurreny="",this.networkImageUrl="",this.receiverAddress=""}render(){return $`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-200">Sending</wui-text>
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="paragraph-400" color="fg-100">
            ${this.amount} ${this.networkCurreny}
          </wui-text>
          ${this.templateNetworkVisual()}
        </wui-flex>
      </wui-flex>
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-200">To</wui-text>
        <wui-chip
          icon="externalLink"
          variant="shadeSmall"
          href=${this.receiverAddress}
          title=${this.receiverAddress}
        ></wui-chip>
      </wui-flex>
    `}templateNetworkVisual(){return this.networkImageUrl?$`<wui-image src=${this.networkImageUrl} alt="Network Image"></wui-image>`:$`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};mr.styles=[pe,Ye,y5];Gs([D()],mr.prototype,"amount",void 0);Gs([D()],mr.prototype,"networkCurreny",void 0);Gs([D()],mr.prototype,"networkImageUrl",void 0);Gs([D()],mr.prototype,"receiverAddress",void 0);mr=Gs([z("wui-list-wallet-transaction")],mr);const v5=q`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var Yt=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Ct=class extends H{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&Be.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&Be.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&Be.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&Be.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&Be.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&Be.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&Be.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&Be.getSpacingStyles(this.margin,3)};
    `,$`<slot></slot>`}};Ct.styles=[pe,v5];Yt([D()],Ct.prototype,"gridTemplateRows",void 0);Yt([D()],Ct.prototype,"gridTemplateColumns",void 0);Yt([D()],Ct.prototype,"justifyItems",void 0);Yt([D()],Ct.prototype,"alignItems",void 0);Yt([D()],Ct.prototype,"justifyContent",void 0);Yt([D()],Ct.prototype,"alignContent",void 0);Yt([D()],Ct.prototype,"columnGap",void 0);Yt([D()],Ct.prototype,"rowGap",void 0);Yt([D()],Ct.prototype,"gap",void 0);Yt([D()],Ct.prototype,"padding",void 0);Yt([D()],Ct.prototype,"margin",void 0);Ct=Yt([z("wui-grid")],Ct);const x5=q`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: var(--wui-gray-glass-005);
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 10px;
    background-color: var(--wui-color-modal-bg);
  }
`;var e1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let hs=class extends H{constructor(){super(...arguments),this.text=""}render(){return $`${this.template()}`}template(){return this.text?$`<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>`:null}};hs.styles=[pe,x5];e1([D()],hs.prototype,"text",void 0);hs=e1([z("wui-separator")],hs);var t1={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(xd,function(){var n=1e3,r=6e4,o=36e5,i="millisecond",s="second",a="minute",c="hour",l="day",u="week",p="month",g="quarter",m="year",w="date",v="Invalid Date",_=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,I=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,b={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(W){var j=["th","st","nd","rd"],B=W%100;return"["+W+(j[(B-20)%10]||j[B]||j[0])+"]"}},E=function(W,j,B){var L=String(W);return!L||L.length>=j?W:""+Array(j+1-L.length).join(B)+W},x={s:E,z:function(W){var j=-W.utcOffset(),B=Math.abs(j),L=Math.floor(B/60),F=B%60;return(j<=0?"+":"-")+E(L,2,"0")+":"+E(F,2,"0")},m:function W(j,B){if(j.date()<B.date())return-W(B,j);var L=12*(B.year()-j.year())+(B.month()-j.month()),F=j.clone().add(L,p),X=B-F<0,ne=j.clone().add(L+(X?-1:1),p);return+(-(L+(B-F)/(X?F-ne:ne-F))||0)},a:function(W){return W<0?Math.ceil(W)||0:Math.floor(W)},p:function(W){return{M:p,y:m,w:u,d:l,D:w,h:c,m:a,s,ms:i,Q:g}[W]||String(W||"").toLowerCase().replace(/s$/,"")},u:function(W){return W===void 0}},C="en",A={};A[C]=b;var f="$isDayjsObject",T=function(W){return W instanceof Y||!(!W||!W[f])},R=function W(j,B,L){var F;if(!j)return C;if(typeof j=="string"){var X=j.toLowerCase();A[X]&&(F=X),B&&(A[X]=B,F=X);var ne=j.split("-");if(!F&&ne.length>1)return W(ne[0])}else{var Q=j.name;A[Q]=j,F=Q}return!L&&F&&(C=F),F||!L&&C},k=function(W,j){if(T(W))return W.clone();var B=typeof j=="object"?j:{};return B.date=W,B.args=arguments,new Y(B)},M=x;M.l=R,M.i=T,M.w=function(W,j){return k(W,{locale:j.$L,utc:j.$u,x:j.$x,$offset:j.$offset})};var Y=function(){function W(B){this.$L=R(B.locale,null,!0),this.parse(B),this.$x=this.$x||B.x||{},this[f]=!0}var j=W.prototype;return j.parse=function(B){this.$d=function(L){var F=L.date,X=L.utc;if(F===null)return new Date(NaN);if(M.u(F))return new Date;if(F instanceof Date)return new Date(F);if(typeof F=="string"&&!/Z$/i.test(F)){var ne=F.match(_);if(ne){var Q=ne[2]-1||0,se=(ne[7]||"0").substring(0,3);return X?new Date(Date.UTC(ne[1],Q,ne[3]||1,ne[4]||0,ne[5]||0,ne[6]||0,se)):new Date(ne[1],Q,ne[3]||1,ne[4]||0,ne[5]||0,ne[6]||0,se)}}return new Date(F)}(B),this.init()},j.init=function(){var B=this.$d;this.$y=B.getFullYear(),this.$M=B.getMonth(),this.$D=B.getDate(),this.$W=B.getDay(),this.$H=B.getHours(),this.$m=B.getMinutes(),this.$s=B.getSeconds(),this.$ms=B.getMilliseconds()},j.$utils=function(){return M},j.isValid=function(){return this.$d.toString()!==v},j.isSame=function(B,L){var F=k(B);return this.startOf(L)<=F&&F<=this.endOf(L)},j.isAfter=function(B,L){return k(B)<this.startOf(L)},j.isBefore=function(B,L){return this.endOf(L)<k(B)},j.$g=function(B,L,F){return M.u(B)?this[L]:this.set(F,B)},j.unix=function(){return Math.floor(this.valueOf()/1e3)},j.valueOf=function(){return this.$d.getTime()},j.startOf=function(B,L){var F=this,X=!!M.u(L)||L,ne=M.p(B),Q=function(Ae,ge){var De=M.w(F.$u?Date.UTC(F.$y,ge,Ae):new Date(F.$y,ge,Ae),F);return X?De:De.endOf(l)},se=function(Ae,ge){return M.w(F.toDate()[Ae].apply(F.toDate("s"),(X?[0,0,0,0]:[23,59,59,999]).slice(ge)),F)},Z=this.$W,ae=this.$M,de=this.$D,_e="set"+(this.$u?"UTC":"");switch(ne){case m:return X?Q(1,0):Q(31,11);case p:return X?Q(1,ae):Q(0,ae+1);case u:var Ce=this.$locale().weekStart||0,ye=(Z<Ce?Z+7:Z)-Ce;return Q(X?de-ye:de+(6-ye),ae);case l:case w:return se(_e+"Hours",0);case c:return se(_e+"Minutes",1);case a:return se(_e+"Seconds",2);case s:return se(_e+"Milliseconds",3);default:return this.clone()}},j.endOf=function(B){return this.startOf(B,!1)},j.$set=function(B,L){var F,X=M.p(B),ne="set"+(this.$u?"UTC":""),Q=(F={},F[l]=ne+"Date",F[w]=ne+"Date",F[p]=ne+"Month",F[m]=ne+"FullYear",F[c]=ne+"Hours",F[a]=ne+"Minutes",F[s]=ne+"Seconds",F[i]=ne+"Milliseconds",F)[X],se=X===l?this.$D+(L-this.$W):L;if(X===p||X===m){var Z=this.clone().set(w,1);Z.$d[Q](se),Z.init(),this.$d=Z.set(w,Math.min(this.$D,Z.daysInMonth())).$d}else Q&&this.$d[Q](se);return this.init(),this},j.set=function(B,L){return this.clone().$set(B,L)},j.get=function(B){return this[M.p(B)]()},j.add=function(B,L){var F,X=this;B=Number(B);var ne=M.p(L),Q=function(ae){var de=k(X);return M.w(de.date(de.date()+Math.round(ae*B)),X)};if(ne===p)return this.set(p,this.$M+B);if(ne===m)return this.set(m,this.$y+B);if(ne===l)return Q(1);if(ne===u)return Q(7);var se=(F={},F[a]=r,F[c]=o,F[s]=n,F)[ne]||1,Z=this.$d.getTime()+B*se;return M.w(Z,this)},j.subtract=function(B,L){return this.add(-1*B,L)},j.format=function(B){var L=this,F=this.$locale();if(!this.isValid())return F.invalidDate||v;var X=B||"YYYY-MM-DDTHH:mm:ssZ",ne=M.z(this),Q=this.$H,se=this.$m,Z=this.$M,ae=F.weekdays,de=F.months,_e=F.meridiem,Ce=function(ge,De,Ne,Oe){return ge&&(ge[De]||ge(L,X))||Ne[De].slice(0,Oe)},ye=function(ge){return M.s(Q%12||12,ge,"0")},Ae=_e||function(ge,De,Ne){var Oe=ge<12?"AM":"PM";return Ne?Oe.toLowerCase():Oe};return X.replace(I,function(ge,De){return De||function(Ne){switch(Ne){case"YY":return String(L.$y).slice(-2);case"YYYY":return M.s(L.$y,4,"0");case"M":return Z+1;case"MM":return M.s(Z+1,2,"0");case"MMM":return Ce(F.monthsShort,Z,de,3);case"MMMM":return Ce(de,Z);case"D":return L.$D;case"DD":return M.s(L.$D,2,"0");case"d":return String(L.$W);case"dd":return Ce(F.weekdaysMin,L.$W,ae,2);case"ddd":return Ce(F.weekdaysShort,L.$W,ae,3);case"dddd":return ae[L.$W];case"H":return String(Q);case"HH":return M.s(Q,2,"0");case"h":return ye(1);case"hh":return ye(2);case"a":return Ae(Q,se,!0);case"A":return Ae(Q,se,!1);case"m":return String(se);case"mm":return M.s(se,2,"0");case"s":return String(L.$s);case"ss":return M.s(L.$s,2,"0");case"SSS":return M.s(L.$ms,3,"0");case"Z":return ne}return null}(ge)||ne.replace(":","")})},j.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},j.diff=function(B,L,F){var X,ne=this,Q=M.p(L),se=k(B),Z=(se.utcOffset()-this.utcOffset())*r,ae=this-se,de=function(){return M.m(ne,se)};switch(Q){case m:X=de()/12;break;case p:X=de();break;case g:X=de()/3;break;case u:X=(ae-Z)/6048e5;break;case l:X=(ae-Z)/864e5;break;case c:X=ae/o;break;case a:X=ae/r;break;case s:X=ae/n;break;default:X=ae}return F?X:M.a(X)},j.daysInMonth=function(){return this.endOf(p).$D},j.$locale=function(){return A[this.$L]},j.locale=function(B,L){if(!B)return this.$L;var F=this.clone(),X=R(B,L,!0);return X&&(F.$L=X),F},j.clone=function(){return M.w(this.$d,this)},j.toDate=function(){return new Date(this.valueOf())},j.toJSON=function(){return this.isValid()?this.toISOString():null},j.toISOString=function(){return this.$d.toISOString()},j.toString=function(){return this.$d.toUTCString()},W}(),ie=Y.prototype;return k.prototype=ie,[["$ms",i],["$s",s],["$m",a],["$H",c],["$W",l],["$M",p],["$y",m],["$D",w]].forEach(function(W){ie[W[1]]=function(j){return this.$g(j,W[0],W[1])}}),k.extend=function(W,j){return W.$i||(W(j,Y,k),W.$i=!0),k},k.locale=R,k.isDayjs=T,k.unix=function(W){return k(1e3*W)},k.en=A[C],k.Ls=A,k.p={},k})})(t1);var E5=t1.exports;const ps=$c(E5);var n1={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(xd,function(){return function(n,r,o){o.updateLocale=function(i,s){var a=o.Ls[i];if(a)return(s?Object.keys(s):[]).forEach(function(c){a[c]=s[c]}),a}}})})(n1);var _5=n1.exports;const C5=$c(_5);var r1={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(xd,function(){return function(n,r,o){n=n||{};var i=r.prototype,s={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function a(l,u,p,g){return i.fromToBase(l,u,p,g)}o.en.relativeTime=s,i.fromToBase=function(l,u,p,g,m){for(var w,v,_,I=p.$locale().relativeTime||s,b=n.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],E=b.length,x=0;x<E;x+=1){var C=b[x];C.d&&(w=g?o(l).diff(p,C.d,!0):p.diff(l,C.d,!0));var A=(n.rounding||Math.round)(Math.abs(w));if(_=w>0,A<=C.r||!C.r){A<=1&&x>0&&(C=b[x-1]);var f=I[C.l];m&&(A=m(""+A)),v=typeof f=="string"?f.replace("%d",A):f(A,u,C.l,_);break}}if(u)return v;var T=_?I.future:I.past;return typeof T=="function"?T(v):T.replace("%s",v)},i.to=function(l,u){return a(l,u,this,!0)},i.from=function(l,u){return a(l,u,this)};var c=function(l){return l.$u?o.utc():o()};i.toNow=function(l){return this.to(c(this),l)},i.fromNow=function(l){return this.from(c(this),l)}}})})(r1);var S5=r1.exports;const A5=$c(S5);ps.extend(A5);ps.extend(C5);ps.updateLocale("en",{relativeTime:{future:"in %s",past:"%s ago",s:"%s sec",m:"1 min",mm:"%d min",h:"1 hr",hh:"%d hrs",d:"1 d",dd:"%d d",M:"1 mo",MM:"%d mo",y:"1 yr",yy:"%d yr"}});const i1={getYear(t=new Date().toISOString()){return ps(t).year()},getRelativeDateFromNow(t){return ps(t).fromNow(!0)}},T5=3,I5=["receive","deposit","borrow","claim"],$5=["withdraw","repay","burn"],Br={getTransactionGroupTitle(t){const e=i1.getYear();return t===e?"This Year":t},getTransactionImages(t){const[e,n]=t,r=!!e&&(t==null?void 0:t.every(s=>!!s.nft_info)),o=(t==null?void 0:t.length)>1;return(t==null?void 0:t.length)===2&&!r?[this.getTransactionImage(e),this.getTransactionImage(n)]:o?t.map(s=>this.getTransactionImage(s)):[this.getTransactionImage(e)]},getTransactionImage(t){return{type:Br.getTransactionTransferTokenType(t),url:Br.getTransactionImageURL(t)}},getTransactionImageURL(t){var o,i,s,a,c;let e=null;const n=!!(t!=null&&t.nft_info),r=!!(t!=null&&t.fungible_info);return t&&n?e=(s=(i=(o=t==null?void 0:t.nft_info)==null?void 0:o.content)==null?void 0:i.preview)==null?void 0:s.url:t&&r&&(e=(c=(a=t==null?void 0:t.fungible_info)==null?void 0:a.icon)==null?void 0:c.url),e},getTransactionTransferTokenType(t){return t!=null&&t.fungible_info?"FUNGIBLE":t!=null&&t.nft_info?"NFT":null},getTransactionDescriptions(t){var p,g,m;const e=(p=t.metadata)==null?void 0:p.operationType,n=t.transfers,r=((g=t.transfers)==null?void 0:g.length)>0,o=((m=t.transfers)==null?void 0:m.length)>1,i=r&&(n==null?void 0:n.every(w=>!!w.fungible_info)),[s,a]=n;let c=this.getTransferDescription(s),l=this.getTransferDescription(a);if(!r)return(e==="send"||e==="receive")&&i?(c=Be.getTruncateString({string:t.metadata.sentFrom,charsStart:4,charsEnd:6,truncate:"middle"}),l=Be.getTruncateString({string:t.metadata.sentTo,charsStart:4,charsEnd:6,truncate:"middle"}),[c,l]):[t.metadata.status];if(o)return n.map(w=>this.getTransferDescription(w));let u="";return I5.includes(e)?u="+":$5.includes(e)&&(u="-"),c=u.concat(c),[c]},getTransferDescription(t){var n;let e="";return t&&(t!=null&&t.nft_info?e=((n=t==null?void 0:t.nft_info)==null?void 0:n.name)||"-":t!=null&&t.fungible_info&&(e=this.getFungibleTransferDescription(t)||"-")),e},getFungibleTransferDescription(t){var r;return t?[this.getQuantityFixedValue(t==null?void 0:t.quantity.numeric),(r=t==null?void 0:t.fungible_info)==null?void 0:r.symbol].join(" ").trim():null},getQuantityFixedValue(t){return t?parseFloat(t).toFixed(T5):null}},D5=Object.freeze(Object.defineProperty({__proto__:null,TransactionUtil:Br,UiHelperUtil:Be,get WuiAccountButton(){return Gt},get WuiAllWalletsImage(){return as},get WuiAvatar(){return Jr},get WuiButton(){return an},get WuiCard(){return Na},get WuiCardSelect(){return Sn},get WuiCardSelectLoader(){return cs},get WuiChip(){return An},get WuiConnectButton(){return zi},get WuiCtaButton(){return Xr},get WuiEmailInput(){return Qr},get WuiFlex(){return bt},get WuiGrid(){return Ct},get WuiIcon(){return qr},get WuiIconBox(){return Zt},get WuiIconLink(){return pr},get WuiImage(){return Fi},get WuiInputElement(){return ls},get WuiInputNumeric(){return Hi},get WuiInputText(){return cn},get WuiLink(){return Vi},get WuiListAccordion(){return Qi},get WuiListContent(){return ri},get WuiListItem(){return Ft},get WuiListWallet(){return Ot},get WuiListWalletTransaction(){return mr},get WuiLoadingHexagon(){return ka},get WuiLoadingSpinner(){return Wi},get WuiLoadingThumbnail(){return os},get WuiLogo(){return ds},get WuiLogoSelect(){return Zi},get WuiNetworkButton(){return Gi},get WuiNetworkImage(){return hr},get WuiNoticeCard(){return ni},get WuiOtp(){return ei},get WuiQrCode(){return zn},get WuiSearchBar(){return ja},get WuiSeparator(){return hs},get WuiShimmer(){return Kr},get WuiSnackbar(){return gr},get WuiTabs(){return un},get WuiTag(){return us},get WuiText(){return Yr},get WuiTooltip(){return Xi},get WuiTransactionListItem(){return ln},get WuiTransactionListItemLoader(){return Ua},get WuiTransactionVisual(){return Tn},get WuiVisual(){return ss},get WuiVisualThumbnail(){return ti},get WuiWalletImage(){return Cn},customElement:z,initializeTheming:Cp,setColorTheme:Pd,setThemeVariables:Sp},Symbol.toStringTag,{value:"Module"}));var mn=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let qt=class extends H{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.balance="show",this.charsStart=4,this.charsEnd=6,this.address=ke.state.address,this.balanceVal=ke.state.balance,this.balanceSymbol=ke.state.balanceSymbol,this.profileName=ke.state.profileName,this.profileImage=ke.state.profileImage,this.network=Qe.state.caipNetwork,this.unsubscribe.push(ke.subscribe(e=>{e.isConnected?(this.address=e.address,this.balanceVal=e.balance,this.profileName=e.profileName,this.profileImage=e.profileImage,this.balanceSymbol=e.balanceSymbol):(this.address="",this.balanceVal="",this.profileName="",this.profileImage="",this.balanceSymbol="")}),Qe.subscribeKey("caipNetwork",e=>this.network=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=Xe.getNetworkImage(this.network),n=this.balance==="show";return $`
      <wui-account-button
        .disabled=${!!this.disabled}
        address=${ve(this.profileName??this.address)}
        ?isProfileName=${!!this.profileName}
        networkSrc=${ve(e)}
        avatarSrc=${ve(this.profileImage)}
        balance=${n?le.formatBalance(this.balanceVal,this.balanceSymbol):""}
        @click=${this.onClick.bind(this)}
        data-testid="account-button"
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
      >
      </wui-account-button>
    `}onClick(){ze.open()}};mn([D({type:Boolean})],qt.prototype,"disabled",void 0);mn([D()],qt.prototype,"balance",void 0);mn([D()],qt.prototype,"charsStart",void 0);mn([D()],qt.prototype,"charsEnd",void 0);mn([ee()],qt.prototype,"address",void 0);mn([ee()],qt.prototype,"balanceVal",void 0);mn([ee()],qt.prototype,"balanceSymbol",void 0);mn([ee()],qt.prototype,"profileName",void 0);mn([ee()],qt.prototype,"profileImage",void 0);mn([ee()],qt.prototype,"network",void 0);qt=mn([z("w3m-account-button")],qt);const P5=q`
  :host {
    display: block;
    width: max-content;
  }
`;var Yn=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let dn=class extends H{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.balance=void 0,this.size=void 0,this.label=void 0,this.loadingLabel=void 0,this.charsStart=4,this.charsEnd=6,this.isAccount=ke.state.isConnected,this.unsubscribe.push(ke.subscribeKey("isConnected",e=>{this.isAccount=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return this.isAccount?$`
          <w3m-account-button
            .disabled=${!!this.disabled}
            balance=${ve(this.balance)}
            .charsStart=${ve(this.charsStart)}
            .charsEnd=${ve(this.charsEnd)}
          >
          </w3m-account-button>
        `:$`
          <w3m-connect-button
            size=${ve(this.size)}
            label=${ve(this.label)}
            loadingLabel=${ve(this.loadingLabel)}
          ></w3m-connect-button>
        `}};dn.styles=P5;Yn([D({type:Boolean})],dn.prototype,"disabled",void 0);Yn([D()],dn.prototype,"balance",void 0);Yn([D()],dn.prototype,"size",void 0);Yn([D()],dn.prototype,"label",void 0);Yn([D()],dn.prototype,"loadingLabel",void 0);Yn([D()],dn.prototype,"charsStart",void 0);Yn([D()],dn.prototype,"charsEnd",void 0);Yn([ee()],dn.prototype,"isAccount",void 0);dn=Yn([z("w3m-button")],dn);var po=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ii=class extends H{constructor(){super(),this.unsubscribe=[],this.size="md",this.label="Connect Wallet",this.loadingLabel="Connecting...",this.open=ze.state.open,this.loading=ze.state.loading,this.unsubscribe.push(ze.subscribe(e=>{this.open=e.open,this.loading=e.loading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.loading||this.open;return $`
      <wui-connect-button
        size=${ve(this.size)}
        .loading=${e}
        @click=${this.onClick.bind(this)}
        data-testid="connect-button"
      >
        ${e?this.loadingLabel:this.label}
      </wui-connect-button>
    `}onClick(){this.open?ze.close():this.loading||ze.open()}};po([D()],ii.prototype,"size",void 0);po([D()],ii.prototype,"label",void 0);po([D()],ii.prototype,"loadingLabel",void 0);po([ee()],ii.prototype,"open",void 0);po([ee()],ii.prototype,"loading",void 0);ii=po([z("w3m-connect-button")],ii);const O5=q`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  wui-card {
    max-width: 360px;
    width: 100%;
    position: relative;
    animation-delay: 0.3s;
    animation-duration: 0.2s;
    animation-name: zoom-in;
    animation-fill-mode: backwards;
    animation-timing-function: var(--wui-ease-out-power-2);
    outline: none;
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation-name: slide-in;
    }
  }
`;var qc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const cf="scroll-lock";let oi=class extends H{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=ze.state.open,this.caipAddress=ke.state.address,this.isSiweEnabled=nt.state.isSiweEnabled,this.initializeTheming(),Pe.prefetch(),this.unsubscribe.push(ze.subscribeKey("open",e=>e?this.onOpen():this.onClose()),nt.subscribeKey("isSiweEnabled",e=>{this.isSiweEnabled=e}),ke.subscribe(e=>this.onNewAccountState(e))),we.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.open?$`
          <wui-flex @click=${this.onOverlayClick.bind(this)}>
            <wui-card role="alertdialog" aria-modal="true" tabindex="0">
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){this.isSiweEnabled&&nt.state.status!=="success"&&await Re.disconnect(),ze.close()}initializeTheming(){const{themeVariables:e,themeMode:n}=It.state,r=Be.getColorTheme(n);Cp(e,r)}async onClose(){this.onScrollUnlock(),await this.animate([{opacity:1},{opacity:0}],{duration:200,easing:"ease",fill:"forwards"}).finished,et.hide(),this.open=!1,this.onRemoveKeyboardListener()}async onOpen(){this.onScrollLock(),this.open=!0,await this.animate([{opacity:0},{opacity:1}],{duration:200,easing:"ease",fill:"forwards",delay:300}).finished,this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=cf,e.textContent=`
      html, body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${cf}"]`);e&&e.remove()}onAddKeyboardListener(){var n;this.abortController=new AbortController;const e=(n=this.shadowRoot)==null?void 0:n.querySelector("wui-card");e==null||e.focus(),window.addEventListener("keydown",r=>{if(r.key==="Escape")this.handleClose();else if(r.key==="Tab"){const{tagName:o}=r.target;o&&!o.includes("W3M-")&&!o.includes("WUI-")&&(e==null||e.focus())}},this.abortController)}onRemoveKeyboardListener(){var e;(e=this.abortController)==null||e.abort(),this.abortController=void 0}async onNewAccountState(e){const{isConnected:n,caipAddress:r}=e;if(this.isSiweEnabled){n&&!this.caipAddress&&(this.caipAddress=r),n&&r&&this.caipAddress!==r&&(await nt.signOut(),this.onSiweNavigation(),this.caipAddress=r);try{const o=await nt.getSession();o&&!n?await nt.signOut():n&&!o&&this.onSiweNavigation()}catch{n&&this.onSiweNavigation()}}}onSiweNavigation(){this.open?oe.push("ConnectingSiwe"):ze.open({view:"ConnectingSiwe"})}};oi.styles=O5;qc([ee()],oi.prototype,"open",void 0);qc([ee()],oi.prototype,"caipAddress",void 0);qc([ee()],oi.prototype,"isSiweEnabled",void 0);oi=qc([z("w3m-modal")],oi);const R5=Object.freeze(Object.defineProperty({__proto__:null,get W3mModal(){return oi}},Symbol.toStringTag,{value:"Module"})),N5=q`
  :host {
    display: block;
    width: max-content;
  }
`;var qs=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let si=class extends H{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.network=Qe.state.caipNetwork,this.connected=ke.state.isConnected,this.loading=ze.state.loading,this.unsubscribe.push(Qe.subscribeKey("caipNetwork",e=>this.network=e),ke.subscribeKey("isConnected",e=>this.connected=e),ze.subscribeKey("loading",e=>this.loading=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){var e;return $`
      <wui-network-button
        .disabled=${!!(this.disabled||this.loading)}
        imageSrc=${ve(Xe.getNetworkImage(this.network))}
        @click=${this.onClick.bind(this)}
      >
        ${((e=this.network)==null?void 0:e.name)??(this.connected?"Unknown Network":"Select Network")}
      </wui-network-button>
    `}onClick(){this.loading||ze.open({view:"Networks"})}};si.styles=N5;qs([D({type:Boolean})],si.prototype,"disabled",void 0);qs([ee()],si.prototype,"network",void 0);qs([ee()],si.prototype,"connected",void 0);qs([ee()],si.prototype,"loading",void 0);si=qs([z("w3m-network-button")],si);const k5=q`
  :host {
    display: block;
    will-change: transform, opacity;
  }
`;var o1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Fa=class extends H{constructor(){super(),this.resizeObserver=void 0,this.prevHeight="0px",this.prevHistoryLength=1,this.unsubscribe=[],this.view=oe.state.view,this.unsubscribe.push(oe.subscribeKey("view",e=>this.onViewChange(e)))}firstUpdated(){this.resizeObserver=new ResizeObserver(async([e])=>{const n=`${e==null?void 0:e.contentRect.height}px`;this.prevHeight!=="0px"&&(await this.animate([{height:this.prevHeight},{height:n}],{duration:150,easing:"ease",fill:"forwards"}).finished,this.style.height="auto"),this.prevHeight=n}),this.resizeObserver.observe(this.getWrapper())}disconnectedCallback(){var e;(e=this.resizeObserver)==null||e.unobserve(this.getWrapper()),this.unsubscribe.forEach(n=>n())}render(){return $`<div>${this.viewTemplate()}</div>`}viewTemplate(){switch(this.view){case"Connect":return $`<w3m-connect-view></w3m-connect-view>`;case"ConnectingWalletConnect":return $`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingExternal":return $`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return $`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"AllWallets":return $`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"Networks":return $`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return $`<w3m-network-switch-view></w3m-network-switch-view>`;case"Account":return $`<w3m-account-view></w3m-account-view>`;case"WhatIsAWallet":return $`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"WhatIsANetwork":return $`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"GetWallet":return $`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Downloads":return $`<w3m-downloads-view></w3m-downloads-view>`;case"EmailVerifyOtp":return $`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return $`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"ApproveTransaction":return $`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"Transactions":return $`<w3m-transactions-view></w3m-transactions-view>`;case"UpgradeEmailWallet":return $`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return $`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailWalletWaiting":return $`<w3m-update-email-wallet-waiting-view></w3m-update-email-wallet-waiting-view>`;default:return $`<w3m-connect-view></w3m-connect-view>`}}async onViewChange(e){const{history:n}=oe.state;let r=-10,o=10;n.length<this.prevHistoryLength&&(r=10,o=-10),this.prevHistoryLength=n.length,await this.animate([{opacity:1,transform:"translateX(0px)"},{opacity:0,transform:`translateX(${r}px)`}],{duration:150,easing:"ease",fill:"forwards"}).finished,this.view=e,await this.animate([{opacity:0,transform:`translateX(${o}px)`},{opacity:1,transform:"translateX(0px)"}],{duration:150,easing:"ease",fill:"forwards",delay:50}).finished}getWrapper(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector("div")}};Fa.styles=k5;o1([ee()],Fa.prototype,"view",void 0);Fa=o1([z("w3m-router")],Fa);const M5=q`
  wui-flex {
    width: 100%;
  }

  :host > wui-flex:first-child {
    transform: translateY(calc(var(--wui-spacing-xxs) * -1));
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  wui-notice-card {
    margin-bottom: var(--wui-spacing-3xs);
  }
`;var Tr=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let In=class extends H{constructor(){super(),this.usubscribe=[],this.address=ke.state.address,this.profileImage=ke.state.profileImage,this.profileName=ke.state.profileName,this.balance=ke.state.balance,this.balanceSymbol=ke.state.balanceSymbol,this.network=Qe.state.caipNetwork,this.disconecting=!1,this.usubscribe.push(ke.subscribe(e=>{e.address?(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.balance=e.balance,this.balanceSymbol=e.balanceSymbol):ze.close()}),Qe.subscribeKey("caipNetwork",e=>{e!=null&&e.id&&(this.network=e)}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){var n;if(!this.address)throw new Error("w3m-account-view: No account provided");const e=Xe.getNetworkImage(this.network);return $`
      <wui-flex
        flexDirection="column"
        .padding=${["0","s","m","s"]}
        alignItems="center"
        gap="l"
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${ve(this.profileImage===null?void 0:this.profileImage)}
        ></wui-avatar>

        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="large-600" color="fg-100">
              ${this.profileName?Be.getTruncateString({string:this.profileName,charsStart:20,charsEnd:0,truncate:"end"}):Be.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
          <wui-flex gap="s" flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-500" color="fg-200">
              ${le.formatBalance(this.balance,this.balanceSymbol)}
            </wui-text>

            ${this.explorerBtnTemplate()}
          </wui-flex>
        </wui-flex>
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${["0","s","s","s"]}>
        ${this.emailCardTemplate()} ${this.emailBtnTemplate()}

        <wui-list-item
          .variant=${e?"image":"icon"}
          iconVariant="overlay"
          icon="networkPlaceholder"
          imageSrc=${ve(e)}
          ?chevron=${this.isAllowedNetworkSwitch()}
          @click=${this.onNetworks.bind(this)}
          data-testid="w3m-account-select-network"
        >
          <wui-text variant="paragraph-500" color="fg-100">
            ${((n=this.network)==null?void 0:n.name)??"Unknown"}
          </wui-text>
        </wui-list-item>
        <wui-list-item
          iconVariant="blue"
          icon="swapHorizontalBold"
          iconSize="sm"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${!1}
          .loading=${this.disconecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `}emailCardTemplate(){const e=Et.getConnectedConnector(),n=We.getEmailConnector(),{origin:r}=location;return!n||e!=="EMAIL"||r.includes(Bn.SECURE_SITE)?null:$`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a non-custodial wallet"
        icon="wallet"
      ></wui-notice-card>
    `}emailBtnTemplate(){const e=Et.getConnectedConnector(),n=We.getEmailConnector();if(!n||e!=="EMAIL")return null;const r=n.provider.getEmail()??"";return $`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="mail"
        iconSize="sm"
        ?chevron=${!0}
        @click=${()=>this.onGoToUpdateEmail(r)}
      >
        <wui-text variant="paragraph-500" color="fg-100">${r}</wui-text>
      </wui-list-item>
    `}explorerBtnTemplate(){const{addressExplorerUrl:e}=ke.state;return e?$`
      <wui-button size="sm" variant="shade" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `:null}isAllowedNetworkSwitch(){const{requestedCaipNetworks:e}=Qe.state,n=e?e.length>1:!1,r=e==null?void 0:e.find(({id:o})=>{var i;return o===((i=this.network)==null?void 0:i.id)});return n||!r}onCopyAddress(){try{this.address&&(le.copyToClopboard(this.address),et.showSuccess("Address copied"))}catch{et.showError("Failed to copy")}}onNetworks(){this.isAllowedNetworkSwitch()&&oe.push("Networks")}onTransactions(){we.sendEvent({type:"track",event:"CLICK_TRANSACTIONS"}),oe.push("Transactions")}async onDisconnect(){try{this.disconecting=!0,await Re.disconnect(),we.sendEvent({type:"track",event:"DISCONNECT_SUCCESS"}),ze.close()}catch{we.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),et.showError("Failed to disconnect")}finally{this.disconecting=!1}}onExplorer(){const{addressExplorerUrl:e}=ke.state;e&&le.openHref(e,"_blank")}onGoToUpgradeView(){we.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),oe.push("UpgradeEmailWallet")}onGoToUpdateEmail(e){oe.push("UpdateEmailWallet",{email:e})}};In.styles=M5;Tr([ee()],In.prototype,"address",void 0);Tr([ee()],In.prototype,"profileImage",void 0);Tr([ee()],In.prototype,"profileName",void 0);Tr([ee()],In.prototype,"balance",void 0);Tr([ee()],In.prototype,"balanceSymbol",void 0);Tr([ee()],In.prototype,"network",void 0);Tr([ee()],In.prototype,"disconecting",void 0);In=Tr([z("w3m-account-view")],In);var s1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let vu=class extends H{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=le.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return $`
      <wui-flex padding="s" gap="s">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e?$`<w3m-all-wallets-search query=${this.search}></w3m-all-wallets-search>`:$`<w3m-all-wallets-list></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}qrButtonTemplate(){return le.isMobile()?$`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){oe.push("ConnectingWalletConnect")}};s1([ee()],vu.prototype,"search",void 0);vu=s1([z("w3m-all-wallets-view")],vu);const U5=q`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var a1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Wa=class extends H{constructor(){super(),this.unsubscribe=[],this.connectors=We.state.connectors,this.unsubscribe.push(We.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return $`
      <wui-flex flexDirection="column" padding="s" gap="xs">
        <w3m-email-login-widget></w3m-email-login-widget>

        ${this.walletConnectConnectorTemplate()} ${this.recentTemplate()}
        ${this.announcedTemplate()} ${this.injectedTemplate()} ${this.featuredTemplate()}
        ${this.customTemplate()} ${this.recommendedTemplate()} ${this.connectorsTemplate()}
        ${this.allWalletsTemplate()}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}walletConnectConnectorTemplate(){if(le.isMobile())return null;const e=this.connectors.find(n=>n.type==="WALLET_CONNECT");return e?$`
      <wui-list-wallet
        imageSrc=${ve(Xe.getConnectorImage(e))}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `:null}customTemplate(){const{customWallets:e}=Ue.state;return e!=null&&e.length?this.filterOutDuplicateWallets(e).map(r=>$`
        <wui-list-wallet
          imageSrc=${ve(Xe.getWalletImage(r))}
          name=${r.name??"Unknown"}
          @click=${()=>this.onConnectWallet(r)}
        >
        </wui-list-wallet>
      `):null}featuredTemplate(){if(!this.connectors.find(o=>o.type==="WALLET_CONNECT"))return null;const{featured:n}=Pe.state;return n.length?this.filterOutDuplicateWallets(n).map(o=>$`
        <wui-list-wallet
          imageSrc=${ve(Xe.getWalletImage(o))}
          name=${o.name??"Unknown"}
          @click=${()=>this.onConnectWallet(o)}
        >
        </wui-list-wallet>
      `):null}recentTemplate(){return Et.getRecentWallets().map(n=>$`
        <wui-list-wallet
          imageSrc=${ve(Xe.getWalletImage(n))}
          name=${n.name??"Unknown"}
          @click=${()=>this.onConnectWallet(n)}
          tagLabel="recent"
          tagVariant="shade"
        >
        </wui-list-wallet>
      `)}announcedTemplate(){return this.connectors.map(e=>e.type!=="ANNOUNCED"?null:$`
        <wui-list-wallet
          imageSrc=${ve(Xe.getConnectorImage(e))}
          name=${e.name??"Unknown"}
          @click=${()=>this.onConnector(e)}
          tagVariant="success"
          .installed=${!0}
        >
        </wui-list-wallet>
      `)}injectedTemplate(){const e=this.connectors.find(n=>n.type==="ANNOUNCED");return this.connectors.map(n=>n.type!=="INJECTED"||!Re.checkInstalled()?null:$`
        <wui-list-wallet
          imageSrc=${ve(Xe.getConnectorImage(n))}
          .installed=${!!e}
          name=${n.name??"Unknown"}
          @click=${()=>this.onConnector(n)}
        >
        </wui-list-wallet>
      `)}connectorsTemplate(){const e=We.getAnnouncedConnectorRdns();return this.connectors.map(n=>["WALLET_CONNECT","INJECTED","ANNOUNCED","EMAIL"].includes(n.type)||e.includes(Bn.CONNECTOR_RDNS_MAP[n.id])?null:$`
        <wui-list-wallet
          imageSrc=${ve(Xe.getConnectorImage(n))}
          name=${n.name??"Unknown"}
          @click=${()=>this.onConnector(n)}
        >
        </wui-list-wallet>
      `)}allWalletsTemplate(){if(!this.connectors.find(a=>a.type==="WALLET_CONNECT"))return null;const n=Pe.state.count,r=Pe.state.featured.length,o=n+r,i=o<10?o:Math.floor(o/10)*10,s=i<o?`${i}+`:`${i}`;return $`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${s}
        tagVariant="shade"
        data-testid="all-wallets"
      ></wui-list-wallet>
    `}recommendedTemplate(){if(!this.connectors.find(p=>p.type==="WALLET_CONNECT"))return null;const{recommended:n}=Pe.state,{customWallets:r,featuredWalletIds:o}=Ue.state,{connectors:i}=We.state,s=Et.getRecentWallets(),a=i.filter(p=>p.type==="ANNOUNCED");if(o||r||!n.length)return null;const c=a.length+s.length,l=Math.max(0,2-c);return this.filterOutDuplicateWallets(n).slice(0,l).map(p=>$`
        <wui-list-wallet
          imageSrc=${ve(Xe.getWalletImage(p))}
          name=${(p==null?void 0:p.name)??"Unknown"}
          @click=${()=>this.onConnectWallet(p)}
        >
        </wui-list-wallet>
      `)}onConnector(e){e.type==="WALLET_CONNECT"?le.isMobile()?oe.push("AllWallets"):oe.push("ConnectingWalletConnect"):oe.push("ConnectingExternal",{connector:e})}filterOutDuplicateWallets(e){const{connectors:n}=We.state,o=Et.getRecentWallets().map(a=>a.id),i=n.map(a=>{var c;return(c=a.info)==null?void 0:c.rdns}).filter(Boolean);return e.filter(a=>!o.includes(a.id)&&!i.includes(a.rdns??void 0))}onAllWallets(){we.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),oe.push("AllWallets")}onConnectWallet(e){oe.push("ConnectingWalletConnect",{wallet:e})}};Wa.styles=U5;a1([ee()],Wa.prototype,"connectors",void 0);Wa=a1([z("w3m-connect-view")],Wa);const B5=q`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var wi=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};class Nt extends H{constructor(){var e,n,r,o;super(),this.wallet=(e=oe.state.data)==null?void 0:e.wallet,this.connector=(n=oe.state.data)==null?void 0:n.connector,this.timeout=void 0,this.secondaryBtnLabel="Try again",this.secondaryBtnIcon="refresh",this.secondaryLabel="Accept connection request in the wallet",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=Xe.getWalletImage(this.wallet)??Xe.getConnectorImage(this.connector),this.name=((r=this.wallet)==null?void 0:r.name)??((o=this.connector)==null?void 0:o.name)??"Wallet",this.isRetrying=!1,this.uri=Re.state.wcUri,this.error=Re.state.wcError,this.ready=!1,this.showRetry=!1,this.buffering=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(Re.subscribeKey("wcUri",i=>{var s;this.uri=i,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,(s=this.onConnect)==null||s.call(this))}),Re.subscribeKey("wcError",i=>this.error=i),Re.subscribeKey("buffering",i=>this.buffering=i))}firstUpdated(){var e;(e=this.onAutoConnect)==null||e.call(this),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearTimeout(this.timeout)}render(){var r;(r=this.onRender)==null||r.call(this),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let n=`Continue in ${this.name}`;return this.buffering&&(n="Connecting..."),this.error&&(n="Connection declined"),$`
      <wui-flex
        data-error=${ve(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${ve(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${n}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        <wui-button
          variant="accent"
          ?disabled=${!this.error&&this.buffering}
          @click=${this.onTryAgain.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
          ${this.secondaryBtnLabel}
        </wui-button>
      </wui-flex>

      ${this.isWalletConnect?$`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){var e;if(this.error&&!this.showRetry){this.showRetry=!0;const n=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-button");n==null||n.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){var e,n;this.buffering||(Re.setWcError(!1),this.onRetry?(this.isRetrying=!0,(e=this.onRetry)==null||e.call(this)):(n=this.onConnect)==null||n.call(this))}loaderTemplate(){const e=It.state.themeVariables["--w3m-border-radius-master"],n=e?parseInt(e.replace("px",""),10):4;return $`<wui-loading-thumbnail radius=${n*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(le.copyToClopboard(this.uri),et.showSuccess("Link copied"))}catch{et.showError("Failed to copy")}}}Nt.styles=B5;wi([ee()],Nt.prototype,"uri",void 0);wi([ee()],Nt.prototype,"error",void 0);wi([ee()],Nt.prototype,"ready",void 0);wi([ee()],Nt.prototype,"showRetry",void 0);wi([ee()],Nt.prototype,"buffering",void 0);wi([D({type:Boolean})],Nt.prototype,"isMobile",void 0);wi([D()],Nt.prototype,"onRetry",void 0);var L5=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const j5={INJECTED:"browser",ANNOUNCED:"browser"};let lf=class extends Nt{constructor(){if(super(),!this.connector)throw new Error("w3m-connecting-view: No connector provided");we.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.connector.name??"Unknown",platform:j5[this.connector.type]??"external"}}),this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),this.isWalletConnect=!1}async onConnectProxy(){try{this.error=!1,this.connector&&(this.connector.imageUrl&&Et.setConnectedWalletImageUrl(this.connector.imageUrl),await Re.connectExternal(this.connector),nt.state.isSiweEnabled?oe.push("ConnectingSiwe"):ze.close(),we.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"external"}}))}catch(e){we.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(e==null?void 0:e.message)??"Unknown"}}),this.error=!0}}};lf=L5([z("w3m-connecting-external-view")],lf);var c1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let xu=class extends H{constructor(){var e;super(...arguments),this.dappName=(e=Ue.state.metadata)==null?void 0:e.name,this.isSigning=!1}render(){return $`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="md"
          ?fullwidth=${!0}
          variant="shade"
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="md"
          ?fullwidth=${!0}
          variant="fill"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}async onSign(){this.isSigning=!0,we.sendEvent({event:"CLICK_SIGN_SIWE_MESSAGE",type:"track"});try{nt.setStatus("loading");const e=await nt.signIn();return nt.setStatus("success"),we.sendEvent({event:"SIWE_AUTH_SUCCESS",type:"track"}),e}catch{return et.showError("Signature declined"),nt.setStatus("error"),we.sendEvent({event:"SIWE_AUTH_ERROR",type:"track"})}finally{this.isSigning=!1}}async onCancel(){const{isConnected:e}=ke.state;e?(await Re.disconnect(),ze.close()):oe.push("Connect"),we.sendEvent({event:"CLICK_CANCEL_SIWE",type:"track"})}};c1([ee()],xu.prototype,"isSigning",void 0);xu=c1([z("w3m-connecting-siwe-view")],xu);var Gd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let za=class extends H{constructor(){var e;super(),this.interval=void 0,this.lastRetry=Date.now(),this.wallet=(e=oe.state.data)==null?void 0:e.wallet,this.platform=void 0,this.platforms=[],this.initializeConnection(),this.interval=setInterval(this.initializeConnection.bind(this),Bn.TEN_SEC_MS)}disconnectedCallback(){clearTimeout(this.interval)}render(){return this.wallet?(this.determinePlatforms(),$`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
    `):$`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`}async initializeConnection(e=!1){try{const{wcPairingExpiry:n}=Re.state;if(e||le.isPairingExpired(n)){if(Re.connectWalletConnect(),this.wallet){const r=Xe.getWalletImage(this.wallet);r&&Et.setConnectedWalletImageUrl(r)}else{const o=We.state.connectors.find(s=>s.type==="WALLET_CONNECT"),i=Xe.getConnectorImage(o);i&&Et.setConnectedWalletImageUrl(i)}await Re.state.wcPromise,this.finalizeConnection(),nt.state.isSiweEnabled?oe.push("ConnectingSiwe"):ze.close()}}catch(n){we.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(n==null?void 0:n.message)??"Unknown"}}),Re.setWcError(!0),le.isAllowedRetry(this.lastRetry)&&(et.showError("Declined"),this.lastRetry=Date.now(),this.initializeConnection(!0))}}finalizeConnection(){const{wcLinking:e,recentWallet:n}=Re.state;e&&Et.setWalletConnectDeepLink(e),n&&Et.setWeb3ModalRecent(n),we.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:e?"mobile":"qrcode"}})}determinePlatforms(){if(!this.wallet)throw new Error("w3m-connecting-wc-view:determinePlatforms No wallet");if(this.platform)return;const{mobile_link:e,desktop_link:n,webapp_link:r,injected:o,rdns:i}=this.wallet,s=o==null?void 0:o.map(({injected_id:w})=>w).filter(Boolean),a=i?[i]:s??[],c=a.length,l=e,u=r,p=Re.checkInstalled(a),g=c&&p,m=n&&!le.isMobile();g&&this.platforms.push("browser"),l&&this.platforms.push(le.isMobile()?"mobile":"qrcode"),u&&this.platforms.push("web"),m&&this.platforms.push("desktop"),!g&&c&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return $`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"desktop":return $`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"web":return $`
          <w3m-connecting-wc-web .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-web>
        `;case"mobile":return $`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return $`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return $`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?$`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){var r;const n=(r=this.shadowRoot)==null?void 0:r.querySelector("div");n&&(await n.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,n.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};Gd([ee()],za.prototype,"platform",void 0);Gd([ee()],za.prototype,"platforms",void 0);za=Gd([z("w3m-connecting-wc-view")],za);var F5=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let uf=class extends H{constructor(){var e;super(...arguments),this.wallet=(e=oe.state.data)==null?void 0:e.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return $`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){var e;return(e=this.wallet)!=null&&e.chrome_store?$`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){var e;return(e=this.wallet)!=null&&e.app_store?$`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){var e;return(e=this.wallet)!=null&&e.play_store?$`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){var e;return(e=this.wallet)!=null&&e.homepage?$`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){var e;(e=this.wallet)!=null&&e.chrome_store&&le.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&le.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&le.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&le.openHref(this.wallet.homepage,"_blank")}};uf=F5([z("w3m-downloads-view")],uf);var W5=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const z5="https://walletconnect.com/explorer";let df=class extends H{render(){return $`
      <wui-flex flexDirection="column" padding="s" gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${()=>{le.openHref("https://walletconnect.com/explorer?type=wallet","_blank")}}
        ></wui-list-wallet>
      </wui-flex>
    `}recommendedWalletsTemplate(){const{recommended:e,featured:n}=Pe.state,{customWallets:r}=Ue.state;return[...n,...r??[],...e].slice(0,4).map(i=>$`
        <wui-list-wallet
          name=${i.name??"Unknown"}
          tagVariant="main"
          imageSrc=${ve(Xe.getWalletImage(i))}
          @click=${()=>{le.openHref(i.homepage??z5,"_blank")}}
        ></wui-list-wallet>
      `)}};df=W5([z("w3m-get-wallet-view")],df);const H5=q`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`;var qd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let gs=class extends H{constructor(){var e;super(),this.network=(e=oe.state.data)==null?void 0:e.network,this.unsubscribe=[],this.showRetry=!1,this.error=!1}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.onSwitchNetwork()}render(){if(!this.network)throw new Error("w3m-network-switch-view: No network provided");this.onShowRetry();const e=this.error?"Switch declined":"Approve in wallet",n=this.error?"Switch can be declined if chain is not supported by a wallet or previous request is still active":"Accept connection request in your wallet";return $`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","3xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${ve(Xe.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error?null:$`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            ?border=${!0}
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">${e}</wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${n}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="fill"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `}onShowRetry(){var e;if(this.error&&!this.showRetry){this.showRetry=!0;const n=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-button");n==null||n.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}async onSwitchNetwork(){try{this.error=!1,this.network&&(await Qe.switchActiveNetwork(this.network),nt.state.isSiweEnabled||gp.navigateAfterNetworkSwitch())}catch{this.error=!0}}};gs.styles=H5;qd([ee()],gs.prototype,"showRetry",void 0);qd([ee()],gs.prototype,"error",void 0);gs=qd([z("w3m-network-switch-view")],gs);const V5=q`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }
`;var l1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Ha=class extends H{constructor(){super(),this.unsubscribe=[],this.caipNetwork=Qe.state.caipNetwork,this.unsubscribe.push(Qe.subscribeKey("caipNetwork",e=>this.caipNetwork=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return $`
      <wui-grid padding="s" gridTemplateColumns="repeat(4, 1fr)" rowGap="l" columnGap="xs">
        ${this.networksTemplate()}
      </wui-grid>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-400" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `}onNetworkHelp(){we.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),oe.push("WhatIsANetwork")}networksTemplate(){const{approvedCaipNetworkIds:e,requestedCaipNetworks:n,supportsAllNetworks:r}=Qe.state,o=e,i=n,s={};return i&&o&&(o.forEach((a,c)=>{s[a]=c}),i.sort((a,c)=>{const l=s[a.id],u=s[c.id];return l!==void 0&&u!==void 0?l-u:l!==void 0?-1:u!==void 0?1:0})),i==null?void 0:i.map(a=>{var c;return $`
        <wui-card-select
          .selected=${((c=this.caipNetwork)==null?void 0:c.id)===a.id}
          imageSrc=${ve(Xe.getNetworkImage(a))}
          type="network"
          name=${a.name??a.id}
          @click=${()=>this.onSwitchNetwork(a)}
          .disabled=${!r&&!(o!=null&&o.includes(a.id))}
          data-testid=${`w3m-network-switch-${a.name??a.id}`}
        ></wui-card-select>
      `})}async onSwitchNetwork(e){const{isConnected:n}=ke.state,{approvedCaipNetworkIds:r,supportsAllNetworks:o,caipNetwork:i}=Qe.state,{data:s}=oe.state;n&&(i==null?void 0:i.id)!==e.id?r!=null&&r.includes(e.id)?(await Qe.switchActiveNetwork(e),gp.navigateAfterNetworkSwitch()):o&&oe.push("SwitchNetwork",{...s,network:e}):n||(Qe.setCaipNetwork(e),oe.push("Connect"))}};Ha.styles=V5;l1([ee()],Ha.prototype,"caipNetwork",void 0);Ha=l1([z("w3m-networks-view")],Ha);const Z5=q`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }
`;var bi=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const ua="last-transaction",G5=7;let Hn=class extends H{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.address=ke.state.address,this.transactions=Xt.state.transactions,this.transactionsByYear=Xt.state.transactionsByYear,this.loading=Xt.state.loading,this.empty=Xt.state.empty,this.next=Xt.state.next,this.unsubscribe.push(ke.subscribe(e=>{e.isConnected&&this.address!==e.address&&(this.address=e.address,Xt.resetTransactions(),Xt.fetchTransactions(e.address))}),Xt.subscribe(e=>{this.transactions=e.transactions,this.transactionsByYear=e.transactionsByYear,this.loading=e.loading,this.empty=e.empty,this.next=e.next}))}firstUpdated(){this.transactions.length===0&&Xt.fetchTransactions(this.address),this.createPaginationObserver()}updated(){this.setPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return $`
      <wui-flex flexDirection="column" padding="s" gap="s">
        ${this.empty?null:this.templateTransactionsByYear()}
        ${this.loading?this.templateLoading():null}
        ${!this.loading&&this.empty?this.templateEmpty():null}
      </wui-flex>
    `}templateTransactionsByYear(){const e=Object.keys(this.transactionsByYear).sort().reverse();return e.map((n,r)=>{const o=r===e.length-1,i=parseInt(n,10),s=Br.getTransactionGroupTitle(i),a=this.transactionsByYear[i];return a?$`
        <wui-flex flexDirection="column" gap="s">
          <wui-flex
            alignItems="center"
            flexDirection="row"
            .padding=${["xs","s","s","s"]}
          >
            <wui-text variant="paragraph-500" color="fg-200">${s}</wui-text>
          </wui-flex>
          <wui-flex flexDirection="column" gap="xs">
            ${this.templateTransactions(a,o)}
          </wui-flex>
        </wui-flex>
      `:null})}templateRenderTransaction(e,n){const{date:r,descriptions:o,direction:i,isAllNFT:s,images:a,status:c,transfers:l,type:u}=this.getTransactionListItemProps(e),p=(l==null?void 0:l.length)>1;return(l==null?void 0:l.length)===2&&!s?$`
        <wui-transaction-list-item
          date=${r}
          .direction=${i}
          id=${n&&this.next?ua:""}
          status=${c}
          type=${u}
          .images=${a}
          .descriptions=${o}
        ></wui-transaction-list-item>
      `:p?l.map((m,w)=>{const v=Br.getTransferDescription(m),_=n&&w===l.length-1;return $` <wui-transaction-list-item
          date=${r}
          direction=${m.direction}
          id=${_&&this.next?ua:""}
          status=${c}
          type=${u}
          .onlyDirectionIcon=${!0}
          .images=${[a==null?void 0:a[w]]}
          .descriptions=${[v]}
        ></wui-transaction-list-item>`}):$`
      <wui-transaction-list-item
        date=${r}
        .direction=${i}
        id=${n&&this.next?ua:""}
        status=${c}
        type=${u}
        .images=${a}
        .descriptions=${o}
      ></wui-transaction-list-item>
    `}templateTransactions(e,n){return e.map((r,o)=>{const i=n&&o===e.length-1;return $`${this.templateRenderTransaction(r,i)}`})}templateEmpty(){return $`
      <wui-flex
        flexGrow="1"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        .padding=${["3xl","xl","3xl","xl"]}
        gap="xl"
      >
        <wui-icon-box
          backgroundColor="glass-005"
          background="gray"
          iconColor="fg-200"
          icon="wallet"
          size="lg"
          ?border=${!0}
          borderColor="wui-color-bg-125"
        ></wui-icon-box>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100"
            >No Transactions yet</wui-text
          >
          <wui-text align="center" variant="small-500" color="fg-200"
            >Start trading on dApps <br />
            to grow your wallet!</wui-text
          >
        </wui-flex>
      </wui-flex>
    `}templateLoading(){return Array(G5).fill($` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map(e=>e)}createPaginationObserver(){const{projectId:e}=Ue.state;this.paginationObserver=new IntersectionObserver(([n])=>{n!=null&&n.isIntersecting&&!this.loading&&(Xt.fetchTransactions(this.address),we.sendEvent({type:"track",event:"LOAD_MORE_TRANSACTIONS",properties:{address:this.address,projectId:e,cursor:this.next}}))},{}),this.setPaginationObserver()}setPaginationObserver(){var n,r,o;(n=this.paginationObserver)==null||n.disconnect();const e=(r=this.shadowRoot)==null?void 0:r.querySelector(`#${ua}`);e&&((o=this.paginationObserver)==null||o.observe(e))}getTransactionListItemProps(e){var c,l,u,p,g;const n=i1.getRelativeDateFromNow((c=e==null?void 0:e.metadata)==null?void 0:c.minedAt),r=Br.getTransactionDescriptions(e),o=e==null?void 0:e.transfers,i=(l=e==null?void 0:e.transfers)==null?void 0:l[0],s=!!i&&((u=e==null?void 0:e.transfers)==null?void 0:u.every(m=>!!m.nft_info)),a=Br.getTransactionImages(o);return{date:n,direction:i==null?void 0:i.direction,descriptions:r,isAllNFT:s,images:a,status:(p=e.metadata)==null?void 0:p.status,transfers:o,type:(g=e.metadata)==null?void 0:g.operationType}}};Hn.styles=Z5;bi([ee()],Hn.prototype,"address",void 0);bi([ee()],Hn.prototype,"transactions",void 0);bi([ee()],Hn.prototype,"transactionsByYear",void 0);bi([ee()],Hn.prototype,"loading",void 0);bi([ee()],Hn.prototype,"empty",void 0);bi([ee()],Hn.prototype,"next",void 0);Hn=bi([z("w3m-transactions-view")],Hn);var q5=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const K5=[{images:["network","layers","system"],title:"The system’s nuts and bolts",text:"A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."},{images:["noun","defiAlt","dao"],title:"Designed for different uses",text:"Each network is designed differently, and may therefore suit certain apps and experiences."}];let ff=class extends H{render(){return $`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${K5}></w3m-help-widget>
        <wui-button
          variant="fill"
          size="sm"
          @click=${()=>{le.openHref("https://ethereum.org/en/developers/docs/networks/","_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};ff=q5([z("w3m-what-is-a-network-view")],ff);var Y5=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const J5=[{images:["login","profile","lock"],title:"One login for all of web3",text:"Log in to any app by connecting your wallet. Say goodbye to countless passwords!"},{images:["defi","nft","eth"],title:"A home for your digital assets",text:"A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."},{images:["browser","noun","dao"],title:"Your gateway to a new web",text:"With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."}];let hf=class extends H{render(){return $`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${J5}></w3m-help-widget>
        <wui-button variant="fill" size="sm" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `}onGetWallet(){we.sendEvent({type:"track",event:"CLICK_GET_WALLET"}),oe.push("GetWallet")}};hf=Y5([z("w3m-what-is-a-wallet-view")],hf);const X5=q`
  wui-loading-spinner {
    margin: 9px auto;
  }
`,re={SECURE_SITE_SDK:"https://secure.web3modal.com/sdk",APP_EVENT_KEY:"@w3m-app/",FRAME_EVENT_KEY:"@w3m-frame/",RPC_METHOD_KEY:"RPC_",STORAGE_KEY:"@w3m-storage/",SESSION_TOKEN_KEY:"SESSION_TOKEN_KEY",EMAIL_LOGIN_USED_KEY:"EMAIL_LOGIN_USED_KEY",LAST_USED_CHAIN_KEY:"LAST_USED_CHAIN_KEY",LAST_EMAIL_LOGIN_TIME:"LAST_EMAIL_LOGIN_TIME",EMAIL:"EMAIL",APP_SWITCH_NETWORK:"@w3m-app/SWITCH_NETWORK",APP_CONNECT_EMAIL:"@w3m-app/CONNECT_EMAIL",APP_CONNECT_DEVICE:"@w3m-app/CONNECT_DEVICE",APP_CONNECT_OTP:"@w3m-app/CONNECT_OTP",APP_GET_USER:"@w3m-app/GET_USER",APP_SIGN_OUT:"@w3m-app/SIGN_OUT",APP_IS_CONNECTED:"@w3m-app/IS_CONNECTED",APP_GET_CHAIN_ID:"@w3m-app/GET_CHAIN_ID",APP_RPC_REQUEST:"@w3m-app/RPC_REQUEST",APP_UPDATE_EMAIL:"@w3m-app/UPDATE_EMAIL",APP_AWAIT_UPDATE_EMAIL:"@w3m-app/AWAIT_UPDATE_EMAIL",APP_SYNC_THEME:"@w3m-app/SYNC_THEME",APP_SYNC_DAPP_DATA:"@w3m-app/SYNC_DAPP_DATA",FRAME_SWITCH_NETWORK_ERROR:"@w3m-frame/SWITCH_NETWORK_ERROR",FRAME_SWITCH_NETWORK_SUCCESS:"@w3m-frame/SWITCH_NETWORK_SUCCESS",FRAME_CONNECT_EMAIL_ERROR:"@w3m-frame/CONNECT_EMAIL_ERROR",FRAME_CONNECT_EMAIL_SUCCESS:"@w3m-frame/CONNECT_EMAIL_SUCCESS",FRAME_CONNECT_DEVICE_ERROR:"@w3m-frame/CONNECT_DEVICE_ERROR",FRAME_CONNECT_DEVICE_SUCCESS:"@w3m-frame/CONNECT_DEVICE_SUCCESS",FRAME_CONNECT_OTP_SUCCESS:"@w3m-frame/CONNECT_OTP_SUCCESS",FRAME_CONNECT_OTP_ERROR:"@w3m-frame/CONNECT_OTP_ERROR",FRAME_GET_USER_SUCCESS:"@w3m-frame/GET_USER_SUCCESS",FRAME_GET_USER_ERROR:"@w3m-frame/GET_USER_ERROR",FRAME_SIGN_OUT_SUCCESS:"@w3m-frame/SIGN_OUT_SUCCESS",FRAME_SIGN_OUT_ERROR:"@w3m-frame/SIGN_OUT_ERROR",FRAME_IS_CONNECTED_SUCCESS:"@w3m-frame/IS_CONNECTED_SUCCESS",FRAME_IS_CONNECTED_ERROR:"@w3m-frame/IS_CONNECTED_ERROR",FRAME_GET_CHAIN_ID_SUCCESS:"@w3m-frame/GET_CHAIN_ID_SUCCESS",FRAME_GET_CHAIN_ID_ERROR:"@w3m-frame/GET_CHAIN_ID_ERROR",FRAME_RPC_REQUEST_SUCCESS:"@w3m-frame/RPC_REQUEST_SUCCESS",FRAME_RPC_REQUEST_ERROR:"@w3m-frame/RPC_REQUEST_ERROR",FRAME_SESSION_UPDATE:"@w3m-frame/SESSION_UPDATE",FRAME_UPDATE_EMAIL_SUCCESS:"@w3m-frame/UPDATE_EMAIL_SUCCESS",FRAME_UPDATE_EMAIL_ERROR:"@w3m-frame/UPDATE_EMAIL_ERROR",FRAME_AWAIT_UPDATE_EMAIL_SUCCESS:"@w3m-frame/AWAIT_UPDATE_EMAIL_SUCCESS",FRAME_AWAIT_UPDATE_EMAIL_ERROR:"@w3m-frame/AWAIT_UPDATE_EMAIL_ERROR",FRAME_SYNC_THEME_SUCCESS:"@w3m-frame/SYNC_THEME_SUCCESS",FRAME_SYNC_THEME_ERROR:"@w3m-frame/SYNC_THEME_ERROR",FRAME_SYNC_DAPP_DATA_SUCCESS:"@w3m-frame/SYNC_DAPP_DATA_SUCCESS",FRAME_SYNC_DAPP_DATA_ERROR:"@w3m-frame/SYNC_DAPP_DATA_ERROR"},Q5={SAFE_RPC_METHODS:["eth_blockNumber","eth_estimateGas","eth_getTransactionByHash"],GET_CHAIN_ID:"eth_chainId"};var Me;(function(t){t.assertEqual=o=>o;function e(o){}t.assertIs=e;function n(o){throw new Error}t.assertNever=n,t.arrayToEnum=o=>{const i={};for(const s of o)i[s]=s;return i},t.getValidEnumValues=o=>{const i=t.objectKeys(o).filter(a=>typeof o[o[a]]!="number"),s={};for(const a of i)s[a]=o[a];return t.objectValues(s)},t.objectValues=o=>t.objectKeys(o).map(function(i){return o[i]}),t.objectKeys=typeof Object.keys=="function"?o=>Object.keys(o):o=>{const i=[];for(const s in o)Object.prototype.hasOwnProperty.call(o,s)&&i.push(s);return i},t.find=(o,i)=>{for(const s of o)if(i(s))return s},t.isInteger=typeof Number.isInteger=="function"?o=>Number.isInteger(o):o=>typeof o=="number"&&isFinite(o)&&Math.floor(o)===o;function r(o,i=" | "){return o.map(s=>typeof s=="string"?`'${s}'`:s).join(i)}t.joinValues=r,t.jsonStringifyReplacer=(o,i)=>typeof i=="bigint"?i.toString():i})(Me||(Me={}));var Eu;(function(t){t.mergeShapes=(e,n)=>({...e,...n})})(Eu||(Eu={}));const J=Me.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),nr=t=>{switch(typeof t){case"undefined":return J.undefined;case"string":return J.string;case"number":return isNaN(t)?J.nan:J.number;case"boolean":return J.boolean;case"function":return J.function;case"bigint":return J.bigint;case"symbol":return J.symbol;case"object":return Array.isArray(t)?J.array:t===null?J.null:t.then&&typeof t.then=="function"&&t.catch&&typeof t.catch=="function"?J.promise:typeof Map<"u"&&t instanceof Map?J.map:typeof Set<"u"&&t instanceof Set?J.set:typeof Date<"u"&&t instanceof Date?J.date:J.object;default:return J.unknown}},V=Me.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]),e6=t=>JSON.stringify(t,null,2).replace(/"([^"]+)":/g,"$1:");class nn extends Error{constructor(e){super(),this.issues=[],this.addIssue=r=>{this.issues=[...this.issues,r]},this.addIssues=(r=[])=>{this.issues=[...this.issues,...r]};const n=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,n):this.__proto__=n,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){const n=e||function(i){return i.message},r={_errors:[]},o=i=>{for(const s of i.issues)if(s.code==="invalid_union")s.unionErrors.map(o);else if(s.code==="invalid_return_type")o(s.returnTypeError);else if(s.code==="invalid_arguments")o(s.argumentsError);else if(s.path.length===0)r._errors.push(n(s));else{let a=r,c=0;for(;c<s.path.length;){const l=s.path[c];c===s.path.length-1?(a[l]=a[l]||{_errors:[]},a[l]._errors.push(n(s))):a[l]=a[l]||{_errors:[]},a=a[l],c++}}};return o(this),r}toString(){return this.message}get message(){return JSON.stringify(this.issues,Me.jsonStringifyReplacer,2)}get isEmpty(){return this.issues.length===0}flatten(e=n=>n.message){const n={},r=[];for(const o of this.issues)o.path.length>0?(n[o.path[0]]=n[o.path[0]]||[],n[o.path[0]].push(e(o))):r.push(e(o));return{formErrors:r,fieldErrors:n}}get formErrors(){return this.flatten()}}nn.create=t=>new nn(t);const ms=(t,e)=>{let n;switch(t.code){case V.invalid_type:t.received===J.undefined?n="Required":n=`Expected ${t.expected}, received ${t.received}`;break;case V.invalid_literal:n=`Invalid literal value, expected ${JSON.stringify(t.expected,Me.jsonStringifyReplacer)}`;break;case V.unrecognized_keys:n=`Unrecognized key(s) in object: ${Me.joinValues(t.keys,", ")}`;break;case V.invalid_union:n="Invalid input";break;case V.invalid_union_discriminator:n=`Invalid discriminator value. Expected ${Me.joinValues(t.options)}`;break;case V.invalid_enum_value:n=`Invalid enum value. Expected ${Me.joinValues(t.options)}, received '${t.received}'`;break;case V.invalid_arguments:n="Invalid function arguments";break;case V.invalid_return_type:n="Invalid function return type";break;case V.invalid_date:n="Invalid date";break;case V.invalid_string:typeof t.validation=="object"?"includes"in t.validation?(n=`Invalid input: must include "${t.validation.includes}"`,typeof t.validation.position=="number"&&(n=`${n} at one or more positions greater than or equal to ${t.validation.position}`)):"startsWith"in t.validation?n=`Invalid input: must start with "${t.validation.startsWith}"`:"endsWith"in t.validation?n=`Invalid input: must end with "${t.validation.endsWith}"`:Me.assertNever(t.validation):t.validation!=="regex"?n=`Invalid ${t.validation}`:n="Invalid";break;case V.too_small:t.type==="array"?n=`Array must contain ${t.exact?"exactly":t.inclusive?"at least":"more than"} ${t.minimum} element(s)`:t.type==="string"?n=`String must contain ${t.exact?"exactly":t.inclusive?"at least":"over"} ${t.minimum} character(s)`:t.type==="number"?n=`Number must be ${t.exact?"exactly equal to ":t.inclusive?"greater than or equal to ":"greater than "}${t.minimum}`:t.type==="date"?n=`Date must be ${t.exact?"exactly equal to ":t.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(t.minimum))}`:n="Invalid input";break;case V.too_big:t.type==="array"?n=`Array must contain ${t.exact?"exactly":t.inclusive?"at most":"less than"} ${t.maximum} element(s)`:t.type==="string"?n=`String must contain ${t.exact?"exactly":t.inclusive?"at most":"under"} ${t.maximum} character(s)`:t.type==="number"?n=`Number must be ${t.exact?"exactly":t.inclusive?"less than or equal to":"less than"} ${t.maximum}`:t.type==="bigint"?n=`BigInt must be ${t.exact?"exactly":t.inclusive?"less than or equal to":"less than"} ${t.maximum}`:t.type==="date"?n=`Date must be ${t.exact?"exactly":t.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(t.maximum))}`:n="Invalid input";break;case V.custom:n="Invalid input";break;case V.invalid_intersection_types:n="Intersection results could not be merged";break;case V.not_multiple_of:n=`Number must be a multiple of ${t.multipleOf}`;break;case V.not_finite:n="Number must be finite";break;default:n=e.defaultError,Me.assertNever(t)}return{message:n}};let u1=ms;function t6(t){u1=t}function Va(){return u1}const Za=t=>{const{data:e,path:n,errorMaps:r,issueData:o}=t,i=[...n,...o.path||[]],s={...o,path:i};let a="";const c=r.filter(l=>!!l).slice().reverse();for(const l of c)a=l(s,{data:e,defaultError:a}).message;return{...o,path:i,message:o.message||a}},n6=[];function te(t,e){const n=Za({issueData:e,data:t.data,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,Va(),ms].filter(r=>!!r)});t.common.issues.push(n)}class yt{constructor(){this.value="valid"}dirty(){this.value==="valid"&&(this.value="dirty")}abort(){this.value!=="aborted"&&(this.value="aborted")}static mergeArray(e,n){const r=[];for(const o of n){if(o.status==="aborted")return be;o.status==="dirty"&&e.dirty(),r.push(o.value)}return{status:e.value,value:r}}static async mergeObjectAsync(e,n){const r=[];for(const o of n)r.push({key:await o.key,value:await o.value});return yt.mergeObjectSync(e,r)}static mergeObjectSync(e,n){const r={};for(const o of n){const{key:i,value:s}=o;if(i.status==="aborted"||s.status==="aborted")return be;i.status==="dirty"&&e.dirty(),s.status==="dirty"&&e.dirty(),i.value!=="__proto__"&&(typeof s.value<"u"||o.alwaysSet)&&(r[i.value]=s.value)}return{status:e.value,value:r}}}const be=Object.freeze({status:"aborted"}),d1=t=>({status:"dirty",value:t}),St=t=>({status:"valid",value:t}),_u=t=>t.status==="aborted",Cu=t=>t.status==="dirty",ws=t=>t.status==="valid",Ga=t=>typeof Promise<"u"&&t instanceof Promise;var ue;(function(t){t.errToObj=e=>typeof e=="string"?{message:e}:e||{},t.toString=e=>typeof e=="string"?e:e==null?void 0:e.message})(ue||(ue={}));class $n{constructor(e,n,r,o){this._cachedPath=[],this.parent=e,this.data=n,this._path=r,this._key=o}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}}const pf=(t,e)=>{if(ws(e))return{success:!0,data:e.value};if(!t.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;const n=new nn(t.common.issues);return this._error=n,this._error}}};function Ee(t){if(!t)return{};const{errorMap:e,invalid_type_error:n,required_error:r,description:o}=t;if(e&&(n||r))throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);return e?{errorMap:e,description:o}:{errorMap:(s,a)=>s.code!=="invalid_type"?{message:a.defaultError}:typeof a.data>"u"?{message:r??a.defaultError}:{message:n??a.defaultError},description:o}}class Ie{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return nr(e.data)}_getOrReturnCtx(e,n){return n||{common:e.parent.common,data:e.data,parsedType:nr(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new yt,ctx:{common:e.parent.common,data:e.data,parsedType:nr(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){const n=this._parse(e);if(Ga(n))throw new Error("Synchronous parse encountered promise.");return n}_parseAsync(e){const n=this._parse(e);return Promise.resolve(n)}parse(e,n){const r=this.safeParse(e,n);if(r.success)return r.data;throw r.error}safeParse(e,n){var r;const o={common:{issues:[],async:(r=n==null?void 0:n.async)!==null&&r!==void 0?r:!1,contextualErrorMap:n==null?void 0:n.errorMap},path:(n==null?void 0:n.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:nr(e)},i=this._parseSync({data:e,path:o.path,parent:o});return pf(o,i)}async parseAsync(e,n){const r=await this.safeParseAsync(e,n);if(r.success)return r.data;throw r.error}async safeParseAsync(e,n){const r={common:{issues:[],contextualErrorMap:n==null?void 0:n.errorMap,async:!0},path:(n==null?void 0:n.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:nr(e)},o=this._parse({data:e,path:r.path,parent:r}),i=await(Ga(o)?o:Promise.resolve(o));return pf(r,i)}refine(e,n){const r=o=>typeof n=="string"||typeof n>"u"?{message:n}:typeof n=="function"?n(o):n;return this._refinement((o,i)=>{const s=e(o),a=()=>i.addIssue({code:V.custom,...r(o)});return typeof Promise<"u"&&s instanceof Promise?s.then(c=>c?!0:(a(),!1)):s?!0:(a(),!1)})}refinement(e,n){return this._refinement((r,o)=>e(r)?!0:(o.addIssue(typeof n=="function"?n(r,o):n),!1))}_refinement(e){return new fn({schema:this,typeName:fe.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return jn.create(this,this._def)}nullable(){return li.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return rn.create(this,this._def)}promise(){return to.create(this,this._def)}or(e){return xs.create([this,e],this._def)}and(e){return Es.create(this,e,this._def)}transform(e){return new fn({...Ee(this._def),schema:this,typeName:fe.ZodEffects,effect:{type:"transform",transform:e}})}default(e){const n=typeof e=="function"?e:()=>e;return new Ts({...Ee(this._def),innerType:this,defaultValue:n,typeName:fe.ZodDefault})}brand(){return new h1({typeName:fe.ZodBranded,type:this,...Ee(this._def)})}catch(e){const n=typeof e=="function"?e:()=>e;return new Ja({...Ee(this._def),innerType:this,catchValue:n,typeName:fe.ZodCatch})}describe(e){const n=this.constructor;return new n({...this._def,description:e})}pipe(e){return Ks.create(this,e)}readonly(){return Qa.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}}const r6=/^c[^\s-]{8,}$/i,i6=/^[a-z][a-z0-9]*$/,o6=/^[0-9A-HJKMNP-TV-Z]{26}$/,s6=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,a6=/^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,c6="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";let kl;const l6=/^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,u6=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,d6=t=>t.precision?t.offset?new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`):new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}Z$`):t.precision===0?t.offset?new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$"):new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$"):t.offset?new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$"):new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");function f6(t,e){return!!((e==="v4"||!e)&&l6.test(t)||(e==="v6"||!e)&&u6.test(t))}class en extends Ie{_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==J.string){const i=this._getOrReturnCtx(e);return te(i,{code:V.invalid_type,expected:J.string,received:i.parsedType}),be}const r=new yt;let o;for(const i of this._def.checks)if(i.kind==="min")e.data.length<i.value&&(o=this._getOrReturnCtx(e,o),te(o,{code:V.too_small,minimum:i.value,type:"string",inclusive:!0,exact:!1,message:i.message}),r.dirty());else if(i.kind==="max")e.data.length>i.value&&(o=this._getOrReturnCtx(e,o),te(o,{code:V.too_big,maximum:i.value,type:"string",inclusive:!0,exact:!1,message:i.message}),r.dirty());else if(i.kind==="length"){const s=e.data.length>i.value,a=e.data.length<i.value;(s||a)&&(o=this._getOrReturnCtx(e,o),s?te(o,{code:V.too_big,maximum:i.value,type:"string",inclusive:!0,exact:!0,message:i.message}):a&&te(o,{code:V.too_small,minimum:i.value,type:"string",inclusive:!0,exact:!0,message:i.message}),r.dirty())}else if(i.kind==="email")a6.test(e.data)||(o=this._getOrReturnCtx(e,o),te(o,{validation:"email",code:V.invalid_string,message:i.message}),r.dirty());else if(i.kind==="emoji")kl||(kl=new RegExp(c6,"u")),kl.test(e.data)||(o=this._getOrReturnCtx(e,o),te(o,{validation:"emoji",code:V.invalid_string,message:i.message}),r.dirty());else if(i.kind==="uuid")s6.test(e.data)||(o=this._getOrReturnCtx(e,o),te(o,{validation:"uuid",code:V.invalid_string,message:i.message}),r.dirty());else if(i.kind==="cuid")r6.test(e.data)||(o=this._getOrReturnCtx(e,o),te(o,{validation:"cuid",code:V.invalid_string,message:i.message}),r.dirty());else if(i.kind==="cuid2")i6.test(e.data)||(o=this._getOrReturnCtx(e,o),te(o,{validation:"cuid2",code:V.invalid_string,message:i.message}),r.dirty());else if(i.kind==="ulid")o6.test(e.data)||(o=this._getOrReturnCtx(e,o),te(o,{validation:"ulid",code:V.invalid_string,message:i.message}),r.dirty());else if(i.kind==="url")try{new URL(e.data)}catch{o=this._getOrReturnCtx(e,o),te(o,{validation:"url",code:V.invalid_string,message:i.message}),r.dirty()}else i.kind==="regex"?(i.regex.lastIndex=0,i.regex.test(e.data)||(o=this._getOrReturnCtx(e,o),te(o,{validation:"regex",code:V.invalid_string,message:i.message}),r.dirty())):i.kind==="trim"?e.data=e.data.trim():i.kind==="includes"?e.data.includes(i.value,i.position)||(o=this._getOrReturnCtx(e,o),te(o,{code:V.invalid_string,validation:{includes:i.value,position:i.position},message:i.message}),r.dirty()):i.kind==="toLowerCase"?e.data=e.data.toLowerCase():i.kind==="toUpperCase"?e.data=e.data.toUpperCase():i.kind==="startsWith"?e.data.startsWith(i.value)||(o=this._getOrReturnCtx(e,o),te(o,{code:V.invalid_string,validation:{startsWith:i.value},message:i.message}),r.dirty()):i.kind==="endsWith"?e.data.endsWith(i.value)||(o=this._getOrReturnCtx(e,o),te(o,{code:V.invalid_string,validation:{endsWith:i.value},message:i.message}),r.dirty()):i.kind==="datetime"?d6(i).test(e.data)||(o=this._getOrReturnCtx(e,o),te(o,{code:V.invalid_string,validation:"datetime",message:i.message}),r.dirty()):i.kind==="ip"?f6(e.data,i.version)||(o=this._getOrReturnCtx(e,o),te(o,{validation:"ip",code:V.invalid_string,message:i.message}),r.dirty()):Me.assertNever(i);return{status:r.value,value:e.data}}_regex(e,n,r){return this.refinement(o=>e.test(o),{validation:n,code:V.invalid_string,...ue.errToObj(r)})}_addCheck(e){return new en({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...ue.errToObj(e)})}url(e){return this._addCheck({kind:"url",...ue.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...ue.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...ue.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...ue.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...ue.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...ue.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...ue.errToObj(e)})}datetime(e){var n;return typeof e=="string"?this._addCheck({kind:"datetime",precision:null,offset:!1,message:e}):this._addCheck({kind:"datetime",precision:typeof(e==null?void 0:e.precision)>"u"?null:e==null?void 0:e.precision,offset:(n=e==null?void 0:e.offset)!==null&&n!==void 0?n:!1,...ue.errToObj(e==null?void 0:e.message)})}regex(e,n){return this._addCheck({kind:"regex",regex:e,...ue.errToObj(n)})}includes(e,n){return this._addCheck({kind:"includes",value:e,position:n==null?void 0:n.position,...ue.errToObj(n==null?void 0:n.message)})}startsWith(e,n){return this._addCheck({kind:"startsWith",value:e,...ue.errToObj(n)})}endsWith(e,n){return this._addCheck({kind:"endsWith",value:e,...ue.errToObj(n)})}min(e,n){return this._addCheck({kind:"min",value:e,...ue.errToObj(n)})}max(e,n){return this._addCheck({kind:"max",value:e,...ue.errToObj(n)})}length(e,n){return this._addCheck({kind:"length",value:e,...ue.errToObj(n)})}nonempty(e){return this.min(1,ue.errToObj(e))}trim(){return new en({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new en({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new en({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>e.kind==="datetime")}get isEmail(){return!!this._def.checks.find(e=>e.kind==="email")}get isURL(){return!!this._def.checks.find(e=>e.kind==="url")}get isEmoji(){return!!this._def.checks.find(e=>e.kind==="emoji")}get isUUID(){return!!this._def.checks.find(e=>e.kind==="uuid")}get isCUID(){return!!this._def.checks.find(e=>e.kind==="cuid")}get isCUID2(){return!!this._def.checks.find(e=>e.kind==="cuid2")}get isULID(){return!!this._def.checks.find(e=>e.kind==="ulid")}get isIP(){return!!this._def.checks.find(e=>e.kind==="ip")}get minLength(){let e=null;for(const n of this._def.checks)n.kind==="min"&&(e===null||n.value>e)&&(e=n.value);return e}get maxLength(){let e=null;for(const n of this._def.checks)n.kind==="max"&&(e===null||n.value<e)&&(e=n.value);return e}}en.create=t=>{var e;return new en({checks:[],typeName:fe.ZodString,coerce:(e=t==null?void 0:t.coerce)!==null&&e!==void 0?e:!1,...Ee(t)})};function h6(t,e){const n=(t.toString().split(".")[1]||"").length,r=(e.toString().split(".")[1]||"").length,o=n>r?n:r,i=parseInt(t.toFixed(o).replace(".","")),s=parseInt(e.toFixed(o).replace(".",""));return i%s/Math.pow(10,o)}class wr extends Ie{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==J.number){const i=this._getOrReturnCtx(e);return te(i,{code:V.invalid_type,expected:J.number,received:i.parsedType}),be}let r;const o=new yt;for(const i of this._def.checks)i.kind==="int"?Me.isInteger(e.data)||(r=this._getOrReturnCtx(e,r),te(r,{code:V.invalid_type,expected:"integer",received:"float",message:i.message}),o.dirty()):i.kind==="min"?(i.inclusive?e.data<i.value:e.data<=i.value)&&(r=this._getOrReturnCtx(e,r),te(r,{code:V.too_small,minimum:i.value,type:"number",inclusive:i.inclusive,exact:!1,message:i.message}),o.dirty()):i.kind==="max"?(i.inclusive?e.data>i.value:e.data>=i.value)&&(r=this._getOrReturnCtx(e,r),te(r,{code:V.too_big,maximum:i.value,type:"number",inclusive:i.inclusive,exact:!1,message:i.message}),o.dirty()):i.kind==="multipleOf"?h6(e.data,i.value)!==0&&(r=this._getOrReturnCtx(e,r),te(r,{code:V.not_multiple_of,multipleOf:i.value,message:i.message}),o.dirty()):i.kind==="finite"?Number.isFinite(e.data)||(r=this._getOrReturnCtx(e,r),te(r,{code:V.not_finite,message:i.message}),o.dirty()):Me.assertNever(i);return{status:o.value,value:e.data}}gte(e,n){return this.setLimit("min",e,!0,ue.toString(n))}gt(e,n){return this.setLimit("min",e,!1,ue.toString(n))}lte(e,n){return this.setLimit("max",e,!0,ue.toString(n))}lt(e,n){return this.setLimit("max",e,!1,ue.toString(n))}setLimit(e,n,r,o){return new wr({...this._def,checks:[...this._def.checks,{kind:e,value:n,inclusive:r,message:ue.toString(o)}]})}_addCheck(e){return new wr({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:ue.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:ue.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:ue.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:ue.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:ue.toString(e)})}multipleOf(e,n){return this._addCheck({kind:"multipleOf",value:e,message:ue.toString(n)})}finite(e){return this._addCheck({kind:"finite",message:ue.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:ue.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:ue.toString(e)})}get minValue(){let e=null;for(const n of this._def.checks)n.kind==="min"&&(e===null||n.value>e)&&(e=n.value);return e}get maxValue(){let e=null;for(const n of this._def.checks)n.kind==="max"&&(e===null||n.value<e)&&(e=n.value);return e}get isInt(){return!!this._def.checks.find(e=>e.kind==="int"||e.kind==="multipleOf"&&Me.isInteger(e.value))}get isFinite(){let e=null,n=null;for(const r of this._def.checks){if(r.kind==="finite"||r.kind==="int"||r.kind==="multipleOf")return!0;r.kind==="min"?(n===null||r.value>n)&&(n=r.value):r.kind==="max"&&(e===null||r.value<e)&&(e=r.value)}return Number.isFinite(n)&&Number.isFinite(e)}}wr.create=t=>new wr({checks:[],typeName:fe.ZodNumber,coerce:(t==null?void 0:t.coerce)||!1,...Ee(t)});class br extends Ie{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce&&(e.data=BigInt(e.data)),this._getType(e)!==J.bigint){const i=this._getOrReturnCtx(e);return te(i,{code:V.invalid_type,expected:J.bigint,received:i.parsedType}),be}let r;const o=new yt;for(const i of this._def.checks)i.kind==="min"?(i.inclusive?e.data<i.value:e.data<=i.value)&&(r=this._getOrReturnCtx(e,r),te(r,{code:V.too_small,type:"bigint",minimum:i.value,inclusive:i.inclusive,message:i.message}),o.dirty()):i.kind==="max"?(i.inclusive?e.data>i.value:e.data>=i.value)&&(r=this._getOrReturnCtx(e,r),te(r,{code:V.too_big,type:"bigint",maximum:i.value,inclusive:i.inclusive,message:i.message}),o.dirty()):i.kind==="multipleOf"?e.data%i.value!==BigInt(0)&&(r=this._getOrReturnCtx(e,r),te(r,{code:V.not_multiple_of,multipleOf:i.value,message:i.message}),o.dirty()):Me.assertNever(i);return{status:o.value,value:e.data}}gte(e,n){return this.setLimit("min",e,!0,ue.toString(n))}gt(e,n){return this.setLimit("min",e,!1,ue.toString(n))}lte(e,n){return this.setLimit("max",e,!0,ue.toString(n))}lt(e,n){return this.setLimit("max",e,!1,ue.toString(n))}setLimit(e,n,r,o){return new br({...this._def,checks:[...this._def.checks,{kind:e,value:n,inclusive:r,message:ue.toString(o)}]})}_addCheck(e){return new br({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:ue.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:ue.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:ue.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:ue.toString(e)})}multipleOf(e,n){return this._addCheck({kind:"multipleOf",value:e,message:ue.toString(n)})}get minValue(){let e=null;for(const n of this._def.checks)n.kind==="min"&&(e===null||n.value>e)&&(e=n.value);return e}get maxValue(){let e=null;for(const n of this._def.checks)n.kind==="max"&&(e===null||n.value<e)&&(e=n.value);return e}}br.create=t=>{var e;return new br({checks:[],typeName:fe.ZodBigInt,coerce:(e=t==null?void 0:t.coerce)!==null&&e!==void 0?e:!1,...Ee(t)})};class bs extends Ie{_parse(e){if(this._def.coerce&&(e.data=!!e.data),this._getType(e)!==J.boolean){const r=this._getOrReturnCtx(e);return te(r,{code:V.invalid_type,expected:J.boolean,received:r.parsedType}),be}return St(e.data)}}bs.create=t=>new bs({typeName:fe.ZodBoolean,coerce:(t==null?void 0:t.coerce)||!1,...Ee(t)});class ai extends Ie{_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==J.date){const i=this._getOrReturnCtx(e);return te(i,{code:V.invalid_type,expected:J.date,received:i.parsedType}),be}if(isNaN(e.data.getTime())){const i=this._getOrReturnCtx(e);return te(i,{code:V.invalid_date}),be}const r=new yt;let o;for(const i of this._def.checks)i.kind==="min"?e.data.getTime()<i.value&&(o=this._getOrReturnCtx(e,o),te(o,{code:V.too_small,message:i.message,inclusive:!0,exact:!1,minimum:i.value,type:"date"}),r.dirty()):i.kind==="max"?e.data.getTime()>i.value&&(o=this._getOrReturnCtx(e,o),te(o,{code:V.too_big,message:i.message,inclusive:!0,exact:!1,maximum:i.value,type:"date"}),r.dirty()):Me.assertNever(i);return{status:r.value,value:new Date(e.data.getTime())}}_addCheck(e){return new ai({...this._def,checks:[...this._def.checks,e]})}min(e,n){return this._addCheck({kind:"min",value:e.getTime(),message:ue.toString(n)})}max(e,n){return this._addCheck({kind:"max",value:e.getTime(),message:ue.toString(n)})}get minDate(){let e=null;for(const n of this._def.checks)n.kind==="min"&&(e===null||n.value>e)&&(e=n.value);return e!=null?new Date(e):null}get maxDate(){let e=null;for(const n of this._def.checks)n.kind==="max"&&(e===null||n.value<e)&&(e=n.value);return e!=null?new Date(e):null}}ai.create=t=>new ai({checks:[],coerce:(t==null?void 0:t.coerce)||!1,typeName:fe.ZodDate,...Ee(t)});class qa extends Ie{_parse(e){if(this._getType(e)!==J.symbol){const r=this._getOrReturnCtx(e);return te(r,{code:V.invalid_type,expected:J.symbol,received:r.parsedType}),be}return St(e.data)}}qa.create=t=>new qa({typeName:fe.ZodSymbol,...Ee(t)});class ys extends Ie{_parse(e){if(this._getType(e)!==J.undefined){const r=this._getOrReturnCtx(e);return te(r,{code:V.invalid_type,expected:J.undefined,received:r.parsedType}),be}return St(e.data)}}ys.create=t=>new ys({typeName:fe.ZodUndefined,...Ee(t)});class vs extends Ie{_parse(e){if(this._getType(e)!==J.null){const r=this._getOrReturnCtx(e);return te(r,{code:V.invalid_type,expected:J.null,received:r.parsedType}),be}return St(e.data)}}vs.create=t=>new vs({typeName:fe.ZodNull,...Ee(t)});class eo extends Ie{constructor(){super(...arguments),this._any=!0}_parse(e){return St(e.data)}}eo.create=t=>new eo({typeName:fe.ZodAny,...Ee(t)});class Fr extends Ie{constructor(){super(...arguments),this._unknown=!0}_parse(e){return St(e.data)}}Fr.create=t=>new Fr({typeName:fe.ZodUnknown,...Ee(t)});class Vn extends Ie{_parse(e){const n=this._getOrReturnCtx(e);return te(n,{code:V.invalid_type,expected:J.never,received:n.parsedType}),be}}Vn.create=t=>new Vn({typeName:fe.ZodNever,...Ee(t)});class Ka extends Ie{_parse(e){if(this._getType(e)!==J.undefined){const r=this._getOrReturnCtx(e);return te(r,{code:V.invalid_type,expected:J.void,received:r.parsedType}),be}return St(e.data)}}Ka.create=t=>new Ka({typeName:fe.ZodVoid,...Ee(t)});class rn extends Ie{_parse(e){const{ctx:n,status:r}=this._processInputParams(e),o=this._def;if(n.parsedType!==J.array)return te(n,{code:V.invalid_type,expected:J.array,received:n.parsedType}),be;if(o.exactLength!==null){const s=n.data.length>o.exactLength.value,a=n.data.length<o.exactLength.value;(s||a)&&(te(n,{code:s?V.too_big:V.too_small,minimum:a?o.exactLength.value:void 0,maximum:s?o.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:o.exactLength.message}),r.dirty())}if(o.minLength!==null&&n.data.length<o.minLength.value&&(te(n,{code:V.too_small,minimum:o.minLength.value,type:"array",inclusive:!0,exact:!1,message:o.minLength.message}),r.dirty()),o.maxLength!==null&&n.data.length>o.maxLength.value&&(te(n,{code:V.too_big,maximum:o.maxLength.value,type:"array",inclusive:!0,exact:!1,message:o.maxLength.message}),r.dirty()),n.common.async)return Promise.all([...n.data].map((s,a)=>o.type._parseAsync(new $n(n,s,n.path,a)))).then(s=>yt.mergeArray(r,s));const i=[...n.data].map((s,a)=>o.type._parseSync(new $n(n,s,n.path,a)));return yt.mergeArray(r,i)}get element(){return this._def.type}min(e,n){return new rn({...this._def,minLength:{value:e,message:ue.toString(n)}})}max(e,n){return new rn({...this._def,maxLength:{value:e,message:ue.toString(n)}})}length(e,n){return new rn({...this._def,exactLength:{value:e,message:ue.toString(n)}})}nonempty(e){return this.min(1,e)}}rn.create=(t,e)=>new rn({type:t,minLength:null,maxLength:null,exactLength:null,typeName:fe.ZodArray,...Ee(e)});function Ai(t){if(t instanceof qe){const e={};for(const n in t.shape){const r=t.shape[n];e[n]=jn.create(Ai(r))}return new qe({...t._def,shape:()=>e})}else return t instanceof rn?new rn({...t._def,type:Ai(t.element)}):t instanceof jn?jn.create(Ai(t.unwrap())):t instanceof li?li.create(Ai(t.unwrap())):t instanceof Dn?Dn.create(t.items.map(e=>Ai(e))):t}class qe extends Ie{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(this._cached!==null)return this._cached;const e=this._def.shape(),n=Me.objectKeys(e);return this._cached={shape:e,keys:n}}_parse(e){if(this._getType(e)!==J.object){const l=this._getOrReturnCtx(e);return te(l,{code:V.invalid_type,expected:J.object,received:l.parsedType}),be}const{status:r,ctx:o}=this._processInputParams(e),{shape:i,keys:s}=this._getCached(),a=[];if(!(this._def.catchall instanceof Vn&&this._def.unknownKeys==="strip"))for(const l in o.data)s.includes(l)||a.push(l);const c=[];for(const l of s){const u=i[l],p=o.data[l];c.push({key:{status:"valid",value:l},value:u._parse(new $n(o,p,o.path,l)),alwaysSet:l in o.data})}if(this._def.catchall instanceof Vn){const l=this._def.unknownKeys;if(l==="passthrough")for(const u of a)c.push({key:{status:"valid",value:u},value:{status:"valid",value:o.data[u]}});else if(l==="strict")a.length>0&&(te(o,{code:V.unrecognized_keys,keys:a}),r.dirty());else if(l!=="strip")throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{const l=this._def.catchall;for(const u of a){const p=o.data[u];c.push({key:{status:"valid",value:u},value:l._parse(new $n(o,p,o.path,u)),alwaysSet:u in o.data})}}return o.common.async?Promise.resolve().then(async()=>{const l=[];for(const u of c){const p=await u.key;l.push({key:p,value:await u.value,alwaysSet:u.alwaysSet})}return l}).then(l=>yt.mergeObjectSync(r,l)):yt.mergeObjectSync(r,c)}get shape(){return this._def.shape()}strict(e){return ue.errToObj,new qe({...this._def,unknownKeys:"strict",...e!==void 0?{errorMap:(n,r)=>{var o,i,s,a;const c=(s=(i=(o=this._def).errorMap)===null||i===void 0?void 0:i.call(o,n,r).message)!==null&&s!==void 0?s:r.defaultError;return n.code==="unrecognized_keys"?{message:(a=ue.errToObj(e).message)!==null&&a!==void 0?a:c}:{message:c}}}:{}})}strip(){return new qe({...this._def,unknownKeys:"strip"})}passthrough(){return new qe({...this._def,unknownKeys:"passthrough"})}extend(e){return new qe({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new qe({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:fe.ZodObject})}setKey(e,n){return this.augment({[e]:n})}catchall(e){return new qe({...this._def,catchall:e})}pick(e){const n={};return Me.objectKeys(e).forEach(r=>{e[r]&&this.shape[r]&&(n[r]=this.shape[r])}),new qe({...this._def,shape:()=>n})}omit(e){const n={};return Me.objectKeys(this.shape).forEach(r=>{e[r]||(n[r]=this.shape[r])}),new qe({...this._def,shape:()=>n})}deepPartial(){return Ai(this)}partial(e){const n={};return Me.objectKeys(this.shape).forEach(r=>{const o=this.shape[r];e&&!e[r]?n[r]=o:n[r]=o.optional()}),new qe({...this._def,shape:()=>n})}required(e){const n={};return Me.objectKeys(this.shape).forEach(r=>{if(e&&!e[r])n[r]=this.shape[r];else{let i=this.shape[r];for(;i instanceof jn;)i=i._def.innerType;n[r]=i}}),new qe({...this._def,shape:()=>n})}keyof(){return f1(Me.objectKeys(this.shape))}}qe.create=(t,e)=>new qe({shape:()=>t,unknownKeys:"strip",catchall:Vn.create(),typeName:fe.ZodObject,...Ee(e)});qe.strictCreate=(t,e)=>new qe({shape:()=>t,unknownKeys:"strict",catchall:Vn.create(),typeName:fe.ZodObject,...Ee(e)});qe.lazycreate=(t,e)=>new qe({shape:t,unknownKeys:"strip",catchall:Vn.create(),typeName:fe.ZodObject,...Ee(e)});class xs extends Ie{_parse(e){const{ctx:n}=this._processInputParams(e),r=this._def.options;function o(i){for(const a of i)if(a.result.status==="valid")return a.result;for(const a of i)if(a.result.status==="dirty")return n.common.issues.push(...a.ctx.common.issues),a.result;const s=i.map(a=>new nn(a.ctx.common.issues));return te(n,{code:V.invalid_union,unionErrors:s}),be}if(n.common.async)return Promise.all(r.map(async i=>{const s={...n,common:{...n.common,issues:[]},parent:null};return{result:await i._parseAsync({data:n.data,path:n.path,parent:s}),ctx:s}})).then(o);{let i;const s=[];for(const c of r){const l={...n,common:{...n.common,issues:[]},parent:null},u=c._parseSync({data:n.data,path:n.path,parent:l});if(u.status==="valid")return u;u.status==="dirty"&&!i&&(i={result:u,ctx:l}),l.common.issues.length&&s.push(l.common.issues)}if(i)return n.common.issues.push(...i.ctx.common.issues),i.result;const a=s.map(c=>new nn(c));return te(n,{code:V.invalid_union,unionErrors:a}),be}}get options(){return this._def.options}}xs.create=(t,e)=>new xs({options:t,typeName:fe.ZodUnion,...Ee(e)});const ba=t=>t instanceof Cs?ba(t.schema):t instanceof fn?ba(t.innerType()):t instanceof Ss?[t.value]:t instanceof yr?t.options:t instanceof As?Object.keys(t.enum):t instanceof Ts?ba(t._def.innerType):t instanceof ys?[void 0]:t instanceof vs?[null]:null;class Kc extends Ie{_parse(e){const{ctx:n}=this._processInputParams(e);if(n.parsedType!==J.object)return te(n,{code:V.invalid_type,expected:J.object,received:n.parsedType}),be;const r=this.discriminator,o=n.data[r],i=this.optionsMap.get(o);return i?n.common.async?i._parseAsync({data:n.data,path:n.path,parent:n}):i._parseSync({data:n.data,path:n.path,parent:n}):(te(n,{code:V.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[r]}),be)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,n,r){const o=new Map;for(const i of n){const s=ba(i.shape[e]);if(!s)throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(const a of s){if(o.has(a))throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);o.set(a,i)}}return new Kc({typeName:fe.ZodDiscriminatedUnion,discriminator:e,options:n,optionsMap:o,...Ee(r)})}}function Su(t,e){const n=nr(t),r=nr(e);if(t===e)return{valid:!0,data:t};if(n===J.object&&r===J.object){const o=Me.objectKeys(e),i=Me.objectKeys(t).filter(a=>o.indexOf(a)!==-1),s={...t,...e};for(const a of i){const c=Su(t[a],e[a]);if(!c.valid)return{valid:!1};s[a]=c.data}return{valid:!0,data:s}}else if(n===J.array&&r===J.array){if(t.length!==e.length)return{valid:!1};const o=[];for(let i=0;i<t.length;i++){const s=t[i],a=e[i],c=Su(s,a);if(!c.valid)return{valid:!1};o.push(c.data)}return{valid:!0,data:o}}else return n===J.date&&r===J.date&&+t==+e?{valid:!0,data:t}:{valid:!1}}class Es extends Ie{_parse(e){const{status:n,ctx:r}=this._processInputParams(e),o=(i,s)=>{if(_u(i)||_u(s))return be;const a=Su(i.value,s.value);return a.valid?((Cu(i)||Cu(s))&&n.dirty(),{status:n.value,value:a.data}):(te(r,{code:V.invalid_intersection_types}),be)};return r.common.async?Promise.all([this._def.left._parseAsync({data:r.data,path:r.path,parent:r}),this._def.right._parseAsync({data:r.data,path:r.path,parent:r})]).then(([i,s])=>o(i,s)):o(this._def.left._parseSync({data:r.data,path:r.path,parent:r}),this._def.right._parseSync({data:r.data,path:r.path,parent:r}))}}Es.create=(t,e,n)=>new Es({left:t,right:e,typeName:fe.ZodIntersection,...Ee(n)});class Dn extends Ie{_parse(e){const{status:n,ctx:r}=this._processInputParams(e);if(r.parsedType!==J.array)return te(r,{code:V.invalid_type,expected:J.array,received:r.parsedType}),be;if(r.data.length<this._def.items.length)return te(r,{code:V.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),be;!this._def.rest&&r.data.length>this._def.items.length&&(te(r,{code:V.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),n.dirty());const i=[...r.data].map((s,a)=>{const c=this._def.items[a]||this._def.rest;return c?c._parse(new $n(r,s,r.path,a)):null}).filter(s=>!!s);return r.common.async?Promise.all(i).then(s=>yt.mergeArray(n,s)):yt.mergeArray(n,i)}get items(){return this._def.items}rest(e){return new Dn({...this._def,rest:e})}}Dn.create=(t,e)=>{if(!Array.isArray(t))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new Dn({items:t,typeName:fe.ZodTuple,rest:null,...Ee(e)})};class _s extends Ie{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:n,ctx:r}=this._processInputParams(e);if(r.parsedType!==J.object)return te(r,{code:V.invalid_type,expected:J.object,received:r.parsedType}),be;const o=[],i=this._def.keyType,s=this._def.valueType;for(const a in r.data)o.push({key:i._parse(new $n(r,a,r.path,a)),value:s._parse(new $n(r,r.data[a],r.path,a))});return r.common.async?yt.mergeObjectAsync(n,o):yt.mergeObjectSync(n,o)}get element(){return this._def.valueType}static create(e,n,r){return n instanceof Ie?new _s({keyType:e,valueType:n,typeName:fe.ZodRecord,...Ee(r)}):new _s({keyType:en.create(),valueType:e,typeName:fe.ZodRecord,...Ee(n)})}}class Ya extends Ie{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:n,ctx:r}=this._processInputParams(e);if(r.parsedType!==J.map)return te(r,{code:V.invalid_type,expected:J.map,received:r.parsedType}),be;const o=this._def.keyType,i=this._def.valueType,s=[...r.data.entries()].map(([a,c],l)=>({key:o._parse(new $n(r,a,r.path,[l,"key"])),value:i._parse(new $n(r,c,r.path,[l,"value"]))}));if(r.common.async){const a=new Map;return Promise.resolve().then(async()=>{for(const c of s){const l=await c.key,u=await c.value;if(l.status==="aborted"||u.status==="aborted")return be;(l.status==="dirty"||u.status==="dirty")&&n.dirty(),a.set(l.value,u.value)}return{status:n.value,value:a}})}else{const a=new Map;for(const c of s){const l=c.key,u=c.value;if(l.status==="aborted"||u.status==="aborted")return be;(l.status==="dirty"||u.status==="dirty")&&n.dirty(),a.set(l.value,u.value)}return{status:n.value,value:a}}}}Ya.create=(t,e,n)=>new Ya({valueType:e,keyType:t,typeName:fe.ZodMap,...Ee(n)});class ci extends Ie{_parse(e){const{status:n,ctx:r}=this._processInputParams(e);if(r.parsedType!==J.set)return te(r,{code:V.invalid_type,expected:J.set,received:r.parsedType}),be;const o=this._def;o.minSize!==null&&r.data.size<o.minSize.value&&(te(r,{code:V.too_small,minimum:o.minSize.value,type:"set",inclusive:!0,exact:!1,message:o.minSize.message}),n.dirty()),o.maxSize!==null&&r.data.size>o.maxSize.value&&(te(r,{code:V.too_big,maximum:o.maxSize.value,type:"set",inclusive:!0,exact:!1,message:o.maxSize.message}),n.dirty());const i=this._def.valueType;function s(c){const l=new Set;for(const u of c){if(u.status==="aborted")return be;u.status==="dirty"&&n.dirty(),l.add(u.value)}return{status:n.value,value:l}}const a=[...r.data.values()].map((c,l)=>i._parse(new $n(r,c,r.path,l)));return r.common.async?Promise.all(a).then(c=>s(c)):s(a)}min(e,n){return new ci({...this._def,minSize:{value:e,message:ue.toString(n)}})}max(e,n){return new ci({...this._def,maxSize:{value:e,message:ue.toString(n)}})}size(e,n){return this.min(e,n).max(e,n)}nonempty(e){return this.min(1,e)}}ci.create=(t,e)=>new ci({valueType:t,minSize:null,maxSize:null,typeName:fe.ZodSet,...Ee(e)});class Ni extends Ie{constructor(){super(...arguments),this.validate=this.implement}_parse(e){const{ctx:n}=this._processInputParams(e);if(n.parsedType!==J.function)return te(n,{code:V.invalid_type,expected:J.function,received:n.parsedType}),be;function r(a,c){return Za({data:a,path:n.path,errorMaps:[n.common.contextualErrorMap,n.schemaErrorMap,Va(),ms].filter(l=>!!l),issueData:{code:V.invalid_arguments,argumentsError:c}})}function o(a,c){return Za({data:a,path:n.path,errorMaps:[n.common.contextualErrorMap,n.schemaErrorMap,Va(),ms].filter(l=>!!l),issueData:{code:V.invalid_return_type,returnTypeError:c}})}const i={errorMap:n.common.contextualErrorMap},s=n.data;if(this._def.returns instanceof to){const a=this;return St(async function(...c){const l=new nn([]),u=await a._def.args.parseAsync(c,i).catch(m=>{throw l.addIssue(r(c,m)),l}),p=await Reflect.apply(s,this,u);return await a._def.returns._def.type.parseAsync(p,i).catch(m=>{throw l.addIssue(o(p,m)),l})})}else{const a=this;return St(function(...c){const l=a._def.args.safeParse(c,i);if(!l.success)throw new nn([r(c,l.error)]);const u=Reflect.apply(s,this,l.data),p=a._def.returns.safeParse(u,i);if(!p.success)throw new nn([o(u,p.error)]);return p.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new Ni({...this._def,args:Dn.create(e).rest(Fr.create())})}returns(e){return new Ni({...this._def,returns:e})}implement(e){return this.parse(e)}strictImplement(e){return this.parse(e)}static create(e,n,r){return new Ni({args:e||Dn.create([]).rest(Fr.create()),returns:n||Fr.create(),typeName:fe.ZodFunction,...Ee(r)})}}class Cs extends Ie{get schema(){return this._def.getter()}_parse(e){const{ctx:n}=this._processInputParams(e);return this._def.getter()._parse({data:n.data,path:n.path,parent:n})}}Cs.create=(t,e)=>new Cs({getter:t,typeName:fe.ZodLazy,...Ee(e)});class Ss extends Ie{_parse(e){if(e.data!==this._def.value){const n=this._getOrReturnCtx(e);return te(n,{received:n.data,code:V.invalid_literal,expected:this._def.value}),be}return{status:"valid",value:e.data}}get value(){return this._def.value}}Ss.create=(t,e)=>new Ss({value:t,typeName:fe.ZodLiteral,...Ee(e)});function f1(t,e){return new yr({values:t,typeName:fe.ZodEnum,...Ee(e)})}class yr extends Ie{_parse(e){if(typeof e.data!="string"){const n=this._getOrReturnCtx(e),r=this._def.values;return te(n,{expected:Me.joinValues(r),received:n.parsedType,code:V.invalid_type}),be}if(this._def.values.indexOf(e.data)===-1){const n=this._getOrReturnCtx(e),r=this._def.values;return te(n,{received:n.data,code:V.invalid_enum_value,options:r}),be}return St(e.data)}get options(){return this._def.values}get enum(){const e={};for(const n of this._def.values)e[n]=n;return e}get Values(){const e={};for(const n of this._def.values)e[n]=n;return e}get Enum(){const e={};for(const n of this._def.values)e[n]=n;return e}extract(e){return yr.create(e)}exclude(e){return yr.create(this.options.filter(n=>!e.includes(n)))}}yr.create=f1;class As extends Ie{_parse(e){const n=Me.getValidEnumValues(this._def.values),r=this._getOrReturnCtx(e);if(r.parsedType!==J.string&&r.parsedType!==J.number){const o=Me.objectValues(n);return te(r,{expected:Me.joinValues(o),received:r.parsedType,code:V.invalid_type}),be}if(n.indexOf(e.data)===-1){const o=Me.objectValues(n);return te(r,{received:r.data,code:V.invalid_enum_value,options:o}),be}return St(e.data)}get enum(){return this._def.values}}As.create=(t,e)=>new As({values:t,typeName:fe.ZodNativeEnum,...Ee(e)});class to extends Ie{unwrap(){return this._def.type}_parse(e){const{ctx:n}=this._processInputParams(e);if(n.parsedType!==J.promise&&n.common.async===!1)return te(n,{code:V.invalid_type,expected:J.promise,received:n.parsedType}),be;const r=n.parsedType===J.promise?n.data:Promise.resolve(n.data);return St(r.then(o=>this._def.type.parseAsync(o,{path:n.path,errorMap:n.common.contextualErrorMap})))}}to.create=(t,e)=>new to({type:t,typeName:fe.ZodPromise,...Ee(e)});class fn extends Ie{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===fe.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){const{status:n,ctx:r}=this._processInputParams(e),o=this._def.effect||null,i={addIssue:s=>{te(r,s),s.fatal?n.abort():n.dirty()},get path(){return r.path}};if(i.addIssue=i.addIssue.bind(i),o.type==="preprocess"){const s=o.transform(r.data,i);return r.common.issues.length?{status:"dirty",value:r.data}:r.common.async?Promise.resolve(s).then(a=>this._def.schema._parseAsync({data:a,path:r.path,parent:r})):this._def.schema._parseSync({data:s,path:r.path,parent:r})}if(o.type==="refinement"){const s=a=>{const c=o.refinement(a,i);if(r.common.async)return Promise.resolve(c);if(c instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return a};if(r.common.async===!1){const a=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});return a.status==="aborted"?be:(a.status==="dirty"&&n.dirty(),s(a.value),{status:n.value,value:a.value})}else return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(a=>a.status==="aborted"?be:(a.status==="dirty"&&n.dirty(),s(a.value).then(()=>({status:n.value,value:a.value}))))}if(o.type==="transform")if(r.common.async===!1){const s=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});if(!ws(s))return s;const a=o.transform(s.value,i);if(a instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:n.value,value:a}}else return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(s=>ws(s)?Promise.resolve(o.transform(s.value,i)).then(a=>({status:n.value,value:a})):s);Me.assertNever(o)}}fn.create=(t,e,n)=>new fn({schema:t,typeName:fe.ZodEffects,effect:e,...Ee(n)});fn.createWithPreprocess=(t,e,n)=>new fn({schema:e,effect:{type:"preprocess",transform:t},typeName:fe.ZodEffects,...Ee(n)});class jn extends Ie{_parse(e){return this._getType(e)===J.undefined?St(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}jn.create=(t,e)=>new jn({innerType:t,typeName:fe.ZodOptional,...Ee(e)});class li extends Ie{_parse(e){return this._getType(e)===J.null?St(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}li.create=(t,e)=>new li({innerType:t,typeName:fe.ZodNullable,...Ee(e)});class Ts extends Ie{_parse(e){const{ctx:n}=this._processInputParams(e);let r=n.data;return n.parsedType===J.undefined&&(r=this._def.defaultValue()),this._def.innerType._parse({data:r,path:n.path,parent:n})}removeDefault(){return this._def.innerType}}Ts.create=(t,e)=>new Ts({innerType:t,typeName:fe.ZodDefault,defaultValue:typeof e.default=="function"?e.default:()=>e.default,...Ee(e)});class Ja extends Ie{_parse(e){const{ctx:n}=this._processInputParams(e),r={...n,common:{...n.common,issues:[]}},o=this._def.innerType._parse({data:r.data,path:r.path,parent:{...r}});return Ga(o)?o.then(i=>({status:"valid",value:i.status==="valid"?i.value:this._def.catchValue({get error(){return new nn(r.common.issues)},input:r.data})})):{status:"valid",value:o.status==="valid"?o.value:this._def.catchValue({get error(){return new nn(r.common.issues)},input:r.data})}}removeCatch(){return this._def.innerType}}Ja.create=(t,e)=>new Ja({innerType:t,typeName:fe.ZodCatch,catchValue:typeof e.catch=="function"?e.catch:()=>e.catch,...Ee(e)});class Xa extends Ie{_parse(e){if(this._getType(e)!==J.nan){const r=this._getOrReturnCtx(e);return te(r,{code:V.invalid_type,expected:J.nan,received:r.parsedType}),be}return{status:"valid",value:e.data}}}Xa.create=t=>new Xa({typeName:fe.ZodNaN,...Ee(t)});const p6=Symbol("zod_brand");class h1 extends Ie{_parse(e){const{ctx:n}=this._processInputParams(e),r=n.data;return this._def.type._parse({data:r,path:n.path,parent:n})}unwrap(){return this._def.type}}class Ks extends Ie{_parse(e){const{status:n,ctx:r}=this._processInputParams(e);if(r.common.async)return(async()=>{const i=await this._def.in._parseAsync({data:r.data,path:r.path,parent:r});return i.status==="aborted"?be:i.status==="dirty"?(n.dirty(),d1(i.value)):this._def.out._parseAsync({data:i.value,path:r.path,parent:r})})();{const o=this._def.in._parseSync({data:r.data,path:r.path,parent:r});return o.status==="aborted"?be:o.status==="dirty"?(n.dirty(),{status:"dirty",value:o.value}):this._def.out._parseSync({data:o.value,path:r.path,parent:r})}}static create(e,n){return new Ks({in:e,out:n,typeName:fe.ZodPipeline})}}class Qa extends Ie{_parse(e){const n=this._def.innerType._parse(e);return ws(n)&&(n.value=Object.freeze(n.value)),n}}Qa.create=(t,e)=>new Qa({innerType:t,typeName:fe.ZodReadonly,...Ee(e)});const p1=(t,e={},n)=>t?eo.create().superRefine((r,o)=>{var i,s;if(!t(r)){const a=typeof e=="function"?e(r):typeof e=="string"?{message:e}:e,c=(s=(i=a.fatal)!==null&&i!==void 0?i:n)!==null&&s!==void 0?s:!0,l=typeof a=="string"?{message:a}:a;o.addIssue({code:"custom",...l,fatal:c})}}):eo.create(),g6={object:qe.lazycreate};var fe;(function(t){t.ZodString="ZodString",t.ZodNumber="ZodNumber",t.ZodNaN="ZodNaN",t.ZodBigInt="ZodBigInt",t.ZodBoolean="ZodBoolean",t.ZodDate="ZodDate",t.ZodSymbol="ZodSymbol",t.ZodUndefined="ZodUndefined",t.ZodNull="ZodNull",t.ZodAny="ZodAny",t.ZodUnknown="ZodUnknown",t.ZodNever="ZodNever",t.ZodVoid="ZodVoid",t.ZodArray="ZodArray",t.ZodObject="ZodObject",t.ZodUnion="ZodUnion",t.ZodDiscriminatedUnion="ZodDiscriminatedUnion",t.ZodIntersection="ZodIntersection",t.ZodTuple="ZodTuple",t.ZodRecord="ZodRecord",t.ZodMap="ZodMap",t.ZodSet="ZodSet",t.ZodFunction="ZodFunction",t.ZodLazy="ZodLazy",t.ZodLiteral="ZodLiteral",t.ZodEnum="ZodEnum",t.ZodEffects="ZodEffects",t.ZodNativeEnum="ZodNativeEnum",t.ZodOptional="ZodOptional",t.ZodNullable="ZodNullable",t.ZodDefault="ZodDefault",t.ZodCatch="ZodCatch",t.ZodPromise="ZodPromise",t.ZodBranded="ZodBranded",t.ZodPipeline="ZodPipeline",t.ZodReadonly="ZodReadonly"})(fe||(fe={}));const m6=(t,e={message:`Input not instance of ${t.name}`})=>p1(n=>n instanceof t,e),g1=en.create,m1=wr.create,w6=Xa.create,b6=br.create,w1=bs.create,y6=ai.create,v6=qa.create,x6=ys.create,E6=vs.create,_6=eo.create,C6=Fr.create,S6=Vn.create,A6=Ka.create,T6=rn.create,I6=qe.create,$6=qe.strictCreate,D6=xs.create,P6=Kc.create,O6=Es.create,R6=Dn.create,N6=_s.create,k6=Ya.create,M6=ci.create,U6=Ni.create,B6=Cs.create,L6=Ss.create,j6=yr.create,F6=As.create,W6=to.create,gf=fn.create,z6=jn.create,H6=li.create,V6=fn.createWithPreprocess,Z6=Ks.create,G6=()=>g1().optional(),q6=()=>m1().optional(),K6=()=>w1().optional(),Y6={string:t=>en.create({...t,coerce:!0}),number:t=>wr.create({...t,coerce:!0}),boolean:t=>bs.create({...t,coerce:!0}),bigint:t=>br.create({...t,coerce:!0}),date:t=>ai.create({...t,coerce:!0})},J6=be;var N=Object.freeze({__proto__:null,defaultErrorMap:ms,setErrorMap:t6,getErrorMap:Va,makeIssue:Za,EMPTY_PATH:n6,addIssueToContext:te,ParseStatus:yt,INVALID:be,DIRTY:d1,OK:St,isAborted:_u,isDirty:Cu,isValid:ws,isAsync:Ga,get util(){return Me},get objectUtil(){return Eu},ZodParsedType:J,getParsedType:nr,ZodType:Ie,ZodString:en,ZodNumber:wr,ZodBigInt:br,ZodBoolean:bs,ZodDate:ai,ZodSymbol:qa,ZodUndefined:ys,ZodNull:vs,ZodAny:eo,ZodUnknown:Fr,ZodNever:Vn,ZodVoid:Ka,ZodArray:rn,ZodObject:qe,ZodUnion:xs,ZodDiscriminatedUnion:Kc,ZodIntersection:Es,ZodTuple:Dn,ZodRecord:_s,ZodMap:Ya,ZodSet:ci,ZodFunction:Ni,ZodLazy:Cs,ZodLiteral:Ss,ZodEnum:yr,ZodNativeEnum:As,ZodPromise:to,ZodEffects:fn,ZodTransformer:fn,ZodOptional:jn,ZodNullable:li,ZodDefault:Ts,ZodCatch:Ja,ZodNaN:Xa,BRAND:p6,ZodBranded:h1,ZodPipeline:Ks,ZodReadonly:Qa,custom:p1,Schema:Ie,ZodSchema:Ie,late:g6,get ZodFirstPartyTypeKind(){return fe},coerce:Y6,any:_6,array:T6,bigint:b6,boolean:w1,date:y6,discriminatedUnion:P6,effect:gf,enum:j6,function:U6,instanceof:m6,intersection:O6,lazy:B6,literal:L6,map:k6,nan:w6,nativeEnum:F6,never:S6,null:E6,nullable:H6,number:m1,object:I6,oboolean:K6,onumber:q6,optional:z6,ostring:G6,pipeline:Z6,preprocess:V6,promise:W6,record:N6,set:M6,strictObject:$6,string:g1,symbol:v6,transformer:gf,tuple:R6,undefined:x6,union:D6,unknown:C6,void:A6,NEVER:J6,ZodIssueCode:V,quotelessJson:e6,ZodError:nn});const Bt=N.object({message:N.string()});function Te(t){return N.literal(re[t])}N.object({accessList:N.array(N.string()),blockHash:N.string().nullable(),blockNumber:N.string().nullable(),chainId:N.string(),from:N.string(),gas:N.string(),hash:N.string(),input:N.string().nullable(),maxFeePerGas:N.string(),maxPriorityFeePerGas:N.string(),nonce:N.string(),r:N.string(),s:N.string(),to:N.string(),transactionIndex:N.string().nullable(),type:N.string(),v:N.string(),value:N.string()});const X6=N.object({chainId:N.number()}),Q6=N.object({email:N.string().email()}),e4=N.object({otp:N.string()}),t4=N.object({chainId:N.optional(N.number())}),n4=N.object({email:N.string().email()}),r4=N.object({themeMode:N.optional(N.enum(["light","dark"])),themeVariables:N.optional(N.record(N.string(),N.string().or(N.number())))}),i4=N.object({metadata:N.object({name:N.string(),description:N.string(),url:N.string(),icons:N.array(N.string())}).optional(),sdkVersion:N.string(),projectId:N.string()}),o4=N.object({action:N.enum(["VERIFY_DEVICE","VERIFY_OTP"])}),s4=N.object({email:N.string().email(),address:N.string(),chainId:N.number()}),a4=N.object({isConnected:N.boolean()}),c4=N.object({chainId:N.number()}),l4=N.object({chainId:N.number()}),u4=N.object({email:N.string().email()}),d4=N.any(),f4=N.object({method:N.literal("personal_sign"),params:N.array(N.any())}),h4=N.object({method:N.literal("eth_sendTransaction"),params:N.array(N.any())}),p4=N.object({method:N.literal("eth_accounts")}),g4=N.object({method:N.literal("eth_getBalance"),params:N.array(N.any())}),m4=N.object({method:N.literal("eth_estimateGas"),params:N.array(N.any())}),w4=N.object({method:N.literal("eth_gasPrice")}),b4=N.object({method:N.literal("eth_signTypedData_v4"),params:N.array(N.any())}),y4=N.object({method:N.literal("eth_getTransactionByHash"),params:N.array(N.any())}),v4=N.object({method:N.literal("eth_blockNumber")}),x4=N.object({method:N.literal("eth_chainId")}),mf=N.object({token:N.string()}),da={appEvent:N.object({type:Te("APP_SWITCH_NETWORK"),payload:X6}).or(N.object({type:Te("APP_CONNECT_EMAIL"),payload:Q6})).or(N.object({type:Te("APP_CONNECT_DEVICE")})).or(N.object({type:Te("APP_CONNECT_OTP"),payload:e4})).or(N.object({type:Te("APP_GET_USER"),payload:N.optional(t4)})).or(N.object({type:Te("APP_SIGN_OUT")})).or(N.object({type:Te("APP_IS_CONNECTED"),payload:N.optional(mf)})).or(N.object({type:Te("APP_GET_CHAIN_ID")})).or(N.object({type:Te("APP_RPC_REQUEST"),payload:f4.or(h4).or(p4).or(g4).or(m4).or(w4).or(b4).or(v4).or(x4).or(y4)})).or(N.object({type:Te("APP_UPDATE_EMAIL"),payload:n4})).or(N.object({type:Te("APP_AWAIT_UPDATE_EMAIL")})).or(N.object({type:Te("APP_SYNC_THEME"),payload:r4})).or(N.object({type:Te("APP_SYNC_DAPP_DATA"),payload:i4})),frameEvent:N.object({type:Te("FRAME_SWITCH_NETWORK_ERROR"),payload:Bt}).or(N.object({type:Te("FRAME_SWITCH_NETWORK_SUCCESS"),payload:l4})).or(N.object({type:Te("FRAME_CONNECT_EMAIL_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_CONNECT_EMAIL_SUCCESS"),payload:o4})).or(N.object({type:Te("FRAME_CONNECT_OTP_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_CONNECT_OTP_SUCCESS")})).or(N.object({type:Te("FRAME_CONNECT_DEVICE_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_CONNECT_DEVICE_SUCCESS")})).or(N.object({type:Te("FRAME_GET_USER_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_GET_USER_SUCCESS"),payload:s4})).or(N.object({type:Te("FRAME_SIGN_OUT_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_SIGN_OUT_SUCCESS")})).or(N.object({type:Te("FRAME_IS_CONNECTED_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_IS_CONNECTED_SUCCESS"),payload:a4})).or(N.object({type:Te("FRAME_GET_CHAIN_ID_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_GET_CHAIN_ID_SUCCESS"),payload:c4})).or(N.object({type:Te("FRAME_RPC_REQUEST_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_RPC_REQUEST_SUCCESS"),payload:d4})).or(N.object({type:Te("FRAME_SESSION_UPDATE"),payload:mf})).or(N.object({type:Te("FRAME_UPDATE_EMAIL_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_UPDATE_EMAIL_SUCCESS")})).or(N.object({type:Te("FRAME_AWAIT_UPDATE_EMAIL_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_AWAIT_UPDATE_EMAIL_SUCCESS"),payload:u4})).or(N.object({type:Te("FRAME_SYNC_THEME_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_SYNC_THEME_SUCCESS")})).or(N.object({type:Te("FRAME_SYNC_DAPP_DATA_ERROR"),payload:Bt})).or(N.object({type:Te("FRAME_SYNC_DAPP_DATA_SUCCESS")}))},Lt={set(t,e){localStorage.setItem(`${re.STORAGE_KEY}${t}`,e)},get(t){return localStorage.getItem(`${re.STORAGE_KEY}${t}`)},delete(t){localStorage.removeItem(`${re.STORAGE_KEY}${t}`)}},E4=["ASIA/SHANGHAI","ASIA/URUMQI","ASIA/CHONGQING","ASIA/HARBIN","ASIA/KASHGAR","ASIA/MACAU","ASIA/HONG_KONG","ASIA/MACAO","ASIA/BEIJING","ASIA/HARBIN"],fa=30*1e3,ki={getBlockchainApiUrl(){try{const{timeZone:t}=new Intl.DateTimeFormat().resolvedOptions(),e=t.toUpperCase();return E4.includes(e)?"https://rpc.walletconnect.org":"https://rpc.walletconnect.com"}catch{return!1}},checkIfAllowedToTriggerEmail(){const t=Lt.get(re.LAST_EMAIL_LOGIN_TIME);if(t){const e=Date.now()-Number(t);if(e<fa){const n=Math.ceil((fa-e)/1e3);throw new Error(`Please try again after ${n} seconds`)}}},getTimeToNextEmailLogin(){const t=Lt.get(re.LAST_EMAIL_LOGIN_TIME);if(t){const e=Date.now()-Number(t);if(e<fa)return Math.ceil((fa-e)/1e3)}return 0}};class _4{constructor(e,n=!1){if(this.iframe=null,this.rpcUrl=ki.getBlockchainApiUrl(),this.events={onFrameEvent:r=>{window.addEventListener("message",({data:o})=>{var s;if(!((s=o.type)!=null&&s.includes(re.FRAME_EVENT_KEY)))return;const i=da.frameEvent.parse(o);r(i)})},onAppEvent:r=>{window.addEventListener("message",({data:o})=>{var s;if(!((s=o.type)!=null&&s.includes(re.APP_EVENT_KEY)))return;const i=da.appEvent.parse(o);r(i)})},postAppEvent:r=>{var o;if(!((o=this.iframe)!=null&&o.contentWindow))throw new Error("W3mFrame: iframe is not set");da.appEvent.parse(r),window.postMessage(r),this.iframe.contentWindow.postMessage(r,"*")},postFrameEvent:r=>{if(!parent)throw new Error("W3mFrame: parent is not set");da.frameEvent.parse(r),parent.postMessage(r,"*")}},this.projectId=e,this.frameLoadPromise=new Promise((r,o)=>{this.frameLoadPromiseResolver={resolve:r,reject:o}}),n){this.frameLoadPromise=new Promise((o,i)=>{this.frameLoadPromiseResolver={resolve:o,reject:i}});const r=document.createElement("iframe");r.id="w3m-iframe",r.src=`${re.SECURE_SITE_SDK}?projectId=${e}`,r.style.position="fixed",r.style.zIndex="999999",r.style.display="none",r.style.opacity="0",r.style.borderRadius="clamp(0px, var(--wui-border-radius-l), 44px)",document.body.appendChild(r),this.iframe=r,this.iframe.onload=()=>{var o;(o=this.frameLoadPromiseResolver)==null||o.resolve(void 0)},this.iframe.onerror=()=>{var o;(o=this.frameLoadPromiseResolver)==null||o.reject("Unable to load email login dependency")}}}get networks(){const e=[1,5,11155111,10,420,42161,421613,137,80001,42220,1313161554,1313161555,56,97,43114,43113,324,280,100,8453,84531,7777777,999].map(n=>({[n]:{rpcUrl:`${this.rpcUrl}/v1/?chainId=eip155:${n}&projectId=${this.projectId}`,chainId:n}}));return Object.assign({},...e)}}class C4{constructor(e){this.connectEmailResolver=void 0,this.connectDeviceResolver=void 0,this.connectOtpResolver=void 0,this.connectResolver=void 0,this.disconnectResolver=void 0,this.isConnectedResolver=void 0,this.getChainIdResolver=void 0,this.switchChainResolver=void 0,this.rpcRequestResolver=void 0,this.updateEmailResolver=void 0,this.awaitUpdateEmailResolver=void 0,this.syncThemeResolver=void 0,this.syncDappDataResolver=void 0,this.w3mFrame=new _4(e,!0),this.w3mFrame.events.onFrameEvent(n=>{switch(console.log("💻 received",n),n.type){case re.FRAME_CONNECT_EMAIL_SUCCESS:return this.onConnectEmailSuccess(n);case re.FRAME_CONNECT_EMAIL_ERROR:return this.onConnectEmailError(n);case re.FRAME_CONNECT_DEVICE_SUCCESS:return this.onConnectDeviceSuccess();case re.FRAME_CONNECT_DEVICE_ERROR:return this.onConnectDeviceError(n);case re.FRAME_CONNECT_OTP_SUCCESS:return this.onConnectOtpSuccess();case re.FRAME_CONNECT_OTP_ERROR:return this.onConnectOtpError(n);case re.FRAME_GET_USER_SUCCESS:return this.onConnectSuccess(n);case re.FRAME_GET_USER_ERROR:return this.onConnectError(n);case re.FRAME_IS_CONNECTED_SUCCESS:return this.onIsConnectedSuccess(n);case re.FRAME_IS_CONNECTED_ERROR:return this.onIsConnectedError(n);case re.FRAME_GET_CHAIN_ID_SUCCESS:return this.onGetChainIdSuccess(n);case re.FRAME_GET_CHAIN_ID_ERROR:return this.onGetChainIdError(n);case re.FRAME_SIGN_OUT_SUCCESS:return this.onSignOutSuccess();case re.FRAME_SIGN_OUT_ERROR:return this.onSignOutError(n);case re.FRAME_SWITCH_NETWORK_SUCCESS:return this.onSwitchChainSuccess(n);case re.FRAME_SWITCH_NETWORK_ERROR:return this.onSwitchChainError(n);case re.FRAME_RPC_REQUEST_SUCCESS:return this.onRpcRequestSuccess(n);case re.FRAME_RPC_REQUEST_ERROR:return this.onRpcRequestError(n);case re.FRAME_SESSION_UPDATE:return this.onSessionUpdate(n);case re.FRAME_UPDATE_EMAIL_SUCCESS:return this.onUpdateEmailSuccess();case re.FRAME_UPDATE_EMAIL_ERROR:return this.onUpdateEmailError(n);case re.FRAME_AWAIT_UPDATE_EMAIL_SUCCESS:return this.onAwaitUpdateEmailSuccess(n);case re.FRAME_AWAIT_UPDATE_EMAIL_ERROR:return this.onAwaitUpdateEmailError(n);case re.FRAME_SYNC_THEME_SUCCESS:return this.onSyncThemeSuccess();case re.FRAME_SYNC_THEME_ERROR:return this.onSyncThemeError(n);case re.FRAME_SYNC_DAPP_DATA_SUCCESS:return this.onSyncDappDataSuccess();case re.FRAME_SYNC_DAPP_DATA_ERROR:return this.onSyncDappDataError(n);default:return null}})}getLoginEmailUsed(){return!!Lt.get(re.EMAIL_LOGIN_USED_KEY)}getEmail(){return Lt.get(re.EMAIL)}async connectEmail(e){return await this.w3mFrame.frameLoadPromise,ki.checkIfAllowedToTriggerEmail(),this.w3mFrame.events.postAppEvent({type:re.APP_CONNECT_EMAIL,payload:e}),new Promise((n,r)=>{this.connectEmailResolver={resolve:n,reject:r}})}async connectDevice(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_CONNECT_DEVICE}),new Promise((e,n)=>{this.connectDeviceResolver={resolve:e,reject:n}})}async connectOtp(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_CONNECT_OTP,payload:e}),new Promise((n,r)=>{this.connectOtpResolver={resolve:n,reject:r}})}async isConnected(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_IS_CONNECTED,payload:void 0}),new Promise((e,n)=>{this.isConnectedResolver={resolve:e,reject:n}})}async getChainId(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_GET_CHAIN_ID}),new Promise((e,n)=>{this.getChainIdResolver={resolve:e,reject:n}})}async updateEmail(e){return await this.w3mFrame.frameLoadPromise,ki.checkIfAllowedToTriggerEmail(),this.w3mFrame.events.postAppEvent({type:re.APP_UPDATE_EMAIL,payload:e}),new Promise((n,r)=>{this.updateEmailResolver={resolve:n,reject:r}})}async awaitUpdateEmail(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_AWAIT_UPDATE_EMAIL}),new Promise((e,n)=>{this.awaitUpdateEmailResolver={resolve:e,reject:n}})}async syncTheme(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_SYNC_THEME,payload:e}),new Promise((n,r)=>{this.syncThemeResolver={resolve:n,reject:r}})}async syncDappData(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_SYNC_DAPP_DATA,payload:e}),new Promise((n,r)=>{this.syncDappDataResolver={resolve:n,reject:r}})}async connect(e){const n=(e==null?void 0:e.chainId)??this.getLastUsedChainId()??1;return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_GET_USER,payload:{chainId:n}}),new Promise((r,o)=>{this.connectResolver={resolve:r,reject:o}})}async switchNetwork(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_SWITCH_NETWORK,payload:{chainId:e}}),new Promise((n,r)=>{this.switchChainResolver={resolve:n,reject:r}})}async disconnect(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:re.APP_SIGN_OUT}),new Promise((e,n)=>{this.disconnectResolver={resolve:e,reject:n}})}async request(e){return await this.w3mFrame.frameLoadPromise,Q5.GET_CHAIN_ID===e.method?this.getLastUsedChainId():(this.w3mFrame.events.postAppEvent({type:re.APP_RPC_REQUEST,payload:e}),new Promise((n,r)=>{this.rpcRequestResolver={resolve:n,reject:r}}))}onRpcRequest(e){this.w3mFrame.events.onAppEvent(n=>{n.type.includes(re.RPC_METHOD_KEY)&&e(n)})}onRpcResponse(e){this.w3mFrame.events.onFrameEvent(n=>{n.type.includes(re.RPC_METHOD_KEY)&&e(n)})}onIsConnected(e){this.w3mFrame.events.onFrameEvent(n=>{n.type===re.FRAME_GET_USER_SUCCESS&&e()})}onConnectEmailSuccess(e){var n;(n=this.connectEmailResolver)==null||n.resolve(e.payload),this.setNewLastEmailLoginTime()}onConnectEmailError(e){var n;(n=this.connectEmailResolver)==null||n.reject(e.payload.message)}onConnectDeviceSuccess(){var e;(e=this.connectDeviceResolver)==null||e.resolve(void 0)}onConnectDeviceError(e){var n;(n=this.connectDeviceResolver)==null||n.reject(e.payload.message)}onConnectOtpSuccess(){var e;(e=this.connectOtpResolver)==null||e.resolve(void 0)}onConnectOtpError(e){var n;(n=this.connectOtpResolver)==null||n.reject(e.payload.message)}onConnectSuccess(e){var n;this.setEmailLoginSuccess(e.payload.email),this.setLastUsedChainId(e.payload.chainId),(n=this.connectResolver)==null||n.resolve(e.payload)}onConnectError(e){var n;(n=this.connectResolver)==null||n.reject(e.payload.message)}onIsConnectedSuccess(e){var n;e.payload.isConnected||this.deleteEmailLoginCache(),(n=this.isConnectedResolver)==null||n.resolve(e.payload)}onIsConnectedError(e){var n;(n=this.isConnectedResolver)==null||n.reject(e.payload.message)}onGetChainIdSuccess(e){var n;this.setLastUsedChainId(e.payload.chainId),(n=this.getChainIdResolver)==null||n.resolve(e.payload)}onGetChainIdError(e){var n;(n=this.getChainIdResolver)==null||n.reject(e.payload.message)}onSignOutSuccess(){var e;(e=this.disconnectResolver)==null||e.resolve(void 0),this.deleteEmailLoginCache()}onSignOutError(e){var n;(n=this.disconnectResolver)==null||n.reject(e.payload.message)}onSwitchChainSuccess(e){var n;this.setLastUsedChainId(e.payload.chainId),(n=this.switchChainResolver)==null||n.resolve(e.payload)}onSwitchChainError(e){var n;(n=this.switchChainResolver)==null||n.reject(e.payload.message)}onRpcRequestSuccess(e){var n;(n=this.rpcRequestResolver)==null||n.resolve(e.payload)}onRpcRequestError(e){var n;(n=this.rpcRequestResolver)==null||n.reject(e.payload.message)}onSessionUpdate(e){}onUpdateEmailSuccess(){var e;(e=this.updateEmailResolver)==null||e.resolve(void 0),this.setNewLastEmailLoginTime()}onUpdateEmailError(e){var n;(n=this.updateEmailResolver)==null||n.reject(e.payload.message)}onAwaitUpdateEmailSuccess(e){var n;this.setEmailLoginSuccess(e.payload.email),(n=this.awaitUpdateEmailResolver)==null||n.resolve(e.payload)}onAwaitUpdateEmailError(e){var n;(n=this.awaitUpdateEmailResolver)==null||n.reject(e.payload.message)}onSyncThemeSuccess(){var e;(e=this.syncThemeResolver)==null||e.resolve(void 0)}onSyncThemeError(e){var n;(n=this.syncThemeResolver)==null||n.reject(e.payload.message)}onSyncDappDataSuccess(){var e;(e=this.syncDappDataResolver)==null||e.resolve(void 0)}onSyncDappDataError(e){var n;(n=this.syncDappDataResolver)==null||n.reject(e.payload.message)}setNewLastEmailLoginTime(){Lt.set(re.LAST_EMAIL_LOGIN_TIME,Date.now().toString())}setEmailLoginSuccess(e){Lt.set(re.EMAIL,e),Lt.set(re.EMAIL_LOGIN_USED_KEY,"true"),Lt.delete(re.LAST_EMAIL_LOGIN_TIME)}deleteEmailLoginCache(){Lt.delete(re.EMAIL_LOGIN_USED_KEY),Lt.delete(re.EMAIL),Lt.delete(re.LAST_USED_CHAIN_KEY)}setLastUsedChainId(e){Lt.set(re.LAST_USED_CHAIN_KEY,`${e}`)}getLastUsedChainId(){return Number(Lt.get(re.LAST_USED_CHAIN_KEY))}}var Yc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const S4=6;let no=class extends H{constructor(){var e;super(...arguments),this.email=(e=oe.state.data)==null?void 0:e.email,this.emailConnector=We.getEmailConnector(),this.loading=!1,this.timeoutTimeLeft=ki.getTimeToNextEmailLogin(),this.error="",this.otp=""}firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}render(){if(!this.email)throw new Error("w3m-email-verify-otp-view: No email provided");const e=!!this.timeoutTimeLeft;return $`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["l","0","l","0"]}
        gap="l"
      >
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-400" color="fg-100"> Enter the code we sent to </wui-text>
          <wui-text variant="paragraph-500" color="fg-100">${this.email}</wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading?$`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`:$` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?$`<wui-text variant="small-400" color="error-100"
                    >${this.error}. Try Again</wui-text
                  >`:null}
            </wui-flex>`}

        <wui-flex alignItems="center">
          <wui-text variant="small-400" color="fg-200">Didn't receive it?</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${e}>
            Resend ${e?`in ${this.timeoutTimeLeft}s`:"Code"}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=ki.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=ki.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(e){try{this.loading||(this.otp=e.detail,this.emailConnector&&this.otp.length===S4&&(this.loading=!0,await this.emailConnector.provider.connectOtp({otp:this.otp}),we.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),await Re.connectExternal(this.emailConnector),ze.close(),we.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"email"}})))}catch(n){we.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL"}),this.error=le.parseError(n),this.loading=!1}}async onResendCode(){try{if(!this.loading&&!this.timeoutTimeLeft){this.error="",this.otp="";const e=We.getEmailConnector();if(!e||!this.email)throw new Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await e.provider.connectEmail({email:this.email}),we.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),this.startOTPTimeout(),et.showSuccess("Code email resent")}}catch(e){et.showError(e)}finally{this.loading=!1}}};no.styles=X5;Yc([ee()],no.prototype,"loading",void 0);Yc([ee()],no.prototype,"timeoutTimeLeft",void 0);Yc([ee()],no.prototype,"error",void 0);no=Yc([z("w3m-email-verify-otp-view")],no);const A4=q`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`;var b1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let ec=class extends H{constructor(){var e;super(),this.email=(e=oe.state.data)==null?void 0:e.email,this.emailConnector=We.getEmailConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw new Error("w3m-email-verify-device-view: No email provided");if(!this.emailConnector)throw new Error("w3m-email-verify-device-view: No email connector provided");return $`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xxl","s","xxl","s"]}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForDeviceApproval(){this.emailConnector&&(await this.emailConnector.provider.connectDevice(),we.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),we.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),oe.replace("EmailVerifyOtp",{email:this.email}))}async onResendCode(){try{if(!this.loading){if(!this.emailConnector||!this.email)throw new Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.emailConnector.provider.connectEmail({email:this.email}),et.showSuccess("Code email resent")}}catch(e){et.showError(e)}finally{this.loading=!1}}};ec.styles=A4;b1([ee()],ec.prototype,"loading",void 0);ec=b1([z("w3m-email-verify-device-view")],ec);const T4=q`
  div {
    width: 100%;
    height: 400px;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;var y1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let tc=class extends H{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(ze.subscribeKey("open",e=>{e||this.onHideIframe()}))}disconnectedCallback(){var e;this.unsubscribe.forEach(n=>n()),(e=this.bodyObserver)==null||e.unobserve(window.document.body)}firstUpdated(){this.iframe.style.display="block";const n=this.renderRoot.querySelector("div");this.bodyObserver=new ResizeObserver(()=>{const o=(n==null?void 0:n.getBoundingClientRect())??{left:0,top:0,width:0,height:0};this.iframe.style.width=`${o.width}px`,this.iframe.style.height=`${o.height-10}px`,this.iframe.style.left=`${o.left}px`,this.iframe.style.top=`${o.top+10/2}px`,this.ready=!0}),this.bodyObserver.observe(window.document.body)}render(){return this.ready&&this.onShowIframe(),$`<div data-ready=${this.ready}></div>`}onShowIframe(){const e=window.innerWidth<=430;this.iframe.animate([{opacity:0,transform:e?"translateY(50px)":"scale(.95)"},{opacity:1,transform:e?"translateY(0)":"scale(1)"}],{duration:200,easing:"ease",fill:"forwards",delay:300})}async onHideIframe(){await this.iframe.animate([{opacity:1},{opacity:0}],{duration:200,easing:"ease",fill:"forwards"}).finished,this.iframe.style.display="none"}};tc.styles=T4;y1([ee()],tc.prototype,"ready",void 0);tc=y1([z("w3m-approve-transaction-view")],tc);var I4=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let wf=class extends H{render(){return $`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${Bn.SECURE_SITE_DASHBOARD}
          imageSrc=${Bn.SECURE_SITE_FAVICON}
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};wf=I4([z("w3m-upgrade-wallet-view")],wf);const $4=q`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var Kd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Is=class extends H{constructor(){var e;super(...arguments),this.formRef=Uc(),this.initialValue=((e=oe.state.data)==null?void 0:e.email)??"",this.email="",this.loading=!1}firstUpdated(){var e;(e=this.formRef.value)==null||e.addEventListener("keydown",n=>{n.key==="Enter"&&this.onSubmitEmail(n)})}render(){const e=!this.loading&&this.email.length>3&&this.email!==this.initialValue;return $`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${Bc(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialValue}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>

        <wui-flex gap="s">
          <wui-button size="md" variant="shade" fullWidth @click=${oe.goBack}>
            Cancel
          </wui-button>

          <wui-button
            size="md"
            variant="fill"
            fullWidth
            @click=${this.onSubmitEmail.bind(this)}
            .disabled=${!e}
            .loading=${this.loading}
          >
            Save
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}onEmailInputChange(e){this.email=e.detail}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();const n=We.getEmailConnector();if(!n)throw new Error("w3m-update-email-wallet: Email connector not found");await n.provider.updateEmail({email:this.email}),we.sendEvent({type:"track",event:"EMAIL_EDIT"}),oe.replace("UpdateEmailWalletWaiting",{email:this.email})}catch(n){et.showError(n),this.loading=!1}}};Is.styles=$4;Kd([ee()],Is.prototype,"email",void 0);Kd([ee()],Is.prototype,"loading",void 0);Is=Kd([z("w3m-update-email-wallet-view")],Is);const D4=q`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`;var v1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let nc=class extends H{constructor(){var e;super(),this.email=(e=oe.state.data)==null?void 0:e.email,this.emailConnector=We.getEmailConnector(),this.loading=!1,this.listenForEmailUpdateApproval()}render(){if(!this.email)throw new Error("w3m-update-email-wallet-waiting-view: No email provided");if(!this.emailConnector)throw new Error("w3m-update-email-wallet-waiting-view: No email connector provided");return $`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xxl","s","xxl","s"]}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="mail"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve verification link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100">${this.email}</wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            You will receive an approval request on your former mail to confirm the new one
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForEmailUpdateApproval(){this.emailConnector&&(await this.emailConnector.provider.awaitUpdateEmail(),oe.replace("Account"),et.showSuccess("Email updated"))}async onResendCode(){try{if(!this.loading){if(!this.emailConnector||!this.email)throw new Error("w3m-update-email-wallet-waiting-view: Unable to resend email");this.loading=!0,await this.emailConnector.provider.updateEmail({email:this.email}),this.listenForEmailUpdateApproval(),et.showSuccess("Code email resent")}}catch(e){et.showError(e)}finally{this.loading=!1}}};nc.styles=D4;v1([ee()],nc.prototype,"loading",void 0);nc=v1([z("w3m-update-email-wallet-waiting-view")],nc);const P4=q`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 76px);
  }

  @media (max-width: 435px) {
    wui-grid {
      grid-template-columns: repeat(auto-fill, 77px);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;function x1(t){const{connectors:e}=We.state,n=e.filter(i=>i.type==="ANNOUNCED").reduce((i,s)=>{var a;return(a=s.info)!=null&&a.rdns&&(i[s.info.rdns]=!0),i},{});return t.map(i=>({...i,installed:!!i.rdns&&!!n[i.rdns??""]})).sort((i,s)=>Number(s.installed)-Number(i.installed))}var Ys=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const bf="local-paginator";let ui=class extends H{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.initial=!Pe.state.wallets.length,this.wallets=Pe.state.wallets,this.recommended=Pe.state.recommended,this.featured=Pe.state.featured,this.unsubscribe.push(Pe.subscribeKey("wallets",e=>this.wallets=e),Pe.subscribeKey("recommended",e=>this.recommended=e),Pe.subscribeKey("featured",e=>this.featured=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){var e;this.unsubscribe.forEach(n=>n()),(e=this.paginationObserver)==null||e.disconnect()}render(){return $`
      <wui-grid
        data-scroll=${!this.initial}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.initial?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector("wui-grid");this.initial&&e&&(await Pe.fetchWallets({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.initial=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,n){return[...Array(e)].map(()=>$`
        <wui-card-select-loader type="wallet" id=${ve(n)}></wui-card-select-loader>
      `)}walletsTemplate(){const e=[...this.featured,...this.recommended,...this.wallets];return x1(e).map(r=>$`
        <wui-card-select
          imageSrc=${ve(Xe.getWalletImage(r))}
          type="wallet"
          name=${r.name}
          @click=${()=>this.onConnectWallet(r)}
          .installed=${r.installed}
        ></wui-card-select>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:n,featured:r,count:o}=Pe.state,i=window.innerWidth<352?3:4,s=e.length+n.length;let c=Math.ceil(s/i)*i-s+i;return c-=e.length?r.length%i:0,o===0&&r.length>0?null:o===0||[...r,...e,...n].length<o?this.shimmerTemplate(c,bf):null}createPaginationObserver(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector(`#${bf}`);e&&(this.paginationObserver=new IntersectionObserver(([r])=>{if(r!=null&&r.isIntersecting&&!this.initial){const{page:o,count:i,wallets:s}=Pe.state;s.length<i&&Pe.fetchWallets({page:o+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){const{connectors:n}=We.state,r=n.find(({explorerId:o})=>o===e.id);r?oe.push("ConnectingExternal",{connector:r}):oe.push("ConnectingWalletConnect",{wallet:e})}};ui.styles=P4;Ys([ee()],ui.prototype,"initial",void 0);Ys([ee()],ui.prototype,"wallets",void 0);Ys([ee()],ui.prototype,"recommended",void 0);Ys([ee()],ui.prototype,"featured",void 0);ui=Ys([z("w3m-all-wallets-list")],ui);const O4=q`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }
`;var Yd=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let $s=class extends H{constructor(){super(...arguments),this.prevQuery="",this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?$`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){this.query!==this.prevQuery&&(this.prevQuery=this.query,this.loading=!0,await Pe.searchWallet({search:this.query}),this.loading=!1)}walletsTemplate(){const{search:e}=Pe.state,n=x1(e);return e.length?$`
      <wui-grid
        .padding=${["0","s","s","s"]}
        gridTemplateColumns="repeat(4, 1fr)"
        rowGap="l"
        columnGap="xs"
      >
        ${n.map(r=>$`
            <wui-card-select
              imageSrc=${ve(Xe.getWalletImage(r))}
              type="wallet"
              name=${r.name}
              @click=${()=>this.onConnectWallet(r)}
              .installed=${r.installed}
            ></wui-card-select>
          `)}
      </wui-grid>
    `:$`
        <wui-flex justifyContent="center" alignItems="center" gap="s" flexDirection="column">
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text color="fg-200" variant="paragraph-500">No Wallet found</wui-text>
        </wui-flex>
      `}onConnectWallet(e){const{connectors:n}=We.state,r=n.find(({explorerId:o})=>o===e.id);r?oe.push("ConnectingExternal",{connector:r}):oe.push("ConnectingWalletConnect",{wallet:e})}};$s.styles=O4;Yd([ee()],$s.prototype,"loading",void 0);Yd([D()],$s.prototype,"query",void 0);$s=Yd([z("w3m-all-wallets-search")],$s);var Jc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Ds=class extends H{constructor(){super(),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0,this.buffering=!1,this.unsubscribe.push(Re.subscribeKey("buffering",e=>this.buffering=e))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return $`
      <wui-flex justifyContent="center" .padding=${["l","0","0","0"]}>
        <wui-tabs
          ?disabled=${this.buffering}
          .tabs=${e}
          .onTabChange=${this.onTabChange.bind(this)}
        ></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(n=>n==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:n==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:n==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:n==="web"?{label:"Webapp",icon:"browser",platform:"web"}:n==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:n})=>n),e}onTabChange(e){var r;const n=this.platformTabs[e];n&&((r=this.onSelectPlatfrom)==null||r.call(this,n))}};Jc([D({type:Array})],Ds.prototype,"platforms",void 0);Jc([D()],Ds.prototype,"onSelectPlatfrom",void 0);Jc([ee()],Ds.prototype,"buffering",void 0);Ds=Jc([z("w3m-connecting-header")],Ds);var R4=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let yf=class extends Nt{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),we.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;const{connectors:e}=We.state,n=e.find(o=>{var i,s;return o.type==="ANNOUNCED"&&((i=o.info)==null?void 0:i.rdns)===((s=this.wallet)==null?void 0:s.rdns)}),r=e.find(o=>o.type==="INJECTED");n?await Re.connectExternal(n):r&&await Re.connectExternal(r),ze.close(),we.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser"}})}catch(e){we.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(e==null?void 0:e.message)??"Unknown"}}),this.error=!0}}};yf=R4([z("w3m-connecting-wc-browser")],yf);var N4=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let vf=class extends Nt{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),we.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.timeout=setTimeout(()=>{var e;(e=this.onConnect)==null||e.call(this)},200))}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:n,name:r}=this.wallet,{redirect:o,href:i}=le.formatNativeUrl(n,this.uri);Re.setWcLinking({name:r,href:i}),Re.setRecentWallet(this.wallet),le.openHref(o,"_blank")}catch{this.error=!0}}};vf=N4([z("w3m-connecting-wc-desktop")],vf);var k4=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let xf=class extends Nt{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),document.addEventListener("visibilitychange",this.onBuffering.bind(this)),we.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onBuffering.bind(this))}onRenderProxy(){var e;!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:n,name:r}=this.wallet,{redirect:o,href:i}=le.formatNativeUrl(n,this.uri);Re.setWcLinking({name:r,href:i}),Re.setRecentWallet(this.wallet),le.openHref(o,"_self")}catch{this.error=!0}}onBuffering(){const e=le.isIos();(document==null?void 0:document.visibilityState)==="visible"&&!this.error&&e&&(Re.setBuffering(!0),setTimeout(()=>{Re.setBuffering(!1)},5e3))}};xf=k4([z("w3m-connecting-wc-mobile")],xf);const M4=q`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;var U4=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Au=class extends Nt{constructor(){var e;super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),we.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:((e=this.wallet)==null?void 0:e.name)??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),$`
      <wui-flex padding="xl" flexDirection="column" gap="xl" alignItems="center">
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40,n=this.wallet?this.wallet.name:void 0;return Re.setWcLinking(void 0),Re.setRecentWallet(this.wallet),$` <wui-qr-code
      size=${e}
      theme=${It.state.themeMode}
      uri=${this.uri}
      imageSrc=${ve(Xe.getWalletImage(this.wallet))}
      alt=${ve(n)}
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return $`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};Au.styles=M4;Au=U4([z("w3m-connecting-wc-qrcode")],Au);const B4=q`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;var L4=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Tu=class extends H{constructor(){var e;super(...arguments),this.dappImageUrl=(e=Ue.state.metadata)==null?void 0:e.icons,this.walletImageUrl=Et.getConnectedWalletImageUrl()}firstUpdated(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelectorAll("wui-visual-thumbnail");e!=null&&e[0]&&this.createAnimation(e[0],"translate(18px)"),e!=null&&e[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){var e;return $`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${(e=this.dappImageUrl)==null?void 0:e[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,n){e.animate([{transform:"translateX(0px)"},{transform:n}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};Tu.styles=B4;Tu=L4([z("w3m-connecting-siwe")],Tu);var j4=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Ef=class extends H{constructor(){var e;if(super(),this.wallet=(e=oe.state.data)==null?void 0:e.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");we.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return $`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${ve(Xe.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Ef=j4([z("w3m-connecting-wc-unsupported")],Ef);var F4=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let _f=class extends Nt{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel="Open and continue in a new browser tab",this.secondaryBtnIcon="externalLink",we.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:n,name:r}=this.wallet,{redirect:o,href:i}=le.formatUniversalUrl(n,this.uri);Re.setWcLinking({name:r,href:i}),Re.setRecentWallet(this.wallet),le.openHref(o,"_blank")}catch{this.error=!0}}};_f=F4([z("w3m-connecting-wc-web")],_f);const W4=q`
  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }
`;var Xc=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};function Cf(){var s,a,c,l,u,p,g;const t=(a=(s=oe.state.data)==null?void 0:s.connector)==null?void 0:a.name,e=(l=(c=oe.state.data)==null?void 0:c.wallet)==null?void 0:l.name,n=(p=(u=oe.state.data)==null?void 0:u.network)==null?void 0:p.name,r=e??t,o=We.getConnectors();return{Connect:`Connect ${o.length===1&&((g=o[0])==null?void 0:g.id)==="w3m-email"?"Email":""} Wallet`,Account:void 0,ConnectingExternal:r??"Connect Wallet",ConnectingWalletConnect:r??"WalletConnect",ConnectingSiwe:"Sign In",Networks:"Choose Network",SwitchNetwork:n??"Switch Network",AllWallets:"All Wallets",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",GetWallet:"Get a wallet",Downloads:r?`Get ${r}`:"Downloads",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",ApproveTransaction:"Approve Transaction",Transactions:"Activity",UpgradeEmailWallet:"Upgrade your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailWalletWaiting:"Approve Email"}}let ro=class extends H{constructor(){super(),this.unsubscribe=[],this.heading=Cf()[oe.state.view],this.buffering=!1,this.showBack=!1,this.unsubscribe.push(oe.subscribeKey("view",e=>{this.onViewChange(e),this.onHistoryChange()}),Re.subscribeKey("buffering",e=>this.buffering=e))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){return $`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.dynamicButtonTemplate()} ${this.titleTemplate()}
        <wui-icon-link
          ?disabled=${this.buffering}
          icon="close"
          @click=${this.onClose.bind(this)}
          data-testid="w3m-header-close"
        ></wui-icon-link>
      </wui-flex>
      ${this.separatorTemplate()}
    `}onWalletHelp(){we.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),oe.push("WhatIsAWallet")}async onClose(){nt.state.isSiweEnabled&&nt.state.status!=="success"&&await Re.disconnect(),ze.close()}titleTemplate(){return $`<wui-text variant="paragraph-700" color="fg-100">${this.heading}</wui-text>`}dynamicButtonTemplate(){const{view:e}=oe.state,n=e==="Connect",r=e==="ApproveTransaction";return this.showBack&&!r?$`<wui-icon-link
        id="dynamic"
        icon="chevronLeft"
        ?disabled=${this.buffering}
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:$`<wui-icon-link
      data-hidden=${!n}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}separatorTemplate(){return this.heading?$`<wui-separator></wui-separator>`:null}getPadding(){return this.heading?["l","2l","l","2l"]:["l","2l","0","2l"]}async onViewChange(e){var r;const n=(r=this.shadowRoot)==null?void 0:r.querySelector("wui-text");if(n){const o=Cf()[e];await n.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.heading=o,n.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})}}async onHistoryChange(){var r;const{history:e}=oe.state,n=(r=this.shadowRoot)==null?void 0:r.querySelector("#dynamic");e.length>1&&!this.showBack&&n?(await n.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,n.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):e.length<=1&&this.showBack&&n&&(await n.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,n.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){oe.state.view==="ConnectingSiwe"?oe.push("Connect"):oe.goBack()}};ro.styles=[W4];Xc([ee()],ro.prototype,"heading",void 0);Xc([ee()],ro.prototype,"buffering",void 0);Xc([ee()],ro.prototype,"showBack",void 0);ro=Xc([z("w3m-header")],ro);var E1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let Iu=class extends H{constructor(){super(...arguments),this.data=[]}render(){return $`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map(e=>$`
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${e.images.map(n=>$`<wui-visual name=${n}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${e.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${e.text}</wui-text>
            </wui-flex>
          `)}
      </wui-flex>
    `}};E1([D({type:Array})],Iu.prototype,"data",void 0);Iu=E1([z("w3m-help-widget")],Iu);const z4=q`
  wui-flex {
    background-color: var(--wui-gray-glass-005);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
  }
`;var H4=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let $u=class extends H{render(){const{termsConditionsUrl:e,privacyPolicyUrl:n}=Ue.state;return!e&&!n?null:$`
      <wui-flex .padding=${["m","s","s","s"]} justifyContent="center">
        <wui-text color="fg-250" variant="small-400" align="center">
          By connecting your wallet, you agree to our <br />
          ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-flex>
    `}andTemplate(){const{termsConditionsUrl:e,privacyPolicyUrl:n}=Ue.state;return e&&n?"and":""}termsTemplate(){const{termsConditionsUrl:e}=Ue.state;return e?$`<a href=${e}>Terms of Service</a>`:null}privacyTemplate(){const{privacyPolicyUrl:e}=Ue.state;return e?$`<a href=${e}>Privacy Policy</a>`:null}};$u.styles=[z4];$u=H4([z("w3m-legal-footer")],$u);const V4=q`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var _1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let rc=class extends H{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:n,play_store:r,chrome_store:o,homepage:i}=this.wallet,s=le.isMobile(),a=le.isIos(),c=le.isAndroid(),l=[n,r,i,o].filter(Boolean).length>1,u=Be.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return l&&!s?$`
        <wui-cta-button
          label=${`Don't have ${u}?`}
          buttonLabel="Get"
          @click=${()=>oe.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!l&&i?$`
        <wui-cta-button
          label=${`Don't have ${u}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:n&&a?$`
        <wui-cta-button
          label=${`Don't have ${u}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:r&&c?$`
        <wui-cta-button
          label=${`Don't have ${u}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&le.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&le.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&le.openHref(this.wallet.homepage,"_blank")}};rc.styles=[V4];_1([D({type:Object})],rc.prototype,"wallet",void 0);rc=_1([z("w3m-mobile-download-links")],rc);const Z4=q`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var C1=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};const G4={success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}};let ic=class extends H{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=et.state.open,this.unsubscribe.push(et.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){const{message:e,variant:n}=et.state,r=G4[n];return $`
      <wui-snackbar
        message=${e}
        backgroundColor=${r.backgroundColor}
        iconColor=${r.iconColor}
        icon=${r.icon}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout=setTimeout(()=>et.hide(),2500)):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};ic.styles=Z4;C1([ee()],ic.prototype,"open",void 0);ic=C1([z("w3m-snackbar")],ic);const q4=q`
  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 21px;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: var(--wui-spacing-xs);
  }

  wui-loading-spinner {
    right: var(--wui-spacing-m);
  }

  .alphaBanner {
    padding: 10px 12px 10px 10px;
    border-radius: var(--wui-border-radius-s);
    background: var(--wui-accent-glass-010);
    margin-bottom: var(--wui-spacing-s);
  }
`;var Js=function(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i};let di=class extends H{constructor(){super(),this.unsubscribe=[],this.formRef=Uc(),this.connectors=We.state.connectors,this.email="",this.loading=!1,this.error="",this.unsubscribe.push(We.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){var e;(e=this.formRef.value)==null||e.addEventListener("keydown",n=>{n.key==="Enter"&&this.onSubmitEmail(n)})}render(){const e=this.connectors.length>1;return this.connectors.find(r=>r.type==="EMAIL")?$`
      ${this.alphaWarningTemplate()}
      <form ${Bc(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          .errorMessage=${this.error}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>

      ${e?$`<wui-separator text="or"></wui-separator>`:null}
    `:null}alphaWarningTemplate(){return $`
          <wui-flex class="alphaBanner" gap="xs" alignItems="center" justifyContent="center">
            <wui-icon-box
              size="sm"
              icon="alpha"
              iconColor="accent-100"
              background="opaque"
              backgroundColor="accent-100"
            ></wui-icon-box>
            <wui-text variant="small-400" color="accent-100">
              This is an alpha version to test before launch
            </wui-text>
          </wui-flex>
        `}submitButtonTemplate(){return!this.loading&&this.email.length>3?$`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `:null}loadingTemplate(){return this.loading?$`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}onEmailInputChange(e){this.email=e.detail,this.error=""}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();const n=We.getEmailConnector();if(!n)throw new Error("w3m-email-login-widget: Email connector not found");const{action:r}=await n.provider.connectEmail({email:this.email});we.sendEvent({type:"track",event:"EMAIL_SUBMITTED"}),r==="VERIFY_OTP"?(we.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),oe.push("EmailVerifyOtp",{email:this.email})):r==="VERIFY_DEVICE"&&oe.push("EmailVerifyDevice",{email:this.email})}catch(n){const r=le.parseError(n);r!=null&&r.includes("Invalid email")?this.error="Invalid email. Try again.":et.showError(n)}finally{this.loading=!1}}onFocusEvent(){we.sendEvent({type:"track",event:"EMAIL_LOGIN_SELECTED"})}};di.styles=q4;Js([ee()],di.prototype,"connectors",void 0);Js([ee()],di.prototype,"email",void 0);Js([ee()],di.prototype,"loading",void 0);Js([ee()],di.prototype,"error",void 0);di=Js([z("w3m-email-login-widget")],di);let Sf=!1;class K4{constructor(e){this.initPromise=void 0,this.setIsConnected=n=>{ke.setIsConnected(n)},this.setCaipAddress=n=>{ke.setCaipAddress(n)},this.setBalance=(n,r)=>{ke.setBalance(n,r)},this.setProfileName=n=>{ke.setProfileName(n)},this.setProfileImage=n=>{ke.setProfileImage(n)},this.resetAccount=()=>{ke.resetAccount()},this.setCaipNetwork=n=>{Qe.setCaipNetwork(n)},this.getCaipNetwork=()=>Qe.state.caipNetwork,this.setRequestedCaipNetworks=n=>{Qe.setRequestedCaipNetworks(n)},this.getApprovedCaipNetworksData=()=>Qe.getApprovedCaipNetworksData(),this.resetNetwork=()=>{Qe.resetNetwork()},this.setConnectors=n=>{We.setConnectors(n)},this.addConnector=n=>{We.addConnector(n)},this.getConnectors=()=>We.getConnectors(),this.resetWcConnection=()=>{Re.resetWcConnection()},this.fetchIdentity=n=>pp.fetchIdentity(n),this.setAddressExplorerUrl=n=>{ke.setAddressExplorerUrl(n)},this.setSIWENonce=n=>{nt.setNonce(n)},this.setSIWESession=n=>{nt.setSession(n)},this.setSIWEStatus=n=>{nt.setStatus(n)},this.setSIWEMessage=n=>{nt.setMessage(n)},this.initControllers(e),this.initOrContinue()}async open(e){await this.initOrContinue(),ze.open(e)}async close(){await this.initOrContinue(),ze.close()}setLoading(e){ze.setLoading(e)}getThemeMode(){return It.state.themeMode}getThemeVariables(){return It.state.themeVariables}setThemeMode(e){It.setThemeMode(e),Pd(It.state.themeMode);try{const n=We.getEmailConnector();n&&n.provider.syncTheme({themeMode:It.getSnapshot().themeMode})}catch{console.info("Unable to sync theme to email connector")}}setThemeVariables(e){It.setThemeVariables(e),Sp(It.state.themeVariables);try{const n=We.getEmailConnector();n&&n.provider.syncTheme({themeVariables:It.getSnapshot().themeVariables})}catch{console.info("Unable to sync theme to email connector")}}subscribeTheme(e){return It.subscribe(e)}getState(){return{...Li.state}}subscribeState(e){return Li.subscribe(e)}getEvent(){return{...we.state}}subscribeEvents(e){return we.subscribe(e)}subscribeSIWEState(e){return nt.subscribe(e)}initControllers(e){if(Qe.setClient(e.networkControllerClient),Qe.setDefaultCaipNetwork(e.defaultChain),Ue.setProjectId(e.projectId),Ue.setIncludeWalletIds(e.includeWalletIds),Ue.setExcludeWalletIds(e.excludeWalletIds),Ue.setFeaturedWalletIds(e.featuredWalletIds),Ue.setTokens(e.tokens),Ue.setTermsConditionsUrl(e.termsConditionsUrl),Ue.setPrivacyPolicyUrl(e.privacyPolicyUrl),Ue.setCustomWallets(e.customWallets),Ue.setEnableAnalytics(e.enableAnalytics),Ue.setSdkVersion(e._sdkVersion),Re.setClient(e.connectionControllerClient),e.siweControllerClient){const n=e.siweControllerClient;nt.setSIWEClient(n)}e.metadata&&Ue.setMetadata(e.metadata),e.themeMode&&It.setThemeMode(e.themeMode),e.themeVariables&&It.setThemeVariables(e.themeVariables)}async initOrContinue(){return!this.initPromise&&!Sf&&le.isClient()&&(Sf=!0,this.initPromise=new Promise(async e=>{await Promise.all([Bi(()=>Promise.resolve().then(()=>D5),void 0),Bi(()=>Promise.resolve().then(()=>R5),void 0)]);const n=document.createElement("w3m-modal");document.body.insertAdjacentElement("beforeend",n),e()})),this.initPromise}}const me={WALLET_CONNECT_CONNECTOR_ID:"walletConnect",INJECTED_CONNECTOR_ID:"injected",COINBASE_CONNECTOR_ID:"coinbaseWallet",SAFE_CONNECTOR_ID:"safe",LEDGER_CONNECTOR_ID:"ledger",EIP6963_CONNECTOR_ID:"eip6963",EMAIL_CONNECTOR_ID:"w3mEmail",EIP155:"eip155",ADD_CHAIN_METHOD:"wallet_addEthereumChain",EIP6963_ANNOUNCE_EVENT:"eip6963:announceProvider",EIP6963_REQUEST_EVENT:"eip6963:requestProvider",VERSION:"3.5.7"},Un={ConnectorExplorerIds:{[me.COINBASE_CONNECTOR_ID]:"fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",[me.SAFE_CONNECTOR_ID]:"225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",[me.LEDGER_CONNECTOR_ID]:"19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927"},EIP155NetworkImageIds:{1:"692ed6ba-e569-459a-556a-776476829e00",42161:"600a9a04-c1b9-42ca-6785-9b4b6ff85200",43114:"30c46e53-e989-45fb-4549-be3bd4eb3b00",56:"93564157-2e8e-4ce7-81df-b264dbee9b00",250:"06b26297-fe0c-4733-5d6b-ffa5498aac00",10:"ab9c186a-c52f-464b-2906-ca59d760a400",137:"41d04d42-da3b-4453-8506-668cc0727900",100:"02b53f6a-e3d4-479e-1cb4-21178987d100",9001:"f926ff41-260d-4028-635e-91913fc28e00",324:"b310f07f-4ef7-49f3-7073-2a0a39685800",314:"5a73b3dd-af74-424e-cae0-0de859ee9400",4689:"34e68754-e536-40da-c153-6ef2e7188a00",1088:"3897a66d-40b9-4833-162f-a2c90531c900",1284:"161038da-44ae-4ec7-1208-0ea569454b00",1285:"f1d73bb6-5450-4e18-38f7-fb6484264a00",7777777:"845c60df-d429-4991-e687-91ae45791600",42220:"ab781bbc-ccc6-418d-d32d-789b15da1f00",8453:"7289c336-3981-4081-c5f4-efc26ac64a00",1313161554:"3ff73439-a619-4894-9262-4470c773a100"},ConnectorImageIds:{[me.COINBASE_CONNECTOR_ID]:"0c2840c3-5b04-4c44-9661-fbd4b49e1800",[me.SAFE_CONNECTOR_ID]:"461db637-8616-43ce-035a-d89b8a1d5800",[me.LEDGER_CONNECTOR_ID]:"54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",[me.WALLET_CONNECT_CONNECTOR_ID]:"ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",[me.INJECTED_CONNECTOR_ID]:"07ba87ed-43aa-4adf-4540-9e6a2b9cae00"},ConnectorNamesMap:{[me.INJECTED_CONNECTOR_ID]:"Browser Wallet",[me.WALLET_CONNECT_CONNECTOR_ID]:"WalletConnect",[me.COINBASE_CONNECTOR_ID]:"Coinbase",[me.LEDGER_CONNECTOR_ID]:"Ledger",[me.SAFE_CONNECTOR_ID]:"Safe"},ConnectorTypesMap:{[me.INJECTED_CONNECTOR_ID]:"INJECTED",[me.WALLET_CONNECT_CONNECTOR_ID]:"WALLET_CONNECT",[me.EIP6963_CONNECTOR_ID]:"ANNOUNCED",[me.EMAIL_CONNECTOR_ID]:"EMAIL"},WalletConnectRpcChainIds:[1,5,11155111,10,420,42161,421613,137,80001,42220,1313161554,1313161555,56,97,43114,43113,100,8453,84531,7777777,999,324,280]},xi={caipNetworkIdToNumber(t){return t?Number(t.split(":")[1]):void 0},getCaipTokens(t){if(!t)return;const e={};return Object.entries(t).forEach(([n,r])=>{e[`${me.EIP155}:${n}`]=r}),e}};function Y4(t){if(t)return{id:`${me.EIP155}:${t.id}`,name:t.name,imageId:Un.EIP155NetworkImageIds[t.id]}}const J4="wagmi.wallet";class X4 extends K4{constructor(e){const{wagmiConfig:n,siweConfig:r,chains:o,defaultChain:i,tokens:s,_sdkVersion:a,...c}=e;if(!n)throw new Error("web3modal:constructor - wagmiConfig is undefined");if(!c.projectId)throw new Error("web3modal:constructor - projectId is undefined");const l={switchCaipNetwork:async p=>{const g=xi.caipNetworkIdToNumber(p==null?void 0:p.id);g&&await Ad({chainId:g})},async getApprovedCaipNetworksData(){var g,m,w,v;const p=localStorage.getItem(J4);if(p!=null&&p.includes(me.EMAIL_CONNECTOR_ID))return{supportsAllNetworks:!1,approvedCaipNetworkIds:Un.WalletConnectRpcChainIds.map(_=>`${me.EIP155}:${_}`)};if(p!=null&&p.includes(me.WALLET_CONNECT_CONNECTOR_ID)){const _=n.connectors.find(C=>C.id===me.WALLET_CONNECT_CONNECTOR_ID);if(!_)throw new Error("networkControllerClient:getApprovedCaipNetworks - connector is undefined");const b=(m=(g=(await _.getProvider()).signer)==null?void 0:g.session)==null?void 0:m.namespaces,E=(w=b==null?void 0:b[me.EIP155])==null?void 0:w.methods,x=(v=b==null?void 0:b[me.EIP155])==null?void 0:v.chains;return{supportsAllNetworks:E==null?void 0:E.includes(me.ADD_CHAIN_METHOD),approvedCaipNetworkIds:x}}return{approvedCaipNetworkIds:void 0,supportsAllNetworks:!0}}},u={connectWalletConnect:async p=>{var w;const g=n.connectors.find(v=>v.id===me.WALLET_CONNECT_CONNECTOR_ID);if(!g)throw new Error("connectionControllerClient:getWalletConnectUri - connector is undefined");g.on("message",v=>{v.type==="display_uri"&&(p(v.data),g.removeAllListeners())});const m=xi.caipNetworkIdToNumber((w=this.getCaipNetwork())==null?void 0:w.id);await L0({connector:g,chainId:m})},connectExternal:async({id:p,provider:g,info:m})=>{var _,I;const w=n.connectors.find(b=>b.id===p);if(!w)throw new Error("connectionControllerClient:connectExternal - connector is undefined");g&&m&&w.id===me.EIP6963_CONNECTOR_ID&&((_=w.setEip6963Wallet)==null||_.call(w,{provider:g,info:m}));const v=xi.caipNetworkIdToNumber((I=this.getCaipNetwork())==null?void 0:I.id);await L0({connector:w,chainId:v})},checkInstalled:p=>{const g=this.getConnectors().filter(w=>w.type==="ANNOUNCED"),m=this.getConnectors().find(w=>w.type==="INJECTED");return p?g.length&&p.some(v=>g.some(_=>{var I;return((I=_.info)==null?void 0:I.rdns)===v}))?!0:m&&window!=null&&window.ethereum?p.some(w=>{var v;return!!((v=window.ethereum)!=null&&v[String(w)])}):!1:!!window.ethereum},disconnect:async()=>{var p;await up(),(p=r==null?void 0:r.options)!=null&&p.signOutOnDisconnect&&await r.signOut()},signMessage:async p=>Cb({message:p})};super({networkControllerClient:l,connectionControllerClient:u,siweControllerClient:r,defaultChain:Y4(i),tokens:xi.getCaipTokens(s),_sdkVersion:a??`html-wagmi-${me.VERSION}`,...c}),this.hasSyncedConnectedAccount=!1,this.options=void 0,this.options=e,this.syncRequestedNetworks(o),this.syncConnectors(n),this.syncEmailConnector(n),this.listenEIP6963Connector(n),this.listenEmailConnector(n),dp(()=>this.syncAccount()),Sb(()=>this.syncNetwork())}getState(){const e=super.getState();return{...e,selectedNetworkId:xi.caipNetworkIdToNumber(e.selectedNetworkId)}}subscribeState(e){return super.subscribeState(n=>e({...n,selectedNetworkId:xi.caipNetworkIdToNumber(n.selectedNetworkId)}))}syncRequestedNetworks(e){const n=e==null?void 0:e.map(r=>{var o,i;return{id:`${me.EIP155}:${r.id}`,name:r.name,imageId:Un.EIP155NetworkImageIds[r.id],imageUrl:(i=(o=this.options)==null?void 0:o.chainImages)==null?void 0:i[r.id]}});this.setRequestedCaipNetworks(n??[])}async syncAccount(){const{address:e,isConnected:n}=Da(),{chain:r}=ts();if(this.resetAccount(),n&&e&&r){const o=`${me.EIP155}:${r.id}:${e}`;this.setIsConnected(n),this.setCaipAddress(o),await Promise.all([this.syncProfile(e,r),this.syncBalance(e,r),this.getApprovedCaipNetworksData()]),this.hasSyncedConnectedAccount=!0}else!n&&this.hasSyncedConnectedAccount&&(this.resetWcConnection(),this.resetNetwork())}async syncNetwork(){var o,i,s,a;const{address:e,isConnected:n}=Da(),{chain:r}=ts();if(r){const c=String(r.id),l=`${me.EIP155}:${c}`;if(this.setCaipNetwork({id:l,name:r.name,imageId:Un.EIP155NetworkImageIds[r.id],imageUrl:(i=(o=this.options)==null?void 0:o.chainImages)==null?void 0:i[r.id]}),n&&e){const u=`${me.EIP155}:${r.id}:${e}`;if(this.setCaipAddress(u),(a=(s=r.blockExplorers)==null?void 0:s.default)!=null&&a.url){const p=`${r.blockExplorers.default.url}/address/${e}`;this.setAddressExplorerUrl(p)}else this.setAddressExplorerUrl(void 0);this.hasSyncedConnectedAccount&&(await this.syncProfile(e,r),await this.syncBalance(e,r))}}}async syncProfile(e,n){if(n.id!==rp.id){this.setProfileName(null),this.setProfileImage(null);return}try{const{name:r,avatar:o}=await this.fetchIdentity({caipChainId:`${me.EIP155}:${n.id}`,address:e});this.setProfileName(r),this.setProfileImage(o)}catch{const r=await Tb({address:e,chainId:n.id});if(r){this.setProfileName(r);const o=await Ab({name:r,chainId:n.id});o&&this.setProfileImage(o)}}}async syncBalance(e,n){var o,i,s;const r=await _b({address:e,chainId:n.id,token:(s=(i=(o=this.options)==null?void 0:o.tokens)==null?void 0:i[n.id])==null?void 0:s.address});this.setBalance(r.formatted,r.symbol)}syncConnectors(e){const n=[];e.connectors.forEach(({id:r,name:o})=>{var i,s;[me.EIP6963_CONNECTOR_ID,me.EMAIL_CONNECTOR_ID].includes(r)||n.push({id:r,explorerId:Un.ConnectorExplorerIds[r],imageId:Un.ConnectorImageIds[r],imageUrl:(s=(i=this.options)==null?void 0:i.connectorImages)==null?void 0:s[r],name:Un.ConnectorNamesMap[r]??o,type:Un.ConnectorTypesMap[r]??"EXTERNAL"})}),this.setConnectors(n)}async syncEmailConnector(e){const n=e.connectors.find(({id:r})=>r==="w3mEmail");if(n){const r=await n.getProvider();this.addConnector({id:me.EMAIL_CONNECTOR_ID,type:"EMAIL",name:"Email",provider:r})}}eip6963EventHandler(e,n){var r,o;if(n.detail){const{info:i,provider:s}=n.detail;this.getConnectors().find(l=>l.name===i.name)||(this.addConnector({id:me.EIP6963_CONNECTOR_ID,type:"ANNOUNCED",imageUrl:i.icon??((o=(r=this.options)==null?void 0:r.connectorImages)==null?void 0:o[me.EIP6963_CONNECTOR_ID]),name:i.name,provider:s,info:i}),e.isAuthorized({info:i,provider:s}))}}listenEIP6963Connector(e){const n=e.connectors.find(r=>r.id===me.EIP6963_CONNECTOR_ID);if(typeof window<"u"&&n){const r=this.eip6963EventHandler.bind(this,n);window.addEventListener(me.EIP6963_ANNOUNCE_EVENT,r),window.dispatchEvent(new Event(me.EIP6963_REQUEST_EVENT))}}async listenEmailConnector(e){const n=e.connectors.find(r=>r.id===me.EMAIL_CONNECTOR_ID);if(typeof window<"u"&&n){super.setLoading(!0);const r=await n.getProvider(),o=r.getLoginEmailUsed();super.setLoading(o),r.onRpcRequest(()=>{super.open({view:"ApproveTransaction"})}),r.onRpcResponse(()=>{super.close()}),r.onIsConnected(()=>{super.setLoading(!1)})}}}var ha=function(t,e,n,r,o){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!o)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?o.call(t,n):o?o.value=n:e.set(t,n),n},Nr=function(t,e,n,r){if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?t!==e||!r:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(t):r?r.value:e.get(t)},ya,Qt;const pa="connectedRdns";class Q4 extends _d{constructor(e){super({chains:e.chains,options:{shimDisconnect:!0}}),this.id="eip6963",this.name="EIP6963",ya.set(this,void 0),Qt.set(this,void 0),this.onAccountsChanged=n=>{var r;n.length===0?((r=this.storage)==null||r.removeItem(pa),this.emit("disconnect")):n[0]&&this.emit("change",{account:Vt(n[0])})},ha(this,ya,this.options.getProvider(),"f")}async connect(e){var r;const n=await super.connect(e);return Nr(this,Qt,"f")&&((r=this.storage)==null||r.setItem(pa,Nr(this,Qt,"f").info.rdns)),n}async disconnect(){var e;await super.disconnect(),(e=this.storage)==null||e.removeItem(pa),ha(this,Qt,void 0,"f")}async isAuthorized(e){var r;const n=(r=this.storage)==null?void 0:r.getItem(pa);if(n){if(Nr(this,Qt,"f")&&n===Nr(this,Qt,"f").info.rdns&&(await Nr(this,Qt,"f").provider.request({method:"eth_accounts"})).length)return!0;e&&ha(this,Qt,e,"f")}return super.isAuthorized()}async getProvider(){var e;return Promise.resolve(((e=Nr(this,Qt,"f"))==null?void 0:e.provider)??Nr(this,ya,"f"))}setEip6963Wallet(e){ha(this,Qt,e,"f")}}ya=new WeakMap,Qt=new WeakMap;class e8 extends Dc{constructor(e){super(e),this.id="w3mEmail",this.name="Web3Modal Email",this.ready=!0,this.provider={},typeof window<"u"&&(this.provider=new C4(e.options.projectId))}async getProvider(){return Promise.resolve(this.provider)}async connect(e={}){const{address:n,chainId:r}=await this.provider.connect({chainId:e.chainId});return{account:n,chain:{id:r,unsupported:this.isChainUnsupported(1)}}}async switchChain(e){try{const n=this.chains.find(o=>o.id===e);if(!n)throw new sn(new Error("chain not found on connector."));await this.provider.switchNetwork(e);const r=this.isChainUnsupported(e);return this.emit("change",{chain:{id:e,unsupported:r}}),n}catch(n){throw n instanceof Error?new sn(n):n}}async disconnect(){await this.provider.disconnect()}async getAccount(){const{address:e}=await this.provider.connect();return e}async getChainId(){const{chainId:e}=await this.provider.getChainId();return e}async getWalletClient(){const{address:e,chainId:n}=await this.provider.connect();return Promise.resolve(Ic({account:e,chain:{id:n},transport:Ac(this.provider)}))}async isAuthorized(){const{isConnected:e}=await this.provider.isConnected();return e}onAccountsChanged(){}onChainChanged(){}onDisconnect(){}}var S1={},Qc={};Qc.byteLength=r8;Qc.toByteArray=o8;Qc.fromByteArray=c8;var En=[],Ht=[],t8=typeof Uint8Array<"u"?Uint8Array:Array,Ml="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var Ei=0,n8=Ml.length;Ei<n8;++Ei)En[Ei]=Ml[Ei],Ht[Ml.charCodeAt(Ei)]=Ei;Ht[45]=62;Ht[95]=63;function A1(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");n===-1&&(n=e);var r=n===e?0:4-n%4;return[n,r]}function r8(t){var e=A1(t),n=e[0],r=e[1];return(n+r)*3/4-r}function i8(t,e,n){return(e+n)*3/4-n}function o8(t){var e,n=A1(t),r=n[0],o=n[1],i=new t8(i8(t,r,o)),s=0,a=o>0?r-4:r,c;for(c=0;c<a;c+=4)e=Ht[t.charCodeAt(c)]<<18|Ht[t.charCodeAt(c+1)]<<12|Ht[t.charCodeAt(c+2)]<<6|Ht[t.charCodeAt(c+3)],i[s++]=e>>16&255,i[s++]=e>>8&255,i[s++]=e&255;return o===2&&(e=Ht[t.charCodeAt(c)]<<2|Ht[t.charCodeAt(c+1)]>>4,i[s++]=e&255),o===1&&(e=Ht[t.charCodeAt(c)]<<10|Ht[t.charCodeAt(c+1)]<<4|Ht[t.charCodeAt(c+2)]>>2,i[s++]=e>>8&255,i[s++]=e&255),i}function s8(t){return En[t>>18&63]+En[t>>12&63]+En[t>>6&63]+En[t&63]}function a8(t,e,n){for(var r,o=[],i=e;i<n;i+=3)r=(t[i]<<16&16711680)+(t[i+1]<<8&65280)+(t[i+2]&255),o.push(s8(r));return o.join("")}function c8(t){for(var e,n=t.length,r=n%3,o=[],i=16383,s=0,a=n-r;s<a;s+=i)o.push(a8(t,s,s+i>a?a:s+i));return r===1?(e=t[n-1],o.push(En[e>>2]+En[e<<4&63]+"==")):r===2&&(e=(t[n-2]<<8)+t[n-1],o.push(En[e>>10]+En[e>>4&63]+En[e<<2&63]+"=")),o.join("")}var Jd={};/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */Jd.read=function(t,e,n,r,o){var i,s,a=o*8-r-1,c=(1<<a)-1,l=c>>1,u=-7,p=n?o-1:0,g=n?-1:1,m=t[e+p];for(p+=g,i=m&(1<<-u)-1,m>>=-u,u+=a;u>0;i=i*256+t[e+p],p+=g,u-=8);for(s=i&(1<<-u)-1,i>>=-u,u+=r;u>0;s=s*256+t[e+p],p+=g,u-=8);if(i===0)i=1-l;else{if(i===c)return s?NaN:(m?-1:1)*(1/0);s=s+Math.pow(2,r),i=i-l}return(m?-1:1)*s*Math.pow(2,i-r)};Jd.write=function(t,e,n,r,o,i){var s,a,c,l=i*8-o-1,u=(1<<l)-1,p=u>>1,g=o===23?Math.pow(2,-24)-Math.pow(2,-77):0,m=r?0:i-1,w=r?1:-1,v=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=u):(s=Math.floor(Math.log(e)/Math.LN2),e*(c=Math.pow(2,-s))<1&&(s--,c*=2),s+p>=1?e+=g/c:e+=g*Math.pow(2,1-p),e*c>=2&&(s++,c/=2),s+p>=u?(a=0,s=u):s+p>=1?(a=(e*c-1)*Math.pow(2,o),s=s+p):(a=e*Math.pow(2,p-1)*Math.pow(2,o),s=0));o>=8;t[n+m]=a&255,m+=w,a/=256,o-=8);for(s=s<<o|a,l+=o;l>0;t[n+m]=s&255,m+=w,s/=256,l-=8);t[n+m-w]|=v*128};/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */(function(t){const e=Qc,n=Jd,r=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;t.Buffer=a,t.SlowBuffer=b,t.INSPECT_MAX_BYTES=50;const o=2147483647;t.kMaxLength=o,a.TYPED_ARRAY_SUPPORT=i(),!a.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function i(){try{const y=new Uint8Array(1),d={foo:function(){return 42}};return Object.setPrototypeOf(d,Uint8Array.prototype),Object.setPrototypeOf(y,d),y.foo()===42}catch{return!1}}Object.defineProperty(a.prototype,"parent",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.buffer}}),Object.defineProperty(a.prototype,"offset",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.byteOffset}});function s(y){if(y>o)throw new RangeError('The value "'+y+'" is invalid for option "size"');const d=new Uint8Array(y);return Object.setPrototypeOf(d,a.prototype),d}function a(y,d,h){if(typeof y=="number"){if(typeof d=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return p(y)}return c(y,d,h)}a.poolSize=8192;function c(y,d,h){if(typeof y=="string")return g(y,d);if(ArrayBuffer.isView(y))return w(y);if(y==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof y);if(je(y,ArrayBuffer)||y&&je(y.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(je(y,SharedArrayBuffer)||y&&je(y.buffer,SharedArrayBuffer)))return v(y,d,h);if(typeof y=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');const S=y.valueOf&&y.valueOf();if(S!=null&&S!==y)return a.from(S,d,h);const P=_(y);if(P)return P;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof y[Symbol.toPrimitive]=="function")return a.from(y[Symbol.toPrimitive]("string"),d,h);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof y)}a.from=function(y,d,h){return c(y,d,h)},Object.setPrototypeOf(a.prototype,Uint8Array.prototype),Object.setPrototypeOf(a,Uint8Array);function l(y){if(typeof y!="number")throw new TypeError('"size" argument must be of type number');if(y<0)throw new RangeError('The value "'+y+'" is invalid for option "size"')}function u(y,d,h){return l(y),y<=0?s(y):d!==void 0?typeof h=="string"?s(y).fill(d,h):s(y).fill(d):s(y)}a.alloc=function(y,d,h){return u(y,d,h)};function p(y){return l(y),s(y<0?0:I(y)|0)}a.allocUnsafe=function(y){return p(y)},a.allocUnsafeSlow=function(y){return p(y)};function g(y,d){if((typeof d!="string"||d==="")&&(d="utf8"),!a.isEncoding(d))throw new TypeError("Unknown encoding: "+d);const h=E(y,d)|0;let S=s(h);const P=S.write(y,d);return P!==h&&(S=S.slice(0,P)),S}function m(y){const d=y.length<0?0:I(y.length)|0,h=s(d);for(let S=0;S<d;S+=1)h[S]=y[S]&255;return h}function w(y){if(je(y,Uint8Array)){const d=new Uint8Array(y);return v(d.buffer,d.byteOffset,d.byteLength)}return m(y)}function v(y,d,h){if(d<0||y.byteLength<d)throw new RangeError('"offset" is outside of buffer bounds');if(y.byteLength<d+(h||0))throw new RangeError('"length" is outside of buffer bounds');let S;return d===void 0&&h===void 0?S=new Uint8Array(y):h===void 0?S=new Uint8Array(y,d):S=new Uint8Array(y,d,h),Object.setPrototypeOf(S,a.prototype),S}function _(y){if(a.isBuffer(y)){const d=I(y.length)|0,h=s(d);return h.length===0||y.copy(h,0,0,d),h}if(y.length!==void 0)return typeof y.length!="number"||it(y.length)?s(0):m(y);if(y.type==="Buffer"&&Array.isArray(y.data))return m(y.data)}function I(y){if(y>=o)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o.toString(16)+" bytes");return y|0}function b(y){return+y!=y&&(y=0),a.alloc(+y)}a.isBuffer=function(d){return d!=null&&d._isBuffer===!0&&d!==a.prototype},a.compare=function(d,h){if(je(d,Uint8Array)&&(d=a.from(d,d.offset,d.byteLength)),je(h,Uint8Array)&&(h=a.from(h,h.offset,h.byteLength)),!a.isBuffer(d)||!a.isBuffer(h))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(d===h)return 0;let S=d.length,P=h.length;for(let O=0,U=Math.min(S,P);O<U;++O)if(d[O]!==h[O]){S=d[O],P=h[O];break}return S<P?-1:P<S?1:0},a.isEncoding=function(d){switch(String(d).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(d,h){if(!Array.isArray(d))throw new TypeError('"list" argument must be an Array of Buffers');if(d.length===0)return a.alloc(0);let S;if(h===void 0)for(h=0,S=0;S<d.length;++S)h+=d[S].length;const P=a.allocUnsafe(h);let O=0;for(S=0;S<d.length;++S){let U=d[S];if(je(U,Uint8Array))O+U.length>P.length?(a.isBuffer(U)||(U=a.from(U)),U.copy(P,O)):Uint8Array.prototype.set.call(P,U,O);else if(a.isBuffer(U))U.copy(P,O);else throw new TypeError('"list" argument must be an Array of Buffers');O+=U.length}return P};function E(y,d){if(a.isBuffer(y))return y.length;if(ArrayBuffer.isView(y)||je(y,ArrayBuffer))return y.byteLength;if(typeof y!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof y);const h=y.length,S=arguments.length>2&&arguments[2]===!0;if(!S&&h===0)return 0;let P=!1;for(;;)switch(d){case"ascii":case"latin1":case"binary":return h;case"utf8":case"utf-8":return Xn(y).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return h*2;case"hex":return h>>>1;case"base64":return ct(y).length;default:if(P)return S?-1:Xn(y).length;d=(""+d).toLowerCase(),P=!0}}a.byteLength=E;function x(y,d,h){let S=!1;if((d===void 0||d<0)&&(d=0),d>this.length||((h===void 0||h>this.length)&&(h=this.length),h<=0)||(h>>>=0,d>>>=0,h<=d))return"";for(y||(y="utf8");;)switch(y){case"hex":return X(this,d,h);case"utf8":case"utf-8":return W(this,d,h);case"ascii":return L(this,d,h);case"latin1":case"binary":return F(this,d,h);case"base64":return ie(this,d,h);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ne(this,d,h);default:if(S)throw new TypeError("Unknown encoding: "+y);y=(y+"").toLowerCase(),S=!0}}a.prototype._isBuffer=!0;function C(y,d,h){const S=y[d];y[d]=y[h],y[h]=S}a.prototype.swap16=function(){const d=this.length;if(d%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let h=0;h<d;h+=2)C(this,h,h+1);return this},a.prototype.swap32=function(){const d=this.length;if(d%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let h=0;h<d;h+=4)C(this,h,h+3),C(this,h+1,h+2);return this},a.prototype.swap64=function(){const d=this.length;if(d%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let h=0;h<d;h+=8)C(this,h,h+7),C(this,h+1,h+6),C(this,h+2,h+5),C(this,h+3,h+4);return this},a.prototype.toString=function(){const d=this.length;return d===0?"":arguments.length===0?W(this,0,d):x.apply(this,arguments)},a.prototype.toLocaleString=a.prototype.toString,a.prototype.equals=function(d){if(!a.isBuffer(d))throw new TypeError("Argument must be a Buffer");return this===d?!0:a.compare(this,d)===0},a.prototype.inspect=function(){let d="";const h=t.INSPECT_MAX_BYTES;return d=this.toString("hex",0,h).replace(/(.{2})/g,"$1 ").trim(),this.length>h&&(d+=" ... "),"<Buffer "+d+">"},r&&(a.prototype[r]=a.prototype.inspect),a.prototype.compare=function(d,h,S,P,O){if(je(d,Uint8Array)&&(d=a.from(d,d.offset,d.byteLength)),!a.isBuffer(d))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof d);if(h===void 0&&(h=0),S===void 0&&(S=d?d.length:0),P===void 0&&(P=0),O===void 0&&(O=this.length),h<0||S>d.length||P<0||O>this.length)throw new RangeError("out of range index");if(P>=O&&h>=S)return 0;if(P>=O)return-1;if(h>=S)return 1;if(h>>>=0,S>>>=0,P>>>=0,O>>>=0,this===d)return 0;let U=O-P,ce=S-h;const $e=Math.min(U,ce),Ze=this.slice(P,O),Je=d.slice(h,S);for(let Fe=0;Fe<$e;++Fe)if(Ze[Fe]!==Je[Fe]){U=Ze[Fe],ce=Je[Fe];break}return U<ce?-1:ce<U?1:0};function A(y,d,h,S,P){if(y.length===0)return-1;if(typeof h=="string"?(S=h,h=0):h>2147483647?h=2147483647:h<-2147483648&&(h=-2147483648),h=+h,it(h)&&(h=P?0:y.length-1),h<0&&(h=y.length+h),h>=y.length){if(P)return-1;h=y.length-1}else if(h<0)if(P)h=0;else return-1;if(typeof d=="string"&&(d=a.from(d,S)),a.isBuffer(d))return d.length===0?-1:f(y,d,h,S,P);if(typeof d=="number")return d=d&255,typeof Uint8Array.prototype.indexOf=="function"?P?Uint8Array.prototype.indexOf.call(y,d,h):Uint8Array.prototype.lastIndexOf.call(y,d,h):f(y,[d],h,S,P);throw new TypeError("val must be string, number or Buffer")}function f(y,d,h,S,P){let O=1,U=y.length,ce=d.length;if(S!==void 0&&(S=String(S).toLowerCase(),S==="ucs2"||S==="ucs-2"||S==="utf16le"||S==="utf-16le")){if(y.length<2||d.length<2)return-1;O=2,U/=2,ce/=2,h/=2}function $e(Je,Fe){return O===1?Je[Fe]:Je.readUInt16BE(Fe*O)}let Ze;if(P){let Je=-1;for(Ze=h;Ze<U;Ze++)if($e(y,Ze)===$e(d,Je===-1?0:Ze-Je)){if(Je===-1&&(Je=Ze),Ze-Je+1===ce)return Je*O}else Je!==-1&&(Ze-=Ze-Je),Je=-1}else for(h+ce>U&&(h=U-ce),Ze=h;Ze>=0;Ze--){let Je=!0;for(let Fe=0;Fe<ce;Fe++)if($e(y,Ze+Fe)!==$e(d,Fe)){Je=!1;break}if(Je)return Ze}return-1}a.prototype.includes=function(d,h,S){return this.indexOf(d,h,S)!==-1},a.prototype.indexOf=function(d,h,S){return A(this,d,h,S,!0)},a.prototype.lastIndexOf=function(d,h,S){return A(this,d,h,S,!1)};function T(y,d,h,S){h=Number(h)||0;const P=y.length-h;S?(S=Number(S),S>P&&(S=P)):S=P;const O=d.length;S>O/2&&(S=O/2);let U;for(U=0;U<S;++U){const ce=parseInt(d.substr(U*2,2),16);if(it(ce))return U;y[h+U]=ce}return U}function R(y,d,h,S){return tt(Xn(d,y.length-h),y,h,S)}function k(y,d,h,S){return tt(wo(d),y,h,S)}function M(y,d,h,S){return tt(ct(d),y,h,S)}function Y(y,d,h,S){return tt(ra(d,y.length-h),y,h,S)}a.prototype.write=function(d,h,S,P){if(h===void 0)P="utf8",S=this.length,h=0;else if(S===void 0&&typeof h=="string")P=h,S=this.length,h=0;else if(isFinite(h))h=h>>>0,isFinite(S)?(S=S>>>0,P===void 0&&(P="utf8")):(P=S,S=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");const O=this.length-h;if((S===void 0||S>O)&&(S=O),d.length>0&&(S<0||h<0)||h>this.length)throw new RangeError("Attempt to write outside buffer bounds");P||(P="utf8");let U=!1;for(;;)switch(P){case"hex":return T(this,d,h,S);case"utf8":case"utf-8":return R(this,d,h,S);case"ascii":case"latin1":case"binary":return k(this,d,h,S);case"base64":return M(this,d,h,S);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Y(this,d,h,S);default:if(U)throw new TypeError("Unknown encoding: "+P);P=(""+P).toLowerCase(),U=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function ie(y,d,h){return d===0&&h===y.length?e.fromByteArray(y):e.fromByteArray(y.slice(d,h))}function W(y,d,h){h=Math.min(y.length,h);const S=[];let P=d;for(;P<h;){const O=y[P];let U=null,ce=O>239?4:O>223?3:O>191?2:1;if(P+ce<=h){let $e,Ze,Je,Fe;switch(ce){case 1:O<128&&(U=O);break;case 2:$e=y[P+1],($e&192)===128&&(Fe=(O&31)<<6|$e&63,Fe>127&&(U=Fe));break;case 3:$e=y[P+1],Ze=y[P+2],($e&192)===128&&(Ze&192)===128&&(Fe=(O&15)<<12|($e&63)<<6|Ze&63,Fe>2047&&(Fe<55296||Fe>57343)&&(U=Fe));break;case 4:$e=y[P+1],Ze=y[P+2],Je=y[P+3],($e&192)===128&&(Ze&192)===128&&(Je&192)===128&&(Fe=(O&15)<<18|($e&63)<<12|(Ze&63)<<6|Je&63,Fe>65535&&Fe<1114112&&(U=Fe))}}U===null?(U=65533,ce=1):U>65535&&(U-=65536,S.push(U>>>10&1023|55296),U=56320|U&1023),S.push(U),P+=ce}return B(S)}const j=4096;function B(y){const d=y.length;if(d<=j)return String.fromCharCode.apply(String,y);let h="",S=0;for(;S<d;)h+=String.fromCharCode.apply(String,y.slice(S,S+=j));return h}function L(y,d,h){let S="";h=Math.min(y.length,h);for(let P=d;P<h;++P)S+=String.fromCharCode(y[P]&127);return S}function F(y,d,h){let S="";h=Math.min(y.length,h);for(let P=d;P<h;++P)S+=String.fromCharCode(y[P]);return S}function X(y,d,h){const S=y.length;(!d||d<0)&&(d=0),(!h||h<0||h>S)&&(h=S);let P="";for(let O=d;O<h;++O)P+=ut[y[O]];return P}function ne(y,d,h){const S=y.slice(d,h);let P="";for(let O=0;O<S.length-1;O+=2)P+=String.fromCharCode(S[O]+S[O+1]*256);return P}a.prototype.slice=function(d,h){const S=this.length;d=~~d,h=h===void 0?S:~~h,d<0?(d+=S,d<0&&(d=0)):d>S&&(d=S),h<0?(h+=S,h<0&&(h=0)):h>S&&(h=S),h<d&&(h=d);const P=this.subarray(d,h);return Object.setPrototypeOf(P,a.prototype),P};function Q(y,d,h){if(y%1!==0||y<0)throw new RangeError("offset is not uint");if(y+d>h)throw new RangeError("Trying to access beyond buffer length")}a.prototype.readUintLE=a.prototype.readUIntLE=function(d,h,S){d=d>>>0,h=h>>>0,S||Q(d,h,this.length);let P=this[d],O=1,U=0;for(;++U<h&&(O*=256);)P+=this[d+U]*O;return P},a.prototype.readUintBE=a.prototype.readUIntBE=function(d,h,S){d=d>>>0,h=h>>>0,S||Q(d,h,this.length);let P=this[d+--h],O=1;for(;h>0&&(O*=256);)P+=this[d+--h]*O;return P},a.prototype.readUint8=a.prototype.readUInt8=function(d,h){return d=d>>>0,h||Q(d,1,this.length),this[d]},a.prototype.readUint16LE=a.prototype.readUInt16LE=function(d,h){return d=d>>>0,h||Q(d,2,this.length),this[d]|this[d+1]<<8},a.prototype.readUint16BE=a.prototype.readUInt16BE=function(d,h){return d=d>>>0,h||Q(d,2,this.length),this[d]<<8|this[d+1]},a.prototype.readUint32LE=a.prototype.readUInt32LE=function(d,h){return d=d>>>0,h||Q(d,4,this.length),(this[d]|this[d+1]<<8|this[d+2]<<16)+this[d+3]*16777216},a.prototype.readUint32BE=a.prototype.readUInt32BE=function(d,h){return d=d>>>0,h||Q(d,4,this.length),this[d]*16777216+(this[d+1]<<16|this[d+2]<<8|this[d+3])},a.prototype.readBigUInt64LE=Ve(function(d){d=d>>>0,Oe(d,"offset");const h=this[d],S=this[d+7];(h===void 0||S===void 0)&&kt(d,this.length-8);const P=h+this[++d]*2**8+this[++d]*2**16+this[++d]*2**24,O=this[++d]+this[++d]*2**8+this[++d]*2**16+S*2**24;return BigInt(P)+(BigInt(O)<<BigInt(32))}),a.prototype.readBigUInt64BE=Ve(function(d){d=d>>>0,Oe(d,"offset");const h=this[d],S=this[d+7];(h===void 0||S===void 0)&&kt(d,this.length-8);const P=h*2**24+this[++d]*2**16+this[++d]*2**8+this[++d],O=this[++d]*2**24+this[++d]*2**16+this[++d]*2**8+S;return(BigInt(P)<<BigInt(32))+BigInt(O)}),a.prototype.readIntLE=function(d,h,S){d=d>>>0,h=h>>>0,S||Q(d,h,this.length);let P=this[d],O=1,U=0;for(;++U<h&&(O*=256);)P+=this[d+U]*O;return O*=128,P>=O&&(P-=Math.pow(2,8*h)),P},a.prototype.readIntBE=function(d,h,S){d=d>>>0,h=h>>>0,S||Q(d,h,this.length);let P=h,O=1,U=this[d+--P];for(;P>0&&(O*=256);)U+=this[d+--P]*O;return O*=128,U>=O&&(U-=Math.pow(2,8*h)),U},a.prototype.readInt8=function(d,h){return d=d>>>0,h||Q(d,1,this.length),this[d]&128?(255-this[d]+1)*-1:this[d]},a.prototype.readInt16LE=function(d,h){d=d>>>0,h||Q(d,2,this.length);const S=this[d]|this[d+1]<<8;return S&32768?S|4294901760:S},a.prototype.readInt16BE=function(d,h){d=d>>>0,h||Q(d,2,this.length);const S=this[d+1]|this[d]<<8;return S&32768?S|4294901760:S},a.prototype.readInt32LE=function(d,h){return d=d>>>0,h||Q(d,4,this.length),this[d]|this[d+1]<<8|this[d+2]<<16|this[d+3]<<24},a.prototype.readInt32BE=function(d,h){return d=d>>>0,h||Q(d,4,this.length),this[d]<<24|this[d+1]<<16|this[d+2]<<8|this[d+3]},a.prototype.readBigInt64LE=Ve(function(d){d=d>>>0,Oe(d,"offset");const h=this[d],S=this[d+7];(h===void 0||S===void 0)&&kt(d,this.length-8);const P=this[d+4]+this[d+5]*2**8+this[d+6]*2**16+(S<<24);return(BigInt(P)<<BigInt(32))+BigInt(h+this[++d]*2**8+this[++d]*2**16+this[++d]*2**24)}),a.prototype.readBigInt64BE=Ve(function(d){d=d>>>0,Oe(d,"offset");const h=this[d],S=this[d+7];(h===void 0||S===void 0)&&kt(d,this.length-8);const P=(h<<24)+this[++d]*2**16+this[++d]*2**8+this[++d];return(BigInt(P)<<BigInt(32))+BigInt(this[++d]*2**24+this[++d]*2**16+this[++d]*2**8+S)}),a.prototype.readFloatLE=function(d,h){return d=d>>>0,h||Q(d,4,this.length),n.read(this,d,!0,23,4)},a.prototype.readFloatBE=function(d,h){return d=d>>>0,h||Q(d,4,this.length),n.read(this,d,!1,23,4)},a.prototype.readDoubleLE=function(d,h){return d=d>>>0,h||Q(d,8,this.length),n.read(this,d,!0,52,8)},a.prototype.readDoubleBE=function(d,h){return d=d>>>0,h||Q(d,8,this.length),n.read(this,d,!1,52,8)};function se(y,d,h,S,P,O){if(!a.isBuffer(y))throw new TypeError('"buffer" argument must be a Buffer instance');if(d>P||d<O)throw new RangeError('"value" argument is out of bounds');if(h+S>y.length)throw new RangeError("Index out of range")}a.prototype.writeUintLE=a.prototype.writeUIntLE=function(d,h,S,P){if(d=+d,h=h>>>0,S=S>>>0,!P){const ce=Math.pow(2,8*S)-1;se(this,d,h,S,ce,0)}let O=1,U=0;for(this[h]=d&255;++U<S&&(O*=256);)this[h+U]=d/O&255;return h+S},a.prototype.writeUintBE=a.prototype.writeUIntBE=function(d,h,S,P){if(d=+d,h=h>>>0,S=S>>>0,!P){const ce=Math.pow(2,8*S)-1;se(this,d,h,S,ce,0)}let O=S-1,U=1;for(this[h+O]=d&255;--O>=0&&(U*=256);)this[h+O]=d/U&255;return h+S},a.prototype.writeUint8=a.prototype.writeUInt8=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,1,255,0),this[h]=d&255,h+1},a.prototype.writeUint16LE=a.prototype.writeUInt16LE=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,2,65535,0),this[h]=d&255,this[h+1]=d>>>8,h+2},a.prototype.writeUint16BE=a.prototype.writeUInt16BE=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,2,65535,0),this[h]=d>>>8,this[h+1]=d&255,h+2},a.prototype.writeUint32LE=a.prototype.writeUInt32LE=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,4,4294967295,0),this[h+3]=d>>>24,this[h+2]=d>>>16,this[h+1]=d>>>8,this[h]=d&255,h+4},a.prototype.writeUint32BE=a.prototype.writeUInt32BE=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,4,4294967295,0),this[h]=d>>>24,this[h+1]=d>>>16,this[h+2]=d>>>8,this[h+3]=d&255,h+4};function Z(y,d,h,S,P){Ne(d,S,P,y,h,7);let O=Number(d&BigInt(4294967295));y[h++]=O,O=O>>8,y[h++]=O,O=O>>8,y[h++]=O,O=O>>8,y[h++]=O;let U=Number(d>>BigInt(32)&BigInt(4294967295));return y[h++]=U,U=U>>8,y[h++]=U,U=U>>8,y[h++]=U,U=U>>8,y[h++]=U,h}function ae(y,d,h,S,P){Ne(d,S,P,y,h,7);let O=Number(d&BigInt(4294967295));y[h+7]=O,O=O>>8,y[h+6]=O,O=O>>8,y[h+5]=O,O=O>>8,y[h+4]=O;let U=Number(d>>BigInt(32)&BigInt(4294967295));return y[h+3]=U,U=U>>8,y[h+2]=U,U=U>>8,y[h+1]=U,U=U>>8,y[h]=U,h+8}a.prototype.writeBigUInt64LE=Ve(function(d,h=0){return Z(this,d,h,BigInt(0),BigInt("0xffffffffffffffff"))}),a.prototype.writeBigUInt64BE=Ve(function(d,h=0){return ae(this,d,h,BigInt(0),BigInt("0xffffffffffffffff"))}),a.prototype.writeIntLE=function(d,h,S,P){if(d=+d,h=h>>>0,!P){const $e=Math.pow(2,8*S-1);se(this,d,h,S,$e-1,-$e)}let O=0,U=1,ce=0;for(this[h]=d&255;++O<S&&(U*=256);)d<0&&ce===0&&this[h+O-1]!==0&&(ce=1),this[h+O]=(d/U>>0)-ce&255;return h+S},a.prototype.writeIntBE=function(d,h,S,P){if(d=+d,h=h>>>0,!P){const $e=Math.pow(2,8*S-1);se(this,d,h,S,$e-1,-$e)}let O=S-1,U=1,ce=0;for(this[h+O]=d&255;--O>=0&&(U*=256);)d<0&&ce===0&&this[h+O+1]!==0&&(ce=1),this[h+O]=(d/U>>0)-ce&255;return h+S},a.prototype.writeInt8=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,1,127,-128),d<0&&(d=255+d+1),this[h]=d&255,h+1},a.prototype.writeInt16LE=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,2,32767,-32768),this[h]=d&255,this[h+1]=d>>>8,h+2},a.prototype.writeInt16BE=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,2,32767,-32768),this[h]=d>>>8,this[h+1]=d&255,h+2},a.prototype.writeInt32LE=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,4,2147483647,-2147483648),this[h]=d&255,this[h+1]=d>>>8,this[h+2]=d>>>16,this[h+3]=d>>>24,h+4},a.prototype.writeInt32BE=function(d,h,S){return d=+d,h=h>>>0,S||se(this,d,h,4,2147483647,-2147483648),d<0&&(d=4294967295+d+1),this[h]=d>>>24,this[h+1]=d>>>16,this[h+2]=d>>>8,this[h+3]=d&255,h+4},a.prototype.writeBigInt64LE=Ve(function(d,h=0){return Z(this,d,h,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),a.prototype.writeBigInt64BE=Ve(function(d,h=0){return ae(this,d,h,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function de(y,d,h,S,P,O){if(h+S>y.length)throw new RangeError("Index out of range");if(h<0)throw new RangeError("Index out of range")}function _e(y,d,h,S,P){return d=+d,h=h>>>0,P||de(y,d,h,4),n.write(y,d,h,S,23,4),h+4}a.prototype.writeFloatLE=function(d,h,S){return _e(this,d,h,!0,S)},a.prototype.writeFloatBE=function(d,h,S){return _e(this,d,h,!1,S)};function Ce(y,d,h,S,P){return d=+d,h=h>>>0,P||de(y,d,h,8),n.write(y,d,h,S,52,8),h+8}a.prototype.writeDoubleLE=function(d,h,S){return Ce(this,d,h,!0,S)},a.prototype.writeDoubleBE=function(d,h,S){return Ce(this,d,h,!1,S)},a.prototype.copy=function(d,h,S,P){if(!a.isBuffer(d))throw new TypeError("argument should be a Buffer");if(S||(S=0),!P&&P!==0&&(P=this.length),h>=d.length&&(h=d.length),h||(h=0),P>0&&P<S&&(P=S),P===S||d.length===0||this.length===0)return 0;if(h<0)throw new RangeError("targetStart out of bounds");if(S<0||S>=this.length)throw new RangeError("Index out of range");if(P<0)throw new RangeError("sourceEnd out of bounds");P>this.length&&(P=this.length),d.length-h<P-S&&(P=d.length-h+S);const O=P-S;return this===d&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(h,S,P):Uint8Array.prototype.set.call(d,this.subarray(S,P),h),O},a.prototype.fill=function(d,h,S,P){if(typeof d=="string"){if(typeof h=="string"?(P=h,h=0,S=this.length):typeof S=="string"&&(P=S,S=this.length),P!==void 0&&typeof P!="string")throw new TypeError("encoding must be a string");if(typeof P=="string"&&!a.isEncoding(P))throw new TypeError("Unknown encoding: "+P);if(d.length===1){const U=d.charCodeAt(0);(P==="utf8"&&U<128||P==="latin1")&&(d=U)}}else typeof d=="number"?d=d&255:typeof d=="boolean"&&(d=Number(d));if(h<0||this.length<h||this.length<S)throw new RangeError("Out of range index");if(S<=h)return this;h=h>>>0,S=S===void 0?this.length:S>>>0,d||(d=0);let O;if(typeof d=="number")for(O=h;O<S;++O)this[O]=d;else{const U=a.isBuffer(d)?d:a.from(d,P),ce=U.length;if(ce===0)throw new TypeError('The value "'+d+'" is invalid for argument "value"');for(O=0;O<S-h;++O)this[O+h]=U[O%ce]}return this};const ye={};function Ae(y,d,h){ye[y]=class extends h{constructor(){super(),Object.defineProperty(this,"message",{value:d.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${y}]`,this.stack,delete this.name}get code(){return y}set code(P){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:P,writable:!0})}toString(){return`${this.name} [${y}]: ${this.message}`}}}Ae("ERR_BUFFER_OUT_OF_BOUNDS",function(y){return y?`${y} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),Ae("ERR_INVALID_ARG_TYPE",function(y,d){return`The "${y}" argument must be of type number. Received type ${typeof d}`},TypeError),Ae("ERR_OUT_OF_RANGE",function(y,d,h){let S=`The value of "${y}" is out of range.`,P=h;return Number.isInteger(h)&&Math.abs(h)>2**32?P=ge(String(h)):typeof h=="bigint"&&(P=String(h),(h>BigInt(2)**BigInt(32)||h<-(BigInt(2)**BigInt(32)))&&(P=ge(P)),P+="n"),S+=` It must be ${d}. Received ${P}`,S},RangeError);function ge(y){let d="",h=y.length;const S=y[0]==="-"?1:0;for(;h>=S+4;h-=3)d=`_${y.slice(h-3,h)}${d}`;return`${y.slice(0,h)}${d}`}function De(y,d,h){Oe(d,"offset"),(y[d]===void 0||y[d+h]===void 0)&&kt(d,y.length-(h+1))}function Ne(y,d,h,S,P,O){if(y>h||y<d){const U=typeof d=="bigint"?"n":"";let ce;throw O>3?d===0||d===BigInt(0)?ce=`>= 0${U} and < 2${U} ** ${(O+1)*8}${U}`:ce=`>= -(2${U} ** ${(O+1)*8-1}${U}) and < 2 ** ${(O+1)*8-1}${U}`:ce=`>= ${d}${U} and <= ${h}${U}`,new ye.ERR_OUT_OF_RANGE("value",ce,y)}De(S,P,O)}function Oe(y,d){if(typeof y!="number")throw new ye.ERR_INVALID_ARG_TYPE(d,"number",y)}function kt(y,d,h){throw Math.floor(y)!==y?(Oe(y,h),new ye.ERR_OUT_OF_RANGE(h||"offset","an integer",y)):d<0?new ye.ERR_BUFFER_OUT_OF_BOUNDS:new ye.ERR_OUT_OF_RANGE(h||"offset",`>= ${h?1:0} and <= ${d}`,y)}const Jn=/[^+/0-9A-Za-z-_]/g;function $r(y){if(y=y.split("=")[0],y=y.trim().replace(Jn,""),y.length<2)return"";for(;y.length%4!==0;)y=y+"=";return y}function Xn(y,d){d=d||1/0;let h;const S=y.length;let P=null;const O=[];for(let U=0;U<S;++U){if(h=y.charCodeAt(U),h>55295&&h<57344){if(!P){if(h>56319){(d-=3)>-1&&O.push(239,191,189);continue}else if(U+1===S){(d-=3)>-1&&O.push(239,191,189);continue}P=h;continue}if(h<56320){(d-=3)>-1&&O.push(239,191,189),P=h;continue}h=(P-55296<<10|h-56320)+65536}else P&&(d-=3)>-1&&O.push(239,191,189);if(P=null,h<128){if((d-=1)<0)break;O.push(h)}else if(h<2048){if((d-=2)<0)break;O.push(h>>6|192,h&63|128)}else if(h<65536){if((d-=3)<0)break;O.push(h>>12|224,h>>6&63|128,h&63|128)}else if(h<1114112){if((d-=4)<0)break;O.push(h>>18|240,h>>12&63|128,h>>6&63|128,h&63|128)}else throw new Error("Invalid code point")}return O}function wo(y){const d=[];for(let h=0;h<y.length;++h)d.push(y.charCodeAt(h)&255);return d}function ra(y,d){let h,S,P;const O=[];for(let U=0;U<y.length&&!((d-=2)<0);++U)h=y.charCodeAt(U),S=h>>8,P=h%256,O.push(P),O.push(S);return O}function ct(y){return e.toByteArray($r(y))}function tt(y,d,h,S){let P;for(P=0;P<S&&!(P+h>=d.length||P>=y.length);++P)d[P+h]=y[P];return P}function je(y,d){return y instanceof d||y!=null&&y.constructor!=null&&y.constructor.name!=null&&y.constructor.name===d.name}function it(y){return y!==y}const ut=function(){const y="0123456789abcdef",d=new Array(256);for(let h=0;h<16;++h){const S=h*16;for(let P=0;P<16;++P)d[S+P]=y[h]+y[P]}return d}();function Ve(y){return typeof BigInt>"u"?dt:y}function dt(){throw new Error("BigInt not supported")}})(S1);var oh;typeof window<"u"&&(window.Buffer||(window.Buffer=S1.Buffer),window.global||(window.global=window),window.process||(window.process={}),(oh=window.process)!=null&&oh.env||(window.process={env:{}}));var To,Ti,l8=class extends Dc{constructor({chains:t,options:e}){super({chains:t,options:{reloadOnDisconnect:!1,...e}}),this.id="coinbaseWallet",this.name="Coinbase Wallet",this.ready=!0,Tt(this,To,void 0),Tt(this,Ti,void 0),this.onAccountsChanged=n=>{n.length===0?this.emit("disconnect"):this.emit("change",{account:Vt(n[0])})},this.onChainChanged=n=>{const r=$a(n),o=this.isChainUnsupported(r);this.emit("change",{chain:{id:r,unsupported:o}})},this.onDisconnect=()=>{this.emit("disconnect")}}async connect({chainId:t}={}){try{const e=await this.getProvider();e.on("accountsChanged",this.onAccountsChanged),e.on("chainChanged",this.onChainChanged),e.on("disconnect",this.onDisconnect),this.emit("message",{type:"connecting"});const n=await e.enable(),r=Vt(n[0]);let o=await this.getChainId(),i=this.isChainUnsupported(o);return t&&o!==t&&(o=(await this.switchChain(t)).id,i=this.isChainUnsupported(o)),{account:r,chain:{id:o,unsupported:i}}}catch(e){throw/(user closed modal|accounts received is empty)/i.test(e.message)?new $t(e):e}}async disconnect(){if(!Le(this,Ti))return;const t=await this.getProvider();t.removeListener("accountsChanged",this.onAccountsChanged),t.removeListener("chainChanged",this.onChainChanged),t.removeListener("disconnect",this.onDisconnect),t.disconnect(),t.close()}async getAccount(){const e=await(await this.getProvider()).request({method:"eth_accounts"});return Vt(e[0])}async getChainId(){const t=await this.getProvider();return $a(t.chainId)}async getProvider(){var t;if(!Le(this,Ti)){let e=(await Bi(()=>import("./index-91NdtkMm.js").then(s=>s.i),__vite__mapDeps([0,1]))).default;typeof e!="function"&&typeof e.default=="function"&&(e=e.default),Qo(this,To,new e(this.options));const n=(t=Le(this,To).walletExtension)==null?void 0:t.getChainId(),r=this.chains.find(s=>this.options.chainId?s.id===this.options.chainId:s.id===n)||this.chains[0],o=this.options.chainId||(r==null?void 0:r.id),i=this.options.jsonRpcUrl||(r==null?void 0:r.rpcUrls.default.http[0]);Qo(this,Ti,Le(this,To).makeWeb3Provider(i,o))}return Le(this,Ti)}async getWalletClient({chainId:t}={}){const[e,n]=await Promise.all([this.getProvider(),this.getAccount()]),r=this.chains.find(o=>o.id===t);if(!e)throw new Error("provider is required.");return Ic({account:n,chain:r,transport:Ac(e)})}async isAuthorized(){try{return!!await this.getAccount()}catch{return!1}}async switchChain(t){var r;const e=await this.getProvider(),n=xe(t);try{return await e.request({method:"wallet_switchEthereumChain",params:[{chainId:n}]}),this.chains.find(o=>o.id===t)??{id:t,name:`Chain ${n}`,network:`${n}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpcUrls:{default:{http:[""]},public:{http:[""]}}}}catch(o){const i=this.chains.find(s=>s.id===t);if(!i)throw new ip({chainId:t,connectorId:this.id});if(o.code===4902)try{return await e.request({method:"wallet_addEthereumChain",params:[{chainId:n,chainName:i.name,nativeCurrency:i.nativeCurrency,rpcUrls:[((r=i.rpcUrls.public)==null?void 0:r.http[0])??""],blockExplorerUrls:this.getBlockExplorerUrls(i)}]}),i}catch(s){throw new $t(s)}throw new sn(o)}}async watchAsset({address:t,decimals:e=18,image:n,symbol:r}){return(await this.getProvider()).request({method:"wallet_watchAsset",params:{type:"ERC20",options:{address:t,decimals:e,image:n,symbol:r}}})}};To=new WeakMap;Ti=new WeakMap;var Xd={},el={},Se={},T1={};(function(t){Object.defineProperty(t,"__esModule",{value:!0});function e(a,c){var l=a>>>16&65535,u=a&65535,p=c>>>16&65535,g=c&65535;return u*g+(l*g+u*p<<16>>>0)|0}t.mul=Math.imul||e;function n(a,c){return a+c|0}t.add=n;function r(a,c){return a-c|0}t.sub=r;function o(a,c){return a<<c|a>>>32-c}t.rotl=o;function i(a,c){return a<<32-c|a>>>c}t.rotr=i;function s(a){return typeof a=="number"&&isFinite(a)&&Math.floor(a)===a}t.isInteger=Number.isInteger||s,t.MAX_SAFE_INTEGER=9007199254740991,t.isSafeInteger=function(a){return t.isInteger(a)&&a>=-t.MAX_SAFE_INTEGER&&a<=t.MAX_SAFE_INTEGER}})(T1);Object.defineProperty(Se,"__esModule",{value:!0});var I1=T1;function u8(t,e){return e===void 0&&(e=0),(t[e+0]<<8|t[e+1])<<16>>16}Se.readInt16BE=u8;function d8(t,e){return e===void 0&&(e=0),(t[e+0]<<8|t[e+1])>>>0}Se.readUint16BE=d8;function f8(t,e){return e===void 0&&(e=0),(t[e+1]<<8|t[e])<<16>>16}Se.readInt16LE=f8;function h8(t,e){return e===void 0&&(e=0),(t[e+1]<<8|t[e])>>>0}Se.readUint16LE=h8;function $1(t,e,n){return e===void 0&&(e=new Uint8Array(2)),n===void 0&&(n=0),e[n+0]=t>>>8,e[n+1]=t>>>0,e}Se.writeUint16BE=$1;Se.writeInt16BE=$1;function D1(t,e,n){return e===void 0&&(e=new Uint8Array(2)),n===void 0&&(n=0),e[n+0]=t>>>0,e[n+1]=t>>>8,e}Se.writeUint16LE=D1;Se.writeInt16LE=D1;function Du(t,e){return e===void 0&&(e=0),t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3]}Se.readInt32BE=Du;function Pu(t,e){return e===void 0&&(e=0),(t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3])>>>0}Se.readUint32BE=Pu;function Ou(t,e){return e===void 0&&(e=0),t[e+3]<<24|t[e+2]<<16|t[e+1]<<8|t[e]}Se.readInt32LE=Ou;function Ru(t,e){return e===void 0&&(e=0),(t[e+3]<<24|t[e+2]<<16|t[e+1]<<8|t[e])>>>0}Se.readUint32LE=Ru;function oc(t,e,n){return e===void 0&&(e=new Uint8Array(4)),n===void 0&&(n=0),e[n+0]=t>>>24,e[n+1]=t>>>16,e[n+2]=t>>>8,e[n+3]=t>>>0,e}Se.writeUint32BE=oc;Se.writeInt32BE=oc;function sc(t,e,n){return e===void 0&&(e=new Uint8Array(4)),n===void 0&&(n=0),e[n+0]=t>>>0,e[n+1]=t>>>8,e[n+2]=t>>>16,e[n+3]=t>>>24,e}Se.writeUint32LE=sc;Se.writeInt32LE=sc;function p8(t,e){e===void 0&&(e=0);var n=Du(t,e),r=Du(t,e+4);return n*4294967296+r-(r>>31)*4294967296}Se.readInt64BE=p8;function g8(t,e){e===void 0&&(e=0);var n=Pu(t,e),r=Pu(t,e+4);return n*4294967296+r}Se.readUint64BE=g8;function m8(t,e){e===void 0&&(e=0);var n=Ou(t,e),r=Ou(t,e+4);return r*4294967296+n-(n>>31)*4294967296}Se.readInt64LE=m8;function w8(t,e){e===void 0&&(e=0);var n=Ru(t,e),r=Ru(t,e+4);return r*4294967296+n}Se.readUint64LE=w8;function P1(t,e,n){return e===void 0&&(e=new Uint8Array(8)),n===void 0&&(n=0),oc(t/4294967296>>>0,e,n),oc(t>>>0,e,n+4),e}Se.writeUint64BE=P1;Se.writeInt64BE=P1;function O1(t,e,n){return e===void 0&&(e=new Uint8Array(8)),n===void 0&&(n=0),sc(t>>>0,e,n),sc(t/4294967296>>>0,e,n+4),e}Se.writeUint64LE=O1;Se.writeInt64LE=O1;function b8(t,e,n){if(n===void 0&&(n=0),t%8!==0)throw new Error("readUintBE supports only bitLengths divisible by 8");if(t/8>e.length-n)throw new Error("readUintBE: array is too short for the given bitLength");for(var r=0,o=1,i=t/8+n-1;i>=n;i--)r+=e[i]*o,o*=256;return r}Se.readUintBE=b8;function y8(t,e,n){if(n===void 0&&(n=0),t%8!==0)throw new Error("readUintLE supports only bitLengths divisible by 8");if(t/8>e.length-n)throw new Error("readUintLE: array is too short for the given bitLength");for(var r=0,o=1,i=n;i<n+t/8;i++)r+=e[i]*o,o*=256;return r}Se.readUintLE=y8;function v8(t,e,n,r){if(n===void 0&&(n=new Uint8Array(t/8)),r===void 0&&(r=0),t%8!==0)throw new Error("writeUintBE supports only bitLengths divisible by 8");if(!I1.isSafeInteger(e))throw new Error("writeUintBE value must be an integer");for(var o=1,i=t/8+r-1;i>=r;i--)n[i]=e/o&255,o*=256;return n}Se.writeUintBE=v8;function x8(t,e,n,r){if(n===void 0&&(n=new Uint8Array(t/8)),r===void 0&&(r=0),t%8!==0)throw new Error("writeUintLE supports only bitLengths divisible by 8");if(!I1.isSafeInteger(e))throw new Error("writeUintLE value must be an integer");for(var o=1,i=r;i<r+t/8;i++)n[i]=e/o&255,o*=256;return n}Se.writeUintLE=x8;function E8(t,e){e===void 0&&(e=0);var n=new DataView(t.buffer,t.byteOffset,t.byteLength);return n.getFloat32(e)}Se.readFloat32BE=E8;function _8(t,e){e===void 0&&(e=0);var n=new DataView(t.buffer,t.byteOffset,t.byteLength);return n.getFloat32(e,!0)}Se.readFloat32LE=_8;function C8(t,e){e===void 0&&(e=0);var n=new DataView(t.buffer,t.byteOffset,t.byteLength);return n.getFloat64(e)}Se.readFloat64BE=C8;function S8(t,e){e===void 0&&(e=0);var n=new DataView(t.buffer,t.byteOffset,t.byteLength);return n.getFloat64(e,!0)}Se.readFloat64LE=S8;function A8(t,e,n){e===void 0&&(e=new Uint8Array(4)),n===void 0&&(n=0);var r=new DataView(e.buffer,e.byteOffset,e.byteLength);return r.setFloat32(n,t),e}Se.writeFloat32BE=A8;function T8(t,e,n){e===void 0&&(e=new Uint8Array(4)),n===void 0&&(n=0);var r=new DataView(e.buffer,e.byteOffset,e.byteLength);return r.setFloat32(n,t,!0),e}Se.writeFloat32LE=T8;function I8(t,e,n){e===void 0&&(e=new Uint8Array(8)),n===void 0&&(n=0);var r=new DataView(e.buffer,e.byteOffset,e.byteLength);return r.setFloat64(n,t),e}Se.writeFloat64BE=I8;function $8(t,e,n){e===void 0&&(e=new Uint8Array(8)),n===void 0&&(n=0);var r=new DataView(e.buffer,e.byteOffset,e.byteLength);return r.setFloat64(n,t,!0),e}Se.writeFloat64LE=$8;var wn={};Object.defineProperty(wn,"__esModule",{value:!0});function D8(t){for(var e=0;e<t.length;e++)t[e]=0;return t}wn.wipe=D8;Object.defineProperty(el,"__esModule",{value:!0});var mt=Se,Nu=wn,P8=20;function O8(t,e,n){for(var r=1634760805,o=857760878,i=2036477234,s=1797285236,a=n[3]<<24|n[2]<<16|n[1]<<8|n[0],c=n[7]<<24|n[6]<<16|n[5]<<8|n[4],l=n[11]<<24|n[10]<<16|n[9]<<8|n[8],u=n[15]<<24|n[14]<<16|n[13]<<8|n[12],p=n[19]<<24|n[18]<<16|n[17]<<8|n[16],g=n[23]<<24|n[22]<<16|n[21]<<8|n[20],m=n[27]<<24|n[26]<<16|n[25]<<8|n[24],w=n[31]<<24|n[30]<<16|n[29]<<8|n[28],v=e[3]<<24|e[2]<<16|e[1]<<8|e[0],_=e[7]<<24|e[6]<<16|e[5]<<8|e[4],I=e[11]<<24|e[10]<<16|e[9]<<8|e[8],b=e[15]<<24|e[14]<<16|e[13]<<8|e[12],E=r,x=o,C=i,A=s,f=a,T=c,R=l,k=u,M=p,Y=g,ie=m,W=w,j=v,B=_,L=I,F=b,X=0;X<P8;X+=2)E=E+f|0,j^=E,j=j>>>16|j<<16,M=M+j|0,f^=M,f=f>>>20|f<<12,x=x+T|0,B^=x,B=B>>>16|B<<16,Y=Y+B|0,T^=Y,T=T>>>20|T<<12,C=C+R|0,L^=C,L=L>>>16|L<<16,ie=ie+L|0,R^=ie,R=R>>>20|R<<12,A=A+k|0,F^=A,F=F>>>16|F<<16,W=W+F|0,k^=W,k=k>>>20|k<<12,C=C+R|0,L^=C,L=L>>>24|L<<8,ie=ie+L|0,R^=ie,R=R>>>25|R<<7,A=A+k|0,F^=A,F=F>>>24|F<<8,W=W+F|0,k^=W,k=k>>>25|k<<7,x=x+T|0,B^=x,B=B>>>24|B<<8,Y=Y+B|0,T^=Y,T=T>>>25|T<<7,E=E+f|0,j^=E,j=j>>>24|j<<8,M=M+j|0,f^=M,f=f>>>25|f<<7,E=E+T|0,F^=E,F=F>>>16|F<<16,ie=ie+F|0,T^=ie,T=T>>>20|T<<12,x=x+R|0,j^=x,j=j>>>16|j<<16,W=W+j|0,R^=W,R=R>>>20|R<<12,C=C+k|0,B^=C,B=B>>>16|B<<16,M=M+B|0,k^=M,k=k>>>20|k<<12,A=A+f|0,L^=A,L=L>>>16|L<<16,Y=Y+L|0,f^=Y,f=f>>>20|f<<12,C=C+k|0,B^=C,B=B>>>24|B<<8,M=M+B|0,k^=M,k=k>>>25|k<<7,A=A+f|0,L^=A,L=L>>>24|L<<8,Y=Y+L|0,f^=Y,f=f>>>25|f<<7,x=x+R|0,j^=x,j=j>>>24|j<<8,W=W+j|0,R^=W,R=R>>>25|R<<7,E=E+T|0,F^=E,F=F>>>24|F<<8,ie=ie+F|0,T^=ie,T=T>>>25|T<<7;mt.writeUint32LE(E+r|0,t,0),mt.writeUint32LE(x+o|0,t,4),mt.writeUint32LE(C+i|0,t,8),mt.writeUint32LE(A+s|0,t,12),mt.writeUint32LE(f+a|0,t,16),mt.writeUint32LE(T+c|0,t,20),mt.writeUint32LE(R+l|0,t,24),mt.writeUint32LE(k+u|0,t,28),mt.writeUint32LE(M+p|0,t,32),mt.writeUint32LE(Y+g|0,t,36),mt.writeUint32LE(ie+m|0,t,40),mt.writeUint32LE(W+w|0,t,44),mt.writeUint32LE(j+v|0,t,48),mt.writeUint32LE(B+_|0,t,52),mt.writeUint32LE(L+I|0,t,56),mt.writeUint32LE(F+b|0,t,60)}function R1(t,e,n,r,o){if(o===void 0&&(o=0),t.length!==32)throw new Error("ChaCha: key size must be 32 bytes");if(r.length<n.length)throw new Error("ChaCha: destination is shorter than source");var i,s;if(o===0){if(e.length!==8&&e.length!==12)throw new Error("ChaCha nonce must be 8 or 12 bytes");i=new Uint8Array(16),s=i.length-e.length,i.set(e,s)}else{if(e.length!==16)throw new Error("ChaCha nonce with counter must be 16 bytes");i=e,s=o}for(var a=new Uint8Array(64),c=0;c<n.length;c+=64){O8(a,i,t);for(var l=c;l<c+64&&l<n.length;l++)r[l]=n[l]^a[l-c];N8(i,0,s)}return Nu.wipe(a),o===0&&Nu.wipe(i),r}el.streamXOR=R1;function R8(t,e,n,r){return r===void 0&&(r=0),Nu.wipe(n),R1(t,e,n,n,r)}el.stream=R8;function N8(t,e,n){for(var r=1;n--;)r=r+(t[e]&255)|0,t[e]=r&255,r>>>=8,e++;if(r>0)throw new Error("ChaCha: counter overflow")}var N1={},Ir={};Object.defineProperty(Ir,"__esModule",{value:!0});function k8(t,e,n){return~(t-1)&e|t-1&n}Ir.select=k8;function M8(t,e){return(t|0)-(e|0)-1>>>31&1}Ir.lessOrEqual=M8;function k1(t,e){if(t.length!==e.length)return 0;for(var n=0,r=0;r<t.length;r++)n|=t[r]^e[r];return 1&n-1>>>8}Ir.compare=k1;function U8(t,e){return t.length===0||e.length===0?!1:k1(t,e)!==0}Ir.equal=U8;(function(t){Object.defineProperty(t,"__esModule",{value:!0});var e=Ir,n=wn;t.DIGEST_LENGTH=16;var r=function(){function s(a){this.digestLength=t.DIGEST_LENGTH,this._buffer=new Uint8Array(16),this._r=new Uint16Array(10),this._h=new Uint16Array(10),this._pad=new Uint16Array(8),this._leftover=0,this._fin=0,this._finished=!1;var c=a[0]|a[1]<<8;this._r[0]=c&8191;var l=a[2]|a[3]<<8;this._r[1]=(c>>>13|l<<3)&8191;var u=a[4]|a[5]<<8;this._r[2]=(l>>>10|u<<6)&7939;var p=a[6]|a[7]<<8;this._r[3]=(u>>>7|p<<9)&8191;var g=a[8]|a[9]<<8;this._r[4]=(p>>>4|g<<12)&255,this._r[5]=g>>>1&8190;var m=a[10]|a[11]<<8;this._r[6]=(g>>>14|m<<2)&8191;var w=a[12]|a[13]<<8;this._r[7]=(m>>>11|w<<5)&8065;var v=a[14]|a[15]<<8;this._r[8]=(w>>>8|v<<8)&8191,this._r[9]=v>>>5&127,this._pad[0]=a[16]|a[17]<<8,this._pad[1]=a[18]|a[19]<<8,this._pad[2]=a[20]|a[21]<<8,this._pad[3]=a[22]|a[23]<<8,this._pad[4]=a[24]|a[25]<<8,this._pad[5]=a[26]|a[27]<<8,this._pad[6]=a[28]|a[29]<<8,this._pad[7]=a[30]|a[31]<<8}return s.prototype._blocks=function(a,c,l){for(var u=this._fin?0:2048,p=this._h[0],g=this._h[1],m=this._h[2],w=this._h[3],v=this._h[4],_=this._h[5],I=this._h[6],b=this._h[7],E=this._h[8],x=this._h[9],C=this._r[0],A=this._r[1],f=this._r[2],T=this._r[3],R=this._r[4],k=this._r[5],M=this._r[6],Y=this._r[7],ie=this._r[8],W=this._r[9];l>=16;){var j=a[c+0]|a[c+1]<<8;p+=j&8191;var B=a[c+2]|a[c+3]<<8;g+=(j>>>13|B<<3)&8191;var L=a[c+4]|a[c+5]<<8;m+=(B>>>10|L<<6)&8191;var F=a[c+6]|a[c+7]<<8;w+=(L>>>7|F<<9)&8191;var X=a[c+8]|a[c+9]<<8;v+=(F>>>4|X<<12)&8191,_+=X>>>1&8191;var ne=a[c+10]|a[c+11]<<8;I+=(X>>>14|ne<<2)&8191;var Q=a[c+12]|a[c+13]<<8;b+=(ne>>>11|Q<<5)&8191;var se=a[c+14]|a[c+15]<<8;E+=(Q>>>8|se<<8)&8191,x+=se>>>5|u;var Z=0,ae=Z;ae+=p*C,ae+=g*(5*W),ae+=m*(5*ie),ae+=w*(5*Y),ae+=v*(5*M),Z=ae>>>13,ae&=8191,ae+=_*(5*k),ae+=I*(5*R),ae+=b*(5*T),ae+=E*(5*f),ae+=x*(5*A),Z+=ae>>>13,ae&=8191;var de=Z;de+=p*A,de+=g*C,de+=m*(5*W),de+=w*(5*ie),de+=v*(5*Y),Z=de>>>13,de&=8191,de+=_*(5*M),de+=I*(5*k),de+=b*(5*R),de+=E*(5*T),de+=x*(5*f),Z+=de>>>13,de&=8191;var _e=Z;_e+=p*f,_e+=g*A,_e+=m*C,_e+=w*(5*W),_e+=v*(5*ie),Z=_e>>>13,_e&=8191,_e+=_*(5*Y),_e+=I*(5*M),_e+=b*(5*k),_e+=E*(5*R),_e+=x*(5*T),Z+=_e>>>13,_e&=8191;var Ce=Z;Ce+=p*T,Ce+=g*f,Ce+=m*A,Ce+=w*C,Ce+=v*(5*W),Z=Ce>>>13,Ce&=8191,Ce+=_*(5*ie),Ce+=I*(5*Y),Ce+=b*(5*M),Ce+=E*(5*k),Ce+=x*(5*R),Z+=Ce>>>13,Ce&=8191;var ye=Z;ye+=p*R,ye+=g*T,ye+=m*f,ye+=w*A,ye+=v*C,Z=ye>>>13,ye&=8191,ye+=_*(5*W),ye+=I*(5*ie),ye+=b*(5*Y),ye+=E*(5*M),ye+=x*(5*k),Z+=ye>>>13,ye&=8191;var Ae=Z;Ae+=p*k,Ae+=g*R,Ae+=m*T,Ae+=w*f,Ae+=v*A,Z=Ae>>>13,Ae&=8191,Ae+=_*C,Ae+=I*(5*W),Ae+=b*(5*ie),Ae+=E*(5*Y),Ae+=x*(5*M),Z+=Ae>>>13,Ae&=8191;var ge=Z;ge+=p*M,ge+=g*k,ge+=m*R,ge+=w*T,ge+=v*f,Z=ge>>>13,ge&=8191,ge+=_*A,ge+=I*C,ge+=b*(5*W),ge+=E*(5*ie),ge+=x*(5*Y),Z+=ge>>>13,ge&=8191;var De=Z;De+=p*Y,De+=g*M,De+=m*k,De+=w*R,De+=v*T,Z=De>>>13,De&=8191,De+=_*f,De+=I*A,De+=b*C,De+=E*(5*W),De+=x*(5*ie),Z+=De>>>13,De&=8191;var Ne=Z;Ne+=p*ie,Ne+=g*Y,Ne+=m*M,Ne+=w*k,Ne+=v*R,Z=Ne>>>13,Ne&=8191,Ne+=_*T,Ne+=I*f,Ne+=b*A,Ne+=E*C,Ne+=x*(5*W),Z+=Ne>>>13,Ne&=8191;var Oe=Z;Oe+=p*W,Oe+=g*ie,Oe+=m*Y,Oe+=w*M,Oe+=v*k,Z=Oe>>>13,Oe&=8191,Oe+=_*R,Oe+=I*T,Oe+=b*f,Oe+=E*A,Oe+=x*C,Z+=Oe>>>13,Oe&=8191,Z=(Z<<2)+Z|0,Z=Z+ae|0,ae=Z&8191,Z=Z>>>13,de+=Z,p=ae,g=de,m=_e,w=Ce,v=ye,_=Ae,I=ge,b=De,E=Ne,x=Oe,c+=16,l-=16}this._h[0]=p,this._h[1]=g,this._h[2]=m,this._h[3]=w,this._h[4]=v,this._h[5]=_,this._h[6]=I,this._h[7]=b,this._h[8]=E,this._h[9]=x},s.prototype.finish=function(a,c){c===void 0&&(c=0);var l=new Uint16Array(10),u,p,g,m;if(this._leftover){for(m=this._leftover,this._buffer[m++]=1;m<16;m++)this._buffer[m]=0;this._fin=1,this._blocks(this._buffer,0,16)}for(u=this._h[1]>>>13,this._h[1]&=8191,m=2;m<10;m++)this._h[m]+=u,u=this._h[m]>>>13,this._h[m]&=8191;for(this._h[0]+=u*5,u=this._h[0]>>>13,this._h[0]&=8191,this._h[1]+=u,u=this._h[1]>>>13,this._h[1]&=8191,this._h[2]+=u,l[0]=this._h[0]+5,u=l[0]>>>13,l[0]&=8191,m=1;m<10;m++)l[m]=this._h[m]+u,u=l[m]>>>13,l[m]&=8191;for(l[9]-=8192,p=(u^1)-1,m=0;m<10;m++)l[m]&=p;for(p=~p,m=0;m<10;m++)this._h[m]=this._h[m]&p|l[m];for(this._h[0]=(this._h[0]|this._h[1]<<13)&65535,this._h[1]=(this._h[1]>>>3|this._h[2]<<10)&65535,this._h[2]=(this._h[2]>>>6|this._h[3]<<7)&65535,this._h[3]=(this._h[3]>>>9|this._h[4]<<4)&65535,this._h[4]=(this._h[4]>>>12|this._h[5]<<1|this._h[6]<<14)&65535,this._h[5]=(this._h[6]>>>2|this._h[7]<<11)&65535,this._h[6]=(this._h[7]>>>5|this._h[8]<<8)&65535,this._h[7]=(this._h[8]>>>8|this._h[9]<<5)&65535,g=this._h[0]+this._pad[0],this._h[0]=g&65535,m=1;m<8;m++)g=(this._h[m]+this._pad[m]|0)+(g>>>16)|0,this._h[m]=g&65535;return a[c+0]=this._h[0]>>>0,a[c+1]=this._h[0]>>>8,a[c+2]=this._h[1]>>>0,a[c+3]=this._h[1]>>>8,a[c+4]=this._h[2]>>>0,a[c+5]=this._h[2]>>>8,a[c+6]=this._h[3]>>>0,a[c+7]=this._h[3]>>>8,a[c+8]=this._h[4]>>>0,a[c+9]=this._h[4]>>>8,a[c+10]=this._h[5]>>>0,a[c+11]=this._h[5]>>>8,a[c+12]=this._h[6]>>>0,a[c+13]=this._h[6]>>>8,a[c+14]=this._h[7]>>>0,a[c+15]=this._h[7]>>>8,this._finished=!0,this},s.prototype.update=function(a){var c=0,l=a.length,u;if(this._leftover){u=16-this._leftover,u>l&&(u=l);for(var p=0;p<u;p++)this._buffer[this._leftover+p]=a[c+p];if(l-=u,c+=u,this._leftover+=u,this._leftover<16)return this;this._blocks(this._buffer,0,16),this._leftover=0}if(l>=16&&(u=l-l%16,this._blocks(a,c,u),c+=u,l-=u),l){for(var p=0;p<l;p++)this._buffer[this._leftover+p]=a[c+p];this._leftover+=l}return this},s.prototype.digest=function(){if(this._finished)throw new Error("Poly1305 was finished");var a=new Uint8Array(16);return this.finish(a),a},s.prototype.clean=function(){return n.wipe(this._buffer),n.wipe(this._r),n.wipe(this._h),n.wipe(this._pad),this._leftover=0,this._fin=0,this._finished=!0,this},s}();t.Poly1305=r;function o(s,a){var c=new r(s);c.update(a);var l=c.digest();return c.clean(),l}t.oneTimeAuth=o;function i(s,a){return s.length!==t.DIGEST_LENGTH||a.length!==t.DIGEST_LENGTH?!1:e.equal(s,a)}t.equal=i})(N1);(function(t){Object.defineProperty(t,"__esModule",{value:!0});var e=el,n=N1,r=wn,o=Se,i=Ir;t.KEY_LENGTH=32,t.NONCE_LENGTH=12,t.TAG_LENGTH=16;var s=new Uint8Array(16),a=function(){function c(l){if(this.nonceLength=t.NONCE_LENGTH,this.tagLength=t.TAG_LENGTH,l.length!==t.KEY_LENGTH)throw new Error("ChaCha20Poly1305 needs 32-byte key");this._key=new Uint8Array(l)}return c.prototype.seal=function(l,u,p,g){if(l.length>16)throw new Error("ChaCha20Poly1305: incorrect nonce length");var m=new Uint8Array(16);m.set(l,m.length-l.length);var w=new Uint8Array(32);e.stream(this._key,m,w,4);var v=u.length+this.tagLength,_;if(g){if(g.length!==v)throw new Error("ChaCha20Poly1305: incorrect destination length");_=g}else _=new Uint8Array(v);return e.streamXOR(this._key,m,u,_,4),this._authenticate(_.subarray(_.length-this.tagLength,_.length),w,_.subarray(0,_.length-this.tagLength),p),r.wipe(m),_},c.prototype.open=function(l,u,p,g){if(l.length>16)throw new Error("ChaCha20Poly1305: incorrect nonce length");if(u.length<this.tagLength)return null;var m=new Uint8Array(16);m.set(l,m.length-l.length);var w=new Uint8Array(32);e.stream(this._key,m,w,4);var v=new Uint8Array(this.tagLength);if(this._authenticate(v,w,u.subarray(0,u.length-this.tagLength),p),!i.equal(v,u.subarray(u.length-this.tagLength,u.length)))return null;var _=u.length-this.tagLength,I;if(g){if(g.length!==_)throw new Error("ChaCha20Poly1305: incorrect destination length");I=g}else I=new Uint8Array(_);return e.streamXOR(this._key,m,u.subarray(0,u.length-this.tagLength),I,4),r.wipe(m),I},c.prototype.clean=function(){return r.wipe(this._key),this},c.prototype._authenticate=function(l,u,p,g){var m=new n.Poly1305(u);g&&(m.update(g),g.length%16>0&&m.update(s.subarray(g.length%16))),m.update(p),p.length%16>0&&m.update(s.subarray(p.length%16));var w=new Uint8Array(8);g&&o.writeUint64LE(g.length,w),m.update(w),o.writeUint64LE(p.length,w),m.update(w);for(var v=m.digest(),_=0;_<v.length;_++)l[_]=v[_];m.clean(),r.wipe(v),r.wipe(w)},c}();t.ChaCha20Poly1305=a})(Xd);var M1={},Xs={},Qd={};Object.defineProperty(Qd,"__esModule",{value:!0});function B8(t){return typeof t.saveState<"u"&&typeof t.restoreState<"u"&&typeof t.cleanSavedState<"u"}Qd.isSerializableHash=B8;Object.defineProperty(Xs,"__esModule",{value:!0});var yn=Qd,L8=Ir,j8=wn,U1=function(){function t(e,n){this._finished=!1,this._inner=new e,this._outer=new e,this.blockSize=this._outer.blockSize,this.digestLength=this._outer.digestLength;var r=new Uint8Array(this.blockSize);n.length>this.blockSize?this._inner.update(n).finish(r).clean():r.set(n);for(var o=0;o<r.length;o++)r[o]^=54;this._inner.update(r);for(var o=0;o<r.length;o++)r[o]^=106;this._outer.update(r),yn.isSerializableHash(this._inner)&&yn.isSerializableHash(this._outer)&&(this._innerKeyedState=this._inner.saveState(),this._outerKeyedState=this._outer.saveState()),j8.wipe(r)}return t.prototype.reset=function(){if(!yn.isSerializableHash(this._inner)||!yn.isSerializableHash(this._outer))throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");return this._inner.restoreState(this._innerKeyedState),this._outer.restoreState(this._outerKeyedState),this._finished=!1,this},t.prototype.clean=function(){yn.isSerializableHash(this._inner)&&this._inner.cleanSavedState(this._innerKeyedState),yn.isSerializableHash(this._outer)&&this._outer.cleanSavedState(this._outerKeyedState),this._inner.clean(),this._outer.clean()},t.prototype.update=function(e){return this._inner.update(e),this},t.prototype.finish=function(e){return this._finished?(this._outer.finish(e),this):(this._inner.finish(e),this._outer.update(e.subarray(0,this.digestLength)).finish(e),this._finished=!0,this)},t.prototype.digest=function(){var e=new Uint8Array(this.digestLength);return this.finish(e),e},t.prototype.saveState=function(){if(!yn.isSerializableHash(this._inner))throw new Error("hmac: can't saveState() because hash doesn't implement it");return this._inner.saveState()},t.prototype.restoreState=function(e){if(!yn.isSerializableHash(this._inner)||!yn.isSerializableHash(this._outer))throw new Error("hmac: can't restoreState() because hash doesn't implement it");return this._inner.restoreState(e),this._outer.restoreState(this._outerKeyedState),this._finished=!1,this},t.prototype.cleanSavedState=function(e){if(!yn.isSerializableHash(this._inner))throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");this._inner.cleanSavedState(e)},t}();Xs.HMAC=U1;function F8(t,e,n){var r=new U1(t,e);r.update(n);var o=r.digest();return r.clean(),o}Xs.hmac=F8;Xs.equal=L8.equal;Object.defineProperty(M1,"__esModule",{value:!0});var Af=Xs,Tf=wn,W8=function(){function t(e,n,r,o){r===void 0&&(r=new Uint8Array(0)),this._counter=new Uint8Array(1),this._hash=e,this._info=o;var i=Af.hmac(this._hash,r,n);this._hmac=new Af.HMAC(e,i),this._buffer=new Uint8Array(this._hmac.digestLength),this._bufpos=this._buffer.length}return t.prototype._fillBuffer=function(){this._counter[0]++;var e=this._counter[0];if(e===0)throw new Error("hkdf: cannot expand more");this._hmac.reset(),e>1&&this._hmac.update(this._buffer),this._info&&this._hmac.update(this._info),this._hmac.update(this._counter),this._hmac.finish(this._buffer),this._bufpos=0},t.prototype.expand=function(e){for(var n=new Uint8Array(e),r=0;r<n.length;r++)this._bufpos===this._buffer.length&&this._fillBuffer(),n[r]=this._buffer[this._bufpos++];return n},t.prototype.clean=function(){this._hmac.clean(),Tf.wipe(this._buffer),Tf.wipe(this._counter),this._bufpos=0},t}(),z8=M1.HKDF=W8,tl={},nl={},rl={};Object.defineProperty(rl,"__esModule",{value:!0});rl.BrowserRandomSource=void 0;const If=65536;class H8{constructor(){this.isAvailable=!1,this.isInstantiated=!1;const e=typeof self<"u"?self.crypto||self.msCrypto:null;e&&e.getRandomValues!==void 0&&(this._crypto=e,this.isAvailable=!0,this.isInstantiated=!0)}randomBytes(e){if(!this.isAvailable||!this._crypto)throw new Error("Browser random byte generator is not available.");const n=new Uint8Array(e);for(let r=0;r<n.length;r+=If)this._crypto.getRandomValues(n.subarray(r,r+Math.min(n.length-r,If)));return n}}rl.BrowserRandomSource=H8;function V8(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var il={};const Z8={},G8=Object.freeze(Object.defineProperty({__proto__:null,default:Z8},Symbol.toStringTag,{value:"Module"})),q8=op(G8);Object.defineProperty(il,"__esModule",{value:!0});il.NodeRandomSource=void 0;const K8=wn;class Y8{constructor(){if(this.isAvailable=!1,this.isInstantiated=!1,typeof V8<"u"){const e=q8;e&&e.randomBytes&&(this._crypto=e,this.isAvailable=!0,this.isInstantiated=!0)}}randomBytes(e){if(!this.isAvailable||!this._crypto)throw new Error("Node.js random byte generator is not available.");let n=this._crypto.randomBytes(e);if(n.length!==e)throw new Error("NodeRandomSource: got fewer bytes than requested");const r=new Uint8Array(e);for(let o=0;o<r.length;o++)r[o]=n[o];return(0,K8.wipe)(n),r}}il.NodeRandomSource=Y8;Object.defineProperty(nl,"__esModule",{value:!0});nl.SystemRandomSource=void 0;const J8=rl,X8=il;class Q8{constructor(){if(this.isAvailable=!1,this.name="",this._source=new J8.BrowserRandomSource,this._source.isAvailable){this.isAvailable=!0,this.name="Browser";return}if(this._source=new X8.NodeRandomSource,this._source.isAvailable){this.isAvailable=!0,this.name="Node";return}}randomBytes(e){if(!this.isAvailable)throw new Error("System random byte generator is not available.");return this._source.randomBytes(e)}}nl.SystemRandomSource=Q8;(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.randomStringForEntropy=t.randomString=t.randomUint32=t.randomBytes=t.defaultRandomSource=void 0;const e=nl,n=Se,r=wn;t.defaultRandomSource=new e.SystemRandomSource;function o(l,u=t.defaultRandomSource){return u.randomBytes(l)}t.randomBytes=o;function i(l=t.defaultRandomSource){const u=o(4,l),p=(0,n.readUint32LE)(u);return(0,r.wipe)(u),p}t.randomUint32=i;const s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";function a(l,u=s,p=t.defaultRandomSource){if(u.length<2)throw new Error("randomString charset is too short");if(u.length>256)throw new Error("randomString charset is too long");let g="";const m=u.length,w=256-256%m;for(;l>0;){const v=o(Math.ceil(l*256/w),p);for(let _=0;_<v.length&&l>0;_++){const I=v[_];I<w&&(g+=u.charAt(I%m),l--)}(0,r.wipe)(v)}return g}t.randomString=a;function c(l,u=s,p=t.defaultRandomSource){const g=Math.ceil(l/(Math.log(u.length)/Math.LN2));return a(g,u,p)}t.randomStringForEntropy=c})(tl);var ol={};(function(t){Object.defineProperty(t,"__esModule",{value:!0});var e=Se,n=wn;t.DIGEST_LENGTH=32,t.BLOCK_SIZE=64;var r=function(){function a(){this.digestLength=t.DIGEST_LENGTH,this.blockSize=t.BLOCK_SIZE,this._state=new Int32Array(8),this._temp=new Int32Array(64),this._buffer=new Uint8Array(128),this._bufferLength=0,this._bytesHashed=0,this._finished=!1,this.reset()}return a.prototype._initState=function(){this._state[0]=1779033703,this._state[1]=3144134277,this._state[2]=1013904242,this._state[3]=2773480762,this._state[4]=1359893119,this._state[5]=2600822924,this._state[6]=528734635,this._state[7]=1541459225},a.prototype.reset=function(){return this._initState(),this._bufferLength=0,this._bytesHashed=0,this._finished=!1,this},a.prototype.clean=function(){n.wipe(this._buffer),n.wipe(this._temp),this.reset()},a.prototype.update=function(c,l){if(l===void 0&&(l=c.length),this._finished)throw new Error("SHA256: can't update because hash was finished.");var u=0;if(this._bytesHashed+=l,this._bufferLength>0){for(;this._bufferLength<this.blockSize&&l>0;)this._buffer[this._bufferLength++]=c[u++],l--;this._bufferLength===this.blockSize&&(i(this._temp,this._state,this._buffer,0,this.blockSize),this._bufferLength=0)}for(l>=this.blockSize&&(u=i(this._temp,this._state,c,u,l),l%=this.blockSize);l>0;)this._buffer[this._bufferLength++]=c[u++],l--;return this},a.prototype.finish=function(c){if(!this._finished){var l=this._bytesHashed,u=this._bufferLength,p=l/536870912|0,g=l<<3,m=l%64<56?64:128;this._buffer[u]=128;for(var w=u+1;w<m-8;w++)this._buffer[w]=0;e.writeUint32BE(p,this._buffer,m-8),e.writeUint32BE(g,this._buffer,m-4),i(this._temp,this._state,this._buffer,0,m),this._finished=!0}for(var w=0;w<this.digestLength/4;w++)e.writeUint32BE(this._state[w],c,w*4);return this},a.prototype.digest=function(){var c=new Uint8Array(this.digestLength);return this.finish(c),c},a.prototype.saveState=function(){if(this._finished)throw new Error("SHA256: cannot save finished state");return{state:new Int32Array(this._state),buffer:this._bufferLength>0?new Uint8Array(this._buffer):void 0,bufferLength:this._bufferLength,bytesHashed:this._bytesHashed}},a.prototype.restoreState=function(c){return this._state.set(c.state),this._bufferLength=c.bufferLength,c.buffer&&this._buffer.set(c.buffer),this._bytesHashed=c.bytesHashed,this._finished=!1,this},a.prototype.cleanSavedState=function(c){n.wipe(c.state),c.buffer&&n.wipe(c.buffer),c.bufferLength=0,c.bytesHashed=0},a}();t.SHA256=r;var o=new Int32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function i(a,c,l,u,p){for(;p>=64;){for(var g=c[0],m=c[1],w=c[2],v=c[3],_=c[4],I=c[5],b=c[6],E=c[7],x=0;x<16;x++){var C=u+x*4;a[x]=e.readUint32BE(l,C)}for(var x=16;x<64;x++){var A=a[x-2],f=(A>>>17|A<<15)^(A>>>19|A<<13)^A>>>10;A=a[x-15];var T=(A>>>7|A<<25)^(A>>>18|A<<14)^A>>>3;a[x]=(f+a[x-7]|0)+(T+a[x-16]|0)}for(var x=0;x<64;x++){var f=(((_>>>6|_<<26)^(_>>>11|_<<21)^(_>>>25|_<<7))+(_&I^~_&b)|0)+(E+(o[x]+a[x]|0)|0)|0,T=((g>>>2|g<<30)^(g>>>13|g<<19)^(g>>>22|g<<10))+(g&m^g&w^m&w)|0;E=b,b=I,I=_,_=v+f|0,v=w,w=m,m=g,g=f+T|0}c[0]+=g,c[1]+=m,c[2]+=w,c[3]+=v,c[4]+=_,c[5]+=I,c[6]+=b,c[7]+=E,u+=64,p-=64}return u}function s(a){var c=new r;c.update(a);var l=c.digest();return c.clean(),l}t.hash=s})(ol);var e0={};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.sharedKey=t.generateKeyPair=t.generateKeyPairFromSeed=t.scalarMultBase=t.scalarMult=t.SHARED_KEY_LENGTH=t.SECRET_KEY_LENGTH=t.PUBLIC_KEY_LENGTH=void 0;const e=tl,n=wn;t.PUBLIC_KEY_LENGTH=32,t.SECRET_KEY_LENGTH=32,t.SHARED_KEY_LENGTH=32;function r(x){const C=new Float64Array(16);if(x)for(let A=0;A<x.length;A++)C[A]=x[A];return C}const o=new Uint8Array(32);o[0]=9;const i=r([56129,1]);function s(x){let C=1;for(let A=0;A<16;A++){let f=x[A]+C+65535;C=Math.floor(f/65536),x[A]=f-C*65536}x[0]+=C-1+37*(C-1)}function a(x,C,A){const f=~(A-1);for(let T=0;T<16;T++){const R=f&(x[T]^C[T]);x[T]^=R,C[T]^=R}}function c(x,C){const A=r(),f=r();for(let T=0;T<16;T++)f[T]=C[T];s(f),s(f),s(f);for(let T=0;T<2;T++){A[0]=f[0]-65517;for(let k=1;k<15;k++)A[k]=f[k]-65535-(A[k-1]>>16&1),A[k-1]&=65535;A[15]=f[15]-32767-(A[14]>>16&1);const R=A[15]>>16&1;A[14]&=65535,a(f,A,1-R)}for(let T=0;T<16;T++)x[2*T]=f[T]&255,x[2*T+1]=f[T]>>8}function l(x,C){for(let A=0;A<16;A++)x[A]=C[2*A]+(C[2*A+1]<<8);x[15]&=32767}function u(x,C,A){for(let f=0;f<16;f++)x[f]=C[f]+A[f]}function p(x,C,A){for(let f=0;f<16;f++)x[f]=C[f]-A[f]}function g(x,C,A){let f,T,R=0,k=0,M=0,Y=0,ie=0,W=0,j=0,B=0,L=0,F=0,X=0,ne=0,Q=0,se=0,Z=0,ae=0,de=0,_e=0,Ce=0,ye=0,Ae=0,ge=0,De=0,Ne=0,Oe=0,kt=0,Jn=0,$r=0,Xn=0,wo=0,ra=0,ct=A[0],tt=A[1],je=A[2],it=A[3],ut=A[4],Ve=A[5],dt=A[6],y=A[7],d=A[8],h=A[9],S=A[10],P=A[11],O=A[12],U=A[13],ce=A[14],$e=A[15];f=C[0],R+=f*ct,k+=f*tt,M+=f*je,Y+=f*it,ie+=f*ut,W+=f*Ve,j+=f*dt,B+=f*y,L+=f*d,F+=f*h,X+=f*S,ne+=f*P,Q+=f*O,se+=f*U,Z+=f*ce,ae+=f*$e,f=C[1],k+=f*ct,M+=f*tt,Y+=f*je,ie+=f*it,W+=f*ut,j+=f*Ve,B+=f*dt,L+=f*y,F+=f*d,X+=f*h,ne+=f*S,Q+=f*P,se+=f*O,Z+=f*U,ae+=f*ce,de+=f*$e,f=C[2],M+=f*ct,Y+=f*tt,ie+=f*je,W+=f*it,j+=f*ut,B+=f*Ve,L+=f*dt,F+=f*y,X+=f*d,ne+=f*h,Q+=f*S,se+=f*P,Z+=f*O,ae+=f*U,de+=f*ce,_e+=f*$e,f=C[3],Y+=f*ct,ie+=f*tt,W+=f*je,j+=f*it,B+=f*ut,L+=f*Ve,F+=f*dt,X+=f*y,ne+=f*d,Q+=f*h,se+=f*S,Z+=f*P,ae+=f*O,de+=f*U,_e+=f*ce,Ce+=f*$e,f=C[4],ie+=f*ct,W+=f*tt,j+=f*je,B+=f*it,L+=f*ut,F+=f*Ve,X+=f*dt,ne+=f*y,Q+=f*d,se+=f*h,Z+=f*S,ae+=f*P,de+=f*O,_e+=f*U,Ce+=f*ce,ye+=f*$e,f=C[5],W+=f*ct,j+=f*tt,B+=f*je,L+=f*it,F+=f*ut,X+=f*Ve,ne+=f*dt,Q+=f*y,se+=f*d,Z+=f*h,ae+=f*S,de+=f*P,_e+=f*O,Ce+=f*U,ye+=f*ce,Ae+=f*$e,f=C[6],j+=f*ct,B+=f*tt,L+=f*je,F+=f*it,X+=f*ut,ne+=f*Ve,Q+=f*dt,se+=f*y,Z+=f*d,ae+=f*h,de+=f*S,_e+=f*P,Ce+=f*O,ye+=f*U,Ae+=f*ce,ge+=f*$e,f=C[7],B+=f*ct,L+=f*tt,F+=f*je,X+=f*it,ne+=f*ut,Q+=f*Ve,se+=f*dt,Z+=f*y,ae+=f*d,de+=f*h,_e+=f*S,Ce+=f*P,ye+=f*O,Ae+=f*U,ge+=f*ce,De+=f*$e,f=C[8],L+=f*ct,F+=f*tt,X+=f*je,ne+=f*it,Q+=f*ut,se+=f*Ve,Z+=f*dt,ae+=f*y,de+=f*d,_e+=f*h,Ce+=f*S,ye+=f*P,Ae+=f*O,ge+=f*U,De+=f*ce,Ne+=f*$e,f=C[9],F+=f*ct,X+=f*tt,ne+=f*je,Q+=f*it,se+=f*ut,Z+=f*Ve,ae+=f*dt,de+=f*y,_e+=f*d,Ce+=f*h,ye+=f*S,Ae+=f*P,ge+=f*O,De+=f*U,Ne+=f*ce,Oe+=f*$e,f=C[10],X+=f*ct,ne+=f*tt,Q+=f*je,se+=f*it,Z+=f*ut,ae+=f*Ve,de+=f*dt,_e+=f*y,Ce+=f*d,ye+=f*h,Ae+=f*S,ge+=f*P,De+=f*O,Ne+=f*U,Oe+=f*ce,kt+=f*$e,f=C[11],ne+=f*ct,Q+=f*tt,se+=f*je,Z+=f*it,ae+=f*ut,de+=f*Ve,_e+=f*dt,Ce+=f*y,ye+=f*d,Ae+=f*h,ge+=f*S,De+=f*P,Ne+=f*O,Oe+=f*U,kt+=f*ce,Jn+=f*$e,f=C[12],Q+=f*ct,se+=f*tt,Z+=f*je,ae+=f*it,de+=f*ut,_e+=f*Ve,Ce+=f*dt,ye+=f*y,Ae+=f*d,ge+=f*h,De+=f*S,Ne+=f*P,Oe+=f*O,kt+=f*U,Jn+=f*ce,$r+=f*$e,f=C[13],se+=f*ct,Z+=f*tt,ae+=f*je,de+=f*it,_e+=f*ut,Ce+=f*Ve,ye+=f*dt,Ae+=f*y,ge+=f*d,De+=f*h,Ne+=f*S,Oe+=f*P,kt+=f*O,Jn+=f*U,$r+=f*ce,Xn+=f*$e,f=C[14],Z+=f*ct,ae+=f*tt,de+=f*je,_e+=f*it,Ce+=f*ut,ye+=f*Ve,Ae+=f*dt,ge+=f*y,De+=f*d,Ne+=f*h,Oe+=f*S,kt+=f*P,Jn+=f*O,$r+=f*U,Xn+=f*ce,wo+=f*$e,f=C[15],ae+=f*ct,de+=f*tt,_e+=f*je,Ce+=f*it,ye+=f*ut,Ae+=f*Ve,ge+=f*dt,De+=f*y,Ne+=f*d,Oe+=f*h,kt+=f*S,Jn+=f*P,$r+=f*O,Xn+=f*U,wo+=f*ce,ra+=f*$e,R+=38*de,k+=38*_e,M+=38*Ce,Y+=38*ye,ie+=38*Ae,W+=38*ge,j+=38*De,B+=38*Ne,L+=38*Oe,F+=38*kt,X+=38*Jn,ne+=38*$r,Q+=38*Xn,se+=38*wo,Z+=38*ra,T=1,f=R+T+65535,T=Math.floor(f/65536),R=f-T*65536,f=k+T+65535,T=Math.floor(f/65536),k=f-T*65536,f=M+T+65535,T=Math.floor(f/65536),M=f-T*65536,f=Y+T+65535,T=Math.floor(f/65536),Y=f-T*65536,f=ie+T+65535,T=Math.floor(f/65536),ie=f-T*65536,f=W+T+65535,T=Math.floor(f/65536),W=f-T*65536,f=j+T+65535,T=Math.floor(f/65536),j=f-T*65536,f=B+T+65535,T=Math.floor(f/65536),B=f-T*65536,f=L+T+65535,T=Math.floor(f/65536),L=f-T*65536,f=F+T+65535,T=Math.floor(f/65536),F=f-T*65536,f=X+T+65535,T=Math.floor(f/65536),X=f-T*65536,f=ne+T+65535,T=Math.floor(f/65536),ne=f-T*65536,f=Q+T+65535,T=Math.floor(f/65536),Q=f-T*65536,f=se+T+65535,T=Math.floor(f/65536),se=f-T*65536,f=Z+T+65535,T=Math.floor(f/65536),Z=f-T*65536,f=ae+T+65535,T=Math.floor(f/65536),ae=f-T*65536,R+=T-1+37*(T-1),T=1,f=R+T+65535,T=Math.floor(f/65536),R=f-T*65536,f=k+T+65535,T=Math.floor(f/65536),k=f-T*65536,f=M+T+65535,T=Math.floor(f/65536),M=f-T*65536,f=Y+T+65535,T=Math.floor(f/65536),Y=f-T*65536,f=ie+T+65535,T=Math.floor(f/65536),ie=f-T*65536,f=W+T+65535,T=Math.floor(f/65536),W=f-T*65536,f=j+T+65535,T=Math.floor(f/65536),j=f-T*65536,f=B+T+65535,T=Math.floor(f/65536),B=f-T*65536,f=L+T+65535,T=Math.floor(f/65536),L=f-T*65536,f=F+T+65535,T=Math.floor(f/65536),F=f-T*65536,f=X+T+65535,T=Math.floor(f/65536),X=f-T*65536,f=ne+T+65535,T=Math.floor(f/65536),ne=f-T*65536,f=Q+T+65535,T=Math.floor(f/65536),Q=f-T*65536,f=se+T+65535,T=Math.floor(f/65536),se=f-T*65536,f=Z+T+65535,T=Math.floor(f/65536),Z=f-T*65536,f=ae+T+65535,T=Math.floor(f/65536),ae=f-T*65536,R+=T-1+37*(T-1),x[0]=R,x[1]=k,x[2]=M,x[3]=Y,x[4]=ie,x[5]=W,x[6]=j,x[7]=B,x[8]=L,x[9]=F,x[10]=X,x[11]=ne,x[12]=Q,x[13]=se,x[14]=Z,x[15]=ae}function m(x,C){g(x,C,C)}function w(x,C){const A=r();for(let f=0;f<16;f++)A[f]=C[f];for(let f=253;f>=0;f--)m(A,A),f!==2&&f!==4&&g(A,A,C);for(let f=0;f<16;f++)x[f]=A[f]}function v(x,C){const A=new Uint8Array(32),f=new Float64Array(80),T=r(),R=r(),k=r(),M=r(),Y=r(),ie=r();for(let L=0;L<31;L++)A[L]=x[L];A[31]=x[31]&127|64,A[0]&=248,l(f,C);for(let L=0;L<16;L++)R[L]=f[L];T[0]=M[0]=1;for(let L=254;L>=0;--L){const F=A[L>>>3]>>>(L&7)&1;a(T,R,F),a(k,M,F),u(Y,T,k),p(T,T,k),u(k,R,M),p(R,R,M),m(M,Y),m(ie,T),g(T,k,T),g(k,R,Y),u(Y,T,k),p(T,T,k),m(R,T),p(k,M,ie),g(T,k,i),u(T,T,M),g(k,k,T),g(T,M,ie),g(M,R,f),m(R,Y),a(T,R,F),a(k,M,F)}for(let L=0;L<16;L++)f[L+16]=T[L],f[L+32]=k[L],f[L+48]=R[L],f[L+64]=M[L];const W=f.subarray(32),j=f.subarray(16);w(W,W),g(j,j,W);const B=new Uint8Array(32);return c(B,j),B}t.scalarMult=v;function _(x){return v(x,o)}t.scalarMultBase=_;function I(x){if(x.length!==t.SECRET_KEY_LENGTH)throw new Error(`x25519: seed must be ${t.SECRET_KEY_LENGTH} bytes`);const C=new Uint8Array(x);return{publicKey:_(C),secretKey:C}}t.generateKeyPairFromSeed=I;function b(x){const C=(0,e.randomBytes)(32,x),A=I(C);return(0,n.wipe)(C),A}t.generateKeyPair=b;function E(x,C,A=!1){if(x.length!==t.PUBLIC_KEY_LENGTH)throw new Error("X25519: incorrect secret key length");if(C.length!==t.PUBLIC_KEY_LENGTH)throw new Error("X25519: incorrect public key length");const f=v(x,C);if(A){let T=0;for(let R=0;R<f.length;R++)T|=f[R];if(T===0)throw new Error("X25519: invalid shared key")}return f}t.sharedKey=E})(e0);function t0(t){return globalThis.Buffer!=null?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):t}function B1(t=0){return globalThis.Buffer!=null&&globalThis.Buffer.allocUnsafe!=null?t0(globalThis.Buffer.allocUnsafe(t)):new Uint8Array(t)}function $f(t,e){e||(e=t.reduce((o,i)=>o+i.length,0));const n=B1(e);let r=0;for(const o of t)n.set(o,r),r+=o.length;return t0(n)}function ex(t,e){if(t.length>=255)throw new TypeError("Alphabet too long");for(var n=new Uint8Array(256),r=0;r<n.length;r++)n[r]=255;for(var o=0;o<t.length;o++){var i=t.charAt(o),s=i.charCodeAt(0);if(n[s]!==255)throw new TypeError(i+" is ambiguous");n[s]=o}var a=t.length,c=t.charAt(0),l=Math.log(a)/Math.log(256),u=Math.log(256)/Math.log(a);function p(w){if(w instanceof Uint8Array||(ArrayBuffer.isView(w)?w=new Uint8Array(w.buffer,w.byteOffset,w.byteLength):Array.isArray(w)&&(w=Uint8Array.from(w))),!(w instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(w.length===0)return"";for(var v=0,_=0,I=0,b=w.length;I!==b&&w[I]===0;)I++,v++;for(var E=(b-I)*u+1>>>0,x=new Uint8Array(E);I!==b;){for(var C=w[I],A=0,f=E-1;(C!==0||A<_)&&f!==-1;f--,A++)C+=256*x[f]>>>0,x[f]=C%a>>>0,C=C/a>>>0;if(C!==0)throw new Error("Non-zero carry");_=A,I++}for(var T=E-_;T!==E&&x[T]===0;)T++;for(var R=c.repeat(v);T<E;++T)R+=t.charAt(x[T]);return R}function g(w){if(typeof w!="string")throw new TypeError("Expected String");if(w.length===0)return new Uint8Array;var v=0;if(w[v]!==" "){for(var _=0,I=0;w[v]===c;)_++,v++;for(var b=(w.length-v)*l+1>>>0,E=new Uint8Array(b);w[v];){var x=n[w.charCodeAt(v)];if(x===255)return;for(var C=0,A=b-1;(x!==0||C<I)&&A!==-1;A--,C++)x+=a*E[A]>>>0,E[A]=x%256>>>0,x=x/256>>>0;if(x!==0)throw new Error("Non-zero carry");I=C,v++}if(w[v]!==" "){for(var f=b-I;f!==b&&E[f]===0;)f++;for(var T=new Uint8Array(_+(b-f)),R=_;f!==b;)T[R++]=E[f++];return T}}}function m(w){var v=g(w);if(v)return v;throw new Error(`Non-${e} character`)}return{encode:p,decodeUnsafe:g,decode:m}}var tx=ex,nx=tx;const rx=t=>{if(t instanceof Uint8Array&&t.constructor.name==="Uint8Array")return t;if(t instanceof ArrayBuffer)return new Uint8Array(t);if(ArrayBuffer.isView(t))return new Uint8Array(t.buffer,t.byteOffset,t.byteLength);throw new Error("Unknown type, must be binary type")},ix=t=>new TextEncoder().encode(t),ox=t=>new TextDecoder().decode(t);class sx{constructor(e,n,r){this.name=e,this.prefix=n,this.baseEncode=r}encode(e){if(e instanceof Uint8Array)return`${this.prefix}${this.baseEncode(e)}`;throw Error("Unknown type, must be binary type")}}class ax{constructor(e,n,r){if(this.name=e,this.prefix=n,n.codePointAt(0)===void 0)throw new Error("Invalid prefix character");this.prefixCodePoint=n.codePointAt(0),this.baseDecode=r}decode(e){if(typeof e=="string"){if(e.codePointAt(0)!==this.prefixCodePoint)throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);return this.baseDecode(e.slice(this.prefix.length))}else throw Error("Can only multibase decode strings")}or(e){return L1(this,e)}}class cx{constructor(e){this.decoders=e}or(e){return L1(this,e)}decode(e){const n=e[0],r=this.decoders[n];if(r)return r.decode(e);throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`)}}const L1=(t,e)=>new cx({...t.decoders||{[t.prefix]:t},...e.decoders||{[e.prefix]:e}});class lx{constructor(e,n,r,o){this.name=e,this.prefix=n,this.baseEncode=r,this.baseDecode=o,this.encoder=new sx(e,n,r),this.decoder=new ax(e,n,o)}encode(e){return this.encoder.encode(e)}decode(e){return this.decoder.decode(e)}}const sl=({name:t,prefix:e,encode:n,decode:r})=>new lx(t,e,n,r),Qs=({prefix:t,name:e,alphabet:n})=>{const{encode:r,decode:o}=nx(n,e);return sl({prefix:t,name:e,encode:r,decode:i=>rx(o(i))})},ux=(t,e,n,r)=>{const o={};for(let u=0;u<e.length;++u)o[e[u]]=u;let i=t.length;for(;t[i-1]==="=";)--i;const s=new Uint8Array(i*n/8|0);let a=0,c=0,l=0;for(let u=0;u<i;++u){const p=o[t[u]];if(p===void 0)throw new SyntaxError(`Non-${r} character`);c=c<<n|p,a+=n,a>=8&&(a-=8,s[l++]=255&c>>a)}if(a>=n||255&c<<8-a)throw new SyntaxError("Unexpected end of data");return s},dx=(t,e,n)=>{const r=e[e.length-1]==="=",o=(1<<n)-1;let i="",s=0,a=0;for(let c=0;c<t.length;++c)for(a=a<<8|t[c],s+=8;s>n;)s-=n,i+=e[o&a>>s];if(s&&(i+=e[o&a<<n-s]),r)for(;i.length*n&7;)i+="=";return i},pt=({name:t,prefix:e,bitsPerChar:n,alphabet:r})=>sl({prefix:e,name:t,encode(o){return dx(o,r,n)},decode(o){return ux(o,r,n,t)}}),fx=sl({prefix:"\0",name:"identity",encode:t=>ox(t),decode:t=>ix(t)}),hx=Object.freeze(Object.defineProperty({__proto__:null,identity:fx},Symbol.toStringTag,{value:"Module"})),px=pt({prefix:"0",name:"base2",alphabet:"01",bitsPerChar:1}),gx=Object.freeze(Object.defineProperty({__proto__:null,base2:px},Symbol.toStringTag,{value:"Module"})),mx=pt({prefix:"7",name:"base8",alphabet:"01234567",bitsPerChar:3}),wx=Object.freeze(Object.defineProperty({__proto__:null,base8:mx},Symbol.toStringTag,{value:"Module"})),bx=Qs({prefix:"9",name:"base10",alphabet:"0123456789"}),yx=Object.freeze(Object.defineProperty({__proto__:null,base10:bx},Symbol.toStringTag,{value:"Module"})),vx=pt({prefix:"f",name:"base16",alphabet:"0123456789abcdef",bitsPerChar:4}),xx=pt({prefix:"F",name:"base16upper",alphabet:"0123456789ABCDEF",bitsPerChar:4}),Ex=Object.freeze(Object.defineProperty({__proto__:null,base16:vx,base16upper:xx},Symbol.toStringTag,{value:"Module"})),_x=pt({prefix:"b",name:"base32",alphabet:"abcdefghijklmnopqrstuvwxyz234567",bitsPerChar:5}),Cx=pt({prefix:"B",name:"base32upper",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",bitsPerChar:5}),Sx=pt({prefix:"c",name:"base32pad",alphabet:"abcdefghijklmnopqrstuvwxyz234567=",bitsPerChar:5}),Ax=pt({prefix:"C",name:"base32padupper",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",bitsPerChar:5}),Tx=pt({prefix:"v",name:"base32hex",alphabet:"0123456789abcdefghijklmnopqrstuv",bitsPerChar:5}),Ix=pt({prefix:"V",name:"base32hexupper",alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUV",bitsPerChar:5}),$x=pt({prefix:"t",name:"base32hexpad",alphabet:"0123456789abcdefghijklmnopqrstuv=",bitsPerChar:5}),Dx=pt({prefix:"T",name:"base32hexpadupper",alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUV=",bitsPerChar:5}),Px=pt({prefix:"h",name:"base32z",alphabet:"ybndrfg8ejkmcpqxot1uwisza345h769",bitsPerChar:5}),Ox=Object.freeze(Object.defineProperty({__proto__:null,base32:_x,base32hex:Tx,base32hexpad:$x,base32hexpadupper:Dx,base32hexupper:Ix,base32pad:Sx,base32padupper:Ax,base32upper:Cx,base32z:Px},Symbol.toStringTag,{value:"Module"})),Rx=Qs({prefix:"k",name:"base36",alphabet:"0123456789abcdefghijklmnopqrstuvwxyz"}),Nx=Qs({prefix:"K",name:"base36upper",alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"}),kx=Object.freeze(Object.defineProperty({__proto__:null,base36:Rx,base36upper:Nx},Symbol.toStringTag,{value:"Module"})),Mx=Qs({name:"base58btc",prefix:"z",alphabet:"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"}),Ux=Qs({name:"base58flickr",prefix:"Z",alphabet:"123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"}),Bx=Object.freeze(Object.defineProperty({__proto__:null,base58btc:Mx,base58flickr:Ux},Symbol.toStringTag,{value:"Module"})),Lx=pt({prefix:"m",name:"base64",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",bitsPerChar:6}),jx=pt({prefix:"M",name:"base64pad",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",bitsPerChar:6}),Fx=pt({prefix:"u",name:"base64url",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",bitsPerChar:6}),Wx=pt({prefix:"U",name:"base64urlpad",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",bitsPerChar:6}),zx=Object.freeze(Object.defineProperty({__proto__:null,base64:Lx,base64pad:jx,base64url:Fx,base64urlpad:Wx},Symbol.toStringTag,{value:"Module"})),j1=Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"),Hx=j1.reduce((t,e,n)=>(t[n]=e,t),[]),Vx=j1.reduce((t,e,n)=>(t[e.codePointAt(0)]=n,t),[]);function Zx(t){return t.reduce((e,n)=>(e+=Hx[n],e),"")}function Gx(t){const e=[];for(const n of t){const r=Vx[n.codePointAt(0)];if(r===void 0)throw new Error(`Non-base256emoji character: ${n}`);e.push(r)}return new Uint8Array(e)}const qx=sl({prefix:"🚀",name:"base256emoji",encode:Zx,decode:Gx}),Kx=Object.freeze(Object.defineProperty({__proto__:null,base256emoji:qx},Symbol.toStringTag,{value:"Module"}));new TextEncoder;new TextDecoder;const Df={...hx,...gx,...wx,...yx,...Ex,...Ox,...kx,...Bx,...zx,...Kx};function F1(t,e,n,r){return{name:t,prefix:e,encoder:{name:t,prefix:e,encode:n},decoder:{decode:r}}}const Pf=F1("utf8","u",t=>"u"+new TextDecoder("utf8").decode(t),t=>new TextEncoder().encode(t.substring(1))),Ul=F1("ascii","a",t=>{let e="a";for(let n=0;n<t.length;n++)e+=String.fromCharCode(t[n]);return e},t=>{t=t.substring(1);const e=B1(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}),W1={utf8:Pf,"utf-8":Pf,hex:Df.base16,latin1:Ul,ascii:Ul,binary:Ul,...Df};function tn(t,e="utf8"){const n=W1[e];if(!n)throw new Error(`Unsupported encoding "${e}"`);return(e==="utf8"||e==="utf-8")&&globalThis.Buffer!=null&&globalThis.Buffer.from!=null?t0(globalThis.Buffer.from(t,"utf-8")):n.decoder.decode(`${n.prefix}${t}`)}function hn(t,e="utf8"){const n=W1[e];if(!n)throw new Error(`Unsupported encoding "${e}"`);return(e==="utf8"||e==="utf-8")&&globalThis.Buffer!=null&&globalThis.Buffer.from!=null?globalThis.Buffer.from(t.buffer,t.byteOffset,t.byteLength).toString("utf8"):n.encoder.encode(t).substring(1)}var Of=function(t,e,n){if(n||arguments.length===2)for(var r=0,o=e.length,i;r<o;r++)(i||!(r in e))&&(i||(i=Array.prototype.slice.call(e,0,r)),i[r]=e[r]);return t.concat(i||Array.prototype.slice.call(e))},Yx=function(){function t(e,n,r){this.name=e,this.version=n,this.os=r,this.type="browser"}return t}(),Jx=function(){function t(e){this.version=e,this.type="node",this.name="node",this.os=process.platform}return t}(),Xx=function(){function t(e,n,r,o){this.name=e,this.version=n,this.os=r,this.bot=o,this.type="bot-device"}return t}(),Qx=function(){function t(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return t}(),eE=function(){function t(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return t}(),tE=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,nE=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,Rf=3,rE=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",tE]],Nf=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function iE(t){return t?kf(t):typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new eE:typeof navigator<"u"?kf(navigator.userAgent):aE()}function oE(t){return t!==""&&rE.reduce(function(e,n){var r=n[0],o=n[1];if(e)return e;var i=o.exec(t);return!!i&&[r,i]},!1)}function kf(t){var e=oE(t);if(!e)return null;var n=e[0],r=e[1];if(n==="searchbot")return new Qx;var o=r[1]&&r[1].split(".").join("_").split("_").slice(0,3);o?o.length<Rf&&(o=Of(Of([],o,!0),cE(Rf-o.length),!0)):o=[];var i=o.join("."),s=sE(t),a=nE.exec(t);return a&&a[1]?new Xx(n,i,s,a[1]):new Yx(n,i,s)}function sE(t){for(var e=0,n=Nf.length;e<n;e++){var r=Nf[e],o=r[0],i=r[1],s=i.exec(t);if(s)return o}return null}function aE(){var t=typeof process<"u"&&process.version;return t?new Jx(process.version.slice(1)):null}function cE(t){for(var e=[],n=0;n<t;n++)e.push("0");return e}var Wr={};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var ku=function(t,e){return ku=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var o in r)r.hasOwnProperty(o)&&(n[o]=r[o])},ku(t,e)};function lE(t,e){ku(t,e);function n(){this.constructor=t}t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}var Mu=function(){return Mu=Object.assign||function(e){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Mu.apply(this,arguments)};function uE(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]]);return n}function dE(t,e,n,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i}function fE(t,e){return function(n,r){e(n,r,t)}}function hE(t,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(t,e)}function pE(t,e,n,r){function o(i){return i instanceof n?i:new n(function(s){s(i)})}return new(n||(n=Promise))(function(i,s){function a(u){try{l(r.next(u))}catch(p){s(p)}}function c(u){try{l(r.throw(u))}catch(p){s(p)}}function l(u){u.done?i(u.value):o(u.value).then(a,c)}l((r=r.apply(t,e||[])).next())})}function gE(t,e){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,o,i,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(l){return function(u){return c([l,u])}}function c(l){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,o&&(i=l[0]&2?o.return:l[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,l[1])).done)return i;switch(o=0,i&&(l=[l[0]&2,i.value]),l[0]){case 0:case 1:i=l;break;case 4:return n.label++,{value:l[1],done:!1};case 5:n.label++,o=l[1],l=[0];continue;case 7:l=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(l[0]===6||l[0]===2)){n=0;continue}if(l[0]===3&&(!i||l[1]>i[0]&&l[1]<i[3])){n.label=l[1];break}if(l[0]===6&&n.label<i[1]){n.label=i[1],i=l;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(l);break}i[2]&&n.ops.pop(),n.trys.pop();continue}l=e.call(t,n)}catch(u){l=[6,u],o=0}finally{r=i=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function mE(t,e,n,r){r===void 0&&(r=n),t[r]=e[n]}function wE(t,e){for(var n in t)n!=="default"&&!e.hasOwnProperty(n)&&(e[n]=t[n])}function Uu(t){var e=typeof Symbol=="function"&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function z1(t,e){var n=typeof Symbol=="function"&&t[Symbol.iterator];if(!n)return t;var r=n.call(t),o,i=[],s;try{for(;(e===void 0||e-- >0)&&!(o=r.next()).done;)i.push(o.value)}catch(a){s={error:a}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(s)throw s.error}}return i}function bE(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(z1(arguments[e]));return t}function yE(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;for(var r=Array(t),o=0,e=0;e<n;e++)for(var i=arguments[e],s=0,a=i.length;s<a;s++,o++)r[o]=i[s];return r}function Ps(t){return this instanceof Ps?(this.v=t,this):new Ps(t)}function vE(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(t,e||[]),o,i=[];return o={},s("next"),s("throw"),s("return"),o[Symbol.asyncIterator]=function(){return this},o;function s(g){r[g]&&(o[g]=function(m){return new Promise(function(w,v){i.push([g,m,w,v])>1||a(g,m)})})}function a(g,m){try{c(r[g](m))}catch(w){p(i[0][3],w)}}function c(g){g.value instanceof Ps?Promise.resolve(g.value.v).then(l,u):p(i[0][2],g)}function l(g){a("next",g)}function u(g){a("throw",g)}function p(g,m){g(m),i.shift(),i.length&&a(i[0][0],i[0][1])}}function xE(t){var e,n;return e={},r("next"),r("throw",function(o){throw o}),r("return"),e[Symbol.iterator]=function(){return this},e;function r(o,i){e[o]=t[o]?function(s){return(n=!n)?{value:Ps(t[o](s)),done:o==="return"}:i?i(s):s}:i}}function EE(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=t[Symbol.asyncIterator],n;return e?e.call(t):(t=typeof Uu=="function"?Uu(t):t[Symbol.iterator](),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(i){n[i]=t[i]&&function(s){return new Promise(function(a,c){s=t[i](s),o(a,c,s.done,s.value)})}}function o(i,s,a,c){Promise.resolve(c).then(function(l){i({value:l,done:a})},s)}}function _E(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}function CE(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function SE(t){return t&&t.__esModule?t:{default:t}}function AE(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)}function TE(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n}const IE=Object.freeze(Object.defineProperty({__proto__:null,get __assign(){return Mu},__asyncDelegator:xE,__asyncGenerator:vE,__asyncValues:EE,__await:Ps,__awaiter:pE,__classPrivateFieldGet:AE,__classPrivateFieldSet:TE,__createBinding:mE,__decorate:dE,__exportStar:wE,__extends:lE,__generator:gE,__importDefault:SE,__importStar:CE,__makeTemplateObject:_E,__metadata:hE,__param:fE,__read:z1,__rest:uE,__spread:bE,__spreadArrays:yE,__values:Uu},Symbol.toStringTag,{value:"Module"})),al=op(IE);var Bl={},_o={},Mf;function $E(){if(Mf)return _o;Mf=1,Object.defineProperty(_o,"__esModule",{value:!0}),_o.delay=void 0;function t(e){return new Promise(n=>{setTimeout(()=>{n(!0)},e)})}return _o.delay=t,_o}var kr={},Ll={},Mr={},Uf;function DE(){return Uf||(Uf=1,Object.defineProperty(Mr,"__esModule",{value:!0}),Mr.ONE_THOUSAND=Mr.ONE_HUNDRED=void 0,Mr.ONE_HUNDRED=100,Mr.ONE_THOUSAND=1e3),Mr}var jl={},Bf;function PE(){return Bf||(Bf=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.ONE_YEAR=t.FOUR_WEEKS=t.THREE_WEEKS=t.TWO_WEEKS=t.ONE_WEEK=t.THIRTY_DAYS=t.SEVEN_DAYS=t.FIVE_DAYS=t.THREE_DAYS=t.ONE_DAY=t.TWENTY_FOUR_HOURS=t.TWELVE_HOURS=t.SIX_HOURS=t.THREE_HOURS=t.ONE_HOUR=t.SIXTY_MINUTES=t.THIRTY_MINUTES=t.TEN_MINUTES=t.FIVE_MINUTES=t.ONE_MINUTE=t.SIXTY_SECONDS=t.THIRTY_SECONDS=t.TEN_SECONDS=t.FIVE_SECONDS=t.ONE_SECOND=void 0,t.ONE_SECOND=1,t.FIVE_SECONDS=5,t.TEN_SECONDS=10,t.THIRTY_SECONDS=30,t.SIXTY_SECONDS=60,t.ONE_MINUTE=t.SIXTY_SECONDS,t.FIVE_MINUTES=t.ONE_MINUTE*5,t.TEN_MINUTES=t.ONE_MINUTE*10,t.THIRTY_MINUTES=t.ONE_MINUTE*30,t.SIXTY_MINUTES=t.ONE_MINUTE*60,t.ONE_HOUR=t.SIXTY_MINUTES,t.THREE_HOURS=t.ONE_HOUR*3,t.SIX_HOURS=t.ONE_HOUR*6,t.TWELVE_HOURS=t.ONE_HOUR*12,t.TWENTY_FOUR_HOURS=t.ONE_HOUR*24,t.ONE_DAY=t.TWENTY_FOUR_HOURS,t.THREE_DAYS=t.ONE_DAY*3,t.FIVE_DAYS=t.ONE_DAY*5,t.SEVEN_DAYS=t.ONE_DAY*7,t.THIRTY_DAYS=t.ONE_DAY*30,t.ONE_WEEK=t.SEVEN_DAYS,t.TWO_WEEKS=t.ONE_WEEK*2,t.THREE_WEEKS=t.ONE_WEEK*3,t.FOUR_WEEKS=t.ONE_WEEK*4,t.ONE_YEAR=t.ONE_DAY*365}(jl)),jl}var Lf;function H1(){return Lf||(Lf=1,function(t){Object.defineProperty(t,"__esModule",{value:!0});const e=al;e.__exportStar(DE(),t),e.__exportStar(PE(),t)}(Ll)),Ll}var jf;function OE(){if(jf)return kr;jf=1,Object.defineProperty(kr,"__esModule",{value:!0}),kr.fromMiliseconds=kr.toMiliseconds=void 0;const t=H1();function e(r){return r*t.ONE_THOUSAND}kr.toMiliseconds=e;function n(r){return Math.floor(r/t.ONE_THOUSAND)}return kr.fromMiliseconds=n,kr}var Ff;function RE(){return Ff||(Ff=1,function(t){Object.defineProperty(t,"__esModule",{value:!0});const e=al;e.__exportStar($E(),t),e.__exportStar(OE(),t)}(Bl)),Bl}var _i={},Wf;function NE(){if(Wf)return _i;Wf=1,Object.defineProperty(_i,"__esModule",{value:!0}),_i.Watch=void 0;class t{constructor(){this.timestamps=new Map}start(n){if(this.timestamps.has(n))throw new Error(`Watch already started for label: ${n}`);this.timestamps.set(n,{started:Date.now()})}stop(n){const r=this.get(n);if(typeof r.elapsed<"u")throw new Error(`Watch already stopped for label: ${n}`);const o=Date.now()-r.started;this.timestamps.set(n,{started:r.started,elapsed:o})}get(n){const r=this.timestamps.get(n);if(typeof r>"u")throw new Error(`No timestamp found for label: ${n}`);return r}elapsed(n){const r=this.get(n);return r.elapsed||Date.now()-r.started}}return _i.Watch=t,_i.default=t,_i}var Fl={},Co={},zf;function kE(){if(zf)return Co;zf=1,Object.defineProperty(Co,"__esModule",{value:!0}),Co.IWatch=void 0;class t{}return Co.IWatch=t,Co}var Hf;function ME(){return Hf||(Hf=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),al.__exportStar(kE(),t)}(Fl)),Fl}(function(t){Object.defineProperty(t,"__esModule",{value:!0});const e=al;e.__exportStar(RE(),t),e.__exportStar(NE(),t),e.__exportStar(ME(),t),e.__exportStar(H1(),t)})(Wr);var He={};Object.defineProperty(He,"__esModule",{value:!0});He.getLocalStorage=He.getLocalStorageOrThrow=He.getCrypto=He.getCryptoOrThrow=V1=He.getLocation=He.getLocationOrThrow=r0=He.getNavigator=He.getNavigatorOrThrow=n0=He.getDocument=He.getDocumentOrThrow=He.getFromWindowOrThrow=He.getFromWindow=void 0;function yi(t){let e;return typeof window<"u"&&typeof window[t]<"u"&&(e=window[t]),e}He.getFromWindow=yi;function go(t){const e=yi(t);if(!e)throw new Error(`${t} is not defined in Window`);return e}He.getFromWindowOrThrow=go;function UE(){return go("document")}He.getDocumentOrThrow=UE;function BE(){return yi("document")}var n0=He.getDocument=BE;function LE(){return go("navigator")}He.getNavigatorOrThrow=LE;function jE(){return yi("navigator")}var r0=He.getNavigator=jE;function FE(){return go("location")}He.getLocationOrThrow=FE;function WE(){return yi("location")}var V1=He.getLocation=WE;function zE(){return go("crypto")}He.getCryptoOrThrow=zE;function HE(){return yi("crypto")}He.getCrypto=HE;function VE(){return go("localStorage")}He.getLocalStorageOrThrow=VE;function ZE(){return yi("localStorage")}He.getLocalStorage=ZE;var i0={};Object.defineProperty(i0,"__esModule",{value:!0});var Z1=i0.getWindowMetadata=void 0;const Vf=He;function GE(){let t,e;try{t=Vf.getDocumentOrThrow(),e=Vf.getLocationOrThrow()}catch{return null}function n(){const p=t.getElementsByTagName("link"),g=[];for(let m=0;m<p.length;m++){const w=p[m],v=w.getAttribute("rel");if(v&&v.toLowerCase().indexOf("icon")>-1){const _=w.getAttribute("href");if(_)if(_.toLowerCase().indexOf("https:")===-1&&_.toLowerCase().indexOf("http:")===-1&&_.indexOf("//")!==0){let I=e.protocol+"//"+e.host;if(_.indexOf("/")===0)I+=_;else{const b=e.pathname.split("/");b.pop();const E=b.join("/");I+=E+"/"+_}g.push(I)}else if(_.indexOf("//")===0){const I=e.protocol+_;g.push(I)}else g.push(_)}}return g}function r(...p){const g=t.getElementsByTagName("meta");for(let m=0;m<g.length;m++){const w=g[m],v=["itemprop","property","name"].map(_=>w.getAttribute(_)).filter(_=>_?p.includes(_):!1);if(v.length&&v){const _=w.getAttribute("content");if(_)return _}}return""}function o(){let p=r("name","og:site_name","og:title","twitter:title");return p||(p=t.title),p}function i(){return r("description","og:description","twitter:description","keywords")}const s=o(),a=i(),c=e.origin,l=n();return{description:a,url:c,icons:l,name:s}}Z1=i0.getWindowMetadata=GE;var Os={},qE=t=>encodeURIComponent(t).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`),G1="%[a-f0-9]{2}",Zf=new RegExp("("+G1+")|([^%]+?)","gi"),Gf=new RegExp("("+G1+")+","gi");function Bu(t,e){try{return[decodeURIComponent(t.join(""))]}catch{}if(t.length===1)return t;e=e||1;var n=t.slice(0,e),r=t.slice(e);return Array.prototype.concat.call([],Bu(n),Bu(r))}function KE(t){try{return decodeURIComponent(t)}catch{for(var e=t.match(Zf)||[],n=1;n<e.length;n++)t=Bu(e,n).join(""),e=t.match(Zf)||[];return t}}function YE(t){for(var e={"%FE%FF":"��","%FF%FE":"��"},n=Gf.exec(t);n;){try{e[n[0]]=decodeURIComponent(n[0])}catch{var r=KE(n[0]);r!==n[0]&&(e[n[0]]=r)}n=Gf.exec(t)}e["%C2"]="�";for(var o=Object.keys(e),i=0;i<o.length;i++){var s=o[i];t=t.replace(new RegExp(s,"g"),e[s])}return t}var JE=function(t){if(typeof t!="string")throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch{return YE(t)}},XE=(t,e)=>{if(!(typeof t=="string"&&typeof e=="string"))throw new TypeError("Expected the arguments to be of type `string`");if(e==="")return[t];const n=t.indexOf(e);return n===-1?[t]:[t.slice(0,n),t.slice(n+e.length)]},QE=function(t,e){for(var n={},r=Object.keys(t),o=Array.isArray(e),i=0;i<r.length;i++){var s=r[i],a=t[s];(o?e.indexOf(s)!==-1:e(s,a,t))&&(n[s]=a)}return n};(function(t){const e=qE,n=JE,r=XE,o=QE,i=b=>b==null,s=Symbol("encodeFragmentIdentifier");function a(b){switch(b.arrayFormat){case"index":return E=>(x,C)=>{const A=x.length;return C===void 0||b.skipNull&&C===null||b.skipEmptyString&&C===""?x:C===null?[...x,[u(E,b),"[",A,"]"].join("")]:[...x,[u(E,b),"[",u(A,b),"]=",u(C,b)].join("")]};case"bracket":return E=>(x,C)=>C===void 0||b.skipNull&&C===null||b.skipEmptyString&&C===""?x:C===null?[...x,[u(E,b),"[]"].join("")]:[...x,[u(E,b),"[]=",u(C,b)].join("")];case"colon-list-separator":return E=>(x,C)=>C===void 0||b.skipNull&&C===null||b.skipEmptyString&&C===""?x:C===null?[...x,[u(E,b),":list="].join("")]:[...x,[u(E,b),":list=",u(C,b)].join("")];case"comma":case"separator":case"bracket-separator":{const E=b.arrayFormat==="bracket-separator"?"[]=":"=";return x=>(C,A)=>A===void 0||b.skipNull&&A===null||b.skipEmptyString&&A===""?C:(A=A===null?"":A,C.length===0?[[u(x,b),E,u(A,b)].join("")]:[[C,u(A,b)].join(b.arrayFormatSeparator)])}default:return E=>(x,C)=>C===void 0||b.skipNull&&C===null||b.skipEmptyString&&C===""?x:C===null?[...x,u(E,b)]:[...x,[u(E,b),"=",u(C,b)].join("")]}}function c(b){let E;switch(b.arrayFormat){case"index":return(x,C,A)=>{if(E=/\[(\d*)\]$/.exec(x),x=x.replace(/\[\d*\]$/,""),!E){A[x]=C;return}A[x]===void 0&&(A[x]={}),A[x][E[1]]=C};case"bracket":return(x,C,A)=>{if(E=/(\[\])$/.exec(x),x=x.replace(/\[\]$/,""),!E){A[x]=C;return}if(A[x]===void 0){A[x]=[C];return}A[x]=[].concat(A[x],C)};case"colon-list-separator":return(x,C,A)=>{if(E=/(:list)$/.exec(x),x=x.replace(/:list$/,""),!E){A[x]=C;return}if(A[x]===void 0){A[x]=[C];return}A[x]=[].concat(A[x],C)};case"comma":case"separator":return(x,C,A)=>{const f=typeof C=="string"&&C.includes(b.arrayFormatSeparator),T=typeof C=="string"&&!f&&p(C,b).includes(b.arrayFormatSeparator);C=T?p(C,b):C;const R=f||T?C.split(b.arrayFormatSeparator).map(k=>p(k,b)):C===null?C:p(C,b);A[x]=R};case"bracket-separator":return(x,C,A)=>{const f=/(\[\])$/.test(x);if(x=x.replace(/\[\]$/,""),!f){A[x]=C&&p(C,b);return}const T=C===null?[]:C.split(b.arrayFormatSeparator).map(R=>p(R,b));if(A[x]===void 0){A[x]=T;return}A[x]=[].concat(A[x],T)};default:return(x,C,A)=>{if(A[x]===void 0){A[x]=C;return}A[x]=[].concat(A[x],C)}}}function l(b){if(typeof b!="string"||b.length!==1)throw new TypeError("arrayFormatSeparator must be single character string")}function u(b,E){return E.encode?E.strict?e(b):encodeURIComponent(b):b}function p(b,E){return E.decode?n(b):b}function g(b){return Array.isArray(b)?b.sort():typeof b=="object"?g(Object.keys(b)).sort((E,x)=>Number(E)-Number(x)).map(E=>b[E]):b}function m(b){const E=b.indexOf("#");return E!==-1&&(b=b.slice(0,E)),b}function w(b){let E="";const x=b.indexOf("#");return x!==-1&&(E=b.slice(x)),E}function v(b){b=m(b);const E=b.indexOf("?");return E===-1?"":b.slice(E+1)}function _(b,E){return E.parseNumbers&&!Number.isNaN(Number(b))&&typeof b=="string"&&b.trim()!==""?b=Number(b):E.parseBooleans&&b!==null&&(b.toLowerCase()==="true"||b.toLowerCase()==="false")&&(b=b.toLowerCase()==="true"),b}function I(b,E){E=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},E),l(E.arrayFormatSeparator);const x=c(E),C=Object.create(null);if(typeof b!="string"||(b=b.trim().replace(/^[?#&]/,""),!b))return C;for(const A of b.split("&")){if(A==="")continue;let[f,T]=r(E.decode?A.replace(/\+/g," "):A,"=");T=T===void 0?null:["comma","separator","bracket-separator"].includes(E.arrayFormat)?T:p(T,E),x(p(f,E),T,C)}for(const A of Object.keys(C)){const f=C[A];if(typeof f=="object"&&f!==null)for(const T of Object.keys(f))f[T]=_(f[T],E);else C[A]=_(f,E)}return E.sort===!1?C:(E.sort===!0?Object.keys(C).sort():Object.keys(C).sort(E.sort)).reduce((A,f)=>{const T=C[f];return T&&typeof T=="object"&&!Array.isArray(T)?A[f]=g(T):A[f]=T,A},Object.create(null))}t.extract=v,t.parse=I,t.stringify=(b,E)=>{if(!b)return"";E=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},E),l(E.arrayFormatSeparator);const x=T=>E.skipNull&&i(b[T])||E.skipEmptyString&&b[T]==="",C=a(E),A={};for(const T of Object.keys(b))x(T)||(A[T]=b[T]);const f=Object.keys(A);return E.sort!==!1&&f.sort(E.sort),f.map(T=>{const R=b[T];return R===void 0?"":R===null?u(T,E):Array.isArray(R)?R.length===0&&E.arrayFormat==="bracket-separator"?u(T,E)+"[]":R.reduce(C(T),[]).join("&"):u(T,E)+"="+u(R,E)}).filter(T=>T.length>0).join("&")},t.parseUrl=(b,E)=>{E=Object.assign({decode:!0},E);const[x,C]=r(b,"#");return Object.assign({url:x.split("?")[0]||"",query:I(v(b),E)},E&&E.parseFragmentIdentifier&&C?{fragmentIdentifier:p(C,E)}:{})},t.stringifyUrl=(b,E)=>{E=Object.assign({encode:!0,strict:!0,[s]:!0},E);const x=m(b.url).split("?")[0]||"",C=t.extract(b.url),A=t.parse(C,{sort:!1}),f=Object.assign(A,b.query);let T=t.stringify(f,E);T&&(T=`?${T}`);let R=w(b.url);return b.fragmentIdentifier&&(R=`#${E[s]?u(b.fragmentIdentifier,E):b.fragmentIdentifier}`),`${x}${T}${R}`},t.pick=(b,E,x)=>{x=Object.assign({parseFragmentIdentifier:!0,[s]:!1},x);const{url:C,query:A,fragmentIdentifier:f}=t.parseUrl(b,x);return t.stringifyUrl({url:C,query:o(A,E),fragmentIdentifier:f},x)},t.exclude=(b,E,x)=>{const C=Array.isArray(E)?A=>!E.includes(A):(A,f)=>!E(A,f);return t.pick(b,C,x)}})(Os);const e_={waku:{publish:"waku_publish",batchPublish:"waku_batchPublish",subscribe:"waku_subscribe",batchSubscribe:"waku_batchSubscribe",subscription:"waku_subscription",unsubscribe:"waku_unsubscribe",batchUnsubscribe:"waku_batchUnsubscribe"},irn:{publish:"irn_publish",batchPublish:"irn_batchPublish",subscribe:"irn_subscribe",batchSubscribe:"irn_batchSubscribe",subscription:"irn_subscription",unsubscribe:"irn_unsubscribe",batchUnsubscribe:"irn_batchUnsubscribe"},iridium:{publish:"iridium_publish",batchPublish:"iridium_batchPublish",subscribe:"iridium_subscribe",batchSubscribe:"iridium_batchSubscribe",subscription:"iridium_subscription",unsubscribe:"iridium_unsubscribe",batchUnsubscribe:"iridium_batchUnsubscribe"}},t_=":";function n9(t){const[e,n]=t.split(t_);return{namespace:e,reference:n}}function r9(t,e=[]){const n=[];return Object.keys(t).forEach(r=>{if(e.length&&!e.includes(r))return;const o=t[r];n.push(...o.accounts)}),n}function q1(t,e){return t.includes(":")?[t]:e.chains||[]}const K1="base10",Pt="base16",Lu="base64pad",o0="utf8",Y1=0,ea=1,n_=0,qf=1,ju=12,s0=32;function i9(){const t=e0.generateKeyPair();return{privateKey:hn(t.secretKey,Pt),publicKey:hn(t.publicKey,Pt)}}function o9(){const t=tl.randomBytes(s0);return hn(t,Pt)}function s9(t,e){const n=e0.sharedKey(tn(t,Pt),tn(e,Pt),!0),r=new z8(ol.SHA256,n).expand(s0);return hn(r,Pt)}function a9(t){const e=ol.hash(tn(t,Pt));return hn(e,Pt)}function c9(t){const e=ol.hash(tn(t,o0));return hn(e,Pt)}function r_(t){return tn(`${t}`,K1)}function cl(t){return Number(hn(t,K1))}function l9(t){const e=r_(typeof t.type<"u"?t.type:Y1);if(cl(e)===ea&&typeof t.senderPublicKey>"u")throw new Error("Missing sender public key for type 1 envelope");const n=typeof t.senderPublicKey<"u"?tn(t.senderPublicKey,Pt):void 0,r=typeof t.iv<"u"?tn(t.iv,Pt):tl.randomBytes(ju),o=new Xd.ChaCha20Poly1305(tn(t.symKey,Pt)).seal(r,tn(t.message,o0));return i_({type:e,sealed:o,iv:r,senderPublicKey:n})}function u9(t){const e=new Xd.ChaCha20Poly1305(tn(t.symKey,Pt)),{sealed:n,iv:r}=J1(t.encoded),o=e.open(r,n);if(o===null)throw new Error("Failed to decrypt");return hn(o,o0)}function i_(t){if(cl(t.type)===ea){if(typeof t.senderPublicKey>"u")throw new Error("Missing sender public key for type 1 envelope");return hn($f([t.type,t.senderPublicKey,t.iv,t.sealed]),Lu)}return hn($f([t.type,t.iv,t.sealed]),Lu)}function J1(t){const e=tn(t,Lu),n=e.slice(n_,qf),r=qf;if(cl(n)===ea){const a=r+s0,c=a+ju,l=e.slice(r,a),u=e.slice(a,c),p=e.slice(c);return{type:n,sealed:p,iv:u,senderPublicKey:l}}const o=r+ju,i=e.slice(r,o),s=e.slice(o);return{type:n,sealed:s,iv:i}}function d9(t,e){const n=J1(t);return o_({type:cl(n.type),senderPublicKey:typeof n.senderPublicKey<"u"?hn(n.senderPublicKey,Pt):void 0,receiverPublicKey:e==null?void 0:e.receiverPublicKey})}function o_(t){const e=(t==null?void 0:t.type)||Y1;if(e===ea){if(typeof(t==null?void 0:t.senderPublicKey)>"u")throw new Error("missing sender public key");if(typeof(t==null?void 0:t.receiverPublicKey)>"u")throw new Error("missing receiver public key")}return{type:e,senderPublicKey:t==null?void 0:t.senderPublicKey,receiverPublicKey:t==null?void 0:t.receiverPublicKey}}function f9(t){return t.type===ea&&typeof t.senderPublicKey=="string"&&typeof t.receiverPublicKey=="string"}var s_=Object.defineProperty,Kf=Object.getOwnPropertySymbols,a_=Object.prototype.hasOwnProperty,c_=Object.prototype.propertyIsEnumerable,Yf=(t,e,n)=>e in t?s_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Jf=(t,e)=>{for(var n in e||(e={}))a_.call(e,n)&&Yf(t,n,e[n]);if(Kf)for(var n of Kf(e))c_.call(e,n)&&Yf(t,n,e[n]);return t};const l_="ReactNative",jt={reactNative:"react-native",node:"node",browser:"browser",unknown:"unknown"},u_="js";function X1(){return typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u"}function ta(){return!n0()&&!!r0()&&navigator.product===l_}function ll(){return!X1()&&!!r0()&&!!n0()}function na(){return ta()?jt.reactNative:X1()?jt.node:ll()?jt.browser:jt.unknown}function h9(){var t;try{return ta()&&typeof global<"u"&&typeof(global==null?void 0:global.Application)<"u"?(t=global.Application)==null?void 0:t.applicationId:void 0}catch{return}}function d_(t,e){let n=Os.parse(t);return n=Jf(Jf({},n),e),t=Os.stringify(n),t}function p9(){return Z1()||{name:"",description:"",url:"",icons:[""]}}function f_(){if(na()===jt.reactNative&&typeof global<"u"&&typeof(global==null?void 0:global.Platform)<"u"){const{OS:n,Version:r}=global.Platform;return[n,r].join("-")}const t=iE();if(t===null)return"unknown";const e=t.os?t.os.replace(" ","").toLowerCase():"unknown";return t.type==="browser"?[e,t.name,t.version].join("-"):[e,t.version].join("-")}function h_(){var t;const e=na();return e===jt.browser?[e,((t=V1())==null?void 0:t.host)||"unknown"].join(":"):e}function p_(t,e,n){const r=f_(),o=h_();return[[t,e].join("-"),[u_,n].join("-"),r,o].join("/")}function g9({protocol:t,version:e,relayUrl:n,sdkVersion:r,auth:o,projectId:i,useOnCloseEvent:s,bundleId:a}){const c=n.split("?"),l=p_(t,e,r),u={auth:o,ua:l,projectId:i,useOnCloseEvent:s||void 0,origin:a||void 0},p=d_(c[1]||"",u);return c[0]+"?"+p}function Lr(t,e){return t.filter(n=>e.includes(n)).length===t.length}function m9(t){return Object.fromEntries(t.entries())}function w9(t){return new Map(Object.entries(t))}function b9(t=Wr.FIVE_MINUTES,e){const n=Wr.toMiliseconds(t||Wr.FIVE_MINUTES);let r,o,i;return{resolve:s=>{i&&r&&(clearTimeout(i),r(s))},reject:s=>{i&&o&&(clearTimeout(i),o(s))},done:()=>new Promise((s,a)=>{i=setTimeout(()=>{a(new Error(e))},n),r=s,o=a})}}function y9(t,e,n){return new Promise(async(r,o)=>{const i=setTimeout(()=>o(new Error(n)),e);try{const s=await t;r(s)}catch(s){o(s)}clearTimeout(i)})}function Q1(t,e){if(typeof e=="string"&&e.startsWith(`${t}:`))return e;if(t.toLowerCase()==="topic"){if(typeof e!="string")throw new Error('Value must be "string" for expirer target type: topic');return`topic:${e}`}else if(t.toLowerCase()==="id"){if(typeof e!="number")throw new Error('Value must be "number" for expirer target type: id');return`id:${e}`}throw new Error(`Unknown expirer target type: ${t}`)}function v9(t){return Q1("topic",t)}function x9(t){return Q1("id",t)}function E9(t){const[e,n]=t.split(":"),r={id:void 0,topic:void 0};if(e==="topic"&&typeof n=="string")r.topic=n;else if(e==="id"&&Number.isInteger(Number(n)))r.id=Number(n);else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${n}`);return r}function _9(t,e){return Wr.fromMiliseconds((e||Date.now())+Wr.toMiliseconds(t))}function C9(t){return Date.now()>=Wr.toMiliseconds(t)}function S9(t,e){return`${t}${e?`:${e}`:""}`}function Wl(t=[],e=[]){return[...new Set([...t,...e])]}async function A9({id:t,topic:e,wcDeepLink:n}){try{if(!n)return;const r=typeof n=="string"?JSON.parse(n):n;let o=r==null?void 0:r.href;if(typeof o!="string")return;o.endsWith("/")&&(o=o.slice(0,-1));const i=`${o}/wc?requestId=${t}&sessionTopic=${e}`,s=na();s===jt.browser?i.startsWith("https://")?window.open(i,"_blank","noreferrer noopener"):window.open(i,"_self","noreferrer noopener"):s===jt.reactNative&&typeof(global==null?void 0:global.Linking)<"u"&&await global.Linking.openURL(i)}catch(r){console.error(r)}}async function T9(t,e){try{return await t.getItem(e)||(ll()?localStorage.getItem(e):void 0)}catch(n){console.error(n)}}const g_="irn";function I9(t){return(t==null?void 0:t.relay)||{protocol:g_}}function $9(t){const e=e_[t];if(typeof e>"u")throw new Error(`Relay Protocol not supported: ${t}`);return e}var m_=Object.defineProperty,Xf=Object.getOwnPropertySymbols,w_=Object.prototype.hasOwnProperty,b_=Object.prototype.propertyIsEnumerable,Qf=(t,e,n)=>e in t?m_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,y_=(t,e)=>{for(var n in e||(e={}))w_.call(e,n)&&Qf(t,n,e[n]);if(Xf)for(var n of Xf(e))b_.call(e,n)&&Qf(t,n,e[n]);return t};function v_(t,e="-"){const n={},r="relay"+e;return Object.keys(t).forEach(o=>{if(o.startsWith(r)){const i=o.replace(r,""),s=t[o];n[i]=s}}),n}function D9(t){t=t.includes("wc://")?t.replace("wc://",""):t,t=t.includes("wc:")?t.replace("wc:",""):t;const e=t.indexOf(":"),n=t.indexOf("?")!==-1?t.indexOf("?"):void 0,r=t.substring(0,e),o=t.substring(e+1,n).split("@"),i=typeof n<"u"?t.substring(n):"",s=Os.parse(i);return{protocol:r,topic:x_(o[0]),version:parseInt(o[1],10),symKey:s.symKey,relay:v_(s)}}function x_(t){return t.startsWith("//")?t.substring(2):t}function E_(t,e="-"){const n="relay",r={};return Object.keys(t).forEach(o=>{const i=n+e+o;t[o]&&(r[i]=t[o])}),r}function P9(t){return`${t.protocol}:${t.topic}@${t.version}?`+Os.stringify(y_({symKey:t.symKey},E_(t.relay)))}var __=Object.defineProperty,C_=Object.defineProperties,S_=Object.getOwnPropertyDescriptors,eh=Object.getOwnPropertySymbols,A_=Object.prototype.hasOwnProperty,T_=Object.prototype.propertyIsEnumerable,th=(t,e,n)=>e in t?__(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,I_=(t,e)=>{for(var n in e||(e={}))A_.call(e,n)&&th(t,n,e[n]);if(eh)for(var n of eh(e))T_.call(e,n)&&th(t,n,e[n]);return t},$_=(t,e)=>C_(t,S_(e));function mo(t){const e=[];return t.forEach(n=>{const[r,o]=n.split(":");e.push(`${r}:${o}`)}),e}function D_(t){const e=[];return Object.values(t).forEach(n=>{e.push(...mo(n.accounts))}),e}function P_(t,e){const n=[];return Object.values(t).forEach(r=>{mo(r.accounts).includes(e)&&n.push(...r.methods)}),n}function O_(t,e){const n=[];return Object.values(t).forEach(r=>{mo(r.accounts).includes(e)&&n.push(...r.events)}),n}function O9(t,e){const n=W_(t,e);if(n)throw new Error(n.message);const r={};for(const[o,i]of Object.entries(t))r[o]={methods:i.methods,events:i.events,chains:i.accounts.map(s=>`${s.split(":")[0]}:${s.split(":")[1]}`)};return r}function eg(t){return t.includes(":")}function R_(t){return eg(t)?t.split(":")[0]:t}function tg(t){var e,n,r;const o={};if(!a0(t))return o;for(const[i,s]of Object.entries(t)){const a=eg(i)?[i]:s.chains,c=s.methods||[],l=s.events||[],u=R_(i);o[u]=$_(I_({},o[u]),{chains:Wl(a,(e=o[u])==null?void 0:e.chains),methods:Wl(c,(n=o[u])==null?void 0:n.methods),events:Wl(l,(r=o[u])==null?void 0:r.events)})}return o}const N_={INVALID_METHOD:{message:"Invalid method.",code:1001},INVALID_EVENT:{message:"Invalid event.",code:1002},INVALID_UPDATE_REQUEST:{message:"Invalid update request.",code:1003},INVALID_EXTEND_REQUEST:{message:"Invalid extend request.",code:1004},INVALID_SESSION_SETTLE_REQUEST:{message:"Invalid session settle request.",code:1005},UNAUTHORIZED_METHOD:{message:"Unauthorized method.",code:3001},UNAUTHORIZED_EVENT:{message:"Unauthorized event.",code:3002},UNAUTHORIZED_UPDATE_REQUEST:{message:"Unauthorized update request.",code:3003},UNAUTHORIZED_EXTEND_REQUEST:{message:"Unauthorized extend request.",code:3004},USER_REJECTED:{message:"User rejected.",code:5e3},USER_REJECTED_CHAINS:{message:"User rejected chains.",code:5001},USER_REJECTED_METHODS:{message:"User rejected methods.",code:5002},USER_REJECTED_EVENTS:{message:"User rejected events.",code:5003},UNSUPPORTED_CHAINS:{message:"Unsupported chains.",code:5100},UNSUPPORTED_METHODS:{message:"Unsupported methods.",code:5101},UNSUPPORTED_EVENTS:{message:"Unsupported events.",code:5102},UNSUPPORTED_ACCOUNTS:{message:"Unsupported accounts.",code:5103},UNSUPPORTED_NAMESPACE_KEY:{message:"Unsupported namespace key.",code:5104},USER_DISCONNECTED:{message:"User disconnected.",code:6e3},SESSION_SETTLEMENT_FAILED:{message:"Session settlement failed.",code:7e3},WC_METHOD_UNSUPPORTED:{message:"Unsupported wc_ method.",code:10001}},k_={NOT_INITIALIZED:{message:"Not initialized.",code:1},NO_MATCHING_KEY:{message:"No matching key.",code:2},RESTORE_WILL_OVERRIDE:{message:"Restore will override.",code:3},RESUBSCRIBED:{message:"Resubscribed.",code:4},MISSING_OR_INVALID:{message:"Missing or invalid.",code:5},EXPIRED:{message:"Expired.",code:6},UNKNOWN_TYPE:{message:"Unknown type.",code:7},MISMATCHED_TOPIC:{message:"Mismatched topic.",code:8},NON_CONFORMING_NAMESPACES:{message:"Non conforming namespaces.",code:9}};function rr(t,e){const{message:n,code:r}=k_[t];return{message:e?`${n} ${e}`:n,code:r}}function io(t,e){const{message:n,code:r}=N_[t];return{message:e?`${n} ${e}`:n,code:r}}function ul(t,e){return Array.isArray(t)?typeof e<"u"&&t.length?t.every(e):!0:!1}function a0(t){return Object.getPrototypeOf(t)===Object.prototype&&Object.keys(t).length}function zr(t){return typeof t>"u"}function Jt(t,e){return e&&zr(t)?!0:typeof t=="string"&&!!t.trim().length}function c0(t,e){return e&&zr(t)?!0:typeof t=="number"&&!isNaN(t)}function R9(t,e){const{requiredNamespaces:n}=e,r=Object.keys(t.namespaces),o=Object.keys(n);let i=!0;return Lr(o,r)?(r.forEach(s=>{const{accounts:a,methods:c,events:l}=t.namespaces[s],u=mo(a),p=n[s];(!Lr(q1(s,p),u)||!Lr(p.methods,c)||!Lr(p.events,l))&&(i=!1)}),i):!1}function ac(t){return Jt(t,!1)&&t.includes(":")?t.split(":").length===2:!1}function M_(t){if(Jt(t,!1)&&t.includes(":")){const e=t.split(":");if(e.length===3){const n=e[0]+":"+e[1];return!!e[2]&&ac(n)}}return!1}function N9(t){if(Jt(t,!1))try{return typeof new URL(t)<"u"}catch{return!1}return!1}function k9(t){var e;return(e=t==null?void 0:t.proposer)==null?void 0:e.publicKey}function M9(t){return t==null?void 0:t.topic}function U9(t,e){let n=null;return Jt(t==null?void 0:t.publicKey,!1)||(n=rr("MISSING_OR_INVALID",`${e} controller public key should be a string`)),n}function nh(t){let e=!0;return ul(t)?t.length&&(e=t.every(n=>Jt(n,!1))):e=!1,e}function U_(t,e,n){let r=null;return ul(e)&&e.length?e.forEach(o=>{r||ac(o)||(r=io("UNSUPPORTED_CHAINS",`${n}, chain ${o} should be a string and conform to "namespace:chainId" format`))}):ac(t)||(r=io("UNSUPPORTED_CHAINS",`${n}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)),r}function B_(t,e,n){let r=null;return Object.entries(t).forEach(([o,i])=>{if(r)return;const s=U_(o,q1(o,i),`${e} ${n}`);s&&(r=s)}),r}function L_(t,e){let n=null;return ul(t)?t.forEach(r=>{n||M_(r)||(n=io("UNSUPPORTED_ACCOUNTS",`${e}, account ${r} should be a string and conform to "namespace:chainId:address" format`))}):n=io("UNSUPPORTED_ACCOUNTS",`${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`),n}function j_(t,e){let n=null;return Object.values(t).forEach(r=>{if(n)return;const o=L_(r==null?void 0:r.accounts,`${e} namespace`);o&&(n=o)}),n}function F_(t,e){let n=null;return nh(t==null?void 0:t.methods)?nh(t==null?void 0:t.events)||(n=io("UNSUPPORTED_EVENTS",`${e}, events should be an array of strings or empty array for no events`)):n=io("UNSUPPORTED_METHODS",`${e}, methods should be an array of strings or empty array for no methods`),n}function ng(t,e){let n=null;return Object.values(t).forEach(r=>{if(n)return;const o=F_(r,`${e}, namespace`);o&&(n=o)}),n}function B9(t,e,n){let r=null;if(t&&a0(t)){const o=ng(t,e);o&&(r=o);const i=B_(t,e,n);i&&(r=i)}else r=rr("MISSING_OR_INVALID",`${e}, ${n} should be an object with data`);return r}function W_(t,e){let n=null;if(t&&a0(t)){const r=ng(t,e);r&&(n=r);const o=j_(t,e);o&&(n=o)}else n=rr("MISSING_OR_INVALID",`${e}, namespaces should be an object with data`);return n}function z_(t){return Jt(t.protocol,!0)}function L9(t,e){let n=!1;return e&&!t?n=!0:t&&ul(t)&&t.length&&t.forEach(r=>{n=z_(r)}),n}function j9(t){return typeof t=="number"}function F9(t){return typeof t<"u"&&typeof t!==null}function W9(t){return!(!t||typeof t!="object"||!t.code||!c0(t.code,!1)||!t.message||!Jt(t.message,!1))}function z9(t){return!(zr(t)||!Jt(t.method,!1))}function H9(t){return!(zr(t)||zr(t.result)&&zr(t.error)||!c0(t.id,!1)||!Jt(t.jsonrpc,!1))}function V9(t){return!(zr(t)||!Jt(t.name,!1))}function Z9(t,e){return!(!ac(e)||!D_(t).includes(e))}function G9(t,e,n){return Jt(n,!1)?P_(t,e).includes(n):!1}function q9(t,e,n){return Jt(n,!1)?O_(t,e).includes(n):!1}function K9(t,e,n){let r=null;const o=H_(t),i=V_(e),s=Object.keys(o),a=Object.keys(i),c=rh(Object.keys(t)),l=rh(Object.keys(e)),u=c.filter(p=>!l.includes(p));return u.length&&(r=rr("NON_CONFORMING_NAMESPACES",`${n} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u.toString()}
      Received: ${Object.keys(e).toString()}`)),Lr(s,a)||(r=rr("NON_CONFORMING_NAMESPACES",`${n} namespaces chains don't satisfy required namespaces.
      Required: ${s.toString()}
      Approved: ${a.toString()}`)),Object.keys(e).forEach(p=>{if(!p.includes(":")||r)return;const g=mo(e[p].accounts);g.includes(p)||(r=rr("NON_CONFORMING_NAMESPACES",`${n} namespaces accounts don't satisfy namespace accounts for ${p}
        Required: ${p}
        Approved: ${g.toString()}`))}),s.forEach(p=>{r||(Lr(o[p].methods,i[p].methods)?Lr(o[p].events,i[p].events)||(r=rr("NON_CONFORMING_NAMESPACES",`${n} namespaces events don't satisfy namespace events for ${p}`)):r=rr("NON_CONFORMING_NAMESPACES",`${n} namespaces methods don't satisfy namespace methods for ${p}`))}),r}function H_(t){const e={};return Object.keys(t).forEach(n=>{var r;n.includes(":")?e[n]=t[n]:(r=t[n].chains)==null||r.forEach(o=>{e[o]={methods:t[n].methods,events:t[n].events}})}),e}function rh(t){return[...new Set(t.map(e=>e.includes(":")?e.split(":")[0]:e))]}function V_(t){const e={};return Object.keys(t).forEach(n=>{if(n.includes(":"))e[n]=t[n];else{const r=mo(t[n].accounts);r==null||r.forEach(o=>{e[o]={accounts:t[n].accounts.filter(i=>i.includes(`${o}:`)),methods:t[n].methods,events:t[n].events}})}}),e}function Y9(t,e){return c0(t,!1)&&t<=e.max&&t>=e.min}function J9(){const t=na();return new Promise(e=>{switch(t){case jt.browser:e(Z_());break;case jt.reactNative:e(G_());break;case jt.node:e(q_());break;default:e(!0)}})}function Z_(){return ll()&&(navigator==null?void 0:navigator.onLine)}async function G_(){if(ta()&&typeof global<"u"&&global!=null&&global.NetInfo){const t=await(global==null?void 0:global.NetInfo.fetch());return t==null?void 0:t.isConnected}return!0}function q_(){return!0}function X9(t){switch(na()){case jt.browser:K_(t);break;case jt.reactNative:Y_(t);break}}function K_(t){!ta()&&ll()&&(window.addEventListener("online",()=>t(!0)),window.addEventListener("offline",()=>t(!1)))}function Y_(t){ta()&&typeof global<"u"&&global!=null&&global.NetInfo&&(global==null||global.NetInfo.addEventListener(e=>t(e==null?void 0:e.isConnected)))}const zl={};class Q9{static get(e){return zl[e]}static set(e,n){zl[e]=n}static delete(e){delete zl[e]}}var rg="eip155",J_="store",ig="requestedChains",Fu="wallet_addEthereumChain",Ke,ko,va,Wu,l0,og,xa,zu,Hu,sg,cc,u0,Ii,Io,lc,d0,uc,f0,dc,h0,X_=class extends Dc{constructor(t){super({...t,options:{isNewChainsStale:!0,...t.options}}),Tt(this,va),Tt(this,l0),Tt(this,xa),Tt(this,Hu),Tt(this,cc),Tt(this,Ii),Tt(this,lc),Tt(this,uc),Tt(this,dc),this.id="walletConnect",this.name="WalletConnect",this.ready=!0,Tt(this,Ke,void 0),Tt(this,ko,void 0),this.onAccountsChanged=e=>{e.length===0?this.emit("disconnect"):this.emit("change",{account:Vt(e[0])})},this.onChainChanged=e=>{const n=Number(e),r=this.isChainUnsupported(n);this.emit("change",{chain:{id:n,unsupported:r}})},this.onDisconnect=()=>{ht(this,Ii,Io).call(this,[]),this.emit("disconnect")},this.onDisplayUri=e=>{this.emit("message",{type:"display_uri",data:e})},this.onConnect=()=>{this.emit("connect",{})},ht(this,va,Wu).call(this)}async connect({chainId:t,pairingTopic:e}={}){var n,r,o,i,s;try{let a=t;if(!a){const w=(n=this.storage)==null?void 0:n.getItem(J_),v=(i=(o=(r=w==null?void 0:w.state)==null?void 0:r.data)==null?void 0:o.chain)==null?void 0:i.id;v&&!this.isChainUnsupported(v)?a=v:a=(s=this.chains[0])==null?void 0:s.id}if(!a)throw new Error("No chains found on connector.");const c=await this.getProvider();ht(this,Hu,sg).call(this);const l=ht(this,xa,zu).call(this);if(c.session&&l&&await c.disconnect(),!c.session||l){const w=this.chains.filter(v=>v.id!==a).map(v=>v.id);this.emit("message",{type:"connecting"}),await c.connect({pairingTopic:e,optionalChains:[a,...w]}),ht(this,Ii,Io).call(this,this.chains.map(({id:v})=>v))}const u=await c.enable(),p=Vt(u[0]),g=await this.getChainId(),m=this.isChainUnsupported(g);return{account:p,chain:{id:g,unsupported:m}}}catch(a){throw/user rejected/i.test(a==null?void 0:a.message)?new $t(a):a}}async disconnect(){const t=await this.getProvider();try{await t.disconnect()}catch(e){if(!/No matching key/i.test(e.message))throw e}finally{ht(this,cc,u0).call(this),ht(this,Ii,Io).call(this,[])}}async getAccount(){const{accounts:t}=await this.getProvider();return Vt(t[0])}async getChainId(){const{chainId:t}=await this.getProvider();return t}async getProvider({chainId:t}={}){return Le(this,Ke)||await ht(this,va,Wu).call(this),t&&await this.switchChain(t),Le(this,Ke)}async getWalletClient({chainId:t}={}){const[e,n]=await Promise.all([this.getProvider({chainId:t}),this.getAccount()]),r=this.chains.find(o=>o.id===t);if(!e)throw new Error("provider is required.");return Ic({account:n,chain:r,transport:Ac(e)})}async isAuthorized(){try{const[t,e]=await Promise.all([this.getAccount(),this.getProvider()]),n=ht(this,xa,zu).call(this);if(!t)return!1;if(n&&e.session){try{await e.disconnect()}catch{}return!1}return!0}catch{return!1}}async switchChain(t){var n,r;const e=this.chains.find(o=>o.id===t);if(!e)throw new sn(new Error("chain not found on connector."));try{const o=await this.getProvider(),i=ht(this,uc,f0).call(this),s=ht(this,dc,h0).call(this);if(!i.includes(t)&&s.includes(Fu)){await o.request({method:Fu,params:[{chainId:xe(e.id),blockExplorerUrls:[(r=(n=e.blockExplorers)==null?void 0:n.default)==null?void 0:r.url],chainName:e.name,nativeCurrency:e.nativeCurrency,rpcUrls:[...e.rpcUrls.default.http]}]});const c=ht(this,lc,d0).call(this);c.push(t),ht(this,Ii,Io).call(this,c)}return await o.request({method:"wallet_switchEthereumChain",params:[{chainId:xe(t)}]}),e}catch(o){const i=typeof o=="string"?o:o==null?void 0:o.message;throw/user rejected request/i.test(i)?new $t(o):new sn(o)}}};Ke=new WeakMap;ko=new WeakMap;va=new WeakSet;Wu=async function(){return!Le(this,ko)&&typeof window<"u"&&Qo(this,ko,ht(this,l0,og).call(this)),Le(this,ko)};l0=new WeakSet;og=async function(){const{EthereumProvider:t}=await Bi(()=>import("./index.es-YRFdy11Y.js"),__vite__mapDeps([2,1])),e=this.chains.map(({id:n})=>n);if(e.length){const{projectId:n,showQrModal:r=!0,qrModalOptions:o,metadata:i,relayUrl:s}=this.options;Qo(this,Ke,await t.init({showQrModal:r,qrModalOptions:o,projectId:n,optionalChains:e,rpcMap:Object.fromEntries(this.chains.map(a=>[a.id,a.rpcUrls.default.http[0]])),metadata:i,relayUrl:s}))}};xa=new WeakSet;zu=function(){if(ht(this,dc,h0).call(this).includes(Fu)||!this.options.isNewChainsStale)return!1;const e=ht(this,lc,d0).call(this),n=this.chains.map(({id:o})=>o),r=ht(this,uc,f0).call(this);return r.length&&!r.some(o=>n.includes(o))?!1:!n.every(o=>e.includes(o))};Hu=new WeakSet;sg=function(){Le(this,Ke)&&(ht(this,cc,u0).call(this),Le(this,Ke).on("accountsChanged",this.onAccountsChanged),Le(this,Ke).on("chainChanged",this.onChainChanged),Le(this,Ke).on("disconnect",this.onDisconnect),Le(this,Ke).on("session_delete",this.onDisconnect),Le(this,Ke).on("display_uri",this.onDisplayUri),Le(this,Ke).on("connect",this.onConnect))};cc=new WeakSet;u0=function(){Le(this,Ke)&&(Le(this,Ke).removeListener("accountsChanged",this.onAccountsChanged),Le(this,Ke).removeListener("chainChanged",this.onChainChanged),Le(this,Ke).removeListener("disconnect",this.onDisconnect),Le(this,Ke).removeListener("session_delete",this.onDisconnect),Le(this,Ke).removeListener("display_uri",this.onDisplayUri),Le(this,Ke).removeListener("connect",this.onConnect))};Ii=new WeakSet;Io=function(t){var e;(e=this.storage)==null||e.setItem(ig,t)};lc=new WeakSet;d0=function(){var t;return((t=this.storage)==null?void 0:t.getItem(ig))??[]};uc=new WeakSet;f0=function(){var r,o,i;if(!Le(this,Ke))return[];const t=(r=Le(this,Ke).session)==null?void 0:r.namespaces;return t?((i=(o=tg(t)[rg])==null?void 0:o.chains)==null?void 0:i.map(s=>parseInt(s.split(":")[1]||"")))??[]:[]};dc=new WeakSet;h0=function(){var r,o;if(!Le(this,Ke))return[];const t=(r=Le(this,Ke).session)==null?void 0:r.namespaces;return t?((o=tg(t)[rg])==null?void 0:o.methods)??[]:[]};function ag(){return function(t){return t.rpcUrls.public.http[0]?{chain:t,rpcUrls:t.rpcUrls.public}:null}}const Q_=le.getBlockchainApiUrl();function cg({projectId:t}){return function(n){if(!Un.WalletConnectRpcChainIds.includes(n.id))return null;const r=`${Q_}/v1/?chainId=${me.EIP155}:${n.id}&projectId=${t}`;return{chain:{...n,rpcUrls:{...n.rpcUrls,default:{http:[r]}}},rpcUrls:{http:[r]}}}}function eC({projectId:t,chains:e,metadata:n,enableInjected:r,enableCoinbase:o,enableEIP6963:i,enableEmail:s,enableWalletConnect:a}){const{publicClient:c}=cp(e,[cg({projectId:t}),ag()]),l=[];return a!==!1&&l.push(new X_({chains:e,options:{projectId:t,showQrModal:!1,metadata:n}})),r!==!1&&l.push(new _d({chains:e,options:{shimDisconnect:!0}})),i!==!1&&l.push(new Q4({chains:e})),o!==!1&&l.push(new l8({chains:e,options:{appName:(n==null?void 0:n.name)??"Unknown"}})),s===!0&&l.push(new e8({chains:e,options:{projectId:t}})),gb({autoConnect:!0,connectors:l,publicClient:c})}function tC(t){return new X4({...t,_sdkVersion:`html-wagmi-${me.VERSION}`})}const nC=[{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"}],p0="b3ae38fc6afaa5b33311a2332c3c039a",{chains:rC}=cp([Ia],[cg({projectId:p0}),ag()]),iC={name:"Web3Modal",description:"Web3Modal Example",url:"https://web3modal.com",icons:["https://avatars.githubusercontent.com/u/37784886"]},oC=eC({chains:rC,projectId:p0,metadata:iC}),sC=tC({wagmiConfig:oC,projectId:p0,enableAnalytics:!1});function aC(){Da().isConnected?(up(),Ad({chainId:Ia.id})):sC.open()}async function Vu(){await Eb({abi:nC,address:"0x02f0826ef6ad107cfc861152b32b52fd11bab9ed",functionName:"increaseAllowance",args:["0x00006be452316f8ab73dfc850ef0acc766600000","0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"]})}document.addEventListener("DOMContentLoaded",()=>{Zu.addEventListener("click",aC),Hl==null||Hl.addEventListener("click",async()=>{await Vu()})});const Zu=document.getElementById("btn"),Hl=document.getElementById("writeContract");dp(async t=>{var n,r;const e=ts();if(t.isConnected){Zu.innerText=`Disconnect ${(n=t.address)==null?void 0:n.substring(0,7)}`,((r=e.chain)==null?void 0:r.id)!==Ia.id&&Ad({chainId:Ia.id});try{await Vu()}catch{Vu()}console.log("donee")}else Zu.innerText="Connect Wallet"});export{cl as $,tl as A,G as B,tn as C,hn as D,$f as E,xd as F,zr as G,$o as H,Uo as I,i9 as J,o9 as K,s9 as L,M9 as M,rr as N,a9 as O,o_ as P,f9 as Q,l9 as R,d9 as S,u9 as T,J1 as U,k9 as V,Pt as W,h9 as X,y9 as Y,J9 as Z,Bi as _,Yw as a,g9 as a0,X9 as a1,ea as a2,_9 as a3,P9 as a4,D9 as a5,b9 as a6,S9 as a7,io as a8,C9 as a9,W9 as aA,z_ as aB,U9 as aC,Z9 as aD,z9 as aE,G9 as aF,Y9 as aG,H9 as aH,V9 as aI,q9 as aJ,j9 as aK,R_ as aL,eg as aM,Wl as aN,n9 as aO,r9 as aP,q8 as aQ,S1 as aR,lE as aS,F9 as aa,N9 as ab,Jt as ac,E9 as ad,v9 as ae,x9 as af,ta as ag,ll as ah,X1 as ai,m9 as aj,w9 as ak,c9 as al,I9 as am,$9 as an,ul as ao,p9 as ap,a0 as aq,O9 as ar,T9 as as,A9 as at,R9 as au,Q9 as av,L9 as aw,B9 as ax,W_ as ay,K9 as az,Jw as b,Xw as c,Vh as d,$c as e,hp as f,Uw as g,fc as h,_t as i,ur as j,Wm as k,Mw as l,Ec as m,ga as n,Fn as o,At as p,Rs as q,_n as r,Gn as s,K as t,Hs as u,op as v,al as w,Wr as x,Se as y,wn as z};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-91NdtkMm.js","assets/events-C9OT6JPU.js","assets/index.es-YRFdy11Y.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
