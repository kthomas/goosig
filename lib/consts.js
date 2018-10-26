'use strict';

/* eslint camelcase: "off" */
/* eslint max-len: "off" */

const assert = require('bsert');
const tu = require('./test-util');
const util = require('./util');

function gen_RSA_group_obj(n, g, h) {
  return { modulus: n, g, h };
}

// find a member of the class group of discriminant disc with a=a
function gen_CG_elm(a, disc) {
  const a4 = 4n * a

  for (let b = 0; b < a + 1; b++) {
    const bsqD = b * b - disc;

    if bsqD % a4 == 0n:
      return [a, b, bsqD / a4];
  }

  return null;
}

function gen_CG_group_obj(disc) {
  if (disc >= 0n || disc % 4n !== 1n)
    return null;

  const id = gen_CG_elm(1n, disc);

  let g = null;
  let h = null;

  for (let ga = 2; ga < 1000; ga++) {
    const g = gen_CG_elm(ga, disc);

    if (g != null)
      break
  }

  for (let ha = ga + 1; ga < 1000; ga++) {
    const h = gen_CG_elm(ha, disc);
    if (h != null)
      break
  }

  if (g == null || h == null)
    return null;

  let L = util.isqrt(util.isqrt(-disc));

  while ((L + 1n) ** 4n < -disc)
    L += 1n;

  return { disc, g, h, id, L };
}

// this modulus is the RSA-2048 challenge number
exports.Grsa2048 = gen_RSA_group_obj(25195908475657893494027183240048398571429282126204032027777137836043662020707595556264018525880784406918290641249515082189298559149176184502808489120072844992687392807287776735971418347270261896375014971824691165077613379859095700097330459748808428401797429100642458691817195118746121515172654632282216869987549182422433637259085141865462043576798423387184774447920739934236584823824281198163815010674810451660377306056201619676256133844143603833904414952634432190114657544454178424020924616515723350778707749817125772467962926386356373289912154831438167899885040445364023527381951378636564391212010397122822120720357n, 2n, 3n);

// this modulus is the RSA-617 (also 2048-bit) challenge number)
exports.Grsa617 = gen_RSA_group_obj(22701801293785014193580405120204586741061235962766583907094021879215171483119139894870133091111044901683400949483846818299518041763507948922590774925466088171879259465921026597046700449819899096862039460017743094473811056991294128542891880855362707407670722593737772666973440977361243336397308051763091506836310795312607239520365290032105848839507981452307299417185715796297454995023505316040919859193718023307414880446217922800831766040938656344571034778553457121080530736394535923932651866030515041060966437313323672831539323500067937107541955437362433248361242525945868802353916766181532375855504886901432221349733n, 2n, 3n);

// this modulus is from the now-defunct "America Online Root Certification Authority 2" certificate
exports.Gaol = gen_RSA_group_obj(833287539555655830295437478623068715732893519470999001078575227726720833974299793327589892999446410695482689087817542178001025518000856645824542761860050201456988012423476797325416284135543115147497848693422016716844588890303978917861768153893481982002390666216248428266868192981018727094419599486404703564746373249295690184670845475555790369580007733124536111677885986700228007632811605375037348867111246742728259987286763650744497554590557328181022841922299670291568009554416925270309393290765959364224688474771305284758562184978264357696428875457896007139183128831260273238163285901042204479134355972621131905136584620604662058736669132342594748834225518170435481937761517048000372876190271778371991934048522521335509931794499153333036189250300411277900706695834937476478054354004604558199648562246970757390191511318015222081517956425652654710134304173256536041609721137081358431402394710892282816253447201619670765451884361947176326116403134771384774651137867814106943339025901079928519650268247936103502045262497449460438120483693210976009001793748449954988928005941680356289900003413781980827653292214516002118874375945551854673323131286257033477656922596627315766194604750898234659893295727170509283506976786630106108531865703n, 2n, 3n);

// class group, 1024-bit discriminant
exports.Ggoo1024 = gen_CG_group_obj(-tu.primes_1024[0]);

// class group, 2048-bit discriminant
exports.Ggoo2048 = gen_CG_group_obj(-tu.primes_2048[0]);