/* eslint-env mocha */
/* eslint prefer-arrow-callback: 'off' */
/* eslint max-len: 'off' */
/* eslint camelcase: "off" */

'use strict';

const assert = require('../test/util/assert');
const testUtil = require('../test/util');
const consts = require('../lib/consts');
const GooChallenger = require('../lib/challenge');
const ops = require('../lib/ops');
const GooSigner = require('../lib/sign');
const util = require('../lib/util');
const GooVerifier = require('../lib/verify');
const NativeGooVerifier = require('../lib/native');
const RSAKey = require('../lib/rsa');

const gops_p = new ops.RSAGroupOps(consts.Grsa2048, 2048);
const gops_v = new ops.RSAGroupOps(consts.Grsa2048, null);
const native = new NativeGooVerifier(consts.Grsa2048);

// measure times
const msg = Buffer.from('2048-bit RSA GoUO, 2048-bit Signer PK');
const [p, q] = util.rand.sample(testUtil.primes_1024, 2);

const rsakey = new RSAKey(p, q);
const gen = new GooChallenger(gops_p);
const prv = new GooSigner(rsakey, gops_p);
const ver = new GooVerifier(gops_v);

// generate the challenge token
const [C0, C1] = gen.create_challenge(rsakey);

// generate the proof
const [C2, t, sigma] = prv.sign(C0, C1, msg);

// verify the proof
const result = ver.verify([C1, C2, t], msg, sigma);

assert.strictEqual(result, true);

let start, i;

start = Date.now();

for (i = 0; i < 1000; i++) {
  const result = ver.verify([C1, C2, t], msg, sigma);
  assert.strictEqual(result, true);
}

console.log((Date.now() - start) / i);

const [m, proof] = native.encode([C1, C2, t], msg, sigma);

start = Date.now();

for (i = 0; i < 1000; i++) {
  const result = native.verifyRaw(m, proof);
  assert.strictEqual(result, true);
}

console.log((Date.now() - start) / i);
